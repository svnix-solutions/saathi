import React from 'react';

export type ColumnBar = {
  /** Height as a share of the chart, 0 to 100. */
  h: number;
  /** Fill colour (a CSS colour or `var(--…)`); mint by default. */
  color?: string;
  /** Native tooltip. */
  title?: string;
};

export type ColumnsProps = {
  bars: ColumnBar[];
  /** Fixed chart height in px (ignored when `flex`). */
  height?: number;
  /** Space between bars in px. */
  gap?: number;
  /** Called with the bar index on click. */
  onPick?: (i: number) => void;
  /** Index of the outlined (selected) bar. */
  picked?: number;
  /** Grow to fill the card (min 120 px) instead of a fixed height. */
  flex?: boolean;
};

/** Vertical bar chart ("Bookings per day", forecast, earnings). */
export function Columns({ bars, height, gap = 12, onPick, picked, flex }: ColumnsProps) {
  return (
    <div className="barc" style={{ display: 'flex', alignItems: 'flex-end', gap, ...(flex ? { flex: 1, minHeight: 120 } : { height }), marginTop: 12 }}>
      {bars.map((b, i) => (
        <span key={i} title={b.title} onClick={() => onPick?.(i)}
          style={{ flex: 1, height: `${b.h}%`, background: b.color ?? 'var(--mint)', borderRadius: 5, outline: picked === i ? '2px solid var(--ink)' : undefined }} />
      ))}
    </div>
  );
}
