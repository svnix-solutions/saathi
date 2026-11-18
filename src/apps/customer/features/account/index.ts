import type { RouteMap } from '@/native/ui';
import { AccountScreen } from './screens/AccountScreen';
import { PaymentMethodsScreen } from './screens/PaymentMethodsScreen';
import { AlertSettingsScreen } from './screens/AlertSettingsScreen';
import { DeleteAccountScreen } from './screens/DeleteAccountScreen';
import { AddressesScreen } from './screens/AddressesScreen';
import { LanguageScreen } from './screens/LanguageScreen';
import { AlertsScreen } from './screens/AlertsScreen';

export { AccountScreen, PaymentMethodsScreen, AlertSettingsScreen, DeleteAccountScreen, AddressesScreen, LanguageScreen, AlertsScreen };

/**
 * Account feature — public API of this folder. Other features import only from here.
 * Routes: account, paymentMethods, alertSettings, deleteAccount, addresses, language, alerts
 */
export const routes: RouteMap = {
  account: AccountScreen,
  paymentMethods: PaymentMethodsScreen,
  alertSettings: AlertSettingsScreen,
  deleteAccount: DeleteAccountScreen,
  addresses: AddressesScreen,
  language: LanguageScreen,
  alerts: AlertsScreen,
};
