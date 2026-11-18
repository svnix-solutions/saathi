/** Price maths and validation for the membership screens (no UI). */
import { decisions, priceFor, rupees } from '@/domain';
import type { Mate } from './data';
import { OTHER_ITEM } from './data';

/** Monthly plan price: visits a month from the days picked, each at the general-cleaning price, less the plan saving. */
export function planPrice(days: boolean[], minutes: number) {
  const perWeek = days.filter(Boolean).length;
  const visits = Math.round((perWeek * 52) / 12);
  const each = priceFor('general', minutes);
  const sub = visits * each;
  const saving = Math.round(sub * decisions.prices.monthlyPlanSaving);
  return { perWeek, visits, each, sub, saving, perMonth: sub - saving };
}

/** Why a damage claim cannot be sent yet, or null when it can. */
export function claimProblem(item: string, photos: number, value: string, cap: number) {
  const v = Number(value.replace(/\D/g, ''));
  if (!item.trim() || item === OTHER_ITEM) return 'Tell us what was damaged';
  if (!photos) return 'Add at least one photo';
  if (v > cap) return `Cover is up to ${rupees(cap)} per visit`;
  return null;
}

/** Who pays what in a shared home: `amount(i)` is null for someone still invited. */
export function splitBill(mates: Mate[], split: boolean, weekly: number) {
  const payers = mates.filter((m, i) => !m.invited && (i === 0 || (split && m.inSplit)));
  const share = Math.round(weekly / payers.length);
  const amount = (i: number) => {
    const m = mates[i];
    return m.invited ? null : !split ? (i === 0 ? weekly : 0) : m.inSplit || i === 0 ? share : 0;
  };
  return { share, amount };
}

/** Why a flatmate cannot be toggled in or out of the split, or null when they can. */
export function splitToggleProblem(mates: Mate[], i: number, split: boolean) {
  if (i === 0) return 'You are always in the split';
  if (!split) return 'Turn on splitting first';
  if (mates[i].invited) return 'Waiting for them to join';
  return null;
}
