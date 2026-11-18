import type { RouteMap } from '@/native/ui';
import { BookingsScreen } from './screens/BookingsScreen';
import { ChangeBookingScreen } from './screens/ChangeBookingScreen';
import { ReceiptScreen } from './screens/ReceiptScreen';

export { BookingsScreen, ChangeBookingScreen, ReceiptScreen };

/**
 * Bookings feature — public API of this folder. Other features import only from here.
 * Routes: bookings, changeBooking, receipt
 */
export const routes: RouteMap = {
  bookings: BookingsScreen,
  changeBooking: ChangeBookingScreen,
  receipt: ReceiptScreen,
};
