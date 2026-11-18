import React from 'react';
import '../catalog.css';

/** Booking rules at a glance; clicking the card opens the editor. */
export function BookingRulesCard({ rules, onEdit }: { rules: Record<string, string>; onEdit: () => void }) {
  return (
    <div className="card clk cat-fill" onClick={onEdit}>
      <div className="h2 cat-title-gap">Booking rules</div>
      <div className="cat-facts">{Object.entries(rules).map(([k, v]) => <div className="row" key={k}><span className="m">{k}</span><b>{v}</b></div>)}</div>
    </div>
  );
}

export default BookingRulesCard;
