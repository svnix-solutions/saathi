import { decisions } from '@/domain';
import { useWalletState } from '../state';
import { FREE_MINUTES_POINTS, GOLD_POINTS, POINTS_DEFAULT } from '../data';

/** Points balance and what it can buy: the rupee voucher and 30 free minutes. */
export function useRewards() {
  const [st, set] = useWalletState();
  const points = st.points ?? POINTS_DEFAULT;
  const { points: cost, rupees: off } = decisions.customer.pointsRedeem;
  return {
    points,
    /** points for the voucher, and rupees it takes off */
    cost, off,
    canRedeem: points >= cost,
    canFreeMinutes: points >= FREE_MINUTES_POINTS,
    gold: points >= GOLD_POINTS,
    /** 0–1 progress towards Gold */
    toGold: Math.min(1, points / GOLD_POINTS),
    redeem: () => set({ points: points - cost, voucher: off }),
    takeFreeMinutes: () => set({ points: points - FREE_MINUTES_POINTS }),
  };
}
