/** Sample data for the status screens (prototype only). */
import type { Job } from '../jobs';

/** The job offered after a cancellation ("Another job is close"). */
export const nearbyJob: Job = {
  id: '#2046', service: 'Dishes', minutes: 30, earn: 63, address: 'Flat 112, Block C', customer: 'Priya N.',
  note: 'Dishes are in the sink.', tasks: ['Wash dishes', 'Wipe kitchen'], done: [],
};
/** Paid to the partner when the customer cancels on the way. */
export const cancelPay = 30;

/** How location is used, on the "Location is off" screen. */
export const locationPoints = [
  ['Not tracked when you are offline', 'ऑफ़लाइन होने पर ट्रैक नहीं होता'],
  ['Customers see you only on their job', 'ग्राहक सिर्फ़ अपने काम पर देखते हैं'],
  ['Stops by itself at check-out', 'चेक-आउट पर अपने-आप बंद'],
] as const;
/** "Opening settings…" shows this long before the partner is online. */
export const settingsMs = 800;
