import { useAppState } from '@/native/ui';
import type { PartnerState } from '../../state';

/** Account fields written by these screens that are not (yet) in `state/types.ts`. */
export type AccountState = PartnerState & {
  /** full name as on Aadhaar (written at sign-up) */
  fullName?: string;
  /** languages the partner speaks (English names) */
  langs?: string[];
  /** where pay goes, e.g. "State Bank of India ···· 4821" or a UPI ID */
  bankLabel?: string;
  /** Mon…Sun the partner works */
  workDays?: boolean[];
  /** morning / midday / evening shifts switched on */
  shifts?: boolean[];
};

/** `usePartnerState()` typed with the account fields. */
export const useAccountState = () => useAppState<AccountState>();
