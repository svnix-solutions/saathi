import React from 'react';
import { Tag } from '../Tag/Tag';

/** Where a booking is in its life. */
export type BookingStatus = 'searching' | 'progress' | 'way' | 'scheduled' | 'done' | 'review' | 'refunded' | 'cancelled';
/** What a partner is doing right now, or where her account stands. */
export type PartnerStatus = 'job' | 'online' | 'offline' | 'pending' | 'suspended';
/** Weekly payout state. */
export type PayoutStatus = 'approved' | 'toApprove' | 'hold' | 'paid';

export type BookingStatusTagProps = {
  kind: 'booking';
  status: BookingStatus;
  /** `searching`: minutes waited ("Searching 4 min"). */
  waitMin?: number;
  /** `scheduled`: start time ("Scheduled 4 pm"), hidden when `list`. */
  when?: string;
  /** `refunded`: amount in ₹ ("Refunded ₹79"). */
  refunded?: number;
  /** Long-list wording: "Scheduled" without the time (the bookings list). */
  list?: boolean;
};
export type PartnerStatusTagProps = { kind: 'partner'; status: PartnerStatus };
export type PayoutStatusTagProps = { kind: 'payout'; status: PayoutStatus };

export type StatusTagProps = BookingStatusTagProps | PartnerStatusTagProps | PayoutStatusTagProps;

function bookingTag({ status, waitMin, when, refunded, list }: BookingStatusTagProps) {
  switch (status) {
    case 'searching': return <Tag tone="r">Searching {waitMin} min</Tag>;
    case 'progress': return <Tag tone="g">In progress</Tag>;
    case 'way': return <Tag>On the way</Tag>;
    case 'scheduled': return <Tag tone="n">{list ? 'Scheduled' : `Scheduled ${when}`}</Tag>;
    case 'done': return <Tag tone="x">Done</Tag>;
    case 'review': return <Tag tone="r">Under review</Tag>;
    case 'refunded': return <Tag tone="x">Refunded ₹{refunded}</Tag>;
    case 'cancelled': return <Tag tone="x">Cancelled</Tag>;
  }
}

const partner: Record<PartnerStatus, React.ReactElement> = {
  job: <Tag tone="g">On a job</Tag>,
  online: <Tag tone="n">Online</Tag>,
  offline: <Tag tone="x">Offline</Tag>,
  pending: <Tag>Pending</Tag>,
  suspended: <Tag tone="r">Suspended</Tag>,
};

const payout: Record<PayoutStatus, React.ReactElement> = {
  approved: <Tag tone="n">Approved</Tag>,
  toApprove: <Tag>To approve</Tag>,
  hold: <Tag tone="r">On hold</Tag>,
  paid: <Tag tone="x">Paid</Tag>,
};

/**
 * The status tag for a booking, partner or payout, with the wording and tone the design uses everywhere:
 * `<StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} />`,
 * `<StatusTag kind="partner" status={p.status} />`, `<StatusTag kind="payout" status={p.status} />`.
 */
export function StatusTag(props: StatusTagProps) {
  switch (props.kind) {
    case 'booking': return bookingTag(props) ?? null;
    case 'partner': return partner[props.status];
    case 'payout': return payout[props.status];
  }
}

export const bookingStatuses: BookingStatus[] = ['searching', 'progress', 'way', 'scheduled', 'done', 'review', 'refunded', 'cancelled'];
export const partnerStatuses: PartnerStatus[] = ['job', 'online', 'offline', 'pending', 'suspended'];
export const payoutStatuses: PayoutStatus[] = ['approved', 'toApprove', 'hold', 'paid'];
