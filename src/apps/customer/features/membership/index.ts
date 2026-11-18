import type { RouteMap } from '@/native/ui';
import { PlanScreen } from './screens/PlanScreen';
import { PlusScreen } from './screens/PlusScreen';
import { DamageClaimScreen } from './screens/DamageClaimScreen';
import { SharedHomeScreen } from './screens/SharedHomeScreen';

export { PlanScreen, PlusScreen, DamageClaimScreen, SharedHomeScreen };
export type { MonthlyPlan, MembershipState } from './state';

/**
 * Membership feature — public API of this folder. Other features import only from here.
 * Routes: plan, plus, damageClaim, sharedHome
 */
export const routes: RouteMap = {
  plan: PlanScreen,
  plus: PlusScreen,
  damageClaim: DamageClaimScreen,
  sharedHome: SharedHomeScreen,
};
