/**
 * Metadata for every partner route: which release it ships in, where it is drawn in the design, and which feature
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
  "signin.details": { release: 'v1', designPage: 20, feature: 'onboarding', title: "Name and email" },
  "signin.otp": { release: 'v1', designPage: 20, feature: 'onboarding', title: "SMS code" },
  "signin.phone": { release: 'v1', designPage: 20, feature: 'onboarding', title: "Mobile number" },
  "signin.references": { release: 'v1', designPage: 20, feature: 'onboarding', title: "Two references" },
  "signin.aadhaar": { release: 'v1', designPage: 21, feature: 'onboarding', title: "Aadhaar upload" },
  "signin.pan": { release: 'v1', designPage: 21, feature: 'onboarding', title: "PAN upload" },
  "signin.refCode": { release: 'v1', designPage: 21, feature: 'onboarding', title: "Reference code" },
  "signin.waiting": { release: 'v1', designPage: 21, feature: 'onboarding', title: "Waiting for approval" },
  "signin.docUpload": { release: 'v1', designPage: 22, feature: 'onboarding', title: "Certificate upload" },
  "signin.documents": { release: 'v1', designPage: 22, feature: 'onboarding', title: "Documents list" },
  "signin.skills": { release: 'v1', designPage: 22, feature: 'onboarding', title: "Skills" },
  "signin.specializations": { release: 'v1', designPage: 22, feature: 'onboarding', title: "Specialisations" },
  "signin.work": { release: 'v1', designPage: 22, feature: 'onboarding', title: "Your work" },
  "earnings": { release: 'v1', designPage: 23, feature: 'earnings', title: "Earnings" },
  "home": { release: 'v1', designPage: 23, feature: 'jobs', title: "Home, online" },
  "jobRequest": { release: 'v1', designPage: 23, feature: 'jobs', title: "New job request" },
  "jobs": { release: 'v1', designPage: 23, feature: 'jobs', title: "Jobs tab" },
  "onJob": { release: 'v1', designPage: 23, feature: 'jobs', title: "On the job" },
  "help": { release: 'v1', designPage: 24, feature: 'account', title: "Help" },
  "hours": { release: 'v1', designPage: 24, feature: 'account', title: "Working hours" },
  "idCard": { release: 'v1', designPage: 24, feature: 'account', title: "Digital ID card" },
  "joining": { release: 'v1', designPage: 24, feature: 'account', title: "Joining" },
  "checkIn": { release: 'v1', designPage: 25, feature: 'jobs', title: "Check in" },
  "checkOut": { release: 'v1', designPage: 25, feature: 'jobs', title: "Check out" },
  "live": { release: 'v1', designPage: 25, feature: 'jobs', title: "Live on the job" },
  "selfie": { release: 'v1', designPage: 25, feature: 'jobs', title: "Selfie upload" },
  "err.cancelled": { release: 'v1', designPage: 26, feature: 'status', title: "Customer cancelled" },
  "err.locationOff": { release: 'v1', designPage: 26, feature: 'status', title: "Location is off" },
  "err.noJobs": { release: 'v1', designPage: 26, feature: 'status', title: "No jobs right now" },
  "err.offline": { release: 'v1', designPage: 26, feature: 'status', title: "No internet on the job" },
  "alerts": { release: 'v1', designPage: 27, feature: 'account', title: "Alerts" },
  "bank": { release: 'v1', designPage: 27, feature: 'account', title: "Bank account" },
  "profile": { release: 'v1', designPage: 27, feature: 'account', title: "My profile" },
  "doorCode": { release: 'v2', designPage: 29, feature: 'jobs', title: "Start with start code" },
  "payoutEarly": { release: 'v2', designPage: 29, feature: 'earnings', title: "Take out earnings" },
  "shiftCheck": { release: 'v2', designPage: 29, feature: 'jobs', title: "Shift check-in" },
  "training": { release: 'v2', designPage: 29, feature: 'growth', title: "Training lessons" },
  "finish.happy": { release: 'v1', designPage: 30, feature: 'jobs', title: "Happy code" },
  "finish.notHappy": { release: 'v1', designPage: 30, feature: 'jobs', title: "Not-happy code" },
  "finishCode": { release: 'v1', designPage: 30, feature: 'jobs', title: "Finish code" },
  "bonuses": { release: 'v2', designPage: 31, feature: 'earnings', title: "Bonuses" },
  "ratings": { release: 'v2', designPage: 31, feature: 'growth', title: "My ratings" },
  "route": { release: 'v2', designPage: 31, feature: 'jobs', title: "Route to the job" },
  "timeOff": { release: 'v2', designPage: 31, feature: 'jobs', title: "Time off" },
  "badges": { release: 'v2', designPage: 32, feature: 'growth', title: "Badges" },
  "quality": { release: 'v2', designPage: 32, feature: 'growth', title: "Quality score" },
  "rateCustomer": { release: 'v2', designPage: 32, feature: 'jobs', title: "Rate the customer" },
  "reviews": { release: 'v2', designPage: 32, feature: 'growth', title: "Reviews received" },
  "kindWords": { release: 'v2', designPage: 33, feature: 'growth', title: "Kind words for me" },
  "shareStory": { release: 'v2', designPage: 33, feature: 'growth', title: "Share my story" },
  "stories": { release: 'v2', designPage: 33, feature: 'growth', title: "Partner stories" },
  "demandMap": { release: 'v3', designPage: 34, feature: 'jobs', title: "Demand map" },
  "photoCheck": { release: 'v3', designPage: 34, feature: 'jobs', title: "Instant photo check" },
  "planner": { release: 'v3', designPage: 34, feature: 'earnings', title: "Earnings planner" },
  "voiceGuide": { release: 'v3', designPage: 34, feature: 'jobs', title: "Voice guide" },
  "advance": { release: 'v3', designPage: 35, feature: 'earnings', title: "Pay advance" },
  "benefits": { release: 'v3', designPage: 35, feature: 'earnings', title: "Benefits" },
  "community": { release: 'v3', designPage: 35, feature: 'growth', title: "Community" },
  "kitShop": { release: 'v3', designPage: 35, feature: 'earnings', title: "Kit shop" },
  "career": { release: 'v3', designPage: 36, feature: 'growth', title: "Career path" },
  "documents": { release: 'v3', designPage: 36, feature: 'account', title: "Documents" },
  "savings": { release: 'v3', designPage: 36, feature: 'earnings', title: "Savings pot" },
  "swapJob": { release: 'v3', designPage: 36, feature: 'jobs', title: "Swap a job" },
};

/** Route names in a release, e.g. everything that must work at launch: `routesIn('v1')`. */
export const routesIn = (release: Release) => Object.keys(routeTable).filter((r) => routeTable[r].release === release);
