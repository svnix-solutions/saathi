/** 39 · Saathi Care incidents: clinical incidents and doctor-review flags raised from visit notes. */
import React, { useState } from 'react';
import { Button, Field, Modal, PageHead, Pager, Table, TableCard, Tabs, Tag, TagFilter, TextLink, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { doctorById, doctors, incidentStatus, severityTone, type Incident, type IncidentStatus, type Severity } from '../data';
import { patchIncident, useCare } from '../state';
import '../care.css';

type Tab = 'open' | IncidentStatus | 'all';
type Kind = 'any' | Incident['kind'];
const sevOrder: Record<Severity, number> = { high: 0, medium: 1, low: 2 };

export function IncidentsPage() {
  const { toast, go } = useAdmin();
  const incidents = useCare((s) => s.incidents);
  const staff = useCare((s) => s.staff);
  const [tab, setTab] = useState<Tab>('open');
  const [kind, setKind] = useState<Kind>('any');
  const [selId, setSelId] = useState(incidents[0].id);
  const [resolve, setResolve] = useState(false);
  const [note, setNote] = useState('');

  const inTab = (t: Tab, i: Incident) => (t === 'all' ? true : i.status === t);
  const rows = incidents.filter((i) => inTab(tab, i) && (kind === 'any' || i.kind === kind)).sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity]);
  const n = (t: Tab) => incidents.filter((i) => inTab(t, i)).length;
  const sel = incidents.find((i) => i.id === selId) ?? incidents[0];
  const raiser = staff.find((s) => s.id === sel.raisedBy);

  const assign = (doc: string) => {
    patchIncident(sel.id, { doctor: doc, status: sel.status === 'resolved' ? 'resolved' : 'assigned' });
    toast(`${sel.id} sent to ${doctorById(doc)?.name} · they call the family within 1 hour`);
  };
  const doResolve = () => {
    if (note.trim().length < 6) { toast('Write what was done, so the next visit sees it'); return; }
    patchIncident(sel.id, { status: 'resolved', resolution: note.trim() });
    setResolve(false); setNote('');
    toast(`${sel.id} resolved · note added to ${sel.patient}'s care record`);
  };

  const columns: TableColumn<Incident>[] = [
    { key: 'sev', label: 'Severity', render: (i) => <Tag tone={severityTone[i.severity]}>{i.severity[0].toUpperCase() + i.severity.slice(1)}</Tag> },
    { key: 'title', label: 'What happened', render: (i) => <span><b>{i.title}</b><div className="s m care-sub">{i.id} · {i.kind === 'review' ? 'Doctor review' : 'Incident'}</div></span> },
    { key: 'patient', label: 'Patient', render: (i) => <span>{i.patient}<div className="s m care-sub">by {staff.find((s) => s.id === i.raisedBy)?.name} · {i.raised}</div></span> },
    { key: 'doc', label: 'Doctor', render: (i) => doctorById(i.doctor)?.name ?? <span className="m">Not assigned</span> },
    { key: 'status', label: 'Status', render: (i) => <Tag tone={incidentStatus[i.status].tone}>{incidentStatus[i.status].label}</Tag> },
  ];

  return (
    <>
      <PageHead title="Clinical incidents" sub={`${n('open')} open · ${n('assigned')} with a doctor · high severity gets a doctor's call within 1 hour`}
        actions={<Tabs value={tab} onChange={setTab} items={[
          { key: 'open', label: `Open ${n('open')}` }, { key: 'assigned', label: `With doctor ${n('assigned')}` },
          { key: 'resolved', label: `Resolved ${n('resolved')}` }, { key: 'all', label: `All ${n('all')}` }]} />} />
      <div className="care-body care-body-side">
        <TableCard footer={<Pager text={`${rows.length} shown · flags come from nurse and physio visit notes`} pages={1} />} head={
          <div className="lft care-head">
            <TagFilter value={kind} onChange={setKind} items={[{ key: 'any', label: 'All kinds' }, { key: 'review', label: 'Doctor review' }, { key: 'incident', label: 'Incidents' }]} />
          </div>}>
          <Table columns={columns} rows={rows} rowKey={(i) => i.id} onRowClick={(i) => setSelId(i.id)} selected={(i) => i.id === sel.id} empty="Nothing open. Every flag has a doctor." />
        </TableCard>

        <div className="care-side">
          <div className="card care-panel">
            <div className="row">
              <div><div className="s m">{sel.id} · {sel.kind === 'review' ? 'Doctor review flag' : 'Incident'} · {sel.raised}</div><div className="h2 care-name">{sel.title}</div></div>
              <Tag tone={severityTone[sel.severity]}>{sel.severity[0].toUpperCase() + sel.severity.slice(1)}</Tag>
            </div>
            <div className="s">Patient <b>{sel.patient}</b>{sel.planId && <> · <TextLink onClick={() => go('care.plans', { id: sel.planId })}>Open plan {sel.planId}</TextLink></>}</div>
            <div className="card care-quote s">“{sel.note}”<div className="m">— {raiser?.name}, visit note</div></div>
            {sel.vitals && <div className="card care-callout s"><b>Readings:</b> {sel.vitals}</div>}
            <Field label="Doctor">
              <select className="inp" value={sel.doctor ?? ''} onChange={(e) => assign(e.target.value)} disabled={sel.status === 'resolved'}>
                <option value="" disabled>Pick a doctor</option>
                {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.field}</option>)}
              </select>
            </Field>
            {sel.status === 'resolved' ? (
              <div className="card sel care-cell s"><b>Resolved.</b> {sel.resolution}</div>
            ) : <>
              <div className="care-actions">
                <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => toast(`Calling ${raiser?.name}…`)}>Call {raiser?.name.split(' ')[0]}</Button>
                <Button size="lg" style={{ padding: 9 }} onClick={() => { setNote(''); setResolve(true); }}>Resolve</Button>
              </div>
              {sel.severity === 'high' && !sel.doctor && <div className="card care-alert s"><b>No doctor yet.</b> High severity: assign the duty doctor now.</div>}
            </>}
          </div>
          <div className="card care-panel">
            <div className="h2 care-title">Doctors on duty</div>
            {doctors.map((d) => {
              const load = incidents.filter((i) => i.doctor === d.id && i.status !== 'resolved').length;
              return <div key={d.id} className="row s"><span><b>{d.name}</b> <span className="m">· {d.field}</span></span><Tag tone={load ? 'y' : 'n'}>{load} open</Tag></div>;
            })}
          </div>
        </div>
      </div>

      <Modal open={resolve} onClose={() => setResolve(false)} title={`Resolve ${sel.id}?`}
        actions={<><Button variant="outline" size="compact" onClick={() => setResolve(false)}>Cancel</Button><Button size="compact" onClick={doResolve}>Resolve</Button></>}>
        <div className="s m">{sel.title} · {sel.patient}. The note goes on the care record and the next nurse or physio reads it before the visit.</div>
        <Field label="What was done"><textarea className="inp" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Doctor called the family, dose changed, recheck on next visit" /></Field>
      </Modal>
    </>
  );
}

export default IncidentsPage;
