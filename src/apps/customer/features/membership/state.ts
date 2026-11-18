import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** The monthly plan the customer starts on the Plan screen. */
export type MonthlyPlan = { days: boolean[]; time: string; minutes: number; helper: string; perMonth: number };

/** Customer state plus the fields only the membership feature writes. */
export type MembershipState = CustomerState & {
  plan?: MonthlyPlan;
};

/** `useCustomerState()` typed with the membership extras. */
export const useMembershipState = () => useAppState<MembershipState>();
