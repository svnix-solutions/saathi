import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { TagFilter } from './TagFilter';
import { withAdmin } from '../storyDecorator';

type K = 'all' | 'needs' | 'today' | 'done';
const items = [{ key: 'all' as K, label: 'All 86' }, { key: 'needs' as K, label: 'Needs a partner 2', red: true }, { key: 'today' as K, label: 'Today 14' }, { key: 'done' as K, label: 'Done 70' }];

/** Tag-style filter chips (the bookings list). */
const meta: Meta<typeof TagFilter<K>> = {
  title: 'Components/Admin/TagFilter',
  component: TagFilter,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { items, value: 'all', onChange: () => {} },
  argTypes: { value: { control: 'inline-radio', options: items.map((i) => i.key) } },
  render: (a) => <div className="lft"><TagFilter {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof TagFilter<K>>;

export const Default: S = {};
export const Interactive: S = {
  render: function Render(a) {
    const [v, setV] = useState<K>('all');
    return <div className="lft"><TagFilter {...a} value={v} onChange={setV} /></div>;
  },
};
