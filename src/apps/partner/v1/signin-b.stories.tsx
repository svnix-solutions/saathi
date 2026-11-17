import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/V1 · Launch/19 Reference code, Aadhaar and PAN', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="signin.refCode" caption="5 · Reference code" sub="The reference's own phone gets the SMS" />
      <PartnerApp initial="signin.aadhaar" caption="6 · Aadhaar upload" sub="Step 3 of 4. Front and back, number masked" />
      <PartnerApp initial="signin.pan" caption="7 · PAN upload" sub="Step 4 of 4" />
      <PartnerApp initial="signin.waiting" state={{ approved: false }} caption="8 · Waiting for approval" sub="No Home until all five are done and approved" />
    </PhoneRow>
  ),
};

export const SigninRefCode: S = { name: 'Reference code', render: () => <PartnerApp initial="signin.refCode" /> };
export const SigninAadhaar: S = { name: 'Aadhaar upload', render: () => <PartnerApp initial="signin.aadhaar" /> };
export const SigninPan: S = { name: 'PAN upload', render: () => <PartnerApp initial="signin.pan" /> };
export const SigninWaiting: S = { name: 'Waiting for approval', render: () => <PartnerApp initial="signin.waiting" state={{ approved: false }} /> };
