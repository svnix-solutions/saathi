/**
 * Operations store: bookings, partners, payouts and tickets in one tiny module store, so that assigning a partner
 * on `assign` shows up on `dashboard` and `bookings`. State lives for the browser session (reload the story to reset).
 */
import { useSyncExternalStore } from 'react';
import { initialBookings, type Booking } from './bookings';
import { initialPartners, type Partner } from './partners';
import { initialPayouts, type Payout } from './payouts';
import { initialTickets, type Ticket } from './tickets';

export type OpsState = { bookings: Booking[]; partners: Partner[]; payouts: Payout[]; tickets: Ticket[] };

const initial = (): OpsState => ({
  bookings: initialBookings(),
  partners: initialPartners(),
  payouts: initialPayouts(),
  tickets: initialTickets(),
});

let state: OpsState = initial();
const subs = new Set<() => void>();
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };

/** Replace the state and notify subscribers. */
export function update(fn: (s: OpsState) => OpsState) { state = fn(state); subs.forEach((f) => f()); }
/** Back to the sample data. */
export function resetStore() { update(() => initial()); }
/** Subscribe a component to a slice of the store. */
export function useStore<T>(pick: (s: OpsState) => T): T {
  return useSyncExternalStore(subscribe, () => pick(state), () => pick(state));
}

export const patchBooking = (id: string, p: Partial<Booking>) =>
  update((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...p } : b)) }));
export const patchPartner = (id: string, p: Partial<Partner>) =>
  update((s) => ({ ...s, partners: s.partners.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
export const patchTicket = (id: string, p: Partial<Ticket> | ((t: Ticket) => Partial<Ticket>)) =>
  update((s) => ({ ...s, tickets: s.tickets.map((t) => (t.id === id ? { ...t, ...(typeof p === 'function' ? p(t) : p) } : t)) }));
export const setPayouts = (fn: (p: Payout[]) => Payout[]) => update((s) => ({ ...s, payouts: fn(s.payouts) }));
