/** Pure filters for the operations lists. */
import type { Booking } from '../../fixtures';
import type { AttendanceFilter, AttendanceRow, BookingGroup, DashFilter } from './data';
import { MAX_CHECKIN_METRES } from './data';

/** Dashboard tab filter. */
export const matchDash = (f: DashFilter, b: Booking) =>
  f === 'all' ? true
    : f === 'now' ? ['progress', 'way', 'searching'].includes(b.status)
      : f === 'scheduled' ? b.status === 'scheduled'
        : ['searching', 'review'].includes(b.status);

/** Which bookings-list group a booking falls in. */
export const bookingGroup = (b: Booking): BookingGroup =>
  b.status === 'searching' ? 'needs'
    : b.status === 'progress' || b.status === 'way' ? 'live'
      : b.status === 'scheduled' ? 'scheduled'
        : b.status === 'cancelled' ? 'cancelled' : 'done';

/** Free-text search over ID, customer, partner, area, service and payment. */
export const matchBookingQuery = (b: Booking, q: string) => {
  const ql = q.trim().toLowerCase().replace('#', '');
  return !ql || [b.id, b.customer, b.partner ?? 'not assigned', b.area, b.service, b.paidBy].some((v) => v.toLowerCase().includes(ql));
};

/** Selfie did not match or the check-in was too far from the door. */
export const checkInMismatch = (r: AttendanceRow) => !r.selfie || r.loc > MAX_CHECKIN_METRES;

export const matchAttendance = (f: AttendanceFilter, r: AttendanceRow) =>
  f === 'all' ? true : f === 'late' ? !!r.late : checkInMismatch(r);
