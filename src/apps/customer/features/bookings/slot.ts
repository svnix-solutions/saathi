import { clockTime, type TFn } from '@/domain';
import type { UpcomingBooking } from '../../state';

/** Punjabi for the days a booking can be on (the state keeps only English and Hindi). */
const dayPa: Record<string, string> = { Today: 'ਅੱਜ', Tomorrow: 'ਕੱਲ੍ਹ', 'Wed 18': 'ਬੁੱਧ 18' };
/** A `t` that always answers in Punjabi, to reuse the shared helpers' Punjabi wording. */
const inPa: TFn = (en, _hi, pa) => pa ?? en;
/** "10:00 am" → "ਸਵੇਰੇ 10:00" (unknown formats stay as they are). */
const timePa = (en: string) => {
  const m = /^(\d{1,2}):(\d{2}) (am|pm)$/.exec(en);
  return m ? clockTime(inPa, (Number(m[1]) % 12) + (m[3] === 'pm' ? 12 : 0), Number(m[2])) : en;
};

/** "Tomorrow · 10:00 am" in Punjabi: "ਕੱਲ੍ਹ · ਸਵੇਰੇ 10:00". */
export const slotPa = (slot: string) => {
  const [day, time] = slot.split(' · ');
  return [dayPa[day] ?? day, time && timePa(time)].filter(Boolean).join(' · ');
};

/** Splits "Tomorrow · 10:00 am" into the localised day and time (Punjabi: `slotPa` if the booking has it, else derived). */
export const slotParts = (t: TFn, b: Pick<UpcomingBooking, 'slot' | 'slotHi' | 'slotPa'>) => {
  const [en, hi, pa] = [b.slot.split(' · '), b.slotHi.split(' · '), (b.slotPa ?? slotPa(b.slot)).split(' · ')];
  return { day: t(en[0], hi[0], pa[0]), time: t(en[1], hi[1], pa[1]) };
};
