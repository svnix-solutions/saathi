import React, { useState } from 'react';
import type { Category } from '@/domain';
import { Button, Modal } from '../../../ui';
import { WORK, blankService, type NewService } from '../data';
import '../catalog.css';

export type AddServiceModalProps = {
  open: boolean;
  onClose: () => void;
  /** Returns true when the service was added (it has a name). */
  onAdd: (service: NewService) => boolean;
};

/** Add a service: name, price per 30 minutes, kind of work and specialisation. It starts hidden. */
export function AddServiceModal({ open, onClose, onAdd }: AddServiceModalProps) {
  const [ns, setNs] = useState<NewService>(blankService());
  const add = () => { if (onAdd(ns)) { onClose(); setNs(blankService()); } };
  return (
    <Modal open={open} onClose={onClose} title="Add service"
      actions={<><Button variant="outline" size="sm" onClick={onClose}>Cancel</Button><Button size="sm" onClick={add}>Add service</Button></>}>
      <input className="inp" placeholder="Service name, e.g. Festival deep clean" value={ns.name} onChange={(e) => setNs({ ...ns, name: e.target.value })} />
      <div className="row cat-field-row"><span className="s m cat-field-label">₹ per 30 min</span><input className="inp cat-w100" inputMode="numeric" value={ns.per30} onChange={(e) => setNs({ ...ns, per30: e.target.value.replace(/\D/g, '') })} /></div>
      <div className="row cat-field-row"><span className="s m cat-field-label">Work</span><select className="inp cat-w160" value={ns.category} onChange={(e) => setNs({ ...ns, category: e.target.value as Category })}>{(Object.keys(WORK) as Category[]).map((c) => <option key={c} value={c}>{WORK[c]}</option>)}</select></div>
      <div className="row cat-field-row"><span className="s m cat-field-label">Needs a specialisation</span><input className="inp cat-w160" placeholder="None" value={ns.needs} onChange={(e) => setNs({ ...ns, needs: e.target.value })} /></div>
      <div className="s m">New services start hidden. Add tasks, then switch Live on.</div>
    </Modal>
  );
}

export default AddServiceModal;
