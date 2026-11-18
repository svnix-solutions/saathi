import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Page, TopBar, Screen, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Layout/Page',
  component: Page,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'inline-radio', options: ["surface", "bare"] }, bg: { control: 'color' } },
  render: (a) => <View style={{ height: 240 }}><Page {...a}><TopBar><TopBar.Title>Home</TopBar.Title></TopBar><Screen><T>Screen body</T></Screen></Page></View>,
  args: { children: null },
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
