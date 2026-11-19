import type { PageMap } from '../../navigation';
import { CareOverviewPage } from './pages/CareOverviewPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { CarePlansPage } from './pages/CarePlansPage';
import { CareStaffPage } from './pages/CareStaffPage';
import { IncidentsPage } from './pages/IncidentsPage';

/**
 * Saathi Care feature (design page 39) — public API of this folder. Other modules import only from here.
 * Pages: care, care.prescriptions, care.plans, care.staff, care.incidents
 */
export const pages: PageMap = {
  care: { section: 'care', title: 'Care', component: CareOverviewPage },
  'care.prescriptions': { section: 'care', title: 'Care / Prescriptions', component: PrescriptionsPage },
  'care.plans': { section: 'care', title: 'Care / Care plans', component: CarePlansPage },
  'care.staff': { section: 'care', title: 'Care / Clinical staff', component: CareStaffPage },
  'care.incidents': { section: 'care', title: 'Care / Incidents', component: IncidentsPage },
};

/** Prescriptions waiting for review (the sidebar badge). */
export { rxWaiting, resetCare } from './state';
export { CareOverviewPage, PrescriptionsPage, CarePlansPage, CareStaffPage, IncidentsPage };
