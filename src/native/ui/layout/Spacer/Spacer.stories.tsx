import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Spacer, Screen, T, Button } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  decorators: [frame],
} satisfies Meta<typeof Spacer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <View style={{ height: 260 }}><Screen scroll={false}><T>Content at the top</T><Spacer /><Button>Pinned to the bottom</Button></Screen></View> };
