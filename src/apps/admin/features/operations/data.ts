/** Sample data and constants for the operations pages (dashboard, bookings, assign, live, small screens). */
import type { IconName } from '../../ui';

// ---- dashboard ----
export type DashFilter = 'all' | 'now' | 'scheduled' | 'problems';
/** Bookings shown in the dashboard's live list, in order. */
export const DASH_IDS = ['2041', '2042', '2043', '2044', '2045', '2046', '2040'];
export const DASH_TABS: { key: DashFilter; label: string }[] = [
  { key: 'all', label: 'All' }, { key: 'now', label: 'Now' }, { key: 'scheduled', label: 'Scheduled' }, { key: 'problems', label: 'Problems' },
];

// ---- bookings ----
export type BookingGroup = 'all' | 'needs' | 'live' | 'scheduled' | 'done' | 'cancelled';
/** Totals for the whole day (86); the sample rows are the first page. */
export const DAY_TOTALS: Record<BookingGroup, number> = { all: 86, needs: 2, live: 14, scheduled: 31, done: 36, cancelled: 3 };
/** How many of each group the sample rows hold at the start. */
export const SAMPLE_COUNTS: Record<BookingGroup, number> = { all: 10, needs: 2, live: 3, scheduled: 2, done: 3, cancelled: 0 };

// ---- assign ----
export type NearPartner = { id: string; name: string; face: string; info: string; blocked?: 'Declined' | 'Blocked' };
export const NEAR: NearPartner[] = [
  { id: 'rm', name: 'Rekha M.', face: 'rm', info: '0.6 km · free in 10 min · 4.6' },
  { id: 'mt', name: 'Meena T.', face: 'mt', info: '1.8 km · online now · 4.5' },
  { id: 'kr', name: 'Kavita R.', face: 'kr', info: '1.1 km · on a job till 11:40 · 4.9' },
  { id: 'ab', name: 'Anita B.', face: 'ab', info: '0.9 km · declined this job', blocked: 'Declined' },
  { id: 'gk', name: 'Geeta K.', face: 'gk', info: '0.4 km · suspended', blocked: 'Blocked' },
];
export const WIDER: NearPartner[] = [
  { id: 'sd', name: 'Sunita D.', face: 'sd', info: '2.4 km · free at 12:00 · 4.8' },
  { id: 'pv', name: 'Pooja V.', face: 'pv', info: '2.9 km · online now · new' },
];

export type StepKind = 'ok' | 'bad' | 'wait';
export type BookingDetail = { face: string; addr: string; job: string; note: string; history: [string, string][]; prefer: string; timeline: [string, string, StepKind][] };

/** Details shown in the middle column (the design shows #2042; #2045 is filled in the same style). */
export const DETAIL: Record<string, BookingDetail> = {
  '2042': {
    face: 'ms', addr: 'Flat 12, Block A · 3 visits before', job: 'Kitchen & bathroom scrub · 2 hr · now',
    note: 'Bathrooms, kitchen slab, fridge. Note: "Guests coming at 2 pm."',
    timeline: [['11:02', 'Booked and paid by UPI', 'ok'], ['11:02', 'Sent to 3 partners within 1.5 km', 'ok'], ['11:03', 'Anita B. declined', 'bad'],
      ['11:04', 'Pooja V. and Lata S. did not answer', 'bad'], ['11:06', 'Still searching · customer told "finding your helper"', 'wait']],
    history: [['#1971 · Kitchen & bath · Kavita R.', '5 / 5'], ['#1902 · General · Rekha M.', '4 / 5'], ['#1844 · Dishes · Anita B.', '4 / 5']],
    prefer: 'Never cancelled. Prefers Kavita R., who is on a job until 11:40.',
  },
  '2045': {
    face: 'rg', addr: 'House 7, Block D · 1 visit before', job: 'Hourly custom help · 3 hr · now',
    note: 'Cupboards, balcony and dishes. Note: "Moving out on Friday."',
    timeline: [['11:05', 'Booked and paid by UPI', 'ok'], ['11:05', 'Sent to 2 partners within 1.5 km', 'ok'], ['11:06', 'Still searching · only 2 partners online in Block D', 'wait']],
    history: [['#1950 · General · Sunita D.', '5 / 5']],
    prefer: 'Never cancelled. No favourite partner yet.',
  },
};

/** Sample cards under "Starting soon" and "Assigned by hand today" that are not in the store. */
export const STATIC_SCHEDULED = [{ id: '2048', customer: 'Nitin K.', tag: 'Tue 8 am', sub: 'Plan · General · Sunita D.' }];
export const STATIC_BY_HAND = [
  { id: '2017', customer: 'Kiran D.', tag: '9:40 am', sub: 'Found in 6 min · Meena T.' },
  { id: '1998', customer: 'Asha P.', tag: '8:15 am', sub: 'Found in 4 min · Rekha M.' },
];

// ---- live ----
export type DotTone = 'job' | 'travel' | 'look';
export type MapDot = { id: string; name: string; left: string; top: string; tone: DotTone; info: string };
export const DOTS: MapDot[] = [
  { id: 'rm', name: 'Rekha M.', left: '22%', top: '20%', tone: 'job', info: 'Sector 21 · #2043 · arriving 11:14' },
  { id: 'kr', name: 'Kavita R.', left: '60%', top: '26%', tone: 'job', info: 'Sector 18 · 12 min left' },
  { id: 'sd', name: 'Sunita D.', left: '40%', top: '52%', tone: 'job', info: 'Block C · 38 min left' },
  { id: 'ab', name: 'Anita B.', left: '76%', top: '60%', tone: 'travel', info: 'Travelling to Sector 21 · 4 pm job' },
  { id: 'pv', name: 'Pooja V.', left: '14%', top: '66%', tone: 'travel', info: 'Travelling · Block A' },
  { id: 'mt', name: 'Meena T.', left: '52%', top: '80%', tone: 'look', info: 'Checked in 410 m from the door' },
];

export type AttendanceRow = { id: string; name: string; face: string; job: string; inT: string; late?: number; out?: string; worked: string; live?: boolean; selfie: boolean; loc: number };
export const ATTENDANCE: AttendanceRow[] = [
  { id: 'sd', name: 'Sunita D.', face: 'sd', job: '#2041', inT: '11:08', worked: '22 min', live: true, selfie: true, loc: 12 },
  { id: 'kr', name: 'Kavita R.', face: 'kr', job: '#2044', inT: '10:12', worked: '1 hr 18', live: true, selfie: true, loc: 8 },
  { id: 'rm', name: 'Rekha M.', face: 'rm', job: '#2040', inT: '8:02', out: '10:05', worked: '2 hr 3', selfie: true, loc: 15 },
  { id: 'ab', name: 'Anita B.', face: 'ab', job: '#2036', inT: '9:42', late: 12, out: '10:40', worked: '58 min', selfie: true, loc: 20 },
  { id: 'mt', name: 'Meena T.', face: 'mt', job: '#2038', inT: '9:15', out: '9:20', worked: '5 min', selfie: true, loc: 410 },
  { id: 'gk', name: 'Geeta K.', face: 'gk', job: '#2029', inT: '7:58', out: '8:55', worked: '57 min', selfie: false, loc: 10 },
  { id: 'pv', name: 'Pooja V.', face: 'pv', job: '#2033', inT: '8:30', out: '9:32', worked: '1 hr 2', selfie: true, loc: 6 },
];
/** [on a job, checked in, late, not matched] per period. */
export const LIVE_KPIS = {
  today: [14, 41, 3, 2], yesterday: [0, 46, 4, 1], week: [0, 212, 17, 6],
} as const;
export type LiveDay = keyof typeof LIVE_KPIS;
export type AttendanceFilter = 'all' | 'late' | 'bad';
/** Location further than this from the door counts as "not matched". */
export const MAX_CHECKIN_METRES = 100;

// ---- small screens ----
export const RAIL_ICONS: IconName[] = ['home', 'list', 'pin', 'shield', 'bolt', 'user', 'star', 'wallet', 'call', 'key'];
export const RAIL_LABELS = ['Dashboard', 'Bookings', 'Live map', 'Safety', 'Automation', 'Customers', 'Ratings', 'Payouts', 'Support', 'Team'];

export type Attention = { key: string; title: string; sub: string; subPhone: string; titlePhone: string; red?: boolean; btn: string };
export const ATTENTION: Attention[] = [
  { key: 'sos', title: 'Emergency alert', titlePhone: 'Emergency alert', sub: 'Customer · Block C · 2 min ago', subPhone: 'Block C · 2 min ago', red: true, btn: 'Open' },
  { key: 'assign', title: '2 bookings have no partner', titlePhone: '2 bookings, no partner', sub: '#2042 waiting 4 min · #2045 waiting 1 min', subPhone: 'Waiting up to 4 min', btn: 'Assign' },
  { key: 'signups', title: '3 partner sign-ups to check', titlePhone: '3 sign-ups to check', sub: 'Aadhaar, PAN and references', subPhone: 'Aadhaar and PAN', btn: 'Review' },
  { key: 'testimonials', title: '3 testimonials to approve', titlePhone: '3 testimonials to approve', sub: 'Not shown until approved', subPhone: 'Not shown until approved', btn: 'Review' },
];
export const PHONE_PARTNERS = [
  { id: 'rm', name: 'Rekha M.', sub: '0.6 km · free in 10 min' },
  { id: 'mt', name: 'Meena T.', sub: '1.8 km · online now' },
  { id: 'kr', name: 'Kavita R.', sub: '1.1 km · busy till 11:40' },
];
export const PHONE_TABS: [IconName, string][] = [['home', 'Home'], ['list', 'Bookings'], ['shield', 'Safety'], ['key', 'More']];
export const PHONE_TITLES = ['Dashboard', 'Bookings', 'Safety', 'More'];
export const PHONE_MORE = ['Live map', 'Customers', 'Ratings', 'Payouts', 'Support', 'Team'];
