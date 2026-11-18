import React from 'react';
import { Button, Modal } from '../../../ui';
import { inr } from '../../../fixtures';
import { ROLE_LIMIT } from '../data';

export type RefundModalProps = {
  /** Amount to confirm; `null` hides the dialog. */
  amount: number | null;
  /** First name of the person refunded. */
  first: string;
  onCancel: () => void;
  onConfirm: (amount: number) => void;
};

/** Confirms a refund, or explains that an amount above the role limit goes to the ops lead. */
export function RefundModal({ amount, first, onCancel, onConfirm }: RefundModalProps) {
  const overLimit = !!amount && amount > ROLE_LIMIT;
  return (
    <Modal open={amount !== null} onClose={onCancel} title={overLimit ? `Ask for a ${inr(amount)} refund?` : `Refund ${inr(amount ?? 0)} to ${first}?`}
      actions={<>
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" onClick={() => amount && onConfirm(amount)}>{overLimit ? 'Pass to ops lead' : 'Refund'}</Button>
      </>}>
      <div className="m">{overLimit
        ? `This is above your ${inr(ROLE_LIMIT)} limit. It goes to the ops lead to approve, and ${first} is told it is being checked.`
        : `The money goes back to ${first}'s UPI within 2 hours. ${first} gets an SMS.`}</div>
    </Modal>
  );
}

export default RefundModal;
