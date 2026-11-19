import type { RouteMap } from '@/native/ui';
import { CredentialsScreen } from './screens/CredentialsScreen';
import { NotesScreen } from './screens/NotesScreen';
import { PatientScreen } from './screens/PatientScreen';
import { TodayScreen } from './screens/TodayScreen';
import { VisitScreen } from './screens/VisitScreen';

export { CredentialsScreen, NotesScreen, PatientScreen, TodayScreen, VisitScreen };

/**
 * Saathi Care feature (nurses and physiotherapists) — public API of this folder. Other features import only from here.
 * Routes: care.today, care.visit, care.notes, care.patient, care.credentials
 */
export const routes: RouteMap = {
  'care.today': TodayScreen,
  'care.visit': VisitScreen,
  'care.notes': NotesScreen,
  'care.patient': PatientScreen,
  'care.credentials': CredentialsScreen,
};

export { useCareState, type CareState } from './state';
