import type { RouteMap } from '@/native/ui';
import { AdvanceScreen } from './screens/AdvanceScreen';
import { BenefitsScreen } from './screens/BenefitsScreen';
import { BonusesScreen } from './screens/BonusesScreen';
import { EarningsScreen } from './screens/EarningsScreen';
import { KitShopScreen } from './screens/KitShopScreen';
import { PayoutEarlyScreen } from './screens/PayoutEarlyScreen';
import { PlannerScreen } from './screens/PlannerScreen';
import { SavingsScreen } from './screens/SavingsScreen';

export { AdvanceScreen, BenefitsScreen, BonusesScreen, EarningsScreen, KitShopScreen, PayoutEarlyScreen, PlannerScreen, SavingsScreen };

/**
 * Earnings feature — public API of this folder. Other features import only from here.
 * Routes: earnings, payoutEarly, bonuses, planner, advance, savings, benefits, kitShop
 */
export const routes: RouteMap = {
  earnings: EarningsScreen,
  payoutEarly: PayoutEarlyScreen,
  bonuses: BonusesScreen,
  planner: PlannerScreen,
  advance: AdvanceScreen,
  savings: SavingsScreen,
  benefits: BenefitsScreen,
  kitShop: KitShopScreen,
};
