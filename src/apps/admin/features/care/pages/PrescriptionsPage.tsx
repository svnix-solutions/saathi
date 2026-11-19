/** 39 · Saathi Care prescriptions: a nurse goes only after a clinical procedure's prescription is checked. */
import React, { useState } from 'react';
import { Button, Check, Field, I, Modal, PageHead, Tabs, Tag, TextLink } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { procedureById, procedures } from '@/domain';
import { daysUntil, dateLabel, en, rxRejectReasons, rxStatus, type RxStatus } from '../data';
import { patchRx, useCare } from '../state';
import { RxPhoto } from '../components/RxPhoto';
import '../care.css';

const CHECKS = ['Doctor name, signature and registration number', 'Written in the last 30 days', 'Patient name and age match', 'Medicine, dose and how often are clear'];

export function PrescriptionsPage() {
  const { toast, go } = useAdmin();
  const rx = useCare((s) => s.rx);
  const [tab, setTab] = useState<RxStatus>('waiting');
  const [selId, setSelId] = useState(rx.find((r) => r.status === 'waiting')?.id ?? rx[0].id);
  const [checks, setChecks] = useState<Record<string, boolean[]>>({});
  const [reject, setReject] = useState(false);
  const [reason, setReason] = useState(rxRejectReasons[0]);
  const [zoom, setZoom] = useState(false);

  const count = (s: RxStatus) => rx.filter((r) => r.status === s).length;
  const list = rx.filter((r) => r.status === tab);
  const sel = rx.find((r) => r.id === selId);
  const proc = sel ? procedureById(sel.procedure) : undefined;
  const age = sel ? -daysUntil(sel.written) : 0;
  const ticks = (sel && checks[sel.id]) ?? CHECKS.map(() => false);
  const toggle = (i: number) => sel && setChecks((c) => ({ ...c, [sel.id]: ticks.map((v, k) => (k === i ? !v : v)) }));

  const next = (id: string) => {
    const n = rx.find((r) => r.status === 'waiting' && r.id !== id);
    if (n) setSelId(n.id);
  };
  const decide = (status: RxStatus, msg: string, why?: string) => {
    if (!sel) return;
    patchRx(sel.id, { status, reason: why });
    toast(msg);
    next(sel.id);
  };
  const approve = () => {
    if (!sel || sel.status !== 'waiting') return;
    if (!ticks.every(Boolean)) { toast(`Tick all 4 checks first · ${ticks.filter(Boolean).length} of 4 done`); return; }
    decide('approved', `${sel.id} approved · nurse confirmed for ${sel.patient}, ${sel.slot.toLowerCase()}`);
  };

  return <>
    <PageHead title="Prescriptions" sub={<>{count('waiting')} waiting · a nurse is sent for an Rx procedure only after a check · usual time to check: 20 min</>}
      actions={<Tabs value={tab} onChange={(t) => { setTab(t); const f = rx.find((r) => r.status === t); if (f) setSelId(f.id); }} items={[
        { key: 'waiting', label: `Waiting ${count('waiting')}` }, { key: 'clearer', label: `Asked for photo ${count('clearer')}` },
        { key: 'approved', label: `Approved ${count('approved')}` }, { key: 'rejected', label: `Rejected ${count('rejected')}` }]} />} />
    <div className="care-body care-body-rx">
      <div className="card care-panel">
        <div className="h2 care-title">{rxStatus[tab].label === 'Waiting' ? 'Waiting for a check' : rxStatus[tab].label}</div>
        {list.map((r) => (
          <div key={r.id} className={`card care-item ${r.id === selId ? 'sel' : ''}`} role="button" tabIndex={0}
            onClick={() => setSelId(r.id)} onKeyDown={(e) => e.key === 'Enter' && setSelId(r.id)}>
            <div className="row"><b>{r.patient}</b><span className="s m">{r.uploaded}</span></div>
            <div className="s">{en(procedureById(r.procedure).name)} · {r.slot}</div>
            {r.reason && <div className="s m">{r.reason}</div>}
          </div>
        ))}
        {!list.length && <div className="s m">All caught up. New prescriptions show here as families upload them.</div>}
        <div className="s m end">Slot soonest first. The family is told within 30 minutes of upload.</div>
      </div>

      {sel && proc ? <div className="card care-panel">
        <div className="row">
          <div><div className="h2 care-name">{sel.patient}, {sel.age}</div><div className="s m">{sel.id} · booked by {sel.bookedBy} · slot {sel.slot}</div></div>
          <Tag tone={rxStatus[sel.status].tone}>{rxStatus[sel.status].label}</Tag>
        </div>
        <RxPhoto rx={sel} />
        <div className="row s">
          <span className="m"><I n="cam" /> Photo uploaded by the family {sel.uploaded}{sel.photo !== 'clear' ? ` · ${sel.photo === 'blurry' ? 'blurry' : 'bottom cut off'}` : ''}</span>
          <TextLink onClick={() => setZoom(true)}>Open full size</TextLink>
        </div>
        <div className="care-kv">
          <div className="card care-cell"><span className="s m">Doctor</span><b>{sel.doctor}</b><span className="s m">Reg. {sel.regNo}</span></div>
          <div className="card care-cell"><span className="s m">Written on</span><b>{dateLabel(sel.written)}</b><span className={`s ${age > 30 ? '' : 'm'}`}>{age > 30 ? <Tag tone="r">{age} days old</Tag> : `${age} ${age === 1 ? 'day' : 'days'} ago`}</span></div>
          <div className="card care-cell"><span className="s m">Procedure</span><b>{en(proc.name)}</b><span className="s m">{inr(proc.price)}{proc.perDay ? ' a day' : ''}</span></div>
          <div className="card care-cell"><span className="s m">Medicine</span><b>{sel.medicine}</b></div>
        </div>
        {sel.status === 'waiting' ? <>
          <div className="h2">Checks</div>
          <div className="s care-checks">
            {CHECKS.map((c, i) => <div key={c} className="lft clk" onClick={() => toggle(i)}><Check on={ticks[i]} />{c}</div>)}
          </div>
          <div className="care-actions">
            <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => decide('clearer', `SMS sent to ${sel.bookedBy}: please upload a clearer photo`, 'Asked for a clearer photo')}>Ask for a clearer photo</Button>
            <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => setReject(true)}>Reject</Button>
            <Button size="lg" style={{ padding: 10, opacity: ticks.every(Boolean) ? 1 : 0.6 }} onClick={approve}>Approve</Button>
          </div>
        </> : <div className={`card s ${sel.status === 'approved' ? 'sel care-cell' : sel.status === 'rejected' ? 'care-alert' : 'care-callout'}`}>
          {sel.status === 'approved' && <><b>Approved.</b> The nurse sees the prescription in the job and brings the right kit.</>}
          {sel.status === 'rejected' && <><b>Rejected:</b> {sel.reason}. The visit is cancelled and refunded in full.</>}
          {sel.status === 'clearer' && <><b>Waiting for a new photo.</b> The slot is held for 2 hours.{' '}
            <TextLink onClick={() => { patchRx(sel.id, { status: 'waiting', photo: 'clear', uploaded: 'just now', reason: undefined }); setTab('waiting'); toast('New photo arrived · back in the queue'); }}>Simulate new photo</TextLink></>}
        </div>}
      </div> : <div className="card m">Pick a prescription on the left.</div>}

      <div className="care-side">
        <div className="card care-panel">
          <div className="h2 care-title">Needs a prescription</div>
          {procedures.map((p) => (
            <div key={p.id} className="row s"><span>{en(p.name)}</span>{p.rx ? <Tag tone="y">Rx</Tag> : <Tag tone="x">No Rx</Tag>}</div>
          ))}
          <div className="s m">Physio and nurse care by the hour or day do not need one.</div>
        </div>
        <div className="card care-panel">
          <div className="h2 care-title">When to reject</div>
          {rxRejectReasons.map((r) => <div key={r} className="s">· {r}</div>)}
          <TextLink onClick={() => go('care.incidents')}>Not sure? Ask the duty doctor</TextLink>
        </div>
      </div>
    </div>

    <Modal open={reject} onClose={() => setReject(false)} title={`Reject ${sel?.id}?`}
      actions={<><Button variant="outline" size="compact" onClick={() => setReject(false)}>Cancel</Button>
        <Button variant="danger" size="compact" onClick={() => { setReject(false); if (sel) decide('rejected', `${sel.id} rejected · ${sel.bookedBy} told why, full refund started`, reason); }}>Reject and refund</Button></>}>
      <Field label="Reason (sent to the family)">
        <select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>{rxRejectReasons.map((r) => <option key={r}>{r}</option>)}</select>
      </Field>
      <div className="s m">The visit is cancelled and paid back in full. The family can upload a new prescription and book again.</div>
    </Modal>
    <Modal open={zoom} onClose={() => setZoom(false)} title={`${sel?.id} · ${sel?.patient}`}
      actions={<Button size="compact" onClick={() => setZoom(false)}>Close</Button>}>
      {sel && <RxPhoto rx={sel} tall />}
    </Modal>
  </>;
}

export default PrescriptionsPage;
