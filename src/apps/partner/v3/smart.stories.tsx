import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V3/30 Voice help, demand map and smart checks', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="voiceGuide" caption="47 · Voice guide" sub="Jobs read aloud, accept by voice" />
      <PartnerApp initial="demandMap" caption="48 · Demand map" sub="Shows busy areas and extra pay nearby" />
      <PartnerApp initial="photoCheck" caption="49 · Instant photo check" sub="Blurry or dark photos caught before leaving" />
      <PartnerApp initial="planner" caption="50 · Earnings planner" sub="Set a goal, see the best hours to reach it" />
    </PhoneRow>
  ),
};
export const VoiceGuide: S = { args: { initial: 'voiceGuide' } };
export const DemandMap: S = { args: { initial: 'demandMap' } };
export const PhotoCheck: S = { args: { initial: 'photoCheck' } };
export const Planner: S = { args: { initial: 'planner' } };
