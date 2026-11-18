/** Sample data and constants for the booking screens (design pages 03, 10, 12, 16, 17). */
import { decisions, taskName, type TFn } from '@/domain';
import type { CustomerState } from '../../state';

/* ---- 7 · Duration and time ---- */
export const DURATIONS = [30, 60, 90, 120, 150, 180];
export type DayId = NonNullable<CustomerState['day']>;
export const DAYS: readonly { id: DayId; en: string; hi: string; pa: string }[] = [
  { id: 'today', en: 'Today', hi: 'आज', pa: 'ਅੱਜ' },
  { id: 'tomorrow', en: 'Tomorrow', hi: 'कल', pa: 'ਕੱਲ੍ਹ' },
  { id: 'wed', en: 'Wed 18', hi: 'बुध 18', pa: 'ਬੁੱਧ 18' },
];
export const dayById = (id: DayId) => DAYS.find((d) => d.id === id)!;

/* ---- 8 · Confirm ---- */
const DEFAULT_TASKS = ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];
/** Chores the booking screens add that are not in the shared task list: [Hindi, Punjabi]. */
export const EXTRA_TASK_NAMES: Record<string, [string, string]> = {
  'Kitchen slab scrub': ['रसोई की स्लैब रगड़ना', 'ਰਸੋਈ ਦੀ ਸਲੈਬ ਰਗੜਨਾ'],
  Dishes: ['बर्तन', 'ਭਾਂਡੇ'],
  'Cabinet fronts': ['कैबिनेट के आगे का हिस्सा', 'ਕੈਬਿਨੇਟ ਦਾ ਅਗਲਾ ਹਿੱਸਾ'],
  'Clean fans': ['पंखे साफ़ करना', 'ਪੱਖੇ ਸਾਫ਼ ਕਰਨਾ'],
};
/** A chore in the current language (shared list first, then the booking extras). */
export const choreName = (t: TFn, task: string) => {
  const x = EXTRA_TASK_NAMES[task];
  return x ? t(task, x[0], x[1]) : taskName(t, task);
};
/** "Sweep, mop, dusting, surfaces" for the default chores, else the ticked list. */
export function taskSummary(t: TFn, tasks: string[]) {
  if (tasks.length === 3 && DEFAULT_TASKS.every((d) => tasks.includes(d))) return t('Sweep, mop, dusting, surfaces', 'झाड़ू, पोछा, धूल, सतहें', 'ਝਾੜੂ, ਪੋਚਾ, ਧੂੜ, ਸਤ੍ਹਾ');
  return tasks.map((x) => choreName(t, x)).join(', ');
}
/** Helper assigned to a scheduled booking in the prototype. */
export const SCHEDULED_HELPER = 'Rekha M.';

/* ---- 34 · Supplies ---- */
export const SUPPLIES = [
  { id: 'floor', name: 'Floor cleaner, 500 ml', hi: 'फ़र्श क्लीनर, 500 मि.ली.', pa: 'ਫ਼ਰਸ਼ ਕਲੀਨਰ, 500 ਮਿ.ਲੀ.', price: 89 },
  { id: 'dish', name: 'Dish liquid, 250 ml', hi: 'बर्तन धोने का लिक्विड, 250 मि.ली.', pa: 'ਭਾਂਡੇ ਧੋਣ ਵਾਲਾ ਲਿਕਵਿਡ, 250 ਮਿ.ਲੀ.', price: 65 },
  { id: 'mop', name: 'Mop refill', hi: 'पोछे का रिफ़िल', pa: 'ਪੋਚੇ ਦਾ ਰੀਫ਼ਿਲ', price: 149 },
  { id: 'cloth', name: 'Microfibre cloths, 3', hi: 'माइक्रोफ़ाइबर कपड़े, 3', pa: 'ਮਾਈਕ੍ਰੋਫ਼ਾਈਬਰ ਕੱਪੜੇ, 3', price: 99 },
  { id: 'bath', name: 'Bathroom cleaner, 500 ml', hi: 'बाथरूम क्लीनर, 500 मि.ली.', pa: 'ਬਾਥਰੂਮ ਕਲੀਨਰ, 500 ਮਿ.ਲੀ.', price: 95 },
];
export const DEFAULT_SUPPLIES: Record<string, number> = { floor: 1, dish: 1 };

/* ---- 42 · Book for family ---- */
export const FAMILY_HOMES = [
  {
    label: "Parents' home", labelHi: 'माता-पिता का घर', labelPa: 'ਮਾਪਿਆਂ ਦਾ ਘਰ',
    line: 'House 18, Sector 21', lineHi: 'मकान 18, सेक्टर 21', linePa: 'ਮਕਾਨ 18, ਸੈਕਟਰ 21',
    contact: 'Mrs Kapoor', contactHi: 'श्रीमती कपूर', contactPa: 'ਸ੍ਰੀਮਤੀ ਕਪੂਰ', phone: '98111 20034',
  },
  {
    label: "Sister's flat", labelHi: 'बहन का फ़्लैट', labelPa: 'ਭੈਣ ਦਾ ਫ਼ਲੈਟ',
    line: 'B-702, Green Towers, Sector 50', lineHi: 'B-702, ग्रीन टावर्स, सेक्टर 50', linePa: 'B-702, ਗ੍ਰੀਨ ਟਾਵਰਜ਼, ਸੈਕਟਰ 50',
    contact: 'Priya Kumar', contactHi: 'प्रिया कुमार', contactPa: 'ਪ੍ਰਿਆ ਕੁਮਾਰ', phone: '98990 41127',
  },
];

/** The sample address texts shown in Hindi and Punjabi; anything the customer typed is shown as written. */
const SAMPLE_ADDRESS_TEXT: Record<string, [string, string]> = {
  Home: ['घर', 'ਘਰ'],
  'Flat 204, Block C': ['फ़्लैट 204, ब्लॉक सी', 'ਫ਼ਲੈਟ 204, ਬਲਾਕ ਸੀ'],
  ...Object.fromEntries(FAMILY_HOMES.flatMap((h) => [[h.label, [h.labelHi, h.labelPa]], [h.line, [h.lineHi, h.linePa]]])),
};
export const addressText = (t: TFn, s: string) => {
  const x = SAMPLE_ADDRESS_TEXT[s];
  return x ? t(s, x[0], x[1]) : s;
};

/* ---- 43 · Deep clean builder ---- */
export const ROOMS = [
  { id: 'bath', name: 'Bathrooms', nameHi: 'बाथरूम', namePa: 'ਬਾਥਰੂਮ', sub: '45 min each', subHi: 'हर एक 45 मिनट', subPa: 'ਹਰ ਇੱਕ 45 ਮਿੰਟ', min: 45, max: 6 },
  { id: 'kitchen', name: 'Kitchen with cabinets', nameHi: 'कैबिनेट के साथ रसोई', namePa: 'ਕੈਬਿਨੇਟ ਸਮੇਤ ਰਸੋਈ', sub: '1 hr', subHi: '1 घंटा', subPa: '1 ਘੰਟਾ', min: 60, max: 1 },
  { id: 'fridge', name: 'Fridge inside', nameHi: 'फ़्रिज अंदर से', namePa: 'ਫ਼ਰਿੱਜ ਅੰਦਰੋਂ', sub: '30 min', subHi: '30 मिनट', subPa: '30 ਮਿੰਟ', min: 30, max: 1 },
  { id: 'fans', name: 'Ceiling fans', nameHi: 'छत के पंखे', namePa: 'ਛੱਤ ਦੇ ਪੱਖੇ', sub: '15 min each', subHi: 'हर एक 15 मिनट', subPa: 'ਹਰ ਇੱਕ 15 ਮਿੰਟ', min: 15, max: 6 },
];
export const DEFAULT_ROOMS: Record<string, number> = { bath: 2, kitchen: 1, fridge: 0, fans: 2 };

/** Work minutes, price and how long it takes on the clock with one or two helpers. */
export function deepCleanEstimate(qty: Record<string, number>, twoHelpers: boolean) {
  const minutes = ROOMS.reduce((a, r) => a + (qty[r.id] ?? 0) * r.min, 0);
  const price = Math.round((minutes / 30) * decisions.prices.kitchenBath);
  const together = Math.ceil(minutes / 2 / 15) * 15;
  return { minutes, price, together, wall: twoHelpers ? together : minutes };
}

/* ---- 56 · Voice booking ---- */
export const VOICE_PULSE_MS = 450;
export const VOICE_LISTEN_MS = 2600;

/* ---- 57 · Photo estimate ---- */
export const PHOTO_ANALYSE_MS = 1800;
export const PHOTO_SUGGESTED = ['Kitchen slab scrub', 'Dishes', 'Cabinet fronts'];

/* ---- 63 · Not-at-home visit ---- */
export const ENTRIES = [
  {
    k: 'guard', title: 'Key with the guard', hi: 'चाबी गार्ड के पास', pa: 'ਚਾਬੀ ਗਾਰਡ ਕੋਲ',
    sub: "Guard checks the helper's ID card", subHi: 'गार्ड हेल्पर का ID कार्ड जाँचेगा', subPa: 'ਗਾਰਡ ਹੈਲਪਰ ਦਾ ID ਕਾਰਡ ਜਾਂਚੇਗਾ',
    detail: 'Leave the key at Gate 2. The guard sees Sunita’s photo and ID before handing it over.',
    detailHi: 'चाबी गेट 2 पर छोड़ दें। चाबी देने से पहले गार्ड सुनीता की फ़ोटो और ID देखेगा।',
    detailPa: 'ਚਾਬੀ ਗੇਟ 2 ਤੇ ਛੱਡ ਦਿਓ। ਚਾਬੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਗਾਰਡ ਸੁਨੀਤਾ ਦੀ ਫ਼ੋਟੋ ਅਤੇ ID ਦੇਖੇਗਾ।',
  },
  {
    k: 'neighbour', title: 'Neighbour opens the door', hi: 'पड़ोसी दरवाज़ा खोलेंगे', pa: 'ਗੁਆਂਢੀ ਦਰਵਾਜ਼ਾ ਖੋਲ੍ਹਣਗੇ',
    sub: 'We send them the door code', subHi: 'हम उन्हें दरवाज़े का कोड भेजेंगे', subPa: 'ਅਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ ਭੇਜਾਂਗੇ',
    detail: 'We send Flat 203 the door code 4821 and a message when Sunita arrives.',
    detailHi: 'हम फ़्लैट 203 को दरवाज़े का कोड 4821 भेजेंगे, और सुनीता के पहुँचने पर एक संदेश।',
    detailPa: 'ਅਸੀਂ ਫ਼ਲੈਟ 203 ਨੂੰ ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ 4821 ਭੇਜਾਂਗੇ, ਅਤੇ ਸੁਨੀਤਾ ਦੇ ਪਹੁੰਚਣ ਤੇ ਇੱਕ ਸੁਨੇਹਾ।',
  },
  {
    k: 'lock', title: 'Smart lock code', hi: 'स्मार्ट लॉक कोड', pa: 'ਸਮਾਰਟ ਲੌਕ ਕੋਡ',
    sub: 'Works once, for this visit only', subHi: 'सिर्फ़ एक बार, इसी विज़िट के लिए', subPa: 'ਸਿਰਫ਼ ਇੱਕ ਵਾਰ, ਇਸੇ ਵਿਜ਼ਿਟ ਲਈ',
    detail: 'A one-time code is sent to Sunita at check-in and stops working when she leaves.',
    detailHi: 'चेक-इन पर सुनीता को एक बार का कोड भेजा जाता है, उसके जाते ही यह बंद हो जाता है।',
    detailPa: 'ਚੈੱਕ-ਇਨ ਤੇ ਸੁਨੀਤਾ ਨੂੰ ਇੱਕ ਵਾਰ ਦਾ ਕੋਡ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ, ਉਸਦੇ ਜਾਂਦੇ ਹੀ ਇਹ ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ।',
  },
];
export const PROOFS = ['Photo when the door is opened', 'Before and after photos of each room', 'Photo of the locked door at the end'];
/** PROOFS in Hindi and Punjabi. */
export const PROOF_NAMES: Record<string, [string, string]> = {
  'Photo when the door is opened': ['दरवाज़ा खुलने पर फ़ोटो', 'ਦਰਵਾਜ਼ਾ ਖੁੱਲ੍ਹਣ ਤੇ ਫ਼ੋਟੋ'],
  'Before and after photos of each room': ['हर कमरे की पहले और बाद की फ़ोटो', 'ਹਰ ਕਮਰੇ ਦੀਆਂ ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ ਦੀਆਂ ਫ਼ੋਟੋਆਂ'],
  'Photo of the locked door at the end': ['आख़िर में बंद दरवाज़े की फ़ोटो', 'ਅਖੀਰ ਵਿੱਚ ਬੰਦ ਦਰਵਾਜ਼ੇ ਦੀ ਫ਼ੋਟੋ'],
};

/** Adds `x` when it is missing, removes it when present. */
export const toggleIn = <T,>(list: T[], x: T) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]);
