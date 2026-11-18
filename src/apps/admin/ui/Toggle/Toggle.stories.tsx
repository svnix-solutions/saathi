import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Toggle } from './Toggle';
import { TogRow } from './TogRow';
import { withAdmin } from '../storyDecorator';

/** On/off switch. `TogRow` puts it at the right of a settings line. */
const meta: Meta<typeof Toggle> = {
  title: 'Components/Admin/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { on: true },
  argTypes: { on: { control: 'boolean' } },
};
export default meta;
type S = StoryObj<typeof Toggle>;

export const On: S = {};
export const Off: S = { args: { on: false } };
export const Interactive: S = {
  render: function Render() {
    const [on, setOn] = useState(true);
    return <Toggle on={on} onChange={setOn} />;
  },
};
export const Row: S = {
  name: 'TogRow',
  render: function Render() {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return <div className="card" style={{ width: 320, display: 'grid', gap: 10 }}><TogRow label="Quiet hours 9 pm to 8 am" on={a} onChange={setA} /><TogRow label="Send on WhatsApp" on={b} onChange={setB} /></div>;
  },
};
