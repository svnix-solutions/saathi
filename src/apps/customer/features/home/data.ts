/** Sample data and constants for the home screens (design pages 03, 15, 16). */
import type { Category } from '@/domain';

/** Trust line under each kind of work (design page 04). */
export const TRUST: Partial<Record<Category, [string, string]>> = {
  nursing: ['Every nurse has a checked nursing certificate, council registration and police verification.', 'हर नर्स का नर्सिंग सर्टिफ़िकेट, काउंसिल रजिस्ट्रेशन और पुलिस सत्यापन जाँचा गया है।'],
  repair: ['Electricians hold a checked wireman licence.', 'इलेक्ट्रीशियन के पास जाँचा हुआ वायरमैन लाइसेंस है।'],
  barber: ['Kids haircuts go only to barbers who finished child safety training.', 'बच्चों की कटिंग सिर्फ़ बाल सुरक्षा प्रशिक्षण वाले नाई करते हैं।'],
};
/** Fine print under a kind of work. */
export const CATEGORY_NOTE: Partial<Record<Category, [string, string]>> = {
  nursing: ['Not for emergencies. In an emergency call 112.', 'इमरजेंसी के लिए नहीं। इमरजेंसी में 112 पर कॉल करें।'],
  repair: ['Parts are extra. The partner shows the bill before buying anything.', 'पुर्ज़े अलग से। कुछ खरीदने से पहले पार्टनर बिल दिखाएगा।'],
};

/* ---- 52 · Home with testimonial ---- */
/** The carousel moves on by itself this often. */
export const QUOTE_INTERVAL_MS = 5000;
/** [value, English label, Hindi label] */
export const NEIGHBOUR_STATS: [string, string, string][] = [['4.6', 'Average', 'औसत'], ['438', 'Ratings', 'रेटिंग'], ['91%', 'On time', 'समय पर']];

/* ---- 58 · Smart home ---- */
/** Price of adding fan cleaning to the usual Saturday visit. */
export const FANS_PRICE = 129;
