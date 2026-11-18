import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Av, avatarFaces } from './Avatar';
import { withAdmin } from '../storyDecorator';

/** Person avatar: a face from the design, or initials on yellow. */
const meta: Meta<typeof Av> = {
  title: 'Components/Admin/Avatar',
  component: Av,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { face: 'sd', sm: false },
  argTypes: { face: { control: 'select', options: [undefined, ...avatarFaces] }, sm: { control: 'boolean' }, size: { control: 'number' }, initials: { control: 'text' } },
};
export default meta;
type S = StoryObj<typeof Av>;

export const Face: S = {};
export const Small: S = { args: { sm: true } };
export const Initials: S = { args: { face: undefined, initials: 'AB' } };
export const AllFaces: S = { render: () => <div className="lft" style={{ flexWrap: 'wrap', maxWidth: 520 }}>{avatarFaces.map((f) => <Av key={f} face={f} />)}</div> };
