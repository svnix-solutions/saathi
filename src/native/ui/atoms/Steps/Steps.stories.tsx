import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Steps } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Steps',
  component: Steps,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { step: { control: { type: 'range', min: 0, max: 6 } }, total: { control: { type: 'range', min: 2, max: 8 } }, label: { control: 'text' } },
  args: { step: 2, total: 6 },
} satisfies Meta<typeof Steps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {};
export const WithLabel: Story = { args: { label: 'Sign-up · step 2 of 6' } };
