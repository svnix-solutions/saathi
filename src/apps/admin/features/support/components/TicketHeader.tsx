import React from 'react';
import { Button, I } from '../../../ui';
import type { Ticket } from '../../../fixtures';
import { TicketTag } from './TicketTag';
import '../support.css';

export type TicketHeaderProps = {
  ticket: Ticket;
  closed: boolean;
  onBack: () => void;
  onPass: () => void;
  onClose: () => void;
  onReopen: () => void;
};

/** Title row of the ticket page: back to the list, ticket number and status, pass / close / reopen. */
export function TicketHeader({ ticket: t, closed, onBack, onPass, onClose, onReopen }: TicketHeaderProps) {
  return (
    <div className="row">
      <div className="lft sup-head-left">
        <span className="ic clk" onClick={onBack} role="button" aria-label="All tickets"><I n="back" /></span>
        <div className="h sup-page-title">Ticket #{t.id}</div><TicketTag ticket={t} variant="header" />
      </div>
      <div className="lft">
        {t.status !== 'passed' && !closed && <Button variant="outline" onClick={onPass}>Pass to ops lead</Button>}
        {closed
          ? <Button variant="outline" onClick={onReopen}>Reopen</Button>
          : <Button onClick={onClose}>Close ticket</Button>}
      </div>
    </div>
  );
}

export default TicketHeader;
