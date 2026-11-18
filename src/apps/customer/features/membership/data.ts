/** Sample data and constants for the membership feature (prototype only). */
import type { Face } from '@/native/ui';

/** Text in English, Hindi and Punjabi, translated where it is shown. */
export type Tri = { en: string; hi: string; pa: string };

/* ---- monthly plan ---- */
export const PLAN_DAYS: Tri[] = [
  { en: 'M', hi: 'सो', pa: 'ਸੋ' }, { en: 'T', hi: 'मं', pa: 'ਮੰ' }, { en: 'W', hi: 'बु', pa: 'ਬੁ' }, { en: 'T', hi: 'गु', pa: 'ਵੀ' },
  { en: 'F', hi: 'शु', pa: 'ਸ਼ੁ' }, { en: 'S', hi: 'श', pa: 'ਸ਼' }, { en: 'S', hi: 'र', pa: 'ਐ' },
];
export const PLAN_DAYS_DEFAULT = [true, true, true, true, true, true, false];
export const PLAN_TIMES = ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '4:00 pm', '5:00 pm', '6:00 pm'];
export const PLAN_LENGTHS = [30, 60, 90, 120];
export const PLAN_HELPERS: { id: string; face: Face; name: Tri }[] = [
  { id: 'Sunita D.', face: 'sd', name: { en: 'Sunita D.', hi: 'सुनीता डी.', pa: 'ਸੁਨੀਤਾ ਡੀ.' } },
  { id: 'Rekha M.', face: 'rm', name: { en: 'Rekha M.', hi: 'रेखा एम.', pa: 'ਰੇਖਾ ਐੱਮ.' } },
  { id: 'Kiran R.', face: 'kr', name: { en: 'Kiran R.', hi: 'किरण आर.', pa: 'ਕਿਰਨ ਆਰ.' } },
];

/* ---- Saathi Plus ---- */
export const PLUS_PERKS: Tri[] = [
  { en: 'First in line at busy hours', hi: 'भीड़ के समय सबसे पहले आपका नंबर', pa: 'ਭੀੜ ਵੇਲੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਡੀ ਵਾਰੀ' },
  { en: 'No busy-hour price rise', hi: 'भीड़ के समय दाम नहीं बढ़ते', pa: 'ਭੀੜ ਵੇਲੇ ਰੇਟ ਨਹੀਂ ਵਧਦਾ' },
  { en: 'Free cancel up to 15 min before', hi: '15 मिनट पहले तक मुफ़्त रद्द करें', pa: '15 ਮਿੰਟ ਪਹਿਲਾਂ ਤੱਕ ਮੁਫ਼ਤ ਰੱਦ ਕਰੋ' },
  { en: 'Double points on every visit', hi: 'हर विज़िट पर दोगुने पॉइंट', pa: 'ਹਰ ਵਿਜ਼ਿਟ ’ਤੇ ਦੁੱਗਣੇ ਪੁਆਇੰਟ' },
  { en: 'Damage cover up to ₹10,000', hi: '₹10,000 तक नुकसान की भरपाई', pa: '₹10,000 ਤੱਕ ਨੁਕਸਾਨ ਦੀ ਭਰਪਾਈ' },
];

/* ---- damage claim ---- */
/** Quick picks; the last one clears the field so the customer types the item. */
export const DAMAGE_ITEMS: Tri[] = [
  { en: 'Glass jar, kitchen shelf', hi: 'काँच का जार, रसोई की शेल्फ़', pa: 'ਕੱਚ ਦਾ ਜਾਰ, ਰਸੋਈ ਦੀ ਸ਼ੈਲਫ਼' },
  { en: 'Vase, living room', hi: 'फूलदान, बैठक', pa: 'ਗੁਲਦਾਨ, ਬੈਠਕ' },
  { en: 'Plate set', hi: 'प्लेट सेट', pa: 'ਪਲੇਟ ਸੈੱਟ' },
  { en: 'Something else', hi: 'कुछ और', pa: 'ਕੁਝ ਹੋਰ' },
];
export const OTHER_ITEM = DAMAGE_ITEMS[DAMAGE_ITEMS.length - 1];
export const CLAIM_DEFAULTS = { item: DAMAGE_ITEMS[0], value: '450', photos: 2 };
export const MAX_CLAIM_PHOTOS = 6;
/** Damage cover per visit, without and with Plus. */
export const COVER = { basic: 2000, plus: 10000 };

/* ---- shared home ---- */
export type Mate = { face?: Face; initials?: string; name: Tri; role: Tri; inSplit: boolean; invited?: boolean };
/** The shared monthly plan, per week. */
export const SHARED_WEEKLY = 258;
const CAN_BOOK: Tri = { en: 'Can book and pay', hi: 'बुक और भुगतान कर सकते हैं', pa: 'ਬੁੱਕ ਅਤੇ ਭੁਗਤਾਨ ਕਰ ਸਕਦੇ ਹਨ' };
export const FLATMATES: Mate[] = [
  { face: 'nk', name: { en: 'Nitin (you)', hi: 'नितिन (आप)', pa: 'ਨਿਤਿਨ (ਤੁਸੀਂ)' }, role: CAN_BOOK, inSplit: true },
  { face: 'rv', name: { en: 'Rahul V.', hi: 'राहुल वी.', pa: 'ਰਾਹੁਲ ਵੀ.' }, role: CAN_BOOK, inSplit: true },
  { face: 'ak', name: { en: 'Aman K.', hi: 'अमन के.', pa: 'ਅਮਨ ਕੇ.' }, role: { en: 'Pays only', hi: 'सिर्फ़ भुगतान करते हैं', pa: 'ਸਿਰਫ਼ ਭੁਗਤਾਨ ਕਰਦੇ ਹਨ' }, inSplit: true },
];
