import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Customer state plus the fields only the wallet feature writes. */
export type WalletState = CustomerState & {
  /** rupees off the next visit, bought with points on Rewards */
  voucher?: number;
};

/** `useCustomerState()` typed with the wallet extras. */
export const useWalletState = () => useAppState<WalletState>();
