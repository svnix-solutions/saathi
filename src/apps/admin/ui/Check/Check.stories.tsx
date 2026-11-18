import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Check } from './Check';
import { withAdmin } from '../storyDecorator';

/** Checkbox used in tables, permission grids and sign-in ("Remember this computer"). */
const meta: Meta<typeof Check> = {
  title: 'Components/Admin/Check',
  component: Check,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { on: true },
  argTypes: { on: { control: 'boolean' } },
};
export default meta;
type S = StoryObj<typeof Check>;

export const On: S = {};
export const Off: S = { args: { on: false } };
export const Interactive: S = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return <label className="lft"><Check on={on} onChange={setOn} />Remember this computer</label>;
  },
};
