import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = {
  title: 'Customer app/V2/13 Wallet, referrals and chat',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="wallet" caption="36 · Wallet" sub="Balance, top-up, refunds land here" />
      <CustomerApp initial="refer" caption="37 · Refer a friend" sub="One code, reward after the first visit" />
      <CustomerApp initial="chat" caption="38 · Chat with helper" sub="Private numbers, quick replies" />
      <CustomerApp initial="alerts" caption="39 · Alerts" sub="Arrival, money, plan reminders, offers" />
    </PhoneRow>
  ),
};

export const Wallet: S = { name: '36 · Wallet', render: () => <CustomerApp initial="wallet" /> };
export const Refer: S = { name: '37 · Refer a friend', render: () => <CustomerApp initial="refer" /> };
export const Chat: S = { name: '38 · Chat with helper', render: () => <CustomerApp initial="chat" /> };
export const Alerts: S = { name: '39 · Alerts', render: () => <CustomerApp initial="alerts" /> };
