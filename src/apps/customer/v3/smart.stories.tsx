import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = { title: 'Customer app/V3/16 Voice, photo estimate and smart booking', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="voiceBooking" params={{ phase: 'done' }} caption="56 · Voice booking" sub="Say it in your language, confirm, done" />
      <CustomerApp initial="photoEstimate" params={{ phase: 'estimate' }} caption="57 · Photo estimate" sub="A photo becomes a task list, time and price" />
      <CustomerApp initial="smartHome" caption="58 · Smart home screen" sub="Learns the routine, one tap to repeat, AutoPay" />
      <CustomerApp initial="lockScreen" caption="59 · Lock screen and WhatsApp" sub="Live progress where the customer already looks" />
    </PhoneRow>
  ),
};

export const VoiceBooking: S = { name: '56 · Voice booking', render: () => <CustomerApp initial="voiceBooking" /> };
export const PhotoEstimate: S = { name: '57 · Photo estimate', render: () => <CustomerApp initial="photoEstimate" /> };
export const SmartHome: S = { name: '58 · Smart home screen', render: () => <CustomerApp initial="smartHome" /> };
export const LockScreen: S = { name: '59 · Lock screen and WhatsApp', render: () => <CustomerApp initial="lockScreen" /> };
export const VoiceBookingRecognised: S = { name: '56 · Voice booking (recognised)', render: () => <CustomerApp initial="voiceBooking" params={{ phase: 'done' }} /> };
export const PhotoEstimateResult: S = { name: '57 · Photo estimate (result)', render: () => <CustomerApp initial="photoEstimate" params={{ phase: 'estimate' }} /> };
