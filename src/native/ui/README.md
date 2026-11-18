# Saathi native design system (`@/native/ui`)

React Native components for the customer and partner apps (rendered in Storybook through react-native-web).
**Screens import only from `@/native/ui`** (components, hooks, theme, navigation) and from `@/domain` (prices, formatting,
word lists). Never import a component's inner file.

```
src/native/ui/
  atoms/<Name>/        Name.tsx · Name.stories.tsx · index.ts      (Icon and Mark also have Name.web.tsx)
  molecules/<Name>/
  organisms/<Name>/
  layout/<Name>/
  device/<Name>/       Phone, PhoneRow
  hooks/<name>/        useCountdown, useInterval, useTimeout, useTimer, useNow
  index.ts             the only import path: '@/native/ui'
src/native/theme/      ThemeProvider, useTheme, useT, types        (src/native/theme.tsx is a re-export shim)
src/native/navigation/ NavProvider, NavOutlet, useNav, useBack, useAppState   (src/native/nav.tsx is a shim)
src/tokens/            colors (palette, tint, light, dark) · typography (font, text) · spacing (spacing, space) · radii · elevation
src/domain/            services · pricing · codes · format · i18n/{serviceNames,taskNames}   (import from '@/domain')
src/data/decisions.ts  compatibility barrel; the launch values themselves are in src/data/launchValues.ts
```

Every component reads colours and the text scale from `useTheme()`, so dark mode and large text work everywhere.
All names exported before the split are still exported with the same props and the same rendering.

## Component inventory

| Name | Group | What it is |
|---|---|---|
| `T` | Atoms | Body text, 12px / `s` 11px; `m` muted, `b` bold, `center`, `strike`, `color`, `size`. New: `variant: 'body' \| 'small'`, `tone: 'ink' \| 'muted' \| 'accent' \| 'red' \| 'white'` |
| `H` | Atoms | Screen headline 19px bold. `size`, `color`, `center`. New: `variant: 'title' \| 'headline' \| 'display'` (19 / 22 / 28) |
| `H2` | Atoms | Section label 13px bold. `color`, `m`, `center` |
| `Link` | Atoms | Green bold 11px inline action. `onPress`, `color`, `style`. New: `center` |
| `Icon` | Atoms | Line icon (`name: IconName`, `size` 18, `color`, `fill`, `strokeWidth`). `iconNames` lists them |
| `Mark` | Atoms | Saathi logo tile. `size`, `reversed` |
| `Avatar` | Atoms | Round face crop (`face: Face`) or initials on yellow. `size`, `bg`. `faceIds` lists faces |
| `CharacterTile` | Atoms | Service character in a rounded tile. `name: Character`, `size`, `width/height`, `zoom`, `x/y`, `bg`, `radius`. `characterIds` lists them |
| `Check` | Atoms | Checkbox box. `on`, `size` (18). New: `disabled` |
| `Radio` | Atoms | Round radio. `on` (or `selected`), `size` (18), `mark: 'check' \| 'dot'`, `checkSize`, `disabled` |
| `Toggle` | Atoms | Switch. `on`, `onChange`, `big`. New: `disabled`, `accessibilityLabel` |
| `Tag` | Atoms | Status chip. `tone: 'y' \| 'g' \| 'n' \| 'x' \| 'r'` or the long names `'yellow' \| 'green' \| 'mint' \| 'grey' \| 'red'` |
| `Badge` | Atoms | Small count bubble / dot. `count?`, `max` (9), `tone: 'red' \| 'yellow' \| 'green'`. Also drawn by `TabBar` when a tab has `badge` |
| `IconTile` | Atoms | Mint rounded square with an icon. `name`, `size` (34), `color`, `bg`, `onPress` |
| `Hr` | Atoms | 1px line |
| `Chevron` | Atoms | Muted right chevron for row ends. `color`, `size` |
| `Dots` | Atoms | Carousel dots. `count`, `active`, `onPress(i)` |
| `Steps` | Atoms | Segmented step bar. `step`, `total`. New: `label` (caption under the bar) |
| `Stars` | Atoms | Star rating. `value`, `onChange`, `size` (16), `max` (5) |
| `ProgressBar` | Atoms | Thin bar, yellow on dark green by default. `value` (0–1), `track`, `fill`, `height` (8), `extra`, `style` |
| `Meter` | Atoms | Green-on-mint meter, `flex: 1`. `value` (0–1), `mark` (threshold tick 0–1), `style` |
| `Circle` | Atoms | Centred round placeholder. `size`, `bg`, `border` (3px dashed colour), `style`, children |
| `StatusIcon` | Atoms | 64px round icon on error / quiet screens. `name`, `tone: 'neutral' \| 'danger' \| 'red'`, `size` (64), `style` |
| `Button` | Molecules | `variant: 'primary' \| 'outline' \| 'yellow' \| 'ghost' \| 'ghostDark' \| 'plain'`, `big`, `danger`, `disabled`, `icon`, `style`, `textStyle`. New: `size: 'regular' \| 'big' \| 'tall'`, variant `plain`, `accessibilityLabel` |
| `Card` | Molecules | Bordered surface. `sel` (or `selected`), `tone: 'yellow' \| 'mint' \| 'red' \| 'clear' \| 'ink'`, `pad`, `row`, `onPress`, `style` |
| `Pill` | Molecules | Selectable chip. `sel` (or `selected`), `s`, `onPress`, `style`. New: `disabled` |
| `CheckRow` | Molecules | Checkbox + label row. `on`, `label`, `onPress`, `size`, `done`, `s`. New: `disabled` |
| `Input` | Molecules | Text field. `value`, `onChangeText`, `placeholder`, `prefix`, `keyboardType`, `small`, `multiline`, `maxLength`, `secure`, `style` |
| `OtpInput` | Molecules | 4/6 box code input. `length`, `value`, `onChange`, `error` |
| `Bubble` | Molecules | Chat bubble. `me` |
| `Ring` | Molecules | Circular countdown. `pct` (elapsed 0–1), `size` (150), children |
| `Bars` | Molecules | Bar chart. `values` (0–1), `highlight`, `labels`, `height` (96) |
| `Stepper` | Molecules | "− n +" pills or an "Add" pill at 0. `value`, `onChange`, `min` (0), `max` (9), `addLabel` ("Add") |
| `MenuRow` | Molecules | Tappable list row with chevron. `label`, `sub`, `icon`, `right`, `color`, `onPress` |
| `KeyValue` | Molecules | "label …… value" line. `label`, `value`, `variant: 'receipt' \| 'total' \| 'plain'`, `valueTone: 'default' \| 'accent'` |
| `Rows` | Molecules | Children separated by `Hr`. `gap` (10) |
| `ListCard` | Molecules | `Card` + `Rows` in one. All `Card` props except `row`, plus `gap` |
| `PhotoTile` | Molecules | Photo slot. `variant: 'add' \| 'thumb'`; add: `label`, `added`, `icon`, `onPress`, `height` (78), `bold`; thumb: `label`, `dark`, `size` (58), children |
| `TabBar` | Organisms | Bottom tabs. `tabs: { key, label, icon, badge? }[]`, `active`, `onChange` |
| `TopBar` | Organisms | Green header. `style`. Parts: `TopBar.Title`, `.Heading`, `.Text`, `.Back`, `.Label`, `.Progress` (below) |
| `BackHeader` | Organisms | "‹ Title" row. `title`, `onBack`, `right`, `color`. New: `fallback` (route to reset to when there is no history) |
| `MapMock` | Organisms | Stylised map. `height` (230), `dots: { x, y, icon?, tone?, label? }[]`, `route`, children |
| `Sheet` | Organisms | Bottom sheet with backdrop. `visible`, `onClose` |
| `PickSheet` | Organisms | Sheet with a title and pills to pick one. `visible`, `title`, `options: { v, label }[]`, `value`, `onPick`, `onClose`, `cols` (2), `closeLabel` ("Close") |
| `Toast` | Organisms | Message at the top of the phone. `message` (the Phone shows `nav.toast()` itself) |
| `Row` / `Lft` / `Col` | Layout | Row spread to both ends / row packed left / column. `gap` (8 / 8 / 0), `style` |
| `Grid` | Layout | Equal columns. `cols` (2), `gap` (9, or 7 for 3 cols) |
| `Spacer` | Layout | Pushes what follows to the bottom of a `Screen` |
| `Screen` | Layout | Phone screen body: padding 20/16/14, gap 11, scrolls. `gap`, `scroll`, `pad`, `bg`, `style` |
| `Page` | Layout | Full-height screen root. `variant: 'surface' \| 'bare'`, `bg`, `style` |
| `Phone` | Device | Phone frame 280×600 (236×500 small). `caption`, `sub`, `bg`, theme props `dark`, `textScale`, `locale`, `device` |
| `PhoneRow` | Device | Phones side by side (design page layout) |

**TopBar parts** (all white): `TopBar.Title` = `H` (`size`), `TopBar.Heading` = `H2`, `TopBar.Text` = small `T`
(`dim` = opacity .8, `b`, `style`), `TopBar.Back` (back arrow, nothing when no history; `color`), `TopBar.Label`
(dimmed small text + back chevron when there is history), `TopBar.Progress` (`value`; `ProgressBar` with `marginTop: 10`).

**Hooks**: `useCountdown(from, running = true, stepMs = 1000) → [value, set]` · `useTimer(running = true, from = 0,
stepMs = 1000, max?) → [value, set]` (counts up) · `useInterval(fn, ms | null, enabled = true)` · `useTimeout(fn, ms,
enabled = true, key?)` · `useNow(ms = 1000) → Date.now()` · `useBack(fallback = 'home') → () => void` (navigation) ·
`useT`, `useTheme`, `useNav`, `useAppState`.

## Kit → component table

Swap mechanically. "Same" means same props and same pixels. Imports: components and hooks from `@/native/ui`,
everything in the *domain* column from `@/domain`.

### customer/v1/kit.tsx

| Old | New |
|---|---|
| `svc(id)` | `serviceById(id)` (domain) |
| `svcName(t, id)` | `serviceName(t, id)` (domain; uses `serviceNamesHiPage18`, same words) |
| `shortName(t, id)` | `serviceShortName(t, id)` (domain) |
| `taskHi` | `taskNamesHi` (domain) |
| `taskName(t, task)` | `taskName(t, task)` (domain, same) |
| `TFn` | `TFn` (domain) |
| `dur(t, min)` | `dur(t, min)` (domain, same) |
| `priceOf(st)` | `priceOf(st)` (domain, same; takes `{ service, minutes }`) |
| `clock(sec)` | `clock(sec)` (domain, same; equals `mmss` for whole seconds) |
| `useCountdown(from, running, stepMs)` | `useCountdown(from, running, stepMs)` (same) |
| `<MenuRow label sub onPress icon right color />` | `<MenuRow …>` (same props) |
| `<Rows gap>` | `<Rows gap>` (same); `<Card><Rows>…</Rows></Card>` may become `<ListCard>…</ListCard>` |
| `<BigIcon name={n} />` | `<StatusIcon name={n} style={{ marginTop: 18 }} />` |
| `<BigIcon name={n} danger />` | `<StatusIcon name={n} tone="danger" style={{ marginTop: 18 }} />` |
| `<Radio on={x} />` | `<Radio on={x} />` (same) |
| `V1State`, `useV1`, `defaultUpcoming` | stay in the app (`state/`): app state, not design system |

### customer/v2a/kit.tsx

| Old | New |
|---|---|
| `visitPrice` | `visitPrice` (domain, same) |
| `rupees` | `rupees` (domain; `inr` is an alias) |
| `<Stepper value onChange min max />` | `<Stepper …>` (same; new optional `addLabel`, default "Add" as before) |
| `<Line label value />` | `<KeyValue label={…} value={…} />` |
| `<Line label value green />` | `<KeyValue label value valueTone="accent" />` |
| `<Line label value bold />` | `<KeyValue label value variant="total" />` |
| `<Radio on />` | `<Radio on />` (same) |
| `<TopBack />` / `<TopBack color={x} />` | `<TopBar.Back />` / `<TopBar.Back color={x} />` |
| `<PickSheet visible title options value onPick onClose cols />` | `<PickSheet …>` (same; new `closeLabel`) |
| `fmtMin(m)` | `fmtMin(m)` (domain, same) |
| `V2State`, `useV2` | stay in the app |

### customer/v2b/kit.tsx (also used by customer/v3)

| Old | New |
|---|---|
| `<Radio on />` | `<Radio on checkSize={11.88} />` for pixel-identical (v2b drew the tick at `size * 0.66`; plain `<Radio on />` draws it at 12, 0.12px larger) |
| `<Radio on size={n} />` | `<Radio on size={n} />` (same for n ≠ 18) |
| `useBack(fallback)` | `useBack(fallback)` (same, from `@/native/ui`) |
| `<Back title={x} />` | `<BackHeader title={x} fallback="home" />` |
| `<Back title={x} fallback={r} right={y} />` | `<BackHeader title={x} fallback={r} right={y} />` |
| `<Dots count active onPress />` | `<Dots …>` (same) |

### partner/v1/kit.tsx

| Old | New |
|---|---|
| `<Page>` / `<Page bg={x}>` | `<Page>` / `<Page bg={x}>` (same) |
| `<TopT>` / `<TopT dim b style>` | `<TopBar.Text>` / `<TopBar.Text dim b style>` |
| `<TopH>` / `<TopH size={n}>` | `<TopBar.Title>` / `<TopBar.Title size={n}>` |
| `<TopH2>` | `<TopBar.Heading>` |
| `TopBar` (re-export) | `TopBar` |
| `<Big …>` | `<Button size="tall" …>`; `variant`, `disabled`, `icon`, `style` carry over. `pad={n}` → `style={{ paddingVertical: n }}`, `size={n}` → `textStyle={{ fontSize: fs(n) }}`, `textColor={x}` → `textStyle={{ color: x }}` |
| `<Plain onPress>` | `<Button variant="plain" onPress>` |
| `<SignupSteps step={n} />` | `<Steps step={n} total={6} label={t(\`Sign-up · step ${n} of 6\`, \`साइन-अप · चरण ${n} / 6\`)} />` |
| `<SignupSteps step={n} label={false} />` | `<Steps step={n} total={6} />` |
| `<Cb on />` / `<Cb on size={n} />` | `<Check on size={24} />` / `<Check on size={n} />` |
| `<Chev />` | `<Chevron />` |
| `<PhotoTile added label icon onPress height bold />` | `<PhotoTile …>` (same props; `variant="add"` is the default) |
| `<KV k={a} v={b} />` | `<KeyValue variant="plain" label={a} value={b} />` |
| `mmss(s)` | `mmss(s)` (domain, same) |
| `leftLabel(sec, hi)` | `leftLabel(sec, hi)` (domain, same) |
| `useCountdown(from, running)` | `useCountdown(from, running)` (same) |
| `useJobClock()` | stays in the app (reads `st.jobEndsAt`); its ticking part is `useNow()` |
| `<Badge name={n} />` | `<StatusIcon name={n} />` |
| `<Badge name={n} tone="red" />` | `<StatusIcon name={n} tone="red" />` |
| `<GreenText onPress>` / `<GreenText center>` | `<Link onPress>` / `<Link center>` (role becomes `link`; same pixels) |
| `jobReset`, `useStartCode`, `PayLine`, `V1State`, `defaultToday`, `withLang` | stay in the app (`state/` or the feature): partner job logic |

### partner/v2/kit.tsx

| Old | New |
|---|---|
| `<TopProgress pct={p} />` | `<TopBar.Progress value={p} />` |
| `<Meter pct={p} mark={m} style />` | `<Meter value={p} mark={m} style />` |
| `<TopLabel>` | `<TopBar.Label>` |
| `<Root>` | `<Page variant="bare">` |
| `onGreen` | `palette.white` (or `useTheme().c.onGreen`) |
| `<Circle size bg border style>` | `<Circle …>` (same) |

### partner/v3/kit.tsx

| Old | New |
|---|---|
| `<Progress pct={p} track fill height extra style />` | `<ProgressBar value={p} track fill height extra style />` (same defaults) |
| `<TopS style>` | `<TopBar.Text dim style>` |
| `<TopH>` / `<TopH size={n}>` | `<TopBar.Title size={26}>` / `<TopBar.Title size={n}>` (v3 default was 26) |
| `<PhotoTile label dark>` / with children | `<PhotoTile variant="thumb" label dark>` / `<PhotoTile variant="thumb">…</PhotoTile>` |
| `weekAhead(weeks, from?)` | `weekAhead(weeks, from?)` (domain, same) |

### Local copies inside screens

| Where | Old | New |
|---|---|---|
| partner/v1/work.tsx | local `Radio` (22px, white dot) | `<Radio on={x} size={22} mark="dot" />` |
| customer/v1/errors.tsx | local `OutlineInk` | `<Button variant="plain" onPress>` |
| partner/v1/jobs.tsx | `taskHi` | `taskNamesHiPartner` (domain; note `'Wipe kitchen'` = "रसोई पोंछना" here vs "किचन पोंछना" in `taskNamesHi`) |
| partner/v1/jobs.tsx | `serviceHi` (keyed by English title) | `serviceNamesHiByTitle` (domain) |
| any screen | `useEffect(() => { const id = setInterval(f, ms); return () => clearInterval(id); }, [])` | `useInterval(f, ms)` |
| any screen | `useEffect(() => { const id = setTimeout(f, ms); return () => clearTimeout(id); }, [])` | `useTimeout(f, ms)` |
| any screen | `setSecs((s) => s + 1)` every second | `const [secs, setSecs] = useTimer(running)` |
| admin/v1b/data.ts | `inr` | `inr` (domain) |

### Word lists that disagree (kept apart on purpose)

- Service names: `serviceNamesHi` (catalogue, `services[].nameHi`) vs `serviceNamesHiPage18` (customer v1 screens):
  kitchenBath "किचन और बाथरूम" / "रसोई और बाथरूम", dishes "बर्तन और खाना तैयारी" / "बर्तन और तैयारी",
  laundry "कपड़े और व्यवस्था" / "कपड़े और अलमारी". `serviceNamesHiByTitle` is the partner list keyed by English title.
- Task names: `taskNamesHi` (customer) vs `taskNamesHiPartner` (partner, 5 entries): only 'Wipe kitchen' differs.
- `taskName(t, task, list?)`, `serviceName(t, id, list?)` and `serviceShortName(t, id, list?)` take the list as an
  optional third argument.

## Rules

- Styles: static parts in `StyleSheet.create` at the bottom of the file, tokens for values, colours from
  `useTheme().c`. Padding, margin and border values of a component that accepts `style` stay in the inline object:
  react-native-web gives a longhand (`paddingVertical`) priority over a shorthand (`padding`) only when both are inline,
  so moving one of them into a class would change what a caller's `style` overrides.
- New props may be added to a component; existing props are never removed or renamed.
- Every component has a story under `Components/Native/<Group>/<Name>` with controls for the props that change the look.
