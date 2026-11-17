import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { AdminApp } from './shell';
import { adminPages } from './routes';

/** The clickable Saathi Admin panel (React DOM). Every sidebar item and most rows are live. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/Prototype',
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
  args: { pages: adminPages },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

export const SignIn: S = { name: 'Sign in', args: { signedIn: false } };
export const Owner: S = { name: 'Owner (all menus)', args: { initial: 'dashboard' } };
export const SupportRole: S = {
  name: 'Signed in as Support',
  args: { initial: 'dashboard', session: { roles: ['Support'], zones: ['Block C', 'Sector 21'], name: 'Anu', face: 'au' } },
};
