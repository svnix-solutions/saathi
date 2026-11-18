/** Sample data and constants for the helper screens (prototype only). */
import type { Face } from '@/native/ui';

/** Defaults until the customer changes them. */
export const defaultFavourites = ['Sunita D.'];
export const defaultBlocked = ['Mohan T.'];

/** People on "Your helpers". */
export type HelperPerson = { n: string; face: Face; sub: string; first: string };
export const myHelpers: HelperPerson[] = [
  { n: 'Sunita D.', face: 'sd', sub: '6 visits · you rated 5', first: 'Sunita' },
  { n: 'Rekha M.', face: 'rm', sub: '2 visits · you rated 4', first: 'Rekha' },
];

/** Helper profile (Sunita D.). */
export const profileHelper = 'Sunita D.';
export const profileBadges = ['ID checked', 'Police verified', 'Trained'];
export const profileSkills = ['Floors', 'Kitchen scrub', 'Laundry'];

/** Reviews for Sunita D. */
export type Review = { who: string; stars: number; text: string; meta?: string; photo?: boolean; reply?: string };
export const reviews: Review[] = [
  { who: 'Farah', stars: 5, text: 'Very thorough, always on time.', meta: 'Laundry · 12 Nov', photo: true },
  { who: 'Priya', stars: 4, text: 'Good work. Came 5 minutes late.', meta: 'General cleaning · 9 Nov' },
  { who: 'A customer', stars: 3, text: 'Balcony was missed.', reply: 'We sent a helper back the same day.' },
];
export const starShares: [string, number][] = [['5', 84], ['4', 13], ['3', 3]];
export type ReviewFilter = 'all' | 'photos' | 'low';
export const reviewFilters = [['all', 'All'], ['photos', 'With photos'], ['low', 'Low first']] as const;

/** Chat with the helper. */
export type ChatMessage = { me: boolean; text: string };
export const chatOpening: ChatMessage[] = [
  { me: false, text: 'Namaste, I am on the way. Which gate should I come to?' },
  { me: true, text: 'Gate 2, near the park. Tell the guard flat 204.' },
  { me: false, text: 'Okay. Do you have a mop and floor cleaner?' },
  { me: true, text: 'Yes, everything is in the balcony.' },
];
export const chatReplies = ['Okay, noted.', 'Theek hai, I will be there soon.', 'Sure, no problem.', 'Got it, thank you!'];
export const quickReplies = ['Ring the bell', 'Call me when here', 'I am home'];
export const replyDelayMs = 1000;
