import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** The kinds of work on Home come from the database, and so do the services and prices under each. Booking works the same as cleaning. */
const meta: Meta = {
  title: 'Customer app/V1 · Launch/04 Nursing, home repair and barber',
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="home" params={{ category: 'nursing' }} caption="5b · Nursing" sub="Same booking flow; only nurses with matching specialisations are sent" />
      <CustomerApp initial="home" params={{ category: 'repair' }} caption="5c · Home repair" sub="Electrician jobs go only to the Electrician specialisation" />
      <CustomerApp initial="home" params={{ category: 'barber' }} caption="5d · Barber" sub="Kids haircut needs the Kids specialisation" />
    </PhoneRow>
  ),
};

export const Nursing: S = { render: () => <CustomerApp initial="home" params={{ category: 'nursing' }} /> };
export const HomeRepair: S = { render: () => <CustomerApp initial="home" params={{ category: 'repair' }} /> };
export const Barber: S = { render: () => <CustomerApp initial="home" params={{ category: 'barber' }} /> };
export const BookANurseVisit: S = { name: 'Book a nurse visit (chores)', render: () => <CustomerApp initial="chores" params={{ service: 'nurseVisit' }} /> };
