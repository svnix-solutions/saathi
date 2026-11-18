/** Support sample data and limits: visit facts per ticket, the refund limit, damage claims and their cover. */
import type { TagTone } from '../../ui';
import { inr } from '../../fixtures';

/** A Support role can refund up to this much; more goes to the ops lead. */
export const ROLE_LIMIT = 200;

export type TicketFix = { label: string; refund?: number; kind: 'helper' | 'refund' | 'call' };
/** Facts of the visit (label, value, shown in red) and the fixes offered for one ticket. */
export type TicketFacts = { rows: [string, string, boolean?][]; price: number; fixes: TicketFix[] };

export const TICKET_FACTS: Record<string, TicketFacts> = {
  'T-318': {
    price: 158,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Partner', 'Geeta K.'], ['Check-in', '7:58 · 10 m from door'], ['Check-out', '8:38 · 40 min worked', true], ['Tasks ticked', '2 of 3'], ['Selfie', 'Not matched', true]],
    fixes: [{ label: 'Send a helper back, free', kind: 'helper' }, { label: 'Refund ₹53 for 20 minutes', refund: 53, kind: 'refund' }, { label: 'Refund half · ₹79', refund: 79, kind: 'refund' }, { label: 'Call Sameer', kind: 'call' }],
  },
  'T-317': {
    price: 158,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Partner', 'Rekha M.'], ['Arrived', '9:15 · 8 m from door'], ['Waited', '10 min · 2 calls made'], ['Customer phone', 'Switched off', true]],
    fixes: [{ label: 'Pay Rekha ₹30 for the wait', kind: 'helper' }, { label: 'Call customer', kind: 'call' }],
  },
  'T-316': {
    price: 237,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Charged', '₹237 · 1.5 hr', true], ['Extra time', 'Asked by partner, not approved', true], ['Partner', 'Anita B.']],
    fixes: [{ label: 'Refund ₹79 extra charge', refund: 79, kind: 'refund' }, { label: 'Call Priya', kind: 'call' }],
  },
  'T-315': {
    price: 316,
    rows: [['Booked', 'Kitchen & bath · 1 hr · ₹316'], ['Partner', 'Kavita R.'], ['Damage', 'Glass jar · about ₹450', true], ['Photo', 'Sent by customer']],
    fixes: [{ label: 'Pay ₹450 for the jar', refund: 450, kind: 'refund' }, { label: 'Open a damage claim', kind: 'helper' }, { label: 'Call Meera', kind: 'call' }],
  },
  'T-314': {
    price: 0,
    rows: [['Payout', 'Week of 2 to 8 November'], ['Shown in app', '₹1,654'], ['Paid', '₹1,534', true], ['Reason', 'Cancelled visit counted twice']],
    fixes: [{ label: 'Add ₹120 to next payout', kind: 'helper' }, { label: 'Call Anita', kind: 'call' }],
  },
};

// ---- damage claims ----

export type ClaimStatus = 'To decide' | 'Over 1 day' | 'Paid' | 'Rejected';
export type Claim = {
  id: string; customer: string; custId: string; what: string; claimed: number; reported: string; status: ClaimStatus; paid?: number; reason?: string; plus?: boolean;
  visit: string; when: string; custFacts: string; partnerFacts: string;
};

export const initialClaims: Claim[] = [
  { id: '2041', customer: 'Nitin K.', custId: 'nk', what: 'Glass jar, kitchen shelf', claimed: 450, reported: 'Today', status: 'To decide', visit: 'General · 1 hr · Sunita D.', when: '2 hr after the visit, inside 24 hr', custFacts: '9 visits · no earlier claims', partnerFacts: '142 visits · no earlier claims' },
  { id: '2008', customer: 'Meera S.', custId: 'ms', what: 'Bathroom mirror, cracked', claimed: 1800, reported: 'Yesterday', status: 'To decide', visit: 'Kitchen & bath · 2 hr · Meena T.', when: '5 hr after the visit, inside 24 hr', custFacts: '3 visits · no earlier claims', partnerFacts: '96 visits · 1 earlier claim' },
  { id: '1977', customer: 'Farah A.', custId: 'fa', what: 'Mop handle', claimed: 220, reported: '2 days ago', status: 'Over 1 day', visit: 'General · 1 hr · Lata S.', when: '1 hr after the visit, inside 24 hr', custFacts: '14 visits · no earlier claims', partnerFacts: '61 visits · no earlier claims', plus: true },
  { id: '1950', customer: 'Priya N.', custId: 'pn', what: 'Ceramic plate', claimed: 300, reported: '12 Nov', status: 'Paid', paid: 300, visit: 'Dishes · 1 hr · Rekha M.', when: '30 min after the visit', custFacts: '6 visits · no earlier claims', partnerFacts: '188 visits · no earlier claims' },
  { id: '1921', customer: 'Rohan G.', custId: 'rg', what: 'Phone screen', claimed: 6000, reported: '10 Nov', status: 'Rejected', reason: 'Phone was not part of the visit area', visit: 'General · 1.5 hr · Geeta K.', when: '2 days after the visit, after 24 hr', custFacts: '4 visits · 1 earlier claim', partnerFacts: '77 visits · 2 earlier claims' },
];

/** Damage cover per visit, and with Plus membership. */
export const COVER = 2000;
export const COVER_PLUS = 10000;

export const claimTone = (c: Claim): TagTone => c.status === 'Over 1 day' ? 'r' : c.status === 'Paid' ? 'n' : c.status === 'Rejected' ? 'x' : 'y';
export const claimLabel = (c: Claim) => c.status === 'Paid' ? `Paid ${inr(c.paid ?? c.claimed)}` : c.status;
/** Still waiting for a decision. */
export const claimOpen = (c: Claim) => c.status === 'To decide' || c.status === 'Over 1 day';

export type ClaimFilter = 'decide' | 'approved' | 'rejected';
export const claimMatches = (c: Claim, f: ClaimFilter) => f === 'decide' ? claimOpen(c) : f === 'approved' ? c.status === 'Paid' : c.status === 'Rejected';

export const CLAIM_PHOTOS = ['Photo 1', 'Photo 2', "Helper's photo"];
export const CLAIM_REJECT_REASONS = ['Reported after 24 hours', 'Item was already damaged in check-in photo', 'Not part of the visit area'];
