/** Sample data and constants for the rating screens (prototype only). */
import { decisions, rupees, visitPrice } from '@/domain';
import type { RatingParts } from './state';

/** Detailed rating: the parts rated separately. */
export const ratingRows: [keyof RatingParts, string][] = [['time', 'On time'], ['quality', 'Cleaning quality'], ['behaviour', 'Behaviour']];
export const defaultParts: RatingParts = { time: 5, quality: 4, behaviour: 5 };
export const sampleReviewText = 'Kitchen slab was spotless. Balcony corner was missed.';
/** Points: rating a visit earns 5, a photo review 20 more. */
export const ratePoints = 5;
export const photoPoints = 20;
/** Points balance and wallet balance until the customer changes them. */
export const defaultPoints = 320;
export const defaultWallet = 240;
export const defaultBlocked = ['Mohan T.'];

/** Low rating: what went wrong. */
export const lowReasons = ['Came late', 'Work unfinished', 'Rude behaviour', 'Something damaged'];

/** Low rating: half of a 1 hr general visit goes back to the wallet. */
export const badVisitRefund = Math.round(visitPrice * decisions.customer.badVisitRefund);

export type FixKind = 'reclean' | 'refund' | 'call';
export type FixOption = { k: FixKind; title: string; sub: string; done: string };
export const fixOptions: FixOption[] = [
  { k: 'reclean', title: 'Send a helper back, free', sub: 'Today, to finish the work', done: 'A helper is coming back today, free' },
  { k: 'refund', title: `Refund ${rupees(badVisitRefund)} to wallet`, sub: 'Half of this visit', done: `${rupees(badVisitRefund)} refunded to your wallet` },
  { k: 'call', title: 'Call me', sub: 'Our team rings within 10 min', done: 'Our team will call you within 10 min' },
];
