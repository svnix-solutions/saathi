"""Saathi starter server: serves the booking page and website, and saves bookings, partner applications and reviews.

Run:    SAATHI_ADMIN_PASSWORD=choose-one python3 server.py      then open http://127.0.0.1:8040
Admin:  http://127.0.0.1:8040/admin  (user "admin", that password): approve reviews, see bookings and applications.
Check:  python3 test_server.py
Standard library only, nothing to install."""
# ponytail: one SQLite file so it runs with no setup, and no rate limiting. Before real customers use it, move to the
# PostgreSQL design in db/schema.sql and add SMS sign-in, the payment gateway and dispatch to partners.
import base64, hashlib, hmac, html, json, os, re, secrets, sqlite3, threading, time
from urllib.parse import parse_qs
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).parent
DB = Path(os.environ.get("SAATHI_DB", ROOT / "data" / "saathi.sqlite"))
ADMIN_PASSWORD = os.environ.get("SAATHI_ADMIN_PASSWORD", "")   # admin is switched off while this is empty
SEED = ROOT / "db" / "seed_pricing.sql"   # starting prices, added if missing at each start; no price lives in this file
WORK = {"House cleaning", "Cooking or kitchen help", "Laundry and ironing", "Nursing or patient care", "Electrician, plumber or carpenter", "Barber", "New to this work"}
MOBILE = re.compile(r"[6-9]\d{9}")
OTP_TTL, OTP_RESEND, OTP_TRIES, SESSION_TTL = 300, 30, 5, 30 * 86400   # seconds, seconds, wrong guesses, seconds
# ponytail: no SMS provider is connected yet, so the sign-in code is printed in this server's console.
# SAATHI_DEV_OTP=1 also sends it back to the page, for testing only. Never set that on a live server.
DEV_OTP = os.environ.get("SAATHI_DEV_OTP") == "1"
ADMIN_SESSION = 8 * 3600                 # admin sign-in lasts 8 hours
ADMIN_LOCK = {"fails": 0, "until": 0}   # ponytail: one shared counter, fine for one shared admin password; per-account counts come with per-person accounts
ADMIN_GUARD = threading.Lock()           # password checks run one at a time, so parallel guesses cannot all slip in before the lock
# Only these paths are served as files. Everything else (this script, the database, db/, build scripts) is a 404.
PUBLIC = re.compile(r"/(index\.html)?|/site/([\w.-]+\.(html|css|pdf))?|/design/img/(cut|trim)/[\w.-]+\.png")
STAMPS = "created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, last_modified TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, is_active INTEGER NOT NULL DEFAULT 1"


def db():
    """A connection for one request. The tables are made once, by setup_db()."""
    con = sqlite3.connect(DB, timeout=10)
    con.row_factory = sqlite3.Row
    return con


def setup_db():
    """Create the tables, add new columns and add new services from the seed file. Run once when the server starts."""
    DB.parent.mkdir(parents=True, exist_ok=True)
    con = db()
    con.executescript(f"""
        CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, service TEXT NOT NULL, minutes INTEGER NOT NULL,
            scheduled_for TEXT, address TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '', amount INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'searching', cancel_token TEXT NOT NULL, {STAMPS});
        CREATE TABLE IF NOT EXISTS partner_applications (id INTEGER PRIMARY KEY, name TEXT NOT NULL, mobile TEXT NOT NULL,
            area TEXT NOT NULL, work TEXT NOT NULL, {STAMPS});
        CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY, name TEXT NOT NULL, mobile TEXT NOT NULL,
            stars INTEGER NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', approved_at TEXT, {STAMPS});
        CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT '', rate_per_30_min INTEGER NOT NULL CHECK (rate_per_30_min > 0),
            is_live INTEGER NOT NULL DEFAULT 1, {STAMPS});
        CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', {STAMPS});
        CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, mobile TEXT NOT NULL UNIQUE, name TEXT NOT NULL DEFAULT '',
            address TEXT NOT NULL DEFAULT '', {STAMPS});
        CREATE TABLE IF NOT EXISTS otp_requests (id INTEGER PRIMARY KEY, mobile TEXT NOT NULL, code_hash TEXT NOT NULL, sent_at INTEGER NOT NULL,
            expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, used INTEGER NOT NULL DEFAULT 0, {STAMPS});
        CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id),
            expires_at INTEGER NOT NULL, {STAMPS});
    """)
    con.execute("CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL, " + STAMPS + ")")
    for table, column, kind in [("bookings", "customer_id", "INTEGER REFERENCES customers(id)"),
                                ("customers", "language", "TEXT NOT NULL DEFAULT 'en'"), ("customers", "entry_note", "TEXT NOT NULL DEFAULT ''")]:
        if column not in [r["name"] for r in con.execute(f"PRAGMA table_info({table})")]:
            con.execute(f"ALTER TABLE {table} ADD COLUMN {column} {kind}")
    con.executescript(SEED.read_text())   # adds services that are new since last start; never overwrites a changed price
    con.commit()
    con.close()


def pricing(con):
    """Everything the pages need to show and work out a price, read from the database on every request."""
    rule = {r["key"]: int(r["value"]) for r in con.execute("SELECT key, value FROM app_settings WHERE is_active")}
    durations = list(range(rule["min_minutes"], rule["max_minutes"] + 1, rule["step_minutes"]))
    services = [{"code": r["code"], "name": r["name"], "description": r["description"], "rate": r["rate_per_30_min"],
                 "prices": {str(m): r["rate_per_30_min"] * m // 30 for m in durations}}   # the one place a price is worked out
                for r in con.execute("SELECT * FROM services WHERE is_live AND is_active ORDER BY id")]
    return {"services": services, "durations": durations, "plan_discount_pct": rule["plan_discount_pct"]}


def text(d, key, limit, required=True):
    v = d.get(key, "")
    if not isinstance(v, str) or len(v.strip()) > limit or (required and not v.strip()):
        raise ValueError(f"Check the {key}.")
    return v.strip()


def digest(*parts):
    return hashlib.sha256("|".join(parts).encode()).hexdigest()


def profile(customer):
    """What the page may know about the signed-in customer. 'complete' decides whether the home screen opens."""
    return {"mobile": customer["mobile"], "name": customer["name"], "language": customer["language"], "address": customer["address"],
            "entry_note": customer["entry_note"], "complete": bool(customer["name"] and customer["address"])}


def request_otp(con, d):
    mobile, now = str(d.get("mobile", "")), int(time.time())
    if not MOBILE.fullmatch(mobile):
        raise ValueError("Enter a 10-digit mobile number.")
    last = con.execute("SELECT max(sent_at) AS t FROM otp_requests WHERE mobile = ?", (mobile,)).fetchone()["t"]
    if last and now - last < OTP_RESEND:
        raise ValueError("Wait a few seconds before asking for another code.")
    code = f"{secrets.randbelow(10000):04d}"
    con.execute("UPDATE otp_requests SET used = 1 WHERE mobile = ? AND NOT used", (mobile,))   # only the newest code works
    con.execute("INSERT INTO otp_requests (mobile, code_hash, sent_at, expires_at) VALUES (?,?,?,?)", (mobile, digest(mobile, code), now, now + OTP_TTL))
    print(f"[sign-in code] {mobile}: {code}", flush=True)
    return {"sent": True, "resend_after": OTP_RESEND, **({"dev_code": code} if DEV_OTP else {})}


def verify_otp(con, d):
    """Right code -> the customer (created on first sign-in) and a new session token."""
    mobile, code = str(d.get("mobile", "")), str(d.get("code", ""))
    row = con.execute("SELECT * FROM otp_requests WHERE mobile = ? AND NOT used ORDER BY id DESC LIMIT 1", (mobile,)).fetchone()
    expired = ValueError("That code has expired. Ask for a new one.")
    if not row or row["expires_at"] < time.time():
        raise expired
    # Take one of the 5 tries before comparing, in a single UPDATE. SQLite runs writes one at a time, so parallel
    # guesses cannot all read "attempts < 5" first: the 6th and later find no row to update and are refused.
    if not con.execute("UPDATE otp_requests SET attempts = attempts + 1 WHERE id = ? AND attempts < ? AND NOT used", (row["id"], OTP_TRIES)).rowcount:
        con.commit()
        raise expired
    con.commit()   # keep the count even if this request fails
    if not hmac.compare_digest(row["code_hash"], digest(mobile, code)):
        raise ValueError("That code is not right.")
    if not con.execute("UPDATE otp_requests SET used = 1 WHERE id = ? AND NOT used", (row["id"],)).rowcount:
        raise expired   # the same right code sent twice at once: only the first signs in
    con.execute("INSERT OR IGNORE INTO customers (mobile) VALUES (?)", (mobile,))
    customer = con.execute("SELECT * FROM customers WHERE mobile = ?", (mobile,)).fetchone()
    token = secrets.token_urlsafe(32)
    con.execute("INSERT INTO sessions (token_hash, customer_id, expires_at) VALUES (?,?,?)", (digest(token), customer["id"], int(time.time()) + SESSION_TTL))
    return profile(customer), token


LANGUAGES = {"en", "hi", "pa"}


def save_profile(con, customer, d):
    """Registration comes in two steps (name and language, then address), so only the fields sent are changed."""
    fields = {}
    if "name" in d:
        fields["name"] = text(d, "name", 60)
    if "language" in d:
        if d["language"] not in LANGUAGES:
            raise ValueError("Choose a language.")
        fields["language"] = d["language"]
    if "address" in d:
        fields["address"] = text(d, "address", 300)
    if "entry_note" in d:
        fields["entry_note"] = text(d, "entry_note", 200, required=False)
    if not fields:
        raise ValueError("Nothing to save.")
    con.execute(f"UPDATE customers SET {', '.join(k + ' = ?' for k in fields)}, last_modified = CURRENT_TIMESTAMP WHERE id = ?",
                (*fields.values(), customer["id"]))   # column names come from the fixed list above, never from the request
    return profile(con.execute("SELECT * FROM customers WHERE id = ?", (customer["id"],)).fetchone())


def new_booking(con, d, customer):
    service, minutes = d.get("service"), d.get("minutes")
    price = pricing(con)
    chosen = next((s for s in price["services"] if s["code"] == service), None)
    if not chosen or type(minutes) is not int or minutes not in price["durations"]:
        raise ValueError("Choose a service and a duration.")
    at = text(d, "at", 40, required=False)
    if at:
        try:
            when = datetime.fromisoformat(at)
        except ValueError:
            raise ValueError("Check the date and time.")
        if when.tzinfo:
            when = when.astimezone().replace(tzinfo=None)
        if when <= datetime.now():
            raise ValueError("Pick a time in the future.")
    amount = chosen["prices"][str(minutes)]   # from the database, never trusted from the browser
    cur = con.execute("INSERT INTO bookings (customer_id, service, minutes, scheduled_for, address, notes, amount, cancel_token) VALUES (?,?,?,?,?,?,?,'')",
                      (customer["id"], service, minutes, at or None, text(d, "address", 300, required=False) or customer["address"],
                       text(d, "notes", 300, required=False), amount))
    return {"id": cur.lastrowid, "amount": amount}


def my_bookings(con, customer):
    return [{"id": r["id"], "service": r["service"], "minutes": r["minutes"], "at": r["scheduled_for"] or "", "address": r["address"],
             "notes": r["notes"], "price": r["amount"], "status": r["status"]}
            for r in con.execute("SELECT * FROM bookings WHERE customer_id = ? AND status <> 'cancelled' AND is_active ORDER BY id DESC", (customer["id"],))]


def cancel_booking(con, booking_id, customer):   # only the customer who made it
    done = con.execute("UPDATE bookings SET status = 'cancelled', last_modified = CURRENT_TIMESTAMP WHERE id = ? AND customer_id = ?", (booking_id, customer["id"]))
    if not done.rowcount:
        raise ValueError("That booking cannot be cancelled from here.")
    return {"status": "cancelled"}


def new_application(con, d):
    if not MOBILE.fullmatch(str(d.get("mobile", ""))) or d.get("work") not in WORK:
        raise ValueError("Check the mobile number.")
    con.execute("INSERT INTO partner_applications (name, mobile, area, work) VALUES (?,?,?,?)",
                (text(d, "name", 60), d["mobile"], text(d, "area", 60), d["work"]))
    return {"status": "received"}


def new_review(con, d):
    stars = d.get("stars")
    if not MOBILE.fullmatch(str(d.get("mobile", ""))) or type(stars) is not int or not 1 <= stars <= 5:
        raise ValueError("Check the mobile number and rating.")
    if d.get("consent") is not True:
        raise ValueError("Tick the box to let us show your review.")
    con.execute("INSERT INTO reviews (name, mobile, stars, body) VALUES (?,?,?,?)", (text(d, "name", 60), d["mobile"], stars, text(d, "quote", 400)))
    return {"status": "pending"}   # shown to nobody until an admin approves it


def public_reviews(con):
    return [{"name": r["name"].split()[0], "stars": r["stars"], "quote": r["body"]}   # first name only
            for r in con.execute("SELECT name, stars, body FROM reviews WHERE status = 'approved' AND is_active ORDER BY approved_at DESC LIMIT 50")]


ADMIN_CSS = """
:root{--green:#0b5d4b;--green-d:#073f33;--mint:#e3f2ec;--yellow:#ffc93c;--ink:#0f1f1c;--mut:#5b6b67;--line:#dbe5e1;--bg:#f3f7f5;--red:#b3261e}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 "Avenir Next","Helvetica Neue",Arial,sans-serif}
.app{display:flex;min-height:100vh;flex-wrap:wrap}
.side{width:220px;background:var(--green-d);color:#cfe5dd;padding:20px 12px;display:flex;flex-direction:column;gap:2px;flex:none}
.side .logo{color:#fff;font-size:19px;font-weight:700;padding:0 8px 16px;display:flex;align-items:center;gap:9px}
.side a{color:inherit;text-decoration:none;padding:9px 10px;border-radius:10px;font-weight:600;display:flex;justify-content:space-between}
.side a:hover,.side a:focus-visible{background:#0f6b57;color:#fff}
.nb{background:var(--yellow);color:var(--ink);border-radius:10px;padding:0 7px;font-size:12px;font-weight:700}
.side .who{margin-top:auto;background:#0b5d4b;border-radius:10px;padding:10px;color:#fff;font-weight:700}
.side .who form{margin:6px 0 0}.side .who button{background:none;border:0;color:#cfe5dd;padding:0;font:inherit;font-size:13px;cursor:pointer;text-decoration:underline}
main{flex:999 1 560px;min-width:0;padding:22px 26px 40px;display:flex;flex-direction:column;gap:16px}
h1{font-size:24px;margin:0;letter-spacing:-.01em}h2{font-size:17px;margin:0 0 10px}
.m{color:var(--mut)}.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px;scroll-margin-top:16px}
.card.alert{border-color:var(--red)}.stat{font-size:28px;font-weight:700;letter-spacing:-.02em}
.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;color:var(--mut);font-size:11px;text-transform:uppercase;letter-spacing:.07em;padding:8px 10px;background:#f1f7f4}
td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}tr:last-child td{border-bottom:0}
.tag{display:inline-block;border-radius:20px;padding:2px 10px;font-size:12px;font-weight:700;background:var(--mint);color:var(--green-d)}
.tag.r{background:#fff;color:var(--red);border:1px solid var(--red)}.tag.y{background:var(--yellow);color:var(--ink)}
button,.btn{font:inherit;font-weight:700;border:0;border-radius:10px;padding:8px 14px;background:var(--green);color:#fff;cursor:pointer}
button.o{background:#fff;color:var(--green);border:1.5px solid var(--green)}button.x{background:#fff;color:var(--red);border:1.5px solid var(--red)}
input{font:inherit;padding:8px 10px;border:1.5px solid var(--line);border-radius:10px}
input:focus,button:focus-visible{outline:2px solid var(--green);outline-offset:2px}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
main>*{min-width:0;max-width:100%}
@media (max-width:760px){.side{width:100%!important}.side .who{margin-top:10px}main{flex-basis:100%;padding:18px 14px 32px}}
"""


def check_admin_password(password):
    """'ok', 'wrong' or 'locked'. Every admin password check goes through here (sign-in form and Basic auth), one at
    a time, and 5 wrong ones lock both for 15 minutes."""
    with ADMIN_GUARD:
        if ADMIN_LOCK["until"] > time.time():
            return "locked"
        if ADMIN_PASSWORD and hmac.compare_digest(password.encode(), ADMIN_PASSWORD.encode()):
            ADMIN_LOCK["fails"] = 0
            return "ok"
        ADMIN_LOCK["fails"] += 1
        if ADMIN_LOCK["fails"] >= 5:
            ADMIN_LOCK.update(fails=0, until=time.time() + 900)
        return "wrong"


def admin_shell(body, title="Dashboard"):
    return ("<!doctype html><html lang='en'><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>"
            f"<title>Saathi admin · {title}</title><style>{ADMIN_CSS}</style><div class='app'>" + body + "</div></html>")


def admin_login_page(message=""):
    """The sign-in screen, in the design's layout. One shared password for now; per-person accounts and roles are designed but not built."""
    msg = f"<p class='m' role='alert' style='color:var(--red);font-weight:700'>{html.escape(message)}</p>" if message else ""
    return admin_shell(
        "<div class='side' style='width:330px'><div class='logo'>Saathi</div><div style='font-size:24px;font-weight:700;color:#fff;margin-top:20px'>Admin panel</div>"
        "<div style='margin-top:8px'>For the Saathi team only. Every sign-in and every change is recorded.</div></div>"
        "<main style='justify-content:center;align-items:center'><form class='card' method='post' action='/admin/login' style='width:min(380px,100%);display:grid;gap:12px'>"
        "<h1>Sign in</h1><label>Password<br><input type='password' name='password' required autocomplete='current-password' autofocus style='width:100%;margin-top:6px'></label>"
        f"{msg}<button>Sign in</button><p class='m' style='margin:0;font-size:13px'>Ask the owner for the password. Five wrong tries lock sign-in for 15 minutes.</p></form></main>", "Sign in")


def admin_page(con):
    e = lambda v: html.escape(str(v if v is not None else ""))
    def table(head, rows, empty="Nothing here yet."):
        body = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) or f'<tr><td colspan="{len(head)}" class="m">{empty}</td></tr>'
        return f"<div class='scroll'><table><tr>{''.join(f'<th>{h}</th>' for h in head)}</tr>{body}</table></div>"
    act = lambda i, what, label, cls="": f'<form method="post" action="/admin/reviews/{i}/{what}" style="display:inline"><button class="{cls}">{label}</button></form>'
    status_tag = lambda s: f"<span class='tag{' y' if s == 'searching' else ' r' if s == 'cancelled' else ''}'>{e(s)}</span>"
    pending = [(e(r["name"]), e(r["mobile"]), "★" * r["stars"], e(r["body"]), "<div class='row'>" + act(r["id"], "approve", "Approve") + act(r["id"], "reject", "Reject", "x") + "</div>")
               for r in con.execute("SELECT * FROM reviews WHERE status = 'pending' ORDER BY id")]
    shown = [(e(r["name"].split()[0]), "★" * r["stars"], e(r["body"]), act(r["id"], "reject", "Take down", "o")) for r in con.execute("SELECT * FROM reviews WHERE status = 'approved' ORDER BY approved_at DESC")]
    bookings = [(f"#{r['id']}", e(r["created_at"]), e(r["service"]), f"{r['minutes']} min", e(r["scheduled_for"] or "Now"), e(r["address"]), e(r["notes"]), f"₹{r['amount']}", status_tag(r["status"]))
                for r in con.execute("SELECT * FROM bookings ORDER BY id DESC LIMIT 50")]
    apps = [(e(r["created_at"]), e(r["name"]), e(r["mobile"]), e(r["area"]), e(r["work"])) for r in con.execute("SELECT * FROM partner_applications ORDER BY id DESC LIMIT 50")]
    prices = [(f"<b>{e(r['name'])}</b>", f'<form method="post" action="/admin/services/{e(r["code"])}/rate" class="row">'
               f'₹ <input name="rate" type="number" min="1" required value="{r["rate_per_30_min"]}" style="width:100px" aria-label="Rupees per 30 minutes for {e(r["name"])}">'
               '<button>Save</button></form>', f"₹{r['rate_per_30_min'] * 2}") for r in con.execute("SELECT * FROM services ORDER BY id")]
    one = lambda sql: con.execute(sql).fetchone()[0]
    today = "date(created_at) = date('now')"
    kpis = [("Bookings today", one(f"SELECT count(*) FROM bookings WHERE {today}"), ""),
            ("Waiting for a partner", waiting := one("SELECT count(*) FROM bookings WHERE status = 'searching'"), "alert" if waiting else ""),
            ("Reviews to approve", len(pending), "alert" if pending else ""),
            ("Booked today", "₹{:,}".format(one(f"SELECT coalesce(sum(amount),0) FROM bookings WHERE status <> 'cancelled' AND {today}")), "")]
    side = ("<nav class='side' aria-label='Admin'><div class='logo'>Saathi</div>"
            "<a href='#top'>Dashboard</a><a href='#bookings'>Bookings</a>"
            f"<a href='#reviews'>Reviews{f'<span class=nb>{len(pending)}</span>' if pending else ''}</a>"
            "<a href='#partners'>Partner applications</a><a href='#pricing'>Pricing</a><a href='/'>Booking page</a>"
            "<div class='who'>Admin<form method='post' action='/admin/logout'><button>Sign out</button></form></div></nav>")
    return admin_shell(side + "<main id='top'><div><h1>Dashboard</h1><div class='m'>A review is shown on the website only after it is approved here.</div></div>"
        "<div class='kpis'>" + "".join(f"<div class='card {c}'><div class='m'>{k}</div><div class='stat'>{v}</div></div>" for k, v, c in kpis) + "</div>"
        "<div class='card' id='reviews'><h2>Reviews waiting for approval</h2>" + table(["Name", "Mobile", "Stars", "Review", ""], pending, "No reviews are waiting.") + "</div>"
        "<div class='card' id='bookings'><h2>Bookings <span class='m' style='font-weight:400'>· latest 50</span></h2>" + table(["ID", "Made", "Service", "Length", "When", "Address", "Notes", "Amount", "Status"], bookings) + "</div>"
        "<div class='card' id='partners'><h2>Partner applications <span class='m' style='font-weight:400'>· latest 50</span></h2>" + table(["Received", "Name", "Mobile", "Area", "Past work"], apps) + "</div>"
        "<div class='card' id='pricing'><h2>Prices</h2><p class='m' style='margin-top:-6px'>Per 30 minutes. A saved price applies to new bookings straight away; bookings already made keep their amount.</p>"
        + table(["Service", "Per 30 minutes", "1 hour"], prices) + "</div>"
        "<div class='card'><h2>Reviews shown on the website</h2>" + table(["Name", "Stars", "Review", ""], shown, "None yet.") + "</div></main>")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def route(self):
        return self.path.split("?")[0].split("#")[0]

    def reply(self, code, body, kind="application/json", headers=()):
        data = (json.dumps(body) if kind == "application/json" else body).encode()
        self.send_response(code)
        self.send_header("Content-Type", kind + "; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        for k, v in headers:
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def is_admin(self):
        """Signed in through the admin sign-in screen (a cookie), or a script sending the password directly (Basic auth)."""
        if not ADMIN_PASSWORD:
            return False
        m = re.search(r"(?:^|;\s*)kk_admin=([\w-]+)", self.headers.get("Cookie", ""))
        if m:
            with db() as con:
                if con.execute("SELECT 1 FROM admin_sessions WHERE token_hash = ? AND expires_at > ?", (digest(m[1]), int(time.time()))).fetchone():
                    return True
        auth = self.headers.get("Authorization", "")
        if not auth.startswith("Basic "):
            return False
        try:
            user, _, password = base64.b64decode(auth[6:]).decode().partition(":")
        except Exception:
            return False
        return check_admin_password(password if user == "admin" else "") == "ok"   # counted towards the lockout like the form

    def token(self):
        m = re.search(r"(?:^|;\s*)kk_session=([\w-]+)", self.headers.get("Cookie", ""))
        return m[1] if m else ""

    def customer(self, con):
        return con.execute("SELECT c.* FROM sessions s JOIN customers c ON c.id = s.customer_id "
                           "WHERE s.token_hash = ? AND s.expires_at > ? AND c.is_active", (digest(self.token()), int(time.time()))).fetchone()

    def send_head(self):   # used by GET and HEAD for files: refuse anything not on the public list
        if not PUBLIC.fullmatch(self.route()):
            self.send_error(404)
            return None
        return super().send_head()

    def do_GET(self):
        try:
            self.get()
        except sqlite3.OperationalError:   # database busy or locked
            self.reply(503, {"error": "Saathi is busy. Try again in a moment."})

    def get(self):
        path = self.route()
        if path == "/api/reviews":
            with db() as con:
                return self.reply(200, public_reviews(con))
        if path == "/api/pricing":
            with db() as con:
                return self.reply(200, pricing(con))
        if path in ("/api/me", "/api/bookings"):
            with db() as con:
                who = self.customer(con)
                if not who:
                    return self.reply(401, {"error": "Sign in first."})
                if path == "/api/me":
                    return self.reply(200, profile(who))
                if not profile(who)["complete"]:
                    return self.reply(403, {"error": "Finish your details first."})
                return self.reply(200, my_bookings(con, who))
        if path == "/admin":
            if not ADMIN_PASSWORD:
                return self.reply(503, "Admin is off. Start the server with SAATHI_ADMIN_PASSWORD set.", "text/plain")
            if not self.is_admin():
                return self.reply(401, admin_login_page(), "text/html")
            with db() as con:
                return self.reply(200, admin_page(con), "text/html")
        super().do_GET()

    def do_POST(self):
        path = self.route()
        try:
            length = int(self.headers.get("Content-Length") or 0)
            if length > 10_000:
                raise ValueError("Too much data.")
            raw = self.rfile.read(length)
            same_site = self.headers.get("Origin") == f"http://{self.headers.get('Host')}"
            if path == "/admin/login":
                if not ADMIN_PASSWORD or not same_site:
                    return self.reply(403, admin_login_page("Sign-in is not available."), "text/html")
                result = check_admin_password(parse_qs(raw.decode()).get("password", [""])[0])
                if result == "locked":
                    return self.reply(429, admin_login_page("Too many wrong tries. Sign-in is locked for 15 minutes."), "text/html")
                if result == "wrong":
                    return self.reply(401, admin_login_page("That password is not right."), "text/html")
                token = secrets.token_urlsafe(32)
                with db() as con:
                    con.execute("INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?,?)", (digest(token), int(time.time()) + ADMIN_SESSION))
                return self.reply(303, "", "text/plain", [("Location", "/admin"), ("Set-Cookie", f"kk_admin={token}; HttpOnly; SameSite=Strict; Path=/admin; Max-Age={ADMIN_SESSION}")])
            if path == "/admin/logout":
                m = re.search(r"(?:^|;\s*)kk_admin=([\w-]+)", self.headers.get("Cookie", ""))
                if m and same_site:
                    with db() as con:
                        con.execute("DELETE FROM admin_sessions WHERE token_hash = ?", (digest(m[1]),))
                return self.reply(303, "", "text/plain", [("Location", "/admin"), ("Set-Cookie", "kk_admin=; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=0")])
            with db() as con:
                review = re.fullmatch(r"/admin/reviews/(\d+)/(approve|reject)", path)
                rate = re.fullmatch(r"/admin/services/([a-z_]+)/rate", path)
                if review or rate:
                    # the browser sends the admin password by itself, so also insist the request came from our own page
                    if not self.is_admin() or not same_site:
                        return self.reply(403, {"error": "Not allowed."})
                    if review:
                        status = "approved" if review[2] == "approve" else "rejected"
                        con.execute("UPDATE reviews SET status = ?, approved_at = CASE WHEN ? = 'approved' THEN CURRENT_TIMESTAMP END, "
                                    "last_modified = CURRENT_TIMESTAMP WHERE id = ?", (status, status, review[1]))
                    else:
                        new_rate = int(parse_qs(raw.decode()).get("rate", ["0"])[0])
                        if not 0 < new_rate < 100000:
                            raise ValueError("Enter a price in whole rupees.")
                        con.execute("UPDATE services SET rate_per_30_min = ?, last_modified = CURRENT_TIMESTAMP WHERE code = ?", (new_rate, rate[1]))
                    return self.reply(303, "", "text/plain", [("Location", "/admin")])
                d = json.loads(raw or b"{}")
                if not isinstance(d, dict):
                    raise ValueError("Send the details as a form.")
                cookie = lambda value, age: [("Set-Cookie", f"kk_session={value}; HttpOnly; SameSite=Lax; Path=/; Max-Age={age}")]
                if path == "/api/auth/otp":
                    return self.reply(200, request_otp(con, d))
                if path == "/api/auth/verify":
                    who, token = verify_otp(con, d)
                    return self.reply(200, who, headers=cookie(token, SESSION_TTL))
                if path == "/api/logout":
                    con.execute("DELETE FROM sessions WHERE token_hash = ?", (digest(self.token()),))
                    return self.reply(200, {"status": "signed out"}, headers=cookie("", 0))
                cancel = re.fullmatch(r"/api/bookings/(\d+)/cancel", path)
                if path in ("/api/me", "/api/bookings") or cancel:
                    who = self.customer(con)
                    if not who:
                        return self.reply(401, {"error": "Sign in first."})
                    if path == "/api/me":
                        return self.reply(200, save_profile(con, who, d))
                    if not profile(who)["complete"]:   # no booking until name and address are filled in
                        return self.reply(403, {"error": "Finish your details first."})
                    if cancel:
                        return self.reply(200, cancel_booking(con, cancel[1], who))
                    return self.reply(201, new_booking(con, d, who))
                if path == "/api/applications":
                    return self.reply(201, new_application(con, d))
                if path == "/api/reviews":
                    return self.reply(201, new_review(con, d))
            self.reply(404, {"error": "Not found."})
        except sqlite3.OperationalError:   # database busy or locked
            self.reply(503, {"error": "Saathi is busy. Try again in a moment."})
        except (ValueError, KeyError, TypeError) as err:   # JSONDecodeError is a ValueError
            self.reply(400, {"error": str(err) if isinstance(err, ValueError) and not isinstance(err, json.JSONDecodeError) else "Check the details."})


def make_server(port):
    setup_db()
    return ThreadingHTTPServer(("127.0.0.1", port), Handler)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8040))
    print(f"Saathi is running at http://127.0.0.1:{port}  (admin {'on at /admin' if ADMIN_PASSWORD else 'OFF: set SAATHI_ADMIN_PASSWORD'})")
    make_server(port).serve_forever()
