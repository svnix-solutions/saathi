/** Service catalogue and categories (design pages 04 and 18). No React. */
export type ServiceId = 'general' | 'kitchenBath' | 'dishes' | 'laundry' | 'custom'
  | 'nurseVisit' | 'patientCare' | 'electrician' | 'plumber' | 'haircut' | 'kidsHaircut';

/** The kinds of work on customer Home (design page 04). In the real app they come from the professions table. */
export type Category = 'cleaning' | 'nursing' | 'repair' | 'barber';
export const categories: { id: Category; name: string; nameHi: string; namePa: string; title: string; titleHi: string; titlePa: string }[] = [
  { id: 'cleaning', name: 'Cleaning', nameHi: 'सफ़ाई', namePa: 'ਸਫ਼ਾਈ', title: 'What needs doing today?', titleHi: 'आज क्या काम करवाना है?', titlePa: 'ਅੱਜ ਕੀ ਕੰਮ ਕਰਵਾਉਣਾ ਹੈ?' },
  { id: 'nursing', name: 'Nursing', nameHi: 'नर्सिंग', namePa: 'ਨਰਸਿੰਗ', title: 'Care at home', titleHi: 'घर पर देखभाल', titlePa: 'ਘਰ ਤੇ ਦੇਖਭਾਲ' },
  { id: 'repair', name: 'Repair', nameHi: 'मरम्मत', namePa: 'ਮੁਰੰਮਤ', title: 'Fix something', titleHi: 'कुछ ठीक करवाएँ', titlePa: 'ਕੁਝ ਠੀਕ ਕਰਵਾਓ' },
  { id: 'barber', name: 'Barber', nameHi: 'नाई', namePa: 'ਨਾਈ', title: 'Haircut at home', titleHi: 'घर पर बाल कटवाएँ', titlePa: 'ਘਰ ਤੇ ਵਾਲ ਕਟਵਾਓ' },
];

export const services: { id: ServiceId; name: string; nameHi: string; per30: number; character: CharacterId; tasks: string[]; category: Category; sub?: string; subHi?: string }[] = [
  { id: 'general', category: 'cleaning', name: 'General cleaning', nameHi: 'सामान्य सफ़ाई', per30: 79, character: 'clean', tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces', 'Interior windows', 'Balcony'] },
  { id: 'kitchenBath', category: 'cleaning', name: 'Kitchen & bath scrub', nameHi: 'किचन और बाथरूम', per30: 129, character: 'deep', tasks: ['Scrub kitchen counters', 'Clean stove top', 'Scrub toilet and basin', 'Clean bathroom tiles', 'Wipe mirrors'] },
  { id: 'dishes', category: 'cleaning', name: 'Dishes & meal prep', nameHi: 'बर्तन और खाना तैयारी', per30: 79, character: 'kitchen', tasks: ['Wash dishes', 'Chop vegetables', 'Knead dough', 'Wipe kitchen'] },
  { id: 'laundry', category: 'cleaning', name: 'Laundry & organizing', nameHi: 'कपड़े और व्यवस्था', per30: 89, character: 'laundry', tasks: ['Load washing machine', 'Hang clothes to dry', 'Fold clothes', 'Organize wardrobe'] },
  { id: 'custom', category: 'cleaning', name: 'Hourly custom help', nameHi: 'घंटे के हिसाब से मदद', per30: 99, character: 'custom', tasks: ['You choose the chores'] },
  { id: 'nurseVisit', name: 'Nurse visit', nameHi: 'नर्स विज़िट', per30: 199, character: 'nurse', category: 'nursing', sub: 'Injections, dressing, BP and sugar', subHi: 'इंजेक्शन, पट्टी, बीपी और शुगर', tasks: ['Injection', 'Wound dressing', 'BP and sugar check', 'Medicines on time'] },
  { id: 'patientCare', name: 'Patient & elder care', nameHi: 'मरीज़ और बुज़ुर्ग देखभाल', per30: 149, character: 'nurse', category: 'nursing', sub: 'Hourly care by a trained attendant', subHi: 'प्रशिक्षित अटेंडेंट, घंटे के हिसाब से', tasks: ['Help to bathe and dress', 'Feeding', 'Help to walk', 'Medicines on time'] },
  { id: 'electrician', name: 'Electrician', nameHi: 'इलेक्ट्रीशियन', per30: 149, character: 'repair', category: 'repair', sub: 'Switches, fans, lights, small wiring', subHi: 'स्विच, पंखे, लाइट, छोटी वायरिंग', tasks: ['Switch or socket', 'Fan', 'Light fitting', 'Small wiring'] },
  { id: 'plumber', name: 'Plumber', nameHi: 'प्लंबर', per30: 149, character: 'repair', category: 'repair', sub: 'Taps, leaks, blockages, fittings', subHi: 'नल, लीकेज, जाम, फ़िटिंग', tasks: ['Tap', 'Leak', 'Blocked drain', 'Fitting'] },
  { id: 'haircut', name: 'Haircut at home', nameHi: 'घर पर बाल कटिंग', per30: 99, character: 'barber', category: 'barber', sub: 'Hair cut, beard trim and shave', subHi: 'बाल कटिंग, दाढ़ी ट्रिम और शेव', tasks: ['Hair cut', 'Beard trim', 'Shave'] },
  { id: 'kidsHaircut', name: 'Kids haircut', nameHi: 'बच्चों की कटिंग', per30: 89, character: 'barber', category: 'barber', sub: 'By a barber trained with children', subHi: 'बच्चों के साथ प्रशिक्षित नाई', tasks: ['Hair cut'] },
];

export type CharacterId = 'clean' | 'deep' | 'kitchen' | 'laundry' | 'custom' | 'hero' | 'nurse' | 'repair' | 'barber';

/** The catalogue entry for a service id (falls back to General cleaning). */
export const serviceById = (id: ServiceId) => services.find((s) => s.id === id) ?? services[0];
/** Services in one category, in catalogue order. */
export const servicesIn = (category: Category) => services.filter((s) => s.category === category);
