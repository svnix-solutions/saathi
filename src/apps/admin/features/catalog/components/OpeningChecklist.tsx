import React from 'react';
import { Check } from '../../../ui';
import type { OpeningChecks } from '../data';
import '../catalog.css';

/** "Opening Sector 34 on 1 December": the four things to finish before the zone can go live. */
export function OpeningChecklist({ checks, onChange }: { checks: OpeningChecks; onChange: (checks: OpeningChecks) => void }) {
  return (
    <div className="card cat-inset">
      <div className="h2 cat-title-gap">Opening Sector 34 on 1 December</div>
      <div className="cat-checklist s">
        <div className="lft"><Check on={checks.boundary} onChange={(v) => onChange({ ...checks, boundary: v })} />Area boundary drawn</div>
        <div className="lft"><Check on={checks.prices} onChange={(v) => onChange({ ...checks, prices: v })} />Prices set</div>
        <div className="lft"><Check on={checks.trained} onChange={(v) => onChange({ ...checks, trained: v })} />8 partners trained ({checks.trained ? '8' : '3'} so far)</div>
        <div className="lft"><Check on={checks.hub} onChange={(v) => onChange({ ...checks, hub: v })} />Pick-up hub chosen</div>
      </div>
    </div>
  );
}

export default OpeningChecklist;
