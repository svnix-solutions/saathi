import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Card, H2, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { tone: { control: 'select', options: ["yellow", "mint", "red", "clear", "ink"] }, sel: { control: 'boolean' }, pad: { control: 'boolean' }, row: { control: 'boolean' } },
  render: (a) => <Card {...a}><H2>General cleaning</H2><T s m>Sweep, mop, dusting · 1 hr</T></Card>,
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { sel: true } };
export const Yellow: Story = { args: { tone: 'yellow' } };
export const Mint: Story = { args: { tone: 'mint' } };
export const Pressable: Story = { args: { onPress: () => {} } };
