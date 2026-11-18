import type { Face } from '@/native/ui';
import type { Testimonial } from '../../state';

/** A customer quote shown on the testimonial screens. `mine` = from the customer's area, `deep` = a deep clean. */
export type Quote = { face: Face; name: string; place: string; stars: number; text: string; short: string; plan?: string; mine?: boolean; deep?: boolean };

export const quotes: Quote[] = [
  { face: 'fa', name: 'Farah', place: 'Sector 18', plan: 'monthly plan', stars: 5, text: 'I booked at 8 and by 8:15 Sunita was mopping. My mornings are calm now.', short: 'By 8:15 Sunita was mopping. My mornings are calm now.' },
  { face: 'pn', name: 'Priya', place: 'Sector 21', plan: 'daily help', stars: 4, text: 'The same helper every day. My mother trusts her now.', short: 'The same helper every day. My mother trusts her now.' },
  { face: 'rg', name: 'Rohan', place: 'Block D', plan: 'deep clean', stars: 5, mine: true, deep: true, text: 'Kitchen deep clean before guests came. Worth every rupee.', short: 'Kitchen deep clean before guests came. Worth every rupee.' },
];

/** Filter pills on All testimonials. */
export const quoteFilters: { k: string; hi: string; f: (q: Quote) => boolean }[] = [
  { k: 'All', hi: 'सभी', f: () => true },
  { k: 'My area', hi: 'मेरा इलाका', f: (q) => !!q.mine },
  { k: 'Deep clean', hi: 'डीप क्लीन', f: (q) => !!q.deep },
];

/** The customer's own review that they are asked to share. */
export const myQuote = 'Kitchen slab was spotless. Sunita is always on time.';

/** Name choices on Permission to share. */
export const showAsOptions = ['Nitin, Block C', 'A customer'];

/** Shown on My testimonial before the customer has shared one in this session. */
export const defaultTestimonial: Testimonial = { status: 'Waiting for approval', showAs: 'Nitin, Block C', app: true, web: true, photo: false, sent: 'Sent today' };

/** Helpers the neighbours in the society favour. */
export const neighbourHelpers: { face: Face; name: string; flats: number }[] = [
  { face: 'sd', name: 'Sunita D.', flats: 12 },
  { face: 'rm', name: 'Rekha M.', flats: 7 },
];
