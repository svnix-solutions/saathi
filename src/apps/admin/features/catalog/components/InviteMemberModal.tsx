import React, { useState } from 'react';
import { Button, Field, Modal } from '../../../ui';
import { INVITE_ROLES } from '../data';

export type InviteMemberModalProps = {
  open: boolean;
  onClose: () => void;
  /** Returns true when the invite was sent (the email looks valid). */
  onInvite: (email: string, role: string) => boolean;
};

/** Invite a team member by work email, with a role. */
export function InviteMemberModal({ open, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Support');
  const send = () => { if (onInvite(email, role)) { onClose(); setEmail(''); } };
  return (
    <Modal open={open} onClose={onClose} title="Invite team member"
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={send}>Send invite</Button></>}>
      <Field label="Work email"><input className="inp" placeholder="name@saathi.in" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Role"><select className="inp" value={role} onChange={(e) => setRole(e.target.value)}>
        {INVITE_ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
    </Modal>
  );
}

export default InviteMemberModal;
