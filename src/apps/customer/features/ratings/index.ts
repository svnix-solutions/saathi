import type { RouteMap } from '@/native/ui';
import { RatingDetailedScreen } from './screens/RatingDetailedScreen';
import { RatingLowScreen } from './screens/RatingLowScreen';

export { RatingDetailedScreen, RatingLowScreen };
export { useRatingState, type RatingState, type RatingParts } from './state';

/**
 * Ratings feature — public API of this folder. Other features import only from here.
 * Routes: ratingDetailed, ratingLow
 */
export const routes: RouteMap = {
  ratingDetailed: RatingDetailedScreen,
  ratingLow: RatingLowScreen,
};
