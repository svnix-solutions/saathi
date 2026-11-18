import { useMemo, useState } from 'react';
import { decisions } from '@/domain';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { advanceMatches, initialAdvances, type AdvanceFilter } from '../data';
import { assessAdvance } from '../advanceRules';

/** Pay advances: the filtered list, the request in view with its limit check, approving and refusing. */
export function useAdvances() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initialAdvances);
  const [filter, setFilterState] = useState<AdvanceFilter>('requests');
  const [sel, setSel] = useState('sd');
  const [out, setOut] = useState(18500);

  const cur = list.find((a) => a.id === sel) ?? list[0];
  const rows = useMemo(() => list.filter((a) => advanceMatches(a, filter)), [list, filter]);
  const requests = list.filter((a) => a.status === 'To approve').length;
  const repaying = 7 + list.filter((a) => a.status === 'Repaying').length;
  const check = assessAdvance(cur);

  /** Shows another tab and opens its first advance. */
  const setFilter = (k: AdvanceFilter) => { setFilterState(k); const first = list.find((a) => advanceMatches(a, k)); if (first) setSel(first.id); };

  const approve = () => {
    setList((l) => l.map((a) => a.id === cur.id ? { ...a, status: 'Repaying', owes: a.owes + a.asked } : a)); setOut((o) => o + cur.asked);
    toast(`${inr(cur.asked)} sent to ${cur.name}. ${inr(check.perWeek)} comes back from each ${decisions.partner.payoutDay} payout.`);
    const next = list.find((a) => a.id !== cur.id && a.status === 'To approve'); if (next) setSel(next.id);
  };
  /** Refuses the advance in view; returns false (and asks for one) when the reason is empty. */
  const refuse = (reason: string) => {
    if (!reason.trim()) { toast('Write the reason the partner will see'); return false; }
    setList((l) => l.map((a) => a.id === cur.id ? { ...a, status: 'Refused' } : a));
    toast(`Refused. ${cur.name} has been told why.`);
    return true;
  };

  return { rows, cur, check, filter, setFilter, select: setSel, requests, repaying, out, approve, refuse };
}
