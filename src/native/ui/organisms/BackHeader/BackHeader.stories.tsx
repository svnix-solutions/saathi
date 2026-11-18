import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BackHeader, Link } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/BackHeader',
  component: BackHeader,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { color: { control: 'color' }, fallback: { control: 'text' }, onBack: { action: 'back' } },
  args: { title: 'Choose a time' },
} satisfies Meta<typeof BackHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRight: Story = { args: { right: <Link>Help</Link> } };
