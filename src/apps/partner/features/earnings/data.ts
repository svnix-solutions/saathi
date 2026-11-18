/** Sample data and small pure helpers for the earnings feature (prototype values from the design). */
import type { IconName } from '@/native/ui';

/* ---------- earnings (design page 20, screen 12) ---------- */

/** Day names for the M–S bars, English and Hindi. */
export const dayNames: readonly (readonly [string, string])[] = [
  ['Monday', 'सोमवार'], ['Tuesday', 'मंगलवार'], ['Wednesday', 'बुधवार'], ['Thursday', 'गुरुवार'],
  ['Friday', 'शुक्रवार'], ['Saturday', 'शनिवार'], ['Sunday', 'रविवार'],
];
export const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/** The bar for "today" (Saturday in the design). */
export const TODAY_INDEX = 5;

/** Each day's earnings as drawn: 46 / 62 / 38 / 80 / 55 / 100 / 8 % of ₹640, with today = today's total + ₹228. */
export function weekDayTotals(todayTotal: number) {
  const days = [0.46, 0.62, 0.38, 0.8, 0.55, 1, 0.08].map((p) => Math.round(p * 640));
  days[TODAY_INDEX] = todayTotal + 228;
  return days;
}

/* ---------- take out earnings (design page 26, screen 35) ---------- */

export type Payout = { label: string; date: string; amount: number };
export const startBalance = 2846;
export const payoutHistory: Payout[] = [
  { label: 'Weekly payout', date: 'Mon 9 Nov', amount: 2610 },
  { label: 'Taken early', date: 'Thu 5 Nov', amount: 800 },
  { label: 'Weekly payout', date: 'Mon 2 Nov', amount: 1945 },
];

/** "All" plus the fixed amounts the partner can take out now (only those above the fee, no repeats). */
export const payoutChoices = (balance: number, fee: number) =>
  [balance, 2000, 1000, 500].filter((v, i, a) => v <= balance && v > fee && a.indexOf(v) === i);

/* ---------- planner (design page 30, screen 50) ---------- */

export const plannerSlots = [
  { id: 'sat-am', label: 'Sat 7 to 10 am', amt: 520 },
  { id: 'sat-pm', label: 'Sat 5 to 8 pm', amt: 380 },
  { id: 'sun-am', label: 'Sun 8 to 11 am', amt: 460 },
];
export const PER_HOUR = 130;
export const earnedThisWeek = 2846;
export const extraHourChoices = [0, 2, 4, 6];
export const goalChoices = [3000, 4000, 5000, 6000];

/** What the picked slots and extra weekday hours add up to. */
export const plannedEarnings = (picked: string[], extraHrs: number) =>
  plannerSlots.filter((s) => picked.includes(s.id)).reduce((a, s) => a + s.amt, 0) + extraHrs * PER_HOUR;

/* ---------- benefits (design page 31, screen 51) ---------- */

export type Benefit = { id: string; icon: IconName; title: string; sub: string; more: string[]; locked?: boolean; active?: boolean };
export const benefits: Benefit[] = [
  { id: 'acc', icon: 'shield', title: 'Accident cover · active', sub: 'Up to ₹2,00,000 while on a job or travelling to one', active: true,
    more: ['Covers hospital bills and loss of income', 'Starts when you go online, ends when you go offline', 'Policy no. SA-ACC-20418'] },
  { id: 'health', icon: 'user', title: 'Health check-up', sub: 'Free once a year · due in March',
    more: ['Blood test, BP, sugar and eye check', 'At any partner clinic near Block C'] },
  { id: 'sick', icon: 'clock', title: 'Paid sick days', sub: '2 of 6 used this year',
    more: ['Paid at your average day: about ₹640', 'Tell us before 8 am on the day'] },
  { id: 'family', icon: 'home', title: 'Family health cover', sub: 'Opens after 300 visits · 142 done', locked: true,
    more: ['Covers you, your partner and 2 children', '158 visits to go'] },
];
export const claimSteps = ['Call the helpline or tap below within 7 days', 'Send a photo of the hospital bill', 'Money reaches your bank in about 10 days'];

/* ---------- pay advance (design page 31, screen 52) ---------- */

export const advanceAmounts = [1000, 2000, 3000];
export const advanceWeeks = [4, 8];

/* ---------- kit shop (design page 31, screen 53) ---------- */

export type KitItem = { id: string; icon: IconName; name: string; sub: string; price: number; free?: boolean };
export const kitItems: KitItem[] = [
  { id: 'uniform', icon: 'shirt', name: 'Uniform set', sub: 'First set free · size M', price: 0, free: true },
  { id: 'gloves', icon: 'drop', name: 'Gloves, 5 pairs', sub: '₹60', price: 60 },
  { id: 'cloths', icon: 'sparkle', name: 'Microfibre cloths, 6', sub: '₹120', price: 120 },
  { id: 'bag', icon: 'wallet', name: 'Kit bag', sub: '₹180', price: 180 },
];

/* ---------- savings pot (design page 32, screen 58) ---------- */

export const savingsGoal = 10000;
export const savingsStart = 6400;
export const tipsPerWeek = 250;
export const perPayoutChoices = [100, 200, 300, 500];
export type SavingsLine = { label: string; amt: number };
export const savingsRecent: SavingsLine[] = [
  { label: 'Mon 9 Nov · from payout', amt: 200 },
  { label: 'Tips, last week', amt: 250 },
];
