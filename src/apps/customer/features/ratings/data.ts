/** Sample data and constants for the rating screens (prototype only). */
import { decisions, rupees, visitPrice } from '@/domain';
import type { Tri } from '../helpers';
import type { RatingParts } from './state';

/** Detailed rating: the parts rated separately. */
export const ratingRows: [keyof RatingParts, Tri][] = [
  ['time', { en: 'On time', hi: 'समय पर', pa: 'ਸਮੇਂ ਸਿਰ' }],
  ['quality', { en: 'Cleaning quality', hi: 'सफ़ाई की क्वालिटी', pa: 'ਸਫ਼ਾਈ ਦੀ ਕੁਆਲਿਟੀ' }],
  ['behaviour', { en: 'Behaviour', hi: 'व्यवहार', pa: 'ਵਿਹਾਰ' }],
];
export const defaultParts: RatingParts = { time: 5, quality: 4, behaviour: 5 };
export const sampleReviewText: Tri = {
  en: 'Kitchen slab was spotless. Balcony corner was missed.',
  hi: 'किचन की स्लैब चमक रही थी। बालकनी का कोना छूट गया।',
  pa: 'ਰਸੋਈ ਦੀ ਸਲੈਬ ਚਮਕ ਰਹੀ ਸੀ। ਬਾਲਕਨੀ ਦਾ ਕੋਨਾ ਰਹਿ ਗਿਆ।',
};
/** Points: rating a visit earns 5, a photo review 20 more. */
export const ratePoints = 5;
export const photoPoints = 20;
/** Points balance and wallet balance until the customer changes them. */
export const defaultPoints = 320;
export const defaultWallet = 240;
export const defaultBlocked = ['Mohan T.'];

/** Low rating: what went wrong (English is the key). */
export const lowReasons: Tri[] = [
  { en: 'Came late', hi: 'देर से आईं', pa: 'ਦੇਰ ਨਾਲ ਆਈ' },
  { en: 'Work unfinished', hi: 'काम अधूरा', pa: 'ਕੰਮ ਅਧੂਰਾ' },
  { en: 'Rude behaviour', hi: 'बुरा व्यवहार', pa: 'ਮਾੜਾ ਵਿਹਾਰ' },
  { en: 'Something damaged', hi: 'कुछ टूटा', pa: 'ਕੁਝ ਟੁੱਟ ਗਿਆ' },
];

/** Low rating: half of a 1 hr general visit goes back to the wallet. */
export const badVisitRefund = Math.round(visitPrice * decisions.customer.badVisitRefund);

export type FixKind = 'reclean' | 'refund' | 'call';
export type FixOption = { k: FixKind; title: Tri; sub: Tri; done: Tri };
const refund = rupees(badVisitRefund);
export const fixOptions: FixOption[] = [
  {
    k: 'reclean',
    title: { en: 'Send a helper back, free', hi: 'हेल्पर को फिर भेजें, मुफ़्त', pa: 'ਹੈਲਪਰ ਨੂੰ ਮੁੜ ਭੇਜੋ, ਮੁਫ਼ਤ' },
    sub: { en: 'Today, to finish the work', hi: 'आज, काम पूरा करने के लिए', pa: 'ਅੱਜ, ਕੰਮ ਪੂਰਾ ਕਰਨ ਲਈ' },
    done: { en: 'A helper is coming back today, free', hi: 'हेल्पर आज फिर आएगा, मुफ़्त', pa: 'ਹੈਲਪਰ ਅੱਜ ਮੁੜ ਆਵੇਗਾ, ਮੁਫ਼ਤ' },
  },
  {
    k: 'refund',
    title: { en: `Refund ${refund} to wallet`, hi: `${refund} वॉलेट में वापस`, pa: `${refund} ਵਾਲੇਟ ਵਿੱਚ ਵਾਪਸ` },
    sub: { en: 'Half of this visit', hi: 'इस विज़िट का आधा', pa: 'ਇਸ ਵਿਜ਼ਿਟ ਦਾ ਅੱਧਾ' },
    done: { en: `${refund} refunded to your wallet`, hi: `${refund} आपके वॉलेट में वापस आए`, pa: `${refund} ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ਵਾਪਸ ਆ ਗਏ` },
  },
  {
    k: 'call',
    title: { en: 'Call me', hi: 'मुझे कॉल करें', pa: 'ਮੈਨੂੰ ਕਾਲ ਕਰੋ' },
    sub: { en: 'Our team rings within 10 min', hi: 'हमारी टीम 10 मिनट में कॉल करेगी', pa: 'ਸਾਡੀ ਟੀਮ 10 ਮਿੰਟ ਵਿੱਚ ਕਾਲ ਕਰੇਗੀ' },
    done: { en: 'Our team will call you within 10 min', hi: 'हमारी टीम 10 मिनट में आपको कॉल करेगी', pa: 'ਸਾਡੀ ਟੀਮ 10 ਮਿੰਟ ਵਿੱਚ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰੇਗੀ' },
  },
];
