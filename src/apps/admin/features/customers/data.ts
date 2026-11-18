/** Prototype sample data for the customers pages. */
import type { TagTone } from '../../ui';

export type CustomerType = 'Plan' | 'Regular' | 'New' | 'Inactive';
export type Customer = {
  id: string; face: string; name: string; area: string; visits: number; spent: number; wallet: number; last: string; type: CustomerType;
  since: string; mobile: string; rating: number; points: number;
};

export const customers: Customer[] = [
  { id: 'nk', face: 'nk', name: 'Nitin K.', area: 'Block C', visits: 9, spent: 1738, wallet: 240, last: 'Today', type: 'Plan', since: 'Oct 2026', mobile: '98765 43210', rating: 4.6, points: 320 },
  { id: 'ms', face: 'ms', name: 'Meera S.', area: 'Block A', visits: 3, spent: 832, wallet: 0, last: 'Today', type: 'Regular', since: 'Oct 2026', mobile: '98110 22841', rating: 4.3, points: 90 },
  { id: 'fa', face: 'fa', name: 'Farah A.', area: 'Sector 18', visits: 14, spent: 3204, wallet: 100, last: 'Today', type: 'Plan', since: 'Sep 2026', mobile: '99582 10377', rating: 4.9, points: 540 },
  { id: 'ap', face: 'ap', name: 'Arjun P.', area: 'Sector 21', visits: 1, spent: 79, wallet: 0, last: 'Today', type: 'New', since: 'Nov 2026', mobile: '98990 61204', rating: 3, points: 10 },
  { id: 'pn', face: 'pn', name: 'Priya N.', area: 'Sector 21', visits: 6, spent: 1106, wallet: 50, last: '12 Nov', type: 'Regular', since: 'Oct 2026', mobile: '97170 44012', rating: 4.4, points: 210 },
  { id: 'st', face: 'st', name: 'Sameer T.', area: 'Block C', visits: 2, spent: 474, wallet: 0, last: '8 Oct', type: 'Inactive', since: 'Sep 2026', mobile: '98183 90551', rating: 2.5, points: 40 },
  { id: 'rg', face: 'rg', name: 'Rohan G.', area: 'Block D', visits: 4, spent: 916, wallet: 0, last: '13 Nov', type: 'Regular', since: 'Oct 2026', mobile: '98710 33620', rating: 3.8, points: 120 },
  { id: 'rv', face: 'rv', name: 'Ravi V.', area: 'Sector 18', visits: 1, spent: 158, wallet: 0, last: 'Yesterday', type: 'New', since: 'Nov 2026', mobile: '99100 72311', rating: 5, points: 10 },
  { id: 'ak', face: 'ak', name: 'Aisha K.', area: 'Block A', visits: 11, spent: 2420, wallet: 80, last: '14 Nov', type: 'Plan', since: 'Sep 2026', mobile: '98112 50908', rating: 4.7, points: 430 },
  { id: 'kd', face: 'kd', name: 'Kunal D.', area: 'Sector 21', visits: 3, spent: 553, wallet: 0, last: '2 Oct', type: 'Inactive', since: 'Aug 2026', mobile: '97111 20480', rating: 4.0, points: 70 },
];

/** Tag colour per customer type. */
export const typeTone: Record<CustomerType, TagTone> = { Plan: 'g', Regular: 'n', New: 'y', Inactive: 'x' };

/** Id of the customer with this display name ("Nitin K."), if there is one. */
export const customerIdByName = (name: string) => customers.find((c) => c.name === name)?.id;

/* ---------------- customers list ---------------- */

export const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const bookingsPerDay = [101, 95, 108, 116, 121, 141, 130];
export const bookingsByService = [
  { label: 'General cleaning', pct: 38 },
  { label: 'Dishes & meal prep', pct: 24 },
  { label: 'Kitchen & bath scrub', pct: 17 },
  { label: 'Laundry & organizing', pct: 12 },
  { label: 'Hourly custom help', pct: 9 },
];

/* ---------------- one customer ---------------- */

export type Visit = { id: string; date: string; service: string; partner: string; rated: string; amount: number; refunded?: boolean };
export type MoneyEvent = { title: string; sub: string };

export const nitinVisits: Visit[] = [
  { id: '2041', date: 'Today', service: 'General · 1 hr', partner: 'Sunita D.', rated: '4 / 5', amount: 237 },
  { id: '2012', date: '14 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
  { id: '1987', date: '13 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
  { id: '1960', date: '12 Nov', service: 'Laundry · 1.5 hr', partner: 'Rekha M.', rated: '4 / 5', amount: 267 },
  { id: '1933', date: '11 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: 'Not rated', amount: 158 },
  { id: '1904', date: '10 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
];

/** Visits shown for a customer: Nitin's real list, or a made-up one as long as their visit count. */
export const visitsOf = (c: Customer): Visit[] => c.id === 'nk' ? nitinVisits
  : nitinVisits.slice(0, Math.min(6, c.visits)).map((v, i) => ({ ...v, id: String(2040 - i * 23), date: i === 0 ? c.last : v.date }));

/** Wallet and reward history shown in "Money and problems". */
export const moneyOf = (c: Customer): MoneyEvent[] => c.id === 'nk'
  ? [{ title: 'Refund ₹79 to wallet', sub: 'Visit #2031 ended early · today' }, { title: 'Referral reward ₹100', sub: 'Meera S. joined · 12 Nov' }]
  : [{ title: 'Welcome offer FIRST50', sub: `First visit · ${c.since}` }];

export const creditReasons = ['Goodwill', 'Late arrival', 'Referral reward', 'Other'];
export const refundReasons = ['Visit not up to the mark', 'Came late', 'Ended early', 'Charged twice'];
