import type { RouteMap } from '@/native/nav';
import { FavouritesScreen, PlanScreen, ReceiptScreen, SuppliesScreen } from './plans';
import { AlertsScreen, ChatScreen, ReferScreen, WalletScreen } from './wallet';
import { BookForFamilyScreen, DeepCleanScreen, HelperProfileScreen, VisitReportScreen } from './helper';
import { HelperReviewsScreen, RatingDetailedScreen, RatingLowScreen, RewardsScreen } from './ratings';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  plan: PlanScreen,
  favourites: FavouritesScreen,
  supplies: SuppliesScreen,
  receipt: ReceiptScreen,
  wallet: WalletScreen,
  refer: ReferScreen,
  chat: ChatScreen,
  alerts: AlertsScreen,
  helperProfile: HelperProfileScreen,
  visitReport: VisitReportScreen,
  bookForFamily: BookForFamilyScreen,
  deepClean: DeepCleanScreen,
  ratingDetailed: RatingDetailedScreen,
  ratingLow: RatingLowScreen,
  helperReviews: HelperReviewsScreen,
  rewards: RewardsScreen,
};
