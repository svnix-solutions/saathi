import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { ChipGroup } from './ChipGroup';
import { Phone } from '../../device/Phone/Phone';
import { Screen } from '../../layout/Screen/Screen';

const items = [{ key: 'cleaning', label: 'Cleaning' }, { key: 'nursing', label: 'Nursing' }, { key: 'repair', label: 'Repair' }, { key: 'barber', label: 'Barber' }];

const meta: Meta<typeof ChipGroup> = {
  title: 'Components/Native/Molecules/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
};
export default meta;
type S = StoryObj<typeof ChipGroup>;

function Demo(props: { device?: 'regular' | 'small'; textScale?: number }) {
  const [v, setV] = useState('cleaning');
  return <Phone {...props}><Screen><ChipGroup items={items} value={v} onChange={setV} /></Screen></Phone>;
}

export const Default: S = { render: () => <Demo /> };
/** On a small phone with large text the row scrolls instead of clipping. */
export const SmallPhoneLargeText: S = { render: () => <Demo device="small" textScale={1.22} /> };
