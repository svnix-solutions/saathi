import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Who opens the door when the visit is booked for family (screen 42). */
export type BookingFor = { name: string; phone: string; sms: boolean; hindi: boolean; iPay: boolean };
/** The deep clean built room by room (screen 43). */
export type DeepCleanPlan = { rooms: Record<string, number>; helpers: 1 | 2; workMinutes: number; price: number };

/** Booking fields the booking screens write that are not in `CustomerState` yet. */
export type BookingState = CustomerState & {
  bookingFor?: BookingFor;
  deepClean?: DeepCleanPlan;
  /** slot picked by voice or the one-tap repeat, e.g. "Tomorrow, 9:00 am" */
  slot?: string;
  /** helper picked by the one-tap repeat */
  helper?: string;
  /** not-at-home entry method and the proof photos asked for (screen 63) */
  entry?: string;
  entryProofs?: string[];
};

/** `useCustomerState()` typed with the booking extras. */
export const useBookingState = () => useAppState<BookingState>();
