import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Circle, Icon } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Circle',
  component: Circle,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { size: { control: { type: 'range', min: 40, max: 200 } }, bg: { control: 'color' }, border: { control: 'color' } },
  args: { size: 120, bg: '#e3f2ec' },
} satisfies Meta<typeof Circle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = { render: (a) => <Circle {...a}><Icon name="mic" size={36} color="#0b5d4b" /></Circle> };
export const Dashed: Story = { args: { bg: undefined, border: '#0b5d4b' }, render: (a) => <Circle {...a}><Icon name="cam" size={32} color="#0b5d4b" /></Circle> };
