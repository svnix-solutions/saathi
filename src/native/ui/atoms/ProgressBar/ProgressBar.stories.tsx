import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProgressBar, TopBar } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.05 } }, extra: { control: { type: 'range', min: 0, max: 1, step: 0.05 } }, height: { control: { type: 'range', min: 4, max: 16 } }, track: { control: 'color' }, fill: { control: 'color' } },
  args: { value: 0.6 },
} satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const OnGreen: Story = { render: (a) => <TopBar><ProgressBar {...a} /></TopBar> };
export const WithExtra: Story = { args: { value: 0.4, extra: 0.25 }, render: (a) => <TopBar><ProgressBar {...a} /></TopBar> };
export const OnMint: Story = { args: { track: '#e3f2ec', fill: '#0b5d4b' } };
