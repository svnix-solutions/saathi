import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Stepper } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { min: { control: 'number' }, max: { control: 'number' }, addLabel: { control: 'text' } },
  args: { value: 2, onChange: () => {} },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => { const [v, setV] = useState(a.value); return <Stepper {...a} value={v} onChange={setV} />; } };
export const Empty: Story = { args: { value: 0 } };
