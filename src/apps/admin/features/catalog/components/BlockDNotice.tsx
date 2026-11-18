import React from 'react';
import '../catalog.css';

/** Yellow notice under the zones table while Block D is live with too few partners. */
export function BlockDNotice({ onShowRealArrival, onPause }: { onShowRealArrival: () => void; onPause: () => void }) {
  return (
    <div className="card s cat-warn-inset">
      <b>Block D:</b> only half of bookings arrive in 15 minutes. Show customers the real arrival time, or pause instant booking there until 4 more partners join.
      <div className="lft cat-notice-actions">
        <span className="lnk cat-ink-link" onClick={onShowRealArrival}>Show real arrival time</span>
        <span>·</span>
        <span className="lnk cat-ink-link" onClick={onPause}>Pause instant booking</span>
      </div>
    </div>
  );
}

export default BlockDNotice;
