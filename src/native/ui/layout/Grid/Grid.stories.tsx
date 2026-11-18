import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Grid, Pill } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { cols: { control: { type: 'range', min: 1, max: 4 } }, gap: { control: { type: 'range', min: 0, max: 20 } } },
  args: { cols: 3, children: null },
  render: (a) => <Grid {...a}>{['30 min', '1 hr', '1.5 hr', '2 hr', '2.5 hr'].map((l, i) => <Pill key={l} sel={i === 1}>{l}</Pill>)}</Grid>,
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
