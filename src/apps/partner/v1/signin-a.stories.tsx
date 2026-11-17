import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/V1 · Launch/20 Sign in and sign up', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="signin.phone" state={{ approved: false }} caption="1 · Mobile number" sub="Same screen for sign in and sign up" />
      <PartnerApp initial="signin.otp" state={{ approved: false }} caption="2 · SMS code" sub="Known number opens Home, new number starts sign-up (code 4821)" />
      <PartnerApp initial="signin.details" caption="3 · Name and email" sub="Step 1 of 6" />
      <PartnerApp initial="signin.references" caption="4 · Two references" sub="Step 3 of 6. Each number must be different from yours" />
    </PhoneRow>
  ),
};

export const SigninPhone: S = { name: 'Mobile number', render: () => <PartnerApp initial="signin.phone" state={{ approved: false }} /> };
export const SigninOtp: S = { name: 'SMS code', render: () => <PartnerApp initial="signin.otp" state={{ approved: false }} /> };
export const SigninDetails: S = { name: 'Name and email', render: () => <PartnerApp initial="signin.details" /> };
export const SigninReferences: S = { name: 'Two references', render: () => <PartnerApp initial="signin.references" /> };
