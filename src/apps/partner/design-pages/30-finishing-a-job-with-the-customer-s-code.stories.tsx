import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/Design pages/V1 · Launch/30 Finishing a job with the customer’s code', tags: ['v1', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="finishCode" caption="42 · Finish code" sub="Same screen for both codes (prototype: 3907 happy, 6154 not happy)" />
      <PartnerApp initial="finish.happy" caption="43 · Happy code" sub="Earning added straight away" />
      <PartnerApp initial="finish.notHappy" caption="44 · Not-happy code" sub="Calm wording; the earning is held, not taken" />
      <PartnerApp initial="finishCode" params={{ code: '1234' }} state={{ finishTries: 3 }} caption="45 · Wrong code" sub="5 tries per code, then support takes over" />
    </PhoneRow>
  ),
};

export const FinishCode: S = { name: 'Finish code', render: () => <PartnerApp initial="finishCode" /> };
export const FinishHappy: S = { name: 'Happy code', render: () => <PartnerApp initial="finish.happy" /> };
export const FinishNotHappy: S = { name: 'Not-happy code', render: () => <PartnerApp initial="finish.notHappy" /> };
export const WrongCode: S = { name: 'Wrong code', render: () => <PartnerApp initial="finishCode" params={{ code: '1234' }} state={{ finishTries: 3 }} /> };
export const Locked: S = { name: 'Wrong code · locked', render: () => <PartnerApp initial="finishCode" state={{ finishTries: 5 }} /> };
