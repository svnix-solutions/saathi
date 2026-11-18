import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V2/31 Route, ratings and bonuses', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="route" caption="36 · Route to the job" sub="Time, gate note, call, one arrive button" />
      <PartnerApp initial="ratings" caption="37 · My ratings" sub="Score, what customers praise, one tip" />
      <PartnerApp initial="bonuses" caption="38 · Bonuses" sub="Weekly target, busy hours, new skills" />
      <PartnerApp initial="timeOff" caption="39 · Time off" sub="Pick days, reason, plan customers covered" />
    </PhoneRow>
  ),
};
export const Route: S = { name: '36 · Route to the job', args: { initial: 'route' } };
export const Ratings: S = { name: '37 · My ratings', args: { initial: 'ratings' } };
export const Bonuses: S = { name: '38 · Bonuses', args: { initial: 'bonuses' } };
export const TimeOff: S = { name: '39 · Time off', args: { initial: 'timeOff' } };
