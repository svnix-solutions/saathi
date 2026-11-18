import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { CheckRow } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/CheckRow',
  component: CheckRow,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { on: { control: 'boolean' }, done: { control: 'boolean' }, s: { control: 'boolean' }, disabled: { control: 'boolean' }, size: { control: { type: 'range', min: 14, max: 28 } } },
  args: { label: 'Sweep and mop floors', on: true },
} satisfies Meta<typeof CheckRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Done: Story = { args: { done: true } };
export const Large: Story = { args: { size: 24 } };
export const Interactive: Story = { render: (a) => { const [on, setOn] = useState(false); return <CheckRow {...a} on={on} onPress={() => setOn(!on)} />; } };
