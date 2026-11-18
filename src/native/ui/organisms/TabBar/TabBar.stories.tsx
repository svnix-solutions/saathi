import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { TabBar } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  decorators: [frame],
  args: { active: 'home', tabs: [] },
} satisfies Meta<typeof TabBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Customer: Story = { render: () => { const [k, setK] = useState<'home' | 'bookings' | 'account'>('home'); return <TabBar active={k} onChange={setK} tabs={[{ key: 'home', label: 'Home', icon: 'home' }, { key: 'bookings', label: 'Bookings', icon: 'list', badge: 2 }, { key: 'account', label: 'Account', icon: 'user' }]} />; } };
