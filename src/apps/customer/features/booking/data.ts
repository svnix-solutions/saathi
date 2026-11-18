/** Sample data and constants for the booking screens (design pages 03, 10, 12, 16, 17). */
import { decisions, taskName, type TFn } from '@/domain';
import type { CustomerState } from '../../state';

/* ---- 7 · Duration and time ---- */
export const DURATIONS = [30, 60, 90, 120, 150, 180];
export type DayId = NonNullable<CustomerState['day']>;
export const DAYS: readonly { id: DayId; en: string; hi: string }[] = [
  { id: 'today', en: 'Today', hi: 'आज' },
  { id: 'tomorrow', en: 'Tomorrow', hi: 'कल' },
  { id: 'wed', en: 'Wed 18', hi: 'बुध 18' },
];
export const dayById = (id: DayId) => DAYS.find((d) => d.id === id)!;

/* ---- 8 · Confirm ---- */
const DEFAULT_TASKS = ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];
/** "Sweep, mop, dusting, surfaces" for the default chores, else the ticked list. */
export function taskSummary(t: TFn, tasks: string[]) {
  if (tasks.length === 3 && DEFAULT_TASKS.every((d) => tasks.includes(d))) return t('Sweep, mop, dusting, surfaces', 'झाड़ू, पोछा, धूल, सतहें');
  return tasks.map((x) => taskName(t, x)).join(', ');
}
/** Helper assigned to a scheduled booking in the prototype. */
export const SCHEDULED_HELPER = 'Rekha M.';

/* ---- 34 · Supplies ---- */
export const SUPPLIES = [
  { id: 'floor', name: 'Floor cleaner, 500 ml', price: 89 },
  { id: 'dish', name: 'Dish liquid, 250 ml', price: 65 },
  { id: 'mop', name: 'Mop refill', price: 149 },
  { id: 'cloth', name: 'Microfibre cloths, 3', price: 99 },
  { id: 'bath', name: 'Bathroom cleaner, 500 ml', price: 95 },
];
export const DEFAULT_SUPPLIES: Record<string, number> = { floor: 1, dish: 1 };

/* ---- 42 · Book for family ---- */
export const FAMILY_HOMES = [
  { label: "Parents' home", line: 'House 18, Sector 21', contact: 'Mrs Kapoor', phone: '98111 20034' },
  { label: "Sister's flat", line: 'B-702, Green Towers, Sector 50', contact: 'Priya Kumar', phone: '98990 41127' },
];

/* ---- 43 · Deep clean builder ---- */
export const ROOMS = [
  { id: 'bath', name: 'Bathrooms', sub: '45 min each', min: 45, max: 6 },
  { id: 'kitchen', name: 'Kitchen with cabinets', sub: '1 hr', min: 60, max: 1 },
  { id: 'fridge', name: 'Fridge inside', sub: '30 min', min: 30, max: 1 },
  { id: 'fans', name: 'Ceiling fans', sub: '15 min each', min: 15, max: 6 },
];
export const DEFAULT_ROOMS: Record<string, number> = { bath: 2, kitchen: 1, fridge: 0, fans: 2 };

/** Work minutes, price and how long it takes on the clock with one or two helpers. */
export function deepCleanEstimate(qty: Record<string, number>, twoHelpers: boolean) {
  const minutes = ROOMS.reduce((a, r) => a + (qty[r.id] ?? 0) * r.min, 0);
  const price = Math.round((minutes / 30) * decisions.prices.kitchenBath);
  const together = Math.ceil(minutes / 2 / 15) * 15;
  return { minutes, price, together, wall: twoHelpers ? together : minutes };
}

/* ---- 56 · Voice booking ---- */
export const VOICE_PULSE_MS = 450;
export const VOICE_LISTEN_MS = 2600;

/* ---- 57 · Photo estimate ---- */
export const PHOTO_ANALYSE_MS = 1800;
export const PHOTO_SUGGESTED = ['Kitchen slab scrub', 'Dishes', 'Cabinet fronts'];

/* ---- 63 · Not-at-home visit ---- */
export const ENTRIES = [
  { k: 'guard', title: 'Key with the guard', hi: 'चाबी गार्ड के पास', sub: "Guard checks the helper's ID card", detail: 'Leave the key at Gate 2. The guard sees Sunita’s photo and ID before handing it over.' },
  { k: 'neighbour', title: 'Neighbour opens the door', hi: 'पड़ोसी दरवाज़ा खोलेंगे', sub: 'We send them the door code', detail: 'We send Flat 203 the door code 4821 and a message when Sunita arrives.' },
  { k: 'lock', title: 'Smart lock code', hi: 'स्मार्ट लॉक कोड', sub: 'Works once, for this visit only', detail: 'A one-time code is sent to Sunita at check-in and stops working when she leaves.' },
];
export const PROOFS = ['Photo when the door is opened', 'Before and after photos of each room', 'Photo of the locked door at the end'];

/** Adds `x` when it is missing, removes it when present. */
export const toggleIn = <T,>(list: T[], x: T) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]);
