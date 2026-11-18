import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { Table, type TableColumn } from './Table';
import { TableCard } from './TableCard';
import { Pager } from '../Pager/Pager';
import { StatusTag, type BookingStatus } from '../StatusTag/StatusTag';
import { Tabs } from '../Tabs/Tabs';
import { withAdmin } from '../storyDecorator';

type Row = { id: string; customer: string; service: string; partner?: string; status: BookingStatus; waitMin?: number };
const rows: Row[] = [
  { id: '2042', customer: 'Meera S.', service: 'Kitchen & bath · 2 hr', status: 'searching', waitMin: 4 },
  { id: '2041', customer: 'Nitin K.', service: 'General · 1 hr', partner: 'Sunita D.', status: 'progress' },
  { id: '2043', customer: 'Arjun P.', service: 'Dishes · 30 min', partner: 'Rekha M.', status: 'way' },
];
const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', render: (r) => `#${r.id}` },
  { key: 'customer', label: 'Customer', render: (r) => r.customer },
  { key: 'service', label: 'Service', render: (r) => r.service },
  { key: 'partner', label: 'Partner', render: (r) => r.partner ?? 'Not assigned', cell: (r) => (r.partner ? {} : { className: 'm' }) },
  { key: 'status', label: 'Status', render: (r) => <StatusTag kind="booking" status={r.status} waitMin={r.waitMin} /> },
];

/** List table inside its card. Rows can be clickable and selected. */
const meta: Meta<typeof Table<Row>> = {
  title: 'Components/Admin/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [withAdmin],
  args: { columns, rows, rowKey: (r: Row) => r.id, empty: 'Nothing here right now.' },
  argTypes: { empty: { control: 'text' } },
  render: (a) => <div className="win" style={{ margin: 0, height: 'auto', width: 760, padding: 16, background: 'var(--bg)' }}><div style={{ flex: 1 }}><TableCard title="Live bookings" footer={<Pager />}><Table {...a} /></TableCard></div></div>,
};
export default meta;
type S = StoryObj<typeof Table<Row>>;

export const Default: S = {};
export const Empty: S = { args: { rows: [] } };
export const Selectable: S = {
  render: function Render(a) {
    const [sel, setSel] = useState('2041');
    const [f, setF] = useState<'all' | 'now'>('all');
    return (
      <div style={{ width: 760 }}>
        <TableCard title="Live bookings" right={<Tabs value={f} onChange={setF} items={[{ key: 'all', label: 'All' }, { key: 'now', label: 'Now' }]} />} footer={<Pager text="3 rows" />}>
          <Table {...a} onRowClick={(r) => setSel(r.id)} selected={(r) => r.id === sel} />
        </TableCard>
      </div>
    );
  },
};
