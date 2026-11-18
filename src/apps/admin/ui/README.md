# Admin design system (`src/apps/admin/ui`)

React DOM components for the Saathi admin panel. They draw with the class names of `../styles/admin.css`
(scoped under `.sa`), so they only look right inside `<AdminApp>` or the story decorator `withAdmin`
(`<div className="sa"><Sprite/>…</div>`). Stories: **Components/Admin/&lt;Name&gt;**.

Import from the folder index only:

```ts
import { Button, Tag, StatusTag, Kpi, KpiGrid, Table, TableCard, Modal, Field } from '../../../ui';  // from features/<name>/pages/
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
| `Tag` | Tag | `tone?: 'y' \| 'g' \| 'n' \| 'x' \| 'r'`, `onClick?(e)` (makes it a keyboard-usable chip), `className?`, `title?` | yellow / green / mint / grey / red outline |
| `StatusTag` | StatusTag | `kind: 'booking' \| 'partner' \| 'payout'`, `status`, booking: `waitMin`, `when`, `refunded`, `list` | wording and tone in one place; also exports `BookingStatus`, `PartnerStatus`, `PayoutStatus` |
| `Toggle` | Toggle | `on`, `onChange?` | `role="switch"`, Space/Enter |
| `TogRow` | Toggle | `label`, `on`, `onChange` | label left, toggle right |
| `Check` | Check | `on`, `onChange?` | |
| `Button` | Button | `variant?: 'primary' \| 'outline' \| 'accent' \| 'danger' \| 'danger-outline'`, `size?: 'xs' \| 'sm' \| 'compact' \| 'md' \| 'lg'` (default `md`), `disabled?`, `onClick?(e)`, `type?: 'button' \| 'submit'`, `className?`, `style?`, `title?` | see size table below |
| `TextLink` | TextLink | `children`, `onClick?`, `style?` | green bold small text action |
| `Kpi` | Kpi | `label`, `value`, `sub?`, `tone?: 'default' \| 'alert'` (or legacy `red`), `spark?: number[]`, `onClick?` | |
| `KpiGrid` / `KPI_GRID` | Kpi | `children`, `style?` | 4 columns, gap 14 |
| `PageHead` | PageHead | `title`, `sub?`, `actions?`, `back?` | title row under the top bar |
| `CardHead` | CardHead | `title`, `right?`, `pad?` (true) | card title row; `pad` = `0 10px 8px` |
| `Tabs` | Tabs | `items: {key,label}[]`, `value`, `onChange` | filter tabs in a card header |
| `TagFilter` | Tabs | `items: {key,label,red?}[]`, `value`, `onChange` | tag chips; renders a fragment |
| `Pager` | Pager | `text?`, `page?` (1), `pages?` (3; `1` = lone page, no arrows), `onPage?(n)` (makes it clickable) | table footer |
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
| `md` (default) | outlined `9px 16px`, solid `10px 16px` | |
| `compact` | outlined `6px 12px`, solid `7px 12px`; 12 px text | |
| `xs` | `6px 12px`; 12 px text (all variants) | |
| `sm` | none, adds class `sm` | `className="btn sm"`, `"btn o sm"`, `"btn r sm"` |

Outlined = `outline` and `danger-outline`. Any other padding (e.g. `style={{ padding: 9 }}`): use `size="lg"` and
pass the same `style`. `className="btn o end"` → `<Button variant="outline" size="lg" className="end">`.
Raw buttons dimmed with `style={{ opacity: … }}` keep that `style` (the stylesheet drops the shadow for
`[style*="opacity"]`); `disabled` uses the `.dis` class (opacity .45) instead and is not the same look.

## Raw markup that has a component

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
