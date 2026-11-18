import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V2/29 Shift check, training and early payout', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="shiftCheck" caption="32 · Shift check-in" sub="Selfie match and a three-point check" />
      <PartnerApp initial="training" caption="33 · Training lessons" sub="Short videos, then a home visit test" />
      <PartnerApp initial="doorCode" caption="34 · Start with start code" sub="Proves the right partner is at the right door" />
      <PartnerApp initial="payoutEarly" caption="35 · Take out earnings" sub="Free weekly payout or instant for a small fee" />
    </PhoneRow>
  ),
};
export const ShiftCheck: S = { name: '32 · Shift check-in', args: { initial: 'shiftCheck' } };
export const Training: S = { name: '33 · Training lessons', args: { initial: 'training' } };
export const DoorCode: S = { name: '34 · Start with start code', args: { initial: 'doorCode' } };
export const PayoutEarly: S = { name: '35 · Take out earnings', args: { initial: 'payoutEarly' } };
export const DoorCodeHindi: S = { name: '34 · Start with start code · Hindi', args: { initial: 'doorCode', locale: 'hi' } };
export const DoorCodeWrongTwice: S = { name: '34 · Start code · 3 tries left', args: { initial: 'doorCode', state: { startTries: 2 } } };
export const DoorCodeLocked: S = { name: '34 · Start code · locked after 5 wrong', args: { initial: 'doorCode', state: { startTries: 5 } } };
