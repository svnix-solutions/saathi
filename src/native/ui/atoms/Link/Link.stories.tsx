import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Link } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { center: { control: 'boolean' }, color: { control: 'color' }, onPress: { action: 'press' } },
  args: { children: 'Change' },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Centred: Story = { args: { center: true, children: 'Resend code' } };
