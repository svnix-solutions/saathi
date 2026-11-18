import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = { title: 'Customer app/V2/16 Language, gifting, support and society', parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="language" caption="48 · Language and display" sub="Three languages, text size, dark mode" />
      <CustomerApp initial="gift" caption="49 · Gift a visit" sub="Pay now, they choose the time" />
      <CustomerApp initial="supportChat" caption="50 · Support chat" sub="Fixes common problems itself, hands over to a person" />
      <CustomerApp initial="society" caption="51 · My society" sub="Group offer, shared slots, neighbours' favourites" />
    </PhoneRow>
  ),
};

export const Language: S = { name: '48 · Language and display', render: () => <CustomerApp initial="language" /> };
export const Gift: S = { name: '49 · Gift a visit', render: () => <CustomerApp initial="gift" /> };
export const SupportChat: S = { name: '50 · Support chat', render: () => <CustomerApp initial="supportChat" /> };
export const Society: S = { name: '51 · My society', render: () => <CustomerApp initial="society" /> };
export const LanguageHindi: S = { name: '48 · Language and display (हिन्दी, large)', render: () => <CustomerApp initial="language" state={{ language: 'hi', textScale: 1.22 }} /> };
