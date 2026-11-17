import type { RouteMap } from '@/native/nav';
import { GiftScreen, LanguageScreen, SocietyScreen, SupportChatScreen } from './community';
import { HomeTestimonialScreen, MyTestimonialScreen, TestimonialConsentScreen, TestimonialsScreen } from './testimonials';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  language: LanguageScreen,
  gift: GiftScreen,
  supportChat: SupportChatScreen,
  society: SocietyScreen,
  homeTestimonial: HomeTestimonialScreen,
  testimonials: TestimonialsScreen,
  testimonialConsent: TestimonialConsentScreen,
  myTestimonial: MyTestimonialScreen,
};
