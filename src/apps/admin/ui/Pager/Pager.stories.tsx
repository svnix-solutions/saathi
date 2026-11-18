import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Pager } from './Pager';
import { withAdmin } from '../storyDecorator';

/** Table footer with page numbers. */
const meta: Meta<typeof Pager> = {
  title: 'Components/Admin/Pager',
  component: Pager,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { text: 'Page 1 of 3 · 7 rows per page' },
  argTypes: { text: { control: 'text' } },
  render: (a) => <div className="card" style={{ width: 600 }}><Pager {...a} /></div>,
};
export default meta;
export const Default: StoryObj<typeof Pager> = {};
