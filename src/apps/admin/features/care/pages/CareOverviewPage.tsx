/** 39 · Saathi Care overview: KPIs, today's care visits, plans at risk. */
import React, { useState } from 'react';
import { Button, Kpi, KpiGrid, PageHead, Table, TableCard, Tabs, Tag, TextLink, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import {
  MISSED_TREND, ON_TIME_TREND, PLANS_TREND, TODAY_LABEL, EXPIRY_WARN_DAYS,
  atRisk, daysUntil, missedOf, nextOf, planWhat, visitStatus, dayLabel, type CareVisit,
} from '../data';
import { patchVisit, useCare } from '../state';
import { StaffCell } from '../components/StaffCell';
import { PlanDrawer } from '../components/PlanDrawer';
import { ReassignModal } from '../components/ReassignModal';
import '../care.css';

type Filter = 'all' | 'physio' | 'nurse' | 'attention';

export function CareOverviewPage() {
  const { go, toast } = useAdmin();
  const plans = useCare((s) => s.plans);
  const visits = useCare((s) => s.visits);
  const rx = useCare((s) => s.rx);
  const staff = useCare((s) => s.staff);
  const incidents = useCare((s) => s.incidents);
  const [f, setF] = useState<Filter>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [reassign, setReassign] = useState<string | null>(null);
  const [called, setCalled] = useState<string[]>([]);

  const active = plans.filter((p) => p.status === 'active');
  const risky = plans.filter(atRisk);
  const waiting = rx.filter((r) => r.status === 'waiting').length;
  const done = visits.filter((v) => v.status === 'done').length;
  const late = visits.filter((v) => v.status === 'late' || v.status === 'missed').length;
  const missedWeek = MISSED_TREND[MISSED_TREND.length - 1];
  const openFlags = incidents.filter((i) => i.status !== 'resolved');
  const expiring = staff.filter((s) => daysUntil(s.expiry) < EXPIRY_WARN_DAYS).length;
  const onTime = Math.round(ON_TIME_TREND[ON_TIME_TREND.length - 1] * 100);

  const rows = visits.filter((v) => f === 'all' ? true
    : f === 'attention' ? v.status === 'late' || v.status === 'missed'
      : f === 'physio' ? v.what.startsWith('Physio') : !v.what.startsWith('Physio'));

  const act = (v: CareVisit) => {
    if (v.status === 'late') { patchVisit(v.id, { status: 'onWay' }); toast(`Called ${staff.find((s) => s.id === v.staffId)?.name} · on the way, 15 min · family told`); }
    else if (v.what.includes('(Rx)') && v.status === 'upcoming') go('care.prescriptions');
    else if (v.planId) setOpen(v.planId);
    else toast(`${v.patient} · ${v.what} at ${v.time}`);
  };
  const columns: TableColumn<CareVisit>[] = [
    { key: 'time', label: 'Time', render: (v) => <b>{v.time}</b> },
    { key: 'patient', label: 'Patient', render: (v) => <span><b>{v.patient}</b><div className="s m care-sub">{v.zone}</div></span> },
    { key: 'type', label: 'Type', render: (v) => v.what },
    { key: 'pro', label: 'Professional', render: (v) => <StaffCell id={v.staffId} /> },
    { key: 'status', label: 'Status', render: (v) => <Tag tone={visitStatus[v.status].tone}>{visitStatus[v.status].label}</Tag> },
    { key: 'act', label: '', render: (v) => (
      <TextLink onClick={() => act(v)}>{v.status === 'late' ? 'Call' : v.what.includes('(Rx)') && v.status === 'upcoming' ? 'Check Rx' : v.planId ? 'Plan' : 'View'}</TextLink>) },
  ];

  return (
    <>
      <PageHead title="Saathi Care" sub={`${TODAY_LABEL} · physiotherapy and nurse care at home · Zone: all`}
        actions={<>
          <Button variant="outline" onClick={() => toast('Report downloaded: care-16-nov.csv')}>Download report</Button>
          <Button onClick={() => go('care.prescriptions')}>Review prescriptions{waiting ? ` (${waiting})` : ''}</Button>
        </>} />
      <KpiGrid style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        <Kpi label="Active care plans" value={active.length + 38} sub={`${active.filter((p) => p.kind === 'physio').length + 24} physio`} spark={PLANS_TREND} onClick={() => go('care.plans')} />
        <Kpi label="Care visits today" value={visits.length + 23} sub={`${done + 9} done`} onClick={() => setF('all')} />
        <Kpi label="On time, last 7 days" value={`${onTime}%`} sub="target 95%" spark={ON_TIME_TREND} />
        <Kpi label="Prescriptions waiting" value={waiting} sub={waiting ? 'oldest 3 h' : 'all checked'} tone={waiting ? 'alert' : 'default'} onClick={() => go('care.prescriptions')} />
        <Kpi label="Missed this week" value={missedWeek} sub="sessions" spark={MISSED_TREND.map((n) => n / 6)} onClick={() => go('care.plans', { filter: 'risk' })} />
      </KpiGrid>
      <div className="care-body care-body-overview">
        <TableCard head={
          <div className="row care-head"><span className="h2 care-title">Today's care visits</span>
            <Tabs value={f} onChange={setF} items={[
              { key: 'all', label: `All ${visits.length}` }, { key: 'physio', label: 'Physio' }, { key: 'nurse', label: 'Nurse' },
              { key: 'attention', label: `Needs a look ${late}` }]} />
          </div>}>
          <Table columns={columns} rows={rows} rowKey={(v) => v.id} empty="Nothing needs a look right now." />
          <div className="s m care-head">Showing visits booked through Saathi Care. Home help and repair jobs are on Bookings.</div>
        </TableCard>
        <div className="care-side">
          <div className="card care-panel">
            <div className="row"><span className="h2 care-title">Plans at risk</span><Tag tone="r">{risky.length} missed 2+</Tag></div>
            {risky.map((p) => {
              const next = nextOf(p);
              const wasCalled = called.includes(p.id);
              return (
                <div key={p.id} className="card care-risk">
                  <div className="row"><div><b>{p.patient}</b><div className="s m">{planWhat(p)} · {p.id}</div></div><b className="care-missed s">{missedOf(p)} missed</b></div>
                  <div className="lft s"><StaffCell id={p.staffId} /><span className="m">· next {next ? `${dayLabel(next.date).toLowerCase()}, ${next.time}` : '—'}</span></div>
                  <div className="care-actions">
                    <Button variant="outline" size="compact" onClick={() => { setCalled((c) => [...c, p.id]); toast(`Calling ${p.bookedBy} about ${p.patient}'s visits…`); }}>{wasCalled ? 'Called ✓' : 'Call family'}</Button>
                    <Button variant="outline" size="compact" onClick={() => setReassign(p.id)}>Reassign</Button>
                    <Button size="compact" onClick={() => setOpen(p.id)}>Open plan</Button>
                  </div>
                </div>
              );
            })}
            {!risky.length && <div className="s m">No plan has missed two sessions. Good week.</div>}
          </div>
          <div className="card care-panel">
            <span className="h2 care-title">Needs a clinician</span>
            <div className="row s"><span>Doctor-review flags and incidents open</span><TextLink onClick={() => go('care.incidents')}>{openFlags.length} open</TextLink></div>
            <div className="hr" />
            <div className="row s"><span>Licences expiring in {EXPIRY_WARN_DAYS} days</span><TextLink onClick={() => go('care.staff', { filter: 'expiring' })}>{expiring} staff</TextLink></div>
            <div className="hr" />
            <div className="row s"><span>Staff waiting for verification</span><TextLink onClick={() => go('care.staff', { filter: 'verify' })}>{staff.filter((s) => s.status === 'toVerify').length} to verify</TextLink></div>
          </div>
        </div>
      </div>
      <PlanDrawer planId={open} onClose={() => setOpen(null)} />
      {reassign && <ReassignModal plan={plans.find((p) => p.id === reassign) ?? null} onClose={() => setReassign(null)} />}
    </>
  );
}

export default CareOverviewPage;
