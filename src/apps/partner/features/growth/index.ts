import type { RouteMap } from '@/native/ui';
import { BadgesScreen } from './screens/BadgesScreen';
import { CareerScreen } from './screens/CareerScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { KindWordsScreen } from './screens/KindWordsScreen';
import { QualityScreen } from './screens/QualityScreen';
import { RatingsScreen } from './screens/RatingsScreen';
import { ReviewsScreen } from './screens/ReviewsScreen';
import { ShareStoryScreen } from './screens/ShareStoryScreen';
import { StoriesScreen } from './screens/StoriesScreen';
import { TrainingScreen } from './screens/TrainingScreen';

export {
  BadgesScreen, CareerScreen, CommunityScreen, KindWordsScreen, QualityScreen, RatingsScreen, ReviewsScreen,
  ShareStoryScreen, StoriesScreen, TrainingScreen,
};

/**
 * Growth feature — public API of this folder. Other features import only from here.
 * Routes: ratings, reviews, quality, badges, stories, kindWords, shareStory, community, career, training
 */
export const routes: RouteMap = {
  ratings: RatingsScreen,
  reviews: ReviewsScreen,
  quality: QualityScreen,
  badges: BadgesScreen,
  stories: StoriesScreen,
  kindWords: KindWordsScreen,
  shareStory: ShareStoryScreen,
  community: CommunityScreen,
  career: CareerScreen,
  training: TrainingScreen,
};
