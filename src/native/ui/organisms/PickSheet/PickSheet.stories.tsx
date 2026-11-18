import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { PickSheet } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/PickSheet',
  component: PickSheet,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { cols: { control: 'inline-radio', options: [2, 3] }, title: { control: 'text' }, closeLabel: { control: 'text' } },
  args: { visible: true, title: 'How long?', value: 60, options: [30, 60, 90, 120, 150, 180].map((m) => ({ v: m, label: `${m} min` })), onPick: () => {}, onClose: () => {}, cols: 3 },
} satisfies Meta<typeof PickSheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (a) => { const [v, setV] = useState(a.value); return <View style={{ height: 300 }}><PickSheet {...a} value={v} onPick={setV} /></View>; },
};
