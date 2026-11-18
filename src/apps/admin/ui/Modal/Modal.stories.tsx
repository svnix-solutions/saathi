import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { withAdmin } from '../storyDecorator';

/** Dialog for confirmations and short forms. */
const meta: Meta<typeof Modal> = {
  title: 'Components/Admin/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [withAdmin],
  parameters: { layout: 'fullscreen' },
  args: { open: true, title: 'Suspend Geeta K.?', onClose: () => {} },
  argTypes: { open: { control: 'boolean' }, title: { control: 'text' } },
  render: (a) => (
    <div style={{ height: 420 }}>
      <Modal {...a} actions={<><Button variant="outline">Cancel</Button><Button variant="danger">Suspend</Button></>}>
        <div className="m">She will not get new bookings until you switch her back on.</div>
      </Modal>
    </div>
  ),
};
export default meta;
type S = StoryObj<typeof Modal>;

export const Confirm: S = {};
export const WithForm: S = {
  render: function Render(a) {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ height: 420 }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal {...a} title="New offer code" open={open} onClose={() => setOpen(false)}
          actions={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Create code</Button></>}>
          <Field label="Code"><input className="inp" placeholder="DIWALI50" /></Field>
        </Modal>
      </div>
    );
  },
};
