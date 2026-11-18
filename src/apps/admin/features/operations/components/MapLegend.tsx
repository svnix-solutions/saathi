import React from 'react';

const ITEMS = [
  { tone: '', label: 'On a job' },
  { tone: 'ops-dot-travel', label: 'Travelling' },
  { tone: 'ops-dot-look', label: 'Needs a look' },
];

/** Colour key under the live map. */
export const MapLegend = () => (
  <div className="lft s ops-legend">
    {ITEMS.map((it) => (
      <span key={it.label} className="lft ops-legend-item"><span className={`ops-legend-dot ${it.tone}`} />{it.label}</span>
    ))}
  </div>
);
