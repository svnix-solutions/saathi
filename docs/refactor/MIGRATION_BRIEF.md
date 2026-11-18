# Phase 2 brief — move screens into features

Repo: `/Volumes/SanDisk/MacBook Pro M4/svnix/saathi`, branch `refactor/design-system` (checked out). Do not commit,
do not switch branches, do not start/stop dev servers on 6006/6008. Nine other agents work in the same tree at the
same time, each on different features.

## Read first
1. `docs/ARCHITECTURE.md` — the target structure and rules.
2. `src/native/ui/README.md` — the React Native components, and the **kit → component** tables that say exactly how to
   replace each old local helper (`kit.tsx`) with a design-system component and which props keep it pixel-identical.
   Admin agents: `src/apps/admin/ui/README.md` instead (helper → component, raw markup → component).
3. Your app's `state/` (`state/types.ts` lists every state field), `navigation/`, and `features/<yours>/index.ts`.
4. The old area files that hold your routes: find each route in `src/apps/<app>/<v1|v2a|v2b|v3|v1a|v1b|v2v3>/routes.ts`.

## What to do, per route you own
- Create `src/apps/<app>/features/<feature>/screens/<Name>Screen.tsx` (admin: `pages/<Name>Page.tsx`): **one screen per
  file**, `export function NameScreen(...)` plus `export default NameScreen`, a one-line JSDoc naming the design page
  and screen number (copy it from the old file's comments).
- Pieces used only by your feature → `features/<feature>/components/<Name>.tsx`. Sample data and constants →
  `features/<feature>/data.ts`. Non-UI logic (timers, validation, price maths) → a hook in `features/<feature>/hooks/`
  or a pure function. Shared business rules already live in `@/domain` (services, prices, codes, `rupees`, `dur`,
  `mmss`, Hindi service/task names) — use them, don't copy them.
- Register each screen in `features/<feature>/index.ts` under **the same route name** (route names are a fixed
  contract; never rename one). Also export the screens there. The app's `navigation/routes.ts` already merges your
  `routes` over the legacy ones, so your new screen goes live as soon as it is registered.
- State: `useCustomerState()` / `usePartnerState()` from `../../state` (not `useV1`, `useV2`, `useAppState<…>`).
  Tabs: `CustomerTabs` / `PartnerTabs` from `../../navigation/…`. Partner job logic (`jobReset`, `useStartCode`,
  `useJobClock`, `defaultToday`) is in `../../state`. Admin: `useAdmin` from `../../session`, components from
  `../../ui`, sample data from `../../fixtures`.
- Imports allowed: `@/native/ui` (or admin `../../ui`), `@/domain`, `@/tokens`, `@/data/...`, your app's `state/` and
  `navigation/`, your own feature, and **another feature only through its `index.ts`**. Never import from the old
  `v*` folders or their `kit.tsx` / `ui.tsx`.

## Style rules
- `StyleSheet.create` at the bottom of each file, using tokens (`spacing`, `radius`, `text` from `@/tokens`) and
  colours from `useTheme().c` or `palette`. **No hex colours** in screens. Inline `style={{…}}` only for values
  computed at render time. Read the README note about react-native-web: padding/margin/border values passed through a
  component's `style` prop must stay inline (a longhand only beats a shorthand when both are inline) — keep those
  inline so rendering stays identical.
- Admin (React DOM): move repeated inline styles into class names in a feature stylesheet
  `features/<feature>/<feature>.css`, every selector scoped under `.sa` and prefixed with the feature
  (e.g. `.sa .ops-kpis`). Import it from the feature's pages. Don't edit `styles/admin.css`.
- Screens are composition only. Name things for intent. Every `Pressable` without text gets an `accessibilityLabel`.
- Keep the copy, Hindi strings, sample data, behaviour and look **exactly** the same. This is a refactor.

## Do not edit
Old `v*` folders (they are deleted after everyone finishes), `state/`, `navigation/`, `App.tsx`, `chrome.tsx`,
`routes.ts`, `src/native`, `src/tokens`, `src/domain`, `src/data`, admin `ui/ layout/ session/ fixtures/ styles/`, other
features, stories in the old folders. If you need a state field that is not in `state/types.ts`, declare it in
`features/<feature>/state.ts` (`export type BookingState = CustomerState & {...}` and a typed hook) and list it in your
report. If you need a design-system change, work around it locally and list it in your report.

## Stories
Do not write per-screen stories (the design-page stories render every route and will be moved after you).
A feature component that is reusable may get a story titled `<App>/Features/<Feature>/<Component>`.

## Checks before you finish
1. `npx tsc --noEmit 2>&1 | grep "features/<yours>"` → no errors in your files (errors elsewhere may come from
   other agents mid-work).
2. `npx eslint src/apps/<app>/features/<feature>` for each of your features → 0 errors, 0 warnings.
3. Visual regression: `/private/tmp/claude-501/-Volumes-SanDisk-MacBook-Pro-M4-svnix-saathi/3a20dc98-d34d-40f1-b1f7-365b62cedd45/scratchpad/vr/verify.sh <yourname> <yourport>`.
   Every shot of **your** routes (`<app>__<route>`) must end in "match", or differ only in a live timer (open the
   diff PNG to confirm). Diffs on other routes come from other agents' unfinished work — ignore them. If the build
   fails because of someone else's file, wait a minute and re-run.
4. `grep -rn "from '\.\./\.\./\(v1\|v2a\|v2b\|v3\|v1a\|v1b\|v2v3\)/" src/apps/<app>/features/<yours>` → nothing.

## Final report (short)
Files created per feature, kit helpers replaced, any state fields or design-system changes you needed, lint and
verify results for your routes.
