# Saathi

House help at your door in 15 minutes. This repo holds the design (`web/design/`), the database design (`web/db/`), a starter server with the booking page and website (`web/`), and the working prototype in Storybook:

- **Saathi**: the customer app, built in React Native (rendered on the web through react-native-web)
- **Saathi Partner**: the helper app, built in React Native
- **Saathi Admin**: the operations panel, built in React

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static site in storybook-static/
npm run check            # typecheck + lint + build, as CI does
```

In both apps, sign in with any number. The SMS code is `4821`. The toolbar switches every phone between dark mode, large text, Hindi and small phone.

How the code is organised: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). How to add a screen or a page:
[docs/PROTOTYPE_GUIDE.md](docs/PROTOTYPE_GUIDE.md). Pixel-diff checks for refactors: [scripts/visual/README.md](scripts/visual/README.md).

## Design, database and starter server (`web/`)

```bash
cd web
SAATHI_ADMIN_PASSWORD=choose-one python3 server.py   # booking page http://127.0.0.1:8040, website /site/, admin /admin
python3 test_server.py         # server checks
./db/test_schema.sh            # loads db/schema.sql into a throwaway PostgreSQL 16 and checks it refuses bad rows
python3 design/build.py        # splits design/saathi-design.html into one page per app, with PDFs
python3 db/make_er.py          # ER diagram, db/er-diagram.html and .pdf
```

The generated pages and PDFs, the raw character renders (`design/img/raw`) and the local database (`data/`) are not in git.

