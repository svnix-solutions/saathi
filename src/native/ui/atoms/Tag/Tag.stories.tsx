import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Tag, Row } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { tone: { control: 'select', options: ["y", "g", "n", "x", "r", "yellow", "green", "mint", "grey", "red"] } },
  args: { children: 'On the way', tone: 'y' },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  render: () => <Row style={{ justifyContent: 'flex-start' }}><Tag>On the way</Tag><Tag tone="g">Paid</Tag><Tag tone="n">Plan</Tag><Tag tone="x">Done</Tag><Tag tone="r">Late</Tag></Row>,
};
