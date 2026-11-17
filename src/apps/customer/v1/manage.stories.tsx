import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** The home address and how to get in, changing or cancelling a booking, and help during a visit. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/05 Address, changes and safety',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="addresses" caption="13 · Addresses and home details" sub="Size, pets and entry note, saved once" />
      <CustomerApp initial="changeBooking" caption="14 · Change or cancel" sub="Clear fees before the customer decides" />
      <CustomerApp initial="help" caption="15 · Help and safety" sub="Emergency, share visit, report a problem" />
    </PhoneRow>
  ),
};

export const Addresses: S = { render: () => <CustomerApp initial="addresses" /> };
export const ChangeOrCancel: S = { render: () => <CustomerApp initial="changeBooking" /> };
export const HelpAndSafety: S = { render: () => <CustomerApp initial="help" /> };
