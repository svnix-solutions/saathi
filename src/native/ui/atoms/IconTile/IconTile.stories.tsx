import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { IconTile, iconNames } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/IconTile',
  component: IconTile,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { name: { control: 'select', options: iconNames }, size: { control: { type: 'range', min: 24, max: 64 } }, color: { control: 'color' }, bg: { control: 'color' }, onPress: { action: 'press' } },
  args: { name: 'sparkle' },
} satisfies Meta<typeof IconTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Yellow: Story = { args: { bg: '#ffc93c', color: '#0f1f1c', name: 'star' } };
