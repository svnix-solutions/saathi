/**
 * Hindi task (chore) names, keyed by the English task in services[].tasks.
 *
 * - `taskNamesHi`        full list used by the customer screens (was `taskHi` in customer/v1/kit).
 * - `taskNamesHiPartner` the partner v1 screens' short list (was `taskHi` in partner/v1/jobs).
 *                        Disagrees on one word: 'Wipe kitchen' is "रसोई पोंछना" here, "किचन पोंछना" in `taskNamesHi`.
 */
import type { TFn } from '../format';

export const taskNamesHi: Record<string, string> = {
  'Sweep and mop floors': 'झाड़ू और पोछा', Dusting: 'धूल झाड़ना', 'Wipe surfaces': 'सतहें पोंछना', 'Interior windows': 'अंदर की खिड़कियाँ', Balcony: 'बालकनी',
  'Scrub kitchen counters': 'किचन काउंटर रगड़ना', 'Clean stove top': 'चूल्हा साफ़ करना', 'Scrub toilet and basin': 'टॉयलेट और बेसिन रगड़ना',
  'Clean bathroom tiles': 'बाथरूम टाइल साफ़ करना', 'Wipe mirrors': 'शीशे पोंछना', 'Wash dishes': 'बर्तन धोना', 'Chop vegetables': 'सब्ज़ी काटना',
  'Knead dough': 'आटा गूँथना', 'Wipe kitchen': 'किचन पोंछना', 'Load washing machine': 'वॉशिंग मशीन चलाना', 'Hang clothes to dry': 'कपड़े सुखाना',
  'Fold clothes': 'कपड़े तह करना', 'Organize wardrobe': 'अलमारी जमाना', 'You choose the chores': 'काम आप चुनें',
  Injection: 'इंजेक्शन', 'Wound dressing': 'घाव की पट्टी', 'BP and sugar check': 'बीपी और शुगर जाँच', 'Medicines on time': 'समय पर दवा',
  'Help to bathe and dress': 'नहाने और कपड़े पहनने में मदद', Feeding: 'खाना खिलाना', 'Help to walk': 'चलने में मदद',
  'Switch or socket': 'स्विच या सॉकेट', Fan: 'पंखा', 'Light fitting': 'लाइट फ़िटिंग', 'Small wiring': 'छोटी वायरिंग',
  Tap: 'नल', Leak: 'लीकेज', 'Blocked drain': 'जाम नाली', Fitting: 'फ़िटिंग', 'Hair cut': 'बाल कटिंग', 'Beard trim': 'दाढ़ी ट्रिम', Shave: 'शेव',
};

export const taskNamesHiPartner: Record<string, string> = {
  'Sweep and mop floors': 'झाड़ू और पोछा', Dusting: 'धूल झाड़ना', 'Wipe surfaces': 'सतहें पोंछना',
  'Wash dishes': 'बर्तन धोना', 'Wipe kitchen': 'रसोई पोंछना',
};

/** Task name in the current language. Was `taskName(t, task)` in customer/v1/kit. Pass `taskNamesHiPartner` for the partner wording. */
export const taskName = (t: TFn, task: string, hi: Record<string, string> = taskNamesHi) => t(task, hi[task]);
