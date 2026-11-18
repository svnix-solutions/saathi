import type { RouteMap } from '@/native/ui';
import { NoHelperScreen } from './screens/NoHelperScreen';
import { OfflineScreen } from './screens/OfflineScreen';
import { PaymentFailedScreen } from './screens/PaymentFailedScreen';
import { OutsideAreaScreen } from './screens/OutsideAreaScreen';

/**
 * Status feature — public API of this folder. Other features import only from here.
 * Routes: err.noHelper, err.offline, err.paymentFailed, err.outsideArea
 */
export const routes: RouteMap = {
  'err.noHelper': NoHelperScreen,
  'err.offline': OfflineScreen,
  'err.paymentFailed': PaymentFailedScreen,
  'err.outsideArea': OutsideAreaScreen,
};

export { NoHelperScreen, OfflineScreen, PaymentFailedScreen, OutsideAreaScreen };
export { StatusScreen, type StatusScreenProps } from './components/StatusScreen';
