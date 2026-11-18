# Shared by baseline.sh and verify.sh. Build Storybook from a source dir and shoot every route.
VR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROOT=$(cd "$VR/../.." && pwd)

# shoot_build <srcDir> <port> <outDir> [runs...]: static build of <srcDir>, then one shot set per extra dir name
build_and_shoot() {
  local src=$1 port=$2 static=$3; shift 3
  rm -rf "$static"
  (cd "$src" && STORYBOOK_DISABLE_TELEMETRY=1 npx storybook build -o "$static" --quiet 2>&1 | grep -E " error|Error:|✘" | head -20) || true
  test -f "$static/iframe.html" || { echo "BUILD FAILED"; return 1; }
  python3 -m http.server "$port" -d "$static" >/dev/null 2>&1 & local srv=$!
  sleep 1
  local out; for out in "$@"; do rm -rf "$out"; node "$VR/shoot.mjs" "$port" "$out" >/dev/null; done
  kill $srv 2>/dev/null
}
