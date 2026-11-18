import React from 'react';
import '../support.css';

export type ReasonChipsProps = {
  /** Ready-made reasons; clicking one fills the reason field. */
  reasons: string[];
  onPick: (reason: string) => void;
};

/** Grey clickable chips with common reasons, above a "reason" text field in a refuse / reject dialog. */
export function ReasonChips({ reasons, onPick }: ReasonChipsProps) {
  return (
    <div className="lft sup-chips">
      {/* `Tag` takes no click handler, so the chip keeps the raw `.tag x` markup */}
      {reasons.map((r) => <span key={r} className="tag x clk" role="button" tabIndex={0} onClick={() => onPick(r)} onKeyDown={(e) => e.key === 'Enter' && onPick(r)}>{r}</span>)}
    </div>
  );
}

export default ReasonChips;
