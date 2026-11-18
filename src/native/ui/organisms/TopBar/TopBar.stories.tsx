import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { TopBar, Row } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  decorators: [frame],
  args: { children: null },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TopBar>
      <TopBar.Label>Training</TopBar.Label>
      <TopBar.Title>Lesson 3 of 5</TopBar.Title>
      <TopBar.Text dim>About 4 minutes</TopBar.Text>
      <TopBar.Progress value={0.6} />
    </TopBar>
  ),
};
export const Earnings: Story = {
  render: () => (
    <TopBar>
      <Row><TopBar.Heading>This week</TopBar.Heading><TopBar.Text b>Mon–Sun</TopBar.Text></Row>
      <TopBar.Title size={28}>₹2,140</TopBar.Title>
    </TopBar>
  ),
};
