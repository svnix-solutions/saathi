import type { RouteMap } from '@/native/ui';
import { ChoresScreen } from './screens/ChoresScreen';
import { TimeScreen } from './screens/TimeScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { BookForFamilyScreen } from './screens/BookForFamilyScreen';
import { DeepCleanScreen } from './screens/DeepCleanScreen';
import { VoiceBookingScreen } from './screens/VoiceBookingScreen';
import { PhotoEstimateScreen } from './screens/PhotoEstimateScreen';
import { NotHomeScreen } from './screens/NotHomeScreen';
import { SuppliesScreen } from './screens/SuppliesScreen';

export {
  ChoresScreen, TimeScreen, ConfirmScreen, BookForFamilyScreen, DeepCleanScreen, VoiceBookingScreen, PhotoEstimateScreen,
  NotHomeScreen, SuppliesScreen,
};
export { SavedAddress } from './components/SavedAddress';
export { useBookingState, type BookingState, type BookingFor, type DeepCleanPlan } from './state';

/**
 * Booking feature — public API of this folder. Other features import only from here.
 * Routes: chores, time, confirm, bookForFamily, deepClean, voiceBooking, photoEstimate, notHome, supplies
 */
export const routes: RouteMap = {
  chores: ChoresScreen,
  time: TimeScreen,
  confirm: ConfirmScreen,
  bookForFamily: BookForFamilyScreen,
  deepClean: DeepCleanScreen,
  voiceBooking: VoiceBookingScreen,
  photoEstimate: PhotoEstimateScreen,
  notHome: NotHomeScreen,
  supplies: SuppliesScreen,
};
