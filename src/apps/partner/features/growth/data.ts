/** Sample data and small pure helpers for the growth feature (prototype values from the design). */
import { decisions, type TFn } from '@/domain';
import type { Face, IconName } from '@/native/ui';

/** A piece of sample text shown on screen, in English, Hindi and Punjabi. */
export type Txt = { en: string; hi: string; pa: string };
/** `Txt` in the current language. */
export const tx = (t: TFn, s: Txt) => t(s.en, s.hi, s.pa);

/* ---------- training (design page 26, screen 33) ---------- */

export type Lesson = { id: string; title: string; hi: string; pa: string; mins: number; icon: IconName; q: Txt; options: Txt[]; answer: number };
export const lessons: Lesson[] = [
  { id: 'greet', title: 'Greeting the customer', hi: 'ग्राहक का अभिवादन', pa: 'ਗਾਹਕ ਦਾ ਸਵਾਗਤ', mins: 4, icon: 'user',
    q: { en: 'What do you say first at the door?', hi: 'दरवाज़े पर सबसे पहले क्या कहेंगी?', pa: 'ਦਰਵਾਜ਼ੇ ਤੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਕਹੋਗੇ?' },
    options: [
      { en: 'Namaste, I am from Saathi', hi: 'नमस्ते, मैं Saathi से हूँ', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ Saathi ਤੋਂ ਹਾਂ' },
      { en: 'Where is the mop?', hi: 'पोछा कहाँ है?', pa: 'ਪੋਚਾ ਕਿੱਥੇ ਹੈ?' },
      { en: 'Nothing, just start', hi: 'कुछ नहीं, बस शुरू कर दो', pa: 'ਕੁਝ ਨਹੀਂ, ਬੱਸ ਸ਼ੁਰੂ ਕਰ ਦਿਓ' },
    ], answer: 0 },
  { id: 'floors', title: 'Floors: sweep and mop', hi: 'फ़र्श: झाड़ू और पोछा', pa: 'ਫ਼ਰਸ਼: ਝਾੜੂ ਅਤੇ ਪੋਚਾ', mins: 6, icon: 'home',
    q: { en: 'Which comes first?', hi: 'पहले क्या करें?', pa: 'ਪਹਿਲਾਂ ਕੀ ਕਰੀਏ?' },
    options: [{ en: 'Mop', hi: 'पोछा', pa: 'ਪੋਚਾ' }, { en: 'Sweep', hi: 'झाड़ू', pa: 'ਝਾੜੂ' }, { en: 'Either', hi: 'कोई भी', pa: 'ਕੋਈ ਵੀ' }], answer: 1 },
  { id: 'scrub', title: 'Kitchen and bathroom scrub', hi: 'किचन और बाथरूम की सफ़ाई', pa: 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ ਦੀ ਸਫ਼ਾਈ', mins: 5, icon: 'drop',
    q: { en: 'Which cloth is for the toilet?', hi: 'टॉयलेट के लिए कौन-सा कपड़ा है?', pa: 'ਟਾਇਲਟ ਲਈ ਕਿਹੜਾ ਕੱਪੜਾ ਹੈ?' },
    options: [
      { en: 'The kitchen cloth', hi: 'किचन वाला कपड़ा', pa: 'ਰਸੋਈ ਵਾਲਾ ਕੱਪੜਾ' },
      { en: 'The red cloth only', hi: 'सिर्फ़ लाल कपड़ा', pa: 'ਸਿਰਫ਼ ਲਾਲ ਕੱਪੜਾ' },
      { en: 'Any clean cloth', hi: 'कोई भी साफ़ कपड़ा', pa: 'ਕੋਈ ਵੀ ਸਾਫ਼ ਕੱਪੜਾ' },
    ], answer: 1 },
  { id: 'safety', title: 'Safety with cleaners', hi: 'क्लीनर के साथ सुरक्षा', pa: 'ਕਲੀਨਰ ਨਾਲ ਸੁਰੱਖਿਆ', mins: 4, icon: 'shield',
    q: { en: 'Can you mix bleach with an acid cleaner?', hi: 'क्या ब्लीच को एसिड वाले क्लीनर में मिला सकते हैं?', pa: 'ਕੀ ਬਲੀਚ ਨੂੰ ਤੇਜ਼ਾਬ ਵਾਲੇ ਕਲੀਨਰ ਵਿੱਚ ਮਿਲਾ ਸਕਦੇ ਹਾਂ?' },
    options: [
      { en: 'Yes, it cleans faster', hi: 'हाँ, जल्दी साफ़ होता है', pa: 'ਹਾਂ, ਜਲਦੀ ਸਾਫ਼ ਹੁੰਦਾ ਹੈ' },
      { en: 'Never', hi: 'कभी नहीं', pa: 'ਕਦੇ ਨਹੀਂ' },
      { en: 'Only in the bathroom', hi: 'सिर्फ़ बाथरूम में', pa: 'ਸਿਰਫ਼ ਬਾਥਰੂਮ ਵਿੱਚ' },
    ], answer: 1 },
  { id: 'app', title: 'Using this app', hi: 'यह ऐप चलाना', pa: 'ਇਹ ਐਪ ਚਲਾਉਣਾ', mins: 3, icon: 'list',
    q: { en: 'When do you tap "I have arrived"?', hi: '"मैं पहुँच गई" कब दबाएँ?', pa: '"ਮੈਂ ਪਹੁੰਚ ਗਈ" ਕਦੋਂ ਦਬਾਈਏ?' },
    options: [
      { en: 'When I leave home', hi: 'जब मैं घर से निकलूँ', pa: 'ਜਦੋਂ ਮੈਂ ਘਰੋਂ ਨਿਕਲਾਂ' },
      { en: 'At the customer’s door', hi: 'ग्राहक के दरवाज़े पर', pa: 'ਗਾਹਕ ਦੇ ਦਰਵਾਜ਼ੇ ਤੇ' },
      { en: 'After the job', hi: 'काम के बाद', pa: 'ਕੰਮ ਤੋਂ ਬਾਅਦ' },
    ], answer: 1 },
];
export const lessonsDone = ['greet', 'floors'];
export const lessonsWatched: Record<string, number> = { scrub: 2 };
export const testSlots: Txt[] = [
  { en: 'Sat 10 am', hi: 'शनि सुबह 10', pa: 'ਸ਼ਨੀ ਸਵੇਰੇ 10' },
  { en: 'Sat 2 pm', hi: 'शनि दोपहर 2', pa: 'ਸ਼ਨੀ ਦੁਪਹਿਰ 2' },
  { en: 'Sun 10 am', hi: 'रवि सुबह 10', pa: 'ਐਤ ਸਵੇਰੇ 10' },
];

/* ---------- ratings (design page 27, screen 37) ---------- */

/** What customers praise, as tagged on their ratings. */
export const ratingTags: Record<string, Txt> = {
  'On time': { en: 'On time', hi: 'समय पर', pa: 'ਸਮੇਂ ਤੇ' },
  Thorough: { en: 'Thorough', hi: 'अच्छी सफ़ाई', pa: 'ਚੰਗੀ ਸਫ਼ਾਈ' },
  Polite: { en: 'Polite', hi: 'अच्छा बर्ताव', pa: 'ਚੰਗਾ ਵਰਤਾਅ' },
};
export const ratingData = {
  all: { label: { en: 'All time', hi: 'अब तक', pa: 'ਹੁਣ ਤੱਕ' }, avg: 4.8, visits: 142, dist: [119, 18, 4, 1, 0], tags: [['On time', 96], ['Thorough', 88], ['Polite', 71]] },
  month: { label: { en: '30 days', hi: '30 दिन', pa: '30 ਦਿਨ' }, avg: 4.9, visits: 38, dist: [34, 4, 0, 0, 0], tags: [['On time', 30], ['Thorough', 27], ['Polite', 19]] },
  week: { label: { en: 'This week', hi: 'इस हफ़्ते', pa: 'ਇਸ ਹਫ਼ਤੇ' }, avg: 4.7, visits: 9, dist: [7, 1, 1, 0, 0], tags: [['On time', 8], ['Thorough', 6], ['Polite', 4]] },
} as const;
export type RatingPeriod = keyof typeof ratingData;

/* ---------- reviews (design page 28, screen 41) ---------- */

export type Review = { id: number; place: Txt; stars: number; text: Txt; when: Txt; tip?: number; isNew?: boolean; action?: 'thanks' | 'contest' };
export const reviews: Review[] = [
  { id: 1, place: { en: 'Flat 204, Block C', hi: 'फ़्लैट 204, ब्लॉक सी', pa: 'ਫ਼ਲੈਟ 204, ਬਲਾਕ ਸੀ' }, stars: 4,
    text: { en: 'Kitchen slab was spotless. Balcony corner was missed.', hi: 'किचन की स्लैब एकदम साफ़ थी। बालकनी का कोना छूट गया।', pa: 'ਰਸੋਈ ਦੀ ਸਲੈਬ ਬਿਲਕੁਲ ਸਾਫ਼ ਸੀ। ਬਾਲਕਨੀ ਦਾ ਕੋਨਾ ਰਹਿ ਗਿਆ।' },
    when: { en: 'Today', hi: 'आज', pa: 'ਅੱਜ' }, tip: 50, isNew: true, action: 'thanks' },
  { id: 2, place: { en: 'House 18, Sector 21', hi: 'मकान 18, सेक्टर 21', pa: 'ਮਕਾਨ 18, ਸੈਕਟਰ 21' }, stars: 5,
    text: { en: 'Very thorough, always on time.', hi: 'बहुत अच्छी सफ़ाई, हमेशा समय पर।', pa: 'ਬਹੁਤ ਵਧੀਆ ਸਫ਼ਾਈ, ਹਮੇਸ਼ਾ ਸਮੇਂ ਤੇ।' },
    when: { en: '12 Nov', hi: '12 नवंबर', pa: '12 ਨਵੰਬਰ' }, isNew: true },
  { id: 3, place: { en: 'Flat 9, Block A', hi: 'फ़्लैट 9, ब्लॉक ए', pa: 'ਫ਼ਲੈਟ 9, ਬਲਾਕ ਏ' }, stars: 3,
    text: { en: 'Balcony was missed.', hi: 'बालकनी छूट गई।', pa: 'ਬਾਲਕਨੀ ਰਹਿ ਗਈ।' },
    when: { en: '8 Nov', hi: '8 नवंबर', pa: '8 ਨਵੰਬਰ' }, isNew: true, action: 'contest' },
];
export const thankYouMessages: Txt[] = [
  { en: 'Thank you for the tip!', hi: 'टिप के लिए धन्यवाद!', pa: 'ਟਿੱਪ ਲਈ ਧੰਨਵਾਦ!' },
  { en: 'Happy to help. See you next time.', hi: 'मदद करके अच्छा लगा। अगली बार मिलते हैं।', pa: 'ਮਦਦ ਕਰਕੇ ਚੰਗਾ ਲੱਗਿਆ। ਅਗਲੀ ਵਾਰ ਮਿਲਦੇ ਹਾਂ।' },
  { en: 'Thank you, I will check the balcony next time.', hi: 'धन्यवाद, अगली बार बालकनी ज़रूर देखूँगी।', pa: 'ਧੰਨਵਾਦ, ਅਗਲੀ ਵਾਰ ਬਾਲਕਨੀ ਜ਼ਰੂਰ ਦੇਖਾਂਗੀ।' },
];
/** What a review shows once the partner has acted on it. */
export const reviewOutcomes: Record<'thanked' | 'review', Txt> = {
  thanked: { en: 'Thanked', hi: 'धन्यवाद भेजा', pa: 'ਧੰਨਵਾਦ ਭੇਜਿਆ' },
  review: { en: 'Under review', hi: 'जाँच हो रही है', pa: 'ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ' },
};

/* ---------- quality (design page 28, screen 42) ---------- */

export const myQuality = { rating: 4.8, onTime: 0.96, finished: 0.99 };
const pct = (n: number) => `${Math.round(n * 100)}%`;

export type QualityRow = { label: string; hi: string; pa: string; value: string; fill: number; mark: number; need: Txt; ok: boolean };
const needs = (v: string | number): Txt => ({ en: `Needs ${v} or above`, hi: `${v} या ज़्यादा चाहिए`, pa: `${v} ਜਾਂ ਵੱਧ ਚਾਹੀਦਾ ਹੈ` });

/** My three quality scores against the launch thresholds, and whether I count as top rated. */
export function qualityRows({ rating, onTime, finished } = myQuality) {
  const q = decisions.quality;
  const rows: QualityRow[] = [
    { label: 'Customer rating', hi: 'ग्राहक रेटिंग', pa: 'ਗਾਹਕ ਰੇਟਿੰਗ', value: String(rating), fill: rating / 5, mark: q.minRating / 5, need: needs(q.minRating), ok: rating >= q.minRating },
    { label: 'Arrived on time', hi: 'समय पर पहुँचीं', pa: 'ਸਮੇਂ ਤੇ ਪਹੁੰਚੇ', value: pct(onTime), fill: onTime, mark: q.onTime, need: needs(pct(q.onTime)), ok: onTime >= q.onTime },
    { label: 'Jobs finished', hi: 'काम पूरे किए', pa: 'ਕੰਮ ਪੂਰੇ ਕੀਤੇ', value: pct(finished), fill: finished, mark: q.finished, need: needs(pct(q.finished)), ok: finished >= q.finished },
  ];
  const top = rating >= q.topRated.rating && rows.every((r) => r.ok);
  return { rows, top };
}

/* ---------- badges (design page 28, screen 43) ---------- */

export type Badge = { title: string; hi: string; pa: string; sub: Txt; icon: IconName; fill?: boolean; earned: boolean; how?: Txt; go?: string };
const { rating: topRating, days: topDays } = decisions.quality.topRated;
export const badges: Badge[] = [
  { title: 'Top rated', hi: 'टॉप रेटेड', pa: 'ਟਾਪ ਰੇਟਿਡ',
    sub: { en: `${topRating}+ for ${topDays} days`, hi: `${topDays} दिन से ${topRating}+`, pa: `${topDays} ਦਿਨਾਂ ਤੋਂ ${topRating}+` }, icon: 'star', fill: true, earned: true },
  { title: '100 visits', hi: '100 विज़िट', pa: '100 ਵਿਜ਼ਿਟਾਂ', sub: { en: 'Earned 2 Nov', hi: '2 नवंबर को मिला', pa: '2 ਨਵੰਬਰ ਨੂੰ ਮਿਲਿਆ' }, icon: 'check', earned: true },
  { title: 'Always on time', hi: 'हमेशा समय पर', pa: 'ਹਮੇਸ਼ਾ ਸਮੇਂ ਤੇ', sub: { en: '30 days, no late', hi: '30 दिन, कोई देरी नहीं', pa: '30 ਦਿਨ, ਕੋਈ ਦੇਰੀ ਨਹੀਂ' }, icon: 'clock', earned: true },
  { title: 'Favourite of 12', hi: '12 की पसंद', pa: '12 ਦੀ ਪਸੰਦ', sub: { en: 'Customers chose you', hi: 'ग्राहकों ने आपको चुना', pa: 'ਗਾਹਕਾਂ ਨੇ ਤੁਹਾਨੂੰ ਚੁਣਿਆ' }, icon: 'user', earned: true },
  { title: 'Deep clean expert', hi: 'डीप क्लीन एक्सपर्ट', pa: 'ਡੀਪ ਕਲੀਨ ਐਕਸਪਰਟ', sub: { en: 'Finish the lesson', hi: 'पाठ पूरा करें', pa: 'ਪਾਠ ਪੂਰਾ ਕਰੋ' }, icon: 'drop', earned: false,
    how: { en: 'Finish the kitchen and bathroom lesson and pass the home visit test.', hi: 'किचन और बाथरूम का पाठ पूरा करें और होम विज़िट टेस्ट पास करें।', pa: 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ ਦਾ ਪਾਠ ਪੂਰਾ ਕਰੋ ਅਤੇ ਹੋਮ ਵਿਜ਼ਿਟ ਟੈਸਟ ਪਾਸ ਕਰੋ।' }, go: 'training' },
  { title: '500 visits', hi: '500 विज़िट', pa: '500 ਵਿਜ਼ਿਟਾਂ', sub: { en: '142 of 500', hi: '500 में से 142', pa: '500 ਵਿੱਚੋਂ 142' }, icon: 'sparkle', earned: false,
    how: { en: '358 more visits to go. About 4 months at your pace.', hi: '358 विज़िट और बाकी। आपकी रफ़्तार से लगभग 4 महीने।', pa: '358 ਵਿਜ਼ਿਟਾਂ ਹੋਰ ਬਾਕੀ। ਤੁਹਾਡੀ ਰਫ਼ਤਾਰ ਨਾਲ ਲਗਭਗ 4 ਮਹੀਨੇ।' } },
];

/* ---------- stories and kind words (design page 29, screens 44–45) ---------- */

export const partnerStories: { face: Face; name: Txt; sub: Txt; quote: Txt; audio?: boolean }[] = [
  { face: 'kr', name: { en: 'Kavita R.', hi: 'कविता आर.', pa: 'ਕਵਿਤਾ ਆਰ.' },
    sub: { en: 'Sector 18 · partner for 1 year', hi: 'सेक्टर 18 · 1 साल से पार्टनर', pa: 'ਸੈਕਟਰ 18 · 1 ਸਾਲ ਤੋਂ ਪਾਰਟਨਰ' },
    quote: { en: '“I work mornings only and still earn more than before. My evenings are for my children.”', hi: '“मैं सिर्फ़ सुबह काम करती हूँ, फिर भी पहले से ज़्यादा कमाती हूँ। शाम मेरे बच्चों के लिए है।”', pa: '“ਮੈਂ ਸਿਰਫ਼ ਸਵੇਰੇ ਕੰਮ ਕਰਦੀ ਹਾਂ, ਫਿਰ ਵੀ ਪਹਿਲਾਂ ਨਾਲੋਂ ਵੱਧ ਕਮਾਉਂਦੀ ਹਾਂ। ਸ਼ਾਮ ਮੇਰੇ ਬੱਚਿਆਂ ਲਈ ਹੈ।”' }, audio: true },
  { face: 'rm', name: { en: 'Rekha M.', hi: 'रेखा एम.', pa: 'ਰੇਖਾ ਐੱਮ.' },
    sub: { en: 'Sector 21 · senior partner', hi: 'सेक्टर 21 · सीनियर पार्टनर', pa: 'ਸੈਕਟਰ 21 · ਸੀਨੀਅਰ ਪਾਰਟਨਰ' },
    quote: { en: '“Money comes every Monday. I have never had to ask.”', hi: '“हर सोमवार पैसे आते हैं। मुझे कभी माँगने नहीं पड़े।”', pa: '“ਹਰ ਸੋਮਵਾਰ ਪੈਸੇ ਆਉਂਦੇ ਹਨ। ਮੈਨੂੰ ਕਦੇ ਮੰਗਣੇ ਨਹੀਂ ਪਏ।”' } },
  { face: 'ab', name: { en: 'Anita B.', hi: 'अनीता बी.', pa: 'ਅਨੀਤਾ ਬੀ.' },
    sub: { en: 'Sector 21 · trainer', hi: 'सेक्टर 21 · ट्रेनर', pa: 'ਸੈਕਟਰ 21 · ਟ੍ਰੇਨਰ' },
    quote: { en: '“I started with cleaning. Now I teach new partners.”', hi: '“मैंने सफ़ाई से शुरू किया था। अब मैं नए पार्टनर को सिखाती हूँ।”', pa: '“ਮੈਂ ਸਫ਼ਾਈ ਤੋਂ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ। ਹੁਣ ਮੈਂ ਨਵੇਂ ਪਾਰਟਨਰਾਂ ਨੂੰ ਸਿਖਾਉਂਦੀ ਹਾਂ।”' } },
];
export const kindWords: { face: Face; who: Txt; quote: Txt; where: Txt }[] = [
  { face: 'fa', who: { en: 'Farah, Sector 18', hi: 'फ़राह, सेक्टर 18', pa: 'ਫ਼ਰਾਹ, ਸੈਕਟਰ 18' },
    quote: { en: '“By 8:15 Sunita was mopping. My mornings are calm now.”', hi: '“8:15 तक सुनीता पोछा लगा रही थीं। अब मेरी सुबह आराम से गुज़रती है।”', pa: '“8:15 ਤੱਕ ਸੁਨੀਤਾ ਪੋਚਾ ਲਾ ਰਹੇ ਸਨ। ਹੁਣ ਮੇਰੀਆਂ ਸਵੇਰਾਂ ਆਰਾਮ ਨਾਲ ਲੰਘਦੀਆਂ ਹਨ।”' },
    where: { en: 'On the website', hi: 'वेबसाइट पर', pa: 'ਵੈੱਬਸਾਈਟ ਤੇ' } },
  { face: 'nk', who: { en: 'Nitin, Block C', hi: 'नितिन, ब्लॉक सी', pa: 'ਨਿਤਿਨ, ਬਲਾਕ ਸੀ' },
    quote: { en: '“Kitchen slab was spotless. Sunita is always on time.”', hi: '“किचन की स्लैब एकदम साफ़ थी। सुनीता हमेशा समय पर आती हैं।”', pa: '“ਰਸੋਈ ਦੀ ਸਲੈਬ ਬਿਲਕੁਲ ਸਾਫ਼ ਸੀ। ਸੁਨੀਤਾ ਹਮੇਸ਼ਾ ਸਮੇਂ ਤੇ ਆਉਂਦੇ ਹਨ।”' },
    where: { en: 'In the app', hi: 'ऐप में', pa: 'ਐਪ ਵਿੱਚ' } },
];

/** "0:07" style seconds for clips under a minute. */
export const clipTime = (sec: number) => `0:${String(sec).padStart(2, '0')}`;

/* ---------- community (design page 31, screen 54) ---------- */

export const leaderboard: { rank: number; face: Face; name: Txt; visits: number; rating: number; me?: boolean }[] = [
  { rank: 1, face: 'rm', name: { en: 'Rekha M.', hi: 'रेखा एम.', pa: 'ਰੇਖਾ ਐੱਮ.' }, visits: 22, rating: 4.6 },
  { rank: 2, face: 'sd', name: { en: 'Sunita D. (you)', hi: 'सुनीता डी. (आप)', pa: 'ਸੁਨੀਤਾ ਡੀ. (ਤੁਸੀਂ)' }, visits: 19, rating: 4.8, me: true },
  { rank: 3, face: 'kr', name: { en: 'Kavita R.', hi: 'कविता आर.', pa: 'ਕਵਿਤਾ ਆਰ.' }, visits: 17, rating: 4.9 },
];
/** A post's title and body; a post typed in the app keeps the partner's own words in every language. */
export type Post = { id: string; title: Txt; body: Txt; likes: number; liked?: boolean };
export const posts: Post[] = [
  { id: 'meet', title: { en: 'Meet-up, Sunday 4 pm', hi: 'मीटिंग, रविवार शाम 4 बजे', pa: 'ਮੀਟਿੰਗ, ਐਤਵਾਰ ਸ਼ਾਮ 4 ਵਜੇ' },
    body: { en: 'Block C hub. Tea, new uniform fitting, questions.', hi: 'ब्लॉक सी हब। चाय, नई यूनिफ़ॉर्म की फ़िटिंग, सवाल-जवाब।', pa: 'ਬਲਾਕ ਸੀ ਹੱਬ। ਚਾਹ, ਨਵੀਂ ਵਰਦੀ ਦੀ ਫਿਟਿੰਗ, ਸਵਾਲ-ਜਵਾਬ।' }, likes: 12 },
  { id: 'tip', title: { en: 'Tip from Kavita', hi: 'कविता का सुझाव', pa: 'ਕਵਿਤਾ ਦਾ ਸੁਝਾਅ' },
    body: { en: '"Start with the kitchen while the floor dries."', hi: '"जब तक फ़र्श सूखे, किचन से शुरू करें।"', pa: '"ਜਦੋਂ ਤੱਕ ਫ਼ਰਸ਼ ਸੁੱਕੇ, ਰਸੋਈ ਤੋਂ ਸ਼ੁਰੂ ਕਰੋ।"' }, likes: 8 },
];
export const myTipTitle: Txt = { en: 'Tip from Sunita', hi: 'सुनीता का सुझाव', pa: 'ਸੁਨੀਤਾ ਦਾ ਸੁਝਾਅ' };

/* ---------- career path (design page 32, screen 55) ---------- */

export type CareerStepState = 'done' | 'here' | 'todo';
export type CareerStep = { id: string; title: string; sub: string; state: CareerStepState; more: string };

/** The five career steps in the current language; finishing the second deep-clean lesson moves "you are here" one step on. */
export function careerSteps(expert: boolean, t: TFn = (en) => en): CareerStep[] {
  const here = (en: string, hi: string, pa: string, on: boolean) =>
    on ? t(`${en} · you are here`, `${hi} · आप यहाँ हैं`, `${pa} · ਤੁਸੀਂ ਇੱਥੇ ਹੋ`) : t(en, hi, pa);
  return [
    { id: 'partner', title: t('Partner', 'पार्टनर', 'ਪਾਰਟਨਰ'), sub: t('Joined Oct 2026', 'अक्टूबर 2026 में जुड़ीं', 'ਅਕਤੂਬਰ 2026 ਵਿੱਚ ਜੁੜੇ'), state: 'done',
      more: t('Your first 50 visits are done.', 'आपकी पहली 50 विज़िट पूरी हो गईं।', 'ਤੁਹਾਡੀਆਂ ਪਹਿਲੀਆਂ 50 ਵਿਜ਼ਿਟਾਂ ਪੂਰੀਆਂ ਹੋ ਗਈਆਂ।') },
    { id: 'senior', title: here('Senior partner', 'सीनियर पार्टनर', 'ਸੀਨੀਅਰ ਪਾਰਟਨਰ', !expert),
      sub: t('₹10 more per job, first pick of plans', 'हर काम पर ₹10 ज़्यादा, प्लान पहले चुनने का मौका', 'ਹਰ ਕੰਮ ਤੇ ₹10 ਵੱਧ, ਪਲਾਨ ਪਹਿਲਾਂ ਚੁਣਨ ਦਾ ਮੌਕਾ'), state: expert ? 'done' : 'here',
      more: t('You got here with 100 visits and a 4.8 rating.', '100 विज़िट और 4.8 रेटिंग से आप यहाँ पहुँचीं।', '100 ਵਿਜ਼ਿਟਾਂ ਅਤੇ 4.8 ਰੇਟਿੰਗ ਨਾਲ ਤੁਸੀਂ ਇੱਥੇ ਪਹੁੰਚੇ।') },
    { id: 'expert', title: here('Deep clean expert', 'डीप क्लीन एक्सपर्ट', 'ਡੀਪ ਕਲੀਨ ਐਕਸਪਰਟ', expert),
      sub: expert ? t('₹129 jobs are open to you', '₹129 वाले काम आपके लिए खुले हैं', '₹129 ਵਾਲੇ ਕੰਮ ਤੁਹਾਡੇ ਲਈ ਖੁੱਲ੍ਹੇ ਹਨ') : t('Finish 2 lessons · ₹129 jobs open up', '2 पाठ पूरे करें · ₹129 वाले काम खुलेंगे', '2 ਪਾਠ ਪੂਰੇ ਕਰੋ · ₹129 ਵਾਲੇ ਕੰਮ ਖੁੱਲ੍ਹਣਗੇ'),
      state: expert ? 'here' : 'todo',
      more: t('Lessons: 1. Bathroom scrub  2. Kitchen degrease.', 'पाठ: 1. बाथरूम की रगड़ाई  2. किचन की चिकनाई हटाना।', 'ਪਾਠ: 1. ਬਾਥਰੂਮ ਦੀ ਰਗੜਾਈ  2. ਰਸੋਈ ਦੀ ਚਿਕਨਾਈ ਹਟਾਉਣਾ।') },
    { id: 'trainer', title: t('Trainer', 'ट्रेनर', 'ਟ੍ਰੇਨਰ'), sub: t('300 visits and 4.7 rating · paid to teach', '300 विज़िट और 4.7 रेटिंग · सिखाने के पैसे मिलते हैं', '300 ਵਿਜ਼ਿਟਾਂ ਅਤੇ 4.7 ਰੇਟਿੰਗ · ਸਿਖਾਉਣ ਦੇ ਪੈਸੇ ਮਿਲਦੇ ਹਨ'), state: 'todo',
      more: t('142 of 300 visits done.', '300 में से 142 विज़िट हुईं।', '300 ਵਿੱਚੋਂ 142 ਵਿਜ਼ਿਟਾਂ ਹੋਈਆਂ।') },
    { id: 'lead', title: t('Area lead', 'एरिया लीड', 'ਏਰੀਆ ਲੀਡ'), sub: t('Fixed monthly pay, looks after 20 partners', 'हर महीने तय तनख़्वाह, 20 पार्टनर की देखरेख', 'ਹਰ ਮਹੀਨੇ ਪੱਕੀ ਤਨਖ਼ਾਹ, 20 ਪਾਰਟਨਰਾਂ ਦੀ ਦੇਖਭਾਲ'), state: 'todo',
      more: t('Open to trainers with 6 months in the role.', 'उन ट्रेनर के लिए जिन्हें 6 महीने हो गए हों।', 'ਉਨ੍ਹਾਂ ਟ੍ਰੇਨਰਾਂ ਲਈ ਜਿਨ੍ਹਾਂ ਨੂੰ 6 ਮਹੀਨੇ ਹੋ ਗਏ ਹੋਣ।') },
  ];
}
