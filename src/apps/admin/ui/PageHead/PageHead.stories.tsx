import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PageHead } from './PageHead';
import { Button } from '../Button/Button';
import { withAdmin } from '../storyDecorator';

/** The title row every page starts with. */
const meta: Meta<typeof PageHead> = {
  title: 'Components/Admin/PageHead',
  component: PageHead,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { title: 'Dashboard', sub: 'Monday 16 November · Zone: all' },
  argTypes: { title: { control: 'text' }, sub: { control: 'text' } },
  render: (a) => <div style={{ width: 800 }}><PageHead {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof PageHead>;

export const Default: S = {};
export const WithActions: S = { args: { actions: <><Button variant="outline">Download report</Button><Button>New booking</Button></> } };
export const WithBack: S = { args: { title: 'Booking #2042', sub: 'Kitchen & bath · 2 hr', back: () => {} } };
