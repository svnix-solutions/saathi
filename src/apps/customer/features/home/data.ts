/** Sample data and constants for the home screens (design pages 03, 15, 16). */
import type { Category } from '@/domain';

/** Trust line under each kind of work (design page 04). */
export const TRUST: Partial<Record<Category, [string, string, string]>> = {
  nursing: ['Every nurse has a checked nursing certificate, council registration and police verification.', 'हर नर्स का नर्सिंग सर्टिफ़िकेट, काउंसिल रजिस्ट्रेशन और पुलिस सत्यापन जाँचा गया है।',
    'ਹਰ ਨਰਸ ਦਾ ਨਰਸਿੰਗ ਸਰਟੀਫ਼ਿਕੇਟ, ਕੌਂਸਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ ਜਾਂਚੀ ਗਈ ਹੈ।'],
  repair: ['Electricians hold a checked wireman licence.', 'इलेक्ट्रीशियन के पास जाँचा हुआ वायरमैन लाइसेंस है।', 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਕੋਲ ਜਾਂਚਿਆ ਹੋਇਆ ਵਾਇਰਮੈਨ ਲਾਇਸੈਂਸ ਹੈ।'],
  barber: ['Kids haircuts go only to barbers who finished child safety training.', 'बच्चों की कटिंग सिर्फ़ बाल सुरक्षा प्रशिक्षण वाले नाई करते हैं।',
    'ਬੱਚਿਆਂ ਦੀ ਕਟਾਈ ਸਿਰਫ਼ ਉਹ ਨਾਈ ਕਰਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨੇ ਬੱਚਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਦੀ ਟ੍ਰੇਨਿੰਗ ਪੂਰੀ ਕੀਤੀ ਹੈ।'],
};
/** Fine print under a kind of work. */
export const CATEGORY_NOTE: Partial<Record<Category, [string, string, string]>> = {
  nursing: ['Not for emergencies. In an emergency call 112.', 'इमरजेंसी के लिए नहीं। इमरजेंसी में 112 पर कॉल करें।', 'ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ। ਐਮਰਜੈਂਸੀ ਵਿੱਚ 112 ਤੇ ਕਾਲ ਕਰੋ।'],
  repair: ['Parts are extra. The partner shows the bill before buying anything.', 'पुर्ज़े अलग से। कुछ खरीदने से पहले पार्टनर बिल दिखाएगा।', 'ਪੁਰਜ਼ੇ ਵੱਖਰੇ। ਕੁਝ ਵੀ ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਪਾਰਟਨਰ ਬਿੱਲ ਦਿਖਾਏਗਾ।'],
};

/* ---- 52 · Home with testimonial ---- */
/** The carousel moves on by itself this often. */
export const QUOTE_INTERVAL_MS = 5000;
/** [value, English label, Hindi label, Punjabi label] */
export const NEIGHBOUR_STATS: [string, string, string, string][] = [
  ['4.6', 'Average', 'औसत', 'ਔਸਤ'], ['438', 'Ratings', 'रेटिंग', 'ਰੇਟਿੰਗ'], ['91%', 'On time', 'समय पर', 'ਸਮੇਂ ਸਿਰ'],
];

/** Punjabi for the service sub lines (`services[].sub`; Hindi is `subHi`). */
export const SERVICE_SUB_PA: Record<string, string> = {
  nurseVisit: 'ਟੀਕੇ, ਪੱਟੀ, ਬੀਪੀ ਅਤੇ ਸ਼ੂਗਰ',
  patientCare: 'ਸਿਖਲਾਈ ਵਾਲਾ ਅਟੈਂਡੈਂਟ, ਘੰਟੇ ਦੇ ਹਿਸਾਬ ਨਾਲ',
  electrician: 'ਸਵਿੱਚ, ਪੱਖੇ, ਲਾਈਟਾਂ, ਛੋਟੀ ਵਾਇਰਿੰਗ',
  plumber: 'ਟੂਟੀਆਂ, ਲੀਕੇਜ, ਬੰਦ ਨਾਲੀ, ਫ਼ਿਟਿੰਗ',
  haircut: 'ਵਾਲ ਕਟਾਈ, ਦਾੜ੍ਹੀ ਟ੍ਰਿਮ ਅਤੇ ਸ਼ੇਵ',
  kidsHaircut: 'ਬੱਚਿਆਂ ਨਾਲ ਕੰਮ ਦੀ ਸਿਖਲਾਈ ਵਾਲਾ ਨਾਈ',
};

/* ---- 58 · Smart home ---- */
/** Price of adding fan cleaning to the usual Saturday visit. */
export const FANS_PRICE = 129;
