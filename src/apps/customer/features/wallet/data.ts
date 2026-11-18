/** Sample data and constants for the wallet feature (prototype only). */
import { decisions, priceFor, serviceNamesHiPage18, serviceNamesPa } from '@/domain';
import type { Face } from '@/native/ui';

/** Text in English, Hindi and Punjabi, translated where it is shown. */
export type Tri = { en: string; hi: string; pa: string };

/** A wallet line: positive amounts are money in. */
export type Txn = { title: Tri; sub: Tri; amt: number };

/** Balance before the customer adds money. */
export const WALLET_BALANCE_DEFAULT = 240;

/** Top-up amounts on the Wallet screen. */
export const TOP_UP_AMOUNTS = [200, 500, 1000];

/** Recent wallet lines. */
export const SAMPLE_TXNS: Txn[] = [
  {
    title: { en: 'Refund · visit ended early', hi: 'रिफ़ंड · विज़िट जल्दी ख़त्म हुई', pa: 'ਰਿਫ਼ੰਡ · ਵਿਜ਼ਿਟ ਛੇਤੀ ਖ਼ਤਮ ਹੋਈ' },
    sub: { en: 'Today · #2031', hi: 'आज · #2031', pa: 'ਅੱਜ · #2031' }, amt: 79,
  },
  {
    title: { en: 'General cleaning', hi: serviceNamesHiPage18.general, pa: serviceNamesPa.general },
    sub: { en: 'Today · #2041', hi: 'आज · #2041', pa: 'ਅੱਜ · #2041' }, amt: -158,
  },
  {
    title: { en: 'Referral reward', hi: 'दोस्त को बुलाने का इनाम', pa: 'ਦੋਸਤ ਨੂੰ ਬੁਲਾਉਣ ਦਾ ਇਨਾਮ' },
    sub: { en: '12 Nov · Meera joined', hi: '12 नवंबर · मीरा जुड़ीं', pa: '12 ਨਵੰਬਰ · ਮੀਰਾ ਜੁੜੀ' }, amt: decisions.customer.referralReward,
  },
];

/** Ways to pay for a top-up: [key, label, saved account]. */
export const TOP_UP_METHODS: [TopUpMethod, Tri, string][] = [
  ['upi', { en: 'UPI', hi: 'UPI', pa: 'UPI' }, 'nitin@okaxis'],
  ['card', { en: 'Debit card', hi: 'डेबिट कार्ड', pa: 'ਡੈਬਿਟ ਕਾਰਡ' }, '•••• 4242'],
];
export type TopUpMethod = 'upi' | 'card';

/** The customer's referral code. */
export const REFERRAL_CODE = 'NITIN100';

/** Friends who joined with the code. */
export const REFERRED_FRIENDS: { face: Face; name: Tri }[] = [
  { face: 'ms', name: { en: 'Meera S.', hi: 'मीरा एस.', pa: 'ਮੀਰਾ ਐੱਸ.' } },
  { face: 'ap', name: { en: 'Arjun P.', hi: 'अर्जुन पी.', pa: 'ਅਰਜੁਨ ਪੀ.' } },
];

/** A friend who has the code but has not booked yet. */
export const PENDING_FRIEND = {
  face: 'rg' as Face,
  name: { en: 'Rohan G.', hi: 'रोहन जी.', pa: 'ਰੋਹਨ ਜੀ.' } as Tri,
  first: { en: 'Rohan', hi: 'रोहन', pa: 'ਰੋਹਨ' } as Tri,
};

/** Points before the customer earns or spends any. */
export const POINTS_DEFAULT = 320;

/** Points needed for Gold, and for 30 free minutes. */
export const GOLD_POINTS = 500;
export const FREE_MINUTES_POINTS = 500;

/** Ways to earn points: [label, points, route]. */
export const EARN_POINTS: [Tri, number, string?][] = [
  [{ en: 'Every visit', hi: 'हर विज़िट', pa: 'ਹਰ ਵਿਜ਼ਿਟ' }, decisions.customer.pointsPerVisit, 'home'],
  [{ en: 'Rate the visit', hi: 'विज़िट को रेटिंग दें', pa: 'ਵਿਜ਼ਿਟ ਨੂੰ ਰੇਟਿੰਗ ਦਿਓ' }, 5, 'ratingDetailed'],
  [{ en: 'Review with a photo', hi: 'फ़ोटो के साथ रिव्यू', pa: 'ਫ਼ੋਟੋ ਨਾਲ ਰਿਵਿਊ' }, 20, 'ratingDetailed'],
  [{ en: "A friend's first visit", hi: 'दोस्त की पहली विज़िट', pa: 'ਦੋਸਤ ਦੀ ਪਹਿਲੀ ਵਿਜ਼ਿਟ' }, 50, 'refer'],
];

/** Gifts a customer can send. */
export const GIFTS = [
  { k: '1 visit', hi: '1 विज़िट', pa: '1 ਵਿਜ਼ਿਟ', price: priceFor('general', 60) },
  { k: '4 visits', hi: '4 विज़िट', pa: '4 ਵਿਜ਼ਿਟਾਂ', price: 600 },
  { k: 'Deep clean', hi: 'डीप क्लीन', pa: 'ਡੀਪ ਕਲੀਨ', price: 774 },
];

/** The sample gift form. */
export const GIFT_DEFAULTS = {
  gift: 1,
  name: { en: 'Asha aunty', hi: 'आशा आंटी', pa: 'ਆਸ਼ਾ ਆਂਟੀ' } as Tri,
  phone: '98220 14567',
  msg: { en: 'With love. Put your feet up this Sunday.', hi: 'प्यार के साथ। इस रविवार आराम कीजिए।', pa: 'ਪਿਆਰ ਨਾਲ। ਇਸ ਐਤਵਾਰ ਆਰਾਮ ਕਰੋ।' } as Tri,
};
