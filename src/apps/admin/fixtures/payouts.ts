/** Sample weekly partner payouts (prototype data only). Mutated through `fixtures/store.ts`. */
import type { PayoutStatus } from '../ui/StatusTag';

export type { PayoutStatus };
export type Payout = { id: string; name: string; face: string; jobs: number; earnings: number; tips: number; status: PayoutStatus };

/** A fresh copy of the sample payouts. */
export const initialPayouts = (): Payout[] => [
  { id: 'rm', name: 'Rekha M.', face: 'rm', jobs: 22, earnings: 3190, tips: 240, status: 'approved' },
  { id: 'sd', name: 'Sunita D.', face: 'sd', jobs: 19, earnings: 2596, tips: 250, status: 'approved' },
  { id: 'kr', name: 'Kavita R.', face: 'kr', jobs: 17, earnings: 2410, tips: 180, status: 'toApprove' },
  { id: 'ab', name: 'Anita B.', face: 'ab', jobs: 11, earnings: 1474, tips: 60, status: 'toApprove' },
  { id: 'gk', name: 'Geeta K.', face: 'gk', jobs: 4, earnings: 520, tips: 0, status: 'hold' },
  { id: 'mt', name: 'Meena T.', face: 'mt', jobs: 15, earnings: 2085, tips: 110, status: 'paid' },
];
