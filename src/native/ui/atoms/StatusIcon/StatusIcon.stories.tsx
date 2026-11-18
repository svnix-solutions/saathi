import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StatusIcon, iconNames } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { name: { control: 'select', options: iconNames }, tone: { control: 'inline-radio', options: ["neutral", "danger", "red"] }, size: { control: { type: 'range', min: 32, max: 96 } } },
  args: { name: 'alert' },
} satisfies Meta<typeof StatusIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { name: 'clock' } };
export const Danger: Story = { args: { tone: 'danger' } };
export const Red: Story = { args: { tone: 'red', name: 'shield' } };
