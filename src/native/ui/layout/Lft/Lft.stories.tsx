import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Lft, Avatar, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Lft',
  component: Lft,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { gap: { control: { type: 'range', min: 0, max: 24 } } },
  render: (a) => <Lft {...a}><Avatar face="sd" /><T b>Sunita D.</T></Lft>,
} satisfies Meta<typeof Lft>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
