import type { RouteMap } from '@/native/ui';
import { SocietyScreen } from './screens/SocietyScreen';
import { TestimonialsScreen } from './screens/TestimonialsScreen';
import { TestimonialConsentScreen } from './screens/TestimonialConsentScreen';
import { MyTestimonialScreen } from './screens/MyTestimonialScreen';

/**
 * Community feature — public API of this folder. Other features import only from here.
 * Routes: society, testimonials, testimonialConsent, myTestimonial
 */
export const routes: RouteMap = {
  society: SocietyScreen,
  testimonials: TestimonialsScreen,
  testimonialConsent: TestimonialConsentScreen,
  myTestimonial: MyTestimonialScreen,
};

export { SocietyScreen, TestimonialsScreen, TestimonialConsentScreen, MyTestimonialScreen };
export { quotes, type Quote } from './data';
