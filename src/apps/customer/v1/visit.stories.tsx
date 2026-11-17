import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** Live arrival, a running clock while work happens, then rating and re-booking. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/04 During and after the visit',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="tracking" caption="9 · Helper on the way" sub="Map, ETA, call, door code" />
      <CustomerApp initial="inProgress" caption="10 · Job in progress" sub="Clock, task ticks, extend the visit" />
      <CustomerApp initial="rate" caption="11 · Rate and tip" sub="Stars, quick tags, optional tip" />
      <CustomerApp initial="bookings" caption="12 · My bookings" sub="Reschedule, cancel, book again" />
    </PhoneRow>
  ),
};

export const HelperOnTheWay: S = { render: () => <CustomerApp initial="tracking" /> };
export const JobInProgress: S = { render: () => <CustomerApp initial="inProgress" /> };
export const RateAndTip: S = { render: () => <CustomerApp initial="rate" /> };
export const MyBookings: S = { render: () => <CustomerApp initial="bookings" /> };
