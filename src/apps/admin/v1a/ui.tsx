import React from 'react';
import { Tag } from '../shell';
import type { Booking, PartnerStatus, PayoutStatus } from './store';

/** Status tag for a booking, the way the dashboard (short) and bookings list (long) show it. */
export function BookingTag({ b, list }: { b: Booking; list?: boolean }) {
  switch (b.status) {
    case 'searching': return <Tag tone="r">Searching {b.waitMin} min</Tag>;
    case 'progress': return <Tag tone="g">In progress</Tag>;
    case 'way': return <Tag>On the way</Tag>;
    case 'scheduled': return <Tag tone="n">{list ? 'Scheduled' : `Scheduled ${b.when}`}</Tag>;
    case 'done': return <Tag tone="x">Done</Tag>;
    case 'review': return <Tag tone="r">Under review</Tag>;
    case 'refunded': return <Tag tone="x">Refunded ₹{b.refunded}</Tag>;
    case 'cancelled': return <Tag tone="x">Cancelled</Tag>;
  }
}

export const partnerTag: Record<PartnerStatus, React.ReactNode> = {
  job: <Tag tone="g">On a job</Tag>,
  online: <Tag tone="n">Online</Tag>,
  offline: <Tag tone="x">Offline</Tag>,
  pending: <Tag>Pending</Tag>,
  suspended: <Tag tone="r">Suspended</Tag>,
};

export const payoutTag: Record<PayoutStatus, React.ReactNode> = {
  approved: <Tag tone="n">Approved</Tag>,
  toApprove: <Tag>To approve</Tag>,
  hold: <Tag tone="r">On hold</Tag>,
  paid: <Tag tone="x">Paid</Tag>,
};

/** Small outline button with the design's compact padding. */
export const SmBtn = ({ children, onClick, red, solid, style }: { children: React.ReactNode; onClick?: () => void; red?: boolean; solid?: boolean; style?: React.CSSProperties }) => (
  <button type="button" className={`btn ${solid ? '' : 'o'} ${red && solid ? 'r' : ''}`}
    style={{ padding: '6px 12px', fontSize: 12, ...(red && !solid ? { color: 'var(--red)', borderColor: 'var(--red)' } : {}), ...style }}
    onClick={onClick}>{children}</button>
);

/** Green bold text link used in card headers ("Edit", "New code", "Widen to 3 km"). */
export const TLink = ({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) => (
  <span className="s clk" role="button" tabIndex={0} style={{ color: 'var(--green)', fontWeight: 700, ...style }} onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}>{children}</span>
);

/** The tag-style filter row used on the bookings list ("All 86 · Needs a partner 2 · …"). */
export function TagFilter<K extends string>({ items, value, onChange }: { items: { key: K; label: string; red?: boolean }[]; value: K; onChange: (k: K) => void }) {
  return (
    <>
      {items.map((it) => (
        <span key={it.key} className={`tag clk ${it.key === value ? 'n' : it.red ? 'r' : 'x'}`}
          style={it.key === value ? { outline: '1.5px solid var(--green)' } : undefined} onClick={() => onChange(it.key)}>{it.label}</span>
      ))}
    </>
  );
}
