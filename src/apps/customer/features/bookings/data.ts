/** Sample data and constants for the bookings screens (prototype only). */
import type { LastVisit } from '../../state';

/** Shown under "Past" until the customer finishes a visit. */
export const sampleLastVisit: LastVisit = { service: 'general', minutes: 60, price: 158 };

/** The older past booking on "Your bookings" (date in English, Hindi, Punjabi). */
export const olderPastBooking = { service: 'laundry' as const, minutes: 90, date: ['12 Nov', '12 नवं', '12 ਨਵੰ'] as const };

/** Change booking: times to move to (English, Hindi; Punjabi comes from `slotPa`) and lengths to pick. */
export const rescheduleSlots = [['Tomorrow · 10:00 am', 'कल · सुबह 10:00'], ['Tomorrow · 4:00 pm', 'कल · शाम 4:00'], ['Wed 18 · 10:00 am', 'बुध 18 · सुबह 10:00']] as const;
export const bookingLengths = [60, 90, 120, 150, 180];
/** "Ask for a different helper" swaps between these two. */
export const helperSwap = ['Rekha M.', 'Geeta K.'] as const;

/** One line of text in English, Hindi and Punjabi. */
type Tri = { en: string; hi: string; pa: string };

/** Receipt #2041 sample. */
export const sampleReceipt: {
  id: string; paid: string; when: Tri; total: string;
  lines: { label: Tri; code?: string; value: string; accent?: boolean }[];
  paidWith: { label: Tri; value: string }[];
} = {
  id: '2041',
  paid: '₹237',
  when: { en: 'Today, 12:14 pm · Sunita D.', hi: 'आज, दोपहर 12:14 · सुनीता डी.', pa: 'ਅੱਜ, ਦੁਪਹਿਰ 12:14 · ਸੁਨੀਤਾ ਡੀ.' },
  lines: [
    { label: { en: 'General cleaning, 1 hr', hi: 'सामान्य सफ़ाई, 1 घंटा', pa: 'ਆਮ ਸਫ਼ਾਈ, 1 ਘੰਟਾ' }, value: '₹158' },
    { label: { en: 'Extra 30 minutes', hi: '30 मिनट ज़्यादा', pa: '30 ਮਿੰਟ ਵਾਧੂ' }, value: '₹79' },
    // the offer code stays in Latin script: "Offer FIRST50" / "ऑफ़र FIRST50"
    { label: { en: 'Offer', hi: 'ऑफ़र', pa: 'ਆਫ਼ਰ' }, code: 'FIRST50', value: '− ₹50', accent: true },
    { label: { en: 'Tip for Sunita', hi: 'सुनीता के लिए टिप', pa: 'ਸੁਨੀਤਾ ਲਈ ਟਿਪ' }, value: '₹50' },
  ],
  total: '₹237',
  paidWith: [{ label: { en: 'From wallet', hi: 'वॉलेट से', pa: 'ਵਾਲੇਟ ਤੋਂ' }, value: '₹79' }, { label: { en: 'UPI', hi: 'UPI', pa: 'UPI' }, value: '₹158' }],
};
