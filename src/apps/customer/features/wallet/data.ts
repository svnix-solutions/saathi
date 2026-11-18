/** Sample data and constants for the wallet feature (prototype only). */
import { decisions, priceFor } from '@/domain';
import type { Face } from '@/native/ui';

/** A wallet line: positive amounts are money in. */
export type Txn = { title: string; sub: string; amt: number };

/** Balance before the customer adds money. */
export const WALLET_BALANCE_DEFAULT = 240;

/** Top-up amounts on the Wallet screen. */
export const TOP_UP_AMOUNTS = [200, 500, 1000];

/** Recent wallet lines. */
export const SAMPLE_TXNS: Txn[] = [
  { title: 'Refund · visit ended early', sub: 'Today · #2031', amt: 79 },
  { title: 'General cleaning', sub: 'Today · #2041', amt: -158 },
  { title: 'Referral reward', sub: '12 Nov · Meera joined', amt: decisions.customer.referralReward },
];

/** Ways to pay for a top-up: [key, label, saved account]. */
export const TOP_UP_METHODS = [['upi', 'UPI', 'nitin@okaxis'], ['card', 'Debit card', '•••• 4242']] as const;
export type TopUpMethod = (typeof TOP_UP_METHODS)[number][0];

/** The customer's referral code. */
export const REFERRAL_CODE = 'NITIN100';

/** Friends who joined with the code. */
export const REFERRED_FRIENDS: { face: Face; name: string }[] = [
  { face: 'ms', name: 'Meera S.' },
  { face: 'ap', name: 'Arjun P.' },
];

/** A friend who has the code but has not booked yet. */
export const PENDING_FRIEND = { face: 'rg' as Face, name: 'Rohan G.', first: 'Rohan' };

/** Points before the customer earns or spends any. */
export const POINTS_DEFAULT = 320;

/** Points needed for Gold, and for 30 free minutes. */
export const GOLD_POINTS = 500;
export const FREE_MINUTES_POINTS = 500;

/** Ways to earn points: [label, points, route]. */
export const EARN_POINTS: [string, number, string?][] = [
  ['Every visit', decisions.customer.pointsPerVisit, 'home'], ['Rate the visit', 5, 'ratingDetailed'],
  ['Review with a photo', 20, 'ratingDetailed'], ["A friend's first visit", 50, 'refer'],
];

/** Gifts a customer can send. */
export const GIFTS = [
  { k: '1 visit', hi: '1 विज़िट', price: priceFor('general', 60) },
  { k: '4 visits', hi: '4 विज़िट', price: 600 },
  { k: 'Deep clean', hi: 'डीप क्लीन', price: 774 },
];

/** The sample gift form. */
export const GIFT_DEFAULTS = { gift: 1, name: 'Asha aunty', phone: '98220 14567', msg: 'With love. Put your feet up this Sunday.' };
