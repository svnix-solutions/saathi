/** Formatting helpers (money, durations, clocks, dates). No React. */

/** A translate function: `t(en, hi?, pa?)` as returned by `useT()`. */
export type TFn = (en: string, hi?: string, pa?: string) => string;

/** ₹ formatting with Indian digit grouping: 1250 → "₹1,250". */
export const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');
/** Same as `rupees` (the admin panel's name for it). */
export const inr = rupees;

/** "30 min", "1 hr", "1.5 hr" (and Hindi). Was `dur` in customer/v1/kit. */
export const dur = (t: TFn, min: number) =>
  min < 60 ? t(`${min} min`, `${min} मिनट`) : t(`${min / 60} hr`, `${min / 60} घंटा`);

/** Minutes → "45 min", "1 hr 30", "3 hr". Was `fmtMin` in customer/v2a/kit. */
export const fmtMin = (m: number) => {
  const h = Math.floor(m / 60), r = m % 60;
  if (!h) return `${r} min`;
  return r ? `${h} hr ${r}` : `${h} hr`;
};

/** Seconds → "m:ss" (floors fractional seconds). Was `mmss` in partner/v1/kit. */
export const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;

/** Seconds → "m:ss" for whole seconds. Was `clock` in customer/v1/kit (same output as `mmss` for integers). */
export const clock = (sec: number) => `${Math.floor(Math.max(sec, 0) / 60)}:${String(Math.max(sec, 0) % 60).padStart(2, '0')}`;

/** "38:12 left" / "38:12 बाकी". Was `leftLabel` in partner/v1/kit. */
export const leftLabel = (sec: number, hi: boolean) => (hi ? `${mmss(sec)} बाकी` : `${mmss(sec)} left`);

/** The date `weeks` weeks after `from` (rounded up), e.g. "15 December". Was `weekAhead` in partner/v3/kit. */
export const weekAhead = (weeks: number, from = new Date(2026, 10, 17)) => {
  const d = new Date(from.getTime() + Math.ceil(weeks) * 7 * 864e5);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};
