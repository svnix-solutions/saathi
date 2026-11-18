import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Radio } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { on: { control: 'boolean' }, mark: { control: 'inline-radio', options: ["check", "dot"] }, size: { control: { type: 'range', min: 14, max: 32 } }, disabled: { control: 'boolean' } },
  args: { on: true },
} satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};
export const Unselected: Story = { args: { on: false } };
export const Dot: Story = { args: { size: 22, mark: 'dot' } };
export const Disabled: Story = { args: { disabled: true } };
