import type { RouteMap } from '@/native/ui';
import { CareHomeScreen } from './screens/CareHomeScreen';
import { PhysioScreen } from './screens/PhysioScreen';
import { PlansScreen } from './screens/PlansScreen';
import { NurseScreen } from './screens/NurseScreen';
import { ProceduresScreen } from './screens/ProceduresScreen';
import { PrescriptionScreen } from './screens/PrescriptionScreen';
import { PatientScreen } from './screens/PatientScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { CarePlanScreen } from './screens/CarePlanScreen';
import { VisitNotesScreen } from './screens/VisitNotesScreen';

export { CareHomeScreen, PhysioScreen, PlansScreen, NurseScreen, ProceduresScreen, PrescriptionScreen, PatientScreen, ScheduleScreen, ConfirmScreen, CarePlanScreen, VisitNotesScreen };
export type { CareState } from './state';
export type { CarePlan, CareDraft } from './rules';
export { SAMPLE_PATIENT, SAMPLE_PLAN } from './rules';

/**
 * Saathi Care feature (design page 37) — physiotherapy and nurse care at home. Public API of this folder.
 * Routes: care.home, care.physio, care.plans, care.nurse, care.procedures, care.prescription, care.patient,
 * care.schedule, care.confirm, care.plan, care.notes
 */
export const routes: RouteMap = {
  'care.home': CareHomeScreen,
  'care.physio': PhysioScreen,
  'care.plans': PlansScreen,
  'care.nurse': NurseScreen,
  'care.procedures': ProceduresScreen,
  'care.prescription': PrescriptionScreen,
  'care.patient': PatientScreen,
  'care.schedule': ScheduleScreen,
  'care.confirm': ConfirmScreen,
  'care.plan': CarePlanScreen,
  'care.notes': VisitNotesScreen,
};
