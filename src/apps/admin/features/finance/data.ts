/** Finance sample data: offer codes on the payouts page, pay advances and their limit. */
import type { TagTone } from '../../ui';

// ---- payouts ----

export type OfferCodeId = 'FIRST50' | 'PLAN10' | 'DIWALI';
/** Code, offer, times used. */
export const OFFER_CODES: readonly (readonly [OfferCodeId, string, number])[] = [
  ['FIRST50', '₹50 off first visit', 312], ['PLAN10', '10% off monthly plan', 41], ['DIWALI', '₹100 off deep clean', 96],
];
export const OFFER_CODES_LIVE: Record<OfferCodeId, boolean> = { FIRST50: true, PLAN10: true, DIWALI: false };

/** Due this Monday across all 52 partners: ₹1,12,480 while the sample rows (₹10,920) are unpaid. */
const DUE_ALL = 112480;
const SAMPLE_TOTAL = 10920;
/** Drops as sample rows are paid. */
export const dueThisMonday = (unpaidSample: number) => DUE_ALL - (SAMPLE_TOTAL - unpaidSample);

// ---- advances ----

export type AdvanceStatus = 'To approve' | 'Repaying' | 'Repaid' | 'Refused';
export type Advance = { id: string; name: string; asked: number; weeks: number; usual: number; owes: number; status: AdvanceStatus; weekly: number[]; earlier: string; rating: number };

export const initialAdvances: Advance[] = [
  { id: 'sd', name: 'Sunita D.', asked: 2000, weeks: 4, usual: 2750, owes: 0, status: 'To approve', weekly: [78, 86, 70, 92, 88, 100], earlier: '1 · repaid on time', rating: 4.8 },
  { id: 'ab', name: 'Anita B.', asked: 3000, weeks: 8, usual: 1500, owes: 500, status: 'To approve', weekly: [60, 100, 45, 70, 38, 52], earlier: '1 · still repaying', rating: 4.1 },
  { id: 'rm', name: 'Rekha M.', asked: 3000, weeks: 8, usual: 3300, owes: 1875, status: 'Repaying', weekly: [90, 94, 88, 100, 96, 92], earlier: '2 · repaid on time', rating: 4.7 },
  { id: 'kr', name: 'Kavita R.', asked: 1000, weeks: 4, usual: 2500, owes: 250, status: 'Repaying', weekly: [84, 80, 90, 86, 100, 88], earlier: 'None', rating: 4.6 },
  { id: 'mt', name: 'Meena T.', asked: 2000, weeks: 4, usual: 2100, owes: 0, status: 'Repaid', weekly: [92, 100, 80, 86, 74, 70], earlier: '1 · repaid on time', rating: 4.3 },
];

export const advanceTone: Record<AdvanceStatus, TagTone> = { 'To approve': 'y', Repaying: 'n', Repaid: 'x', Refused: 'x' };
/** Most a partner with 6 steady weeks can ask for. */
export const ADVANCE_LIMIT = 3000;
/** Repayment may take up to this share of a usual week, in percent. */
export const ADVANCE_MAX_SHARE = 25;
export const ADVANCE_REFUSE_REASONS = ['Finish repaying the current advance first', 'Earnings not steady for 6 weeks yet', 'Above the ₹3,000 limit'];

export type AdvanceFilter = 'requests' | 'repaying' | 'repaid';
export const advanceMatches = (a: Advance, f: AdvanceFilter) =>
  f === 'requests' ? a.status === 'To approve' : f === 'repaying' ? a.status === 'Repaying' : a.status === 'Repaid' || a.status === 'Refused';
