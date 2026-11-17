/**
 * Working launch values (web/design/saathi-design.html, Decisions page). Every price/rule the
 * prototype shows should come from here so the founders can change it in one place.
 */
export const decisions = {
  prices: {
    general: 79, // per 30 min
    dishes: 79,
    kitchenBath: 129,
    laundry: 89,
    custom: 99,
    arrivalFee: 0,
    monthlyPlanSaving: 0.1,
    busyHourRise: [0.1, 0.15],
    plusMonthly: 99,
    plusYearly: 990,
  },
  customer: {
    freeCancelUntilHrs: 1,
    lateCancelFee: 50,
    cancelAfterArrival: 79,
    badVisitRefund: 0.5,
    referralReward: 100,
    pointsPerVisit: 10,
    pointsRedeem: { points: 250, rupees: 50 },
    paymentHoldMinutes: 5,
  },
  partner: {
    share: 0.8, // ~₹126 of ₹158
    payoutDay: 'Monday',
    instantPayoutFee: 5,
    weeklyBonus: { rupees: 300, jobs: 25 },
    busyHourExtra: 20,
    paidOnCustomerCancel: 30,
    referralBonus: { rupees: 500, afterJobs: 10 },
  },
  quality: {
    minRating: 4.2,
    onTime: 0.9,
    finished: 0.95,
    topRated: { rating: 4.7, days: 30 },
    checkInDistanceM: 100,
    escalation: ['Call', 'Lesson', 'Pause'],
  },
  ops: {
    arrivalPromiseMin: 15,
    searchKm: [1.5, 3],
    handToTeamAfterMin: 3,
    serviceHours: '6 am to 9 pm',
    quietHours: '9 pm to 8 am',
    maxOffersPerWeek: 2,
  },
} as const;

export type ServiceId = 'general' | 'kitchenBath' | 'dishes' | 'laundry' | 'custom';

export const services: { id: ServiceId; name: string; nameHi: string; per30: number; character: CharacterId; tasks: string[] }[] = [
  { id: 'general', name: 'General cleaning', nameHi: 'सामान्य सफ़ाई', per30: 79, character: 'clean', tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces', 'Interior windows', 'Balcony'] },
  { id: 'kitchenBath', name: 'Kitchen & bath scrub', nameHi: 'किचन और बाथरूम', per30: 129, character: 'deep', tasks: ['Scrub kitchen counters', 'Clean stove top', 'Scrub toilet and basin', 'Clean bathroom tiles', 'Wipe mirrors'] },
  { id: 'dishes', name: 'Dishes & meal prep', nameHi: 'बर्तन और खाना तैयारी', per30: 79, character: 'kitchen', tasks: ['Wash dishes', 'Chop vegetables', 'Knead dough', 'Wipe kitchen'] },
  { id: 'laundry', name: 'Laundry & organizing', nameHi: 'कपड़े और व्यवस्था', per30: 89, character: 'laundry', tasks: ['Load washing machine', 'Hang clothes to dry', 'Fold clothes', 'Organize wardrobe'] },
  { id: 'custom', name: 'Hourly custom help', nameHi: 'घंटे के हिसाब से मदद', per30: 99, character: 'custom', tasks: ['You choose the chores'] },
];

export type CharacterId = 'clean' | 'deep' | 'kitchen' | 'laundry' | 'custom' | 'hero';

/** ₹ formatting with Indian digit grouping. */
export const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');
/** Price for a duration in minutes. */
export const priceFor = (id: ServiceId, minutes: number) =>
  (services.find((s) => s.id === id)?.per30 ?? 79) * (minutes / 30);
export const partnerShare = (price: number) => Math.round(price * decisions.partner.share);
