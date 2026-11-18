import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { withAdmin } from '../storyDecorator';

const variants: ButtonVariant[] = ['primary', 'outline', 'accent', 'danger', 'danger-outline'];
const sizes: ButtonSize[] = ['xs', 'sm', 'compact', 'md', 'lg'];

/** Buttons for page headers, cards and modals. Pick a `variant` for meaning and a `size` for where it sits. */
const meta: Meta<typeof Button> = {
  title: 'Components/Admin/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { children: 'Approve', variant: 'primary', size: 'md', disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: sizes },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Primary: S = {};
export const Outline: S = { args: { variant: 'outline', children: 'Download report' } };
export const Danger: S = { args: { variant: 'danger', children: 'Suspend' } };
export const DangerOutline: S = { args: { variant: 'danger-outline', children: 'Switch off' } };
export const Disabled: S = { args: { disabled: true } };
export const Matrix: S = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {sizes.map((s) => (
        <div key={s} className="lft"><span className="s m" style={{ width: 60 }}>{s}</span>
          {variants.map((v) => <Button key={v} variant={v} size={s}>{v}</Button>)}
        </div>
      ))}
    </div>
  ),
};
