import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = {
  title: 'Customer app/Design pages/V2/15 Ratings, reviews and rewards', tags: ['v2', 'design-page'],
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="ratingDetailed" caption="44 · Detailed rating" sub="Overall plus time, quality and behaviour" />
      <CustomerApp initial="ratingLow" caption="45 · When the rating is low" sub="Reason, then a fix the customer chooses" />
      <CustomerApp initial="helperReviews" caption="46 · Helper reviews" sub="Real reviews, low ones shown with our reply" />
      <CustomerApp initial="rewards" caption="47 · Rewards" sub="Points for visits and reviews, two levels" />
    </PhoneRow>
  ),
};

export const RatingDetailed: S = { name: '44 · Detailed rating', render: () => <CustomerApp initial="ratingDetailed" /> };
export const RatingLow: S = { name: '45 · When the rating is low', render: () => <CustomerApp initial="ratingLow" /> };
export const HelperReviews: S = { name: '46 · Helper reviews', render: () => <CustomerApp initial="helperReviews" /> };
export const Rewards: S = { name: '47 · Rewards', render: () => <CustomerApp initial="rewards" /> };
