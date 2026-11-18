import type { CustomerState, UpcomingBooking } from './types';

export const initialCustomerState: CustomerState = {
  signedIn: true,
  name: 'Nitin Kumar',
  phone: '98765 43210',
  address: { label: 'Home', line: 'Flat 204, Block C', note: 'Gate 2, tell the guard flat 204' },
  service: 'general',
  tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'],
  note: "Please do the kids' room first.",
  minutes: 60,
  when: 'now',
  pay: 'upi',
};

/** The sample upcoming booking (Bookings, Change booking) until the customer books one. */
export const defaultUpcoming: UpcomingBooking = { service: 'kitchenBath', minutes: 120, slot: 'Tomorrow · 10:00 am', slotHi: 'कल · सुबह 10:00', helper: 'Rekha M.' };
