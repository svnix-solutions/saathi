import { useAppState } from '@/native/ui';
import type { PartnerState } from './types';

/** Read and update the partner prototype state: `const [st, set] = usePartnerState(); set({ online: false })`. */
export const usePartnerState = () => useAppState<PartnerState>();
