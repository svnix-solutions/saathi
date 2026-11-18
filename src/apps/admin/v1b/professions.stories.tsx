import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { AdminApp } from '../shell';
import { adminPages } from '../routes';

/** Saathi Admin V1, design page 51: professions, specialisations, skills and the documents each needs. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/V1 · Launch/51 Professions, skills and documents',
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Professions: StoryObj<typeof AdminApp> = {
  name: '51 Professions, skills and documents',
  parameters: { layout: 'fullscreen' },
  render: () => <AdminApp pages={adminPages} initial="professions" />,
};
