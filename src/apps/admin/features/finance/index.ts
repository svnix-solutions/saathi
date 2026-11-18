import type { PageMap } from '../../navigation';
import { PayoutsPage } from './pages/PayoutsPage';
import { AdvancesPage } from './pages/AdvancesPage';

/**
 * Finance feature — public API of this folder. Other features import only from here.
 * Pages: payouts, advances
 */
export const pages: PageMap = {
  payouts: { section: 'payouts', title: 'Payouts', component: PayoutsPage },
  advances: { section: 'payouts', title: 'Payouts / Advances', component: AdvancesPage },
};

export { PayoutsPage, AdvancesPage };
