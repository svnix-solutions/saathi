import type { PageMap } from '../../navigation';
import { CampaignsPage } from './pages/CampaignsPage';

export { CampaignsPage };

/**
 * Campaigns feature — public API of this folder. Other features import only from here.
 * Pages: campaigns
 */
export const pages: PageMap = {
  campaigns: { section: 'campaigns', title: 'Campaigns', component: CampaignsPage },
};
