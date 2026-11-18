import { inr } from '../../fixtures';
import type { OfferCode, OfferKind } from './data';

/** "₹50 off" or "10% off". */
export const offerText = (c: { kind: OfferKind; value: number }) => c.kind === 'rs' ? `${inr(c.value)} off` : `${c.value}% off`;

/** The line the customer sees for a code, in quotes: "₹50 off your first visit with code FIRST50." */
export function customerSees(c: OfferCode) {
  const what = c.first ? 'your first visit' : c.forWho === 'Monthly plans' ? 'your monthly plan' : c.forWho === 'Everyone' ? 'your next visit' : `${c.forWho.toLowerCase()}`;
  return `"${offerText(c)} ${what} with code ${c.code || '…'}${c.until !== 'No end' && c.until !== 'No end date' ? `, till ${c.until}` : ''}."`;
}

/** Codes are 4 to 12 capital letters or numbers. */
export const isValidOfferCode = (code: string) => /^[A-Z0-9]{4,12}$/.test(code);
