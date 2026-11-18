import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

/** The home screen under four conditions it must survive at launch. */
const meta: Meta = {
  title: 'Customer app/Design pages/V1 · Launch/08 Small phones, large text, Hindi and dark mode', tags: ['v1', 'design-page'],
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="home" caption="16 · Small phone" sub="A 4.7 inch screen: same layout, fades where it scrolls" device="small" />
      <CustomerApp initial="home" caption="17 · Large text" sub="Text set to Large: cards grow and the page scrolls" textScale={1.22} />
      <CustomerApp initial="home" caption="18 · Hindi" sub="Every label translated; prices and layout unchanged" locale="hi" />
      <CustomerApp initial="home" caption="19 · Dark mode" sub="Same brand colours on a dark ground" dark />
    </PhoneRow>
  ),
};

export const SmallPhone: S = { render: () => <CustomerApp initial="home" device="small" /> };
export const LargeText: S = { render: () => <CustomerApp initial="home" textScale={1.22} /> };
export const Hindi: S = { render: () => <CustomerApp initial="home" locale="hi" /> };
export const DarkMode: S = { render: () => <CustomerApp initial="home" dark /> };
