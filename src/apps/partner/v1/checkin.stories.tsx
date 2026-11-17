import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/V1 · Launch/22 Check-in, selfie, live and check-out', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="checkIn" caption="17 · Check in" sub="Location, time, door code, then selfie" />
      <PartnerApp initial="selfie" caption="18 · Selfie upload" sub="Guide oval, retake, upload progress" />
      <PartnerApp initial="live" caption="19 · Live on the job" sub="Location shared only while working" />
      <PartnerApp initial="checkOut" caption="20 · Check out" sub="Time worked, work photos, closing selfie" />
    </PhoneRow>
  ),
};

export const CheckIn: S = { name: 'Check in', render: () => <PartnerApp initial="checkIn" /> };
export const Selfie: S = { name: 'Selfie upload', render: () => <PartnerApp initial="selfie" /> };
export const Live: S = { name: 'Live on the job', render: () => <PartnerApp initial="live" /> };
export const CheckOut: S = { name: 'Check out', render: () => <PartnerApp initial="checkOut" /> };
