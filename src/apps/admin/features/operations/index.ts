import type { PageMap } from '../../navigation';
import { DashboardPage } from './pages/DashboardPage';
import { BookingsPage } from './pages/BookingsPage';
import { AssignPage } from './pages/AssignPage';
import { LivePage } from './pages/LivePage';
import { SmallScreensPage } from './pages/SmallScreensPage';

export { DashboardPage, BookingsPage, AssignPage, LivePage, SmallScreensPage };

/**
 * Operations feature — public API of this folder. Other features import only from here.
 * Pages: dashboard, bookings, assign, live, smallScreens
 */
export const pages: PageMap = {
  dashboard: { section: 'dashboard', title: 'Dashboard', component: DashboardPage },
  bookings: { section: 'bookings', title: 'Bookings', component: BookingsPage },
  assign: { section: 'bookings', title: 'Bookings', component: AssignPage },
  live: { section: 'live', title: 'Live map', component: LivePage },
  smallScreens: { section: 'dashboard', title: 'Tablet and phone', component: SmallScreensPage },
};
