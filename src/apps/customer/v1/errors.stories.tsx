import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** No helper free, no internet, a failed payment, or an address outside the service area. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/09 When something is empty or goes wrong',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="err.noHelper" caption="20 · No helper free" sub="Honest wait time, a later slot, no charge" />
      <CustomerApp initial="err.offline" caption="21 · No internet" sub="Saved booking and door code still visible" />
      <CustomerApp initial="err.paymentFailed" caption="22 · Payment failed" sub="Says no money was taken, holds the helper" />
      <CustomerApp initial="err.outsideArea" caption="23 · Outside the service area" sub="Clear reason, waitlist, nearby areas" />
    </PhoneRow>
  ),
};

export const NoHelperFree: S = { render: () => <CustomerApp initial="err.noHelper" /> };
export const NoInternet: S = { render: () => <CustomerApp initial="err.offline" /> };
export const PaymentFailed: S = { render: () => <CustomerApp initial="err.paymentFailed" /> };
export const OutsideServiceArea: S = { render: () => <CustomerApp initial="err.outsideArea" /> };
