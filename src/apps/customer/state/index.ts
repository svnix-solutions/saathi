import { useAppState } from '@/native/ui';
import type { CustomerState } from './types';

export * from './types';
export * from './initial';

/** Read and update the customer prototype state: `const [st, set] = useCustomerState(); set({ minutes: 90 })`. */
export const useCustomerState = () => useAppState<CustomerState>();
