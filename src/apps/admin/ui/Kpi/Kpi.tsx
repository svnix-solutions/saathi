import React from 'react';

export type KpiTone = 'default' | 'alert';

export type KpiProps = {
  /** Small grey line above the number. */
  label: string;
  /** The big number. */
  value: React.ReactNode;
  /** Grey text after the number ("of 52 · 3 signing up"). */
  sub?: string;
  /** `alert` = red border and red label (something needs action). */
  tone?: KpiTone;
  /** Same as `tone="alert"` (kept for the original shell API). */
  red?: boolean;
  /** Optional sparkline: values from 0 to 1, left to right. */
  spark?: number[];
  /** Makes the card clickable. */
  onClick?: () => void;
};

/** KPI card: label, big number, optional sub-text and sparkline. */
export function Kpi({ label, value, sub, tone, red: redProp, spark, onClick }: KpiProps) {
  const red = redProp || tone === 'alert';
  const pts = spark?.map((v, i) => `${(i / (spark.length - 1)) * 64},${26 - v * 24}`).join(' ');
  return (
    <div className={`card kpi ${onClick ? 'clk' : ''}`} style={red ? { borderColor: 'var(--red)' } : undefined} onClick={onClick}>
      <div className={red ? '' : 'm'} style={red ? { color: 'var(--red)', fontWeight: 600 } : undefined}>{label}</div>
      <div className="stat">{value} {sub && <span className="m" style={{ fontSize: 13, fontWeight: 400 }}>{sub}</span>}</div>
      {pts && <svg className="spark" viewBox="0 0 64 26"><polyline points={pts} /></svg>}
    </div>
  );
}
