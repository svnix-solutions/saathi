import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = { title: 'Customer app/Design pages/V3/19 Membership, protection and shared homes', tags: ['v3', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="plus" caption="60 · Plus membership" sub="Priority, fixed prices and cover for a fee" />
      <CustomerApp initial="damageClaim" caption="61 · Damage claim" sub="What broke, value, photos, a clear deadline" />
      <CustomerApp initial="sharedHome" caption="62 · Shared home" sub="Flatmates book together and split the bill" />
      <CustomerApp initial="notHome" caption="63 · Not-at-home visit" sub="Safe entry and photo proof at each step" />
    </PhoneRow>
  ),
};

export const Plus: S = { name: '60 · Plus membership', render: () => <CustomerApp initial="plus" /> };
export const DamageClaim: S = { name: '61 · Damage claim', render: () => <CustomerApp initial="damageClaim" /> };
export const SharedHome: S = { name: '62 · Shared home', render: () => <CustomerApp initial="sharedHome" /> };
export const NotHome: S = { name: '63 · Not-at-home visit', render: () => <CustomerApp initial="notHome" /> };
