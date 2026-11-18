/** Sample data for smart operations: tomorrow's forecast and unusual-activity alerts. */

export const HOURS = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'];
/** Bar heights (0 to 100) of expected demand per hour. */
export const FORECAST = [30, 62, 100, 88, 55, 34, 28, 40, 58, 76, 64, 36];
/** Expected bookings per hour. */
export const EXPECTED_BOOKINGS = [6, 12, 20, 18, 11, 7, 6, 8, 12, 15, 13, 7];
/** Partners missing per hour. */
export const SHORT_BY = [0, 0, 5, 4, 0, 0, 0, 0, 0, 3, 0, 0];

/** Bar colour: red when 4 or more partners short, yellow when a few, mint when enough. */
export const shortColor = (i: number) => (SHORT_BY[i] >= 4 ? 'var(--red)' : SHORT_BY[i] > 0 ? 'var(--yellow)' : 'var(--mint)');

export type UnusualAlert = { id: string; title: string; level: 'High' | 'Medium'; text: string; actions: string[] };
export const initialAlerts: UnusualAlert[] = [
  { id: 'loc', title: 'Location looks faked', level: 'High', text: 'Meena T. checked in 410 m from the door, then out after 5 min. Job #2038.', actions: ['Hold payout', 'Call partner'] },
  { id: 'selfie', title: 'Selfie did not match', level: 'High', text: 'Geeta K., job #2029. Someone else may have done the visit.', actions: ['See both photos'] },
  { id: 'refunds', title: 'Many refunds, one customer', level: 'Medium', text: '4 refund requests in 2 weeks from one account.', actions: ['Review account'] },
];

export const initialRules = { fav: true, near: true, rating: true, lang: true, fair: true, raise: false };
export type AssignRules = typeof initialRules;
