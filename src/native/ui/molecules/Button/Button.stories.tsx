import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Button, iconNames } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'select', options: ["primary", "outline", "yellow", "ghost", "ghostDark", "plain"] }, size: { control: 'inline-radio', options: ["regular", "big", "tall"] }, disabled: { control: 'boolean' }, danger: { control: 'boolean' }, icon: { control: 'select', options: iconNames }, onPress: { action: 'press' } },
  args: { children: 'Book helper · ₹158', variant: 'primary' },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Outline: Story = { args: { variant: 'outline', children: 'Change' } };
export const Yellow: Story = { args: { variant: 'yellow', icon: 'bolt', children: 'Add 30 minutes · ₹79' } };
export const Plain: Story = { args: { variant: 'plain', children: 'Try again' } };
export const Danger: Story = { args: { variant: 'outline', danger: true, children: 'Cancel booking' } };
export const Tall: Story = { args: { size: 'tall', children: 'Accept job' } };
export const Disabled: Story = { args: { disabled: true } };
