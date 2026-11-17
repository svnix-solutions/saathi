import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

/** Variants are the same live screens rendered with theme props, not new screens. */
const meta: Meta = { title: 'Partner app/V1 · Launch/28 Hindi, large text, small phone and dark mode', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="home" locale="hi" state={{ autoOffer: false }} caption="28 · Home · Hindi" sub="The language most partners will use" />
      <PartnerApp initial="onJob" textScale={1.22} caption="29 · On the job · large text" sub="Tasks and the finish button stay large and reachable" />
      <PartnerApp initial="checkIn" device="small" caption="30 · Check in · small phone" sub="The four checks still fit above the button" />
      <PartnerApp initial="earnings" dark caption="31 · Earnings · dark mode" sub="Same green header, dark cards" />
    </PhoneRow>
  ),
};

export const HomeHindi: S = { name: 'Home · Hindi', render: () => <PartnerApp initial="home" locale="hi" /> };
export const OnJobLargeText: S = { name: 'On the job · large text', render: () => <PartnerApp initial="onJob" textScale={1.22} /> };
export const CheckInSmallPhone: S = { name: 'Check in · small phone', render: () => <PartnerApp initial="checkIn" device="small" /> };
export const EarningsDark: S = { name: 'Earnings · dark mode', render: () => <PartnerApp initial="earnings" dark /> };
export const FullFlowHindi: S = { name: 'Full sign-up flow · Hindi', render: () => <PartnerApp initial="signin.phone" locale="hi" state={{ approved: false }} /> };
