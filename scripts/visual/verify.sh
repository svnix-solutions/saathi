#!/bin/bash
# usage: scripts/visual/verify.sh <name> [port]
# Builds the working tree, shoots every route through Testing/Route harness and compares with the baseline
# (baseline.sh). A differing shot is re-shot twice and reported only if it still differs from both baseline runs.
# Live timers can still show a few hundred pixels: open the diff PNG to confirm only the moving element changed.
set -e
source "$(dirname "$0")/lib.sh"
N=${1:?name}; P=${2:-6098}; O="$VR/.out/$N"
test -d "$VR/.baseline/a" || { echo "no baseline: run scripts/visual/baseline.sh <ref> first"; exit 1; }
node "$VR/keys.mjs" >/dev/null
rm -rf "$O"; mkdir -p "$O"
build_and_shoot "$ROOT" "$P" "$O/static" "$O/shots"
echo "page errors: $(tr -d '\n ' < "$O/shots/_errors.json")"
BAD=$(node "$VR/compare.mjs" "$O/shots" "$VR/.baseline/a" "$VR/.baseline/b" | cut -f1 | paste -sd, -)
LAST="$O/shots"
if [ -n "$BAD" ]; then
  python3 -m http.server "$P" -d "$O/static" >/dev/null 2>&1 & SRV=$!; trap "kill $SRV 2>/dev/null" EXIT; sleep 1
  for i in 1 2; do
    [ -z "$BAD" ] && break
    ONLY="$BAD" node "$VR/shoot.mjs" "$P" "$O/re$i" >/dev/null; LAST="$O/re$i"
    BAD=$(node "$VR/compare.mjs" "$O/re$i" "$VR/.baseline/a" "$VR/.baseline/b" | cut -f1 | grep -xE "$(echo "$BAD" | tr , '|')" | paste -sd, - || true)
  done
fi
if [ -z "$BAD" ]; then echo "VISUAL: all $(ls "$VR/.baseline/a" | grep -c png) shots match the baseline"; exit 0; fi
echo "VISUAL: still differing (name, pixels):"
node "$VR/compare.mjs" "$LAST" "$VR/.baseline/a" "$VR/.baseline/b" --write "$O/diff" | grep -E "^($(echo "$BAD" | tr , '|'))\b" || true
echo "diff images: $O/diff/"
exit 1
