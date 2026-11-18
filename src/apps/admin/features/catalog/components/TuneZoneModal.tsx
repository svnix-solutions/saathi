import React from 'react';
import { decisions } from '@/domain';
import { Button, Field, Modal } from '../../../ui';
import { BUSY_OPTIONS, HOUR_OPTIONS, type Zone } from '../data';

export type TuneZoneModalProps = {
  /** Draft copy of the zone being tuned; `null` hides the dialog. */
  zone: Zone | null;
  onChange: (zone: Zone) => void;
  onClose: () => void;
  onSave: (zone: Zone) => void;
};

/** Tune a zone: search radius, busy-hour price, hours and arrival fee. */
export function TuneZoneModal({ zone: edit, onChange, onClose, onSave }: TuneZoneModalProps) {
  if (!edit) return null;
  return (
    <Modal open onClose={onClose} title={`Tune ${edit.name}`}
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={() => onSave(edit)}>Save</Button></>}>
      <Field label={`Search radius · ${edit.radius} km`}>
        <input type="range" min={decisions.ops.searchKm[0]} max={decisions.ops.searchKm[1] + 1} step={0.5} value={edit.radius}
          onChange={(e) => onChange({ ...edit, radius: parseFloat(e.target.value) })} />
        <span className="s m">Launch rule: look within {decisions.ops.searchKm[0]} km, widen to {decisions.ops.searchKm[1]} km when no one accepts.</span>
      </Field>
      <Field label="Busy-hour price"><select className="inp" value={edit.busy === 'Not set' ? 'None' : edit.busy} onChange={(e) => onChange({ ...edit, busy: e.target.value })}>{BUSY_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></Field>
      <div className="g2">
        <Field label="Hours"><select className="inp" value={edit.hours === 'Not set' ? HOUR_OPTIONS[0] : edit.hours} onChange={(e) => onChange({ ...edit, hours: e.target.value })}>{HOUR_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></Field>
        <Field label="Arrival fee (₹)"><input className="inp" inputMode="numeric" value={edit.fee} onChange={(e) => onChange({ ...edit, fee: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></Field>
      </div>
    </Modal>
  );
}

export default TuneZoneModal;
