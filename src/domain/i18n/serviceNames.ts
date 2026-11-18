/**
 * Hindi service names. The kits disagree on a few words, so each wording is kept under its own name:
 *
 * - `serviceNamesHi`        catalogue names (services[].nameHi, design page 04). e.g. kitchenBath "किचन और बाथरूम".
 * - `serviceNamesHiPage18`  the customer v1 screens' wording (design page 18; was `svcHi` in customer/v1/kit).
 *                           Differs: kitchenBath "रसोई और बाथरूम", dishes "बर्तन और तैयारी", laundry "कपड़े और अलमारी".
 * - `serviceNamesHiByTitle` the partner v1 screens' list, keyed by the English title (was `serviceHi` in partner/v1/jobs).
 */
import type { TFn } from '../format';
import { services, serviceById, type ServiceId } from '../services';

export const serviceNamesHi = Object.fromEntries(services.map((s) => [s.id, s.nameHi])) as Record<ServiceId, string>;

export const serviceNamesHiPage18: Record<ServiceId, string> = {
  general: 'सामान्य सफ़ाई', kitchenBath: 'रसोई और बाथरूम', dishes: 'बर्तन और तैयारी', laundry: 'कपड़े और अलमारी', custom: 'घंटे के हिसाब से मदद',
  nurseVisit: 'नर्स विज़िट', patientCare: 'मरीज़ और बुज़ुर्ग देखभाल', electrician: 'इलेक्ट्रीशियन', plumber: 'प्लंबर', haircut: 'घर पर बाल कटिंग', kidsHaircut: 'बच्चों की कटिंग',
};

export const serviceNamesHiByTitle: Record<string, string> = {
  'General cleaning': 'सामान्य सफ़ाई', 'Kitchen & bath scrub': 'रसोई और बाथरूम', 'Dishes & meal prep': 'बर्तन और खाना तैयारी', Dishes: 'बर्तन',
};

/** Service name in the current language, page-18 wording. Was `svcName(t, id)` in customer/v1/kit. */
export const serviceName = (t: TFn, id: ServiceId, hi: Record<ServiceId, string> = serviceNamesHiPage18) => t(serviceById(id).name, hi[id]);

/** First word of the service name ("General", "सामान्य"). Was `shortName(t, id)` in customer/v1/kit. */
export const serviceShortName = (t: TFn, id: ServiceId, hi: Record<ServiceId, string> = serviceNamesHiPage18) =>
  t(serviceById(id).name.split(' ')[0], hi[id].split(' ')[0]);
