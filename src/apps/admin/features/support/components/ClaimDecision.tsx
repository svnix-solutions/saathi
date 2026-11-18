import React from 'react';
import { Button, CardHead, Tag } from '../../../ui';
import { inr } from '../../../fixtures';
import { claimLabel, claimTone, type Claim } from '../data';
import '../support.css';

export type ClaimDecisionProps = {
  claim: Claim;
  decided: boolean;
  amount: string;
  onAmountChange: (v: string) => void;
  /** Most the cover pays for this claim. */
  cap: number;
  overCap: boolean;
  to: 'wallet' | 'bank';
  onToChange: (to: 'wallet' | 'bank') => void;
  onReject: () => void;
  onApprove: () => void;
};

/** "Decide": amount and where it is paid, then reject with a reason or approve and pay. Shows the outcome once decided. */
export function ClaimDecision({ claim: c, decided, amount, onAmountChange, cap, overCap, to, onToChange, onReject, onApprove }: ClaimDecisionProps) {
  return (
    <div className="card sup-panel sup-fill">
      <CardHead pad={false} title="Decide" right={decided && <Tag tone={claimTone(c)}>{claimLabel(c)}</Tag>} />
      {decided ? <>
        <div className="s m">{c.status === 'Paid' ? `Paid to the customer's wallet. Logged against visit #${c.id}.` : `Reason given: ${c.reason}`}</div>
      </> : <>
        <div className="h2">Amount to pay</div>
        <div className={`lft inp sup-pay-box${overCap ? ' sup-over' : ''}`}>₹
          <input className="sup-pay-input" inputMode="numeric" value={amount} onChange={(e) => onAmountChange(e.target.value)} /></div>
        {overCap && <div className="s sup-alert">Above the {inr(cap)} cover{c.plus ? ' (Plus)' : ''}.</div>}
        <div className="g2">
          <div className={`pill ${to === 'wallet' ? 'sel' : ''}`} onClick={() => onToChange('wallet')}>To wallet</div>
          <div className={`pill ${to === 'bank' ? 'sel' : ''}`} onClick={() => onToChange('bank')}>To bank</div>
        </div>
        <div className="s m">This is not taken from the partner's pay. Repeated claims against one partner show on their quality page.</div>
      </>}
      <div className="g2 end">
        <Button variant="danger-outline" size="lg" className="sup-decide-alt" disabled={decided} onClick={onReject}>Reject with a reason</Button>
        <Button size="lg" className="sup-decide" disabled={decided} onClick={onApprove}>Approve and pay</Button>
      </div>
    </div>
  );
}

export default ClaimDecision;
