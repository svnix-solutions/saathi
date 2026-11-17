"""Runs the server on a spare port with a throwaway database and checks the things that matter. Run: python3 test_server.py"""
import base64, http.cookiejar, json, os, tempfile, threading, urllib.error, urllib.parse, urllib.request

os.environ["SAATHI_DB"] = os.path.join(tempfile.mkdtemp(), "test.sqlite")
os.environ["SAATHI_ADMIN_PASSWORD"] = "test-password"
os.environ["SAATHI_DEV_OTP"] = "1"   # so the test can read the sign-in code
import server

server.OTP_RESEND = 0
srv = server.make_server(0)
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{srv.server_port}"
AUTH = {"Authorization": "Basic " + base64.b64encode(b"admin:test-password").decode()}
browser = lambda: urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))   # one per person
ANON, NITIN, MEERA = browser(), browser(), browser()


def call(path, data=None, headers=None, method=None, who=ANON, form=False):
    body = None if data is None else (urllib.parse.urlencode(data) if form else json.dumps(data)).encode()
    try:
        with who.open(urllib.request.Request(BASE + path, data=body, headers=headers or {}, method=method)) as r:
            text = r.read().decode(errors="replace")   # images come back as bytes
            return r.status, json.loads(text) if r.headers.get_content_type() == "application/json" else text
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def sign_in(who, mobile):
    code = call("/api/auth/otp", {"mobile": mobile}, who=who)[1]["dev_code"]
    return call("/api/auth/verify", {"mobile": mobile, "code": code}, who=who)[1]


BOOK = {"service": "deep", "minutes": 120, "notes": "", "at": "", "price": 1}

# sign-in: nothing works before it, a wrong code is refused, a new number lands on registration
assert call("/api/me")[0] == 401 and call("/api/bookings", BOOK)[0] == 401
assert call("/api/auth/otp", {"mobile": "12345"})[0] == 400
real = call("/api/auth/otp", {"mobile": "9876543210"}, who=NITIN)[1]["dev_code"]
wrong = "0000" if real != "0000" else "1111"
assert call("/api/auth/verify", {"mobile": "9876543210", "code": wrong}, who=NITIN)[0] == 400
assert call("/api/me", who=NITIN)[0] == 401
assert call("/api/auth/verify", {"mobile": "9876543210", "code": real}, who=NITIN)[1]["complete"] is False   # new customer -> registration
assert call("/api/auth/verify", {"mobile": "9876543210", "code": real}, who=ANON)[0] == 400                   # a code works once

# no home screen data and no booking until the details are complete
assert call("/api/bookings", who=NITIN)[0] == 403 and call("/api/bookings", BOOK, who=NITIN)[0] == 403
assert call("/api/me", {"name": "Nitin Kumar", "address": "  "}, who=NITIN)[0] == 400
assert call("/api/me", {"name": "Nitin Kumar", "language": "hi"}, who=NITIN)[1]["complete"] is False      # step 1 of registration
assert call("/api/bookings", who=NITIN)[0] == 403                                                           # still no Home
assert call("/api/me", {"language": "fr"}, who=NITIN)[0] == 400
me = call("/api/me", {"address": "Flat 204, Block C", "entry_note": "Gate 2"}, who=NITIN)[1]                  # step 2
assert me["complete"] is True and me["language"] == "hi" and me["entry_note"] == "Gate 2"

# bookings: the server sets the price from the database, uses the saved address, and refuses bad input
code, b = call("/api/bookings", BOOK, who=NITIN)
assert (code, b["amount"]) == (201, 516), (code, b)
assert call("/api/bookings", {**BOOK, "minutes": 45}, who=NITIN)[0] == 400
assert call("/api/bookings", {**BOOK, "at": "2020-01-01T10:00"}, who=NITIN)[0] == 400
mine = call("/api/bookings", who=NITIN)[1]
assert len(mine) == 1 and mine[0]["address"] == "Flat 204, Block C" and mine[0]["price"] == 516

# an existing customer signs in again and goes straight to home; another customer cannot see or cancel the booking
assert sign_in(browser(), "9876543210")["complete"] is True
sign_in(MEERA, "9811120034"); call("/api/me", {"name": "Meera", "address": "Flat 12, Block A"}, who=MEERA)
assert call("/api/bookings", who=MEERA)[1] == [] and call(f"/api/bookings/{b['id']}/cancel", {}, who=MEERA)[0] == 400
assert call(f"/api/bookings/{b['id']}/cancel", {}, who=NITIN)[0] == 200 and call("/api/bookings", who=NITIN)[1] == []
assert call("/api/logout", {}, who=NITIN)[0] == 200 and call("/api/me", who=NITIN)[0] == 401

# too many wrong guesses lock the code
real = call("/api/auth/otp", {"mobile": "9000000001"})[1]["dev_code"]
for _ in range(5):
    call("/api/auth/verify", {"mobile": "9000000001", "code": "0000" if real != "0000" else "1111"})
assert call("/api/auth/verify", {"mobile": "9000000001", "code": real})[0] == 400

# prices come from the database: change one as admin and the price list and new bookings follow
deep = lambda: next(s for s in call("/api/pricing")[1]["services"] if s["code"] == "deep")
assert deep()["prices"]["120"] == 516 and call("/api/pricing")[1]["durations"] == [30, 60, 90, 120, 150, 180]
assert call("/admin/services/deep/rate", {"rate": 150}, {"Origin": BASE}, form=True)[0] == 403           # no password
assert call("/admin/services/deep/rate", {"rate": -5}, {**AUTH, "Origin": BASE}, form=True)[0] == 400
assert call("/admin/services/deep/rate", {"rate": 150}, {**AUTH, "Origin": BASE}, form=True)[0] == 200   # 303 back to /admin, followed
assert deep()["prices"]["120"] == 600 and call("/api/bookings", BOOK, who=MEERA)[1]["amount"] == 600
assert "RATES" not in open(server.__file__).read()                                                     # no price table in the code

# partner applications
assert call("/api/applications", {"name": "Asha", "mobile": "9876543210", "area": "Block C", "work": "House cleaning"})[0] == 201
assert call("/api/applications", {"name": "Priya", "mobile": "9876543211", "area": "Block C", "work": "Nursing or patient care"})[0] == 201
assert call("/api/applications", {"name": "Asha", "mobile": "12345", "area": "Block C", "work": "House cleaning"})[0] == 400

# reviews: nobody sees one until an admin approves it
review = {"name": "Farah Ahmed", "mobile": "9876543210", "stars": 5, "quote": "Great <b>work</b>", "consent": True}
assert call("/api/reviews", {**review, "consent": False})[0] == 400
assert call("/api/reviews", review)[0] == 201
assert call("/api/reviews") == (200, [])
assert call("/admin")[0] == 401 and "Sign in" in call("/admin")[1]                    # the sign-in screen, not the dashboard
ADMIN = browser()
assert call("/admin/login", {"password": "wrong"}, {"Origin": BASE}, who=ADMIN, form=True)[0] == 401
assert call("/admin/login", {"password": "test-password"}, who=ADMIN, form=True)[0] == 403            # not from our own page
code, page = call("/admin/login", {"password": "test-password"}, {"Origin": BASE}, who=ADMIN, form=True)
assert code == 200 and "Reviews waiting for approval" in page                                       # signed in, sent to the dashboard
assert call("/admin/logout", {}, {"Origin": BASE}, who=ADMIN, form=True)[0] == 401                  # signed out, back to sign-in
for _ in range(5):
    call("/admin/login", {"password": "wrong"}, {"Origin": BASE}, form=True)
assert call("/admin/login", {"password": "test-password"}, {"Origin": BASE}, form=True)[0] == 429    # locked after 5 wrong tries
server.ADMIN_LOCK.update(fails=0, until=0)
assert "Great &lt;b&gt;work" in call("/admin", headers=AUTH)[1]                                   # shown escaped to the admin
assert call("/admin/reviews/1/approve", {}, AUTH)[0] == 403                                       # right password but not from our page
assert call("/admin/reviews/1/approve", {}, {"Origin": BASE})[0] == 403                           # our page but no password
call("/admin/reviews/1/approve", {}, {**AUTH, "Origin": BASE})
assert call("/api/reviews") == (200, [{"name": "Farah", "stars": 5, "quote": "Great <b>work</b>"}])   # first name only
call("/admin/reviews/1/reject", {}, {**AUTH, "Origin": BASE})
assert call("/api/reviews") == (200, [])

# parallel wrong guesses cannot get past the 5-try limit
from concurrent.futures import ThreadPoolExecutor
real = call("/api/auth/otp", {"mobile": "9000000002"})[1]["dev_code"]
wrongs = [f"{n:04d}" for n in range(10000) if f"{n:04d}" != real][:40]
with ThreadPoolExecutor(40) as pool:
    answers = list(pool.map(lambda g: call("/api/auth/verify", {"mobile": "9000000002", "code": g}, who=browser())[1], wrongs))
assert sum("not right" in a for a in answers) <= 5, answers               # at most 5 guesses were compared
assert call("/api/auth/verify", {"mobile": "9000000002", "code": real})[0] == 400   # and the code is now dead

# Basic-auth guesses count towards the admin lockout too, and lock it for the form and Basic auth alike
server.ADMIN_LOCK.update(fails=0, until=0)
BAD = {"Authorization": "Basic " + base64.b64encode(b"admin:guess").decode()}
with ThreadPoolExecutor(20) as pool:
    list(pool.map(lambda _: call("/admin", headers=BAD), range(20)))
assert server.ADMIN_LOCK["until"] > 0                                      # locked
assert call("/admin", headers=AUTH)[0] == 401                               # even the right password waits out the lock
assert call("/admin/login", {"password": "test-password"}, {"Origin": BASE}, form=True)[0] == 429
server.ADMIN_LOCK.update(fails=0, until=0)
assert call("/admin", headers=AUTH)[0] == 200

# files: pages are served, everything private is not
for path, want in [("/", 200), ("/site/index.html", 200), ("/site/pages.css", 200), ("/design/img/cut/hero.png", 200),
                   ("/server.py", 404), ("/data/saathi.sqlite", 404), ("/db/schema.sql", 404), ("/design/build.py", 404), ("/site/../server.py", 404)]:
    assert call(path)[0] == want, path
assert call("/server.py", method="HEAD")[0] == 404
print("all checks passed")
