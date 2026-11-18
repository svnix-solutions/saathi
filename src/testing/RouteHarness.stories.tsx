import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { CustomerApp } from '@/apps/customer/App';
import { PartnerApp } from '@/apps/partner/App';
import { AdminApp } from '@/apps/admin/App';
import { adminPages } from '@/apps/admin/navigation/pages';

/**
 * Visual-regression harness: opens any screen by route name taken from the page URL
 * (`?route=visit.finish`), which Storybook URL args cannot carry. Hidden from the sidebar.
 *   /iframe.html?id=testing-route-harness--customer&route=chores
 */
const meta: Meta = { title: 'Testing/Route harness', tags: ['!dev', '!autodocs'], parameters: { layout: 'centered' } };
export default meta;

const route = (fallback: string) => new URLSearchParams(window.location.search).get('route') ?? fallback;

export const Customer: StoryObj = { render: () => <CustomerApp initial={route('home')} /> };
export const Partner: StoryObj = { render: () => <PartnerApp initial={route('home')} /> };
export const Admin: StoryObj = { parameters: { layout: 'fullscreen' }, render: () => <AdminApp pages={adminPages} initial={route('dashboard')} /> };
