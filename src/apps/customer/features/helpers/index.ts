import type { RouteMap } from '@/native/ui';
import { FavouritesScreen } from './screens/FavouritesScreen';
import { HelperProfileScreen } from './screens/HelperProfileScreen';
import { HelperReviewsScreen } from './screens/HelperReviewsScreen';
import { ChatScreen } from './screens/ChatScreen';

export { FavouritesScreen, HelperProfileScreen, HelperReviewsScreen, ChatScreen };
export { helperName, latinParts, tr, type Tri } from './data';

/**
 * Helpers feature — public API of this folder. Other features import only from here.
 * Routes: favourites, helperProfile, helperReviews, chat
 */
export const routes: RouteMap = {
  favourites: FavouritesScreen,
  helperProfile: HelperProfileScreen,
  helperReviews: HelperReviewsScreen,
  chat: ChatScreen,
};
