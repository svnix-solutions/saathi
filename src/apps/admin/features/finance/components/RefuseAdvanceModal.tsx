import React, { useState } from 'react';
import { Button, Field, Modal } from '../../../ui';
import { ReasonChips } from '../../support';
import { ADVANCE_REFUSE_REASONS } from '../data';

export type RefuseAdvanceModalProps = {
  open: boolean;
  partner: string;
  onClose: () => void;
  /** Returns true when the advance was refused (the reason was not empty). */
  onRefuse: (reason: string) => boolean;
};

/** Refuse a pay advance with a reason the partner will see. */
export function RefuseAdvanceModal({ open, partner, onClose, onRefuse }: RefuseAdvanceModalProps) {
  const [reason, setReason] = useState('');
  const refuse = () => { if (onRefuse(reason)) { onClose(); setReason(''); } };
  return (
    <Modal open={open} onClose={onClose} title={`Refuse ${partner}'s request`}
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={refuse}>Refuse</Button></>}>
      <ReasonChips reasons={ADVANCE_REFUSE_REASONS} onPick={setReason} />
      <Field label="Reason the partner will see"><textarea className="inp" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
      <div className="s m">Offer a smaller amount instead? They can ask again with a lower figure.</div>
    </Modal>
  );
}

export default RefuseAdvanceModal;
