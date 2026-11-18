import React from 'react';
import { Button } from '../../../ui';
import { inr } from '../../../fixtures';
import { ROLE_LIMIT, type TicketFacts, type TicketFix } from '../data';
import '../support.css';

export type TicketFixesProps = {
  facts: TicketFacts;
  /** Labels of the fixes already used on this ticket. */
  used: string[];
  closed: boolean;
  onFix: (f: TicketFix) => void;
  amount: string;
  onAmountChange: (v: string) => void;
  onRefundAmount: () => void;
};

/** "What you can do": the suggested fixes, a refund of any amount, and the role's refund limit. */
export function TicketFixes({ facts, used, closed, onFix, amount, onAmountChange, onRefundAmount }: TicketFixesProps) {
  return (
    <div className="card sup-panel sup-fill">
      <div className="h2 sup-title">What you can do</div>
      {facts.fixes.map((f, i) => {
        const isDone = used.includes(f.label);
        return (
          <Button key={f.label} variant={i === 0 ? 'primary' : 'outline'} size="lg" style={{ padding: i === 0 ? 10 : 9, opacity: isDone || closed ? 0.55 : 1 }}
            onClick={() => onFix(f)}>{isDone ? `✓ ${f.label}` : f.label}</Button>
        );
      })}
      {facts.price > 0 && (
        <form className="lft sup-amount-form" onSubmit={(e) => { e.preventDefault(); onRefundAmount(); }}>
          <div className="inp row sup-amount"><span className="m">₹</span>
            <input className="sup-amount-input" value={amount} onChange={(e) => onAmountChange(e.target.value)} placeholder="Other amount" inputMode="numeric" /></div>
          <button type="submit" className="btn o sm">Refund</button>
        </form>
      )}
      <div className="s m end">Your role can refund up to {inr(ROLE_LIMIT)}. Larger refunds go to the ops lead.</div>
    </div>
  );
}

export default TicketFixes;
