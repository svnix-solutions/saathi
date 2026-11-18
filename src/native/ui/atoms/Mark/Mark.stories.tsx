import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Mark } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Mark',
  component: Mark,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { size: { control: { type: 'range', min: 24, max: 120 } }, reversed: { control: 'boolean' } },
  args: { size: 64 },
} satisfies Meta<typeof Mark>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Reversed: Story = { args: { reversed: true }, parameters: { backgrounds: { default: 'dark' } } };
