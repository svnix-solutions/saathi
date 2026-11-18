import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Bar } from './Bar';
import { BarRow } from './BarRow';
import { withAdmin } from '../storyDecorator';

/** Progress bar; `BarRow` adds a label and value above it. */
const meta: Meta<typeof Bar> = {
  title: 'Components/Admin/Bar',
  component: Bar,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { pct: 64, tone: 'default' },
  argTypes: { pct: { control: { type: 'range', min: 0, max: 100 } }, tone: { control: 'inline-radio', options: ['default', 'alert'] } },
  render: (a) => <div style={{ width: 280 }}><Bar {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof Bar>;

export const Default: S = {};
export const Alert: S = { args: { pct: 15, tone: 'alert' } };
export const Rows: S = {
  name: 'BarRow',
  render: () => (
    <div className="card s" style={{ width: 300, display: 'grid', gap: 9 }}>
      <BarRow label="Sector 21" value={12} pct={92} /><BarRow label="Block C" value={10} pct={77} /><BarRow label="Block D" value="2 · low" pct={15} tone="alert" />
    </div>
  ),
};
