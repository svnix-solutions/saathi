import React from 'react';

export type TableColumn<T> = {
  /** Unique key for React. */
  key: string;
  /** Header text (uppercase grey, from the stylesheet). */
  label: React.ReactNode;
  /** Cell content for one row. */
  render: (row: T) => React.ReactNode;
  /** Extra props for the `<td>` of a row (e.g. `{ className: 'm' }` for a muted "Not assigned"). */
  cell?: (row: T) => React.TdHTMLAttributes<HTMLTableCellElement>;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Makes rows clickable (`tr.clk`, hover tint). */
  onRowClick?: (row: T) => void;
  /** Highlights a row (`tr.on`, mint). */
  selected?: (row: T) => boolean;
  /** Shown in one centred muted row when `rows` is empty. */
  empty?: React.ReactNode;
};

/** Data table with the design's header style. Put it in a `<TableCard>` (or a `.card` with padding `14px 8px 4px`). */
export function Table<T>({ columns, rows, rowKey, onRowClick, selected, empty }: TableProps<T>) {
  return (
    <table>
      <thead><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr></thead>
      <tbody>
        {rows.map((r) => {
          const cls = [onRowClick ? 'clk' : '', selected?.(r) ? 'on' : ''].filter(Boolean).join(' ') || undefined;
          return (
            <tr key={rowKey(r)} className={cls} onClick={onRowClick ? () => onRowClick(r) : undefined}>
              {columns.map((c) => <td key={c.key} {...c.cell?.(r)}>{c.render(r)}</td>)}
            </tr>
          );
        })}
        {!rows.length && empty !== undefined && <tr><td colSpan={columns.length} className="m" style={{ textAlign: 'center', padding: 24 }}>{empty}</td></tr>}
      </tbody>
    </table>
  );
}
