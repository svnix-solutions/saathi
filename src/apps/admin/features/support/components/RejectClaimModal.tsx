import React, { useState } from 'react';
import { Button, Field, Modal } from '../../../ui';
import { CLAIM_REJECT_REASONS } from '../data';
import { ReasonChips } from './ReasonChips';

export type RejectClaimModalProps = {
  open: boolean;
  claimId: string;
  onClose: () => void;
  /** Returns true when the claim was rejected (the reason was not empty). */
  onReject: (reason: string) => boolean;
};

/** Reject a damage claim with a reason the customer will see. */
export function RejectClaimModal({ open, claimId, onClose, onReject }: RejectClaimModalProps) {
  const [reason, setReason] = useState('');
  const reject = () => { if (onReject(reason)) { onClose(); setReason(''); } };
  return (
    <Modal open={open} onClose={onClose} title={`Reject claim #${claimId}`}
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={reject}>Reject claim</Button></>}>
      <ReasonChips reasons={CLAIM_REJECT_REASONS} onPick={setReason} />
      <Field label="Reason the customer will see"><textarea className="inp" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
    </Modal>
  );
}

export default RejectClaimModal;
