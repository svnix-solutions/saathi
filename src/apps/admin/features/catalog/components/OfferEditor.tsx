import React from 'react';
import { Button, CardHead, Tag, TogRow } from '../../../ui';
import type { OfferCode } from '../data';
import { customerSees } from '../offerText';
import { KindPills } from './KindPills';
import '../catalog.css';

export type OfferEditorProps = {
  /** The saved code (title, live state). */
  code: OfferCode;
  /** The draft being edited. */
  form: OfferCode;
  onFormChange: (form: OfferCode) => void;
  onSwitchOff: () => void;
  onSwitchOn: () => void;
  onSave: () => void;
};

/** Edit one offer code: kind and value, first-visit and once-per-customer rules, end date, limit, and what customers see. */
export function OfferEditor({ code, form, onFormChange, onSwitchOff, onSwitchOn, onSave }: OfferEditorProps) {
  const set = (p: Partial<OfferCode>) => onFormChange({ ...form, ...p });
  return (
    <div className="card cat-panel">
      <CardHead pad={false} title={<>Edit {code.code}</>} right={code.live ? <Tag tone="g">Live</Tag> : <Tag tone="x">Off</Tag>} />
      <div className="h2">Code</div><input className="inp cat-field" value={form.code} readOnly title="Codes cannot be renamed once used" />
      <div className="h2">Offer</div>
      <KindPills value={form.kind} onChange={(kind) => set({ kind })} />
      <div className="lft inp cat-amount-box">{form.kind === 'rs' ? '₹' : '%'}
        <input className="cat-amount-input" inputMode="numeric" value={form.value} onChange={(e) => set({ value: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></div>
      <TogRow label="First visit only" on={form.first} onChange={(v) => set({ first: v })} />
      <TogRow label="One use per customer" on={form.once} onChange={(v) => set({ once: v })} />
      <div className="g2">
        <div><div className="h2">Valid until</div><input className="inp cat-field" value={form.until === 'No end' ? 'No end date' : form.until} onChange={(e) => set({ until: e.target.value })} /></div>
        <div><div className="h2">Total uses allowed</div><input className="inp cat-field" value={form.limit} onChange={(e) => set({ limit: e.target.value })} /></div>
      </div>
      <div className="card sel s cat-tight"><b>Customer sees:</b> {customerSees(form)}</div>
      <div className="g2 end">
        {code.live ? <Button variant="danger-outline" size="lg" className="cat-decide-alt" onClick={onSwitchOff}>Switch off</Button>
          : <Button variant="outline" size="lg" className="cat-decide-alt" onClick={onSwitchOn}>Switch on</Button>}
        <Button size="lg" className="cat-decide" onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}

export default OfferEditor;
