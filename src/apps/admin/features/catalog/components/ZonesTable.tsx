import React from 'react';
import { CardHead, Pager, Table, TableCard, Tag, Toggle, type TableColumn } from '../../../ui';
import type { Zone } from '../data';

export type ZonesTableProps = {
  zones: Zone[];
  onTune: (zone: Zone) => void;
  onFlip: (zone: Zone) => void;
  /** Shown under the table (the Block D notice, the opening checklist). */
  children?: React.ReactNode;
};

/** Muted cell when the zone has no value yet. */
const muted = (v: string, empty: string) => ({ className: v === empty ? 'm' : '' });

/** "Service zones": status, partners, arrival within 15 minutes, busy-hour price, hours and the live switch. */
export function ZonesTable({ zones, onTune, onFlip, children }: ZonesTableProps) {
  const columns: TableColumn<Zone>[] = [
    { key: 'name', label: 'Zone', render: (z) => <b>{z.name}</b> },
    { key: 'status', label: 'Status', render: (z) => (z.live || z.tone === 'x' ? <Tag tone={z.tone}>{z.status}</Tag> : <Tag tone="x">Paused</Tag>) },
    { key: 'partners', label: 'Partners', render: (z) => z.partners },
    { key: 'in15', label: 'In 15 min', render: (z) => z.in15, cell: (z) => muted(z.in15, 'Not live') },
    { key: 'busy', label: 'Busy-hour price', render: (z) => z.busy, cell: (z) => muted(z.busy, 'Not set') },
    { key: 'hours', label: 'Hours', render: (z) => z.hours, cell: (z) => muted(z.hours, 'Not set') },
    { key: 'live', label: 'Live', render: (z) => <Toggle on={z.live} onChange={() => onFlip(z)} />, cell: () => ({ onClick: (e) => e.stopPropagation() }) },
  ];
  return (
    <TableCard head={<CardHead title="Service zones" right={<span className="s m">Arrival within 15 min, last 7 days · click a zone to tune</span>} />}
      footer={<><Pager text="Page 1 of 3 · 6 rows per page" />{children}</>}>
      <Table columns={columns} rows={zones} rowKey={(z) => z.name} onRowClick={(z) => onTune({ ...z })} />
    </TableCard>
  );
}

export default ZonesTable;
