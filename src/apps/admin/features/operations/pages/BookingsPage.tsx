/** 79 · Admin all bookings. Rows open `assign`. params: { filter?: 'needs' | … } */
import React, { useState } from 'react';
import { Button, I, PageHead, Pager, StatusTag, TagFilter } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { useStore, inr } from '../../../fixtures';
import { DAY_TOTALS, SAMPLE_COUNTS, type BookingGroup } from '../data';
import { bookingGroup, matchBookingQuery } from '../filters';
import '../operations.css';

export function BookingsPage({ params }: { params: PageParams }) {
  const { go, toast } = useAdmin();
  const bookings = useStore((s) => s.bookings);
  const [f, setF] = useState<BookingGroup>((params.filter as BookingGroup) ?? 'all');
  const [q, setQ] = useState('');

  const count = (k: BookingGroup) => (k === 'all' ? DAY_TOTALS.all : DAY_TOTALS[k] - SAMPLE_COUNTS[k] + bookings.filter((b) => bookingGroup(b) === k).length);
  const rows = bookings
    .filter((b) => f === 'all' || bookingGroup(b) === f)
    .filter((b) => matchBookingQuery(b, q))
    .sort((a, b) => (a.status === 'searching' ? 0 : 1) - (b.status === 'searching' ? 0 : 1));

  return (
    <>
      <PageHead title="Bookings" sub="Monday 16 November · 86 today"
        actions={<>
          <Button variant="outline" onClick={() => toast('Exported bookings-16-nov.csv')}>Export</Button>
          <Button onClick={() => toast('New booking: search a customer by phone first')}>New booking</Button>
        </>} />
      <div className="lft s ops-filters">
        <TagFilter value={f} onChange={setF} items={[
          { key: 'all', label: `All ${count('all')}` },
          { key: 'needs', label: `Needs a partner ${count('needs')}`, red: count('needs') > 0 },
          { key: 'live', label: `Live ${count('live')}` },
          { key: 'scheduled', label: `Scheduled ${count('scheduled')}` },
          { key: 'done', label: `Done ${count('done')}` },
          { key: 'cancelled', label: `Cancelled ${count('cancelled')}` },
        ]} />
        <span className="m ops-push-right">Today · All services · All zones</span>
      </div>
      <div className="card ops-list-card">
        <div className="lft ops-search-row">
          <div className="tbs ops-search">
            <I n="find" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, customer, partner, area" />
            {q && <span className="clk" role="button" onClick={() => setQ('')} aria-label="Clear"><I n="close" /></span>}
          </div>
          {q && <span className="s m">{rows.length} {rows.length === 1 ? 'match' : 'matches'}</span>}
        </div>
        <table>
          <thead><tr><th>ID</th><th>Time</th><th>Customer</th><th>Service</th><th>Partner</th><th>Area</th><th>Paid by</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className={b.status === 'searching' ? 'clk ops-row-waiting' : 'clk'} onClick={() => go('assign', { id: b.id })}>
                <td><b>#{b.id}</b></td><td>{b.time}</td><td>{b.customer}</td><td>{b.service}</td>
                {b.partner ? <td>{b.partner}</td> : <td className="m">Not assigned</td>}
                <td>{b.area}</td><td>{b.paidBy}</td>
                <td><StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} list /></td>
                <td>{inr(b.amount)}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={9} className="m ops-empty">No bookings match{q ? ` “${q}”` : ''}.</td></tr>}
          </tbody>
        </table>
        <Pager text={f === 'all' && !q ? 'Page 1 of 9 · 10 rows per page' : `${rows.length} rows on this page`} />
      </div>
    </>
  );
}

export default BookingsPage;
