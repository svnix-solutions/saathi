#!/bin/zsh
# Builds the Saathi demo and publishes it to https://saathi-demo-341.netlify.app behind the demo login.
# Run from anywhere: ./deploy/demo.sh      (needs `npx netlify-cli login` once on this machine)
# Change the login:  cd deploy && npx netlify-cli env:set DEMO_PASSWORD '<new password>'   (takes effect on the next deploy)
set -e
cd "$(dirname "$0")/.."
SITE_ID=8909181c-56d4-4215-9673-d43a048bd25c
npm run build-storybook -- --quiet
(cd web && python3 design/build.py && python3 db/make_er.py)
OUT=deploy/site
rm -rf $OUT && mkdir -p $OUT/web/design/img $OUT/web/db
cp -R storybook-static/. $OUT/                                  # the prototype at the root
cp web/index.html $OUT/web/ && cp -R web/site $OUT/web/          # booking page and website (shown without the Python server)
cp web/design/*.html web/design/*.pdf $OUT/web/design/
cp -R web/design/img/cut web/design/img/trim $OUT/web/design/img/
cp web/db/er-diagram.html web/db/er-diagram.pdf $OUT/web/db/
cd deploy && npx -y netlify-cli@27 deploy --prod --dir site --site $SITE_ID --message "Saathi demo $(git rev-parse --short HEAD)"
