/** Price maths and validation for the membership screens (no UI). */
import { decisions, priceFor, rupees } from '@/domain';
import type { Mate, Tri } from './data';

/** Monthly plan price: visits a month from the days picked, each at the general-cleaning price, less the plan saving. */
export function planPrice(days: boolean[], minutes: number) {
  const perWeek = days.filter(Boolean).length;
  const visits = Math.round((perWeek * 52) / 12);
  const each = priceFor('general', minutes);
  const sub = visits * each;
  const saving = Math.round(sub * decisions.prices.monthlyPlanSaving);
  return { perWeek, visits, each, sub, saving, perMonth: sub - saving };
}

/** Why a damage claim cannot be sent yet, or null when it can. `other` is the "Something else" chip label, shown in the field. */
export function claimProblem(item: string, photos: number, value: string, cap: number, other: string): Tri | null {
  const v = Number(value.replace(/\D/g, ''));
  if (!item.trim() || item === other) return { en: 'Tell us what was damaged', hi: 'बताएँ कि क्या टूटा या ख़राब हुआ', pa: 'ਦੱਸੋ ਕਿ ਕੀ ਟੁੱਟਿਆ ਜਾਂ ਖ਼ਰਾਬ ਹੋਇਆ' };
  if (!photos) return { en: 'Add at least one photo', hi: 'कम से कम एक फ़ोटो जोड़ें', pa: 'ਘੱਟੋ-ਘੱਟ ਇੱਕ ਫ਼ੋਟੋ ਜੋੜੋ' };
  if (v > cap) return { en: `Cover is up to ${rupees(cap)} per visit`, hi: `हर विज़िट पर ${rupees(cap)} तक की भरपाई है`, pa: `ਹਰ ਵਿਜ਼ਿਟ ’ਤੇ ${rupees(cap)} ਤੱਕ ਦੀ ਭਰਪਾਈ ਹੈ` };
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
export function splitToggleProblem(mates: Mate[], i: number, split: boolean): Tri | null {
  if (i === 0) return { en: 'You are always in the split', hi: 'आप हमेशा बँटवारे में रहते हैं', pa: 'ਤੁਸੀਂ ਹਮੇਸ਼ਾ ਵੰਡ ਵਿੱਚ ਰਹਿੰਦੇ ਹੋ' };
  if (!split) return { en: 'Turn on splitting first', hi: 'पहले बिल बाँटना चालू करें', pa: 'ਪਹਿਲਾਂ ਬਿੱਲ ਵੰਡਣਾ ਚਾਲੂ ਕਰੋ' };
  if (mates[i].invited) return { en: 'Waiting for them to join', hi: 'उनके जुड़ने का इंतज़ार है', pa: 'ਉਹਨਾਂ ਦੇ ਜੁੜਨ ਦੀ ਉਡੀਕ ਹੈ' };
  return null;
}
