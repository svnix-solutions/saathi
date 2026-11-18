import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** Three one-time codes per booking, shown only in the customer's app: a start code, then a happy and a not-happy finish code. */
const meta: Meta = {
  title: 'Customer app/Design pages/V1 · Launch/06 Start code and finish codes', tags: ['v1', 'design-page'],
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="tracking" params={{ arrived: true }} caption="9b · Start code" sub="Shown big once the partner checks in" />
      <CustomerApp initial="inProgress" caption="9c · Job running" sub="The start shows as confirmed by code" />
      <CustomerApp initial="visit.finish" caption="9d · Two finish codes" sub="One code for happy, one for not happy" />
      <CustomerApp initial="visit.notHappy" caption="9e · After the not-happy code" sub="Support ticket opened, payment held" />
    </PhoneRow>
  ),
};

export const StartCode: S = { render: () => <CustomerApp initial="tracking" params={{ arrived: true }} /> };
export const JobRunning: S = { render: () => <CustomerApp initial="inProgress" /> };
export const FinishCodes: S = { render: () => <CustomerApp initial="visit.finish" /> };
export const NotHappy: S = { render: () => <CustomerApp initial="visit.notHappy" /> };
export const WholeVisit: S = { name: 'Whole visit: on the way → start code → job → finish codes', render: () => <CustomerApp initial="tracking" /> };
