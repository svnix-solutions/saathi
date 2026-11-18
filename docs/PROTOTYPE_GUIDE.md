# Saathi prototype — build guide

The product is **Saathi** (customer app), **Saathi Partner** (helper app) and **Saathi Admin** (web panel).

- Design source of truth: `web/design/saathi-design.html` (one `<section class="page">` per design page; the
  `<!-- NN. NAME -->` comments mark sections). Rendered PDFs for looking at the pages: `web/design/customer-app.pdf`,
  `worker-app.pdf`, `admin-panel.pdf` (Read tool with `pages:`; make them with `python3 web/design/build.py`, they are not in git). Launch values: `src/data/decisions.ts`.
- Stack: Storybook 10 with `@storybook/react-native-web-vite`. Customer and Partner apps are **React Native**
  (rendered on web via react-native-web). The admin panel is **React DOM**.
- Storybook dev server is already running on http://localhost:6006. Do not start or stop it.

## Customer and Partner apps (React Native)

Import everything from `@/native/ui` (see `src/native/ui/primitives.tsx`; its header comment maps each design
CSS class to a component):

| design | component |
|---|---|
| `.scr` | `<Screen>` (scrolls, padding 20/16/14, gap 11). Put `<TopBar>` above and the tab bar below it inside a `<View style={{flex:1}}>` |
| `.h` `.h2` `.s` `.m` | `<H>`, `<H2>`, `<T s>`, `<T m>` (`<H size={22}>` for sign-in titles) |
| `.card` `.sel` | `<Card sel tone="yellow|mint|red|clear|ink" row onPress>` |
| `.btn` `.btn.o` `.btn.y` | `<Button variant="primary|outline|yellow|ghostDark" big danger icon>` |
| `.end` (push to bottom) | `<Spacer />` before the bottom button |
| `.pill`, `.g2`, `.g3` | `<Pill sel onPress>`, `<Grid cols={2|3}>` |
| `.cb` | `<Check on>`, `<CheckRow on label onPress done>` |
| `.tag` g/n/x/r | `<Tag tone="y|g|n|x|r">` |
| `.ic` | `<IconTile name onPress>` |
| `.inp`, `.otp` | `<Input prefix placeholder value onChangeText>`, `<OtpInput value onChange error>` |
| `.tog` | `<Toggle on onChange big>` |
| `.av.f-xx` | `<Avatar face="sd" size={40}>` / `<Avatar initials="NK">` |
| `.ch.c1…c6` | `<CharacterTile name="clean|deep|kitchen|laundry|custom|hero" size zoom x y>` |
| `.map` + `.dot` | `<MapMock height dots={[{x,y,icon,tone}]}>` |
| svg `#name` | `<Icon name="pin" color fill size>` |
| others | `Ring` (countdown), `Bars` (chart), `Bubble` (chat), `Stars`, `Steps`, `Sheet` (bottom sheet), `Hr`, `Row`, `Lft`, `Col`, `BackHeader`, `Link`, `Mark` |

Rules:
- Colours come from `useTheme().c` (never hard-code `#fff` for surfaces/text), so dark mode works. Use
  `palette.yellow` / `palette.green` only where the design means that exact brand colour.
- Strings: `const t = useT(); t('English', 'हिन्दी')`. The **v1** areas must give Hindi for every visible
  string on the main flows (the design shows Hindi screens). Other areas: English is fine, add Hindi for titles and buttons where easy.
- Navigation: `const nav = useNav()` → `nav.push('route', params)`, `nav.back()`, `nav.reset('home')`,
  `nav.toast('Saved')`. Route names are fixed in `src/apps/<app>/ROUTES.md`. You may link to routes owned by
  other areas: they are being built in parallel (a missing one shows a toast, it does not crash).
- Shared prototype state: `const [st, set] = useAppState<CustomerState>()` (types in `src/apps/<app>/chrome.tsx`).
  Screens must still render with defaults when opened alone.
- Bottom tabs: `<CustomerTabs active="home" />` / `<PartnerTabs active="earnings" />` from `../chrome`.
- **Make it work**: every button and link does something sensible (navigates, toggles, selects, opens a
  `Sheet`, or shows `nav.toast`). Selections, ticks, text inputs, stars and timers are live (`useState`,
  `useEffect` timers for countdowns are welcome). Follow the flow the design describes in its page subtitle
  and captions (e.g. new number → name → address → home; wrong code shows the error).
- Match the design closely: same copy, order, sample names and amounts, sizes and spacing.
  Use `style` for one-off values exactly as the design's inline styles do.
- Variant pages (dark mode, large text, Hindi, small phone) are **not** new screens: render existing screens
  with `<CustomerApp initial="home" dark />`, `textScale={1.22}`, `locale="hi"`, `device="small"`.

## Admin panel (React DOM)

`src/apps/admin/shell.tsx` gives `AdminApp`, `useAdmin()` (`go`, `back`, `toast`, `roles`, `params`),
the sidebar/top bar, and helpers: `I` (icon), `Av` (face avatar), `Tag`, `Kpi`, `PageHead`, `Tabs`, `Pager`,
`Bar`, `Toggle`, `Check`, `Modal`. Styles are the design CSS ported to `admin.css` and scoped under `.sa`, so
**write JSX with the same class names the design uses** (`card`, `row`, `lft`, `h2`, `m`, `s`, `tag g`, `btn o`,
`stat`, `kpi`, `pg`, `g2`, …) and keep the design's inline styles (as React style objects). A page renders the
content of `.main` (everything after the design's `<div class="tb">…</div>`); the shell draws the sidebar and top bar.
Use `<button className="btn o sm">` for clickable buttons. Page names are fixed in `src/apps/admin/PAGES.md`.
Make it work: filter tabs filter, rows open detail pages, approve/reject/assign change state and toast,
forms accept input, modals confirm destructive actions.

## Files and ownership

You own **only** your area folder (e.g. `src/apps/customer/v1/`). Do not edit shared files (`src/native/**`,
`src/tokens`, `src/data`, `*/App.tsx`, `*/chrome.tsx`, `*/shell.tsx`, `admin.css`, other areas). If you need a
small helper that is missing, write it inside your folder. Mention anything that belongs in the shared kit in
your final report.

- Register every screen in your area's `routes.ts` (`export const routes: RouteMap = { home: HomeScreen, … }`).
- Group screens by design section in files like `v1/booking.tsx`.
- One stories file per design section, e.g. `v1/booking.stories.tsx`:
  - `title: 'Customer app/V1 · Launch/03 Book a helper'` (use the design's page number and title, minus "Customer app:").
    Partner: `'Partner app/V1 · Launch/…'`, Admin: `'Admin panel/V1 · Launch/…'`; V2 and V3 likewise.
  - First story `DesignPage` (`parameters: { layout: 'fullscreen' }`): all screens of the section side by side in
    `<PhoneRow>`, each a live `<CustomerApp initial="route" caption="5 · Home" sub="Five services, speed promise on top" />`.
  - Then one story per screen (`<CustomerApp initial="chores" />`).
  - Admin: one story per page rendering `<AdminApp pages={adminPages} initial="page" />` with `layout: 'fullscreen'`.
  - Import `CustomerApp` / `PartnerApp` from `../App`, `adminPages` from `../routes`.

## Checks before you finish

1. `npx tsc --noEmit 2>&1 | grep <your folder>` → no errors in your files.
2. For each file you wrote: `curl -s http://localhost:6006/src/apps/<app>/<area>/<file>.tsx | head -3` must return
   JavaScript, not an error message (this is Vite's transform of the file).
3. Do not run `storybook build`, do not use the browser, do not commit.
