import type { RouteMap } from '@/native/ui';
import { TrackingScreen } from './screens/TrackingScreen';
import { InProgressScreen } from './screens/InProgressScreen';
import { FinishCodesScreen } from './screens/FinishCodesScreen';
import { NotHappyScreen } from './screens/NotHappyScreen';
import { RateScreen } from './screens/RateScreen';
import { LockScreenScreen } from './screens/LockScreenScreen';
import { VisitReportScreen } from './screens/VisitReportScreen';

export { TrackingScreen, InProgressScreen, FinishCodesScreen, NotHappyScreen, RateScreen, LockScreenScreen, VisitReportScreen };
export { CodeCard, type CodeCardProps } from './components/CodeCard';
export { useVisitState, type VisitState } from './state';

/**
 * Visit feature — public API of this folder. Other features import only from here.
 * Routes: tracking, inProgress, visit.finish, visit.notHappy, rate, lockScreen, visitReport
 */
export const routes: RouteMap = {
  tracking: TrackingScreen,
  inProgress: InProgressScreen,
  'visit.finish': FinishCodesScreen,
  'visit.notHappy': NotHappyScreen,
  rate: RateScreen,
  lockScreen: LockScreenScreen,
  visitReport: VisitReportScreen,
};
