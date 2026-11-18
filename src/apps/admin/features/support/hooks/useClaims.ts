import { useMemo, useState } from 'react';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { COVER, COVER_PLUS, claimMatches, claimOpen, initialClaims, type Claim, type ClaimFilter } from '../data';

/** Damage claims: the filtered list, the claim being decided, and paying (within the cover) or rejecting it. */
export function useClaims() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initialClaims);
  const [filter, setFilterState] = useState<ClaimFilter>('decide');
  const [sel, setSel] = useState('2041');
  const cur = list.find((c) => c.id === sel) ?? list[0];
  const [amount, setAmountState] = useState(String(cur.claimed));
  const [to, setTo] = useState<'wallet' | 'bank'>('wallet');

  const counts = { decide: list.filter(claimOpen).length, approved: 4 + list.filter((c) => c.status === 'Paid').length, rejected: list.filter((c) => c.status === 'Rejected').length };
  const rows = useMemo(() => list.filter((c) => claimMatches(c, filter)), [list, filter]);
  const pick = (c: Claim) => { setSel(c.id); setAmountState(String(c.paid ?? c.claimed)); };
  const cap = cur.plus ? COVER_PLUS : COVER;
  const n = parseInt(amount, 10) || 0;
  const decided = !claimOpen(cur);

  /** Shows another tab and opens its first claim. */
  const setFilter = (k: ClaimFilter) => { setFilterState(k); const first = list.find((c) => claimMatches(c, k)); if (first) pick(first); };

  const approve = () => {
    if (!n) return toast('Enter the amount to pay');
    if (n > cap) return toast(`Cover is up to ${inr(cap)} per visit`);
    setList((l) => l.map((c) => c.id === cur.id ? { ...c, status: 'Paid', paid: n } : c));
    toast(`${inr(n)} paid to ${cur.customer.split(' ')[0]}'s ${to === 'wallet' ? 'wallet' : 'bank account'}`);
    const next = list.find((c) => c.id !== cur.id && claimOpen(c)); if (next) pick(next);
  };
  /** Rejects the open claim; returns false (and asks for one) when the reason is empty. */
  const reject = (reason: string) => {
    if (!reason.trim()) { toast('Write the reason the customer will see'); return false; }
    setList((l) => l.map((c) => c.id === cur.id ? { ...c, status: 'Rejected', reason: reason.trim() } : c));
    toast(`Claim #${cur.id} rejected. ${cur.customer} has been told why.`);
    return true;
  };

  return {
    rows, cur, counts, filter, setFilter, pick, cap, amount, setAmount: (v: string) => setAmountState(v.replace(/\D/g, '')),
    overCap: n > cap, to, setTo, decided, approve, reject,
  };
}
