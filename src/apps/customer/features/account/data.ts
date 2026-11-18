/** Sample data and constants for the account feature (prototype only). */
import type { IconName, Locale } from '@/native/ui';

/** "More" links on My account: [route, English, Hindi, icon]. */
export const ACCOUNT_MORE: [string, string, string, IconName][] = [
  ['plan', 'My monthly plan', 'मेरा मासिक प्लान', 'clock'],
  ['favourites', 'Favourite helpers', 'पसंदीदा हेल्पर', 'star'],
  ['wallet', 'Wallet', 'वॉलेट', 'wallet'],
  ['rewards', 'Points and rewards', 'पॉइंट और इनाम', 'sparkle'],
  ['refer', 'Refer a friend', 'दोस्त को बुलाएँ', 'user'],
  ['gift', 'Gift a visit', 'विज़िट गिफ़्ट करें', 'sparkle'],
  ['plus', 'Saathi Plus', 'साथी प्लस', 'bolt'],
  ['society', 'My society', 'मेरी सोसाइटी', 'home'],
  ['sharedHome', 'Shared home', 'साझा घर', 'key'],
  ['alerts', 'Messages', 'संदेश', 'bell'],
  ['language', 'Language', 'भाषा', 'list'],
  ['help', 'Help and safety', 'मदद और सुरक्षा', 'shield'],
];

/** Sample email shown before the customer adds one. */
export const SAMPLE_EMAIL = 'nitin.k@example.com';

/** The UPI ID the sample customer starts with. */
export const PRIMARY_UPI = 'nitin@upi';

/** Default switches on Alert settings. */
export const ALERT_DEFAULTS = { reminders: true, rate: true, offers: false, app: true, sms: true, whatsapp: false, quiet: true };
export type AlertSwitch = keyof typeof ALERT_DEFAULTS;

/** What deleting the account removes: [English, Hindi]. */
export const DELETE_ITEMS: [string, string][] = [
  ['Your name, addresses and saved payment methods', 'आपका नाम, पते और सेव किए भुगतान तरीके'],
  ['Your favourites, points and reviews', 'आपके पसंदीदा, पॉइंट और रिव्यू'],
  ['Your monthly plan, from tomorrow', 'आपका मासिक प्लान, कल से'],
];

/** The code that confirms deleting the account in this prototype. */
export const DELETE_CODE = '4821';

/** Saved addresses (design page 05). */
export const ADDRESSES = [
  { label: 'Home', labelHi: 'घर', line: 'Flat 204, Block C', lineHi: 'फ़्लैट 204, ब्लॉक सी', note: 'Gate 2, tell the guard flat 204' },
  { label: "Parents' home", labelHi: 'माता-पिता का घर', line: 'House 18, Sector 21', lineHi: 'मकान 18, सेक्टर 21', note: '' },
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

/** Inbox on the Alerts screen (design page 11). */
export const ALERTS: { icon: IconName; title: string; sub: string; go: string; fill?: boolean }[] = [
  { icon: 'bolt', title: 'Sunita arrives in 5 minutes', sub: 'Keep the door code 4821 ready · now', go: 'tracking', fill: true },
  { icon: 'wallet', title: '₹79 refunded to wallet', sub: 'Visit #2031 ended early · 1 hr ago', go: 'wallet' },
  { icon: 'clock', title: 'Plan visit tomorrow, 8:00 am', sub: 'Skip free until 9 pm tonight · 3 hr ago', go: 'plan' },
  { icon: 'star', title: 'How was Rekha?', sub: "Rate yesterday's visit · yesterday", go: 'ratingDetailed' },
  { icon: 'sparkle', title: '₹100 off deep clean this week', sub: 'Code DIWALI · 2 days ago', go: 'deepClean' },
];

/** Alerts already read in the sample inbox. */
export const READ_ALERTS_DEFAULT = [1, 2, 3, 4];
