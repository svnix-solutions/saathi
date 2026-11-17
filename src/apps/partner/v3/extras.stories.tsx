import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V3/35 Benefits, advance, kit and community', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="benefits" caption="51 · Benefits" sub="Insurance, health check, sick days. Needs a licensed bank or insurer partner" />
      <PartnerApp initial="advance" caption="52 · Pay advance" sub="Money ahead, repaid weekly, no interest. Needs a licensed bank or insurer partner" />
      <PartnerApp initial="kitShop" caption="53 · Kit shop" sub="Uniform and tools at cost, deducted later" />
      <PartnerApp initial="community" caption="54 · Community" sub="Area leaderboard, meet-ups, tips from peers" />
    </PhoneRow>
  ),
};
export const Benefits: S = { args: { initial: 'benefits' } };
export const Advance: S = { args: { initial: 'advance' } };
export const KitShop: S = { args: { initial: 'kitShop' } };
export const Community: S = { args: { initial: 'community' } };
