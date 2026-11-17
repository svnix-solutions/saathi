import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = {
  title: 'Customer app/V2/10 Plans, favourites, supplies and receipts',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="plan" caption="32 · Monthly plan" sub="Recurring visits, fixed helper, one bill" />
      <CustomerApp initial="favourites" caption="33 · Favourite helpers" sub="Re-book people you trust, block others" />
      <CustomerApp initial="supplies" caption="34 · Supplies with the visit" sub="Small extra order, no separate delivery" />
      <CustomerApp initial="receipt" caption="35 · Receipt" sub="Every line of the bill, invoice download" />
    </PhoneRow>
  ),
};

export const Plan: S = { name: '32 · Monthly plan', render: () => <CustomerApp initial="plan" /> };
export const Favourites: S = { name: '33 · Favourite helpers', render: () => <CustomerApp initial="favourites" /> };
export const Supplies: S = { name: '34 · Supplies with the visit', render: () => <CustomerApp initial="supplies" /> };
export const Receipt: S = { name: '35 · Receipt', render: () => <CustomerApp initial="receipt" /> };
