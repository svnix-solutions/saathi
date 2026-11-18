import React from 'react';
import { Bar, type BarTone } from './Bar';

export type BarRowProps = {
  label: React.ReactNode;
  /** Bold value at the right of the label. */
  value: React.ReactNode;
  /** Bar fill, 0 to 100. */
  pct: number;
  tone?: BarTone;
};

/** Label and value on one line, `<Bar>` under it ("Bookings by service", "Why ratings were low"). */
export const BarRow = ({ label, value, pct, tone }: BarRowProps) => (
  <div>
    <div className="row"><span>{label}</span><b>{value}</b></div>
    <Bar pct={pct} tone={tone} />
  </div>
);
