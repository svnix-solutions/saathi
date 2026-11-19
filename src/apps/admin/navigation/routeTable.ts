/**
 * Metadata for every admin route: which release it ships in, where it is drawn in the design, and which feature
 * owns it. The design-page stories carry the same release as a Storybook tag (v1 / v2 / v3).
 */
export type Release = 'v1' | 'v2' | 'v3';
export type RouteInfo = {
  release: Release;
  /** section number of the admin page in web/design */
  designPage: number;
  /** folder under features/ that owns the screen */
  feature: string;
  title: string;
};

export const routeTable: Record<string, RouteInfo> = {
  "dashboard": { release: 'v1', designPage: 5, feature: 'operations', title: "Live operations" },
  "partners": { release: 'v1', designPage: 6, feature: 'partners', title: "Partners and pricing" },
  "care": { release: 'v2', designPage: 39, feature: 'care', title: "Saathi Care overview" },
  "care.prescriptions": { release: 'v2', designPage: 39, feature: 'care', title: "Care prescriptions to review" },
  "care.plans": { release: 'v2', designPage: 39, feature: 'care', title: "Care plans" },
  "care.staff": { release: 'v2', designPage: 39, feature: 'care', title: "Clinical staff" },
  "care.incidents": { release: 'v2', designPage: 39, feature: 'care', title: "Clinical incidents and doctor reviews" },
  "professions": { release: 'v1', designPage: 51, feature: 'partners', title: "Professions, skills and documents" },
  "login": { release: 'v1', designPage: 70, feature: 'auth', title: "Sign in" },
  "payouts": { release: 'v1', designPage: 71, feature: 'finance', title: "Payouts, offers and support" },
  "support": { release: 'v1', designPage: 71, feature: 'support', title: "Support tickets" },
  "customers": { release: 'v2', designPage: 72, feature: 'customers', title: "Customers and reports" },
  "assign": { release: 'v1', designPage: 73, feature: 'operations', title: "Assign and track a booking" },
  "live": { release: 'v1', designPage: 74, feature: 'operations', title: "Live map and attendance" },
  "ratings": { release: 'v2', designPage: 75, feature: 'quality', title: "Ratings and quality" },
  "smart": { release: 'v3', designPage: 76, feature: 'automation', title: "Smart operations" },
  "zones": { release: 'v2', designPage: 77, feature: 'catalog', title: "Zones and team access" },
  "campaigns": { release: 'v3', designPage: 78, feature: 'campaigns', title: "Campaigns and messages" },
  "bookings": { release: 'v1', designPage: 79, feature: 'operations', title: "All bookings" },
  "ticket": { release: 'v1', designPage: 80, feature: 'support', title: "One support ticket" },
  "customerDetail": { release: 'v2', designPage: 81, feature: 'customers', title: "One customer" },
  "testimonials": { release: 'v2', designPage: 84, feature: 'quality', title: "Testimonials" },
  "team": { release: 'v1', designPage: 85, feature: 'team', title: "Team and roles" },
  "permissions": { release: 'v1', designPage: 86, feature: 'team', title: "Roles and permissions" },
  "roleView": { release: 'v1', designPage: 87, feature: 'team', title: "What a Support person sees" },
  "signups": { release: 'v1', designPage: 88, feature: 'partners', title: "Partner sign-ups" },
  "safety": { release: 'v1', designPage: 89, feature: 'safety', title: "Safety alerts" },
  "services": { release: 'v1', designPage: 90, feature: 'catalog', title: "Services and prices" },
  "partnerDetail": { release: 'v1', designPage: 91, feature: 'partners', title: "One partner" },
  "offers": { release: 'v2', designPage: 92, feature: 'catalog', title: "Offer codes" },
  "claims": { release: 'v3', designPage: 93, feature: 'support', title: "Damage claims" },
  "advances": { release: 'v3', designPage: 94, feature: 'finance', title: "Pay advances" },
  "smallScreens": { release: 'v2', designPage: 95, feature: 'operations', title: "On a tablet and a phone" },
};

/** Route names in a release, e.g. everything that must work at launch: `routesIn('v1')`. */
export const routesIn = (release: Release) => Object.keys(routeTable).filter((r) => routeTable[r].release === release);
