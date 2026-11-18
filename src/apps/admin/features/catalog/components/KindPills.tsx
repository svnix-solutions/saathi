import React from 'react';
import type { OfferKind } from '../data';

/** "₹ off" / "% off" choice for an offer code. */
export function KindPills({ value, onChange }: { value: OfferKind; onChange: (kind: OfferKind) => void }) {
  return (
    <div className="g2">
      <div className={`pill ${value === 'rs' ? 'sel' : ''}`} onClick={() => onChange('rs')}>₹ off</div>
      <div className={`pill ${value === 'pct' ? 'sel' : ''}`} onClick={() => onChange('pct')}>% off</div>
    </div>
  );
}

export default KindPills;
