import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V2/28 Ratings both ways, quality and badges', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="rateCustomer" caption="40 · Rate the customer" sub="Two-way rating, private to Saathi" />
      <PartnerApp initial="reviews" caption="41 · Reviews received" sub="Thank the customer, or contest an unfair one" />
      <PartnerApp initial="quality" caption="42 · Quality score" sub="Four numbers, the bar for each, no surprises" />
      <PartnerApp initial="badges" caption="43 · Badges" sub="Earned for quality, shown to customers" />
    </PhoneRow>
  ),
};
export const RateCustomer: S = { name: '40 · Rate the customer', args: { initial: 'rateCustomer' } };
export const Reviews: S = { name: '41 · Reviews received', args: { initial: 'reviews' } };
export const Quality: S = { name: '42 · Quality score', args: { initial: 'quality' } };
export const Badges: S = { name: '43 · Badges', args: { initial: 'badges' } };
