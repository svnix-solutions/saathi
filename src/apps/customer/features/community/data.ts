import type { Face } from '@/native/ui';
import type { Testimonial } from '../../state';

/** A line of sample text in English, Hindi and Punjabi; shown with `t(l.en, l.hi, l.pa)`. */
export type L = { en: string; hi: string; pa: string };

/**
 * A customer quote shown on the testimonial screens. `mine` = from the customer's area, `deep` = a deep clean.
 * The English fields (`name`, `place`, `plan`, `text`, `short`) have Hindi (`…Hi`) and Punjabi (`…Pa`) twins:
 * render with `t(q.text, q.textHi, q.textPa)`.
 */
export type Quote = {
  face: Face; stars: number; mine?: boolean; deep?: boolean;
  name: string; nameHi: string; namePa: string;
  place: string; placeHi: string; placePa: string;
  plan?: string; planHi?: string; planPa?: string;
  text: string; textHi: string; textPa: string;
  short: string; shortHi: string; shortPa: string;
};

export const quotes: Quote[] = [
  {
    face: 'fa', stars: 5,
    name: 'Farah', nameHi: 'फ़राह', namePa: 'ਫ਼ਰਾਹ',
    place: 'Sector 18', placeHi: 'सेक्टर 18', placePa: 'ਸੈਕਟਰ 18',
    plan: 'monthly plan', planHi: 'मासिक प्लान', planPa: 'ਮਹੀਨੇ ਦਾ ਪਲਾਨ',
    text: 'I booked at 8 and by 8:15 Sunita was mopping. My mornings are calm now.',
    textHi: 'मैंने 8 बजे बुक किया और 8:15 तक सुनीता पोछा लगा रही थीं। अब मेरी सुबह आराम से गुज़रती है।',
    textPa: 'ਮੈਂ 8 ਵਜੇ ਬੁੱਕ ਕੀਤਾ ਤੇ 8:15 ਤੱਕ ਸੁਨੀਤਾ ਪੋਚਾ ਲਾ ਰਹੀ ਸੀ। ਹੁਣ ਮੇਰੀਆਂ ਸਵੇਰਾਂ ਸੁਖਾਲੀਆਂ ਨੇ।',
    short: 'By 8:15 Sunita was mopping. My mornings are calm now.',
    shortHi: '8:15 तक सुनीता पोछा लगा रही थीं। अब मेरी सुबह आराम से गुज़रती है।',
    shortPa: '8:15 ਤੱਕ ਸੁਨੀਤਾ ਪੋਚਾ ਲਾ ਰਹੀ ਸੀ। ਹੁਣ ਮੇਰੀਆਂ ਸਵੇਰਾਂ ਸੁਖਾਲੀਆਂ ਨੇ।',
  },
  {
    face: 'pn', stars: 4,
    name: 'Priya', nameHi: 'प्रिया', namePa: 'ਪ੍ਰਿਆ',
    place: 'Sector 21', placeHi: 'सेक्टर 21', placePa: 'ਸੈਕਟਰ 21',
    plan: 'daily help', planHi: 'रोज़ की मदद', planPa: 'ਰੋਜ਼ ਦੀ ਮਦਦ',
    text: 'The same helper every day. My mother trusts her now.',
    textHi: 'हर दिन वही हेल्पर। अब मेरी माँ को उन पर भरोसा है।',
    textPa: 'ਹਰ ਰੋਜ਼ ਉਹੀ ਹੈਲਪਰ। ਹੁਣ ਮੇਰੀ ਮਾਂ ਨੂੰ ਉਸ ਤੇ ਭਰੋਸਾ ਹੈ।',
    short: 'The same helper every day. My mother trusts her now.',
    shortHi: 'हर दिन वही हेल्पर। अब मेरी माँ को उन पर भरोसा है।',
    shortPa: 'ਹਰ ਰੋਜ਼ ਉਹੀ ਹੈਲਪਰ। ਹੁਣ ਮੇਰੀ ਮਾਂ ਨੂੰ ਉਸ ਤੇ ਭਰੋਸਾ ਹੈ।',
  },
  {
    face: 'rg', stars: 5, mine: true, deep: true,
    name: 'Rohan', nameHi: 'रोहन', namePa: 'ਰੋਹਨ',
    place: 'Block D', placeHi: 'ब्लॉक डी', placePa: 'ਬਲਾਕ ਡੀ',
    plan: 'deep clean', planHi: 'डीप क्लीन', planPa: 'ਡੀਪ ਕਲੀਨ',
    text: 'Kitchen deep clean before guests came. Worth every rupee.',
    textHi: 'मेहमानों के आने से पहले किचन की डीप क्लीन। हर रुपया वसूल।',
    textPa: 'ਮਹਿਮਾਨਾਂ ਦੇ ਆਉਣ ਤੋਂ ਪਹਿਲਾਂ ਰਸੋਈ ਦੀ ਡੀਪ ਕਲੀਨ। ਇੱਕ-ਇੱਕ ਰੁਪਈਆ ਵਸੂਲ।',
    short: 'Kitchen deep clean before guests came. Worth every rupee.',
    shortHi: 'मेहमानों के आने से पहले किचन की डीप क्लीन। हर रुपया वसूल।',
    shortPa: 'ਮਹਿਮਾਨਾਂ ਦੇ ਆਉਣ ਤੋਂ ਪਹਿਲਾਂ ਰਸੋਈ ਦੀ ਡੀਪ ਕਲੀਨ। ਇੱਕ-ਇੱਕ ਰੁਪਈਆ ਵਸੂਲ।',
  },
];

/** Filter pills on All testimonials. */
export const quoteFilters: { k: string; hi: string; pa: string; f: (q: Quote) => boolean }[] = [
  { k: 'All', hi: 'सभी', pa: 'ਸਾਰੇ', f: () => true },
  { k: 'My area', hi: 'मेरा इलाका', pa: 'ਮੇਰਾ ਇਲਾਕਾ', f: (q) => !!q.mine },
  { k: 'Deep clean', hi: 'डीप क्लीन', pa: 'ਡੀਪ ਕਲੀਨ', f: (q) => !!q.deep },
];

/** The customer's own review that they are asked to share. */
export const myQuote: L = {
  en: 'Kitchen slab was spotless. Sunita is always on time.',
  hi: 'किचन की स्लैब एकदम साफ़ थी। सुनीता हमेशा समय पर आती हैं।',
  pa: 'ਰਸੋਈ ਦੀ ਸਲੈਬ ਬਿਲਕੁਲ ਸਾਫ਼ ਸੀ। ਸੁਨੀਤਾ ਹਮੇਸ਼ਾ ਸਮੇਂ ਤੇ ਆਉਂਦੀ ਹੈ।',
};

/** Name choices on Permission to share. The English text is what is saved in `testimonial.showAs`. */
export const showAsOptions: L[] = [
  { en: 'Nitin, Block C', hi: 'नितिन, ब्लॉक सी', pa: 'ਨਿਤਿਨ, ਬਲਾਕ ਸੀ' },
  { en: 'A customer', hi: 'एक ग्राहक', pa: 'ਇੱਕ ਗਾਹਕ' },
];

/** Testimonial status and "sent" labels as shown on My testimonial, keyed by the saved English value. */
export const testimonialLabels: Record<string, L> = {
  'Waiting for approval': { en: 'Waiting for approval', hi: 'मंज़ूरी का इंतज़ार', pa: 'ਮਨਜ਼ੂਰੀ ਦੀ ਉਡੀਕ' },
  Approved: { en: 'Approved', hi: 'मंज़ूर', pa: 'ਮਨਜ਼ੂਰ' },
  Live: { en: 'Live', hi: 'लाइव', pa: 'ਲਾਈਵ' },
  'Taken down': { en: 'Taken down', hi: 'हटा दिया गया', pa: 'ਹਟਾ ਦਿੱਤਾ ਗਿਆ' },
  'Sent today': { en: 'Sent today', hi: 'आज भेजा', pa: 'ਅੱਜ ਭੇਜਿਆ' },
  ...Object.fromEntries(showAsOptions.map((o) => [o.en, o])),
};

/** Shown on My testimonial before the customer has shared one in this session. */
export const defaultTestimonial: Testimonial = { status: 'Waiting for approval', showAs: 'Nitin, Block C', app: true, web: true, photo: false, sent: 'Sent today' };

/** Helpers the neighbours in the society favour. */
export const neighbourHelpers: { face: Face; name: string; nameHi: string; namePa: string; flats: number }[] = [
  { face: 'sd', name: 'Sunita D.', nameHi: 'सुनीता डी.', namePa: 'ਸੁਨੀਤਾ ਡੀ.', flats: 12 },
  { face: 'rm', name: 'Rekha M.', nameHi: 'रेखा एम.', namePa: 'ਰੇਖਾ ਐਮ.', flats: 7 },
];
