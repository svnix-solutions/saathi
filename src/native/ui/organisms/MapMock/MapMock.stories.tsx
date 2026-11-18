import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MapMock } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/MapMock',
  component: MapMock,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { height: { control: { type: 'range', min: 120, max: 320 } }, route: { control: 'boolean' } },
  args: { height: 230, dots: [{ x: 40, y: 60, icon: 'user', tone: 'yellow' }, { x: 180, y: 140, icon: 'home' }] },
} satisfies Meta<typeof MapMock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoRoute: Story = { args: { route: false } };
