/** Sample data and small pure helpers for the growth feature (prototype values from the design). */
import { decisions } from '@/domain';
import type { Face, IconName } from '@/native/ui';

/* ---------- training (design page 26, screen 33) ---------- */

export type Lesson = { id: string; title: string; hi: string; mins: number; icon: IconName; q: string; options: string[]; answer: number };
export const lessons: Lesson[] = [
  { id: 'greet', title: 'Greeting the customer', hi: 'ग्राहक का अभिवादन', mins: 4, icon: 'user', q: 'What do you say first at the door?', options: ['Namaste, I am from Saathi', 'Where is the mop?', 'Nothing, just start'], answer: 0 },
  { id: 'floors', title: 'Floors: sweep and mop', hi: 'फ़र्श: झाड़ू और पोछा', mins: 6, icon: 'home', q: 'Which comes first?', options: ['Mop', 'Sweep', 'Either'], answer: 1 },
  { id: 'scrub', title: 'Kitchen and bathroom scrub', hi: 'किचन और बाथरूम की सफ़ाई', mins: 5, icon: 'drop', q: 'Which cloth is for the toilet?', options: ['The kitchen cloth', 'The red cloth only', 'Any clean cloth'], answer: 1 },
  { id: 'safety', title: 'Safety with cleaners', hi: 'क्लीनर के साथ सुरक्षा', mins: 4, icon: 'shield', q: 'Can you mix bleach with an acid cleaner?', options: ['Yes, it cleans faster', 'Never', 'Only in the bathroom'], answer: 1 },
  { id: 'app', title: 'Using this app', hi: 'यह ऐप चलाना', mins: 3, icon: 'list', q: 'When do you tap "I have arrived"?', options: ['When I leave home', 'At the customer’s door', 'After the job'], answer: 1 },
];
export const lessonsDone = ['greet', 'floors'];
export const lessonsWatched: Record<string, number> = { scrub: 2 };
export const testSlots = ['Sat 10 am', 'Sat 2 pm', 'Sun 10 am'];

/* ---------- ratings (design page 27, screen 37) ---------- */

export const ratingData = {
  all: { label: 'All time', avg: 4.8, visits: 142, dist: [119, 18, 4, 1, 0], tags: [['On time', 96], ['Thorough', 88], ['Polite', 71]] },
  month: { label: '30 days', avg: 4.9, visits: 38, dist: [34, 4, 0, 0, 0], tags: [['On time', 30], ['Thorough', 27], ['Polite', 19]] },
  week: { label: 'This week', avg: 4.7, visits: 9, dist: [7, 1, 1, 0, 0], tags: [['On time', 8], ['Thorough', 6], ['Polite', 4]] },
} as const;
export type RatingPeriod = keyof typeof ratingData;

/* ---------- reviews (design page 28, screen 41) ---------- */

export type Review = { id: number; place: string; stars: number; text: string; when: string; tip?: number; isNew?: boolean; action?: 'thanks' | 'contest' };
export const reviews: Review[] = [
  { id: 1, place: 'Flat 204, Block C', stars: 4, text: 'Kitchen slab was spotless. Balcony corner was missed.', when: 'Today', tip: 50, isNew: true, action: 'thanks' },
  { id: 2, place: 'House 18, Sector 21', stars: 5, text: 'Very thorough, always on time.', when: '12 Nov', isNew: true },
  { id: 3, place: 'Flat 9, Block A', stars: 3, text: 'Balcony was missed.', when: '8 Nov', isNew: true, action: 'contest' },
];
export const thankYouMessages = ['Thank you for the tip!', 'Happy to help. See you next time.', 'Thank you, I will check the balcony next time.'];

/* ---------- quality (design page 28, screen 42) ---------- */

export const myQuality = { rating: 4.8, onTime: 0.96, finished: 0.99 };
const pct = (n: number) => `${Math.round(n * 100)}%`;

export type QualityRow = { label: string; hi: string; value: string; fill: number; mark: number; need: string; ok: boolean };

/** My three quality scores against the launch thresholds, and whether I count as top rated. */
export function qualityRows({ rating, onTime, finished } = myQuality) {
  const q = decisions.quality;
  const rows: QualityRow[] = [
    { label: 'Customer rating', hi: 'ग्राहक रेटिंग', value: String(rating), fill: rating / 5, mark: q.minRating / 5, need: `Needs ${q.minRating} or above`, ok: rating >= q.minRating },
    { label: 'Arrived on time', hi: 'समय पर पहुँचीं', value: pct(onTime), fill: onTime, mark: q.onTime, need: `Needs ${pct(q.onTime)} or above`, ok: onTime >= q.onTime },
    { label: 'Jobs finished', hi: 'काम पूरे किए', value: pct(finished), fill: finished, mark: q.finished, need: `Needs ${pct(q.finished)} or above`, ok: finished >= q.finished },
  ];
  const top = rating >= q.topRated.rating && rows.every((r) => r.ok);
  return { rows, top };
}

/* ---------- badges (design page 28, screen 43) ---------- */

export type Badge = { title: string; hi: string; sub: string; icon: IconName; fill?: boolean; earned: boolean; how?: string; go?: string };
export const badges: Badge[] = [
  { title: 'Top rated', hi: 'टॉप रेटेड', sub: `${decisions.quality.topRated.rating}+ for ${decisions.quality.topRated.days} days`, icon: 'star', fill: true, earned: true },
  { title: '100 visits', hi: '100 विज़िट', sub: 'Earned 2 Nov', icon: 'check', earned: true },
  { title: 'Always on time', hi: 'हमेशा समय पर', sub: '30 days, no late', icon: 'clock', earned: true },
  { title: 'Favourite of 12', hi: '12 की पसंद', sub: 'Customers chose you', icon: 'user', earned: true },
  { title: 'Deep clean expert', hi: 'डीप क्लीन एक्सपर्ट', sub: 'Finish the lesson', icon: 'drop', earned: false, how: 'Finish the kitchen and bathroom lesson and pass the home visit test.', go: 'training' },
  { title: '500 visits', hi: '500 विज़िट', sub: '142 of 500', icon: 'sparkle', earned: false, how: '358 more visits to go. About 4 months at your pace.' },
];

/* ---------- stories and kind words (design page 29, screens 44–45) ---------- */

export const partnerStories: { face: Face; name: string; sub: string; quote: string; audio?: boolean }[] = [
  { face: 'kr', name: 'Kavita R.', sub: 'Sector 18 · partner for 1 year', quote: '“I work mornings only and still earn more than before. My evenings are for my children.”', audio: true },
  { face: 'rm', name: 'Rekha M.', sub: 'Sector 21 · senior partner', quote: '“Money comes every Monday. I have never had to ask.”' },
  { face: 'ab', name: 'Anita B.', sub: 'Sector 21 · trainer', quote: '“I started with cleaning. Now I teach new partners.”' },
];
export const kindWords: { face: Face; who: string; quote: string; where: string }[] = [
  { face: 'fa', who: 'Farah, Sector 18', quote: '“By 8:15 Sunita was mopping. My mornings are calm now.”', where: 'On the website' },
  { face: 'nk', who: 'Nitin, Block C', quote: '“Kitchen slab was spotless. Sunita is always on time.”', where: 'In the app' },
];

/** "0:07" style seconds for clips under a minute. */
export const clipTime = (sec: number) => `0:${String(sec).padStart(2, '0')}`;

/* ---------- community (design page 31, screen 54) ---------- */

export const leaderboard: { rank: number; face: Face; name: string; visits: number; rating: number; me?: boolean }[] = [
  { rank: 1, face: 'rm', name: 'Rekha M.', visits: 22, rating: 4.6 },
  { rank: 2, face: 'sd', name: 'Sunita D. (you)', visits: 19, rating: 4.8, me: true },
  { rank: 3, face: 'kr', name: 'Kavita R.', visits: 17, rating: 4.9 },
];
export type Post = { id: string; title: string; body: string; likes: number; liked?: boolean };
export const posts: Post[] = [
  { id: 'meet', title: 'Meet-up, Sunday 4 pm', body: 'Block C hub. Tea, new uniform fitting, questions.', likes: 12 },
  { id: 'tip', title: 'Tip from Kavita', body: '"Start with the kitchen while the floor dries."', likes: 8 },
];

/* ---------- career path (design page 32, screen 55) ---------- */

export type CareerStepState = 'done' | 'here' | 'todo';
export type CareerStep = { title: string; sub: string; state: CareerStepState; more: string };

/** The five career steps; finishing the second deep-clean lesson moves "you are here" one step on. */
export function careerSteps(expert: boolean): CareerStep[] {
  return [
    { title: 'Partner', sub: 'Joined Oct 2026', state: 'done', more: 'Your first 50 visits are done.' },
    { title: expert ? 'Senior partner' : 'Senior partner · you are here', sub: '₹10 more per job, first pick of plans', state: expert ? 'done' : 'here', more: 'You got here with 100 visits and a 4.8 rating.' },
    { title: expert ? 'Deep clean expert · you are here' : 'Deep clean expert', sub: expert ? '₹129 jobs are open to you' : 'Finish 2 lessons · ₹129 jobs open up', state: expert ? 'here' : 'todo', more: 'Lessons: 1. Bathroom scrub  2. Kitchen degrease.' },
    { title: 'Trainer', sub: '300 visits and 4.7 rating · paid to teach', state: 'todo', more: '142 of 300 visits done.' },
    { title: 'Area lead', sub: 'Fixed monthly pay, looks after 20 partners', state: 'todo', more: 'Open to trainers with 6 months in the role.' },
  ];
}
