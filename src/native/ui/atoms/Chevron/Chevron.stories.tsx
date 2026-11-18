import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Chevron } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Chevron',
  component: Chevron,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { color: { control: 'color' }, size: { control: 'number' } },
} satisfies Meta<typeof Chevron>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
