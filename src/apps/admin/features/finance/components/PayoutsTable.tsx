import React from 'react';
import { Av, Button, CardHead, Check, Pager, StatusTag, TableCard, Tabs } from '../../../ui';
import { inr, type Payout } from '../../../fixtures';
import type { usePayouts } from '../hooks/usePayouts';
import '../finance.css';

/** "Partner payouts": filter tabs, a bar of bulk actions while rows are picked, and the payout rows. */
export function PayoutsTable({ model: m }: { model: ReturnType<typeof usePayouts> }) {
  const allPicked = m.rows.length > 0 && m.rows.every((r) => m.picked.includes(r.id));
  return (
    <TableCard footer={<Pager text="Page 1 of 3 · 6 rows per page" />}
      head={<CardHead title="Partner payouts" right={<Tabs value={m.filter} onChange={m.setFilter} items={[
        { key: 'all', label: 'All 52' },
        { key: 'toApprove', label: `To approve ${m.countOf('toApprove')}` },
        { key: 'hold', label: `On hold ${m.countOf('hold')}` }]} />} />}>
      {m.picked.length > 0 && (
        <div className="card sel row fin-bulk-bar">
          <span><b>{m.picked.length} selected</b> · {inr(m.pickedTotal)}</span>
          <span className="lft fin-bulk-actions">
            <Button size="xs" variant="outline" onClick={m.approve}>Approve</Button>
            <Button size="xs" variant="outline" onClick={m.hold}>Hold</Button>
            <Button size="xs" variant="primary" onClick={m.markPaid}>Mark paid</Button>
          </span>
        </div>
      )}
      <table>
        <thead><tr><th className="fin-check-col"><Check on={allPicked} onChange={m.pickAll} /></th>
          <th>Partner</th><th>Jobs</th><th>Earnings</th><th>Tips</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {m.rows.map((p: Payout) => {
            const on = m.picked.includes(p.id);
            return (
              <tr key={p.id} className={on ? 'clk fin-picked' : 'clk'} onClick={() => m.toggle(p)}>
                <td onClick={(e) => e.stopPropagation()}><Check on={on} onChange={() => m.toggle(p)} /></td>
                <td><span className="lft"><Av sm face={p.face} /><b>{p.name}</b></span></td>
                <td>{p.jobs}</td><td>{inr(p.earnings)}</td><td>{inr(p.tips)}</td><td><b>{inr(p.earnings + p.tips)}</b></td>
                <td><StatusTag kind="payout" status={p.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableCard>
  );
}

export default PayoutsTable;
