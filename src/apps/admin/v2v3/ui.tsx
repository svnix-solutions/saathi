/** Small helpers shared by the v2/v3 admin pages (kept local to this area). */
import React from 'react';
import './local.css';

/** The design's `<span class="btn ..." style="padding:...">`, as a real button. */
export function Btn({ o, red, sm, style, onClick, children, disabled }: {
  o?: boolean; red?: boolean; sm?: boolean; style?: React.CSSProperties; onClick?: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  const base: React.CSSProperties = sm ? { padding: o ? '6px 12px' : '7px 12px', fontSize: 12 } : { padding: o ? '9px 16px' : '10px 16px' };
  const danger: React.CSSProperties = red ? (o ? { color: 'var(--red)', borderColor: 'var(--red)' } : { background: 'var(--red)' }) : {};
  return (
    <button type="button" className={`btn ${o ? 'o' : ''} ${disabled ? 'dis' : ''}`} style={{ ...base, ...danger, ...style }}
      onClick={() => !disabled && onClick?.()} aria-disabled={disabled}>{children}</button>
  );
}

/** Thin progress bar row used in "Bookings by service" / "Why ratings were low". */
export const BarRow = ({ label, value, pct }: { label: string; value: React.ReactNode; pct: number }) => (
  <div>
    <div className="row"><span>{label}</span><b>{value}</b></div>
    <div style={{ height: 7, borderRadius: 4, background: 'var(--mint)' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: 'var(--green)' }} /></div>
  </div>
);

/** Vertical bars ("Bookings per day", forecast, earnings). */
export function Columns({ bars, height, gap = 12, onPick, picked, flex }: {
  bars: { h: number; color?: string; title?: string }[]; height?: number; gap?: number; onPick?: (i: number) => void; picked?: number; flex?: boolean;
}) {
  return (
    <div className="barc" style={{ display: 'flex', alignItems: 'flex-end', gap, ...(flex ? { flex: 1, minHeight: 120 } : { height }), marginTop: 12 }}>
      {bars.map((b, i) => (
        <span key={i} title={b.title} onClick={() => onPick?.(i)}
          style={{ flex: 1, height: `${b.h}%`, background: b.color ?? 'var(--mint)', borderRadius: 5, outline: picked === i ? '2px solid var(--ink)' : undefined }} />
      ))}
    </div>
  );
}

/** Label + toggle row used in settings cards. */
export const TogRow = ({ label, on, onChange }: { label: React.ReactNode; on: boolean; onChange: (v: boolean) => void }) => (
  <div className="row"><span>{label}</span>
    <span role="switch" aria-checked={on} tabIndex={0} className={`tog ${on ? '' : 'off'} clk`} onClick={() => onChange(!on)}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(!on); } }}><span /></span>
  </div>
);

/** Section card header. */
export const CardHead = ({ title, right, pad = true }: { title: React.ReactNode; right?: React.ReactNode; pad?: boolean }) => (
  <div className="row" style={pad ? { padding: '0 10px 8px' } : undefined}><span className="h2" style={{ fontSize: 15 }}>{title}</span>{right}</div>
);

/** Labelled form field for modals. */
export const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="fld"><span className="h2">{label}</span>{children}</label>
);

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
export const KPI_GRID: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 };
