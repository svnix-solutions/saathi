import type { TFn } from '@/domain';
import type { UpcomingBooking } from '../../state';

/** Splits "Tomorrow · 10:00 am" into the localised day and time. */
export const slotParts = (t: TFn, b: Pick<UpcomingBooking, 'slot' | 'slotHi'>) => {
  const [en, hi] = [b.slot.split(' · '), b.slotHi.split(' · ')];
  return { day: t(en[0], hi[0]), time: t(en[1], hi[1]) };
};
