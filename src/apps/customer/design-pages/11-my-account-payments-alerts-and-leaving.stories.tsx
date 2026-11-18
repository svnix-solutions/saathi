import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** Own details, how they pay, which messages they get, and how they delete their account. */
const meta: Meta = {
  title: 'Customer app/Design pages/V1 · Launch/11 My account, payments, alerts and leaving', tags: ['v1', 'design-page'],
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="account" caption="28 · My account" sub="Edit details, links to everything else" />
      <CustomerApp initial="paymentMethods" caption="29 · Payment methods" sub="Default, AutoPay, cards, wallet, cash" />
      <CustomerApp initial="alertSettings" caption="30 · Alert settings" sub="Choose the messages and the channel" />
      <CustomerApp initial="deleteAccount" caption="31 · Delete my account" sub="Says what goes, returns wallet money, asks for a code" />
    </PhoneRow>
  ),
};

export const MyAccount: S = { render: () => <CustomerApp initial="account" /> };
export const PaymentMethods: S = { render: () => <CustomerApp initial="paymentMethods" /> };
export const AlertSettings: S = { render: () => <CustomerApp initial="alertSettings" /> };
export const DeleteMyAccount: S = { render: () => <CustomerApp initial="deleteAccount" /> };
