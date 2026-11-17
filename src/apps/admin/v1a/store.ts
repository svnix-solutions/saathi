/**
 * Sample data shared by the v1a admin pages (dashboard, bookings, assign, partners, payouts, support, ticket).
 * A tiny module store so that assigning a partner on `assign` shows up on `dashboard` and `bookings`.
 * State lives for the browser session (reload the story to reset).
 */
import { useSyncExternalStore } from 'react';

export type BookingStatus = 'searching' | 'progress' | 'way' | 'scheduled' | 'done' | 'review' | 'refunded' | 'cancelled';
export type Booking = {
  id: string; time: string; customer: string; service: string; partner?: string; area: string; paidBy: string;
  status: BookingStatus; amount: number;
  /** "Searching 4 min", "Scheduled 4 pm", "Refunded ₹79" */
  waitMin?: number; when?: string; refunded?: number; byHand?: string;
};

export type PartnerStatus = 'job' | 'online' | 'offline' | 'pending' | 'suspended';
export type Partner = {
  id: string; name: string; face: string; area: string; status: PartnerStatus; rating?: number; jobs: number;
  docs: [boolean, boolean, boolean]; joined: string;
};

export type PayoutStatus = 'approved' | 'toApprove' | 'hold' | 'paid';
export type Payout = { id: string; name: string; face: string; jobs: number; earnings: number; tips: number; status: PayoutStatus };

export type Msg = { me?: boolean; text: string; bold?: string };
export type TicketStatus = 'open' | 'answered' | 'closed' | 'passed';
export type Ticket = {
  id: string; title: string; from: 'Customer' | 'Partner'; who: string; face: string; ref: string; age: string;
  status: TicketStatus; refundAsk?: boolean; msgs: Msg[]; note?: string; refunded?: number; pendingRefund?: number;
  info: string;
};

type State = { bookings: Booking[]; partners: Partner[]; payouts: Payout[]; tickets: Ticket[] };

const initial = (): State => ({
  bookings: [
    { id: '2042', time: '11:02', customer: 'Meera S.', service: 'Kitchen & bath · 2 hr', area: 'Block A', paidBy: 'UPI', status: 'searching', waitMin: 4, amount: 516 },
    { id: '2045', time: '11:05', customer: 'Rohan G.', service: 'Custom · 3 hr', area: 'Block D', paidBy: 'UPI', status: 'searching', waitMin: 1, amount: 594 },
    { id: '2041', time: '11:00', customer: 'Nitin K.', service: 'General · 1 hr', partner: 'Sunita D.', area: 'Block C', paidBy: 'Wallet + UPI', status: 'progress', amount: 158 },
    { id: '2044', time: '10:10', customer: 'Farah A.', service: 'Laundry · 1.5 hr', partner: 'Kavita R.', area: 'Sector 18', paidBy: 'UPI', status: 'progress', amount: 267 },
    { id: '2043', time: '10:58', customer: 'Arjun P.', service: 'Dishes · 30 min', partner: 'Rekha M.', area: 'Sector 21', paidBy: 'Cash', status: 'way', amount: 79 },
    { id: '2046', time: '4:00 pm', customer: 'Priya N.', service: 'General · 1 hr', partner: 'Anita B.', area: 'Sector 21', paidBy: 'UPI', status: 'scheduled', when: '4 pm', amount: 158 },
    { id: '2047', time: '5:30 pm', customer: 'Farah A.', service: 'Laundry · 1 hr', partner: 'Kavita R.', area: 'Sector 18', paidBy: 'Plan', status: 'scheduled', when: '5:30 pm', amount: 160 },
    { id: '2040', time: '8:00', customer: 'Sameer T.', service: 'General · 2 hr', partner: 'Rekha M.', area: 'Block C', paidBy: 'UPI', status: 'done', amount: 316 },
    { id: '2038', time: '9:15', customer: 'Kiran D.', service: 'General · 1 hr', partner: 'Meena T.', area: 'Block A', paidBy: 'UPI', status: 'review', amount: 158 },
    { id: '2031', time: '7:30', customer: 'Sameer T.', service: 'General · 1 hr', partner: 'Geeta K.', area: 'Block C', paidBy: 'UPI', status: 'refunded', refunded: 79, amount: 158 },
  ],
  partners: [
    { id: 'sd', name: 'Sunita D.', face: 'sd', area: 'Block C', status: 'job', rating: 4.8, jobs: 19, docs: [true, true, true], joined: 'Oct 2026' },
    { id: 'rm', name: 'Rekha M.', face: 'rm', area: 'Sector 21', status: 'online', rating: 4.6, jobs: 22, docs: [true, true, true], joined: 'Sep 2026' },
    { id: 'kr', name: 'Kavita R.', face: 'kr', area: 'Sector 18', status: 'job', rating: 4.9, jobs: 17, docs: [true, true, true], joined: 'Sep 2026' },
    { id: 'ab', name: 'Anita B.', face: 'ab', area: 'Sector 21', status: 'offline', rating: 4.4, jobs: 11, docs: [true, true, true], joined: 'Oct 2026' },
    { id: 'pv', name: 'Pooja V.', face: 'pv', area: 'Block A', status: 'pending', jobs: 0, docs: [true, true, false], joined: 'Nov 2026' },
    { id: 'ls', name: 'Lata S.', face: 'ls', area: 'Block D', status: 'pending', jobs: 0, docs: [true, false, false], joined: 'Nov 2026' },
    { id: 'gk', name: 'Geeta K.', face: 'gk', area: 'Block C', status: 'suspended', rating: 3.1, jobs: 0, docs: [true, true, true], joined: 'Aug 2026' },
  ],
  payouts: [
    { id: 'rm', name: 'Rekha M.', face: 'rm', jobs: 22, earnings: 3190, tips: 240, status: 'approved' },
    { id: 'sd', name: 'Sunita D.', face: 'sd', jobs: 19, earnings: 2596, tips: 250, status: 'approved' },
    { id: 'kr', name: 'Kavita R.', face: 'kr', jobs: 17, earnings: 2410, tips: 180, status: 'toApprove' },
    { id: 'ab', name: 'Anita B.', face: 'ab', jobs: 11, earnings: 1474, tips: 60, status: 'toApprove' },
    { id: 'gk', name: 'Geeta K.', face: 'gk', jobs: 4, earnings: 520, tips: 0, status: 'hold' },
    { id: 'mt', name: 'Meena T.', face: 'mt', jobs: 15, earnings: 2085, tips: 110, status: 'paid' },
  ],
  tickets: [
    { id: 'T-318', title: 'Work was not finished', from: 'Customer', who: 'Sameer T.', face: 'st', ref: '#2031', age: '20 min', status: 'open', refundAsk: true,
      info: 'Customer · 2 visits · Block C',
      msgs: [
        { text: 'The helper left after 40 minutes. I paid for one hour and the balcony was not done.' },
        { bold: 'Chosen fix:', text: 'send a helper back, free' },
        { me: true, text: 'Sorry about that, Sameer. I can see the visit ended early. A helper will come back today to finish. I am arranging it now.' },
      ],
      note: 'Second early finish by this partner this week. Flagged on her quality page.' },
    { id: 'T-317', title: 'Customer not at home', from: 'Partner', who: 'Rekha M.', face: 'rm', ref: '#2038', age: '35 min', status: 'open',
      info: 'Partner · Sector 21 · 4.6 rating',
      msgs: [{ text: 'I reached the flat at 9:15 and waited 10 minutes. Nobody opened the door and the phone was off.' }] },
    { id: 'T-316', title: 'Charged wrongly', from: 'Customer', who: 'Priya N.', face: 'pn', ref: '#2019', age: '2 hr', status: 'open',
      info: 'Customer · 6 visits · Sector 21',
      msgs: [{ text: 'I booked 1 hour but I was charged for 1.5 hours. Please check.' }] },
    { id: 'T-315', title: 'Something damaged', from: 'Customer', who: 'Meera S.', face: 'ms', ref: '#2008', age: '3 hr', status: 'open',
      info: 'Customer · 3 visits · Block A',
      msgs: [{ text: 'A glass jar fell and broke while the kitchen shelf was being cleaned. It cost about ₹450.' }] },
    { id: 'T-314', title: 'Payment problem', from: 'Partner', who: 'Anita B.', face: 'ab', ref: 'payout', age: 'yesterday', status: 'answered',
      info: 'Partner · Sector 21 · 4.4 rating',
      msgs: [
        { text: 'My payout last Monday was ₹120 less than the app showed.' },
        { me: true, text: 'Thanks Anita. A cancelled visit was counted twice. The ₹120 will come with this Monday’s payout.' },
      ] },
  ],
});

let state: State = initial();
const subs = new Set<() => void>();
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };

export function update(fn: (s: State) => State) { state = fn(state); subs.forEach((f) => f()); }
export function resetStore() { update(() => initial()); }
export function useStore<T>(pick: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => pick(state), () => pick(state));
}

export const patchBooking = (id: string, p: Partial<Booking>) =>
  update((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...p } : b)) }));
export const patchPartner = (id: string, p: Partial<Partner>) =>
  update((s) => ({ ...s, partners: s.partners.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
export const patchTicket = (id: string, p: Partial<Ticket> | ((t: Ticket) => Partial<Ticket>)) =>
  update((s) => ({ ...s, tickets: s.tickets.map((t) => (t.id === id ? { ...t, ...(typeof p === 'function' ? p(t) : p) } : t)) }));
export const setPayouts = (fn: (p: Payout[]) => Payout[]) => update((s) => ({ ...s, payouts: fn(s.payouts) }));

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
