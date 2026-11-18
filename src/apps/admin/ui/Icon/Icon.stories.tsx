import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { I, iconNames } from './Icon';
import { Mark } from './Mark';
import { withAdmin } from '../storyDecorator';

/** Line icons from the shared sprite. `f` fills the shape; colour follows `currentColor`. */
const meta: Meta<typeof I> = {
  title: 'Components/Admin/Icon',
  component: I,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { n: 'home', f: false },
  argTypes: { n: { control: 'select', options: iconNames }, f: { control: 'boolean' } },
};
export default meta;
type S = StoryObj<typeof I>;

export const Default: S = {};
export const Filled: S = { args: { n: 'star', f: true } };
export const All: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 80px)', gap: 12 }}>
      {iconNames.map((n) => <div key={n} style={{ display: 'grid', justifyItems: 'center', gap: 4 }}><I n={n} /><span className="s m">{n}</span></div>)}
    </div>
  ),
};
export const Logo: S = { name: 'Mark (logo)', render: () => <div className="lft"><Mark /><Mark size={48} /></div> };
