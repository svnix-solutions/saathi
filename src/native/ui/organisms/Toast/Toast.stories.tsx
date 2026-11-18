import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Toast } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { message: { control: 'text' } },
  args: { message: 'Sunita started the job with your code' },
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => <View style={{ height: 80 }}><Toast {...a} /></View> };
