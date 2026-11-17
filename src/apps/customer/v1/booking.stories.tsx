import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** Four taps from opening the app to a confirmed helper. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/03 Book a helper',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="home" caption="5 · Home" sub="Five services, speed promise on top" />
      <CustomerApp initial="chores" caption="6 · Choose chores" sub="Tick tasks, add a note for the helper" params={{ service: 'general' }} />
      <CustomerApp initial="time" caption="7 · Duration and time" sub="30 min to 3 hr, now or scheduled" />
      <CustomerApp initial="confirm" caption="8 · Confirm and pay" sub="Summary, address, payment, one button" />
    </PhoneRow>
  ),
};

export const Home: S = { render: () => <CustomerApp initial="home" /> };
export const ChooseChores: S = { render: () => <CustomerApp initial="chores" params={{ service: 'general' }} /> };
export const DurationAndTime: S = { render: () => <CustomerApp initial="time" /> };
export const ConfirmAndPay: S = { render: () => <CustomerApp initial="confirm" /> };
export const PaymentFailsOnce: S = { name: 'Confirm · UPI fails once', render: () => <CustomerApp initial="confirm" state={{ simulatePaymentFail: true }} /> };
