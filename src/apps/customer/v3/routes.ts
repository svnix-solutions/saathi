import type { RouteMap } from '@/native/nav';
import { LockScreenScreen, PhotoEstimateScreen, SmartHomeScreen, VoiceBookingScreen } from './smart';
import { DamageClaimScreen, NotHomeScreen, PlusScreen, SharedHomeScreen } from './membership';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  voiceBooking: VoiceBookingScreen,
  photoEstimate: PhotoEstimateScreen,
  smartHome: SmartHomeScreen,
  lockScreen: LockScreenScreen,
  plus: PlusScreen,
  damageClaim: DamageClaimScreen,
  sharedHome: SharedHomeScreen,
  notHome: NotHomeScreen,
};
