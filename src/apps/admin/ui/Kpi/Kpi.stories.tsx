import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Kpi } from './Kpi';
import { KpiGrid } from './KpiGrid';
import { withAdmin } from '../storyDecorator';

/** KPI card for the top row of a page. */
const meta: Meta<typeof Kpi> = {
  title: 'Components/Admin/Kpi',
  component: Kpi,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { label: 'Partners online', value: '37', sub: 'of 52 · 3 signing up', tone: 'default' },
  argTypes: { tone: { control: 'inline-radio', options: ['default', 'alert'] }, label: { control: 'text' }, sub: { control: 'text' }, spark: { control: 'object' } },
  render: (a) => <div style={{ width: 240 }}><Kpi {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof Kpi>;

export const Default: S = {};
export const Alert: S = { args: { label: 'Waiting for a partner', value: 2, sub: undefined, tone: 'alert' } };
export const Sparkline: S = { args: { label: 'Bookings this week', value: '812', sub: undefined, spark: [0.3, 0.4, 0.35, 0.6, 0.55, 0.8, 0.9] } };
export const Row: S = {
  name: 'KpiGrid',
  render: () => (
    <div style={{ width: 900 }}>
      <KpiGrid>
        <Kpi label="Jobs in progress" value={14} /><Kpi label="Partners online" value="37" sub="of 52" />
        <Kpi label="Waiting for a partner" value={2} tone="alert" /><Kpi label="Revenue today" value="₹18,640" />
      </KpiGrid>
    </div>
  ),
};
