import { useState } from 'react';
import { useAdmin } from '../../../session';
import { inr, setPayouts, useStore, type Payout, type PayoutStatus } from '../../../fixtures';
import { dueThisMonday } from '../data';

export type PayoutFilter = 'all' | 'toApprove' | 'hold';

const totalOf = (p: Payout) => p.earnings + p.tips;

/** Partner payouts: filter, row selection, bulk approve / hold / mark paid, and paying every approved payout. */
export function usePayouts() {
  const { toast } = useAdmin();
  const payouts = useStore((s) => s.payouts);
  const [filter, setFilterState] = useState<PayoutFilter>('all');
  const [picked, setPicked] = useState<string[]>([]);

  const rows = payouts.filter((p) => (filter === 'all' ? true : p.status === filter));
  const unpaidSample = payouts.filter((p) => p.status !== 'paid').reduce((a, p) => a + totalOf(p), 0);
  const approved = payouts.filter((p) => p.status === 'approved');
  const pickedTotal = picked.reduce((a, id) => a + totalOf(payouts.find((x) => x.id === id)!), 0);

  const setStatus = (ids: string[], st: PayoutStatus) => setPayouts((ps) => ps.map((p) => (ids.includes(p.id) ? { ...p, status: st } : p)));
  /** Applies a status to the picked rows and says so. */
  const act = (st: PayoutStatus, msg: string) => { setStatus(picked, st); toast(`${picked.length} ${picked.length === 1 ? 'payout' : 'payouts'} ${msg}`); setPicked([]); };

  const setFilter = (k: PayoutFilter) => { setFilterState(k); setPicked([]); };
  const toggle = (p: Payout) => {
    const on = picked.includes(p.id);
    if (p.status === 'paid') toast(`${p.name} was paid on Monday 9 Nov`);
    else setPicked(on ? picked.filter((x) => x !== p.id) : [...picked, p.id]);
  };
  const pickAll = (v: boolean) => setPicked(v ? rows.filter((r) => r.status !== 'paid').map((r) => r.id) : []);
  const payApproved = () => {
    const ids = approved.map((p) => p.id);
    setStatus(ids, 'paid'); setPicked([]);
    toast(`${ids.length} payouts sent by UPI · partners get an SMS`);
  };

  return {
    payouts, rows, filter, setFilter, picked, pickedTotal, toggle, pickAll,
    approve: () => act('approved', 'approved'),
    hold: () => act('hold', 'put on hold'),
    markPaid: () => act('paid', `marked paid · ${inr(pickedTotal)}`),
    due: dueThisMonday(unpaidSample),
    approvedCount: approved.length, approvedTotal: approved.reduce((a, p) => a + totalOf(p), 0), payApproved,
    countOf: (st: PayoutStatus) => payouts.filter((p) => p.status === st).length,
  };
}
