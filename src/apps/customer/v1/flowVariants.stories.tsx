import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** The same four conditions as the home screen, applied across the rest of the booking flow, one per screen. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/08 The booking flow in dark mode, large text, Hindi and on a small phone',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="chores" caption="24 · Choose chores · dark mode" sub="Ticks, text box and button on a dark ground" params={{ service: 'general' }} dark />
      <CustomerApp initial="time" caption="25 · Duration and time · large text" sub="Pills and cards grow, the page scrolls" textScale={1.22} />
      <CustomerApp initial="confirm" caption="26 · Confirm and pay · Hindi" sub="Every label translated; amounts unchanged" locale="hi" />
      <CustomerApp initial="tracking" caption="27 · Helper on the way · small phone" sub="Map shrinks first, the code stays visible" device="small" />
    </PhoneRow>
  ),
};

export const ChooseChoresDark: S = { render: () => <CustomerApp initial="chores" params={{ service: 'general' }} dark /> };
export const DurationLargeText: S = { render: () => <CustomerApp initial="time" textScale={1.22} /> };
export const ConfirmHindi: S = { render: () => <CustomerApp initial="confirm" locale="hi" /> };
export const TrackingSmallPhone: S = { render: () => <CustomerApp initial="tracking" device="small" /> };
