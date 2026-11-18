import React from 'react';
import type { Ticket } from '../../../fixtures';
import { TicketTag } from './TicketTag';
import '../support.css';

export type TicketQueueProps = {
  tickets: Ticket[];
  /** Id of the ticket open on the right. */
  current: string;
  openCount: number;
  onPick: (id: string) => void;
};

/** Left column of the ticket page: every ticket, oldest unanswered first. */
export function TicketQueue({ tickets, current, openCount, onPick }: TicketQueueProps) {
  return (
    <div className="card sup-panel">
      <div className="h2 sup-title">Open tickets · {openCount}</div>
      {tickets.map((x) => (
        <div key={x.id} className={`card clk ${x.id === current ? 'sel' : ''} sup-tight`} onClick={() => onPick(x.id)}>
          <div className="row"><b>{x.title}</b><TicketTag ticket={x} variant="queue" /></div>
          <div className="s m">{x.from} · {x.who} · {x.ref}</div>
        </div>
      ))}
      <div className="s m end">Oldest unanswered first. Target: first reply within 10 minutes.</div>
    </div>
  );
}

export default TicketQueue;
