import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/V1 · Launch/26 When it is quiet or something goes wrong', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="err.noJobs" caption="21 · No jobs right now" sub="Explains the quiet and when it picks up" />
      <PartnerApp initial="err.offline" caption="22 · No internet on the job" sub="Work is saved on the phone, pay is safe" />
      <PartnerApp initial="err.cancelled" caption="23 · Customer cancelled" sub="Paid for the trip, offered the next job" />
      <PartnerApp initial="err.locationOff" caption="24 · Location is off" sub="Says why it is needed and when it stops" />
    </PhoneRow>
  ),
};

export const ErrNoJobs: S = { name: 'No jobs right now', render: () => <PartnerApp initial="err.noJobs" /> };
export const ErrOffline: S = { name: 'No internet on the job', render: () => <PartnerApp initial="err.offline" /> };
export const ErrCancelled: S = { name: 'Customer cancelled', render: () => <PartnerApp initial="err.cancelled" /> };
export const ErrLocationOff: S = { name: 'Location is off', render: () => <PartnerApp initial="err.locationOff" /> };
