/** Formatting helpers (money, durations, clocks, dates). No React. */

/** A translate function: `t(en, hi?, pa?)` as returned by `useT()`. */
export type TFn = (en: string, hi?: string, pa?: string) => string;

/** ₹ formatting with Indian digit grouping: 1250 → "₹1,250". */
export const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');
/** Same as `rupees` (the admin panel's name for it). */
export const inr = rupees;

/** "30 min", "1 hr", "1.5 hr" (and Hindi, Punjabi). Was `dur` in customer/v1/kit. */
export const dur = (t: TFn, min: number) =>
  min < 60 ? t(`${min} min`, `${min} मिनट`, `${min} ਮਿੰਟ`) : t(`${min / 60} hr`, `${min / 60} घंटा`, `${min / 60} ਘੰਟਾ`);

/** Minutes → "45 min", "1 hr 30", "3 hr". Pass `t` to get Hindi / Punjabi units. Was `fmtMin` in customer/v2a/kit. */
export const fmtMin = (m: number, t?: TFn) => {
  const h = Math.floor(m / 60), r = m % 60;
  const minU = t ? t('min', 'मिनट', 'ਮਿੰਟ') : 'min';
  const hrU = t ? t('hr', 'घंटा', 'ਘੰਟਾ') : 'hr';
  if (!h) return `${r} ${minU}`;
  return r ? `${h} ${hrU} ${r}` : `${h} ${hrU}`;
};

/** Seconds → "m:ss" (floors fractional seconds). Was `mmss` in partner/v1/kit. */
export const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;

/** Seconds → "m:ss" for whole seconds. Was `clock` in customer/v1/kit (same output as `mmss` for integers). */
export const clock = (sec: number) => `${Math.floor(Math.max(sec, 0) / 60)}:${String(Math.max(sec, 0) % 60).padStart(2, '0')}`;

/** "38:12 left" / "38:12 बाकी". Was `leftLabel` in partner/v1/kit. Prefer `timeLeft(t, sec)`, which also covers Punjabi. */
export const leftLabel = (sec: number, hi: boolean) => (hi ? `${mmss(sec)} बाकी` : `${mmss(sec)} left`);
/** "38:12 left" in the current language. */
export const timeLeft = (t: TFn, sec: number) => t(`${mmss(sec)} left`, `${mmss(sec)} बाकी`, `${mmss(sec)} ਬਾਕੀ`);

/** "10:00 am" in the current language: "सुबह 10:00" / "ਸਵੇਰੇ 10:00" (morning, afternoon, evening, night). */
export const clockTime = (t: TFn, h: number, m = 0) => {
  const hh = ((h + 11) % 12) + 1, mm = String(m).padStart(2, '0');
  const [hi, pa] = h < 12 ? ['सुबह', 'ਸਵੇਰੇ'] : h < 16 ? ['दोपहर', 'ਦੁਪਹਿਰ'] : h < 20 ? ['शाम', 'ਸ਼ਾਮ'] : ['रात', 'ਰਾਤ'];
  return t(`${hh}:${mm} ${h < 12 ? 'am' : 'pm'}`, `${hi} ${hh}:${mm}`, `${pa} ${hh}:${mm}`);
};

/** The date `weeks` weeks after `from` (rounded up), e.g. "15 December". Was `weekAhead` in partner/v3/kit. */
export const weekAhead = (weeks: number, from = new Date(2026, 10, 17)) => {
  const d = new Date(from.getTime() + Math.ceil(weeks) * 7 * 864e5);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};
