import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Badge } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { tone: { control: 'inline-radio', options: ["red", "yellow", "green"] }, count: { control: 'number' }, max: { control: 'number' } },
  args: { count: 3 },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Count: Story = {};
export const Overflow: Story = { args: { count: 14 } };
export const Dot: Story = { args: { count: undefined } };
