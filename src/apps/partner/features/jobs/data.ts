/** Sample data and constants for the job flow (prototype only). */
import type { Face, IconName } from '@/native/ui';
import type { Job } from './state';

/* ---------- design page 20 · home and job request ---------- */

/** The job that rings on Home (design screen 10). */
export const newJob: Job = {
  id: '#2041', service: 'General cleaning', minutes: 60, earn: 126, address: 'Flat 204, Block C', customer: 'Nitin K.',
  note: "Please do the kids' room first.", tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'], done: [],
};
/** Hindi for `newJob.note`. */
export const newJobNoteHi = 'कृपया पहले बच्चों का कमरा करें।';

/** Seconds the partner has to accept a ringing job. */
export const offerSeconds = 24;
/** A new job rings this long after Home opens online. */
export const autoOfferMs = 4000;

/** The four shortcuts at the bottom of Home. */
export const homeShortcuts = [
  ['shield', 'My ID card', 'मेरा आईडी', 'idCard'], ['clock', 'Hours', 'समय', 'hours'], ['user', 'Joining', 'जुड़ना', 'joining'], ['call', 'Help', 'मदद', 'help'],
] as const;

/* ---------- Jobs tab ---------- */

export type JobRow = { en: string; hi: string; when: string; whereEn: string; whereHi: string; earn: number; state: 'now' | 'next' | 'later' | 'done' };
export const jobRows: JobRow[] = [
  { en: 'General cleaning', hi: 'सामान्य सफ़ाई', when: '11:10 am · 1 hr', whereEn: 'Flat 204, Block C', whereHi: 'फ़्लैट 204, ब्लॉक सी', earn: 126, state: 'done' },
  { en: 'Dishes & meal prep', hi: 'बर्तन और खाना तैयारी', when: '9:00 am · 1.5 hr', whereEn: 'Block B · 0.6 km', whereHi: 'ब्लॉक बी · 0.6 किमी', earn: 189, state: 'done' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', when: '2:00 pm · 2 hr', whereEn: 'Block A · 1.4 km', whereHi: 'ब्लॉक ए · 1.4 किमी', earn: 206, state: 'next' },
  { en: 'Monthly plan · Nitin K.', hi: 'मासिक प्लान · नितिन के.', when: 'Tomorrow 8:00 am · 1 hr', whereEn: 'Flat 204, Block C', whereHi: 'फ़्लैट 204, ब्लॉक सी', earn: 126, state: 'later' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', when: 'Tue 2 pm · 2 hr', whereEn: 'Block A', whereHi: 'ब्लॉक ए', earn: 206, state: 'later' },
];

/* ---------- design page 22 · check in / check out ---------- */

/** Check-out photos in the order "+ Add" fills them, with their Hindi labels. */
export const checkoutPhotos = ['Floor', 'Kitchen', 'Bathroom', 'Room'];
export const checkoutPhotosDefault = ['Floor', 'Kitchen'];
export const photoNamesHi: Record<string, string> = { Floor: 'फ़र्श', Kitchen: 'रसोई', Bathroom: 'बाथरूम', Room: 'कमरा' };

/** Seconds of "Checking location…" on check-in. */
export const locateMs = 1200;
/** Selfie upload: +20 % every 350 ms. */
export const uploadStep = { pct: 20, ms: 350 };

/* ---------- design page 26 · shift check ---------- */

export type ShiftCheck = 'uniform' | 'id' | 'phone';
export const shiftChecks: { k: ShiftCheck; en: string; hi: string }[] = [
  { k: 'uniform', en: 'Wearing my uniform', hi: 'मैंने वर्दी पहनी है' },
  { k: 'id', en: 'ID card with me', hi: 'आईडी कार्ड मेरे पास है' },
  { k: 'phone', en: 'Phone charged above 30%', hi: 'फ़ोन 30% से ज़्यादा चार्ज है' },
];
export const shiftChecksStart: Record<ShiftCheck, boolean> = { uniform: true, id: true, phone: false };

/* ---------- design page 27 · route and time off ---------- */

export const routeSteps: { icon: IconName; text: string; d: string }[] = [
  { icon: 'chevron', text: 'Head north on Main Road', d: '300 m' },
  { icon: 'chevron', text: 'Turn right at the market', d: '350 m' },
  { icon: 'pin', text: 'Gate 2, near the park', d: '150 m' },
  { icon: 'home', text: 'Block C, take the lift to 2nd floor', d: '' },
];
/** Minutes to the door when the route opens; one minute less every `etaStepMs`. */
export const etaStart = 6;
export const etaStepMs = 5000;

export const timeOffDays = [17, 18, 19, 20, 21, 22, 23];
export const timeOffReasons = [['Family', 'परिवार'], ['Not well', 'तबियत ठीक नहीं'], ['Festival', 'त्योहार'], ['Other', 'अन्य']] as const;
export type TimeOffRequest = { when: string; why: string; status: 'Approved' | 'Pending' };
export const timeOffApproved: TimeOffRequest[] = [{ when: 'Sun 30 Nov', why: 'Weekly day off', status: 'Approved' }];

/* ---------- design page 28 · rate the customer ---------- */

export const homeTags = [['Respectful', 'सम्मानजनक'], ['Supplies ready', 'सामान तैयार'], ['Clear instructions', 'साफ़ निर्देश'], ['Felt safe', 'सुरक्षित लगा']] as const;
export const homeTagsStart = ['Respectful', 'Supplies ready'];
export const homeProblems = ['Felt unsafe', 'Abusive words', 'Asked for extra work', 'Something else'];

/* ---------- design page 30 (section 56) · voice guide, demand map, photo check ---------- */

export const voiceScript = ['ब्लॉक सी में सफ़ाई का काम।', 'एक घंटा।', 'छह मिनट दूर।', 'आपको ₹126 मिलेंगे।'];
export const voiceScriptEn = ['Cleaning job in Block C.', 'One hour.', 'Six minutes away.', 'You will get ₹126.'];
/** Reading progress: `voiceTicks` ticks of `voiceTickMs`. */
export const voiceTicks = 40;
export const voiceTickMs = 100;

export type DemandArea = {
  id: string; name: string; min: number; waiting: number; extra: number; busy: string;
  zone: { left: number; top: number; width: number; height: number }; tone: 'r' | 'y' | 'x';
};
export const demandAreas: DemandArea[] = [
  { id: 'D', name: 'Block D', min: 5, waiting: 8, extra: 20, busy: 'Very busy', zone: { left: 10, top: 110, width: 120, height: 100 }, tone: 'r' },
  { id: 'S', name: 'Sector 18', min: 12, waiting: 3, extra: 0, busy: 'Busy', zone: { left: 150, top: 6, width: 110, height: 90 }, tone: 'y' },
  { id: 'C', name: 'Block C', min: 2, waiting: 0, extra: 0, busy: 'Busy at 6 pm', zone: { left: 60, top: 0, width: 80, height: 70 }, tone: 'x' },
];

export type PhotoState = 'empty' | 'checking' | 'pass' | 'fail';
export const workPhotos = [
  { id: 'floor', label: 'Floor', title: 'Floor photo' },
  { id: 'kitchen', label: 'Kitchen', title: 'Kitchen slab photo' },
  { id: 'balcony', label: 'Balcony', title: 'Balcony photo' },
];
export const workPhotosStart: Record<string, PhotoState> = { floor: 'pass', kitchen: 'pass', balcony: 'fail' };
/** The simulated photo check takes this long. */
export const photoCheckMs = 1100;

/* ---------- design page 32 (section 58) · swap a job ---------- */

export type Mate = { id: string; face: Face; name: string; sub: string };
export const swapMates: Mate[] = [
  { id: 'kr', face: 'kr', name: 'Kavita R.', sub: 'Free then · 1.1 km away' },
  { id: 'rm', face: 'rm', name: 'Rekha M.', sub: 'Free then · 1.6 km away' },
];
/** A teammate answers a swap request after this long. */
export const swapReplyMs = 2000;
