import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Tag, tagTones } from './Tag';
import { withAdmin } from '../storyDecorator';

/** Status label. Tone carries the meaning; text says what it is. */
const meta: Meta<typeof Tag> = {
  title: 'Components/Admin/Tag',
  component: Tag,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { tone: 'y', children: 'Pending' },
  argTypes: { tone: { control: 'inline-radio', options: tagTones }, children: { control: 'text' } },
};
export default meta;
type S = StoryObj<typeof Tag>;

export const Default: S = {};
export const Tones: S = {
  render: () => (
    <div className="lft">
      <Tag>Pending</Tag><Tag tone="g">On a job</Tag><Tag tone="n">Online</Tag><Tag tone="x">Done</Tag><Tag tone="r">Suspended</Tag>
    </div>
  ),
};
