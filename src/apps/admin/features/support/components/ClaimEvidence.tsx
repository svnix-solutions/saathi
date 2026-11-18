import React from 'react';
import { CardHead } from '../../../ui';
import { inr } from '../../../fixtures';
import { CLAIM_PHOTOS, type Claim } from '../data';
import '../support.css';

export type ClaimEvidenceProps = {
  claim: Claim;
  onPhoto: (name: string) => void;
  onOpenCustomer: () => void;
};

/** The claim's photos and the facts of the visit, customer and partner. */
export function ClaimEvidence({ claim: c, onPhoto, onOpenCustomer }: ClaimEvidenceProps) {
  return (
    <div className="card sup-panel">
      <CardHead pad={false} title={<>#{c.id} · {c.what}</>} right={<b>{inr(c.claimed)}</b>} />
      <div className="g3">{CLAIM_PHOTOS.map((p) => <div key={p} className="photo s" onClick={() => onPhoto(p)}>{p}</div>)}</div>
      <div className="sup-facts">
        <div className="row"><span className="m">Visit</span><b>{c.visit}</b></div>
        <div className="row"><span className="m">Reported</span><b>{c.when}</b></div>
        <div className="row"><span className="m">Customer</span><b className="lnk" onClick={onOpenCustomer}>{c.custFacts}</b></div>
        <div className="row"><span className="m">Partner</span><b>{c.partnerFacts}</b></div>
      </div>
    </div>
  );
}

export default ClaimEvidence;
