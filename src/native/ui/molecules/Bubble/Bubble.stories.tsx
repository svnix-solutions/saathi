import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Bubble, Col } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/Bubble',
  component: Bubble,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { me: { control: 'boolean' } },
  args: { children: 'I am at the gate.' },
} satisfies Meta<typeof Bubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Theirs: Story = {};
export const Mine: Story = { args: { me: true, children: 'Coming down now' } };
export const Chat: Story = { render: () => <Col gap={8}><Bubble>I am at the gate.</Bubble><Bubble me>Coming down now</Bubble></Col> };
