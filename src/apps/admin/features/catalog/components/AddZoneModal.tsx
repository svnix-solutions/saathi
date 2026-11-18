import React, { useEffect, useState } from 'react';
import { Button, Field, I, Modal } from '../../../ui';

export type AddZoneModalProps = {
  open: boolean;
  onClose: () => void;
  /** Returns true when the zone was added (it has a name). */
  onAdd: (name: string) => boolean;
};

/** Add a zone by name; it starts switched off. */
export function AddZoneModal({ open, onClose, onAdd }: AddZoneModalProps) {
  const [name, setName] = useState('');
  useEffect(() => { if (open) setName(''); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Add zone"
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={() => { if (onAdd(name)) onClose(); }}>Add zone</Button></>}>
      <Field label="Zone name"><input className="inp" placeholder="e.g. Sector 45" value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <div className="s m lft"><I n="pin" />The zone starts switched off until it has 8 trained partners.</div>
    </Modal>
  );
}

export default AddZoneModal;
