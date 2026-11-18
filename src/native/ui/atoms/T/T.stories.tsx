import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/T',
  component: T,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'inline-radio', options: ["body", "small"] }, tone: { control: 'select', options: ["ink", "muted", "accent", "red", "white"] }, s: { control: 'boolean' }, m: { control: 'boolean' }, b: { control: 'boolean' }, center: { control: 'boolean' }, strike: { control: 'boolean' }, size: { control: 'number' }, color: { control: 'color' } },
  args: { children: 'Your helper arrives in 15 minutes.' },
} satisfies Meta<typeof T>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};
export const Small: Story = { args: { s: true, m: true, children: 'Or schedule for later' } };
export const Bold: Story = { args: { b: true } };
export const Struck: Story = { args: { strike: true, m: true, children: 'Sweep and mop floors' } };
