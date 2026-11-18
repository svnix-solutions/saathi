import { inr } from '../../fixtures';
import { ADVANCE_LIMIT, ADVANCE_MAX_SHARE, type Advance } from './data';

/** Weekly repayment, its share of a usual week, and whether the advance is inside the limit (with the reason if not). */
export function assessAdvance(a: Advance) {
  const perWeek = Math.round(a.asked / a.weeks);
  const share = Math.round((perWeek / a.usual) * 100);
  const within = a.asked <= ADVANCE_LIMIT && a.owes === 0 && share <= ADVANCE_MAX_SHARE;
  const why = a.owes > 0 ? `already owes ${inr(a.owes)}` : share > ADVANCE_MAX_SHARE ? `repayment would be ${share}% of a usual week` : `asks above ${inr(ADVANCE_LIMIT)}`;
  return { perWeek, share, within, why, overShare: share > ADVANCE_MAX_SHARE };
}
