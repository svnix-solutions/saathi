# Admin design system (`src/apps/admin/ui`)

React DOM components for the Saathi admin panel. They draw with the class names of `../styles/admin.css`
(scoped under `.sa`), so they only look right inside `<AdminApp>` or the story decorator `withAdmin`
(`<div className="sa"><Sprite/>…</div>`). Stories: **Components/Admin/&lt;Name&gt;**.

Import from the folder index only:

```ts
import { Button, Tag, StatusTag, Kpi, KpiGrid, Table, TableCard, Modal, Field } from '../ui';      // from a page in v1a/ v1b/ v2v3/
import { useAdmin, type Role } from '../session';
import { menu, type PageMap } from '../navigation';
import { useStore, patchBooking, inr, type Booking } from '../fixtures';
```

## Inventory

| Component | Folder | Key props | Notes |
|---|---|---|---|
| `I` (alias `Icon`) | Icon | `n: IconName`, `f?` filled, `style`, `className` | needs `<Sprite/>` on the page |
| `Sprite` | Icon | — | hidden `<svg>` with every `<symbol>`; `AdminApp` renders it |
| `Mark` | Icon | `size?` (28) | Saathi logo |
| `Av` (alias `Avatar`) | Avatar | `face?: AvatarFace`, `initials?`, `sm?`, `size?`, `style` | |
| `Tag` | Tag | `tone?: 'y' \| 'g' \| 'n' \| 'x' \| 'r'` | yellow / green / mint / grey / red outline |
| `StatusTag` | StatusTag | `kind: 'booking' \| 'partner' \| 'payout'`, `status`, booking: `waitMin`, `when`, `refunded`, `list` | wording and tone in one place; also exports `BookingStatus`, `PartnerStatus`, `PayoutStatus` |
| `Toggle` | Toggle | `on`, `onChange?` | `role="switch"`, Space/Enter |
| `TogRow` | Toggle | `label`, `on`, `onChange` | label left, toggle right |
| `Check` | Check | `on`, `onChange?` | |
| `Button` | Button | `variant?: 'primary' \| 'outline' \| 'accent' \| 'danger' \| 'danger-outline'`, `size?: 'xs' \| 'sm' \| 'compact' \| 'md' \| 'lg'` (default `md`), `disabled?`, `onClick?`, `className?`, `style?`, `title?` | see size table below |
| `TextLink` | TextLink | `children`, `onClick?`, `style?` | green bold small text action |
| `Kpi` | Kpi | `label`, `value`, `sub?`, `tone?: 'default' \| 'alert'` (or legacy `red`), `spark?: number[]`, `onClick?` | |
| `KpiGrid` / `KPI_GRID` | Kpi | `children`, `style?` | 4 columns, gap 14 |
| `PageHead` | PageHead | `title`, `sub?`, `actions?`, `back?` | title row under the top bar |
| `CardHead` | CardHead | `title`, `right?`, `pad?` (true) | card title row; `pad` = `0 10px 8px` |
| `Tabs` | Tabs | `items: {key,label}[]`, `value`, `onChange` | filter tabs in a card header |
| `TagFilter` | Tabs | `items: {key,label,red?}[]`, `value`, `onChange` | tag chips; renders a fragment |
| `Pager` | Pager | `text?` | static table footer |
| `Bar` | Bar | `pct`, `tone?: 'default' \| 'alert'` (or legacy `red`) | 7 px progress bar |
| `BarRow` | Bar | `label`, `value`, `pct`, `tone?` | label + value over a `Bar` |
| `Columns` | Columns | `bars: {h,color?,title?}[]`, `height?`, `gap?` (12), `onPick?`, `picked?`, `flex?` | vertical bar chart |
| `Table` | Table | `columns: {key,label,render,cell?}[]`, `rows`, `rowKey`, `onRowClick?`, `selected?`, `empty?` | `<thead>` + rows; `tr.clk` / `tr.on` |
| `TableCard` | Table | `title?`, `right?`, `head?`, `children`, `footer?`, `style?` | card with padding `14px 8px 4px` + `CardHead` + table + footer |
| `Field` | Field | `label`, `children` | `label.fld` for modal forms |
| `Modal` | Modal | `open`, `onClose`, `title`, `children?`, `actions?` | |
| `Toast` | Toast | `msg?` | `AdminApp` shows it; pages call `useAdmin().toast()` |

### `Button` sizes

Every size reproduces a padding the design already uses, so a swap moves no pixels.

| size | inline style | same as |
|---|---|---|
| `lg` | none (`.btn` = 13 px padding) | `className="btn"`, `"btn o"`, `"btn r"`, `"btn y"` with no style |
| `md` (default) | outlined `9px 16px`, solid `10px 16px` | v2v3 `Btn`; `className="btn o" style={{ padding: '9px 16px' }}`, `className="btn" style={{ padding: '10px 16px' }}` |
| `compact` | outlined `6px 12px`, solid `7px 12px`; 12 px text | v2v3 `Btn sm` |
| `xs` | `6px 12px`; 12 px text (all variants) | v1a `SmBtn` |
| `sm` | none, adds class `sm` | `className="btn sm"`, `"btn o sm"`, `"btn r sm"` |

Outlined = `outline` and `danger-outline`. Any other padding (e.g. `style={{ padding: 9 }}`): use `size="lg"` and
pass the same `style`. `className="btn o end"` → `<Button variant="outline" size="lg" className="end">`.
Raw buttons dimmed with `style={{ opacity: … }}` keep that `style` (the stylesheet drops the shadow for
`[style*="opacity"]`); `disabled` uses the `.dis` class (opacity .45) instead and is not the same look.

## Old local helper → component

Swap mechanically; each row renders the same DOM and styles. The old files (`v1a/ui.tsx`, `v2v3/ui.tsx`) are now
thin shims built on these components, so pages keep working until they are migrated.

| Old (file) | New | Props mapping |
|---|---|---|
| `BookingTag b={b}` (v1a/ui) | `StatusTag` | `<StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} />` |
| `BookingTag b={b} list` (v1a/ui) | `StatusTag` | same plus `list` |
| `partnerTag[p.status]` (v1a/ui) | `StatusTag` | `<StatusTag kind="partner" status={p.status} />` |
| `payoutTag[p.status]` (v1a/ui) | `StatusTag` | `<StatusTag kind="payout" status={p.status} />` |
| `SmBtn` (v1a/ui) | `Button size="xs"` | `variant="outline"` |
| `SmBtn red` | `Button size="xs"` | `variant="danger-outline"` |
| `SmBtn solid` | `Button size="xs"` | `variant="primary"` |
| `SmBtn solid red` | `Button size="xs"` | `variant="danger"` |
| `TLink` (v1a/ui) | `TextLink` | same props (`children`, `onClick`, `style`) |
| `TagFilter` (v1a/ui) | `TagFilter` | same props |
| `Btn` (v2v3/ui) | `Button` (size `md`) | `variant="primary"` |
| `Btn o` | `Button` | `variant="outline"` |
| `Btn red` | `Button` | `variant="danger"` |
| `Btn o red` | `Button` | `variant="danger-outline"` |
| `Btn sm …` | `Button size="compact"` | variant as above |
| `Btn disabled` / `style` / `onClick` | `Button` | same names |
| `BarRow` (v2v3/ui) | `BarRow` | same props (+ optional `tone`) |
| `Columns` (v2v3/ui) | `Columns` | same props |
| `TogRow` (v2v3/ui) | `TogRow` | same props |
| `CardHead` (v2v3/ui) | `CardHead` | same props |
| `Field` (v2v3/ui) | `Field` | same props |
| `KPI_GRID` (v2v3/ui) | `KpiGrid` or `KPI_GRID` | `<div style={KPI_GRID}>…</div>` → `<KpiGrid>…</KpiGrid>` |
| `inr` (v1a/store, v1b/data, v2v3/ui) | `inr` from `../fixtures` | same function |
| `clock` (v1b/data) | `clock` from `../fixtures` | same function |

### Raw markup that has a component

| Raw markup in pages | Component |
|---|---|
| `<div className="row" style={{ padding: '0 10px 8px' }}><span className="h2" style={{ fontSize: 15 }}>Title</span>{right}</div>` | `<CardHead title="Title" right={right} />` |
| `<div className="row"><div><div className="h" style={{ fontSize: 22 }}>T</div><div className="m">S</div></div><div className="lft">…</div></div>` | `<PageHead title="T" sub="S" actions={…} />` (`PageHead` wraps the title block in one extra `.lft`; should not move pixels, but check the VR shot) |
| `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>` | `<KpiGrid>` |
| `<div className="card kpi …"><div className="m">L</div><div className="stat">V</div></div>` | `<Kpi label="L" value="V" />` |
| `<div style={{ height: 7, borderRadius: 4, background: 'var(--mint)' }}>…` | `<Bar pct={…} />` |
| `<span className="tag n">x</span>` (and `g`, `x`, `r`, none) | `<Tag tone="n">x</Tag>` |
| `<span className="s clk" style={{ color: 'var(--green)', fontWeight: 700 }}>` | `<TextLink>` (adds `role="button"` and Enter) |
| `<label className="fld"><span className="h2">L</span>…</label>` | `<Field label="L">…</Field>` |
| `<div className="card" style={{ padding: '14px 8px 4px' }}>` + header + `<table>` + `<Pager/>` | `<TableCard title… footer={<Pager/>}>` + `<Table>` (or keep the raw `<table>` inside `TableCard`) |
| `<span className={`cb ${on ? 'on' : ''}`}>{on && <I n="check" />}</span>` | `<Check on={on} onChange={…} />` (adds `clk`, role and tabIndex) |

## Other admin modules

| Module | Exports |
|---|---|
| `../navigation` | `Section`, `PageDef`, `PageMap`, `PageParams`, `menu`, `MenuGroup`, `MenuItem`, `useAdminRouter` |
| `../session` | `Role` (Owner, Operations, Support, Finance, Partner team, Quality, Marketing, Viewer), `roles`, `roleSections`, `rolesCanOpen(roles, section)`, `useAdmin()` (now also `canOpen(section)`), `Session`, `AdminCtx` |
| `../layout` | `Sidebar`, `TopBar`, `AdminLayout` |
| `../App` | `AdminApp` |
| `../fixtures` | `bookings`, `partners`, `payouts`, `tickets` (types + `initial…()` data), `store` (`useStore`, `update`, `resetStore`, `patchBooking`, `patchPartner`, `patchTicket`, `setPayouts`), `permissions` (`useMatrix`, `matrixStore`, `rolesSummary`, `matrixRoles0`), `format` (`inr`, `clock`) |
| `../shell` | compatibility barrel with the old names (`I`, `Av`, `Tag`, …, `AdminApp`); do not add to it |
