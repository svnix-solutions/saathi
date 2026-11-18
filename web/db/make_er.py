"""Builds er-diagram.html (and .pdf) from the three er-*.mmd files.
Each diagram is drawn on its own in headless Chrome and its finished SVG is pasted into the page, because Mermaid ER
diagrams drawn on one page leak tables into each other. The finished page needs no internet.
Run: python3 make_er.py   (needs Chrome and, while building only, internet for the Mermaid library)"""
import pathlib, re, subprocess, tempfile
D = pathlib.Path(__file__).parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SHELL = """<!doctype html><meta charset="utf-8"><pre class="mermaid">%s</pre><script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true, theme: 'base', themeVariables: { primaryColor: '#e3f2ec', primaryBorderColor: '#0b5d4b',
  primaryTextColor: '#0f1f1c', lineColor: '#0b5d4b', fontFamily: 'Avenir Next, Helvetica Neue, Arial, sans-serif', fontSize: '15px' } });
</script>"""
PAGES = [  # file, label, heading, intro, footnote
    ("er-1a-bookings.mmd", "Version 1", "Bookings: who books, what is booked, what happened",
     "A customer books a service at one of their addresses, in a zone. The visit records check-in and check-out, and both sides can rate it. The partner starts the job with the start code and ends it with one of two finish codes from the customer's app: one means happy, the other means not happy.",
     "PK = primary key · FK = foreign key (points at another table) · UK = must be unique. Every table has created_at, last_modified and is_active. Other than those, only the main columns are shown; schema.sql has all of them."),
    ("er-1b-partners.mmd", "Version 1", "Partners: who does the job",
     "A booking is offered to partners until one accepts. Partners have documents, working hours and the extra services they are trained for. Customers can mark a partner as a favourite or block them.", ""),
    ("er-1c-professions.mmd", "Version 1", "Professions, skills and the documents each needs",
     "A partner holds one profession (house help, nurse, home service, barber), any number of its specializations, and any number of its skills. document_requirements says which documents sign-up asks for: for everyone, for a profession, or for one specialization. A service names the profession, and optionally the specialization, a partner needs to be sent.",
     "Triggers keep a partner's specializations and skills inside their profession. The partner_required_documents view lists what each partner must upload and whether it is in."),
    ("er-2-money-support.mmd", "Version 1", "Money and support",
     "Customers pay for bookings and may be refunded. Each thing a partner is owed is one earnings line, gathered into a weekly payout. Support tickets hang off a booking, and every admin action is logged.",
     "A ticket is raised by exactly one of a customer or a partner; the database enforces that."),
    ("er-3-gateways.mmd", "Version 1", "Payment gateways (Razorpay first, more can be added)",
     "Each provider is one row in payment_gateways. An online payment opens an order with one gateway; every attempt is a transaction row, so failed tries are kept. Refunds and webhook calls are stored per gateway, and partners are paid through a payout account on a gateway.",
     "provider_* columns hold the gateway's own ids (for Razorpay: order_, pay_, rfnd_, pout_). Amounts in the gateway tables are whole paise."),
    ("er-4-reviews.mmd", "Version 1", "Reviews and testimonials",
     "Every visit can get a rating (stars and tags). A review is the written part the customer chooses to publish on the helper's profile; the team can reply to it or hide it. A testimonial is a quote the team picks for the website or app.",
     "Reviews and testimonials start as pending and are shown to users only after an admin approves them (a testimonial also needs the person's consent). The database enforces this, and the apps read only the public_reviews and public_testimonials views."),
    ("er-5-roles.mmd", "Version 1", "Admin roles and access",
     "What an admin can see and do comes from roles. One person can hold several roles at once, and a role can be limited to a single zone. Each role is a set of permissions, one per thing the admin panel checks.",
     "Seven roles and 22 permissions come ready-made. The admin panel reads the admin_user_permissions view, or asks admin_can(person, permission, zone)."),
    ("er-6-signin.mmd", "Version 1", "Sign-in, registration and partner sign-up",
     "Sign-in is a mobile number and an SMS code, with no passwords. A new customer stays on the registration screens until name and address are saved. A new partner must add details, two references confirmed by a code on each reference's phone, Aadhaar and PAN photos, and any certificate their work needs, then be approved.",
     "otp_requests stands alone: it is matched to a person by mobile number. The code and the session token are stored only as hashes."),
    ("er-7-version2.mmd", "Version 2", "Plans, wallet, offers and referrals",
     "Added after launch. A monthly plan creates bookings on its set days. The wallet is a list of money in and out; the balance is their sum. A booking can use one coupon. A customer can be referred once.", ""),
    ("er-8-extras.mmd", "Version 1 and 2", "Other features drawn in the screens",
     "Tables for screens that had none: the emergency button, chat, alerts, supplies, points, gifts, societies, partner time off, training, badges and bonus schemes. Bookings also gained a contact person and a helper count.", ""),
    ("er-9-later.mmd", "Later", "Membership, cover, advances, savings, campaigns, shared homes and kit",
     "Tables for the features planned after launch. Membership cover, advances and savings each need a licensed insurer, lender or bank; provider_ref holds that partner's reference.", ""),
]
out = ""
for i, (f, label, h1, intro, note) in enumerate(PAGES, 1):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as t:
        t.write(SHELL % (D / f).read_text())
    dom = subprocess.run([CHROME, "--headless", "--disable-gpu", "--virtual-time-budget=25000", "--dump-dom", "file://" + t.name],
                         capture_output=True, text=True).stdout
    pathlib.Path(t.name).unlink()
    svg = re.search(r"<svg.*</svg>", dom, re.S).group(0)
    tables = set(re.findall(r'id="entity-([a-z_]+)-', svg))
    want = {w.replace("_", "") for w in re.findall(r"^  (\w+) \{", (D / f).read_text(), re.M)}
    assert {x.replace("_", "") for x in tables} == want, (f, want ^ tables)   # every table drawn, none leaked in
    old = re.search(r'id="(mermaid-[^"]+)"', svg).group(1)
    svg = svg.replace(old, f"er{i}")                                           # unique ids so the three do not clash
    svg = re.sub(r'(<svg[^>]*?) style="[^"]*"', r'\1', svg, count=1)           # drop Mermaid's fixed max-width
    out += (f'<section>\n  <div class="ey">Saathi database · {i} of {len(PAGES)} · {label}</div>\n  <h1>{h1}</h1>\n  <p>{intro}</p>\n'
            f'  <div class="dia">{svg}</div>\n' + (f'  <div class="key">{note}</div>\n' if note else "") + "</section>\n")
    print(f, len(tables), "tables")
(D / "er-diagram.html").write_text("""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Saathi database: ER diagram</title>
<style>
  @page { size: 1700px 1250px; margin: 0; }
  * { box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body { margin:0; background:#f3f7f5; color:#0f1f1c; font:16px/1.5 "Avenir Next","Helvetica Neue",Arial,sans-serif; }
  section { padding:32px 40px; break-after:page; }
  .ey { font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#0b5d4b; }
  h1 { font-size:32px; letter-spacing:-.02em; margin:4px 0 2px; }
  p { margin:0 0 16px; color:#5b6b67; max-width:1100px; }
  .dia { background:#fff; border:1px solid #dbe5e1; border-radius:18px; padding:16px; }
  .dia svg { display:block; width:100%; height:auto; max-height:900px; }
  .key { font-size:14px; margin-top:12px; color:#5b6b67; }
</style>
</head>
<body>
""" + out + "</body>\n</html>\n")
subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={D / 'er-diagram.pdf'}",
                (D / "er-diagram.html").as_uri()], capture_output=True)
