import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Col, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Col',
  component: Col,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { gap: { control: { type: 'range', min: 0, max: 24 } } },
  args: { gap: 6 },
  render: (a) => <Col {...a}><T b>Flat 204, Block C</T><T s m>Gate 2, tell the guard flat 204</T></Col>,
} satisfies Meta<typeof Col>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
