import type { RouteMap } from '@/native/nav';
import { DoorCodeScreen, PayoutEarlyScreen, ShiftCheckScreen, TrainingScreen } from './shift';
import { BonusesScreen, RatingsScreen, RouteScreen, TimeOffScreen } from './route';
import { BadgesScreen, QualityScreen, RateCustomerScreen, ReviewsScreen } from './quality';
import { KindWordsScreen, ShareStoryScreen, StoriesScreen } from './voices';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  shiftCheck: ShiftCheckScreen, training: TrainingScreen, doorCode: DoorCodeScreen, payoutEarly: PayoutEarlyScreen,
  route: RouteScreen, ratings: RatingsScreen, bonuses: BonusesScreen, timeOff: TimeOffScreen,
  rateCustomer: RateCustomerScreen, reviews: ReviewsScreen, quality: QualityScreen, badges: BadgesScreen,
  stories: StoriesScreen, kindWords: KindWordsScreen, shareStory: ShareStoryScreen,
};
