/** Sample data and small pure helpers for the earnings feature (prototype values from the design). */
import type { TFn } from '@/domain';
import type { IconName } from '@/native/ui';

/** A piece of sample text shown on screen, in English, Hindi and Punjabi. */
export type Txt = { en: string; hi: string; pa: string };
/** `Txt` in the current language. */
export const tx = (t: TFn, s: Txt) => t(s.en, s.hi, s.pa);

/* ---------- earnings (design page 20, screen 12) ---------- */

/** Day names for the M–S bars, English, Hindi and Punjabi. */
export const dayNames: readonly (readonly [string, string, string])[] = [
  ['Monday', 'सोमवार', 'ਸੋਮਵਾਰ'], ['Tuesday', 'मंगलवार', 'ਮੰਗਲਵਾਰ'], ['Wednesday', 'बुधवार', 'ਬੁੱਧਵਾਰ'], ['Thursday', 'गुरुवार', 'ਵੀਰਵਾਰ'],
  ['Friday', 'शुक्रवार', 'ਸ਼ੁੱਕਰਵਾਰ'], ['Saturday', 'शनिवार', 'ਸ਼ਨੀਵਾਰ'], ['Sunday', 'रविवार', 'ਐਤਵਾਰ'],
];
/** One-letter day labels under the bars, English, Hindi and Punjabi. */
export const dayLetters: readonly (readonly [string, string, string])[] = [
  ['M', 'सो', 'ਸੋ'], ['T', 'मं', 'ਮੰ'], ['W', 'बु', 'ਬੁੱ'], ['T', 'गु', 'ਵੀ'], ['F', 'शु', 'ਸ਼ੁੱ'], ['S', 'श', 'ਸ਼'], ['S', 'र', 'ਐ'],
];

/** The bar for "today" (Saturday in the design). */
export const TODAY_INDEX = 5;

/** Each day's earnings as drawn: 46 / 62 / 38 / 80 / 55 / 100 / 8 % of ₹640, with today = today's total + ₹228. */
export function weekDayTotals(todayTotal: number) {
  const days = [0.46, 0.62, 0.38, 0.8, 0.55, 1, 0.08].map((p) => Math.round(p * 640));
  days[TODAY_INDEX] = todayTotal + 228;
  return days;
}

/* ---------- take out earnings (design page 26, screen 35) ---------- */

export type Payout = { label: Txt; date: Txt; amount: number };
export const startBalance = 2846;
export const weeklyPayout: Txt = { en: 'Weekly payout', hi: 'हफ़्ते का भुगतान', pa: 'ਹਫ਼ਤੇ ਦਾ ਭੁਗਤਾਨ' };
export const takenEarly: Txt = { en: 'Taken early', hi: 'पहले निकाला', pa: 'ਪਹਿਲਾਂ ਕੱਢਿਆ' };
export const todayTxt: Txt = { en: 'Today', hi: 'आज', pa: 'ਅੱਜ' };
export const payoutHistory: Payout[] = [
  { label: weeklyPayout, date: { en: 'Mon 9 Nov', hi: 'सोम, 9 नवंबर', pa: 'ਸੋਮ, 9 ਨਵੰਬਰ' }, amount: 2610 },
  { label: takenEarly, date: { en: 'Thu 5 Nov', hi: 'गुरु, 5 नवंबर', pa: 'ਵੀਰ, 5 ਨਵੰਬਰ' }, amount: 800 },
  { label: weeklyPayout, date: { en: 'Mon 2 Nov', hi: 'सोम, 2 नवंबर', pa: 'ਸੋਮ, 2 ਨਵੰਬਰ' }, amount: 1945 },
];

/** "All" plus the fixed amounts the partner can take out now (only those above the fee, no repeats). */
export const payoutChoices = (balance: number, fee: number) =>
  [balance, 2000, 1000, 500].filter((v, i, a) => v <= balance && v > fee && a.indexOf(v) === i);

/* ---------- planner (design page 30, screen 50) ---------- */

export const plannerSlots: { id: string; label: Txt; amt: number }[] = [
  { id: 'sat-am', label: { en: 'Sat 7 to 10 am', hi: 'शनि सुबह 7 से 10', pa: 'ਸ਼ਨੀ ਸਵੇਰੇ 7 ਤੋਂ 10' }, amt: 520 },
  { id: 'sat-pm', label: { en: 'Sat 5 to 8 pm', hi: 'शनि शाम 5 से 8', pa: 'ਸ਼ਨੀ ਸ਼ਾਮ 5 ਤੋਂ 8' }, amt: 380 },
  { id: 'sun-am', label: { en: 'Sun 8 to 11 am', hi: 'रवि सुबह 8 से 11', pa: 'ਐਤ ਸਵੇਰੇ 8 ਤੋਂ 11' }, amt: 460 },
];
export const PER_HOUR = 130;
export const earnedThisWeek = 2846;
export const extraHourChoices = [0, 2, 4, 6];
export const goalChoices = [3000, 4000, 5000, 6000];

/** What the picked slots and extra weekday hours add up to. */
export const plannedEarnings = (picked: string[], extraHrs: number) =>
  plannerSlots.filter((s) => picked.includes(s.id)).reduce((a, s) => a + s.amt, 0) + extraHrs * PER_HOUR;

/* ---------- benefits (design page 31, screen 51) ---------- */

export type Benefit = { id: string; icon: IconName; title: Txt; sub: Txt; more: Txt[]; locked?: boolean; active?: boolean };
export const benefits: Benefit[] = [
  { id: 'acc', icon: 'shield', active: true,
    title: { en: 'Accident cover · active', hi: 'दुर्घटना बीमा · चालू', pa: 'ਹਾਦਸਾ ਬੀਮਾ · ਚਾਲੂ' },
    sub: { en: 'Up to ₹2,00,000 while on a job or travelling to one', hi: 'काम पर या काम पर जाते समय ₹2,00,000 तक', pa: 'ਕੰਮ ਤੇ ਜਾਂ ਕੰਮ ਤੇ ਜਾਂਦੇ ਸਮੇਂ ₹2,00,000 ਤੱਕ' },
    more: [
      { en: 'Covers hospital bills and loss of income', hi: 'अस्पताल का बिल और कमाई का नुकसान दोनों', pa: 'ਹਸਪਤਾਲ ਦਾ ਬਿੱਲ ਅਤੇ ਕਮਾਈ ਦਾ ਨੁਕਸਾਨ ਦੋਵੇਂ' },
      { en: 'Starts when you go online, ends when you go offline', hi: 'ऑनलाइन होते ही शुरू, ऑफ़लाइन होने पर बंद', pa: 'ਆਨਲਾਈਨ ਹੁੰਦੇ ਹੀ ਸ਼ੁਰੂ, ਆਫ਼ਲਾਈਨ ਹੋਣ ਤੇ ਬੰਦ' },
      { en: 'Policy no. SA-ACC-20418', hi: 'पॉलिसी नं. SA-ACC-20418', pa: 'ਪਾਲਿਸੀ ਨੰ. SA-ACC-20418' },
    ] },
  { id: 'health', icon: 'user',
    title: { en: 'Health check-up', hi: 'हेल्थ चेक-अप', pa: 'ਸਿਹਤ ਜਾਂਚ' },
    sub: { en: 'Free once a year · due in March', hi: 'साल में एक बार मुफ़्त · मार्च में', pa: 'ਸਾਲ ਵਿੱਚ ਇੱਕ ਵਾਰ ਮੁਫ਼ਤ · ਮਾਰਚ ਵਿੱਚ' },
    more: [
      { en: 'Blood test, BP, sugar and eye check', hi: 'खून की जाँच, BP, शुगर और आँखों की जाँच', pa: 'ਖ਼ੂਨ ਦੀ ਜਾਂਚ, BP, ਸ਼ੂਗਰ ਅਤੇ ਅੱਖਾਂ ਦੀ ਜਾਂਚ' },
      { en: 'At any partner clinic near Block C', hi: 'ब्लॉक सी के पास किसी भी पार्टनर क्लिनिक में', pa: 'ਬਲਾਕ ਸੀ ਦੇ ਨੇੜੇ ਕਿਸੇ ਵੀ ਪਾਰਟਨਰ ਕਲੀਨਿਕ ਵਿੱਚ' },
    ] },
  { id: 'sick', icon: 'clock',
    title: { en: 'Paid sick days', hi: 'बीमारी की पेड छुट्टी', pa: 'ਬਿਮਾਰੀ ਦੀ ਪੇਡ ਛੁੱਟੀ' },
    sub: { en: '2 of 6 used this year', hi: 'इस साल 6 में से 2 लीं', pa: 'ਇਸ ਸਾਲ 6 ਵਿੱਚੋਂ 2 ਲਈਆਂ' },
    more: [
      { en: 'Paid at your average day: about ₹640', hi: 'आपके आम दिन जितना: लगभग ₹640', pa: 'ਤੁਹਾਡੇ ਆਮ ਦਿਨ ਜਿੰਨਾ: ਲਗਭਗ ₹640' },
      { en: 'Tell us before 8 am on the day', hi: 'उसी दिन सुबह 8 बजे से पहले बताएँ', pa: 'ਉਸੇ ਦਿਨ ਸਵੇਰੇ 8 ਵਜੇ ਤੋਂ ਪਹਿਲਾਂ ਦੱਸੋ' },
    ] },
  { id: 'family', icon: 'home', locked: true,
    title: { en: 'Family health cover', hi: 'परिवार का हेल्थ बीमा', pa: 'ਪਰਿਵਾਰ ਦਾ ਸਿਹਤ ਬੀਮਾ' },
    sub: { en: 'Opens after 300 visits · 142 done', hi: '300 विज़िट के बाद खुलेगा · 142 हुईं', pa: '300 ਵਿਜ਼ਿਟਾਂ ਤੋਂ ਬਾਅਦ ਖੁੱਲ੍ਹੇਗਾ · 142 ਹੋਈਆਂ' },
    more: [
      { en: 'Covers you, your partner and 2 children', hi: 'आप, आपके जीवनसाथी और 2 बच्चे', pa: 'ਤੁਸੀਂ, ਤੁਹਾਡਾ ਜੀਵਨ ਸਾਥੀ ਅਤੇ 2 ਬੱਚੇ' },
      { en: '158 visits to go', hi: '158 विज़िट बाकी', pa: '158 ਵਿਜ਼ਿਟਾਂ ਬਾਕੀ' },
    ] },
];
export const claimSteps: Txt[] = [
  { en: 'Call the helpline or tap below within 7 days', hi: '7 दिन के अंदर हेल्पलाइन पर फ़ोन करें या नीचे दबाएँ', pa: '7 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਹੈਲਪਲਾਈਨ ਤੇ ਫ਼ੋਨ ਕਰੋ ਜਾਂ ਹੇਠਾਂ ਦਬਾਓ' },
  { en: 'Send a photo of the hospital bill', hi: 'अस्पताल के बिल की फ़ोटो भेजें', pa: 'ਹਸਪਤਾਲ ਦੇ ਬਿੱਲ ਦੀ ਫ਼ੋਟੋ ਭੇਜੋ' },
  { en: 'Money reaches your bank in about 10 days', hi: 'लगभग 10 दिन में पैसे बैंक में आ जाते हैं', pa: 'ਲਗਭਗ 10 ਦਿਨਾਂ ਵਿੱਚ ਪੈਸੇ ਬੈਂਕ ਵਿੱਚ ਆ ਜਾਂਦੇ ਹਨ' },
];

/* ---------- pay advance (design page 31, screen 52) ---------- */

export const advanceAmounts = [1000, 2000, 3000];
export const advanceWeeks = [4, 8];

/* ---------- kit shop (design page 31, screen 53) ---------- */

export type KitItem = { id: string; icon: IconName; name: Txt; sub: Txt; price: number; free?: boolean };
export const kitItems: KitItem[] = [
  { id: 'uniform', icon: 'shirt', name: { en: 'Uniform set', hi: 'यूनिफ़ॉर्म सेट', pa: 'ਵਰਦੀ ਸੈੱਟ' },
    sub: { en: 'First set free · size M', hi: 'पहला सेट मुफ़्त · साइज़ M', pa: 'ਪਹਿਲਾ ਸੈੱਟ ਮੁਫ਼ਤ · ਸਾਈਜ਼ M' }, price: 0, free: true },
  { id: 'gloves', icon: 'drop', name: { en: 'Gloves, 5 pairs', hi: 'दस्ताने, 5 जोड़ी', pa: 'ਦਸਤਾਨੇ, 5 ਜੋੜੇ' }, sub: { en: '₹60', hi: '₹60', pa: '₹60' }, price: 60 },
  { id: 'cloths', icon: 'sparkle', name: { en: 'Microfibre cloths, 6', hi: 'माइक्रोफ़ाइबर कपड़े, 6', pa: 'ਮਾਈਕ੍ਰੋਫ਼ਾਈਬਰ ਕੱਪੜੇ, 6' }, sub: { en: '₹120', hi: '₹120', pa: '₹120' }, price: 120 },
  { id: 'bag', icon: 'wallet', name: { en: 'Kit bag', hi: 'किट बैग', pa: 'ਕਿੱਟ ਬੈਗ' }, sub: { en: '₹180', hi: '₹180', pa: '₹180' }, price: 180 },
];

/* ---------- savings pot (design page 32, screen 58) ---------- */

export const savingsGoal = 10000;
export const savingsStart = 6400;
export const tipsPerWeek = 250;
export const perPayoutChoices = [100, 200, 300, 500];
export type SavingsLine = { label: Txt; amt: number };
export const savingsRecent: SavingsLine[] = [
  { label: { en: 'Mon 9 Nov · from payout', hi: 'सोम, 9 नवंबर · भुगतान से', pa: 'ਸੋਮ, 9 ਨਵੰਬਰ · ਭੁਗਤਾਨ ਤੋਂ' }, amt: 200 },
  { label: { en: 'Tips, last week', hi: 'टिप, पिछला हफ़्ता', pa: 'ਟਿੱਪ, ਪਿਛਲਾ ਹਫ਼ਤਾ' }, amt: 250 },
];
export const savingsTakenOut: Txt = { en: 'Today · taken out', hi: 'आज · निकाला', pa: 'ਅੱਜ · ਕੱਢਿਆ' };

/* ---------- today's pay lines (from partner state, which carries English and Hindi only) ---------- */

const payTitlePa: Record<string, string> = {
  'General cleaning': 'ਆਮ ਸਫ਼ਾਈ', 'Kitchen & bath scrub': 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ', 'Dishes & meal prep': 'ਭਾਂਡੇ ਅਤੇ ਖਾਣੇ ਦੀ ਤਿਆਰੀ',
  Dishes: 'ਭਾਂਡੇ', 'Tip from customer': 'ਗਾਹਕ ਤੋਂ ਟਿੱਪ',
};
/** A pay line's title in the current language. */
export const payTitle = (t: TFn, l: { title: string; titleHi: string; titlePa?: string }) => t(l.title, l.titleHi, l.titlePa ?? payTitlePa[l.title]);

/** A pay line's "11:10 am · 1 hr" sub-line in the current language ("सुबह 11:10 · 1 घंटा"). */
export function paySub(t: TFn, sub: string) {
  return sub.split(' · ').map((part) => {
    const time = /^(\d{1,2}):(\d{2}) (am|pm)$/.exec(part);
    if (time) {
      const h = (Number(time[1]) % 12) + (time[3] === 'pm' ? 12 : 0);
      const [hi, pa] = h < 12 ? ['सुबह', 'ਸਵੇਰੇ'] : h < 16 ? ['दोपहर', 'ਦੁਪਹਿਰ'] : h < 20 ? ['शाम', 'ਸ਼ਾਮ'] : ['रात', 'ਰਾਤ'];
      return t(part, `${hi} ${time[1]}:${time[2]}`, `${pa} ${time[1]}:${time[2]}`);
    }
    const len = /^([\d.]+) (hr|min)$/.exec(part);
    if (len) return len[2] === 'hr' ? t(part, `${len[1]} घंटा`, `${len[1]} ਘੰਟਾ`) : t(part, `${len[1]} मिनट`, `${len[1]} ਮਿੰਟ`);
    return part;
  }).join(' · ');
}

/* ---------- dates from `weekAhead` ("15 December") ---------- */

const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsHi = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const monthsPa = ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'];
const dateIn = (months: string[]) => (en: string) => en.replace(/[A-Z][a-z]+/, (m) => months[monthsEn.indexOf(m)] ?? m);
/** "15 December" → "15 दिसंबर". */
export const dateHi = dateIn(monthsHi);
/** "15 December" → "15 ਦਸੰਬਰ". */
export const datePa = dateIn(monthsPa);
