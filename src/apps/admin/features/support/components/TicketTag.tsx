import React from 'react';
import { Tag } from '../../../ui';
import type { Ticket } from '../../../fixtures';

export type TicketTagProps = {
  ticket: Ticket;
  /**
   * `summary` (lists: "Refund?" for an open refund ask) · `header` (ticket page title: "Open · 20 min") ·
   * `queue` (the ticket page's left column: the waiting time, red for the oldest).
   */
  variant?: 'summary' | 'header' | 'queue';
};

/** Status of a support ticket, worded for where it is shown. */
export function TicketTag({ ticket: t, variant = 'summary' }: TicketTagProps) {
  if (variant === 'queue') {
    if (t.status === 'open') return <Tag tone={t.id === 'T-318' ? 'r' : 'y'}>{t.age}</Tag>;
    if (t.status === 'passed') return <Tag tone="n">Ops lead</Tag>;
    return <Tag tone="x">{t.status === 'closed' ? 'Closed' : 'Answered'}</Tag>;
  }
  if (t.status === 'closed') return <Tag tone="x">Closed</Tag>;
  if (t.status === 'answered') return <Tag tone="x">Answered</Tag>;
  if (t.status === 'passed') return <Tag tone="n">With ops lead</Tag>;
  if (variant === 'header') return <Tag tone="r">Open · {t.age}</Tag>;
  if (t.refundAsk && !t.refunded) return <Tag tone="r">Refund?</Tag>;
  return <Tag>Open</Tag>;
}

export default TicketTag;
