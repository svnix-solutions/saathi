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
/** Punjabi for `newJob.note`. */
export const newJobNotePa = 'ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਬੱਚਿਆਂ ਦਾ ਕਮਰਾ ਕਰੋ।';

/** Seconds the partner has to accept a ringing job. */
export const offerSeconds = 24;
/** A new job rings this long after Home opens online. */
export const autoOfferMs = 4000;

/** The four shortcuts at the bottom of Home. */
export const homeShortcuts = [
  ['shield', 'My ID card', 'मेरा आईडी', 'ਮੇਰਾ ਆਈਡੀ', 'idCard'], ['clock', 'Hours', 'समय', 'ਸਮਾਂ', 'hours'],
  ['user', 'Joining', 'जुड़ना', 'ਜੁੜਨਾ', 'joining'], ['call', 'Help', 'मदद', 'ਮਦਦ', 'help'],
] as const;

/* ---------- Jobs tab ---------- */

type Tr = { en: string; hi: string; pa: string };
export type JobRow = { en: string; hi: string; pa: string; when: Tr; where: Tr; earn: number; state: 'now' | 'next' | 'later' | 'done' };
const flat204: Tr = { en: 'Flat 204, Block C', hi: 'फ़्लैट 204, ब्लॉक सी', pa: 'ਫ਼ਲੈਟ 204, ਬਲਾਕ ਸੀ' };
export const jobRows: JobRow[] = [
  { en: 'General cleaning', hi: 'सामान्य सफ़ाई', pa: 'ਆਮ ਸਫ਼ਾਈ', when: { en: '11:10 am · 1 hr', hi: 'सुबह 11:10 · 1 घंटा', pa: 'ਸਵੇਰੇ 11:10 · 1 ਘੰਟਾ' }, where: flat204, earn: 126, state: 'done' },
  { en: 'Dishes & meal prep', hi: 'बर्तन और खाना तैयारी', pa: 'ਭਾਂਡੇ ਅਤੇ ਖਾਣੇ ਦੀ ਤਿਆਰੀ', when: { en: '9:00 am · 1.5 hr', hi: 'सुबह 9:00 · 1.5 घंटा', pa: 'ਸਵੇਰੇ 9:00 · 1.5 ਘੰਟਾ' },
    where: { en: 'Block B · 0.6 km', hi: 'ब्लॉक बी · 0.6 किमी', pa: 'ਬਲਾਕ ਬੀ · 0.6 ਕਿ.ਮੀ.' }, earn: 189, state: 'done' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', pa: 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ', when: { en: '2:00 pm · 2 hr', hi: 'दोपहर 2:00 · 2 घंटे', pa: 'ਦੁਪਹਿਰ 2:00 · 2 ਘੰਟੇ' },
    where: { en: 'Block A · 1.4 km', hi: 'ब्लॉक ए · 1.4 किमी', pa: 'ਬਲਾਕ ਏ · 1.4 ਕਿ.ਮੀ.' }, earn: 206, state: 'next' },
  { en: 'Monthly plan · Nitin K.', hi: 'मासिक प्लान · नितिन के.', pa: 'ਮਹੀਨੇ ਦਾ ਪਲਾਨ · ਨਿਤਿਨ ਕੇ.', when: { en: 'Tomorrow 8:00 am · 1 hr', hi: 'कल सुबह 8:00 · 1 घंटा', pa: 'ਕੱਲ੍ਹ ਸਵੇਰੇ 8:00 · 1 ਘੰਟਾ' },
    where: flat204, earn: 126, state: 'later' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', pa: 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ', when: { en: 'Tue 2 pm · 2 hr', hi: 'मंगल दोपहर 2 बजे · 2 घंटे', pa: 'ਮੰਗਲ ਦੁਪਹਿਰ 2 ਵਜੇ · 2 ਘੰਟੇ' },
    where: { en: 'Block A', hi: 'ब्लॉक ए', pa: 'ਬਲਾਕ ਏ' }, earn: 206, state: 'later' },
];

/* ---------- design page 22 · check in / check out ---------- */

/** Check-out photos in the order "+ Add" fills them, with their Hindi labels. */
export const checkoutPhotos = ['Floor', 'Kitchen', 'Bathroom', 'Room'];
export const checkoutPhotosDefault = ['Floor', 'Kitchen'];
export const photoNamesHi: Record<string, string> = { Floor: 'फ़र्श', Kitchen: 'रसोई', Bathroom: 'बाथरूम', Room: 'कमरा' };
export const photoNamesPa: Record<string, string> = { Floor: 'ਫ਼ਰਸ਼', Kitchen: 'ਰਸੋਈ', Bathroom: 'ਬਾਥਰੂਮ', Room: 'ਕਮਰਾ' };

/** Seconds of "Checking location…" on check-in. */
export const locateMs = 1200;
/** Selfie upload: +20 % every 350 ms. */
export const uploadStep = { pct: 20, ms: 350 };

/* ---------- design page 26 · shift check ---------- */

export type ShiftCheck = 'uniform' | 'id' | 'phone';
export const shiftChecks: { k: ShiftCheck; en: string; hi: string; pa: string }[] = [
  { k: 'uniform', en: 'Wearing my uniform', hi: 'मैंने वर्दी पहनी है', pa: 'ਮੈਂ ਵਰਦੀ ਪਾਈ ਹੈ' },
  { k: 'id', en: 'ID card with me', hi: 'आईडी कार्ड मेरे पास है', pa: 'ਆਈਡੀ ਕਾਰਡ ਮੇਰੇ ਕੋਲ ਹੈ' },
  { k: 'phone', en: 'Phone charged above 30%', hi: 'फ़ोन 30% से ज़्यादा चार्ज है', pa: 'ਫ਼ੋਨ 30% ਤੋਂ ਵੱਧ ਚਾਰਜ ਹੈ' },
];
export const shiftChecksStart: Record<ShiftCheck, boolean> = { uniform: true, id: true, phone: false };

/* ---------- design page 27 · route and time off ---------- */

export const routeSteps: { icon: IconName; text: string; hi: string; pa: string; d: number }[] = [
  { icon: 'chevron', text: 'Head north on Main Road', hi: 'मेन रोड पर उत्तर की ओर चलें', pa: 'ਮੇਨ ਰੋਡ ਤੇ ਉੱਤਰ ਵੱਲ ਚੱਲੋ', d: 300 },
  { icon: 'chevron', text: 'Turn right at the market', hi: 'बाज़ार से दाएँ मुड़ें', pa: 'ਬਾਜ਼ਾਰ ਤੋਂ ਸੱਜੇ ਮੁੜੋ', d: 350 },
  { icon: 'pin', text: 'Gate 2, near the park', hi: 'गेट 2, पार्क के पास', pa: 'ਗੇਟ 2, ਪਾਰਕ ਦੇ ਕੋਲ', d: 150 },
  { icon: 'home', text: 'Block C, take the lift to 2nd floor', hi: 'ब्लॉक सी, लिफ़्ट से दूसरी मंज़िल', pa: 'ਬਲਾਕ ਸੀ, ਲਿਫ਼ਟ ਨਾਲ ਦੂਜੀ ਮੰਜ਼ਿਲ', d: 0 },
];
/** Minutes to the door when the route opens; one minute less every `etaStepMs`. */
export const etaStart = 6;
export const etaStepMs = 5000;

export const timeOffDays = [17, 18, 19, 20, 21, 22, 23];
export const timeOffReasons = [['Family', 'परिवार', 'ਪਰਿਵਾਰ'], ['Not well', 'तबियत ठीक नहीं', 'ਤਬੀਅਤ ਠੀਕ ਨਹੀਂ'], ['Festival', 'त्योहार', 'ਤਿਉਹਾਰ'], ['Other', 'अन्य', 'ਹੋਰ']] as const;
/** `when` and `why` carry English, Hindi and Punjabi; a reason typed by the partner is the same in all three. */
export type TimeOffRequest = { when: { en: string; hi: string; pa: string }; why: { en: string; hi: string; pa: string }; status: 'Approved' | 'Pending' };
export const timeOffApproved: TimeOffRequest[] = [{
  when: { en: 'Sun 30 Nov', hi: 'रवि 30 नवंबर', pa: 'ਐਤ 30 ਨਵੰਬਰ' }, why: { en: 'Weekly day off', hi: 'हफ़्ते की छुट्टी', pa: 'ਹਫ਼ਤੇ ਦੀ ਛੁੱਟੀ' }, status: 'Approved',
}];

/* ---------- design page 28 · rate the customer ---------- */

export const homeTags = [
  ['Respectful', 'सम्मानजनक', 'ਇੱਜ਼ਤ ਨਾਲ'], ['Supplies ready', 'सामान तैयार', 'ਸਮਾਨ ਤਿਆਰ'],
  ['Clear instructions', 'साफ़ निर्देश', 'ਸਾਫ਼ ਹਦਾਇਤਾਂ'], ['Felt safe', 'सुरक्षित लगा', 'ਸੁਰੱਖਿਅਤ ਲੱਗਿਆ'],
] as const;
export const homeTagsStart = ['Respectful', 'Supplies ready'];
export const homeProblems = [
  ['Felt unsafe', 'असुरक्षित लगा', 'ਅਸੁਰੱਖਿਅਤ ਲੱਗਿਆ'], ['Abusive words', 'गाली-गलौज', 'ਗਾਲ੍ਹਾਂ ਕੱਢੀਆਂ'],
  ['Asked for extra work', 'ज़्यादा काम माँगा', 'ਵਾਧੂ ਕੰਮ ਮੰਗਿਆ'], ['Something else', 'कुछ और', 'ਕੁਝ ਹੋਰ'],
] as const;

/* ---------- design page 30 (section 56) · voice guide, demand map, photo check ---------- */

export const voiceScript = ['ब्लॉक सी में सफ़ाई का काम।', 'एक घंटा।', 'छह मिनट दूर।', 'आपको ₹126 मिलेंगे।'];
export const voiceScriptEn = ['Cleaning job in Block C.', 'One hour.', 'Six minutes away.', 'You will get ₹126.'];
/** The same script in Punjabi (read aloud when the app is in Punjabi). */
export const voiceScriptPa = ['ਬਲਾਕ ਸੀ ਵਿੱਚ ਸਫ਼ਾਈ ਦਾ ਕੰਮ।', 'ਇੱਕ ਘੰਟਾ।', 'ਛੇ ਮਿੰਟ ਦੂਰ।', 'ਤੁਹਾਨੂੰ ₹126 ਮਿਲਣਗੇ।'];
/** Reading progress: `voiceTicks` ticks of `voiceTickMs`. */
export const voiceTicks = 40;
export const voiceTickMs = 100;

type Tr3 = { en: string; hi: string; pa: string };
export type DemandArea = {
  id: string; name: Tr3; min: number; waiting: number; extra: number; busy: Tr3;
  zone: { left: number; top: number; width: number; height: number }; tone: 'r' | 'y' | 'x';
};
export const demandAreas: DemandArea[] = [
  { id: 'D', name: { en: 'Block D', hi: 'ब्लॉक डी', pa: 'ਬਲਾਕ ਡੀ' }, min: 5, waiting: 8, extra: 20, busy: { en: 'Very busy', hi: 'बहुत काम', pa: 'ਬਹੁਤ ਕੰਮ' }, zone: { left: 10, top: 110, width: 120, height: 100 }, tone: 'r' },
  { id: 'S', name: { en: 'Sector 18', hi: 'सेक्टर 18', pa: 'ਸੈਕਟਰ 18' }, min: 12, waiting: 3, extra: 0, busy: { en: 'Busy', hi: 'काम है', pa: 'ਕੰਮ ਹੈ' }, zone: { left: 150, top: 6, width: 110, height: 90 }, tone: 'y' },
  { id: 'C', name: { en: 'Block C', hi: 'ब्लॉक सी', pa: 'ਬਲਾਕ ਸੀ' }, min: 2, waiting: 0, extra: 0, busy: { en: 'Busy at 6 pm', hi: 'शाम 6 बजे', pa: 'ਸ਼ਾਮ 6 ਵਜੇ' }, zone: { left: 60, top: 0, width: 80, height: 70 }, tone: 'x' },
];

export type PhotoState = 'empty' | 'checking' | 'pass' | 'fail';
export const workPhotos = [
  { id: 'floor', label: 'Floor', labelHi: 'फ़र्श', labelPa: 'ਫ਼ਰਸ਼', title: 'Floor photo', titleHi: 'फ़र्श की फ़ोटो', titlePa: 'ਫ਼ਰਸ਼ ਦੀ ਫ਼ੋਟੋ' },
  { id: 'kitchen', label: 'Kitchen', labelHi: 'रसोई', labelPa: 'ਰਸੋਈ', title: 'Kitchen slab photo', titleHi: 'रसोई स्लैब की फ़ोटो', titlePa: 'ਰਸੋਈ ਸਲੈਬ ਦੀ ਫ਼ੋਟੋ' },
  { id: 'balcony', label: 'Balcony', labelHi: 'बालकनी', labelPa: 'ਬਾਲਕਨੀ', title: 'Balcony photo', titleHi: 'बालकनी की फ़ोटो', titlePa: 'ਬਾਲਕਨੀ ਦੀ ਫ਼ੋਟੋ' },
];
export const workPhotosStart: Record<string, PhotoState> = { floor: 'pass', kitchen: 'pass', balcony: 'fail' };
/** The simulated photo check takes this long. */
export const photoCheckMs = 1100;

/* ---------- design page 32 (section 58) · swap a job ---------- */

export type Mate = { id: string; face: Face; name: string; sub: string; subHi: string; subPa: string };
export const swapMates: Mate[] = [
  { id: 'kr', face: 'kr', name: 'Kavita R.', sub: 'Free then · 1.1 km away', subHi: 'तब खाली · 1.1 किमी दूर', subPa: 'ਉਦੋਂ ਵਿਹਲੀ · 1.1 ਕਿ.ਮੀ. ਦੂਰ' },
  { id: 'rm', face: 'rm', name: 'Rekha M.', sub: 'Free then · 1.6 km away', subHi: 'तब खाली · 1.6 किमी दूर', subPa: 'ਉਦੋਂ ਵਿਹਲੀ · 1.6 ਕਿ.ਮੀ. ਦੂਰ' },
];
/** A teammate answers a swap request after this long. */
export const swapReplyMs = 2000;
