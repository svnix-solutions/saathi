/** 5 · Admin dashboard: live operations. */
import React, { useState } from 'react';
import { Bar, Kpi, PageHead, Pager, Tabs, useAdmin } from '../shell';
import { useStore, inr, type Booking } from './store';
import { BookingTag, SmBtn } from './ui';

type F = 'all' | 'now' | 'scheduled' | 'problems';
const DASH_IDS = ['2041', '2042', '2043', '2044', '2045', '2046', '2040'];

const match = (f: F, b: Booking) =>
  f === 'all' ? true
    : f === 'now' ? ['progress', 'way', 'searching'].includes(b.status)
      : f === 'scheduled' ? b.status === 'scheduled'
        : ['searching', 'review'].includes(b.status);

export function DashboardPage() {
  const { go, toast, has } = useAdmin();
  const bookings = useStore((s) => s.bookings);
  const [f, setF] = useState<F>('all');
  const dash = DASH_IDS.map((id) => bookings.find((b) => b.id === id)!).filter(Boolean);
  const rows = dash.filter((b) => match(f, b));
  const waiting = bookings.filter((b) => b.status === 'searching');
  const inProgress = 14 + bookings.filter((b) => b.status === 'progress' || b.status === 'way').length - 3;

  const openRow = (b: Booking) => {
    if (b.status === 'searching') go('assign', { id: b.id });
    else toast(`#${b.id} · ${b.partner ?? 'no partner'} · ${b.service}`);
  };

  return (
    <>
      <PageHead title="Dashboard" sub="Monday 16 November · Zone: all"
        actions={<button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast('Report downloaded: dashboard-16-nov.csv')}>Download report</button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <Kpi label="Jobs in progress" value={inProgress} onClick={() => { setF('now'); }} />
        <Kpi label="Partners online" value="37" sub="of 52 · 3 signing up" onClick={() => go('live')} />
        <Kpi label="Waiting for a partner" value={waiting.length} red={waiting.length > 0} onClick={() => go('bookings', { filter: 'needs' })} />
        <Kpi label="Revenue today" value="₹18,640" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ padding: '14px 8px 4px' }}>
          <div className="row" style={{ padding: '0 10px 8px' }}>
            <span className="h2" style={{ fontSize: 15 }}>Live bookings</span>
            <Tabs value={f} onChange={setF} items={[{ key: 'all', label: 'All' }, { key: 'now', label: 'Now' }, { key: 'scheduled', label: 'Scheduled' }, { key: 'problems', label: 'Problems' }]} />
          </div>
          <table>
            <thead><tr><th>ID</th><th>Customer</th><th>Service</th><th>Partner</th><th>Area</th><th>Status</th><th>Amount</th></tr></thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="clk" onClick={() => openRow(b)}>
                  <td>#{b.id}</td><td>{b.customer}</td><td>{b.service}</td>
                  {b.partner ? <td>{b.partner}</td> : <td className="m">Not assigned</td>}
                  <td>{b.area}</td><td><BookingTag b={b} /></td><td>{inr(b.amount)}</td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={7} className="m" style={{ textAlign: 'center', padding: 24 }}>Nothing here right now.</td></tr>}
            </tbody>
          </table>
          <Pager text={f === 'all' ? 'Page 1 of 3 · 7 rows per page' : `${rows.length} of ${dash.length} rows`} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Needs attention</div>
            <div style={{ display: 'grid', gap: 7 }}>
              <div className="row"><div><b style={{ color: 'var(--red)' }}>Emergency alert</b><div className="s m">Customer · Block C · 2 min ago</div></div><SmBtn solid red onClick={() => go('safety')}>Open</SmBtn></div>
              <div className="hr" />
              {waiting.length > 0 ? (
                <div className="row"><div><b>{waiting.length} {waiting.length === 1 ? 'booking has' : 'bookings have'} no partner</b><div className="s m">{waiting.map((b) => `#${b.id} waiting ${b.waitMin} min`).join(' · ')}</div></div><SmBtn onClick={() => go('assign', { id: waiting[0].id })}>Assign</SmBtn></div>
              ) : (
                <div className="row"><div><b>Every booking has a partner</b><div className="s m">Nothing waiting</div></div><span className="tag n">Done</span></div>
              )}
              <div className="hr" />
              <div className="row"><div><b>3 partner sign-ups to check</b><div className="s m">Aadhaar, PAN and references</div></div><SmBtn onClick={() => go('signups')}>Review</SmBtn></div>
              <div className="hr" />
              <div className="row"><div><b>3 testimonials to approve</b><div className="s m">Not shown to anyone until approved</div></div><SmBtn onClick={() => go('testimonials')}>Review</SmBtn></div>
              <div className="hr" />
              <div className="row"><div><b>1 refund request</b><div className="s m">#2031 · job ended 20 min early</div></div><SmBtn onClick={() => go('ticket', { id: 'T-318' })}>Review</SmBtn></div>
            </div>
          </div>
          <div className="card clk" style={{ flex: 1 }} onClick={() => (has('live') ? go('live') : undefined)}>
            <div className="h2" style={{ fontSize: 15, marginBottom: 10 }}>Partners online by area</div>
            <div style={{ display: 'grid', gap: 9 }} className="s">
              <div><div className="row"><span>Sector 21</span><b>12</b></div><Bar pct={92} /></div>
              <div><div className="row"><span>Block C</span><b>10</b></div><Bar pct={77} /></div>
              <div><div className="row"><span>Block A</span><b>4</b></div><Bar pct={31} /></div>
              <div><div className="row"><span>Block D</span><b style={{ color: 'var(--red)' }}>2 · low</b></div><Bar pct={15} red /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
