import React, { useEffect, useState } from 'react';
import { Button, Field, Modal } from '../../../ui';
import { OFFER_FOR_OPTIONS, blankOfferCode, type OfferCode } from '../data';
import { customerSees } from '../offerText';
import { KindPills } from './KindPills';
import '../catalog.css';

export type NewOfferModalProps = {
  open: boolean;
  onClose: () => void;
  /** Returns true when the code was created. */
  onCreate: (code: OfferCode) => boolean;
};

/** Create an offer code: code, kind and value, end date and audience, with a preview of what customers see. */
export function NewOfferModal({ open, onClose, onCreate }: NewOfferModalProps) {
  const [nw, setNw] = useState<OfferCode>(blankOfferCode());
  useEffect(() => { if (open) setNw(blankOfferCode()); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="New offer code"
      actions={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={() => { if (onCreate(nw)) onClose(); }}>Create code</Button></>}>
      <Field label="Code"><input className="inp" placeholder="e.g. WELCOME75" value={nw.code} onChange={(e) => setNw({ ...nw, code: e.target.value.toUpperCase() })} /></Field>
      <KindPills value={nw.kind} onChange={(kind) => setNw({ ...nw, kind })} />
      <div className="g2">
        <Field label={nw.kind === 'rs' ? 'Amount (₹)' : 'Percent'}><input className="inp" inputMode="numeric" value={nw.value} onChange={(e) => setNw({ ...nw, value: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></Field>
        <Field label="Valid until"><input className="inp" value={nw.until} onChange={(e) => setNw({ ...nw, until: e.target.value })} /></Field>
      </div>
      <Field label="For"><select className="inp" value={nw.forWho} onChange={(e) => setNw({ ...nw, forWho: e.target.value })}>{OFFER_FOR_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></Field>
      <div className="card sel s cat-tight"><b>Customer sees:</b> {customerSees({ ...nw, code: nw.code.toUpperCase(), first: nw.forWho === 'First visit only' })}</div>
    </Modal>
  );
}

export default NewOfferModal;
