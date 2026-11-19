/** 39 · Saathi Care plans: every physio session plan and nurse booking, with progress and the next visit. */
import React, { useState } from 'react';
import { Bar, Button, PageHead, Pager, Table, TableCard, Tabs, Tag, TagFilter, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import type { PageParams } from '../../../navigation';
import { atRisk, dayLabel, doneOf, missedOf, nextOf, planUnit, planWhat, type CarePlan } from '../data';
import { useCare } from '../state';
import { StaffCell } from '../components/StaffCell';
import { PlanDrawer } from '../components/PlanDrawer';
import '../care.css';

type Kind = 'all' | 'physio' | 'nurse';
type Status = 'any' | 'active' | 'risk' | 'paused' | 'completed';

const matchStatus = (s: Status, p: CarePlan) =>
  s === 'any' ? true : s === 'risk' ? atRisk(p) : p.status === s;

export function CarePlansPage({ params }: { params: PageParams }) {
  const { toast } = useAdmin();
  const plans = useCare((s) => s.plans);
  const [kind, setKind] = useState<Kind>('all');
  const [status, setStatus] = useState<Status>(params.filter === 'risk' ? 'risk' : 'any');
  const [open, setOpen] = useState<string | null>(params.id ?? null);

  const byKind = plans.filter((p) => kind === 'all' || p.kind === kind);
  const rows = byKind.filter((p) => matchStatus(status, p));
  const n = (s: Status) => byKind.filter((p) => matchStatus(s, p)).length;

  const columns: TableColumn<CarePlan>[] = [
    { key: 'patient', label: 'Patient', render: (p) => <span><b>{p.patient}</b>, {p.age}<div className="s m care-sub">{p.id} · {p.relation === 'self' ? 'booked for self' : `${p.bookedBy}'s ${p.relation}`}</div></span> },
    { key: 'what', label: 'Plan', render: (p) => <span>{planWhat(p)}<div className="s m care-sub">{inr(p.price)} · {p.zone}</div></span> },
    { key: 'progress', label: 'Progress', render: (p) => {
      const d = doneOf(p);
      return <div className="care-progress"><Bar pct={(d / p.total) * 100} tone={atRisk(p) ? 'alert' : 'default'} /><span className="s m">{d} of {p.total} {planUnit(p)}</span></div>;
    } },
    { key: 'missed', label: 'Missed', render: (p) => { const m = missedOf(p); return m ? <b style={m >= 2 ? { color: 'var(--red)' } : undefined}>{m}</b> : <span className="m">0</span>; } },
    { key: 'pro', label: 'Professional', render: (p) => <StaffCell id={p.staffId} /> },
    { key: 'next', label: 'Next visit', render: (p) => {
      if (p.status !== 'active') return <span className="m">—</span>;
      const nx = nextOf(p);
      return nx ? <span className="care-nowrap">{dayLabel(nx.date)} · {nx.time}</span> : <span className="m">—</span>;
    } },
    { key: 'status', label: 'Status', render: (p) => p.status === 'paused' ? <Tag tone="x">Paused</Tag> : p.status === 'completed' ? <Tag tone="n">Completed</Tag>
      : atRisk(p) ? <Tag tone="r">At risk</Tag> : <Tag tone="g">Active</Tag> },
  ];

  return (
    <>
      <PageHead title="Care plans" sub={`${plans.filter((p) => p.status === 'active').length} active · ${plans.filter(atRisk).length} at risk · same professional for every visit of a plan`}
        actions={<>
          <Button variant="outline" onClick={() => toast('Exported care-plans.csv')}>Export</Button>
          <Tabs value={kind} onChange={setKind} items={[{ key: 'all', label: 'All' }, { key: 'physio', label: 'Physio' }, { key: 'nurse', label: 'Nurse' }]} />
        </>} />
      <TableCard footer={<Pager text={`${rows.length} of ${byKind.length} plans`} pages={1} />} head={
        <div className="lft care-head">
          <TagFilter value={status} onChange={setStatus} items={[
            { key: 'any', label: `All ${n('any')}` }, { key: 'active', label: `Active ${n('active')}` }, { key: 'risk', label: `At risk ${n('risk')}`, red: true },
            { key: 'paused', label: `Paused ${n('paused')}` }, { key: 'completed', label: `Completed ${n('completed')}` }]} />
        </div>}>
        <Table columns={columns} rows={rows} rowKey={(p) => p.id} onRowClick={(p) => setOpen(p.id)} selected={(p) => p.id === open} empty="No plans match these filters." />
      </TableCard>
      <PlanDrawer planId={open} onClose={() => setOpen(null)} />
    </>
  );
}

export default CarePlansPage;
