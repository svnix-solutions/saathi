/**
 * Saathi Care — physiotherapy and nursing at home (design page 37). No React.
 * Prices are prototype launch values. Every label is a `[en, hi, pa]` triple: render it with `t(...label)`.
 */

/** English, Hindi, Punjabi. */
export type Words = [string, string, string];

/* ---------------- Physiotherapy ---------------- */

export type PhysioSpecialty = 'ortho' | 'postSurgery' | 'neuro' | 'elderly' | 'sports' | 'natal' | 'cardio' | 'wellness';

export const physioSpecialties: { id: PhysioSpecialty; name: Words; sub: Words; icon: 'user' | 'plus' | 'bolt' | 'shield' | 'star' | 'home' | 'drop' | 'sparkle' }[] = [
  { id: 'ortho', name: ['Back, neck and joints', 'कमर, गर्दन और जोड़', 'ਕਮਰ, ਗਰਦਨ ਅਤੇ ਜੋੜ'], sub: ['Back pain, frozen shoulder, knee pain', 'कमर दर्द, फ़्रोज़न शोल्डर, घुटने का दर्द', 'ਕਮਰ ਦਰਦ, ਫ਼੍ਰੋਜ਼ਨ ਸ਼ੋਲਡਰ, ਗੋਡੇ ਦਾ ਦਰਦ'], icon: 'user' },
  { id: 'postSurgery', name: ['After surgery', 'ऑपरेशन के बाद', 'ਅਪਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ'], sub: ['Knee or hip replacement, fractures', 'घुटना या कूल्हा बदलना, फ़्रैक्चर', 'ਗੋਡਾ ਜਾਂ ਕੂਲ੍ਹਾ ਬਦਲਣਾ, ਫ਼੍ਰੈਕਚਰ'], icon: 'plus' },
  { id: 'neuro', name: ['Stroke and nerves', 'लकवा और नसें', 'ਅਧਰੰਗ ਅਤੇ ਨਸਾਂ'], sub: ['Stroke, Parkinson’s, spine injury', 'लकवा, पार्किंसन, रीढ़ की चोट', 'ਅਧਰੰਗ, ਪਾਰਕਿੰਸਨ, ਰੀੜ੍ਹ ਦੀ ਸੱਟ'], icon: 'bolt' },
  { id: 'elderly', name: ['Elder care', 'बुज़ुर्गों के लिए', 'ਬਜ਼ੁਰਗਾਂ ਲਈ'], sub: ['Balance, walking, fewer falls', 'संतुलन, चलना, गिरने से बचाव', 'ਸੰਤੁਲਨ, ਤੁਰਨਾ, ਡਿੱਗਣ ਤੋਂ ਬਚਾਅ'], icon: 'shield' },
  { id: 'sports', name: ['Sports injury', 'खेल की चोट', 'ਖੇਡ ਦੀ ਸੱਟ'], sub: ['Sprains, ligament tears, running pain', 'मोच, लिगामेंट, दौड़ने का दर्द', 'ਮੋਚ, ਲਿਗਾਮੈਂਟ, ਦੌੜਨ ਦਾ ਦਰਦ'], icon: 'star' },
  { id: 'natal', name: ['Before and after birth', 'डिलीवरी से पहले और बाद', 'ਡਿਲੀਵਰੀ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ'], sub: ['Pregnancy back pain, recovery', 'गर्भावस्था में कमर दर्द, रिकवरी', 'ਗਰਭ ਦੌਰਾਨ ਕਮਰ ਦਰਦ, ਰਿਕਵਰੀ'], icon: 'home' },
  { id: 'cardio', name: ['Heart and lungs', 'दिल और फेफड़े', 'ਦਿਲ ਅਤੇ ਫੇਫੜੇ'], sub: ['After heart surgery, breathing', 'दिल के ऑपरेशन के बाद, साँस', 'ਦਿਲ ਦੇ ਅਪਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ, ਸਾਹ'], icon: 'drop' },
  { id: 'wellness', name: ['Posture and fitness', 'पोस्चर और फ़िटनेस', 'ਪੋਸਚਰ ਅਤੇ ਫ਼ਿਟਨੈੱਸ'], sub: ['Desk pain, stretching, strength', 'डेस्क का दर्द, स्ट्रेचिंग, ताक़त', 'ਡੈਸਕ ਦਾ ਦਰਦ, ਸਟ੍ਰੈਚਿੰਗ, ਤਾਕਤ'], icon: 'sparkle' },
];

/** One physio session at home: 45 minutes. */
export const PHYSIO_SESSION_MIN = 45;
export const PHYSIO_SESSION_PRICE = 699;

/** Session plans: pay once, visits are booked up front with the same physio. */
export const physioPlans: { sessions: number; price: number; popular?: boolean }[] = [
  { sessions: 1, price: 699 },
  { sessions: 6, price: 3899 },
  { sessions: 10, price: 6299, popular: true },
  { sessions: 14, price: 8599 },
  { sessions: 28, price: 16499 },
];
/** Price per session in a plan, rounded. */
export const perSession = (p: { sessions: number; price: number }) => Math.round(p.price / p.sessions);
/** Rupees saved against booking every session alone. */
export const planSaving = (p: { sessions: number; price: number }) => p.sessions * PHYSIO_SESSION_PRICE - p.price;

/* ---------------- Nurse care ---------------- */

/** Nurse care by the hour: one visit of 2 to 8 hours. */
export const nurseHourly: { hours: number; price: number }[] = [
  { hours: 2, price: 699 }, { hours: 4, price: 1099 }, { hours: 6, price: 1449 }, { hours: 8, price: 1849 },
];

export type NurseShift = 'day12' | 'live24';
/** Nurse care by the day: a 12-hour day shift or a live-in nurse, booked for at least 7 days. */
export const nurseDaily: { id: NurseShift; name: Words; sub: Words; perDay: number }[] = [
  { id: 'day12', name: ['12-hour day nurse', '12 घंटे की डे नर्स', '12 ਘੰਟੇ ਦੀ ਡੇ ਨਰਸ'], sub: ['8 am to 8 pm, every day', 'रोज़ सुबह 8 से रात 8 बजे', 'ਰੋਜ਼ ਸਵੇਰੇ 8 ਤੋਂ ਰਾਤ 8 ਵਜੇ'], perDay: 1199 },
  { id: 'live24', name: ['Live-in nurse', 'घर पर रहने वाली नर्स', 'ਘਰ ਰਹਿਣ ਵਾਲੀ ਨਰਸ'], sub: ['Stays with the patient, 24 hours', 'मरीज़ के साथ 24 घंटे', 'ਮਰੀਜ਼ ਦੇ ਨਾਲ 24 ਘੰਟੇ'], perDay: 1799 },
];
export const NURSE_DAYS_OPTIONS = [7, 15, 30];
export const NURSE_MIN_DAYS = 7;

/* ---------------- Procedures ---------------- */

export type ProcedureId = 'injection' | 'injectionCourse' | 'wound' | 'iv' | 'nebulise' | 'catheter' | 'vitals';

/** Short nurse visits. `rx`: needs a doctor's prescription, checked before the nurse is sent. */
export const procedures: { id: ProcedureId; name: Words; sub: Words; price: number; perDay?: boolean; rx: boolean }[] = [
  { id: 'injection', name: ['Injection', 'इंजेक्शन', 'ਟੀਕਾ'], sub: ['One injection at home', 'घर पर एक इंजेक्शन', 'ਘਰ ਤੇ ਇੱਕ ਟੀਕਾ'], price: 229, rx: true },
  { id: 'injectionCourse', name: ['Injection course', 'इंजेक्शन कोर्स', 'ਟੀਕਿਆਂ ਦਾ ਕੋਰਸ'], sub: ['Same nurse, same time, 3 to 11 days', 'वही नर्स, वही समय, 3 से 11 दिन', 'ਉਹੀ ਨਰਸ, ਉਹੀ ਸਮਾਂ, 3 ਤੋਂ 11 ਦਿਨ'], price: 179, perDay: true, rx: true },
  { id: 'wound', name: ['Wound dressing', 'घाव की पट्टी', 'ਜ਼ਖ਼ਮ ਦੀ ਪੱਟੀ'], sub: ['Surgical wounds, bed sores, burns', 'ऑपरेशन के घाव, बेड सोर, जलना', 'ਅਪਰੇਸ਼ਨ ਦੇ ਜ਼ਖ਼ਮ, ਬੈੱਡ ਸੋਰ, ਸੜਨਾ'], price: 449, rx: false },
  { id: 'iv', name: ['IV drip', 'IV ड्रिप', 'IV ਡ੍ਰਿੱਪ'], sub: ['Drip and medicines through a line', 'ड्रिप और नस से दवा', 'ਡ੍ਰਿੱਪ ਅਤੇ ਨਾੜ ਰਾਹੀਂ ਦਵਾਈ'], price: 479, rx: true },
  { id: 'nebulise', name: ['Nebulisation', 'नेबुलाइज़ेशन', 'ਨੈਬੂਲਾਈਜ਼ੇਸ਼ਨ'], sub: ['Breathing treatment', 'साँस का इलाज', 'ਸਾਹ ਦਾ ਇਲਾਜ'], price: 349, rx: true },
  { id: 'catheter', name: ['Catheter care', 'कैथेटर देखभाल', 'ਕੈਥੀਟਰ ਦੇਖਭਾਲ'], sub: ['Change or care of a urinary catheter', 'कैथेटर बदलना या देखभाल', 'ਕੈਥੀਟਰ ਬਦਲਣਾ ਜਾਂ ਦੇਖਭਾਲ'], price: 549, rx: true },
  { id: 'vitals', name: ['BP, sugar and oxygen', 'बीपी, शुगर और ऑक्सीजन', 'ਬੀਪੀ, ਸ਼ੂਗਰ ਅਤੇ ਆਕਸੀਜਨ'], sub: ['Readings shared with your doctor', 'रीडिंग आपके डॉक्टर को भेजी जाती है', 'ਰੀਡਿੰਗ ਤੁਹਾਡੇ ਡਾਕਟਰ ਨੂੰ ਭੇਜੀ ਜਾਂਦੀ ਹੈ'], price: 199, rx: false },
];
export const procedureById = (id: ProcedureId) => procedures.find((p) => p.id === id) ?? procedures[0];
export const INJECTION_COURSE_DAYS = { min: 3, max: 11 };

/* ---------------- Patients and trust ---------------- */

export type Relation = 'self' | 'parent' | 'spouse' | 'child' | 'other';
export const relations: { id: Relation; name: Words }[] = [
  { id: 'self', name: ['Me', 'मैं', 'ਮੈਂ'] },
  { id: 'parent', name: ['Parent', 'माता-पिता', 'ਮਾਪੇ'] },
  { id: 'spouse', name: ['Spouse', 'पति/पत्नी', 'ਪਤੀ/ਪਤਨੀ'] },
  { id: 'child', name: ['Child', 'बच्चा', 'ਬੱਚਾ'] },
  { id: 'other', name: ['Someone else', 'कोई और', 'ਕੋਈ ਹੋਰ'] },
];

export type Mobility = 'walks' | 'support' | 'bed';
export const mobility: { id: Mobility; name: Words }[] = [
  { id: 'walks', name: ['Walks alone', 'ख़ुद चलते हैं', 'ਆਪ ਤੁਰਦੇ ਹਨ'] },
  { id: 'support', name: ['Needs support', 'सहारे से चलते हैं', 'ਸਹਾਰੇ ਨਾਲ ਤੁਰਦੇ ਹਨ'] },
  { id: 'bed', name: ['In bed', 'बिस्तर पर हैं', 'ਬਿਸਤਰ ਤੇ ਹਨ'] },
];

/** Why families pick Saathi Care: shown on the Care home and confirm screens. */
export const CARE_TRUST: Words[] = [
  ['Licensed nurses and physiotherapists, council registration checked', 'लाइसेंस वाली नर्स और फ़िज़ियो, काउंसिल रजिस्ट्रेशन जाँचा हुआ', 'ਲਾਇਸੈਂਸ ਵਾਲੀਆਂ ਨਰਸਾਂ ਅਤੇ ਫ਼ਿਜ਼ੀਓ, ਕੌਂਸਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਾਂਚੀ ਹੋਈ'],
  ['Salaried Saathi staff, supervised by doctors', 'Saathi के वेतन वाले स्टाफ़, डॉक्टरों की निगरानी में', 'Saathi ਦਾ ਤਨਖ਼ਾਹ ਵਾਲਾ ਸਟਾਫ਼, ਡਾਕਟਰਾਂ ਦੀ ਨਿਗਰਾਨੀ ਹੇਠ'],
  ['Police verified and trained for home visits', 'पुलिस सत्यापन और घर पर काम की ट्रेनिंग', 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ ਅਤੇ ਘਰ ਤੇ ਕੰਮ ਦੀ ਟ੍ਰੇਨਿੰਗ'],
  ['Visit notes after every visit, shared with your doctor', 'हर विज़िट के बाद नोट्स, आपके डॉक्टर के साथ', 'ਹਰ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ ਨੋਟਸ, ਤੁਹਾਡੇ ਡਾਕਟਰ ਨਾਲ'],
];

/** Free reschedule up to this many hours before a care visit. */
export const CARE_RESCHEDULE_HOURS = 3;
/** Care is not emergency care. */
export const CARE_EMERGENCY: Words = ['Not for emergencies. In an emergency call 112.', 'इमरजेंसी के लिए नहीं। इमरजेंसी में 112 पर कॉल करें।', 'ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ। ਐਮਰਜੈਂਸੀ ਵਿੱਚ 112 ਤੇ ਕਾਲ ਕਰੋ।'];
