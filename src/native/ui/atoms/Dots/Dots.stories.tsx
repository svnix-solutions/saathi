import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Dots } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Dots',
  component: Dots,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { count: { control: { type: 'range', min: 2, max: 8 } }, active: { control: 'number' }, onPress: { action: 'press' } },
  args: { count: 3, active: 0 },
} satisfies Meta<typeof Dots>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Interactive: Story = {
  render: (a) => { const [i, setI] = useState(a.active); return <Dots count={a.count} active={i} onPress={setI} />; },
};
