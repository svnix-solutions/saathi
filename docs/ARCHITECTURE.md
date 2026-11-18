# Saathi front-end architecture

How the code is organised, and the rules every change follows. `docs/PROTOTYPE_GUIDE.md` covers how to use the
prototype; this file covers how to build it.

## Layers

Dependencies point **down only**. A layer never imports from a layer above it.

```
apps/            customer · partner · admin. Screens, grouped by feature.
  ↓
native/ui        React Native design system (atoms → molecules → organisms)
admin/ui         React DOM design system for the admin panel
  ↓
domain/          business rules and catalogues: services, prices, codes, formatting, i18n word lists
data/            launch values the founders change (launchValues.ts), professions catalogue
tokens/          colours, type scale, spacing, radii, elevation. No React.
```

- `tokens/` has no imports from the project.
- `domain/` may import `tokens/` and `data/` only. It has no React and no UI.
- `native/ui/` may import `tokens/` and `domain/` formatting helpers. It never imports from `apps/`.
- A feature may import the design system, `domain/`, its own app's `state/` and `navigation/`, and **only the public
  `index.ts` of another feature** (never its inner files).

## Folder layout

```
src/
  tokens/                       colors.ts typography.ts spacing.ts radii.ts elevation.ts index.ts
  domain/                       services.ts pricing.ts codes.ts format.ts i18n/ (service & task names)
  data/launchValues.ts          launch values the founders change (`decisions`), re-exported by domain/
  native/
    theme/                      ThemeProvider, useTheme, useT, locales
    navigation/                 NavProvider, useNav, useAppState
    ui/
      atoms/<Name>/             Name.tsx · Name.stories.tsx · index.ts
      molecules/<Name>/
      organisms/<Name>/
      layout/<Name>/
      device/                   Phone, PhoneRow
      hooks/                    useCountdown, useInterval, …
      index.ts                  the only import path screens use: '@/native/ui'
  apps/
    customer/
      App.tsx                   CustomerApp (phone + navigator)
      navigation/routes.ts      route table with metadata (release, design page, feature)
      navigation/TabBar.tsx     CustomerTabs
      state/                    CustomerState type, initial state, selectors, useCustomerState
      fixtures/                 sample people, bookings, reviews (prototype data only)
      features/<feature>/
        screens/<Name>Screen.tsx   one screen per file, default export + named export
        components/             pieces used only by this feature
        hooks/  data.ts         feature logic and sample data
        index.ts                public API: screens + route entries
      design-pages/NN-<slug>.stories.tsx   every screen, grouped as the design pages draw them (design review);
                                tagged v1/v2/v3 — this is where screen stories live
    partner/                    same shape as customer
    admin/
      App.tsx                   AdminApp
      layout/                   Sidebar, TopBar, AdminLayout
      navigation/               router, page table with metadata, menu
      session/                  roles, permissions, useAdmin
      ui/<Name>/                admin design system (Button, Tag, Kpi, Table, Modal, Field, …)
      styles/admin.css          one stylesheet, scoped under .sa
      fixtures/                 sample bookings, partners, tickets…
      features/<feature>/pages/<Name>Page.tsx
```

## Components

- **One component per file**, named like the file. Stories sit next to the component.
- **Atoms** have no app knowledge (Text, Icon, Tag, Toggle, Radio, Avatar). **Molecules** combine atoms (Button,
  Card, Input, Stepper, MenuRow). **Organisms** are full sections (TopBar, TabBar, Sheet, MapMock).
- Props are **typed and named for intent**: `variant`, `tone`, `size`, `selected`, `disabled`, `onPress`.
  Prefer a `variant` union over several booleans. Every prop that can change the look has a story control.
- Styles use `StyleSheet.create` at the bottom of the file, with values from `tokens/` (spacing, radii, type) and
  colours from `useTheme().c`. Inline `style={{…}}` only for a value computed at render time.
  react-native-web caveat: a longhand (`paddingVertical`) only beats a shorthand (`padding`) when both are inline, so
  padding/margin/border values passed through a component's `style` prop stay inline.
- No hard-coded hex colours in `apps/`. Brand colours come from `palette`, theme colours from `useTheme().c`.
- Screens are **composition only**: layout plus design-system components plus feature components. Logic that is
  not about rendering (pricing, validation, formatting, timers) lives in `domain/`, a hook, or `state/` selectors.
- Every text string goes through `t(en, hi)`. Shared word lists (service and task names) live in `domain/i18n`.
- Accessibility: every `Pressable` has `accessibilityRole` and a label when it has no text.

## Screens and routes

- Route names are the stable public contract (they appear in links, stories and tests). Do not rename them.
- Each route entry carries metadata: `{ name, component, release: 'v1' | 'v2' | 'v3', designPage, title, feature }`.
  Storybook stories get the matching tags (`v1`, `v2`, `v3`) so the sidebar can be filtered by release.

## Storybook segments

```
Saathi/            Introduction, Brand, Decisions, Architecture
Foundations/       Colours, Typography, Spacing, Icons, Characters & faces
Components/        Native/{Atoms,Molecules,Organisms,Layout}, Admin/{…}
Customer app/      Prototype · Features/<feature> · Design pages/<NN …>
Partner app/       same
Admin panel/       Prototype · Features/<feature> · Design pages
Testing/           hidden harness used by visual-regression shots
```

## Quality gates

`npm run typecheck`, `npm run lint`, and `npm run build-storybook` must pass, and so must the visual-regression shots
(every route rendered through `Testing/Route harness`, see `scripts/visual/`). CI runs the first three on every pull
request.
