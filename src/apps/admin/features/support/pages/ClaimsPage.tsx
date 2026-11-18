/** 93 Damage claims: photos and visit facts, approve with an amount or reject with a reason. */
import React, { useState } from 'react';
import { Modal, PageHead, Tabs } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { COVER, COVER_PLUS } from '../data';
import { useClaims } from '../hooks/useClaims';
import { ClaimsTable } from '../components/ClaimsTable';
import { ClaimEvidence } from '../components/ClaimEvidence';
import { ClaimDecision } from '../components/ClaimDecision';
import { RejectClaimModal } from '../components/RejectClaimModal';
import '../support.css';

export function ClaimsPage() {
  const { go } = useAdmin();
  const cl = useClaims();
  const cur = cl.cur;
  const [photo, setPhoto] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);

  return <>
    <PageHead title="Damage claims" sub={<>{cl.counts.decide} to decide · cover up to {inr(COVER)} per visit, {inr(COVER_PLUS)} with Plus</>}
      actions={<Tabs value={cl.filter} onChange={cl.setFilter} items={[
        { key: 'decide', label: `To decide ${cl.counts.decide}` }, { key: 'approved', label: `Approved ${cl.counts.approved}` },
        { key: 'rejected', label: `Rejected ${cl.counts.rejected}` }]} />} />
    <div className="sup-claims-grid">
      <ClaimsTable rows={cl.rows} current={cur.id} onPick={cl.pick} />
      <div className="sup-stack">
        <ClaimEvidence claim={cur} onPhoto={setPhoto} onOpenCustomer={() => go('customerDetail', { id: cur.custId })} />
        <ClaimDecision claim={cur} decided={cl.decided} amount={cl.amount} onAmountChange={cl.setAmount} cap={cl.cap} overCap={cl.overCap}
          to={cl.to} onToChange={cl.setTo} onReject={() => setRejecting(true)} onApprove={cl.approve} />
      </div>
    </div>

    <Modal open={!!photo} onClose={() => setPhoto(null)} title={`#${cur.id} · ${photo}`}>
      <div className="photo sup-photo-large">{photo}</div>
      <div className="s m">{photo === "Helper's photo" ? 'Taken by the partner at check-out.' : 'Uploaded by the customer with the claim.'}</div>
    </Modal>
    <RejectClaimModal open={rejecting} claimId={cur.id} onClose={() => setRejecting(false)} onReject={cl.reject} />
  </>;
}

export default ClaimsPage;
