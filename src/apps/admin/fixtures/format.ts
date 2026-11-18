/** Display helpers used with the fixtures. Move to `src/domain/format.ts` once that module exists. */

/** "₹1,234" (Indian digit grouping). */
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

/** Clock text like "11:24" for log lines. */
export const clock = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
