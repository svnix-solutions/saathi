#!/bin/bash
# usage: scripts/visual/baseline.sh [git-ref]   (default: HEAD)
# Shoots every route at <git-ref> twice into scripts/visual/.baseline/{a,b}. Two runs, so screens with live timers
# or carousels have two acceptable images. Run it before a refactor; then verify.sh compares against it.
set -e
source "$(dirname "$0")/lib.sh"
REF=${1:-HEAD}; PORT=${PORT:-6099}
node "$VR/keys.mjs" >/dev/null
WT="$VR/.worktree"; rm -rf "$WT"; git -C "$ROOT" worktree prune
git -C "$ROOT" worktree add --detach "$WT" "$REF" >/dev/null
ln -s "$ROOT/node_modules" "$WT/node_modules"
trap 'git -C "$ROOT" worktree remove --force "$WT" >/dev/null 2>&1' EXIT
build_and_shoot "$WT" "$PORT" "$VR/.baseline/static" "$VR/.baseline/a" "$VR/.baseline/b"
echo "baseline of $(git -C "$ROOT" rev-parse --short "$REF"): $(ls "$VR/.baseline/a" | grep -c png) shots in $VR/.baseline/"
