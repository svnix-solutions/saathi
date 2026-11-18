/** Screen 72 · Customers and reports. */
import React, { useMemo, useState } from 'react';
import { Av, BarRow, Button, CardHead, Columns, Kpi, KpiGrid, PageHead, Pager, TableCard, Tabs, Tag } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { bookingsByService, bookingsPerDay, customers, typeTone, weekDayNames, weekDays } from '../data';
import '../customers.css';

type Filter = 'all' | 'plan' | 'new' | 'idle';

export function CustomersPage() {
  const { go, toast } = useAdmin();
  const [f, setF] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const [day, setDay] = useState<number | undefined>();
  const rows = useMemo(() => customers.filter((c) =>
    (f === 'all' || (f === 'plan' && c.type === 'Plan') || (f === 'new' && c.type === 'New') || (f === 'idle' && c.type === 'Inactive'))
    && (!q || (c.name + ' ' + c.area).toLowerCase().includes(q.toLowerCase()))), [f, q]);
  const max = Math.max(...bookingsPerDay);

  return <>
    <PageHead title="Customers" sub="Week of 9 to 15 November"
      actions={<Button variant="outline" onClick={() => toast(`Exported ${rows.length} customers to CSV`)}>Export</Button>} />
    <KpiGrid>
      <Kpi label="Customers" value="1,284" onClick={() => setF('all')} />
      <Kpi label="On a monthly plan" value="86" onClick={() => setF('plan')} />
      <Kpi label="New this week" value="112" onClick={() => setF('new')} />
      <Kpi label="Booked again within 30 days" value="61%" />
    </KpiGrid>
    <div className="cus-body cus-body-list">
      <TableCard footer={<Pager text={`Page 1 of 3 · ${Math.min(rows.length, 6)} rows per page`} />} head={
        <div className="row cus-head">
          <Tabs value={f} onChange={setF} items={[{ key: 'all', label: 'All' }, { key: 'plan', label: 'Plan 86' }, { key: 'new', label: 'New 112' }, { key: 'idle', label: 'Not booked in 30 days' }]} />
          <input className="srch" placeholder="Search name or area" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>}>
        <table>
          <thead><tr><th>Customer</th><th>Area</th><th>Visits</th><th>Spent</th><th>Wallet</th><th>Last visit</th><th>Type</th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="clk" onClick={() => go('customerDetail', { id: c.id })}>
                <td><span className="lft"><Av sm face={c.face} /><b>{c.name}</b></span></td><td>{c.area}</td><td>{c.visits}</td><td>{inr(c.spent)}</td><td>{inr(c.wallet)}</td><td>{c.last}</td>
                <td><Tag tone={typeTone[c.type]}>{c.type}</Tag></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="m">No customers match.</td></tr>}
          </tbody>
        </table>
      </TableCard>
      <div className="cus-side">
        <div className="card">
          <CardHead pad={false} title="Bookings per day"
            right={<span className="s m">{day === undefined ? '812 this week' : `${weekDayNames[day]}: ${bookingsPerDay[day]} bookings`}</span>} />
          <Columns height={92} picked={day} onPick={(i) => setDay(day === i ? undefined : i)}
            bars={bookingsPerDay.map((n, i) => ({ h: Math.round((n / max) * 100), color: i >= 5 ? 'var(--green)' : 'var(--mint)', title: `${n} bookings` }))} />
          <div className="row s m cus-days">{weekDays.map((d, i) => <span key={i}>{d}</span>)}</div>
        </div>
        <div className="card cus-fill">
          <div className="h2 cus-title cus-title-gap10">Bookings by service</div>
          <div className="s cus-list-9">
            {bookingsByService.map((b) => <BarRow key={b.label} label={b.label} value={`${b.pct}%`} pct={b.pct} />)}
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default CustomersPage;
