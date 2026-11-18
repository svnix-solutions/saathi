import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Ring, H, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Ring',
  component: Ring,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { pct: { control: { type: 'range', min: 0, max: 1, step: 0.05 } }, size: { control: { type: 'range', min: 80, max: 220 } } },
  args: { pct: 0.36 },
} satisfies Meta<typeof Ring>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => <Ring {...a}><H size={28}>38:12</H><T s m>left</T></Ring> };
