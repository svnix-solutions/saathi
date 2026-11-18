import React from 'react';
import { Pager, Tag, TableCard } from '../../../ui';
import { inr } from '../../../fixtures';
import { claimLabel, claimTone, type Claim } from '../data';

/** Claims list; the selected claim is highlighted and shown on the right. */
export function ClaimsTable({ rows, current, onPick }: { rows: Claim[]; current: string; onPick: (c: Claim) => void }) {
  return (
    <TableCard footer={<Pager text="Page 1 of 2 · 5 rows per page" />}>
      <table>
        <thead><tr><th>Visit</th><th>Customer</th><th>What was damaged</th><th>Claimed</th><th>Reported</th><th>Status</th></tr></thead>
        <tbody>{rows.map((c) => (
          <tr key={c.id} className={`clk ${c.id === current ? 'on' : ''}`} onClick={() => onPick(c)}>
            <td>#{c.id}</td><td>{c.customer}</td><td>{c.what}</td><td>{inr(c.claimed)}</td><td>{c.reported}</td><td><Tag tone={claimTone(c)}>{claimLabel(c)}</Tag></td></tr>))}
          {/* not `Table`'s `empty` row: this one is left-aligned with the normal cell padding */}
          {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
        </tbody>
      </table>
    </TableCard>
  );
}

export default ClaimsTable;
