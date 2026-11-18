import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Icon, iconNames } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { name: { control: 'select', options: iconNames }, size: { control: { type: 'range', min: 12, max: 48 } }, fill: { control: 'boolean' }, strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.1 } }, color: { control: 'color' } },
  args: { name: 'bolt', size: 24 },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { name: 'star', fill: true, color: '#ffc93c' } };
