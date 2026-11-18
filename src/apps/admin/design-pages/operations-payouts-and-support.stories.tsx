import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { AdminApp } from '../shell';
import { adminPages } from '../routes';

/** Saathi Admin, version 1 (launch), part A: sign in, operations, partners, payouts and support. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/Design pages/V1 · Launch/Operations, payouts and support', tags: ['v1', 'design-page'],
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
  args: { pages: adminPages },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

const page = (initial: string, name: string, initialParams?: Record<string, any>): S => ({ name, args: { initial, initialParams } });

export const SignIn: S = { name: 'Sign in', args: { signedIn: false } };
export const Dashboard = page('dashboard', 'Dashboard');
export const Partners = page('partners', 'Partners');
export const Payouts = page('payouts', 'Payouts');
export const Support = page('support', 'Support');
export const Assign = page('assign', 'Assign', { id: '2042' });
export const Live = page('live', 'Live map');
export const Bookings = page('bookings', 'Bookings');
export const Ticket = page('ticket', 'Ticket', { id: 'T-318' });
