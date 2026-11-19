/** 39 · Saathi Care clinical staff: nurses and physiotherapists, their registration, supervisor and workload. */
import React, { useState } from 'react';
import { Av, Bar, Button, Check, Field, I, Kpi, KpiGrid, Modal, PageHead, Pager, Table, TableCard, Tabs, Tag, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { EXPIRY_WARN_DAYS, dateLabel, daysUntil, doctorById, doctors, roleLabel, type CareStaff } from '../data';
import { patchStaff, useCare } from '../state';
import '../care.css';

type Filter = 'all' | 'physio' | 'nurse' | 'expiring' | 'verify';
const VERIFY_CHECKS = ['Registration found on the council website', 'Degree or diploma certificate seen', 'Police verification back', 'Home-visit training done'];

const wrap = () => ({ className: 'care-wrapcell' });

const expiryTag = (iso: string) => {
  const d = daysUntil(iso);
  if (d < 0) return <Tag tone="r">Expired</Tag>;
  if (d < EXPIRY_WARN_DAYS) return <Tag tone="r">{d} days left</Tag>;
  return null;
};

export function CareStaffPage({ params }: { params: PageParams }) {
  const { toast } = useAdmin();
  const staff = useCare((s) => s.staff);
  const plans = useCare((s) => s.plans);
  const [f, setF] = useState<Filter>(params.filter === 'expiring' || params.filter === 'verify' ? params.filter : 'all');
  const [selId, setSelId] = useState<string | null>(params.id ?? (params.filter === 'verify' ? staff.find((s) => s.status === 'toVerify')?.id ?? null : null));
  const [renew, setRenew] = useState(false);
  const [newExpiry, setNewExpiry] = useState('');
  const [verify, setVerify] = useState<boolean[]>(VERIFY_CHECKS.map(() => false));

  const match = (k: Filter, s: CareStaff) => k === 'all' ? true : k === 'expiring' ? daysUntil(s.expiry) < EXPIRY_WARN_DAYS
    : k === 'verify' ? s.status === 'toVerify' : s.role === k;
  const rows = staff.filter((s) => match(f, s));
  const n = (k: Filter) => staff.filter((s) => match(k, s)).length;
  const sel = staff.find((s) => s.id === selId) ?? staff[0];
  const selPlans = plans.filter((p) => p.staffId === sel.id && p.status === 'active');
  const rated = staff.filter((s) => s.rating);
  const avgUtil = Math.round(staff.filter((s) => s.status === 'active').reduce((a, s) => a + s.utilisation, 0) / staff.filter((s) => s.status === 'active').length);

  const pick = (s: CareStaff) => { setSelId(s.id); setVerify(VERIFY_CHECKS.map(() => false)); };
  const doVerify = () => {
    if (!verify.every(Boolean)) { toast(`Tick all 4 checks first · ${verify.filter(Boolean).length} of 4 done`); return; }
    patchStaff(sel.id, { status: 'active' });
    toast(`${sel.name} verified · can take care visits from tomorrow`);
  };
  const doRenew = () => {
    if (!newExpiry || daysUntil(newExpiry) < EXPIRY_WARN_DAYS) { toast('Pick the new expiry date from the renewed certificate'); return; }
    patchStaff(sel.id, { expiry: newExpiry });
    setRenew(false); setNewExpiry('');
    toast(`${sel.name}'s registration renewed till ${dateLabel(newExpiry)}`);
  };

  const columns: TableColumn<CareStaff>[] = [
    { key: 'name', label: 'Name', render: (s) => <span className="lft care-nowrap"><Av sm initials={s.initials} /><span><b>{s.name}</b><div className="s m care-sub">{roleLabel[s.role]} · {s.zone}</div></span></span> },
    { key: 'spec', label: 'Specialisations', render: (s) => <div className="s care-specs">{s.specialisations.join(', ')}</div>, cell: wrap },
    { key: 'reg', label: 'Registration', render: (s) => <span><b>{s.regNo}</b><div className="s m care-sub">{s.council}</div></span> },
    { key: 'sup', label: 'Supervising doctor', render: (s) => doctorById(s.supervisor)?.name ?? '—' },
    { key: 'exp', label: 'Valid till', render: (s) => <span className="care-nowrap">{dateLabel(s.expiry)}{expiryTag(s.expiry) && <div>{expiryTag(s.expiry)}</div>}</span> },
    { key: 'rating', label: 'Rating', render: (s) => (s.rating ? <span className="care-nowrap">{s.rating} ★</span> : <span className="m">New</span>) },
    { key: 'util', label: 'Booked', render: (s) => s.status === 'toVerify' ? <Tag>To verify</Tag>
      : <div className="care-util"><Bar pct={s.utilisation} tone={s.utilisation >= 95 ? 'alert' : 'default'} /><span className="s">{s.utilisation}%</span></div> },
  ];

  return (
    <>
      <PageHead title="Clinical staff" sub={`${n('nurse')} nurses · ${n('physio')} physiotherapists · salaried, supervised by ${doctors.length} doctors · ${avgUtil}% booked this week`}
        actions={<>
          <Button variant="outline" onClick={() => toast('Exported clinical-staff.csv')}>Export</Button>
          <Button onClick={() => toast('Invite sent · the new hire signs up in the partner app as Nurse or Physio')}>Add staff</Button>
        </>} />
      <KpiGrid>
        <Kpi label="Licences expiring in 60 days" value={n('expiring')} sub="visits stop on expiry" tone={n('expiring') ? 'alert' : 'default'} onClick={() => setF('expiring')} />
        <Kpi label="Waiting for verification" value={n('verify')} sub={n('verify') ? 'before the first visit' : 'all verified'} onClick={() => setF('verify')} />
        <Kpi label="Booked this week" value={`${avgUtil}%`} sub={`${staff.filter((s) => s.utilisation >= 95).length} fully booked`} />
        <Kpi label="Average rating" value={(rated.reduce((a, s) => a + (s.rating ?? 0), 0) / rated.length).toFixed(1)} sub={`from ${rated.length} staff`} />
      </KpiGrid>
      <TableCard footer={<Pager text={`${rows.length} of ${staff.length} staff · click a row to open`} pages={1} />} head={
        <div className="care-head">
          <Tabs value={f} onChange={setF} items={[
            { key: 'all', label: `All ${n('all')}` }, { key: 'physio', label: `Physio ${n('physio')}` }, { key: 'nurse', label: `Nurse ${n('nurse')}` },
            { key: 'expiring', label: `Expiring ${n('expiring')}` }, { key: 'verify', label: `To verify ${n('verify')}` }]} />
        </div>}>
        <Table columns={columns} rows={rows} rowKey={(s) => s.id} onRowClick={pick} selected={(s) => s.id === selId} empty="Nobody here." />
      </TableCard>

      {selId && <div className="care-drawer-bg" onClick={() => setSelId(null)}>
        <aside className="care-drawer" role="dialog" aria-label={sel.name} onClick={(e) => e.stopPropagation()}>
          <div className="row"><span className="s m">Clinical staff · {sel.id.toUpperCase()}</span><span className="clk m" role="button" aria-label="Close" onClick={() => setSelId(null)}><I n="close" /></span></div>
          <div className="care-panel">
            <div className="row">
              <div className="lft"><Av initials={sel.initials} /><div><div className="h2 care-name">{sel.name}</div><div className="s m">{roleLabel[sel.role]} · {sel.zone} · joined {sel.joined}</div></div></div>
              {sel.status === 'toVerify' ? <Tag>To verify</Tag> : sel.status === 'paused' ? <Tag tone="x">Paused</Tag> : <Tag tone="g">Active</Tag>}
            </div>
            <div className="care-kv">
              <div className="card care-cell"><span className="s m">{sel.council}</span><b>{sel.regNo}</b><span className="s">Valid till {dateLabel(sel.expiry)}</span></div>
              <div className="card care-cell"><span className="s m">Supervising doctor</span>
                <select className="inp" aria-label="Supervising doctor" value={sel.supervisor} onChange={(e) => { patchStaff(sel.id, { supervisor: e.target.value }); toast(`${sel.name} now reports to ${doctorById(e.target.value)?.name}`); }}>
                  {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.field}</option>)}
                </select></div>
            </div>
            {daysUntil(sel.expiry) < EXPIRY_WARN_DAYS && (
              <div className="card care-alert s"><b>Registration ends in {daysUntil(sel.expiry)} days.</b> Visits stop on the expiry date unless the renewed certificate is uploaded.</div>
            )}
            {sel.status === 'toVerify' ? <>
              <div className="h2">Checks before the first visit</div>
              <div className="s care-list">
                {VERIFY_CHECKS.map((c, i) => <div key={c} className="lft clk" onClick={() => setVerify(verify.map((v, k) => (k === i ? !v : v)))}><Check on={verify[i]} />{c}</div>)}
              </div>
              <Button size="lg" style={{ padding: 10, opacity: verify.every(Boolean) ? 1 : 0.6 }} onClick={doVerify}>Verify {sel.name.split(' ')[0]}</Button>
            </> : <>
              <div className="h2">Active plans · {selPlans.length}</div>
              <div className="care-list s">
                {selPlans.map((p) => <div key={p.id} className="row"><span>{p.patient}</span><span className="m">{p.id}</span></div>)}
                {!selPlans.length && <span className="m">No active plans right now.</span>}
              </div>
              <div className="care-actions">
                <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => { setNewExpiry(''); setRenew(true); }}>Renew registration</Button>
                <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => toast(`Calling ${sel.name}…`)}>Call</Button>
              </div>
              {sel.status === 'active'
                ? <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => { patchStaff(sel.id, { status: 'paused' }); toast(`${sel.name} paused · no new care visits, booked plans stay until reassigned`); }}>Pause from new visits</Button>
                : <Button size="lg" style={{ padding: 9 }} onClick={() => { patchStaff(sel.id, { status: 'active' }); toast(`${sel.name} can take care visits again`); }}>Lift pause</Button>}
            </>}
          </div>
          <div className="card care-panel">
            <div className="h2 care-title">Specialisations</div>
            <div className="lft care-wrap">{sel.specialisations.map((x) => <Tag key={x} tone="n">{x}</Tag>)}</div>
            <div className="s m">Matched to the patient's need when a plan is booked. Rating {sel.rating ? `${sel.rating} ★` : 'not yet'} · {sel.utilisation}% booked this week.</div>
          </div>
        </aside>
      </div>}

      <Modal open={renew} onClose={() => setRenew(false)} title={`Renew ${sel.regNo}`}
        actions={<><Button variant="outline" size="compact" onClick={() => setRenew(false)}>Cancel</Button><Button size="compact" onClick={doRenew}>Save renewal</Button></>}>
        <div className="s m">{sel.name} · {sel.council}. Check the renewed certificate on the council website, then enter its new expiry date.</div>
        <Field label="New expiry date"><input className="inp" type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} /></Field>
      </Modal>
    </>
  );
}

export default CareStaffPage;
