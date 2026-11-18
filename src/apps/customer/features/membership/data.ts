/** Sample data and constants for the membership feature (prototype only). */
import type { Face } from '@/native/ui';

/* ---- monthly plan ---- */
export const PLAN_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const PLAN_DAYS_DEFAULT = [true, true, true, true, true, true, false];
export const PLAN_TIMES = ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '4:00 pm', '5:00 pm', '6:00 pm'];
export const PLAN_LENGTHS = [30, 60, 90, 120];
export const PLAN_HELPERS: { id: string; face: Face }[] = [
  { id: 'Sunita D.', face: 'sd' }, { id: 'Rekha M.', face: 'rm' }, { id: 'Kiran R.', face: 'kr' },
];

/* ---- Saathi Plus ---- */
export const PLUS_PERKS = ['First in line at busy hours', 'No busy-hour price rise', 'Free cancel up to 15 min before', 'Double points on every visit', 'Damage cover up to ₹10,000'];

/* ---- damage claim ---- */
/** Quick picks; the last one clears the field so the customer types the item. */
export const DAMAGE_ITEMS = ['Glass jar, kitchen shelf', 'Vase, living room', 'Plate set', 'Something else'];
export const OTHER_ITEM = 'Something else';
export const CLAIM_DEFAULTS = { item: DAMAGE_ITEMS[0], value: '450', photos: 2 };
export const MAX_CLAIM_PHOTOS = 6;
/** Damage cover per visit, without and with Plus. */
export const COVER = { basic: 2000, plus: 10000 };

/* ---- shared home ---- */
export type Mate = { face?: Face; initials?: string; name: string; role: string; inSplit: boolean; invited?: boolean };
/** The shared monthly plan, per week. */
export const SHARED_WEEKLY = 258;
export const FLATMATES: Mate[] = [
  { face: 'nk', name: 'Nitin (you)', role: 'Can book and pay', inSplit: true },
  { face: 'rv', name: 'Rahul V.', role: 'Can book and pay', inSplit: true },
  { face: 'ak', name: 'Aman K.', role: 'Pays only', inSplit: true },
];
