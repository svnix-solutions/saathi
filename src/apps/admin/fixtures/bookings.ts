/** Sample bookings for today (prototype data only). Mutated through `fixtures/store.ts`. */
import type { BookingStatus } from '../ui/StatusTag';

export type { BookingStatus };
export type Booking = {
  id: string; time: string; customer: string; service: string; partner?: string; area: string; paidBy: string;
  status: BookingStatus; amount: number;
  /** "Searching 4 min", "Scheduled 4 pm", "Refunded ₹79" */
  waitMin?: number; when?: string; refunded?: number; byHand?: string;
};

/** A fresh copy of the sample bookings. */
export const initialBookings = (): Booking[] => [
  { id: '2042', time: '11:02', customer: 'Meera S.', service: 'Kitchen & bath · 2 hr', area: 'Block A', paidBy: 'UPI', status: 'searching', waitMin: 4, amount: 516 },
  { id: '2045', time: '11:05', customer: 'Rohan G.', service: 'Custom · 3 hr', area: 'Block D', paidBy: 'UPI', status: 'searching', waitMin: 1, amount: 594 },
  { id: '2041', time: '11:00', customer: 'Nitin K.', service: 'General · 1 hr', partner: 'Sunita D.', area: 'Block C', paidBy: 'Wallet + UPI', status: 'progress', amount: 158 },
  { id: '2044', time: '10:10', customer: 'Farah A.', service: 'Laundry · 1.5 hr', partner: 'Kavita R.', area: 'Sector 18', paidBy: 'UPI', status: 'progress', amount: 267 },
  { id: '2043', time: '10:58', customer: 'Arjun P.', service: 'Dishes · 30 min', partner: 'Rekha M.', area: 'Sector 21', paidBy: 'Cash', status: 'way', amount: 79 },
  { id: '2046', time: '4:00 pm', customer: 'Priya N.', service: 'General · 1 hr', partner: 'Anita B.', area: 'Sector 21', paidBy: 'UPI', status: 'scheduled', when: '4 pm', amount: 158 },
  { id: '2047', time: '5:30 pm', customer: 'Farah A.', service: 'Laundry · 1 hr', partner: 'Kavita R.', area: 'Sector 18', paidBy: 'Plan', status: 'scheduled', when: '5:30 pm', amount: 160 },
  { id: '2040', time: '8:00', customer: 'Sameer T.', service: 'General · 2 hr', partner: 'Rekha M.', area: 'Block C', paidBy: 'UPI', status: 'done', amount: 316 },
  { id: '2038', time: '9:15', customer: 'Kiran D.', service: 'General · 1 hr', partner: 'Meena T.', area: 'Block A', paidBy: 'UPI', status: 'review', amount: 158 },
  { id: '2031', time: '7:30', customer: 'Sameer T.', service: 'General · 1 hr', partner: 'Geeta K.', area: 'Block C', paidBy: 'UPI', status: 'refunded', refunded: 79, amount: 158 },
];
