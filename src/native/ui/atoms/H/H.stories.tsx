import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { H } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/H',
  component: H,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'inline-radio', options: ["title", "headline", "display"] }, size: { control: 'number' }, center: { control: 'boolean' }, color: { control: 'color' } },
  args: { children: 'What needs doing today?' },
} satisfies Meta<typeof H>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {};
export const Headline: Story = { args: { variant: 'headline', children: 'Enter your number' } };
export const Display: Story = { args: { variant: 'display', children: '₹1,240' } };
