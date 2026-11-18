import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Row, T, Tag } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Row',
  component: Row,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { gap: { control: { type: 'range', min: 0, max: 24 } } },
  render: (a) => <Row {...a}><T b>Today · 11:10 am</T><Tag>On the way</Tag></Row>,
} satisfies Meta<typeof Row>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
