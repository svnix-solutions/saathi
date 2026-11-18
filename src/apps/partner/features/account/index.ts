import type { RouteMap } from '@/native/ui';
import { AlertsScreen } from './screens/AlertsScreen';
import { BankScreen } from './screens/BankScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { HelpScreen } from './screens/HelpScreen';
import { HoursScreen } from './screens/HoursScreen';
import { IdCardScreen } from './screens/IdCardScreen';
import { JoiningScreen } from './screens/JoiningScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export { AlertsScreen, BankScreen, DocumentsScreen, HelpScreen, HoursScreen, IdCardScreen, JoiningScreen, ProfileScreen };
export type { AccountState } from './state';

/**
 * Account feature — public API of this folder. Other features import only from here.
 * Routes: profile, bank, alerts, joining, hours, idCard, help, documents
 */
export const routes: RouteMap = {
  profile: ProfileScreen, bank: BankScreen, alerts: AlertsScreen, joining: JoiningScreen,
  hours: HoursScreen, idCard: IdCardScreen, help: HelpScreen, documents: DocumentsScreen,
};
