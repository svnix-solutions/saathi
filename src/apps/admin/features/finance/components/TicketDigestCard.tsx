import React from 'react';
import { TextLink } from '../../../ui';
import type { Ticket } from '../../../fixtures';
import { TicketTag } from '../../support';
import '../finance.css';

/** "Support tickets" on the payouts page: the latest tickets, each opening its ticket page. */
export function TicketDigestCard({ tickets, onOpen, onSeeAll }: { tickets: Ticket[]; onOpen: (id: string) => void; onSeeAll: () => void }) {
  return (
    <div className="card fin-fill">
      <div className="row fin-card-head"><span className="h2 fin-title">Support tickets</span><TextLink onClick={onSeeAll}>See all</TextLink></div>
      <div className="fin-list">
        {tickets.map((t, i, arr) => (
          <React.Fragment key={t.id}>
            <div className="row clk" onClick={() => onOpen(t.id)}>
              <div><b>{t.title}</b><div className="s m">{t.from} · {t.ref} · {t.age === 'yesterday' ? 'yesterday' : `${t.age} ago`}</div></div>
              <TicketTag ticket={t} />
            </div>
            {i < arr.length - 1 && <div className="hr" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TicketDigestCard;
