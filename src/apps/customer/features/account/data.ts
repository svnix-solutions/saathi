/** Sample data and constants for the account feature (prototype only). */
import type { IconName, Locale } from '@/native/ui';

/** "More" links on My account: [route, English, Hindi, Punjabi, icon]. */
export const ACCOUNT_MORE: [string, string, string, string, IconName][] = [
  ['plan', 'My monthly plan', 'मेरा मासिक प्लान', 'ਮੇਰਾ ਮਹੀਨੇਵਾਰ ਪਲਾਨ', 'clock'],
  ['favourites', 'Favourite helpers', 'पसंदीदा हेल्पर', 'ਪਸੰਦੀਦਾ ਹੈਲਪਰ', 'star'],
  ['wallet', 'Wallet', 'वॉलेट', 'ਵਾਲੇਟ', 'wallet'],
  ['rewards', 'Points and rewards', 'पॉइंट और इनाम', 'ਪੁਆਇੰਟ ਅਤੇ ਇਨਾਮ', 'sparkle'],
  ['refer', 'Refer a friend', 'दोस्त को बुलाएँ', 'ਦੋਸਤ ਨੂੰ ਬੁਲਾਓ', 'user'],
  ['gift', 'Gift a visit', 'विज़िट गिफ़्ट करें', 'ਵਿਜ਼ਿਟ ਗਿਫ਼ਟ ਕਰੋ', 'sparkle'],
  ['plus', 'Saathi Plus', 'Saathi Plus', 'Saathi Plus', 'bolt'],
  ['society', 'My society', 'मेरी सोसाइटी', 'ਮੇਰੀ ਸੁਸਾਇਟੀ', 'home'],
  ['sharedHome', 'Shared home', 'साझा घर', 'ਸਾਂਝਾ ਘਰ', 'key'],
  ['alerts', 'Messages', 'संदेश', 'ਸੁਨੇਹੇ', 'bell'],
  ['language', 'Language', 'भाषा', 'ਭਾਸ਼ਾ', 'list'],
  ['help', 'Help and safety', 'मदद और सुरक्षा', 'ਮਦਦ ਅਤੇ ਸੁਰੱਖਿਆ', 'shield'],
];

/** Sample email shown before the customer adds one. */
export const SAMPLE_EMAIL = 'nitin.k@example.com';

/** The UPI ID the sample customer starts with. */
export const PRIMARY_UPI = 'nitin@upi';

/** Default switches on Alert settings. */
export const ALERT_DEFAULTS = { reminders: true, rate: true, offers: false, app: true, sms: true, whatsapp: false, quiet: true };
export type AlertSwitch = keyof typeof ALERT_DEFAULTS;

/** What deleting the account removes: [English, Hindi, Punjabi]. */
export const DELETE_ITEMS: [string, string, string][] = [
  ['Your name, addresses and saved payment methods', 'आपका नाम, पते और सेव किए भुगतान तरीके', 'ਤੁਹਾਡਾ ਨਾਂ, ਪਤੇ ਅਤੇ ਸੇਵ ਕੀਤੇ ਭੁਗਤਾਨ ਦੇ ਤਰੀਕੇ'],
  ['Your favourites, points and reviews', 'आपके पसंदीदा, पॉइंट और रिव्यू', 'ਤੁਹਾਡੇ ਪਸੰਦੀਦਾ, ਪੁਆਇੰਟ ਅਤੇ ਰਿਵਿਊ'],
  ['Your monthly plan, from tomorrow', 'आपका मासिक प्लान, कल से', 'ਤੁਹਾਡਾ ਮਹੀਨੇਵਾਰ ਪਲਾਨ, ਕੱਲ੍ਹ ਤੋਂ'],
];

/** The code that confirms deleting the account in this prototype. */
export const DELETE_CODE = '4821';

/** Saved addresses (design page 05). */
export const ADDRESSES = [
  { label: 'Home', labelHi: 'घर', labelPa: 'ਘਰ', line: 'Flat 204, Block C', lineHi: 'फ़्लैट 204, ब्लॉक सी', linePa: 'ਫ਼ਲੈਟ 204, ਬਲਾਕ ਸੀ', note: 'Gate 2, tell the guard flat 204' },
  { label: "Parents' home", labelHi: 'माता-पिता का घर', labelPa: 'ਮਾਪਿਆਂ ਦਾ ਘਰ', line: 'House 18, Sector 21', lineHi: 'मकान 18, सेक्टर 21', linePa: 'ਮਕਾਨ 18, ਸੈਕਟਰ 21', note: '' },
];

/** Home sizes the customer can pick. */
export const HOME_SIZES: { v: '1' | '2' | '3'; label: string }[] = [
  { v: '1', label: '1 BHK' }, { v: '2', label: '2 BHK' }, { v: '3', label: '3 BHK+' },
];

/** App languages on Language and display. */
export const LANGUAGES: { k: Locale; label: string }[] = [{ k: 'en', label: 'English' }, { k: 'hi', label: 'हिन्दी' }, { k: 'pa', label: 'ਪੰਜਾਬੀ' }];

/** Text sizes on Language and display. */
export const TEXT_SIZES = [
  { k: 'Small', hi: 'छोटा', pa: 'ਛੋਟਾ', scale: 0.9 },
  { k: 'Medium', hi: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ', scale: 1 },
  { k: 'Large', hi: 'बड़ा', pa: 'ਵੱਡਾ', scale: 1.22 },
];

/** Text in English, Hindi and Punjabi, translated where it is shown. */
export type Tri = { en: string; hi: string; pa: string };

/** Inbox on the Alerts screen (design page 11). */
export const ALERTS: { icon: IconName; title: Tri; sub: Tri; go: string; fill?: boolean }[] = [
  {
    icon: 'bolt', go: 'tracking', fill: true,
    title: { en: 'Sunita arrives in 5 minutes', hi: 'सुनीता 5 मिनट में पहुँचेंगी', pa: 'ਸੁਨੀਤਾ 5 ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚੇਗੀ' },
    sub: { en: 'Keep the door code 4821 ready · now', hi: 'दरवाज़ा कोड 4821 तैयार रखें · अभी', pa: 'ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ 4821 ਤਿਆਰ ਰੱਖੋ · ਹੁਣੇ' },
  },
  {
    icon: 'wallet', go: 'wallet',
    title: { en: '₹79 refunded to wallet', hi: '₹79 वॉलेट में वापस आए', pa: '₹79 ਵਾਲੇਟ ਵਿੱਚ ਵਾਪਸ ਆਏ' },
    sub: { en: 'Visit #2031 ended early · 1 hr ago', hi: 'विज़िट #2031 जल्दी ख़त्म हुई · 1 घंटा पहले', pa: 'ਵਿਜ਼ਿਟ #2031 ਛੇਤੀ ਖ਼ਤਮ ਹੋਈ · 1 ਘੰਟਾ ਪਹਿਲਾਂ' },
  },
  {
    icon: 'clock', go: 'plan',
    title: { en: 'Plan visit tomorrow, 8:00 am', hi: 'प्लान की विज़िट कल, सुबह 8:00', pa: 'ਪਲਾਨ ਦੀ ਵਿਜ਼ਿਟ ਕੱਲ੍ਹ, ਸਵੇਰੇ 8:00' },
    sub: { en: 'Skip free until 9 pm tonight · 3 hr ago', hi: 'आज रात 9 बजे तक मुफ़्त छोड़ें · 3 घंटे पहले', pa: 'ਅੱਜ ਰਾਤ 9 ਵਜੇ ਤੱਕ ਮੁਫ਼ਤ ਛੱਡੋ · 3 ਘੰਟੇ ਪਹਿਲਾਂ' },
  },
  {
    icon: 'star', go: 'ratingDetailed',
    title: { en: 'How was Rekha?', hi: 'रेखा का काम कैसा था?', pa: 'ਰੇਖਾ ਦਾ ਕੰਮ ਕਿਵੇਂ ਸੀ?' },
    sub: { en: "Rate yesterday's visit · yesterday", hi: 'कल की विज़िट को रेटिंग दें · कल', pa: 'ਕੱਲ੍ਹ ਦੀ ਵਿਜ਼ਿਟ ਨੂੰ ਰੇਟਿੰਗ ਦਿਓ · ਕੱਲ੍ਹ' },
  },
  {
    icon: 'sparkle', go: 'deepClean',
    title: { en: '₹100 off deep clean this week', hi: 'इस हफ़्ते डीप क्लीन पर ₹100 की छूट', pa: 'ਇਸ ਹਫ਼ਤੇ ਡੀਪ ਕਲੀਨ ’ਤੇ ₹100 ਦੀ ਛੋਟ' },
    sub: { en: 'Code DIWALI · 2 days ago', hi: 'कोड DIWALI · 2 दिन पहले', pa: 'ਕੋਡ DIWALI · 2 ਦਿਨ ਪਹਿਲਾਂ' },
  },
];

/** Alerts already read in the sample inbox. */
export const READ_ALERTS_DEFAULT = [1, 2, 3, 4];
