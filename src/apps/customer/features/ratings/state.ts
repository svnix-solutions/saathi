import { useAppState } from '@/native/ui';
import type { CustomerState } from '../../state';

/** Per-part stars from the detailed rating. */
export type RatingParts = { time: number; quality: number; behaviour: number };

/** Rating fields not (yet) in CustomerState. */
export type RatingState = CustomerState & { ratingParts?: RatingParts };

/** `useCustomerState()` with the rating fields typed. */
export const useRatingState = () => useAppState<RatingState>();
