import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite';
import { ThemeProvider } from '../src/native/theme';
import './preview.css';

/**
 * Global toolbar: the four launch conditions from the design
 * (dark mode, large text, Hindi, small phone) apply to every phone story.
 */
const preview: Preview = {
  globalTypes: {
    scheme: { description: 'Colour scheme', toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark mode' }], dynamicTitle: true } },
    text: { description: 'Text size', toolbar: { title: 'Text', icon: 'zoom', items: [{ value: '1', title: 'Normal text' }, { value: '1.22', title: 'Large text' }], dynamicTitle: true } },
    locale: { description: 'Language', toolbar: { title: 'Language', icon: 'globe', items: [{ value: 'en', title: 'English' }, { value: 'hi', title: 'हिन्दी' }, { value: 'pa', title: 'ਪੰਜਾਬੀ' }], dynamicTitle: true } },
    device: { description: 'Phone size', toolbar: { title: 'Phone', icon: 'mobile', items: [{ value: 'regular', title: 'Regular phone' }, { value: 'small', title: 'Small phone' }], dynamicTitle: true } },
  },
  initialGlobals: { scheme: 'light', text: '1', locale: 'en', device: 'regular' },
  decorators: [
    (Story, ctx) => (
      <ThemeProvider dark={ctx.globals.scheme === 'dark'} textScale={Number(ctx.globals.text)} locale={ctx.globals.locale} device={ctx.globals.device}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { options: { canvas: { name: 'Canvas', value: '#cfd8d4' }, page: { name: 'Page', value: '#f3f7f5' }, white: { name: 'White', value: '#ffffff' } } },
    options: {
      storySort: { order: ['Saathi', ['Introduction', 'Brand', 'Decisions'], 'Foundations', 'Customer app', 'Partner app', 'Admin panel'] },
    },
  },
  initialGlobals2: undefined,
} as Preview;
delete (preview as any).initialGlobals2;
preview.initialGlobals = { scheme: 'light', text: '1', locale: 'en', device: 'regular', backgrounds: { value: 'canvas' } };
export default preview;
