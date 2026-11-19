import React, { useState } from 'react';
import { Bar, Button, I, Modal, Tag, TextLink } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { CARE_RESCHEDULE_HOURS } from '@/domain';
import { atRisk, dayLabel, doneOf, missedOf, nextOf, planUnit, planWhat, type CareSession, type SessionStatus } from '../data';
import { patchPlan, useCare } from '../state';
import { StaffCell } from './StaffCell';
import { ReassignModal } from './ReassignModal';

const sessionTag: Record<SessionStatus, { label: string; tone: 'y' | 'g' | 'n' | 'x' | 'r' }> = {
  done: { label: 'Done', tone: 'n' }, missed: { label: 'Missed', tone: 'r' }, skipped: { label: 'Skipped', tone: 'x' },
  booked: { label: 'Booked', tone: 'x' }, today: { label: 'Today', tone: 'g' },
};
const pauseReasons = ['Patient in hospital', 'Family travelling', 'Doctor asked to stop', 'Payment issue'];

/** Right-hand drawer for one care plan: progress, every session, reassign, pause or resume. */
export function PlanDrawer({ planId, onClose }: { planId: string | null; onClose: () => void }) {
  const { toast } = useAdmin();
  const plan = useCare((s) => s.plans.find((p) => p.id === planId));
  const [reassign, setReassign] = useState(false);
  const [pause, setPause] = useState(false);
  const [why, setWhy] = useState(pauseReasons[0]);
  if (!plan) return null;

  const done = doneOf(plan);
  const missed = missedOf(plan);
  const next = nextOf(plan);
  const unit = planUnit(plan);
  const move = (s: CareSession) => {
    const d = new Date(Date.parse(s.date) + 86_400_000).toISOString().slice(0, 10);
    patchPlan(plan.id, { sessions: plan.sessions.map((x) => (x.n === s.n ? { ...x, date: d } : x)) });
    toast(`Visit ${s.n} moved to ${dayLabel(d)}, ${s.time} · family told by SMS`);
  };
  const resume = () => { patchPlan(plan.id, { status: 'active' }); toast(`${plan.id} resumed · next visit ${next ? dayLabel(next.date).toLowerCase() : 'to book'}`); };

  return (
    <div className="care-drawer-bg" onClick={onClose}>
      <aside className="care-drawer" role="dialog" aria-label={`Plan ${plan.id}`} onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <div><div className="s m">{plan.id} · {planWhat(plan)}</div><div className="h2 care-name">{plan.patient}, {plan.age}</div>
            <div className="s m">Booked by {plan.bookedBy}{plan.relation !== 'self' ? ` for their ${plan.relation}` : ''} · {plan.zone}</div></div>
          <span className="clk m" role="button" aria-label="Close" onClick={onClose}><I n="close" /></span>
        </div>
        <div className="lft care-wrap">
          {plan.status === 'paused' ? <Tag tone="x">Paused</Tag> : plan.status === 'completed' ? <Tag tone="n">Completed</Tag> : atRisk(plan) ? <Tag tone="r">At risk</Tag> : <Tag tone="g">Active</Tag>}
          <Tag tone="n">{inr(plan.price)} paid</Tag>
          <Tag tone="x">{plan.time === '24 h' ? 'Live-in, 24 h' : `Visits at ${plan.time}`}</Tag>
        </div>
        <div className="care-kv">
          <div className="card care-cell"><span className="s m">Progress</span><b>{done} of {plan.total} {unit}</b><Bar pct={(done / plan.total) * 100} /></div>
          <div className="card care-cell"><span className="s m">Professional</span><StaffCell id={plan.staffId} sub /></div>
        </div>
        {missed > 0 && plan.status === 'active' && (
          <div className="card care-alert s"><b>{missed} missed {missed === 1 ? 'visit' : 'visits'}.</b> {missed >= 2 ? 'Call the family and check the slot still works, or reassign.' : 'One more and this plan is at risk.'}</div>
        )}
        <div className="row"><span className="h2 care-title">{plan.kind === 'physio' ? 'Sessions' : 'Days'}</span>
          <span className="s m">Free reschedule up to {CARE_RESCHEDULE_HOURS} h before</span></div>
        <div className="care-sessions">
          {plan.sessions.map((s) => (
            <div key={s.n} className={`care-session s ${s.status === 'today' ? 'care-session-today' : ''}`}>
              <span className="care-session-n">{s.n}</span>
              <span>{dayLabel(s.date)} · {s.time}</span>
              <Tag tone={sessionTag[s.status].tone}>{sessionTag[s.status].label}</Tag>
              {s.status === 'booked' && plan.status === 'active' ? <TextLink onClick={() => move(s)}>Move</TextLink> : <span />}
            </div>
          ))}
        </div>
        <div className="care-actions">
          <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => toast(`Calling ${plan.bookedBy}…`)}>Call family</Button>
          {plan.status !== 'completed' && <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => setReassign(true)}>Reassign</Button>}
          {plan.status === 'active' && <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => setPause(true)}>Pause plan</Button>}
          {plan.status === 'paused' && <Button size="lg" style={{ padding: 9 }} onClick={resume}>Resume plan</Button>}
        </div>
        {reassign && <ReassignModal plan={plan} onClose={() => setReassign(false)} />}
        <Modal open={pause} onClose={() => setPause(false)} title={`Pause ${plan.id}?`}
          actions={<><Button variant="outline" size="compact" onClick={() => setPause(false)}>Keep going</Button>
            <Button variant="danger" size="compact" onClick={() => { patchPlan(plan.id, { status: 'paused' }); setPause(false); toast(`${plan.id} paused · ${why.toLowerCase()} · ${plan.total - done} ${unit} kept for later`); }}>Pause plan</Button></>}>
          <div className="s m">Booked visits are freed for other patients. The family keeps the {plan.total - done} {unit} left and can resume from the plan page.</div>
          <div className="lft care-wrap">
            {pauseReasons.map((r) => <span key={r} className={`pill clk care-chip ${why === r ? 'sel' : ''}`} onClick={() => setWhy(r)}>{r}</span>)}
          </div>
        </Modal>
      </aside>
    </div>
  );
}
