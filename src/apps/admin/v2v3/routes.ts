import type { PageMap } from '../shell';
import { Customers, CustomerDetail } from './customers';
import { Ratings } from './ratings';
import { Zones } from './zones';
import { Testimonials } from './testimonials';
import { Offers } from './offers';
import { SmallScreens } from './smallScreens';
import { Smart } from './smart';
import { Campaigns } from './campaigns';
import { Claims } from './claims';
import { Advances } from './advances';

/** Admin pages owned by this area. Keys are the shared page names listed in ../PAGES.md. */
export const pages: PageMap = {
  // V2
  customers: { section: 'customers', title: 'Customers', component: Customers },
  customerDetail: { section: 'customers', title: 'Customers', component: CustomerDetail },
  ratings: { section: 'ratings', title: 'Ratings', component: Ratings },
  zones: { section: 'pricing', title: 'Pricing & zones', component: Zones },
  testimonials: { section: 'support', title: 'Testimonials', component: Testimonials },
  offers: { section: 'pricing', title: 'Campaigns / Offer codes', component: Offers },
  smallScreens: { section: 'dashboard', title: 'Tablet and phone', component: SmallScreens },
  // V3
  smart: { section: 'automation', title: 'Automation', component: Smart },
  campaigns: { section: 'campaigns', title: 'Campaigns', component: Campaigns },
  claims: { section: 'support', title: 'Support / Damage claims', component: Claims },
  advances: { section: 'payouts', title: 'Payouts / Advances', component: Advances },
};
