import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Phone, Screen, H, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Device/Phone',
  component: Phone,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { dark: { control: 'boolean' }, textScale: { control: 'inline-radio', options: [1, 1.22] }, locale: { control: 'inline-radio', options: ["en", "hi", "pa"] }, device: { control: 'inline-radio', options: ["regular", "small"] }, caption: { control: 'text' }, sub: { control: 'text' } },
  args: { caption: '04 · Home', sub: 'Customer app', children: null },
  render: (a) => <Phone {...a}><Screen><H>What needs doing today?</H><T s m>Helper in 15 minutes</T></Screen></Phone>,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Phone>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dark: Story = { args: { dark: true } };
export const Small: Story = { args: { device: 'small' } };
