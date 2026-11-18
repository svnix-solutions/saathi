import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { H2 } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/H2',
  component: H2,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { m: { control: 'boolean' }, center: { control: 'boolean' }, color: { control: 'color' } },
  args: { children: 'Your address' },
} satisfies Meta<typeof H2>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {};
export const Muted: Story = { args: { m: true } };
