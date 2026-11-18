import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Community extras: the helper picked from "Helpers your neighbours trust" before going to chores. */
export type CommunityState = CustomerState & { helper?: string };

export const useCommunityState = () => useAppState<CommunityState>();
