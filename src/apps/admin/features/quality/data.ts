/** Prototype sample data for the quality pages (ratings, testimonials). */
import type { TagTone } from '../../ui';

/* ---------------- ratings ---------------- */

export type CaseStatus = 'Act now' | 'Calling' | 'Fixed' | 'Contested' | 'Closed';
export type RatingCase = { id: string; customer: string; partner: string; stars: number; reason: string; wants: string; status: CaseStatus; owner?: string };
export const caseTone: Record<CaseStatus, TagTone> = { 'Act now': 'r', Calling: 'y', Fixed: 'n', Contested: 'x', Closed: 'x' };

export const initialCases: RatingCase[] = [
  { id: '2031', customer: 'Sameer T.', partner: 'Geeta K.', stars: 1, reason: 'Work unfinished', wants: 'Helper sent back', status: 'Act now' },
  { id: '2019', customer: 'Priya N.', partner: 'Anita B.', stars: 2, reason: 'Came late', wants: 'Refund ₹79', status: 'Act now' },
  { id: '2027', customer: 'Rohan G.', partner: 'Geeta K.', stars: 2, reason: 'Rude behaviour', wants: 'Call me', status: 'Calling', owner: 'Support 1' },
  { id: '2008', customer: 'Meera S.', partner: 'Meena T.', stars: 2, reason: 'Something damaged', wants: 'Call me', status: 'Calling', owner: 'Support 2' },
  { id: '2002', customer: 'Farah A.', partner: 'Lata S.', stars: 2, reason: 'Work unfinished', wants: 'Helper sent back', status: 'Fixed', owner: 'Ops lead' },
  { id: '1996', customer: 'Arjun P.', partner: 'Sunita D.', stars: 3, reason: 'Balcony missed', wants: 'Nothing asked', status: 'Contested' },
];

export type Review = { id: string; customer: string; partner: string; stars: number; text: string };
export const reviews: Review[] = [
  { id: '2041', customer: 'Nitin K.', partner: 'Sunita D.', stars: 4, text: 'Good, a little rushed at the end.' },
  { id: '2040', customer: 'Farah A.', partner: 'Sunita D.', stars: 5, text: 'Spotless, on time as always.' },
  { id: '2038', customer: 'Aisha K.', partner: 'Meena T.', stars: 5, text: 'Very careful with the plants.' },
  { id: '2036', customer: 'Ravi V.', partner: 'Rekha M.', stars: 5, text: 'Folded everything neatly.' },
  { id: '2031', customer: 'Sameer T.', partner: 'Geeta K.', stars: 1, text: 'Left halfway, kitchen not done.' },
  { id: '2029', customer: 'Kunal D.', partner: 'Geeta K.', stars: 3, text: 'OK work.' },
];

export type PartnerReport = { id: string; partner: string; customer: string; what: string; status: string };
export const partnerReports: PartnerReport[] = [
  { id: '2033', partner: 'Kavita R.', customer: 'Rohan G.', what: 'Asked for work not booked (car wash)', status: 'Warned customer' },
  { id: '2017', partner: 'Rekha M.', customer: 'Sameer T.', what: 'Kept waiting at the gate 12 min', status: 'Open' },
];

/** People a case can be assigned to. */
export const caseOwners = ['Support 1', 'Support 2', 'Ops lead', 'Admin'];

export const lowRatingReasons = [
  { label: 'Work unfinished', value: '4', pct: 100 },
  { label: 'Came late', value: '3', pct: 75 },
  { label: 'Rude behaviour', value: '1', pct: 25 },
  { label: 'Something damaged', value: '1', pct: 25 },
];

/* ---------------- testimonials ---------------- */

export type TestimonialStatus = 'To approve' | 'Live' | 'Draft' | 'Taken down' | 'Sent back';
export type Placement = { app: boolean; web: boolean; profile: boolean };
export type Testimonial = {
  id: number; face?: string; initials?: string; from: string; who: 'customer' | 'partner'; quote: string; full: string; stars: number | null;
  shows: string; consent: string; consentTone: TagTone; status: TestimonialStatus; meta: string;
  place: Placement;
};
export const testimonialTone: Record<TestimonialStatus, TagTone> = { 'To approve': 'y', Live: 'g', Draft: 'x', 'Taken down': 'x', 'Sent back': 'x' };

export const initialTestimonials: Testimonial[] = [
  { id: 1, face: 'nk', from: 'Nitin, Block C', who: 'customer', quote: 'Kitchen slab was spotless…', full: 'Kitchen slab was spotless. Sunita is always on time.', stars: 5, shows: 'App, website', consent: 'Given today', consentTone: 'n', status: 'To approve', meta: '9 visits · review of 14 Nov · 5 stars', place: { app: true, web: true, profile: true } },
  { id: 2, face: 'fa', from: 'Farah, Sector 18', who: 'customer', quote: 'By 8:15 Sunita was mopping…', full: 'I booked at 8 and by 8:15 Sunita was mopping. Unreal.', stars: 5, shows: 'App, website', consent: 'Given 12 Nov', consentTone: 'n', status: 'Live', meta: '14 visits · review of 11 Nov · 5 stars', place: { app: true, web: true, profile: false } },
  { id: 3, face: 'pn', from: 'Priya, Sector 21', who: 'customer', quote: 'The same helper every day…', full: 'The same helper every day, and she knows how I like things.', stars: 4, shows: 'App', consent: 'Given 9 Nov', consentTone: 'n', status: 'Live', meta: '6 visits · review of 8 Nov · 4 stars', place: { app: true, web: false, profile: false } },
  { id: 4, face: 'rg', from: 'Rohan, Block D', who: 'customer', quote: 'Kitchen deep clean before guests…', full: 'Kitchen deep clean before guests arrived, done in 2 hours.', stars: 5, shows: 'Website', consent: 'Given 8 Nov', consentTone: 'n', status: 'Live', meta: '4 visits · review of 7 Nov · 5 stars', place: { app: false, web: true, profile: false } },
  { id: 5, face: 'kr', from: 'Kavita R., partner', who: 'partner', quote: 'I work mornings only and still…', full: 'I work mornings only and still earn enough for my children’s school.', stars: null, shows: 'Partner app', consent: 'Given 5 Nov', consentTone: 'n', status: 'Live', meta: 'Partner since Aug · 210 visits', place: { app: true, web: false, profile: false } },
  { id: 6, face: 'ms', from: 'Meera, Block A', who: 'customer', quote: 'Quick and polite, will book again…', full: 'Quick and polite, will book again next week.', stars: 5, shows: 'Not chosen', consent: 'Not asked yet', consentTone: 'r', status: 'Draft', meta: '3 visits · review of 15 Nov · 5 stars', place: { app: false, web: false, profile: false } },
  { id: 7, face: 'st', from: 'Sameer, Block C', who: 'customer', quote: 'Good service the first time…', full: 'Good service the first time I booked.', stars: 4, shows: 'Website', consent: 'Withdrawn', consentTone: 'x', status: 'Taken down', meta: '2 visits · review of 1 Oct · 4 stars', place: { app: false, web: false, profile: false } },
];

export const starOptions = ['5', '4', '3', 'None'];
