import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Toggle } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { on: { control: 'boolean' }, big: { control: 'boolean' }, disabled: { control: 'boolean' }, onChange: { action: 'change' } },
  args: { on: true },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Off: Story = { args: { on: false } };
export const Big: Story = { args: { big: true } };
export const Disabled: Story = { args: { disabled: true } };
