# Saathi prototype — contributor guide

The product is **Saathi** (customer app), **Saathi Partner** (helper app) and **Saathi Admin** (web panel).
The structure and its rules are in [ARCHITECTURE.md](ARCHITECTURE.md); this guide is the practical "how do I…".

- Design source of truth: `web/design/saathi-design.html` (one `<section class="page">` per design page). Make the
  PDFs with `python3 web/design/build.py`. Launch prices and rules: `src/data/launchValues.ts` (read through `@/domain`).
- Stack: Storybook 10 with `@storybook/react-native-web-vite`. Customer and Partner apps are **React Native**
  (rendered on the web through react-native-web). The admin panel is **React DOM**.

## Run it

```bash
npm run storybook     # http://localhost:6006
npm run check         # typecheck + lint + static build: what CI runs
scripts/visual/verify.sh mychange 6040   # pixel diff of every route against the baseline (see scripts/visual/README.md)
```

## Add a screen (customer or partner)

1. Pick the feature that owns it (`src/apps/<app>/features/<feature>/`; the list and each route's feature are in
   `ROUTES.md`). A new area of the product gets a new feature folder with an `index.ts`, and one line in
   `navigation/routes.ts`.
2. Write `features/<feature>/screens/<Name>Screen.tsx`, one screen per file:

   ```tsx
   /** Design page 03 · 6 · Choose chores (params: { service }). */
   export function ChoresScreen({ params }: ScreenProps<{ service?: ServiceId }>) {
     const nav = useNav();
     const t = useT();
     const [st, set] = useCustomerState();
     return (
       <Page>
         <Screen>
           <BackHeader title={t('General cleaning', 'सामान्य सफ़ाई')} onBack={nav.back} />
           …
           <Spacer />
           <Button onPress={() => nav.push('time')}>{t('Continue', 'आगे बढ़ें')}</Button>
         </Screen>
       </Page>
     );
   }
   export default ChoresScreen;
   ```

3. Register it in the feature's `index.ts` under a route name, and add a row to `navigation/routeTable.ts`
   (release, design page, feature, title). Route names never change once used.
4. Show it in the matching `design-pages/NN-….stories.tsx` story (a caption and the route), so design review sees it.

Building blocks, all from `@/native/ui` (inventory and props: `src/native/ui/README.md`, and the
**Components/Native** section of Storybook):

| design | component |
|---|---|
| `.scr` | `<Screen>` inside `<Page>`; `<TopBar>` above it, `<CustomerTabs>` / `<PartnerTabs>` below |
| `.h` `.h2` `.s` `.m` | `<H>`, `<H2>`, `<T s>`, `<T m>` |
| `.card` `.sel` | `<Card sel tone row onPress>`; rows split by lines: `<ListCard>`, `<MenuRow>`, `<KeyValue>` |
| `.btn` `.btn.o` `.btn.y` | `<Button variant="primary\|outline\|yellow\|plain\|ghostDark" size="tall">` |
| `.pill`, `.g2`, `.g3` | `<Pill sel onPress>`, `<Grid cols>` |
| `.cb`, radio, `.tog` | `<Check>`, `<CheckRow>`, `<Radio>`, `<Toggle>` |
| `.tag`, `.ic` | `<Tag tone>`, `<IconTile>`, `<StatusIcon>` |
| `.inp`, `.otp` | `<Input>`, `<OtpInput>`, `<Stepper>` |
| `.av`, `.ch` | `<Avatar face>`, `<CharacterTile name>` |
| others | `MapMock`, `Ring`, `Bars`, `ProgressBar`, `Meter`, `Bubble`, `Stars`, `Steps`, `Dots`, `Sheet`, `PickSheet`, `PhotoTile` |
| timers | `useCountdown`, `useTimer`, `useInterval`, `useTimeout`, `useNow` |

Rules that keep it consistent:
- Colours from `useTheme().c` (dark mode) or `palette` / `tint` from `@/tokens`. Lint rejects hex colours.
- Every string through `t(en, hi)`; shared word lists (service and task names) come from `@/domain`.
- State through `useCustomerState()` / `usePartnerState()`. A field only one feature uses goes in that feature's
  `state.ts`; a field two features share goes in `state/types.ts`.
- Logic that is not rendering (prices, validation, timers) goes in `@/domain`, a feature hook, or `data.ts`.
- Make it work: every button does something (navigate, toggle, open a `Sheet`, or `nav.toast`).

## Add an admin page

Same shape under `src/apps/admin/features/<feature>/pages/<Name>Page.tsx`, registered in the feature's `index.ts`
as `{ name: { section, title, component } }` (section = the highlighted sidebar item). Use components from
`src/apps/admin/ui` (inventory: its README; Storybook **Components/Admin**), session and roles from `session/`, sample
data from `fixtures/`. Styles: the design classes in `styles/admin.css` (`card`, `row`, `tag g`, `btn o`, …), and
anything new in a feature stylesheet scoped under `.sa` with a feature prefix.

## Variants

Dark mode, large text, Hindi and small phone are theme props, not separate screens: the Storybook toolbar sets them
for every phone, and stories can pass them (`<CustomerApp initial="home" dark />`, `textScale={1.22}`,
`locale="hi"`, `device="small"`).

## People and service pictures

Faces (`<Avatar face>`) and service pictures (`<CharacterTile name>`) are square Unsplash photos in
`public/img/photos/`, listed with their photographers in `public/img/photos/CREDITS.md`. To add a person, add a
320×320 face-centred crop there, a line in `src/native/ui/atoms/Avatar/faces.ts`, a `.f-xx` rule in `admin.css` (for
the admin panel), and a row in CREDITS.md.
