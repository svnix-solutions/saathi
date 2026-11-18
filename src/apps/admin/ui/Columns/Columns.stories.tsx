import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Columns } from './Columns';
import { withAdmin } from '../storyDecorator';

const perDay = [101, 95, 108, 116, 121, 141, 130];
const bars = perDay.map((n, i) => ({ h: (n / 141) * 100, color: i === 5 ? 'var(--green)' : undefined, title: `${n} bookings` }));

/** Vertical bar chart. */
const meta: Meta<typeof Columns> = {
  title: 'Components/Admin/Columns',
  component: Columns,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { bars, height: 140, gap: 12 },
  argTypes: { height: { control: 'number' }, gap: { control: 'number' }, picked: { control: 'number' }, flex: { control: 'boolean' } },
  render: (a) => <div className="card" style={{ width: 360 }}><Columns {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof Columns>;

export const Default: S = {};
export const Pickable: S = {
  render: function Render(a) {
    const [p, setP] = useState<number | undefined>();
    return <div className="card" style={{ width: 360 }}><Columns {...a} picked={p} onPick={setP} /><div className="s m">{p === undefined ? 'Click a bar' : bars[p].title}</div></div>;
  },
};
