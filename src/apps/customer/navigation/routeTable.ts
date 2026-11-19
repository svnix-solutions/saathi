/**
 * Metadata for every customer route: which release it ships in, where it is drawn in the design, and which feature
 * owns it. The design-page stories carry the same release as a Storybook tag (v1 / v2 / v3).
 */
export type Release = 'v1' | 'v2' | 'v3';
export type RouteInfo = {
  release: Release;
  /** design page number in web/design (the NN in the Design pages stories) */
  designPage: number;
  /** folder under features/ that owns the screen */
  feature: string;
  title: string;
};

export const routeTable: Record<string, RouteInfo> = {
  "signin.address": { release: 'v1', designPage: 2, feature: 'auth', title: "New customer: address" },
  "signin.name": { release: 'v1', designPage: 2, feature: 'auth', title: "New customer: name" },
  "signin.otp": { release: 'v1', designPage: 2, feature: 'auth', title: "SMS code" },
  "signin.phone": { release: 'v1', designPage: 2, feature: 'auth', title: "Mobile number" },
  "chores": { release: 'v1', designPage: 3, feature: 'booking', title: "Choose chores" },
  "confirm": { release: 'v1', designPage: 3, feature: 'booking', title: "Confirm and pay" },
  "home": { release: 'v1', designPage: 3, feature: 'home', title: "Home" },
  "time": { release: 'v1', designPage: 3, feature: 'booking', title: "Duration and time" },
  "bookings": { release: 'v1', designPage: 5, feature: 'bookings', title: "My bookings" },
  "inProgress": { release: 'v1', designPage: 5, feature: 'visit', title: "Job in progress" },
  "rate": { release: 'v1', designPage: 5, feature: 'visit', title: "Rate and tip" },
  "tracking": { release: 'v1', designPage: 5, feature: 'visit', title: "Helper on the way" },
  "visit.finish": { release: 'v1', designPage: 6, feature: 'visit', title: "Two finish codes" },
  "visit.notHappy": { release: 'v1', designPage: 6, feature: 'visit', title: "After the not-happy code" },
  "addresses": { release: 'v1', designPage: 7, feature: 'account', title: "Addresses and home details" },
  "changeBooking": { release: 'v1', designPage: 7, feature: 'bookings', title: "Change or cancel" },
  "help": { release: 'v1', designPage: 7, feature: 'support', title: "Help and safety" },
  "err.noHelper": { release: 'v1', designPage: 9, feature: 'status', title: "No helper free" },
  "err.offline": { release: 'v1', designPage: 9, feature: 'status', title: "No internet" },
  "err.outsideArea": { release: 'v1', designPage: 9, feature: 'status', title: "Outside the service area" },
  "err.paymentFailed": { release: 'v1', designPage: 9, feature: 'status', title: "Payment failed" },
  "account": { release: 'v1', designPage: 11, feature: 'account', title: "My account" },
  "alertSettings": { release: 'v1', designPage: 11, feature: 'account', title: "Alert settings" },
  "deleteAccount": { release: 'v1', designPage: 11, feature: 'account', title: "Delete my account" },
  "paymentMethods": { release: 'v1', designPage: 11, feature: 'account', title: "Payment methods" },
  "favourites": { release: 'v2', designPage: 12, feature: 'helpers', title: "Favourite helpers" },
  "plan": { release: 'v2', designPage: 12, feature: 'membership', title: "Monthly plan" },
  "receipt": { release: 'v2', designPage: 12, feature: 'bookings', title: "Receipt" },
  "supplies": { release: 'v2', designPage: 12, feature: 'booking', title: "Supplies with the visit" },
  "alerts": { release: 'v2', designPage: 13, feature: 'account', title: "Alerts" },
  "chat": { release: 'v2', designPage: 13, feature: 'helpers', title: "Chat with helper" },
  "refer": { release: 'v2', designPage: 13, feature: 'wallet', title: "Refer a friend" },
  "wallet": { release: 'v2', designPage: 13, feature: 'wallet', title: "Wallet" },
  "bookForFamily": { release: 'v2', designPage: 14, feature: 'booking', title: "Book for family" },
  "deepClean": { release: 'v2', designPage: 14, feature: 'booking', title: "Deep clean builder" },
  "helperProfile": { release: 'v2', designPage: 14, feature: 'helpers', title: "Helper profile" },
  "visitReport": { release: 'v2', designPage: 14, feature: 'visit', title: "Visit report" },
  "helperReviews": { release: 'v2', designPage: 15, feature: 'helpers', title: "Helper reviews" },
  "ratingDetailed": { release: 'v2', designPage: 15, feature: 'ratings', title: "Detailed rating" },
  "ratingLow": { release: 'v2', designPage: 15, feature: 'ratings', title: "When the rating is low" },
  "rewards": { release: 'v2', designPage: 15, feature: 'wallet', title: "Rewards" },
  "gift": { release: 'v2', designPage: 16, feature: 'wallet', title: "Gift a visit" },
  "language": { release: 'v2', designPage: 16, feature: 'account', title: "Language and display" },
  "society": { release: 'v2', designPage: 16, feature: 'community', title: "My society" },
  "supportChat": { release: 'v2', designPage: 16, feature: 'support', title: "Support chat" },
  "homeTestimonial": { release: 'v2', designPage: 17, feature: 'home', title: "Testimonial on home" },
  "myTestimonial": { release: 'v2', designPage: 17, feature: 'community', title: "My testimonial" },
  "testimonialConsent": { release: 'v2', designPage: 17, feature: 'community', title: "Permission to share" },
  "testimonials": { release: 'v2', designPage: 17, feature: 'community', title: "All testimonials" },
  "lockScreen": { release: 'v3', designPage: 18, feature: 'visit', title: "Lock screen and WhatsApp" },
  "photoEstimate": { release: 'v3', designPage: 18, feature: 'booking', title: "Photo estimate" },
  "smartHome": { release: 'v3', designPage: 18, feature: 'home', title: "Smart home screen" },
  "voiceBooking": { release: 'v3', designPage: 18, feature: 'booking', title: "Voice booking" },
  "damageClaim": { release: 'v3', designPage: 19, feature: 'membership', title: "Damage claim" },
  "notHome": { release: 'v3', designPage: 19, feature: 'booking', title: "Not-at-home visit" },
  "plus": { release: 'v3', designPage: 19, feature: 'membership', title: "Plus membership" },
  "sharedHome": { release: 'v3', designPage: 19, feature: 'membership', title: "Shared home" },
  "care.home": { release: 'v2', designPage: 37, feature: 'care', title: "Saathi Care home" },
  "care.physio": { release: 'v2', designPage: 37, feature: 'care', title: "Physiotherapy: the problem" },
  "care.plans": { release: 'v2', designPage: 37, feature: 'care', title: "Physio session plans" },
  "care.nurse": { release: 'v2', designPage: 37, feature: 'care', title: "Nurse care by the hour or day" },
  "care.procedures": { release: 'v2', designPage: 37, feature: 'care', title: "Short nurse procedures" },
  "care.prescription": { release: 'v2', designPage: 37, feature: 'care', title: "Prescription photo" },
  "care.patient": { release: 'v2', designPage: 37, feature: 'care', title: "Patient details" },
  "care.schedule": { release: 'v2', designPage: 37, feature: 'care', title: "Care start date and visit days" },
  "care.confirm": { release: 'v2', designPage: 37, feature: 'care', title: "Care confirm and pay" },
  "care.plan": { release: 'v2', designPage: 37, feature: 'care', title: "My care plan" },
  "care.notes": { release: 'v2', designPage: 37, feature: 'care', title: "Visit notes" },
};

/** Route names in a release, e.g. everything that must work at launch: `routesIn('v1')`. */
export const routesIn = (release: Release) => Object.keys(routeTable).filter((r) => routeTable[r].release === release);
