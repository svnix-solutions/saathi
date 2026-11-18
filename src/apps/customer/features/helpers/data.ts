/** Sample data and constants for the helper screens (prototype only). */
import type { TFn } from '@/domain';
import type { Face } from '@/native/ui';

/** A piece of on-screen text in English, Hindi and Punjabi. */
export type Tri = { en: string; hi: string; pa: string };
/** `t(x.en, x.hi, x.pa)`. */
export const tr = (t: TFn, x: Tri) => t(x.en, x.hi, x.pa);

/** Helper names as the Hindi and Punjabi screens write them (state keeps the English name). */
const helperNames: Record<string, [string, string]> = {
  'Sunita D.': ['सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.'],
  'Rekha M.': ['रेखा एम.', 'ਰੇਖਾ ਐਮ.'],
  'Geeta K.': ['गीता के.', 'ਗੀਤਾ ਕੇ.'],
  'Mohan T.': ['मोहन टी.', 'ਮੋਹਨ ਟੀ.'],
  Sunita: ['सुनीता', 'ਸੁਨੀਤਾ'],
  Rekha: ['रेखा', 'ਰੇਖਾ'],
};
/** A helper's name in the current language ("Sunita D." → "सुनीता डी."); unknown names stay as they are. */
export const helperName = (t: TFn, en: string) => t(en, helperNames[en]?.[0], helperNames[en]?.[1]);

/**
 * Splits text around the words that stay in Latin script inside Hindi / Punjabi sentences ("Saathi", "WhatsApp"), so each is its
 * own text node: `<T>{latinParts(t(...))}</T>`. English renders the same.
 */
export const latinParts = (s: string) => s.split(/(Saathi|WhatsApp)/).filter(Boolean);

/** Defaults until the customer changes them. */
export const defaultFavourites = ['Sunita D.'];
export const defaultBlocked = ['Mohan T.'];

/** People on "Your helpers". */
export type HelperPerson = { n: string; face: Face; sub: Tri; first: string };
export const myHelpers: HelperPerson[] = [
  { n: 'Sunita D.', face: 'sd', sub: { en: '6 visits · you rated 5', hi: '6 विज़िट · आपने 5 दिए', pa: '6 ਵਿਜ਼ਿਟਾਂ · ਤੁਸੀਂ 5 ਦਿੱਤੇ' }, first: 'Sunita' },
  { n: 'Rekha M.', face: 'rm', sub: { en: '2 visits · you rated 4', hi: '2 विज़िट · आपने 4 दिए', pa: '2 ਵਿਜ਼ਿਟਾਂ · ਤੁਸੀਂ 4 ਦਿੱਤੇ' }, first: 'Rekha' },
];

/** Helper profile (Sunita D.). */
export const profileHelper = 'Sunita D.';
export const profileBadges: Tri[] = [
  { en: 'ID checked', hi: 'आईडी जाँची गई', pa: 'ਆਈਡੀ ਜਾਂਚੀ ਗਈ' },
  { en: 'Police verified', hi: 'पुलिस वेरिफ़ाइड', pa: 'ਪੁਲਿਸ ਵੈਰੀਫਾਈਡ' },
  { en: 'Trained', hi: 'प्रशिक्षित', pa: 'ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ' },
];
export const profileSkills: Tri[] = [
  { en: 'Floors', hi: 'फ़र्श', pa: 'ਫ਼ਰਸ਼' },
  { en: 'Kitchen scrub', hi: 'किचन रगड़ाई', pa: 'ਰਸੋਈ ਦੀ ਰਗੜਾਈ' },
  { en: 'Laundry', hi: 'कपड़े धुलाई', pa: 'ਕੱਪੜੇ ਧੁਆਈ' },
];

/** Reviews for Sunita D. */
export type Review = { who: Tri; stars: number; text: Tri; meta?: Tri; photo?: boolean; reply?: Tri };
export const reviews: Review[] = [
  {
    who: { en: 'Farah', hi: 'फ़राह', pa: 'ਫ਼ਰਾਹ' }, stars: 5,
    text: { en: 'Very thorough, always on time.', hi: 'बहुत अच्छे से काम करती हैं, हमेशा समय पर।', pa: 'ਬਹੁਤ ਵਧੀਆ ਕੰਮ ਕਰਦੀ ਹੈ, ਹਮੇਸ਼ਾ ਸਮੇਂ ਸਿਰ।' },
    meta: { en: 'Laundry · 12 Nov', hi: 'कपड़े · 12 नवं', pa: 'ਕੱਪੜੇ · 12 ਨਵੰ' }, photo: true,
  },
  {
    who: { en: 'Priya', hi: 'प्रिया', pa: 'ਪ੍ਰਿਆ' }, stars: 4,
    text: { en: 'Good work. Came 5 minutes late.', hi: 'अच्छा काम। 5 मिनट देर से आईं।', pa: 'ਵਧੀਆ ਕੰਮ। 5 ਮਿੰਟ ਲੇਟ ਆਈ।' },
    meta: { en: 'General cleaning · 9 Nov', hi: 'सामान्य सफ़ाई · 9 नवं', pa: 'ਆਮ ਸਫ਼ਾਈ · 9 ਨਵੰ' },
  },
  {
    who: { en: 'A customer', hi: 'एक ग्राहक', pa: 'ਇੱਕ ਗਾਹਕ' }, stars: 3,
    text: { en: 'Balcony was missed.', hi: 'बालकनी छूट गई।', pa: 'ਬਾਲਕਨੀ ਰਹਿ ਗਈ।' },
    reply: { en: 'We sent a helper back the same day.', hi: 'हमने उसी दिन हेल्पर वापस भेजा।', pa: 'ਅਸੀਂ ਉਸੇ ਦਿਨ ਹੈਲਪਰ ਵਾਪਸ ਭੇਜਿਆ।' },
  },
];
export const starShares: [string, number][] = [['5', 84], ['4', 13], ['3', 3]];
export type ReviewFilter = 'all' | 'photos' | 'low';
export const reviewFilters: [ReviewFilter, Tri][] = [
  ['all', { en: 'All', hi: 'सभी', pa: 'ਸਾਰੇ' }],
  ['photos', { en: 'With photos', hi: 'फ़ोटो वाले', pa: 'ਫ਼ੋਟੋ ਵਾਲੇ' }],
  ['low', { en: 'Low first', hi: 'कम रेटिंग पहले', pa: 'ਘੱਟ ਰੇਟਿੰਗ ਪਹਿਲਾਂ' }],
];

/** Chat with the helper. Typed messages carry the same text in every language. */
export type ChatMessage = { me: boolean; text: Tri };
export const chatOpening: ChatMessage[] = [
  { me: false, text: { en: 'Namaste, I am on the way. Which gate should I come to?', hi: 'नमस्ते, मैं रास्ते में हूँ। किस गेट पर आऊँ?', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਰਾਹ ਵਿੱਚ ਹਾਂ। ਕਿਹੜੇ ਗੇਟ ਤੇ ਆਵਾਂ?' } },
  { me: true, text: { en: 'Gate 2, near the park. Tell the guard flat 204.', hi: 'गेट 2, पार्क के पास। गार्ड को फ़्लैट 204 बताना।', pa: 'ਗੇਟ 2, ਪਾਰਕ ਦੇ ਕੋਲ। ਗਾਰਡ ਨੂੰ ਫ਼ਲੈਟ 204 ਦੱਸ ਦੇਣਾ।' } },
  { me: false, text: { en: 'Okay. Do you have a mop and floor cleaner?', hi: 'ठीक है। क्या पोछा और फ़र्श क्लीनर है?', pa: 'ਠੀਕ ਹੈ। ਕੀ ਪੋਚਾ ਅਤੇ ਫ਼ਰਸ਼ ਕਲੀਨਰ ਹੈ?' } },
  { me: true, text: { en: 'Yes, everything is in the balcony.', hi: 'हाँ, सब बालकनी में है।', pa: 'ਹਾਂ, ਸਭ ਕੁਝ ਬਾਲਕਨੀ ਵਿੱਚ ਹੈ।' } },
];
export const chatReplies: Tri[] = [
  { en: 'Okay, noted.', hi: 'ठीक है, समझ गई।', pa: 'ਠੀਕ ਹੈ, ਸਮਝ ਗਈ।' },
  { en: 'Theek hai, I will be there soon.', hi: 'ठीक है, मैं जल्दी पहुँचती हूँ।', pa: 'ਠੀਕ ਹੈ, ਮੈਂ ਛੇਤੀ ਪਹੁੰਚਦੀ ਹਾਂ।' },
  { en: 'Sure, no problem.', hi: 'ज़रूर, कोई बात नहीं।', pa: 'ਜ਼ਰੂਰ, ਕੋਈ ਗੱਲ ਨਹੀਂ।' },
  { en: 'Got it, thank you!', hi: 'समझ गई, धन्यवाद!', pa: 'ਸਮਝ ਗਈ, ਧੰਨਵਾਦ!' },
];
export const quickReplies: Tri[] = [
  { en: 'Ring the bell', hi: 'घंटी बजाएँ', pa: 'ਘੰਟੀ ਵਜਾਓ' },
  { en: 'Call me when here', hi: 'पहुँचकर कॉल करें', pa: 'ਪਹੁੰਚ ਕੇ ਕਾਲ ਕਰੋ' },
  { en: 'I am home', hi: 'मैं घर पर हूँ', pa: 'ਮੈਂ ਘਰ ਹਾਂ' },
];
export const replyDelayMs = 1000;
