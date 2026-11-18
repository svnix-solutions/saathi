import type { RouteMap } from '@/native/ui';
import { HomeScreen } from './screens/HomeScreen';
import { HomeTestimonialScreen } from './screens/HomeTestimonialScreen';
import { SmartHomeScreen } from './screens/SmartHomeScreen';

export { HomeScreen, HomeTestimonialScreen, SmartHomeScreen };

/**
 * Home feature — public API of this folder. Other features import only from here.
 * Routes: home, homeTestimonial, smartHome
 */
export const routes: RouteMap = {
  home: HomeScreen,
  homeTestimonial: HomeTestimonialScreen,
  smartHome: SmartHomeScreen,
};
