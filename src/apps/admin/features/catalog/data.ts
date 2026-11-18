/** Catalog sample data: services and their tasks, booking rules, zones, the change log and offer codes. */
import { decisions, services as catalogue, type Category, type ServiceId } from '@/domain';
import type { TagTone } from '../../ui';
import { inr } from '../../fixtures';

// ---- services ----

export type ServiceTask = { name: string; time: string; on: boolean };
export type CatalogService = { id: string; name: string; category: Category; per30: number; needs: string | null; live: boolean; blurb: string; tasks: ServiceTask[] | null; trained: number };

const designNames: Partial<Record<ServiceId, string>> = { kitchenBath: 'Kitchen & bathroom scrub' };
const kitchenTasks: ServiceTask[] = [
  { name: 'Bathrooms', time: '45 min each', on: true }, { name: 'Kitchen with cabinets', time: '1 hr', on: true },
  { name: 'Fridge inside', time: '30 min', on: true }, { name: 'Ceiling fans', time: '15 min each', on: true }, { name: 'Kitchen slab', time: '30 min', on: true },
];
/** Kind of partner for each category of work. */
export const WORK: Record<Category, string> = { cleaning: 'House help', nursing: 'Nurse', repair: 'Home service', barber: 'Barber' };
/** Specialisation a partner needs before being sent (see the professions page). */
const needs: Partial<Record<ServiceId, string>> = { kitchenBath: 'Deep cleaning', electrician: 'Electrician', plumber: 'Plumber', kidsHaircut: 'Kids' };

/** The service catalogue as the admin page shows and edits it. */
export const initialServices: CatalogService[] = catalogue.map((s) => {
  const id = s.id;
  const tasks = id === 'custom' ? null : id === 'kitchenBath' ? kitchenTasks : s.tasks.map((t) => ({ name: t, time: '30 min', on: true }));
  return {
    id, name: designNames[id] ?? s.name, category: s.category, per30: s.per30, needs: needs[id] ?? null, live: id !== 'custom',
    blurb: id === 'kitchenBath' ? 'Bathrooms, slabs, cabinets, fridge, fans' : id === 'custom' ? 'You choose the chores' : s.sub ?? s.tasks.join(', '),
    tasks, trained: id === 'kitchenBath' ? 31 : 0,
  };
});

export const TASK_TIMES = ['15 min', '30 min', '45 min', '1 hr', '15 min each', '30 min each'];
/** Lowest and highest price per 30 minutes an Owner can set. */
export const PRICE_MIN = 20;
export const PRICE_MAX = 2000;

export const initialBookingRules = (): Record<string, string> => ({
  'Shortest visit': '30 min', 'Longest visit': '3 hr', 'Booked in blocks of': '30 min',
  'Monthly plan saving': `${Math.round(decisions.prices.monthlyPlanSaving * 100)}%`,
  'Free cancellation until': `${decisions.customer.freeCancelUntilHrs} hr before`, 'Late cancellation fee': inr(decisions.customer.lateCancelFee),
});

export type NewService = { name: string; per30: string; category: Category; needs: string };
export const blankService = (): NewService => ({ name: '', per30: '99', category: 'cleaning', needs: '' });

// ---- zones ----

export type Zone = { name: string; status: string; tone: TagTone; partners: string; in15: string; busy: string; hours: string; live: boolean; radius: number; fee: number };
export const initialZones: Zone[] = [
  { name: 'Sector 21', status: 'Healthy', tone: 'n', partners: '12', in15: '94%', busy: 'None', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Block C', status: 'Healthy', tone: 'n', partners: '10', in15: '91%', busy: 'None', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Sector 18', status: 'Healthy', tone: 'n', partners: '9', in15: '88%', busy: '+10% at 8 am', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Block A', status: 'Stretched', tone: 'y', partners: '4', in15: '71%', busy: '+10% at 8 am', hours: '7 am to 8 pm', live: true, radius: 2, fee: 0 },
  { name: 'Block D', status: 'Too few partners', tone: 'r', partners: '2', in15: '52%', busy: '+15% all day', hours: '7 am to 8 pm', live: true, radius: 3, fee: 0 },
  { name: 'Sector 34', status: 'Opening 1 Dec', tone: 'x', partners: '3 of 8', in15: 'Not live', busy: 'Not set', hours: 'Not set', live: false, radius: 1.5, fee: 0 },
];
export const BUSY_OPTIONS = ['None', '+10% at 8 am', '+15% at 8 am', '+10% all day', '+15% all day'];
export const HOUR_OPTIONS = ['6 am to 9 pm', '7 am to 8 pm', '7 am to 9 pm', '8 am to 8 pm'];
export const INVITE_ROLES = ['Operations', 'Support', 'Finance', 'Partner team'];

export type ChangeLogEntry = { who: string; what: string; when: string };
export const initialChangeLog: ChangeLogEntry[] = [
  { who: 'Ops lead', what: 'raised Block D busy-hour price to +15%', when: 'Today, 9:12 am' },
  { who: 'Support 1', what: 'refunded ₹79 on visit #2031', when: 'Today, 8:40 am' },
  { who: 'Admin', what: 'suspended partner Geeta K.', when: 'Yesterday, 6:05 pm' },
  { who: 'Accounts', what: 'paid 48 partners, ₹1,12,480', when: 'Monday, 10:00 am' },
  { who: 'Ops lead', what: 'added zone Sector 34', when: 'Friday, 4:20 pm' },
];

export type OpeningChecks = { boundary: boolean; prices: boolean; trained: boolean; hub: boolean };
export const initialOpeningChecks: OpeningChecks = { boundary: true, prices: true, trained: false, hub: false };

// ---- offer codes ----

export type OfferKind = 'rs' | 'pct';
export type OfferCode = { code: string; kind: OfferKind; value: number; forWho: string; until: string; used: number; given: number; live: boolean; first: boolean; once: boolean; limit: string };
export const initialOfferCodes: OfferCode[] = [
  { code: 'FIRST50', kind: 'rs', value: 50, forWho: 'First visit only', until: 'No end', used: 312, given: 15600, live: true, first: true, once: true, limit: 'No limit' },
  { code: 'PLAN10', kind: 'pct', value: 10, forWho: 'Monthly plans', until: '31 Mar', used: 41, given: 15160, live: true, first: false, once: false, limit: 'No limit' },
  { code: 'DIWALI', kind: 'rs', value: 100, forWho: 'Kitchen & bath scrub', until: '20 Nov', used: 96, given: 9600, live: false, first: false, once: true, limit: '100' },
  { code: 'SOCIETY10', kind: 'pct', value: 10, forWho: 'Green Park Society', until: '31 Mar', used: 58, given: 1020, live: true, first: false, once: false, limit: 'No limit' },
];
export const OFFER_FOR_OPTIONS = ['Everyone', 'First visit only', 'Monthly plans', 'Kitchen & bath scrub', 'Green Park Society', 'Not booked in 30 days'];
export const blankOfferCode = (): OfferCode => ({ code: '', kind: 'rs', value: 50, forWho: 'Everyone', until: 'No end', used: 0, given: 0, live: true, first: false, once: true, limit: 'No limit' });
