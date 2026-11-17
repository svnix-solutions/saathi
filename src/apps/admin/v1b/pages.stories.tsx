import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { AdminApp } from '../shell';
import { adminPages } from '../routes';

/** Saathi Admin V1 part B: team, permissions, role view, sign-ups, safety, services, one partner. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/V1 · Launch/Team, sign-ups, safety and services',
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

const story = (initial: string, name: string, initialParams?: Record<string, any>): S => ({
  name,
  parameters: { layout: 'fullscreen' },
  render: () => <AdminApp pages={adminPages} initial={initial} initialParams={initialParams} />,
});

export const Team = story('team', '85 Team and roles');
export const Permissions = story('permissions', '86 Roles and permissions');
export const PermissionsReadOnly: S = {
  name: '86 Roles and permissions (read only, Finance)',
  parameters: { layout: 'fullscreen' },
  render: () => <AdminApp pages={adminPages} initial="permissions" session={{ roles: ['Finance'], zones: ['All zones'], name: 'Accounts', face: 'ac' }} />,
};
export const RoleView = story('roleView', '87 What a Support person sees');
export const Signups = story('signups', '88 Partner sign-ups');
export const Safety = story('safety', '89 Safety alerts');
export const Services = story('services', '90 Services and prices');
export const PartnerDetail = story('partnerDetail', '91 One partner', { id: 'KP-0142' });
