import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Avatar, faceIds } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { face: { control: 'select', options: faceIds }, size: { control: { type: 'range', min: 24, max: 96 } }, initials: { control: 'text' }, bg: { control: 'color' } },
  args: { face: 'sd', size: 48 },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Face: Story = {};
export const Initials: Story = { args: { face: undefined, initials: 'NK' } };
