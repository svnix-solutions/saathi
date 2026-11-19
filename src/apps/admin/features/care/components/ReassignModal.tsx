import React, { useState } from 'react';
import { Av, Bar, Button, Modal } from '../../../ui';
import { useAdmin } from '../../../session';
import { roleLabel, type CarePlan } from '../data';
import { patchPlan, patchVisit, useCare } from '../state';

/** Pick another nurse or physio for a plan: same role, verified, least busy first. */
export function ReassignModal({ plan, onClose }: { plan: CarePlan | null; onClose: () => void }) {
  const { toast } = useAdmin();
  const staff = useCare((s) => s.staff);
  const visits = useCare((s) => s.visits);
  const [pick, setPick] = useState<string | null>(null);
  if (!plan) return null;
  const role = plan.kind === 'physio' ? 'physio' : 'nurse';
  const options = staff.filter((s) => s.role === role && s.status === 'active' && s.id !== plan.staffId).sort((a, b) => a.utilisation - b.utilisation);
  const close = () => { setPick(null); onClose(); };
  const save = () => {
    const to = staff.find((s) => s.id === pick);
    if (!to) { toast(`Pick a ${roleLabel[role].toLowerCase()} first`); return; }
    patchPlan(plan.id, { staffId: to.id });
    visits.filter((v) => v.planId === plan.id && v.status === 'upcoming').forEach((v) => patchVisit(v.id, { staffId: to.id }));
    toast(`${plan.patient}'s plan moved to ${to.name} · family told by SMS`);
    close();
  };
  return (
    <Modal open onClose={close} title={`Reassign ${plan.id}`}
      actions={<><Button variant="outline" size="compact" onClick={close}>Cancel</Button><Button size="compact" onClick={save}>Reassign</Button></>}>
      <div className="s m">{plan.patient} · {plan.zone}. The new {roleLabel[role].toLowerCase()} gets the visit notes so far and keeps the same visit times.</div>
      <div className="care-pick">
        {options.map((s) => (
          <div key={s.id} className={`card care-pick-row ${pick === s.id ? 'sel' : ''}`} role="button" tabIndex={0}
            onClick={() => setPick(s.id)} onKeyDown={(e) => e.key === 'Enter' && setPick(s.id)}>
            <Av sm initials={s.initials} />
            <div><b>{s.name}</b><div className="s m">{s.zone}{s.zone === plan.zone ? ' · same zone' : ''} · {s.rating ?? 'new'} ★</div></div>
            <div className="s"><Bar pct={s.utilisation} tone={s.utilisation >= 95 ? 'alert' : 'default'} /><div className="m">{s.utilisation}% booked</div></div>
          </div>
        ))}
        {!options.length && <div className="s m">No other {roleLabel[role].toLowerCase()} is free.</div>}
      </div>
    </Modal>
  );
}
