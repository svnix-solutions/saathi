import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Check } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Check',
  component: Check,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { on: { control: 'boolean' }, disabled: { control: 'boolean' }, size: { control: { type: 'range', min: 14, max: 32 } } },
  args: { on: true },
} satisfies Meta<typeof Check>;
export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Off: Story = { args: { on: false } };
export const Large: Story = { args: { size: 24 } };
export const Disabled: Story = { args: { disabled: true } };
