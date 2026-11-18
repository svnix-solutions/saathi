import React from 'react';
import { Av, Pager, Tag, TableCard } from '../../../ui';
import { inr } from '../../../fixtures';
import { advanceTone, type Advance } from '../data';

/** Advances list; the advance in view is highlighted. */
export function AdvancesTable({ rows, current, onPick }: { rows: Advance[]; current: string; onPick: (id: string) => void }) {
  return (
    <TableCard footer={<Pager text="Page 1 of 3 · 5 rows per page" />}>
      <table>
        <thead><tr><th>Partner</th><th>Asked for</th><th>Pay back over</th><th>Usual week</th><th>Already owes</th><th>Status</th></tr></thead>
        <tbody>{rows.map((a) => (
          <tr key={a.id} className={`clk ${a.id === current ? 'on' : ''}`} onClick={() => onPick(a.id)}>
            <td><span className="lft"><Av sm face={a.id} /><b>{a.name}</b></span></td><td>{inr(a.asked)}</td><td>{a.weeks} weeks</td><td>{inr(a.usual)}</td><td>{inr(a.owes)}</td>
            <td><Tag tone={advanceTone[a.status]}>{a.status}</Tag></td></tr>))}
          {/* not `Table`'s `empty` row: this one is left-aligned with the normal cell padding */}
          {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
        </tbody>
      </table>
    </TableCard>
  );
}

export default AdvancesTable;
