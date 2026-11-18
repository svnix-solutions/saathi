/** 5 · Admin dashboard: live operations. */
import React, { useState } from 'react';
import { BarRow, Button, Kpi, KpiGrid, PageHead, Pager, StatusTag, Table, TableCard, Tabs, Tag, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { useStore, inr, type Booking } from '../../../fixtures';
import { AttentionRow } from '../components/AttentionRow';
import { DASH_IDS, DASH_TABS, type DashFilter } from '../data';
import { matchDash } from '../filters';
import '../operations.css';

const columns: TableColumn<Booking>[] = [
  { key: 'id', label: 'ID', render: (b) => `#${b.id}` },
  { key: 'customer', label: 'Customer', render: (b) => b.customer },
  { key: 'service', label: 'Service', render: (b) => b.service },
  { key: 'partner', label: 'Partner', render: (b) => b.partner ?? 'Not assigned', cell: (b) => (b.partner ? {} : { className: 'm' }) },
  { key: 'area', label: 'Area', render: (b) => b.area },
  { key: 'status', label: 'Status', render: (b) => <StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} /> },
  { key: 'amount', label: 'Amount', render: (b) => inr(b.amount) },
];

export function DashboardPage() {
  const { go, toast, has } = useAdmin();
  const bookings = useStore((s) => s.bookings);
  const [f, setF] = useState<DashFilter>('all');
  const dash = DASH_IDS.map((id) => bookings.find((b) => b.id === id)!).filter(Boolean);
  const rows = dash.filter((b) => matchDash(f, b));
  const waiting = bookings.filter((b) => b.status === 'searching');
  const inProgress = 14 + bookings.filter((b) => b.status === 'progress' || b.status === 'way').length - 3;

  const openRow = (b: Booking) => {
    if (b.status === 'searching') go('assign', { id: b.id });
    else toast(`#${b.id} · ${b.partner ?? 'no partner'} · ${b.service}`);
  };

  return (
    <>
      <PageHead title="Dashboard" sub="Monday 16 November · Zone: all"
        actions={<Button variant="outline" onClick={() => toast('Report downloaded: dashboard-16-nov.csv')}>Download report</Button>} />
      <KpiGrid>
        <Kpi label="Jobs in progress" value={inProgress} onClick={() => { setF('now'); }} />
        <Kpi label="Partners online" value="37" sub="of 52 · 3 signing up" onClick={() => go('live')} />
        <Kpi label="Waiting for a partner" value={waiting.length} tone={waiting.length > 0 ? 'alert' : 'default'} onClick={() => go('bookings', { filter: 'needs' })} />
        <Kpi label="Revenue today" value="₹18,640" />
      </KpiGrid>
      <div className="ops-dash-grid">
        <TableCard title="Live bookings" right={<Tabs value={f} onChange={setF} items={DASH_TABS} />}
          footer={<Pager text={f === 'all' ? 'Page 1 of 3 · 7 rows per page' : `${rows.length} of ${dash.length} rows`} />}>
          <Table columns={columns} rows={rows} rowKey={(b) => b.id} onRowClick={openRow} empty="Nothing here right now." />
        </TableCard>
        <div className="ops-stack">
          <div className="card">
            <div className="h2 ops-heading ops-heading-spaced">Needs attention</div>
            <div className="ops-attention">
              <AttentionRow alert title="Emergency alert" sub="Customer · Block C · 2 min ago"
                action={<Button size="xs" variant="danger" onClick={() => go('safety')}>Open</Button>} />
              <div className="hr" />
              {waiting.length > 0 ? (
                <AttentionRow title={<>{waiting.length} {waiting.length === 1 ? 'booking has' : 'bookings have'} no partner</>}
                  sub={waiting.map((b) => `#${b.id} waiting ${b.waitMin} min`).join(' · ')}
                  action={<Button size="xs" variant="outline" onClick={() => go('assign', { id: waiting[0].id })}>Assign</Button>} />
              ) : (
                <AttentionRow title="Every booking has a partner" sub="Nothing waiting" action={<Tag tone="n">Done</Tag>} />
              )}
              <div className="hr" />
              <AttentionRow title="3 partner sign-ups to check" sub="Aadhaar, PAN and references"
                action={<Button size="xs" variant="outline" onClick={() => go('signups')}>Review</Button>} />
              <div className="hr" />
              <AttentionRow title="3 testimonials to approve" sub="Not shown to anyone until approved"
                action={<Button size="xs" variant="outline" onClick={() => go('testimonials')}>Review</Button>} />
              <div className="hr" />
              <AttentionRow title="1 refund request" sub="#2031 · job ended 20 min early"
                action={<Button size="xs" variant="outline" onClick={() => go('ticket', { id: 'T-318' })}>Review</Button>} />
            </div>
          </div>
          <div className="card clk ops-fill" onClick={() => (has('live') ? go('live') : undefined)}>
            <div className="h2 ops-heading ops-heading-loose">Partners online by area</div>
            <div className="s ops-area-bars">
              <BarRow label="Sector 21" value="12" pct={92} />
              <BarRow label="Block C" value="10" pct={77} />
              <BarRow label="Block A" value="4" pct={31} />
              <BarRow label="Block D" value={<span className="ops-alert-text">2 · low</span>} pct={15} tone="alert" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
