import React from 'react';

export type QueueItemProps = {
  id: string;
  customer: string;
  /** Tag on the right (wait time, start time). */
  right: React.ReactNode;
  sub: string;
  /** Highlighted as the open booking. */
  selected?: boolean;
  /** Makes the card clickable. Sample cards that are not in the store have none. */
  onPick?: () => void;
};

/** Booking card in the assign page's left column ("Needs a partner", "Starting soon", "Assigned by hand"). */
export const QueueItem = ({ id, customer, right, sub, selected, onPick }: QueueItemProps) => (
  <div className={['card', onPick ? 'clk' : '', selected ? 'sel' : '', 'ops-item'].filter(Boolean).join(' ')} onClick={onPick}>
    <div className="row"><b>#{id} · {customer}</b>{right}</div><div className="s m">{sub}</div>
  </div>
);
