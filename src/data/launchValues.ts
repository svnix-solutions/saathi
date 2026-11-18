/**
 * Working launch values (web/design/saathi-design.html, Decisions page). Every price/rule the
 * prototype shows should come from here so the founders can change it in one place.
 * No imports: domain/ reads these, and data/decisions.ts re-exports them.
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
