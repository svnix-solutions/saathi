#!/bin/bash
# usage: ONLY=customer__home,customer__chores scripts/visual/check-variants.sh <name> [port]
# Builds the working tree, then for every route (or the ONLY list):
#   overflow.mjs     — anything off the screen or out of its box on a small phone, with large text, in Hindi, in Punjabi
#   untranslated.mjs — English text still visible in Hindi and in Punjabi
# Results: scripts/visual/.out/<name>/{overflow,untranslated}.json
set -e
source "$(dirname "$0")/lib.sh"
N=${1:?name}; P=${2:-6096}; O="$VR/.out/$N"
node "$VR/keys.mjs" >/dev/null
mkdir -p "$O"; rm -rf "$O/static"
(cd "$ROOT" && STORYBOOK_DISABLE_TELEMETRY=1 npx storybook build -o "$O/static" --quiet 2>&1 | grep -E " error|Error:" | head -20) || true
test -f "$O/static/iframe.html" || { echo "BUILD FAILED"; exit 1; }
python3 -m http.server "$P" -d "$O/static" >/dev/null 2>&1 & SRV=$!; trap "kill $SRV 2>/dev/null" EXIT; sleep 1
node "$VR/overflow.mjs" "$P" "$O/overflow.json"
node "$VR/untranslated.mjs" "$P" "$O/untranslated.json"
echo "details: $O/overflow.json and $O/untranslated.json"
