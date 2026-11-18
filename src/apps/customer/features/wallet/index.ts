import type { RouteMap } from '@/native/ui';
import { WalletScreen } from './screens/WalletScreen';
import { ReferScreen } from './screens/ReferScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { GiftScreen } from './screens/GiftScreen';

export { WalletScreen, ReferScreen, RewardsScreen, GiftScreen };

/**
 * Wallet feature — public API of this folder. Other features import only from here.
 * Routes: wallet, refer, rewards, gift
 */
export const routes: RouteMap = {
  wallet: WalletScreen,
  refer: ReferScreen,
  rewards: RewardsScreen,
  gift: GiftScreen,
};
