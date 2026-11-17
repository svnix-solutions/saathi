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

export type ServiceId = 'general' | 'kitchenBath' | 'dishes' | 'laundry' | 'custom'
  | 'nurseVisit' | 'patientCare' | 'electrician' | 'plumber' | 'haircut' | 'kidsHaircut';

/** The kinds of work on customer Home (design page 04). In the real app they come from the professions table. */
export type Category = 'cleaning' | 'nursing' | 'repair' | 'barber';
export const categories: { id: Category; name: string; nameHi: string; title: string; titleHi: string }[] = [
  { id: 'cleaning', name: 'Cleaning', nameHi: 'सफ़ाई', title: 'What needs doing today?', titleHi: 'आज क्या काम करवाना है?' },
  { id: 'nursing', name: 'Nursing', nameHi: 'नर्सिंग', title: 'Care at home', titleHi: 'घर पर देखभाल' },
  { id: 'repair', name: 'Repair', nameHi: 'मरम्मत', title: 'Fix something', titleHi: 'कुछ ठीक करवाएँ' },
  { id: 'barber', name: 'Barber', nameHi: 'नाई', title: 'Haircut at home', titleHi: 'घर पर बाल कटवाएँ' },
];

export const services: { id: ServiceId; name: string; nameHi: string; per30: number; character: CharacterId; tasks: string[]; category: Category; sub?: string; subHi?: string }[] = [
  { id: 'general', category: 'cleaning', name: 'General cleaning', nameHi: 'सामान्य सफ़ाई', per30: 79, character: 'clean', tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces', 'Interior windows', 'Balcony'] },
  { id: 'kitchenBath', category: 'cleaning', name: 'Kitchen & bath scrub', nameHi: 'किचन और बाथरूम', per30: 129, character: 'deep', tasks: ['Scrub kitchen counters', 'Clean stove top', 'Scrub toilet and basin', 'Clean bathroom tiles', 'Wipe mirrors'] },
  { id: 'dishes', category: 'cleaning', name: 'Dishes & meal prep', nameHi: 'बर्तन और खाना तैयारी', per30: 79, character: 'kitchen', tasks: ['Wash dishes', 'Chop vegetables', 'Knead dough', 'Wipe kitchen'] },
  { id: 'laundry', category: 'cleaning', name: 'Laundry & organizing', nameHi: 'कपड़े और व्यवस्था', per30: 89, character: 'laundry', tasks: ['Load washing machine', 'Hang clothes to dry', 'Fold clothes', 'Organize wardrobe'] },
  { id: 'custom', category: 'cleaning', name: 'Hourly custom help', nameHi: 'घंटे के हिसाब से मदद', per30: 99, character: 'custom', tasks: ['You choose the chores'] },
  { id: 'nurseVisit', name: 'Nurse visit', nameHi: 'नर्स विज़िट', per30: 199, character: 'nurse', category: 'nursing', sub: 'Injections, dressing, BP and sugar', subHi: 'इंजेक्शन, पट्टी, बीपी और शुगर', tasks: ['Injection', 'Wound dressing', 'BP and sugar check', 'Medicines on time'] },
  { id: 'patientCare', name: 'Patient & elder care', nameHi: 'मरीज़ और बुज़ुर्ग देखभाल', per30: 149, character: 'nurse', category: 'nursing', sub: 'Hourly care by a trained attendant', subHi: 'प्रशिक्षित अटेंडेंट, घंटे के हिसाब से', tasks: ['Help to bathe and dress', 'Feeding', 'Help to walk', 'Medicines on time'] },
  { id: 'electrician', name: 'Electrician', nameHi: 'इलेक्ट्रीशियन', per30: 149, character: 'repair', category: 'repair', sub: 'Switches, fans, lights, small wiring', subHi: 'स्विच, पंखे, लाइट, छोटी वायरिंग', tasks: ['Switch or socket', 'Fan', 'Light fitting', 'Small wiring'] },
  { id: 'plumber', name: 'Plumber', nameHi: 'प्लंबर', per30: 149, character: 'repair', category: 'repair', sub: 'Taps, leaks, blockages, fittings', subHi: 'नल, लीकेज, जाम, फ़िटिंग', tasks: ['Tap', 'Leak', 'Blocked drain', 'Fitting'] },
  { id: 'haircut', name: 'Haircut at home', nameHi: 'घर पर बाल कटिंग', per30: 99, character: 'barber', category: 'barber', sub: 'Hair cut, beard trim and shave', subHi: 'बाल कटिंग, दाढ़ी ट्रिम और शेव', tasks: ['Hair cut', 'Beard trim', 'Shave'] },
  { id: 'kidsHaircut', name: 'Kids haircut', nameHi: 'बच्चों की कटिंग', per30: 89, character: 'barber', category: 'barber', sub: 'By a barber trained with children', subHi: 'बच्चों के साथ प्रशिक्षित नाई', tasks: ['Hair cut'] },
];

export type CharacterId = 'clean' | 'deep' | 'kitchen' | 'laundry' | 'custom' | 'hero' | 'nurse' | 'repair' | 'barber';

/** One-time codes per booking, shown only in the customer app (design pages 06 and 30). */
export const codes = { start: '4821', finishHappy: '3907', finishNotHappy: '6154', maxTries: 5 } as const;

/** ₹ formatting with Indian digit grouping. */
export const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');
/** Price for a duration in minutes. */
export const priceFor = (id: ServiceId, minutes: number) =>
  (services.find((s) => s.id === id)?.per30 ?? 79) * (minutes / 30);
export const partnerShare = (price: number) => Math.round(price * decisions.partner.share);
