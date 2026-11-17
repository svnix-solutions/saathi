/** 79 · Admin all bookings. Rows open `assign`. params: { filter?: 'needs' | … } */
import React, { useState } from 'react';
import { I, PageHead, Pager, useAdmin } from '../shell';
import { useStore, inr, type Booking } from './store';
import { BookingTag, TagFilter } from './ui';

type F = 'all' | 'needs' | 'live' | 'scheduled' | 'done' | 'cancelled';
const group = (b: Booking): F =>
  b.status === 'searching' ? 'needs'
    : b.status === 'progress' || b.status === 'way' ? 'live'
      : b.status === 'scheduled' ? 'scheduled'
        : b.status === 'cancelled' ? 'cancelled' : 'done';

/** Totals for the whole day (86); the sample rows are the first page. */
const BASE: Record<F, number> = { all: 86, needs: 2, live: 14, scheduled: 31, done: 36, cancelled: 3 };
const SAMPLE: Record<F, number> = { all: 10, needs: 2, live: 3, scheduled: 2, done: 3, cancelled: 0 };

export function BookingsPage({ params }: { params: Record<string, any> }) {
  const { go, toast } = useAdmin();
  const bookings = useStore((s) => s.bookings);
  const [f, setF] = useState<F>((params.filter as F) ?? 'all');
  const [q, setQ] = useState('');

  const count = (k: F) => (k === 'all' ? BASE.all : BASE[k] - SAMPLE[k] + bookings.filter((b) => group(b) === k).length);
  const ql = q.trim().toLowerCase().replace('#', '');
  const rows = bookings
    .filter((b) => f === 'all' || group(b) === f)
    .filter((b) => !ql || [b.id, b.customer, b.partner ?? 'not assigned', b.area, b.service, b.paidBy].some((v) => v.toLowerCase().includes(ql)))
    .sort((a, b) => (a.status === 'searching' ? 0 : 1) - (b.status === 'searching' ? 0 : 1));

  return (
    <>
      <PageHead title="Bookings" sub="Monday 16 November · 86 today"
        actions={<>
          <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast('Exported bookings-16-nov.csv')}>Export</button>
          <button className="btn" style={{ padding: '10px 16px' }} onClick={() => toast('New booking: search a customer by phone first')}>New booking</button>
        </>} />
      <div className="lft s" style={{ gap: 8 }}>
        <TagFilter value={f} onChange={setF} items={[
          { key: 'all', label: `All ${count('all')}` },
          { key: 'needs', label: `Needs a partner ${count('needs')}`, red: count('needs') > 0 },
          { key: 'live', label: `Live ${count('live')}` },
          { key: 'scheduled', label: `Scheduled ${count('scheduled')}` },
          { key: 'done', label: `Done ${count('done')}` },
          { key: 'cancelled', label: `Cancelled ${count('cancelled')}` },
        ]} />
        <span className="m" style={{ marginLeft: 'auto' }}>Today · All services · All zones</span>
      </div>
      <div className="card" style={{ padding: '10px 8px 4px', flex: 1 }}>
        <div className="lft" style={{ padding: '0 6px 10px', gap: 8 }}>
          <div className="tbs" style={{ width: 320, background: 'var(--bg)' }}>
            <I n="find" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, customer, partner, area"
              style={{ border: 0, outline: 'none', background: 'transparent', font: 'inherit', color: 'var(--ink)', flex: 1, minWidth: 0 }} />
            {q && <span className="clk" onClick={() => setQ('')} aria-label="Clear"><I n="close" /></span>}
          </div>
          {q && <span className="s m">{rows.length} {rows.length === 1 ? 'match' : 'matches'}</span>}
        </div>
        <table>
          <thead><tr><th>ID</th><th>Time</th><th>Customer</th><th>Service</th><th>Partner</th><th>Area</th><th>Paid by</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="clk" style={b.status === 'searching' ? { background: '#fdf1ef' } : undefined} onClick={() => go('assign', { id: b.id })}>
                <td><b>#{b.id}</b></td><td>{b.time}</td><td>{b.customer}</td><td>{b.service}</td>
                {b.partner ? <td>{b.partner}</td> : <td className="m">Not assigned</td>}
                <td>{b.area}</td><td>{b.paidBy}</td><td><BookingTag b={b} list /></td><td>{inr(b.amount)}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={9} className="m" style={{ textAlign: 'center', padding: 24 }}>No bookings match{q ? ` “${q}”` : ''}.</td></tr>}
          </tbody>
        </table>
        <Pager text={f === 'all' && !q ? 'Page 1 of 9 · 10 rows per page' : `${rows.length} rows on this page`} />
      </div>
    </>
  );
}
