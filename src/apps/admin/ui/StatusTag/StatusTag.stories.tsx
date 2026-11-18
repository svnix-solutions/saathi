import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { StatusTag, bookingStatuses, partnerStatuses, payoutStatuses, type BookingStatusTagProps } from './StatusTag';
import { withAdmin } from '../storyDecorator';

/** Status tags for bookings, partners and payouts: one place for their wording and tone. */
const meta: Meta<BookingStatusTagProps> = {
  title: 'Components/Admin/StatusTag',
  component: StatusTag as React.ComponentType<BookingStatusTagProps>,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { kind: 'booking', status: 'searching', waitMin: 4, when: '4 pm', refunded: 79, list: false },
  argTypes: {
    kind: { control: false },
    status: { control: 'select', options: bookingStatuses },
    waitMin: { control: 'number' }, when: { control: 'text' }, refunded: { control: 'number' }, list: { control: 'boolean' },
  },
};
export default meta;
type S = StoryObj<BookingStatusTagProps>;

export const Booking: S = {};
export const All: S = {
  render: () => (
    <div style={{ display: 'grid', gap: 10 }}>
      <div className="lft" style={{ flexWrap: 'wrap' }}><b style={{ width: 70 }}>Booking</b>{bookingStatuses.map((s) => <StatusTag key={s} kind="booking" status={s} waitMin={4} when="4 pm" refunded={79} />)}</div>
      <div className="lft"><b style={{ width: 70 }}>Partner</b>{partnerStatuses.map((s) => <StatusTag key={s} kind="partner" status={s} />)}</div>
      <div className="lft"><b style={{ width: 70 }}>Payout</b>{payoutStatuses.map((s) => <StatusTag key={s} kind="payout" status={s} />)}</div>
    </div>
  ),
};
