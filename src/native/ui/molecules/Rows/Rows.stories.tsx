import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Rows, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Rows',
  component: Rows,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { gap: { control: { type: 'range', min: 0, max: 20 } } },
  args: { children: null },
  render: (a) => <Rows {...a}><T>Sweep and mop floors</T><T>Dusting</T><T>Wipe surfaces</T></Rows>,
} satisfies Meta<typeof Rows>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
