import type { PageMap } from '../shell';
import { LoginPage } from './login';
import { DashboardPage } from './dashboard';
import { PartnersPage } from './partners';
import { PayoutsPage, SupportPage } from './payouts';
import { AssignPage } from './assign';
import { LivePage } from './live';
import { BookingsPage } from './bookings';
import { TicketPage } from './ticket';

/** Admin pages owned by this area. Keys are the shared page names listed in ../PAGES.md. */
export const pages: PageMap = {
  login: { section: 'dashboard', title: 'Sign in', component: LoginPage },
  dashboard: { section: 'dashboard', title: 'Dashboard', component: DashboardPage },
  partners: { section: 'partners', title: 'Partners', component: PartnersPage },
  payouts: { section: 'payouts', title: 'Payouts', component: PayoutsPage },
  support: { section: 'support', title: 'Support', component: SupportPage },
  assign: { section: 'bookings', title: 'Bookings', component: AssignPage },
  live: { section: 'live', title: 'Live map', component: LivePage },
  bookings: { section: 'bookings', title: 'Bookings', component: BookingsPage },
  ticket: { section: 'support', title: 'Support', component: TicketPage },
};
