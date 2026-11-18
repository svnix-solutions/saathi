import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** Everyone starts with a mobile number and an SMS code (4821). A known number goes to Home; a new one fills name and address first. */
const meta: Meta = {
  title: 'Customer app/Design pages/V1 · Launch/02 Sign in and registration', tags: ['v1', 'design-page'],
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="signin.phone" caption="1 · Mobile number" sub="One screen for sign in and sign up" state={{ signedIn: false }} />
      <CustomerApp initial="signin.otp" caption="2 · SMS code" sub="Wrong code, expiry and resend all handled" state={{ signedIn: false }} />
      <CustomerApp initial="signin.name" caption="3 · New customer: name" sub="Shown only when the number is new" state={{ signedIn: false }} />
      <CustomerApp initial="signin.address" caption="4 · New customer: address" sub="Then Home. A known number skips 3 and 4" state={{ signedIn: false }} />
    </PhoneRow>
  ),
};

export const MobileNumber: S = { render: () => <CustomerApp initial="signin.phone" state={{ signedIn: false }} /> };
export const SmsCode: S = { render: () => <CustomerApp initial="signin.otp" state={{ signedIn: false }} /> };
export const NewCustomerName: S = { render: () => <CustomerApp initial="signin.name" state={{ signedIn: false }} /> };
export const NewCustomerAddress: S = { render: () => <CustomerApp initial="signin.address" state={{ signedIn: false }} /> };
export const KnownNumber: S = { name: 'Known number (skips 3 and 4)', render: () => <CustomerApp initial="signin.phone" /> };
