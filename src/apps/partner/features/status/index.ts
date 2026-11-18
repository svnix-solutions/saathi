import type { RouteMap } from '@/native/ui';
import { NoJobsScreen } from './screens/NoJobsScreen';
import { OfflineScreen } from './screens/OfflineScreen';
import { CancelledScreen } from './screens/CancelledScreen';
import { LocationOffScreen } from './screens/LocationOffScreen';

/**
 * Status feature — public API of this folder. Other features import only from here.
 * Routes: err.noJobs, err.offline, err.cancelled, err.locationOff
 */
export const routes: RouteMap = {
  'err.noJobs': NoJobsScreen, 'err.offline': OfflineScreen, 'err.cancelled': CancelledScreen, 'err.locationOff': LocationOffScreen,
};

export { NoJobsScreen, OfflineScreen, CancelledScreen, LocationOffScreen };
