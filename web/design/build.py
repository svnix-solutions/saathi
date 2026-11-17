# Splits saathi-design.html (the single source) into one page per app, then prints each to PDF.
# Run: python3 build.py
import re, subprocess, pathlib
d = pathlib.Path(__file__).parent
src = (d / 'saathi-design.html').read_text()
head, *secs = re.split(r'(?=<!-- \d+\. )', src)
secs[-1] = secs[-1].replace('</body>\n</html>', '')
# Each section starts with a comment like "<!-- 31. CUSTOMER C -->"; the keyword decides which page it goes on.
pages = [('customer-app', 'Customer app', 'CUSTOMER'), ('worker-app', 'Saathi Partner', 'HELPER|WORKER'),
         ('admin-panel', 'Admin panel', 'ADMIN'), ('decisions', 'Decisions', 'DECISIONS'), ('brand', 'Brand', 'BRAND')]
pick = lambda key: [s for s in secs if ('class="ver v1"' in s if key == 'V1' else re.match(rf'<!-- \d+\. ({key})', s))]
assert sum(len(pick(k)) for *_, k in pages) == len(secs) - 1  # all but the old landing mock; the website is ../site/
pages.insert(0, ('version-1', 'Version 1 only', 'V1'))   # just the launch screens from all three apps, for the build team
css = ('<style>.nv{display:flex;gap:8px;justify-content:center;padding:16px 16px 0;font:600 14px "Avenir Next",Arial,sans-serif}'
       '.nv a{padding:9px 16px;border-radius:20px;background:#fff;color:#0f1f1c;text-decoration:none}'
       '.nv a.on{background:#0b5d4b;color:#fff}@media print{.nv{display:none}}</style>')
chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
for slug, title, key in pages:
    nav = '<nav class="nv">' + ''.join(f'<a href="{s}.html"{" class=on" if s == slug else ""}>{t}</a>' for s, t, _ in pages) + '<a href="../site/index.html">Website</a></nav>'
    h = head.replace('<title>Saathi App Design</title>', f'<title>Saathi {title}</title>{css}').replace('<body>', '<body>' + nav, 1)
    out = d / f'{slug}.html'
    out.write_text(h + ''.join(pick(key)) + '</body>\n</html>\n')
    subprocess.run([chrome, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                    f'--print-to-pdf={d / (slug + ".pdf")}', out.as_uri()], check=True, capture_output=True)
    print(slug, len(pick(key)), 'pages ok')
