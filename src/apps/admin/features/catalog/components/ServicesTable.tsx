import React from 'react';
import { Toggle } from '../../../ui';
import { inr } from '../../../fixtures';
import { WORK } from '../data';
import type { useServices } from '../hooks/useServices';
import '../catalog.css';

export type ServicesTableProps = {
  model: ReturnType<typeof useServices>;
  onOpenProfessions: () => void;
};

/** Every service with its editable price per 30 minutes, the specialisation it needs, task count and live switch. */
export function ServicesTable({ model: m, onOpenProfessions }: ServicesTableProps) {
  return (
    <table><tbody>
      <tr><th>Service</th><th>Work</th><th>₹ / 30 min</th><th>1 hour</th><th>Needs</th><th>Tasks</th><th>Live</th></tr>
      {m.list.map((s) => {
        const shownPrice = m.edit[s.id] ?? String(s.per30);
        const hour = (Number(shownPrice) || s.per30) * 2;
        return (
          <tr key={s.id} className={s.id === m.sel.id ? 'clk cat-selected' : 'clk'} onClick={() => m.select(s.id)}>
            <td><b>{s.name}</b></td>
            <td className="m">{WORK[s.category]}</td>
            <td onClick={(e) => e.stopPropagation()}>
              <input className="inp cat-price" inputMode="numeric" aria-label={`${s.name} price per 30 minutes`}
                value={shownPrice} readOnly={!m.canPrice}
                onChange={(e) => m.typePrice(s.id, e.target.value)}
                onBlur={() => m.commitPrice(s)} onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') m.cancelPrice(s.id); }}
                onFocus={m.warnNoPricing} />
            </td>
            <td>{inr(hour)}</td>
            {/* `Tag` takes no click handler, so the specialisation keeps the raw `.tag` markup */}
            <td>{s.needs ? <span className="tag clk" title="Specialisations live on Professions & documents" onClick={(e) => { e.stopPropagation(); onOpenProfessions(); }}>{s.needs}</span> : 'No'}</td>
            <td>{s.tasks ? s.tasks.filter((t) => t.on).length : 'Customer decides'}</td>
            <td onClick={(e) => e.stopPropagation()}><Toggle on={s.live} onChange={(v) => m.setLive(s, v)} /></td>
          </tr>);
      })}
    </tbody></table>
  );
}

export default ServicesTable;
