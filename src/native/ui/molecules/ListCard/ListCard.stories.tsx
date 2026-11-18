import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ListCard, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { tone: { control: 'select', options: ["yellow", "mint", "red", "clear", "ink"] }, sel: { control: 'boolean' }, gap: { control: { type: 'range', min: 0, max: 20 } } },
  args: { children: null },
  render: (a) => <ListCard {...a}><T>Sweep and mop floors</T><T>Dusting</T><T>Wipe surfaces</T></ListCard>,
} satisfies Meta<typeof ListCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mint: Story = { args: { tone: 'mint' } };
