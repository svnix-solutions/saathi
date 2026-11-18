import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Visit fields not (yet) in CustomerState. */
export type VisitState = CustomerState & {
  /** set when the helper started the job with the customer's start code */
  startedByCode?: boolean;
  /** which finish code the helper entered */
  visitOutcome?: 'satisfied' | 'not_satisfied';
};

/** `useCustomerState()` with the visit fields typed. */
export const useVisitState = () => useAppState<VisitState>();
