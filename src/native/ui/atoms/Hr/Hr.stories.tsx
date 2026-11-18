import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Hr } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Hr',
  component: Hr,
  tags: ['autodocs'],
  decorators: [frame],
} satisfies Meta<typeof Hr>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
