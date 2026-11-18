import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AdminApp } from '../App';
import { adminPages } from '../navigation/pages';

/** Saathi Admin, Version 2 pages (design 72, 75, 77, 81, 84, 92, 95). Every page is live inside the full panel. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/Design pages/V2', tags: ['v2', 'design-page'],
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
  args: { pages: adminPages },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

export const Customers: S = { name: '72 Customers', args: { initial: 'customers' } };
export const Ratings: S = { name: '75 Ratings', args: { initial: 'ratings' } };
export const Zones: S = { name: '77 Zones', args: { initial: 'zones' } };
export const CustomerDetail: S = { name: '81 Customer detail', args: { initial: 'customerDetail', initialParams: { id: 'nk' } } };
export const Testimonials: S = { name: '84 Testimonials', args: { initial: 'testimonials' } };
export const Offers: S = { name: '92 Offer codes', args: { initial: 'offers' } };
export const SmallScreens: S = { name: '95 Small screens', args: { initial: 'smallScreens' } };
