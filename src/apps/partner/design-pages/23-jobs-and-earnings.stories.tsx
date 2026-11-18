import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/Design pages/V1 · Launch/23 Jobs and earnings', tags: ['v1', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="home" state={{ autoOffer: false }} caption="9 · Home, online" sub="One switch to start receiving jobs" />
      <PartnerApp initial="jobRequest" caption="10 · New job request" sub="Payout and distance first, timed accept" />
      <PartnerApp initial="onJob" caption="11 · On the job" sub="Address, note, tick tasks, finish" />
      <PartnerApp initial="earnings" caption="12 · Earnings" sub="Week total, daily bars, each payout" />
      <PartnerApp initial="jobs" caption="Jobs tab" sub="Today and upcoming (not drawn in the design)" />
    </PhoneRow>
  ),
};

export const Home: S = { name: 'Home, online', render: () => <PartnerApp initial="home" state={{ autoOffer: true }} /> };
export const JobRequest: S = { name: 'New job request', render: () => <PartnerApp initial="jobRequest" /> };
export const OnJob: S = { name: 'On the job', render: () => <PartnerApp initial="onJob" /> };
export const Earnings: S = { render: () => <PartnerApp initial="earnings" /> };
export const Jobs: S = { name: 'Jobs tab', render: () => <PartnerApp initial="jobs" /> };
