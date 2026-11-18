/** Sample data and constants for the visit screens (prototype only). */
import type { Tri } from '../helpers';

/** The prototype's helper for the live visit. */
export const visitHelper = { name: 'Sunita D.', first: 'Sunita', face: 'sd' as const };

/** Tracking: the ETA starts at 12 "minutes", one minute every 2 s. */
export const trackingEtaFrom = 12;
export const trackingStepMs = 2000;
/** Tracking: the prototype plays the partner and types the start code this long after arriving. */
export const startCodeDelayMs = 6000;
/** Tracking map: home dot at x 142, the helper starts at x 42 (design). */
export const mapHomeX = 142;
export const mapHelperStartX = 42;

/** In progress: the design opens at 38:12 left of 1 hr (37% done). */
export const inProgressShareLeft = 0.6367;
export const defaultVisitTasks = ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];

/** Rate and tip. */
export const rateTags = [['On time', 'समय पर', 'ਸਮੇਂ ਸਿਰ'], ['Thorough', 'अच्छी तरह', 'ਚੰਗੀ ਤਰ੍ਹਾਂ'], ['Polite', 'विनम्र', 'ਨਿਮਰ']] as const;
export const tips = [20, 50, 100];

/** Not-happy problems. */
export const problems = [
  ['Work not finished', 'काम अधूरा', 'ਕੰਮ ਅਧੂਰਾ'], ['Poor quality', 'खराब काम', 'ਮਾੜਾ ਕੰਮ'], ['Late', 'देर से आईं', 'ਦੇਰ ਨਾਲ ਆਈ'],
  ['Behaviour', 'व्यवहार', 'ਵਿਹਾਰ'], ['Something damaged', 'कुछ टूटा', 'ਕੁਝ ਟੁੱਟ ਗਿਆ'],
] as const;
/** The note the not-happy screen opens with. */
export const notHappySampleNote: Tri = { en: 'Bathroom floor not mopped', hi: 'बाथरूम के फ़र्श पर पोछा नहीं लगा', pa: 'ਬਾਥਰੂਮ ਦੇ ਫ਼ਰਸ਼ ਤੇ ਪੋਚਾ ਨਹੀਂ ਲੱਗਿਆ' };

/** Visit report. */
export const reportWorkDone = ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];
export const reportPhotos: Tri[] = [
  { en: 'Floor', hi: 'फ़र्श', pa: 'ਫ਼ਰਸ਼' }, { en: 'Kitchen', hi: 'किचन', pa: 'ਰਸੋਈ' }, { en: 'Balcony', hi: 'बालकनी', pa: 'ਬਾਲਕਨੀ' },
];

/** Lock screen: 8 min away, one minute every 3 s. */
export const lockEtaFrom = 8;
export const lockStepMs = 3000;
