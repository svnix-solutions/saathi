import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Bars } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Bars',
  component: Bars,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { highlight: { control: { type: 'range', min: 0, max: 6 } }, height: { control: { type: 'range', min: 40, max: 160 } } },
  args: { values: [0.4, 0.7, 0.2, 0.9, 0.55, 0.05, 0.6], labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], highlight: 3 },
} satisfies Meta<typeof Bars>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Week: Story = {};
