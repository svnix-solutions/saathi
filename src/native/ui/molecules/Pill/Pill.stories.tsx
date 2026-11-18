import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Pill, Grid } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Pill',
  component: Pill,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { sel: { control: 'boolean' }, s: { control: 'boolean' }, disabled: { control: 'boolean' }, onPress: { action: 'press' } },
  args: { children: '1 hr' },
} satisfies Meta<typeof Pill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { sel: true } };
export const Disabled: Story = { args: { disabled: true } };
export const InAGrid: Story = { render: () => <Grid cols={3}><Pill>30 min</Pill><Pill sel>1 hr</Pill><Pill>1.5 hr</Pill></Grid> };
