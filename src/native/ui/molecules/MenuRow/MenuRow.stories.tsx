import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MenuRow, iconNames, Tag, ListCard } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/MenuRow',
  component: MenuRow,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { icon: { control: 'select', options: iconNames }, color: { control: 'color' }, onPress: { action: 'press' } },
  args: { label: 'Saved addresses' },
} satisfies Meta<typeof MenuRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSub: Story = { args: { sub: 'Home · Flat 204, Block C', icon: 'pin' } };
export const WithRight: Story = { args: { label: 'Saathi Plus', right: <Tag tone="n">Active</Tag> } };
export const InAList: Story = { render: () => <ListCard><MenuRow label="Saved addresses" icon="pin" /><MenuRow label="Payments" icon="wallet" /><MenuRow label="Help" icon="call" /></ListCard> };
