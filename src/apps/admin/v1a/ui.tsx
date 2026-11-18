/**
 * Compatibility shim: these helpers now live in the admin design system (../ui). See ../ui/README.md for the
 * old name → component table. New code should use `StatusTag`, `Button`, `TextLink` and `TagFilter` directly.
 */
import React from 'react';
import { Button, StatusTag, TagFilter, TextLink } from '../ui';
import type { Booking, PartnerStatus, PayoutStatus } from './store';

/** Status tag for a booking, the way the dashboard (short) and bookings list (long) show it. */
export function BookingTag({ b, list }: { b: Booking; list?: boolean }) {
  return <StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} list={list} />;
}

export const partnerTag: Record<PartnerStatus, React.ReactNode> = {
  job: <StatusTag kind="partner" status="job" />,
  online: <StatusTag kind="partner" status="online" />,
  offline: <StatusTag kind="partner" status="offline" />,
  pending: <StatusTag kind="partner" status="pending" />,
  suspended: <StatusTag kind="partner" status="suspended" />,
};

export const payoutTag: Record<PayoutStatus, React.ReactNode> = {
  approved: <StatusTag kind="payout" status="approved" />,
  toApprove: <StatusTag kind="payout" status="toApprove" />,
  hold: <StatusTag kind="payout" status="hold" />,
  paid: <StatusTag kind="payout" status="paid" />,
};

/** Small button with the design's compact padding: `<Button size="xs">`. */
export const SmBtn = ({ children, onClick, red, solid, style }: { children: React.ReactNode; onClick?: () => void; red?: boolean; solid?: boolean; style?: React.CSSProperties }) => (
  <Button size="xs" variant={solid ? (red ? 'danger' : 'primary') : (red ? 'danger-outline' : 'outline')} style={style} onClick={onClick}>{children}</Button>
);

/** Green bold text link used in card headers: `<TextLink>`. */
export const TLink = TextLink;

export { TagFilter };
