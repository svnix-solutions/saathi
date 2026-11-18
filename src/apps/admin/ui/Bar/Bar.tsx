import React from 'react';

export type BarTone = 'default' | 'alert';

export type BarProps = {
  /** Filled share, 0 to 100. */
  pct: number;
  /** `alert` = red fill. */
  tone?: BarTone;
  /** Same as `tone="alert"` (kept for the original shell API). */
  red?: boolean;
};

/** Thin progress bar (7 px, mint track, green or red fill). */
export const Bar = ({ pct, tone, red }: BarProps) => (
  <div style={{ height: 7, borderRadius: 4, background: 'var(--mint)' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: red || tone === 'alert' ? 'var(--red)' : 'var(--green)' }} /></div>
);
