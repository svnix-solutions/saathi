import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = {
  title: 'Customer app/V2/14 Helper profile, visit report and more ways to book',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="helperProfile" caption="40 · Helper profile" sub="Checks done, rating, skills, languages" />
      <CustomerApp initial="visitReport" caption="41 · Visit report" sub="Check-in and out times, selfie match, photos" />
      <CustomerApp initial="bookForFamily" caption="42 · Book for family" sub="Another home, their phone, your payment" />
      <CustomerApp initial="deepClean" caption="43 · Deep clean builder" sub="Rooms add up to time and price, 2 helpers option" />
    </PhoneRow>
  ),
};

export const HelperProfile: S = { name: '40 · Helper profile', render: () => <CustomerApp initial="helperProfile" /> };
export const VisitReport: S = { name: '41 · Visit report', render: () => <CustomerApp initial="visitReport" /> };
export const BookForFamily: S = { name: '42 · Book for family', render: () => <CustomerApp initial="bookForFamily" /> };
export const DeepClean: S = { name: '43 · Deep clean builder', render: () => <CustomerApp initial="deepClean" /> };
