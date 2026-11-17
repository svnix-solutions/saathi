/**
 * Professions, specialisations, skills and the documents each needs (design pages 22 and 51).
 * Mirrors web/db/seed_professions.sql. In the real app these come from the server; nothing is built into the apps.
 */
export type ProfessionId = 'house_help' | 'nurse' | 'home_service' | 'barber';
export type DocId =
  | 'aadhaar' | 'pan' | 'police_verification' | 'bank' | 'nursing_certificate' | 'nursing_registration'
  | 'iti_certificate' | 'electrical_licence' | 'barber_certificate' | 'child_safety';

export type Profession = {
  id: ProfessionId; name: string; nameHi: string; sub: string; subHi: string;
  character: 'clean' | 'nurse' | 'repair' | 'barber'; partners: number; live: boolean;
};
export const professions: Profession[] = [
  { id: 'house_help', name: 'House help', nameHi: 'घरेलू मदद', sub: 'Cleaning, dishes, laundry', subHi: 'सफ़ाई, बर्तन, कपड़े', character: 'clean', partners: 112, live: true },
  { id: 'nurse', name: 'Nurse', nameHi: 'नर्स', sub: 'Care and nursing at home', subHi: 'घर पर देखभाल और नर्सिंग', character: 'nurse', partners: 9, live: true },
  { id: 'home_service', name: 'Home service', nameHi: 'होम सर्विस', sub: 'Electrician, plumber, carpenter', subHi: 'इलेक्ट्रीशियन, प्लंबर, बढ़ई', character: 'repair', partners: 14, live: true },
  { id: 'barber', name: 'Barber', nameHi: 'नाई', sub: "Haircuts at the customer's home", subHi: 'ग्राहक के घर पर बाल कटिंग', character: 'barber', partners: 6, live: true },
];

export type Specialization = { id: string; profession: ProfessionId; name: string; nameHi: string; sub: string };
export const specializations: Specialization[] = [
  { id: 'deep_clean', profession: 'house_help', name: 'Deep cleaning', nameHi: 'गहरी सफ़ाई', sub: 'Kitchens and bathrooms' },
  { id: 'cooking', profession: 'house_help', name: 'Cooking', nameHi: 'खाना बनाना', sub: 'Daily meals' },
  { id: 'elderly', profession: 'nurse', name: 'Elderly care', nameHi: 'बुज़ुर्गों की देखभाल', sub: 'Older patients at home' },
  { id: 'post_surgery', profession: 'nurse', name: 'After surgery care', nameHi: 'ऑपरेशन के बाद देखभाल', sub: 'Dressing, medicines, recovery' },
  { id: 'baby', profession: 'nurse', name: 'Mother and baby care', nameHi: 'माँ और शिशु देखभाल', sub: 'After delivery' },
  { id: 'electrician', profession: 'home_service', name: 'Electrician', nameHi: 'इलेक्ट्रीशियन', sub: 'Switches, fans, wiring' },
  { id: 'plumber', profession: 'home_service', name: 'Plumber', nameHi: 'प्लंबर', sub: 'Taps, leaks, drains' },
  { id: 'carpenter', profession: 'home_service', name: 'Carpenter', nameHi: 'बढ़ई', sub: 'Furniture and doors' },
  { id: 'men', profession: 'barber', name: 'Men', nameHi: 'पुरुष', sub: 'Cuts, beard, shave' },
  { id: 'kids', profession: 'barber', name: 'Kids', nameHi: 'बच्चे', sub: 'Needs child safety training' },
  { id: 'women', profession: 'barber', name: 'Women', nameHi: 'महिलाएँ', sub: 'Cuts and trims' },
];

export type Skill = { id: string; profession: ProfessionId; name: string; nameHi: string };
export const skills: Skill[] = [
  { id: 'sweep_mop', profession: 'house_help', name: 'Sweep and mop', nameHi: 'झाड़ू-पोछा' },
  { id: 'bathroom', profession: 'house_help', name: 'Bathroom cleaning', nameHi: 'बाथरूम सफ़ाई' },
  { id: 'dishes', profession: 'house_help', name: 'Dishes', nameHi: 'बर्तन' },
  { id: 'laundry', profession: 'house_help', name: 'Laundry and ironing', nameHi: 'कपड़े और इस्त्री' },
  { id: 'injection', profession: 'nurse', name: 'Injections', nameHi: 'इंजेक्शन' },
  { id: 'wound_dressing', profession: 'nurse', name: 'Wound dressing', nameHi: 'घाव की पट्टी' },
  { id: 'vitals', profession: 'nurse', name: 'BP and sugar checks', nameHi: 'बीपी और शुगर जाँच' },
  { id: 'catheter', profession: 'nurse', name: 'Catheter care', nameHi: 'कैथेटर देखभाल' },
  { id: 'wiring', profession: 'home_service', name: 'Wiring and switches', nameHi: 'वायरिंग और स्विच' },
  { id: 'fan_fitting', profession: 'home_service', name: 'Fan and light fitting', nameHi: 'पंखा और लाइट फ़िटिंग' },
  { id: 'tap_leak', profession: 'home_service', name: 'Taps and leaks', nameHi: 'नल और लीकेज' },
  { id: 'furniture', profession: 'home_service', name: 'Furniture repair', nameHi: 'फ़र्नीचर मरम्मत' },
  { id: 'hair_cut', profession: 'barber', name: 'Hair cutting', nameHi: 'बाल काटना' },
  { id: 'beard_trim', profession: 'barber', name: 'Beard trim', nameHi: 'दाढ़ी ट्रिम' },
  { id: 'shave', profession: 'barber', name: 'Shave', nameHi: 'शेव' },
  { id: 'hair_colour', profession: 'barber', name: 'Hair colour', nameHi: 'बालों में रंग' },
];

export type DocType = { id: DocId; name: string; nameHi: string; hasBack: boolean; asksNumber: boolean; asksExpiry: boolean; help: string };
export const documentTypes: DocType[] = [
  { id: 'aadhaar', name: 'Aadhaar card', nameHi: 'आधार कार्ड', hasBack: true, asksNumber: true, asksExpiry: false, help: 'Front and back, all four corners visible' },
  { id: 'pan', name: 'PAN card', nameHi: 'पैन कार्ड', hasBack: false, asksNumber: true, asksExpiry: false, help: 'Needed so earnings and tax are recorded' },
  { id: 'police_verification', name: 'Police verification', nameHi: 'पुलिस सत्यापन', hasBack: false, asksNumber: false, asksExpiry: true, help: 'From your local police station' },
  { id: 'bank', name: 'Bank passbook or cheque', nameHi: 'बैंक पासबुक या चेक', hasBack: false, asksNumber: false, asksExpiry: false, help: 'For weekly payouts' },
  { id: 'nursing_certificate', name: 'Nursing certificate', nameHi: 'नर्सिंग सर्टिफ़िकेट', hasBack: false, asksNumber: false, asksExpiry: false, help: 'GNM, ANM or B.Sc' },
  { id: 'nursing_registration', name: 'Nursing council registration', nameHi: 'नर्सिंग काउंसिल रजिस्ट्रेशन', hasBack: false, asksNumber: true, asksExpiry: true, help: 'State nursing council card' },
  { id: 'iti_certificate', name: 'ITI certificate', nameHi: 'आईटीआई सर्टिफ़िकेट', hasBack: false, asksNumber: false, asksExpiry: false, help: 'Electrician, plumber or carpenter trade' },
  { id: 'electrical_licence', name: 'Electrical wireman licence', nameHi: 'वायरमैन लाइसेंस', hasBack: false, asksNumber: true, asksExpiry: true, help: 'From the state electrical licensing board' },
  { id: 'barber_certificate', name: 'Barber or beauty course certificate', nameHi: 'नाई/ब्यूटी कोर्स सर्टिफ़िकेट', hasBack: false, asksNumber: false, asksExpiry: false, help: 'Any recognised course' },
  { id: 'child_safety', name: 'Child safety training', nameHi: 'बाल सुरक्षा प्रशिक्षण', hasBack: false, asksNumber: false, asksExpiry: true, help: 'Saathi training, or a course certificate' },
];

/** Who needs what: no profession and no specialisation = everyone. */
export type Requirement = { doc: DocId; profession?: ProfessionId; specialization?: string; required: boolean };
export const requirements: Requirement[] = [
  { doc: 'aadhaar', required: true },
  { doc: 'pan', required: true },
  { doc: 'nursing_certificate', profession: 'nurse', required: true },
  { doc: 'nursing_registration', profession: 'nurse', required: true },
  { doc: 'police_verification', profession: 'nurse', required: true },
  { doc: 'iti_certificate', profession: 'home_service', required: false },
  { doc: 'electrical_licence', specialization: 'electrician', required: true },
  { doc: 'barber_certificate', profession: 'barber', required: false },
  { doc: 'child_safety', specialization: 'kids', required: true },
];

export const docType = (id: DocId) => documentTypes.find((d) => d.id === id)!;
export const profession = (id: ProfessionId) => professions.find((p) => p.id === id)!;
export const specsOf = (p: ProfessionId) => specializations.filter((s) => s.profession === p);
export const skillsOf = (p: ProfessionId) => skills.filter((s) => s.profession === p);

/** Why a document is asked: "Everyone", "Every nurse", "Because you picked Kids". */
export const askedOf = (r: Requirement) =>
  r.specialization ? `Because you picked ${specializations.find((s) => s.id === r.specialization)?.name}`
    : r.profession ? `Every ${profession(r.profession).name.toLowerCase()}` : 'Everyone';

/** The documents a partner must upload, the same rule as the partner_required_documents view in web/db/schema.sql. */
export function requiredDocs(p: ProfessionId | undefined, specs: string[], reqs: Requirement[] = requirements) {
  return reqs.filter((r) => (!r.profession && !r.specialization) || (p && r.profession === p) || (r.specialization && specs.includes(r.specialization)));
}
