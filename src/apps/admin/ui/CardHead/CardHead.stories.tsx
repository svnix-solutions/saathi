import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { CardHead } from './CardHead';
import { TextLink } from '../TextLink/TextLink';
import { withAdmin } from '../storyDecorator';

/** Card title row. */
const meta: Meta<typeof CardHead> = {
  title: 'Components/Admin/CardHead',
  component: CardHead,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { title: 'Live bookings', pad: true },
  argTypes: { title: { control: 'text' }, pad: { control: 'boolean' } },
  render: (a) => <div className="card" style={{ width: 420, padding: '14px 8px 4px' }}><CardHead {...a} /></div>,
};
export default meta;
type S = StoryObj<typeof CardHead>;

export const Default: S = {};
export const WithAction: S = { args: { right: <TextLink>See all</TextLink> } };
