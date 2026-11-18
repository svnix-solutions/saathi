import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { OtpInput } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { length: { control: { type: 'inline-radio' }, options: [4, 6] }, error: { control: 'boolean' } },
  args: { length: 4, value: '48', onChange: () => {} },
} satisfies Meta<typeof OtpInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => { const [v, setV] = useState(a.value); return <OtpInput {...a} value={v} onChange={setV} />; } };
export const Error: Story = { args: { error: true, value: '1234' } };
