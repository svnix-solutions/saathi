/** Sample data and constants for the bookings screens (prototype only). */
import type { LastVisit } from '../../state';

/** Shown under "Past" until the customer finishes a visit. */
export const sampleLastVisit: LastVisit = { service: 'general', minutes: 60, price: 158 };

/** The older past booking on "Your bookings". */
export const olderPastBooking = { service: 'laundry' as const, minutes: 90, date: ['12 Nov', '12 नवं'] as const };

/** Change booking: times to move to and lengths to pick. */
export const rescheduleSlots = [['Tomorrow · 10:00 am', 'कल · सुबह 10:00'], ['Tomorrow · 4:00 pm', 'कल · शाम 4:00'], ['Wed 18 · 10:00 am', 'बुध 18 · सुबह 10:00']] as const;
export const bookingLengths = [60, 90, 120, 150, 180];
/** "Ask for a different helper" swaps between these two. */
export const helperSwap = ['Rekha M.', 'Geeta K.'] as const;

/** Receipt #2041 sample. */
export const sampleReceipt = {
  id: '2041',
  paid: '₹237',
  when: 'Today, 12:14 pm · Sunita D.',
  lines: [
    { label: 'General cleaning, 1 hr', value: '₹158' },
    { label: 'Extra 30 minutes', value: '₹79' },
    { label: 'Offer FIRST50', value: '− ₹50', accent: true },
    { label: 'Tip for Sunita', value: '₹50' },
  ],
  total: '₹237',
  paidWith: [{ label: 'From wallet', value: '₹79' }, { label: 'UPI', value: '₹158' }],
};
