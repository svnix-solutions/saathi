import type { PageMap } from '../../navigation';
import { ServicesPage } from './pages/ServicesPage';
import { ZonesPage } from './pages/ZonesPage';
import { OffersPage } from './pages/OffersPage';

/**
 * Catalog feature — public API of this folder. Other features import only from here.
 * Pages: services, zones, offers
 */
export const pages: PageMap = {
  services: { section: 'pricing', title: 'Pricing & zones / Services', component: ServicesPage },
  zones: { section: 'pricing', title: 'Pricing & zones', component: ZonesPage },
  offers: { section: 'pricing', title: 'Campaigns / Offer codes', component: OffersPage },
};

export { ServicesPage, ZonesPage, OffersPage };
