/** Pure helpers for the testimonials page. */
import type { Placement, Testimonial, TestimonialStatus } from './data';

/** "App, website, profile" — where a testimonial shows, from its placement switches. */
export const showsFrom = (p: Placement, who: Testimonial['who']) => {
  const s = [p.app && (who === 'partner' ? 'Partner app' : 'App'), p.web && 'website', p.profile && 'profile'].filter(Boolean) as string[];
  return s.length ? s.join(', ').replace(/^w/, 'W') : 'Not chosen';
};

export type StatusFilter = 'any' | 'waiting' | 'approved' | 'off';

/** Whether a testimonial status belongs under a status filter tab. */
export const matchesStatus = (st: StatusFilter, status: TestimonialStatus) =>
  st === 'any' || (st === 'waiting' && (status === 'To approve' || status === 'Draft')) || (st === 'approved' && status === 'Live')
  || (st === 'off' && (status === 'Taken down' || status === 'Sent back'));

/** A new draft testimonial typed in by an admin. */
export function draftTestimonial(id: number, from: string, quote: string, stars: string): Testimonial {
  const q = quote.trim();
  return {
    id, initials: from.trim().slice(0, 2).toUpperCase(), from: from.trim(), who: /partner/i.test(from) ? 'partner' : 'customer', quote: q.length > 30 ? q.slice(0, 30) + '…' : q, full: q,
    stars: parseInt(stars, 10) || null, shows: 'Not chosen', consent: 'Not asked yet', consentTone: 'r', status: 'Draft', meta: 'Added by Admin · just now', place: { app: false, web: false, profile: false },
  };
}
