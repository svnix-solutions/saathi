import React from 'react';
import { Button, Modal } from '../../../ui';
import '../catalog.css';

export type BookingRulesModalProps = {
  open: boolean;
  draft: Record<string, string>;
  onDraftChange: (draft: Record<string, string>) => void;
  onClose: () => void;
  onSave: () => void;
};

/** Edit the booking rules (visit length, blocks, plan saving, cancellation). */
export function BookingRulesModal({ open, draft, onDraftChange, onClose, onSave }: BookingRulesModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Booking rules"
      actions={<><Button variant="outline" size="sm" onClick={onClose}>Cancel</Button><Button size="sm" onClick={onSave}>Save rules</Button></>}>
      {Object.entries(draft).map(([k, v]) => (
        <div className="row cat-field-row" key={k}><span className="s m cat-field-label">{k}</span>
          <input className="inp cat-rule-input" value={v} onChange={(e) => onDraftChange({ ...draft, [k]: e.target.value })} /></div>))}
    </Modal>
  );
}

export default BookingRulesModal;
