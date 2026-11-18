/** Prototype sample data for the partners pages (partners list, one partner, sign-ups). */
import type { ProfessionId } from '@/data/professions';

/* ---------------- partners list ---------------- */

/** The three checks a new partner needs before approval, in `Partner['docs']` order. */
export const PARTNER_CHECKS = ['Aadhaar and PAN', 'Police verification', 'Training completed'];

/** Which services start switched on in the "Services & pricing" card. */
export const LIVE_SERVICES: Record<string, boolean> = { general: true, kitchenBath: true, dishes: true, laundry: true, custom: false };

/* ---------------- one partner ---------------- */

export type PartnerDoc = { label: string; status: string; ok: boolean; detail: string };

export const partnerDocs: PartnerDoc[] = [
  { label: 'Aadhaar ···· 4821', status: 'Verified', ok: true, detail: 'Front and back photos checked on 14 Oct 2026 by Ops lead. Name and face match.' },
  { label: 'PAN ······234F', status: 'Verified', ok: true, detail: 'ABCDE1234F · name matches Aadhaar. Checked 14 Oct 2026.' },
  { label: 'Police verification', status: 'Till Oct 2027', ok: true, detail: 'Certificate from Sector 20 police station, issued 20 Oct 2026, valid for one year.' },
  { label: 'Bank · SBI ···· 4821', status: 'Verified', ok: true, detail: 'Account holder: Sunita Devi · IFSC SBIN0001234 · ₹1 test deposit confirmed.' },
  { label: 'Training', status: '2 of 5 lessons', ok: false, detail: 'Done: 1 Welcome and safety, 2 General cleaning. Left: 3 Kitchen & bath, 4 Laundry care, 5 Talking to customers.' },
];

/** ID, when, service, customer, check-in, rated, earned. */
export type JobRow = [string, string, string, string, string, string, string];

/** Page 1 of the partner's recent jobs. */
export const recentJobs: JobRow[] = [
  ['#2041', 'Today 11:08', 'General · 1 hr', 'Nitin K.', 'On time', '4 / 5', '₹126'],
  ['#2012', '14 Nov', 'General · 1 hr', 'Nitin K.', 'On time', '5 / 5', '₹126'],
  ['#1990', '13 Nov', 'Laundry · 1.5 hr', 'Farah A.', 'On time', '5 / 5', '₹214'],
  ['#1987', '13 Nov', 'General · 1 hr', 'Nitin K.', '4 min late', '5 / 5', '₹126'],
  ['#1971', '12 Nov', 'Kitchen & bath · 2 hr', 'Meera S.', 'On time', '5 / 5', '₹412'],
  ['#1960', '12 Nov', 'Dishes · 30 min', 'Arjun P.', 'On time', '', '₹63'],
];

/** Page 2 of the partner's recent jobs. */
export const olderJobs: JobRow[] = [
  ['#1944', '11 Nov', 'General · 1 hr', 'Ritu S.', 'On time', '5 / 5', '₹126'],
  ['#1931', '11 Nov', 'Dishes · 1 hr', 'Arjun P.', 'On time', '5 / 5', '₹126'],
  ['#1920', '10 Nov', 'General · 1.5 hr', 'Nitin K.', 'On time', '4 / 5', '₹190'],
  ['#1902', '9 Nov', 'Laundry · 1 hr', 'Farah A.', '6 min late', '5 / 5', '₹142'],
  ['#1896', '8 Nov', 'General · 1 hr', 'Sameer T.', 'On time', '3 / 5', '₹126'],
  ['#1880', '8 Nov', 'General · 1 hr', 'Nitin K.', 'On time', '5 / 5', '₹126'],
];

export const pauseReasons = ['Low rating, needs a lesson', 'Document expired', 'Safety complaint being checked', 'Asked for a break'];

/* ---------------- sign-ups ---------------- */

export type SignupStatus = 'check' | 'filling' | 'sent' | 'approved' | 'rejected';
export type SignupRef = { name: string; phone: string; rel: string; ok: boolean };
export type Signup = {
  id: string; name: string; wait: string; late?: boolean; zone: string; note: string; status: SignupStatus;
  phone: string; email: string; lang: string; aadhaar: string; pan: string; refs: SignupRef[]; checks: boolean[]; reason?: string;
  /** the work she signed up for; certificates come from the document rules on the professions page */
  prof: ProfessionId; specs: string[];
};

const refsSunita: SignupRef[] = [
  { name: 'Kamla Devi', phone: '+91 98220 14567', rel: 'neighbour', ok: true },
  { name: 'Ramesh Kumar', phone: '+91 98765 43210', rel: 'past employer', ok: true },
];

export const initialSignups: Signup[] = [
  { id: 'sunita', prof: 'house_help', specs: ['deep_clean'], name: 'Sunita Devi', wait: '2 hr', zone: 'Block C', note: 'all 5 steps done', status: 'check', phone: '+91 98111 20034', email: 'sunita.devi@example.com', lang: 'Hindi', aadhaar: '4821', pan: 'ABCDE1234F', refs: refsSunita, checks: [true, true, true, false] },
  { id: 'pooja', prof: 'nurse', specs: ['elderly'], name: 'Pooja Verma', wait: '5 hr', zone: 'Block A', note: 'all 5 steps done', status: 'check', phone: '+91 98990 31245', email: 'pooja.v@example.com', lang: 'Hindi, English', aadhaar: '7310', pan: 'BQKPV5521L', refs: [{ name: 'Geeta Rawat', phone: '+91 99100 22341', rel: 'neighbour', ok: true }, { name: 'Anil Mehra', phone: '+91 98110 77812', rel: 'past employer', ok: true }], checks: [false, false, false, false] },
  { id: 'lata', prof: 'house_help', specs: [], name: 'Lata Sharma', wait: '1 day', late: true, zone: 'Block D', note: 'PAN photo sent again', status: 'check', phone: '+91 97170 55420', email: 'lata.sharma@example.com', lang: 'Hindi', aadhaar: '1196', pan: 'CMRPS8830K', refs: [{ name: 'Usha Rani', phone: '+91 98180 66120', rel: 'neighbour', ok: true }, { name: 'Vikas Jain', phone: '+91 98731 40021', rel: 'past employer', ok: true }], checks: [false, true, true, false] },
  { id: 'meena', prof: 'house_help', specs: ['cooking'], name: 'Meena Kumari', wait: '', zone: 'Block B', note: '1 of 2 references confirmed', status: 'filling', phone: '+91 96500 11872', email: 'meena.k@example.com', lang: 'Hindi', aadhaar: '5502', pan: '—', refs: [{ name: 'Savita', phone: '+91 98100 22110', rel: 'neighbour', ok: true }, { name: 'Raj Malhotra', phone: '+91 98111 99001', rel: 'past employer', ok: false }], checks: [false, false, false, false] },
  { id: 'asha', prof: 'barber', specs: ['men', 'kids'], name: 'Asha Rani', wait: '', zone: 'Sector 18', note: 'Aadhaar back side missing', status: 'filling', phone: '+91 95600 77341', email: 'asha.rani@example.com', lang: 'Hindi, Punjabi', aadhaar: '—', pan: 'DLPPR2210M', refs: [{ name: 'Kusum', phone: '+91 98720 31010', rel: 'neighbour', ok: true }, { name: 'Neha Arora', phone: '+91 99580 11223', rel: 'past employer', ok: true }], checks: [false, false, false, false] },
  { id: 'rita', prof: 'home_service', specs: ['electrician'], name: 'Rita Kaur', wait: '', zone: 'Sector 21', note: 'Asked: photo not clear', status: 'sent', reason: 'Photo not clear', phone: '+91 98880 41001', email: 'rita.kaur@example.com', lang: 'Punjabi, Hindi', aadhaar: '6634', pan: 'EKKPK4410Q', refs: refsSunita, checks: [false, true, true, false] },
];

export const signupCheckLabels = ['Photos are clear and uncut', 'Name matches on both cards', 'Face matches the profile photo', 'Police verification started'];
export const sendBackReasons = ['Photo not clear', 'Name does not match', 'Card cut off', 'Wrong document'];
/** Progress label for sign-ups still filling in. */
export const signupSteps: Record<string, string> = { meena: 'Step 2 of 4', asha: 'Step 3 of 4' };
