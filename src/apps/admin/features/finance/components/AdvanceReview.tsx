import React from 'react';
import { Av, Button, Columns, Tag } from '../../../ui';
import { inr } from '../../../fixtures';
import { ADVANCE_LIMIT, advanceTone, type Advance } from '../data';
import type { assessAdvance } from '../advanceRules';
import '../finance.css';

export type AdvanceReviewProps = {
  advance: Advance;
  check: ReturnType<typeof assessAdvance>;
  onOpenPartner: () => void;
  onRefuse: () => void;
  onApprove: () => void;
};

/** The request in view: six weeks of earnings, repayment share, history, the limit check and approve / refuse. */
export function AdvanceReview({ advance: a, check, onOpenPartner, onRefuse, onApprove }: AdvanceReviewProps) {
  const waiting = a.status === 'To approve';
  return (
    <div className="card fin-review">
      <div className="row"><div className="lft clk" onClick={onOpenPartner}><Av face={a.id} /><div>
        <div className="h2 fin-title">{a.name} {waiting ? `asks for ${inr(a.asked)}` : `· ${inr(a.asked)} advance`}</div>
        <div className="s m">Pay back {inr(check.perWeek)} a week for {a.weeks} weeks</div></div></div>
        {!waiting && <Tag tone={advanceTone[a.status]}>{a.status}</Tag>}</div>
      <div className="h2">Earned in the last 6 weeks</div>
      <Columns height={84} gap={10} bars={a.weekly.map((h, i) => ({ h, color: i === 5 ? 'var(--green)' : 'var(--mint)', title: inr(Math.round((a.usual * h) / 90)) }))} />
      <div className="fin-facts">
        <div className="row"><span className="m">Usual week</span><b>{inr(a.usual)}</b></div>
        <div className="row"><span className="m">Repayment as share of a week</span><b className={check.overShare ? 'fin-alert' : undefined}>{check.share}%</b></div>
        <div className="row"><span className="m">Earlier advances</span><b>{a.earlier}</b></div>
        <div className="row"><span className="m">Rating</span><b>{a.rating}</b></div>
      </div>
      {check.within
        ? <div className="card sel s fin-tight"><b>Within the limit.</b> Up to {inr(ADVANCE_LIMIT)} for partners with 6 steady weeks. A slow week lowers that week's repayment.</div>
        : <div className="card s fin-warn"><b>Over the limit:</b> {check.why}. Approving needs a reason in the note.</div>}
      <div className="g2 end">
        <Button variant="outline" size="lg" className="fin-decide-alt" disabled={!waiting} onClick={onRefuse}>Refuse with a reason</Button>
        <Button size="lg" className="fin-decide" disabled={!waiting} onClick={onApprove}>Approve {inr(a.asked)}</Button>
      </div>
    </div>
  );
}

export default AdvanceReview;
