import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/Design pages/V1 · Launch/24 Joining, hours, ID and help', tags: ['v1', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="joining" caption="13 · Joining" sub="After sign-up: documents, police check, training" />
      <PartnerApp initial="hours" caption="14 · Working hours" sub="Days and shifts, plus jobs booked ahead" />
      <PartnerApp initial="idCard" caption="15 · Digital ID card" sub="Guards and customers can verify the partner" />
      <PartnerApp initial="help" caption="16 · Help" sub="Safety first, picture tiles, local languages" />
    </PhoneRow>
  ),
};

export const Joining: S = { render: () => <PartnerApp initial="joining" /> };
export const Hours: S = { name: 'Working hours', render: () => <PartnerApp initial="hours" /> };
export const IdCard: S = { name: 'Digital ID card', render: () => <PartnerApp initial="idCard" /> };
export const Help: S = { render: () => <PartnerApp initial="help" /> };
