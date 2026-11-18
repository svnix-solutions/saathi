import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Screen, H, T, Card } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Screen',
  component: Screen,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { gap: { control: { type: 'range', min: 0, max: 24 } }, scroll: { control: 'boolean' }, pad: { control: 'boolean' }, bg: { control: 'color' } },
  render: (a) => <View style={{ height: 260 }}><Screen {...a}><H>Your bookings</H><T s m>Upcoming</T><Card><T>Kitchen & bath scrub · Tomorrow 10:00</T></Card></Screen></View>,
} satisfies Meta<typeof Screen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
