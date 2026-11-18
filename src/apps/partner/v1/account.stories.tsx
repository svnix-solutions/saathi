import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/V1 · Launch/27 My profile, bank account and alerts', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="profile" caption="25 · My profile" sub="Contact details and an emergency contact" />
      <PartnerApp initial="bank" caption="26 · Bank account" sub="Name, number, IFSC, then a ₹1 test" />
      <PartnerApp initial="alerts" caption="27 · Alerts" sub="Pay, reviews, documents, busy hours, leave" />
    </PhoneRow>
  ),
};

export const Profile: S = { name: 'My profile', render: () => <PartnerApp initial="profile" /> };
export const Bank: S = { name: 'Bank account', render: () => <PartnerApp initial="bank" /> };
export const Alerts: S = { name: 'Alerts', render: () => <PartnerApp initial="alerts" /> };
