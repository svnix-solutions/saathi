# Visual regression

Pixel-diffs every route of the three apps (148 screens, plus Brand and Decisions) against a baseline. Use it for
refactors, where nothing should change on screen.

```bash
scripts/visual/baseline.sh main        # shoot the routes at a git ref (twice) into scripts/visual/.baseline/
# … make your change …
scripts/visual/verify.sh my-change     # build the working tree, shoot, compare; exit 1 if anything differs
```

How it works:
- `keys.mjs` reads every route name from `src/apps/*/navigation/routeTable.ts`.
- `shoot.mjs` opens each route through the hidden `Testing/Route harness` story (`?route=<name>`) in headless
  Chrome (`CHROME_PATH` to override the Mac path), with a fixed clock, and retries captures that loaded badly.
- `compare.mjs` reports shots that differ from *both* baseline runs; `verify.sh` re-shoots those twice before
  reporting, because screens with timers and carousels move between runs.
- Shots cover each route's first render. States reached by clicking (sheets, error messages) are not covered.

Output (`.baseline/`, `.out/`) is git-ignored.
