import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { TextLink } from './TextLink';
import { withAdmin } from '../storyDecorator';

/** Text action for card headers. */
const meta: Meta<typeof TextLink> = {
  title: 'Components/Admin/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { children: 'Widen to 3 km' },
  argTypes: { children: { control: 'text' } },
};
export default meta;
type S = StoryObj<typeof TextLink>;

export const Default: S = {};
export const InCardHeader: S = {
  render: (a) => <div className="card" style={{ width: 320 }}><div className="row"><span className="h2" style={{ fontSize: 15 }}>Nearby partners</span><TextLink {...a} /></div></div>,
};
