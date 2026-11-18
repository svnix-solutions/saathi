import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Tabs } from './Tabs';
import { withAdmin } from '../storyDecorator';

type K = 'all' | 'now' | 'scheduled' | 'problems';
const items: { key: K; label: string }[] = [{ key: 'all', label: 'All' }, { key: 'now', label: 'Now' }, { key: 'scheduled', label: 'Scheduled' }, { key: 'problems', label: 'Problems' }];

/** Filter tabs for a card header. */
const meta: Meta<typeof Tabs<K>> = {
  title: 'Components/Admin/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { items, value: 'all', onChange: () => {} },
  argTypes: { value: { control: 'inline-radio', options: items.map((i) => i.key) } },
};
export default meta;
type S = StoryObj<typeof Tabs<K>>;

export const Default: S = {};
export const Interactive: S = {
  render: function Render(a) {
    const [v, setV] = useState<K>('all');
    return <Tabs {...a} value={v} onChange={setV} />;
  },
};
