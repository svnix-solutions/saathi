import React from 'react';
import '../support.css';
import { Tag } from '../../../ui';

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
      {reasons.map((r) => <Tag key={r} tone="x" onClick={() => onPick(r)}>{r}</Tag>)}
    </div>
  );
}

export default ReasonChips;
