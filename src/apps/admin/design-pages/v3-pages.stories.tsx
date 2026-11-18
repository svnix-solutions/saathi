import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AdminApp } from '../App';
import { adminPages } from '../navigation/pages';

/** Saathi Admin, Version 3 ("Later") pages (design 76, 78, 93, 94). */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/Design pages/V3', tags: ['v3', 'design-page'],
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
  args: { pages: adminPages },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

export const Smart: S = { name: '76 Smart operations', args: { initial: 'smart' } };
export const Campaigns: S = { name: '78 Campaigns', args: { initial: 'campaigns' } };
export const Claims: S = { name: '93 Damage claims', args: { initial: 'claims' } };
export const Advances: S = { name: '94 Pay advances', args: { initial: 'advances' } };
