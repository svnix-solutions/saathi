import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Field } from './Field';
import { withAdmin } from '../storyDecorator';

/** Label + control. */
const meta: Meta<typeof Field> = {
  title: 'Components/Admin/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { label: 'Reason' },
  argTypes: { label: { control: 'text' } },
  render: (a) => <div style={{ width: 360 }}><Field {...a}><input className="inp" placeholder="Tell the partner why" /></Field></div>,
};
export default meta;
type S = StoryObj<typeof Field>;

export const Input: S = {};
export const Select: S = {
  render: (a) => <div style={{ width: 360 }}><Field {...a} label="Zone"><select className="inp"><option>All zones</option><option>Block C</option></select></Field></div>,
};
