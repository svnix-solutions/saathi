import React from 'react';
import { inr, type Ticket } from '../../../fixtures';
import type { TicketFacts } from '../data';
import '../support.css';

/** "Facts of visit #…": what the app recorded about the visit or payout, problems in red. */
export function TicketFactsCard({ ticket: t, facts }: { ticket: Ticket; facts: TicketFacts }) {
  return (
    <div className="card">
      <div className="h2 sup-title-gap">Facts of {t.ref === 'payout' ? 'the payout' : `visit ${t.ref}`}</div>
      <div className="sup-facts">
        {facts.rows.map(([k, v, red]) => <div key={k} className="row"><span className="m">{k}</span><b className={red ? 'sup-alert' : undefined}>{v}</b></div>)}
        {!!t.refunded && <div className="row"><span className="m">Refunded</span><b className="sup-good">{inr(t.refunded)}</b></div>}
      </div>
    </div>
  );
}

export default TicketFactsCard;
