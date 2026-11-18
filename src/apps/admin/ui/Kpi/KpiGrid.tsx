import React from 'react';

/** Inline style of the four-column KPI row (the v2/v3 pages' `KPI_GRID`). */
export const KPI_GRID: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 };

/** Four equal columns, 14 px apart: the row of `<Kpi>` cards at the top of a page. */
export const KpiGrid = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ ...KPI_GRID, ...style }}>{children}</div>
);
