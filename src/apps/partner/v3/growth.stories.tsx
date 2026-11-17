import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V3/36 Career, documents, swaps and savings', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="career" caption="55 · Career path" sub="From partner to trainer to area lead" />
      <PartnerApp initial="documents" caption="56 · Documents" sub="Every paper, its expiry, one place to renew" />
      <PartnerApp initial="swapJob" caption="57 · Swap a job" sub="Hand over to a nearby partner, no penalty" />
      <PartnerApp initial="savings" caption="58 · Savings pot" sub="A goal, automatic saving, take out any time. Needs a licensed bank or insurer partner" />
    </PhoneRow>
  ),
};
export const Career: S = { args: { initial: 'career' } };
export const Documents: S = { args: { initial: 'documents' } };
export const SwapJob: S = { args: { initial: 'swapJob' } };
export const Savings: S = { args: { initial: 'savings' } };
