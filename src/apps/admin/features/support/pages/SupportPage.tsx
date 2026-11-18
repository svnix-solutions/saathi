/** 71 · Admin support ticket list (the support part of design 71, as a full page). Rows open `ticket`. */
import React, { useState } from 'react';
import { Av, Button, Kpi, KpiGrid, PageHead, Pager, Table, TableCard, Tabs, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr, useStore, type Ticket } from '../../../fixtures';
import { TicketTag } from '../components/TicketTag';
import '../support.css';

type Filter = 'all' | 'open' | 'refund' | 'answered';

const isOpen = (t: Ticket) => t.status === 'open' || t.status === 'passed';
const matches = (t: Ticket, f: Filter) =>
  f === 'all' ? true : f === 'open' ? isOpen(t)
    : f === 'refund' ? t.refundAsk && !t.refunded && t.status !== 'closed' : t.status === 'answered' || t.status === 'closed';

const columns: TableColumn<Ticket>[] = [
  { key: 'id', label: 'Ticket', render: (t) => <b>#{t.id}</b> },
  { key: 'title', label: 'Problem', render: (t) => t.title },
  { key: 'from', label: 'From', render: (t) => t.from },
  { key: 'who', label: 'Person', render: (t) => <span className="lft"><Av sm face={t.face} />{t.who}</span> },
  { key: 'ref', label: 'Booking', render: (t) => t.ref },
  { key: 'age', label: 'Waiting', render: (t) => t.age, cell: () => ({ className: 'm' }) },
  { key: 'status', label: 'Status', render: (t) => <TicketTag ticket={t} /> },
];

export function SupportPage() {
  const { go, toast } = useAdmin();
  const tickets = useStore((s) => s.tickets);
  const [filter, setFilter] = useState<Filter>('all');
  const open = tickets.filter(isOpen);
  const rows = tickets.filter((t) => matches(t, filter));
  const refundedToday = 79 + tickets.reduce((a, t) => a + (t.refunded ?? 0), 0);

  return (
    <>
      <PageHead title="Support" sub={`${open.length} open · oldest unanswered first · first reply within 10 minutes`}
        actions={<>
          <Button variant="outline" onClick={() => go('claims')}>Damage claims</Button>
          <Button onClick={() => toast('New ticket: pick a customer or partner first')}>New ticket</Button>
        </>} />
      <KpiGrid>
        <Kpi label="Open tickets" value={open.length} tone={open.length > 0 ? 'alert' : 'default'} />
        <Kpi label="First reply today" value="4 min" sub="target 10" />
        <Kpi label="Refunds today" value={inr(refundedToday)} />
        <Kpi label="Solved this week" value="38" />
      </KpiGrid>
      <TableCard title="Tickets" footer={<Pager text={`${rows.length} tickets`} />}
        right={<Tabs value={filter} onChange={setFilter} items={[
          { key: 'all', label: `All ${tickets.length}` }, { key: 'open', label: `Open ${open.length}` },
          { key: 'refund', label: 'Refund asked' }, { key: 'answered', label: 'Answered' }]} />}>
        <Table columns={columns} rows={rows} rowKey={(t) => t.id} onRowClick={(t) => go('ticket', { id: t.id })} empty="No tickets here." />
      </TableCard>
    </>
  );
}

export default SupportPage;
