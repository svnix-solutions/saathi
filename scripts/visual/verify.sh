#!/bin/bash
# usage: verify.sh <name> <port>
# Builds Storybook into its own dir, shoots every route through Testing/Route harness, and compares with the two
# pre-refactor baselines. A shot that differs is re-shot twice; it is reported only if it still differs from both
# baselines every time. Live timers (customer__inProgress etc.) can still show a few hundred pixels: open the diff PNG
# in <name>-diff/ to confirm only the moving element changed.
set -e
N=$1; P=$2; S=$(cd "$(dirname "$0")" && pwd)
cd "/Volumes/SanDisk/MacBook Pro M4/svnix/saathi"
rm -rf "$S/$N-static" "$S/$N-shots" "$S/$N-diff" "$S/$N-re"*
STORYBOOK_DISABLE_TELEMETRY=1 npx storybook build -o "$S/$N-static" --quiet 2>&1 | grep -E " error|Error:|✘" | head -20 || true
test -f "$S/$N-static/iframe.html" || { echo "BUILD FAILED"; exit 1; }
python3 -m http.server $P -d "$S/$N-static" >/dev/null 2>&1 & SRV=$!
trap "kill $SRV 2>/dev/null" EXIT
sleep 1; cd "$S"
node shoot.mjs $P "$N-shots" >/dev/null
echo "page errors: $(cat $N-shots/_errors.json | tr -d '\n ')"
BAD=$(node diff2.mjs "$N-shots" base-shots base-shots-2 | cut -f1 | paste -sd, -)
for i in 1 2; do
  [ -z "$BAD" ] && break
  ONLY="$BAD" node shoot.mjs $P "$N-re$i" >/dev/null
  BAD=$(node diff2.mjs "$N-re$i" base-shots base-shots-2 2>/dev/null | grep -E "^($(echo $BAD | tr , '|'))\b" | cut -f1 | paste -sd, -)
done
if [ -z "$BAD" ]; then echo "VISUAL: all 150 shots match the baseline"; exit 0; fi
LAST="$N-re2"; [ -d "$LAST" ] || LAST="$N-shots"
echo "VISUAL: still differing after re-shoots (name, pixels):"
node diff2.mjs "$LAST" base-shots base-shots-2 | grep -E "^($(echo $BAD | tr , '|'))\b" || true
mkdir -p "$N-diff"; node diff.mjs base-shots "$LAST" "$N-diff" >/dev/null
echo "diff images: $S/$N-diff/"
