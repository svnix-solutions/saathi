/** 92 Offer codes: create, switch on/off, see usage. */
import React, { useState } from 'react';
import { Button, Modal, PageHead } from '../../../ui';
import { useOffers } from '../hooks/useOffers';
import { OffersTable } from '../components/OffersTable';
import { OfferEditor } from '../components/OfferEditor';
import { NewOfferModal } from '../components/NewOfferModal';
import '../catalog.css';

export function OffersPage() {
  const of = useOffers();
  const cur = of.cur;
  const [creating, setCreating] = useState(false);
  const [confirmOff, setConfirmOff] = useState(false);

  return <>
    <PageHead title="Offer codes" sub={<>{of.live} live · {of.codes.length - of.live} off</>}
      actions={<Button onClick={() => setCreating(true)}>New code</Button>} />
    <div className="cat-offers-grid">
      <OffersTable codes={of.codes} selected={cur.code} onPick={of.pick} onLiveChange={of.setLive} />
      <OfferEditor code={cur} form={of.form} onFormChange={of.setForm} onSave={of.save}
        onSwitchOff={() => setConfirmOff(true)} onSwitchOn={() => of.setLive(cur.code, true)} />
    </div>

    <Modal open={confirmOff} onClose={() => setConfirmOff(false)} title={`Switch off ${cur.code}?`}
      actions={<><Button variant="outline" onClick={() => setConfirmOff(false)}>Keep it on</Button><Button variant="danger" onClick={() => { of.setLive(cur.code, false); setConfirmOff(false); }}>Switch off</Button></>}>
      <div className="m">Customers who type it will see “This code has ended”. Bookings already made keep their discount.</div>
    </Modal>
    <NewOfferModal open={creating} onClose={() => setCreating(false)} onCreate={of.create} />
  </>;
}

export default OffersPage;
