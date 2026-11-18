import React from 'react';
import { Table, TableCard, TextLink, Toggle, type TableColumn } from '../../../ui';
import { OFFER_CODES, type OfferCodeId } from '../data';
import '../finance.css';

type Row = (typeof OFFER_CODES)[number];

export type OfferCodesCardProps = {
  live: Record<OfferCodeId, boolean>;
  onLiveChange: (code: OfferCodeId, live: boolean) => void;
  onNew: () => void;
};

/** Short list of offer codes with a live switch each; "New code" opens the offer codes page. */
export function OfferCodesCard({ live, onLiveChange, onNew }: OfferCodesCardProps) {
  const columns: TableColumn<Row>[] = [
    { key: 'code', label: 'Code', render: ([c]) => <b>{c}</b> },
    { key: 'offer', label: 'Offer', render: ([, o]) => o },
    { key: 'used', label: 'Used', render: ([, , u]) => u },
    { key: 'live', label: 'Live', render: ([c]) => <Toggle on={live[c]} onChange={(v) => onLiveChange(c, v)} /> },
  ];
  return (
    <TableCard head={<div className="row fin-table-head"><span className="h2 fin-title">Offer codes</span><TextLink onClick={onNew}>New code</TextLink></div>}>
      <Table columns={columns} rows={[...OFFER_CODES]} rowKey={([c]) => c} />
    </TableCard>
  );
}

export default OfferCodesCard;
