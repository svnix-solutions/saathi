import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Helper fields not (yet) in CustomerState. */
export type HelperState = CustomerState & {
  /** the helper picked from Favourites ("Book Sunita") for the booking being built */
  helper?: string;
};

/** `useCustomerState()` with the helper fields typed. */
export const useHelperState = () => useAppState<HelperState>();
