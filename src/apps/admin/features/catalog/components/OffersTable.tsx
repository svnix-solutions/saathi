import React from 'react';
import { Pager, Table, TableCard, Toggle, type TableColumn } from '../../../ui';
import { inr } from '../../../fixtures';
import type { OfferCode } from '../data';
import { offerText } from '../offerText';

export type OffersTableProps = {
  codes: OfferCode[];
  selected: string;
  onPick: (code: OfferCode) => void;
  onLiveChange: (code: string, live: boolean) => void;
};

/** Every offer code with its offer, audience, end date, use and live switch. */
export function OffersTable({ codes, selected, onPick, onLiveChange }: OffersTableProps) {
  const columns: TableColumn<OfferCode>[] = [
    { key: 'code', label: 'Code', render: (c) => <b>{c.code}</b> },
    { key: 'offer', label: 'Offer', render: (c) => offerText(c) },
    { key: 'for', label: 'For', render: (c) => c.forWho },
    { key: 'until', label: 'Valid until', render: (c) => c.until },
    { key: 'used', label: 'Used', render: (c) => c.used },
    { key: 'given', label: 'Given away', render: (c) => inr(c.given) },
    { key: 'live', label: 'Live', render: (c) => <Toggle on={c.live} onChange={(v) => onLiveChange(c.code, v)} />, cell: () => ({ onClick: (e) => e.stopPropagation() }) },
  ];
  return (
    // one page only, so the footer has no page arrows (not `Pager`)
    <TableCard footer={<Pager pages={1} text={`Page 1 of 1 · ${codes.length} rows per page`} />}>
      <Table columns={columns} rows={codes} rowKey={(c) => c.code} onRowClick={onPick} selected={(c) => c.code === selected} />
    </TableCard>
  );
}

export default OffersTable;
