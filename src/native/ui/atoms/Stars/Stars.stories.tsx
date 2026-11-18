import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Stars } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Stars',
  component: Stars,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { value: { control: { type: 'range', min: 0, max: 5, step: 0.5 } }, size: { control: { type: 'range', min: 10, max: 36 } }, max: { control: 'number' } },
  args: { value: 4 },
} satisfies Meta<typeof Stars>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {};
export const Interactive: Story = {
  args: { size: 30 },
  render: (a) => { const [v, setV] = useState(a.value); return <Stars {...a} value={v} onChange={setV} />; },
};
