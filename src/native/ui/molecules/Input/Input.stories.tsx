import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Input } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { small: { control: 'boolean' }, multiline: { control: 'boolean' }, secure: { control: 'boolean' }, keyboardType: { control: 'select', options: ["default", "phone-pad", "number-pad", "email-address"] }, prefix: { control: 'text' }, placeholder: { control: 'text' } },
  args: { placeholder: '98765 43210' },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = { args: { prefix: '+91', keyboardType: 'phone-pad' } };
export const Small: Story = { args: { small: true, placeholder: 'Gate 2, tell the guard flat 204' } };
export const Multiline: Story = { args: { small: true, multiline: true, placeholder: 'Anything the helper should know?' } };
