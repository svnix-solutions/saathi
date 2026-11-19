/**
 * Sample data and words for Saathi Care (design page 37). Prices and the catalogue are in `@/domain` (care.ts);
 * this file only holds what the customer screens need on top: dates, staff, exercises and the sample visit notes.
 */
import type { Face } from '@/native/ui';
import type { ProcedureId, TFn, Words } from '@/domain';

/* ---------------- Dates ---------------- */

/** "Today" in the prototype: Thursday 19 November 2026. */
export const CARE_TODAY = new Date(2026, 10, 19);
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** 0 = Monday … 6 = Sunday. */
export const weekdayOf = (d: Date) => (d.getDay() + 6) % 7;
/** "2026-11-20" — how visit dates are stored in state. */
export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const fromIso = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

/** Monday first. */
export const WEEKDAYS: Words[] = [
  ['Mon', 'सोम', 'ਸੋਮ'], ['Tue', 'मंगल', 'ਮੰਗਲ'], ['Wed', 'बुध', 'ਬੁੱਧ'], ['Thu', 'गुरु', 'ਵੀਰ'],
  ['Fri', 'शुक्र', 'ਸ਼ੁੱਕਰ'], ['Sat', 'शनि', 'ਸ਼ਨੀ'], ['Sun', 'रवि', 'ਐਤ'],
];
const MONTHS: Words[] = [
  ['Jan', 'जन', 'ਜਨ'], ['Feb', 'फ़र', 'ਫ਼ਰ'], ['Mar', 'मार्च', 'ਮਾਰਚ'], ['Apr', 'अप्रै', 'ਅਪ੍ਰੈ'], ['May', 'मई', 'ਮਈ'], ['Jun', 'जून', 'ਜੂਨ'],
  ['Jul', 'जुला', 'ਜੁਲਾ'], ['Aug', 'अग', 'ਅਗ'], ['Sep', 'सितं', 'ਸਤੰ'], ['Oct', 'अक्टू', 'ਅਕਤੂ'], ['Nov', 'नवं', 'ਨਵੰ'], ['Dec', 'दिसं', 'ਦਸੰ'],
];

/** "Fri 20 Nov" / "शुक्र, 20 नवं". `relative` says "Today" / "Tomorrow" for those two days. */
export const dateLabel = (t: TFn, d: Date, relative = false) => {
  const diff = Math.round((d.getTime() - CARE_TODAY.getTime()) / 864e5);
  if (relative && diff === 0) return t('Today', 'आज', 'ਅੱਜ');
  if (relative && diff === 1) return t('Tomorrow', 'कल', 'ਕੱਲ੍ਹ');
  const w = WEEKDAYS[weekdayOf(d)], m = MONTHS[d.getMonth()], n = d.getDate();
  return t(`${w[0]} ${n} ${m[0]}`, `${w[1]}, ${n} ${m[1]}`, `${w[2]}, ${n} ${m[2]}`);
};

/** Visit start times offered (24-hour clock). */
export const CARE_HOURS = [8, 10, 12, 16, 18];
/** Start dates offered: the next 7 days from tomorrow. */
export const START_DAYS = Array.from({ length: 7 }, (_, i) => addDays(CARE_TODAY, i + 1));

/* ---------------- People ---------------- */

export type CareStaff = { name: Words; role: Words; face: Face; rating: number; visits: number; years: number };
/** The Saathi staff on the sample plans (salaried, verified). */
export const CARE_STAFF: Record<'physio' | 'nurse', CareStaff> = {
  physio: { name: ['Arjun S.', 'अर्जुन एस.', 'ਅਰਜੁਨ ਐੱਸ.'], role: ['Physiotherapist, BPT', 'फ़िज़ियोथेरेपिस्ट, BPT', 'ਫ਼ਿਜ਼ੀਓਥੈਰੇਪਿਸਟ, BPT'], face: 's1', rating: 4.9, visits: 1240, years: 6 },
  nurse: { name: ['Pooja V.', 'पूजा वी.', 'ਪੂਜਾ ਵੀ.'], role: ['Nurse, GNM', 'नर्स, GNM', 'ਨਰਸ, GNM'], face: 'pv', rating: 4.8, visits: 860, years: 8 },
};
/** The Saathi doctor who checks prescriptions and supervises care. */
export const CARE_DOCTOR: Words = ['Dr. Neha K., Saathi doctor', 'डॉ. नेहा के., Saathi डॉक्टर', 'ਡਾ. ਨੇਹਾ ਕੇ., Saathi ਡਾਕਟਰ'];
/** The family doctor the visit notes go to when the customer did not name one. */
export const FAMILY_DOCTOR = 'Dr. R. Malhotra';

export type Gender = 'f' | 'm' | 'o';
export const GENDERS: { id: Gender; name: Words }[] = [
  { id: 'f', name: ['Female', 'महिला', 'ਔਰਤ'] },
  { id: 'm', name: ['Male', 'पुरुष', 'ਮਰਦ'] },
  { id: 'o', name: ['Other', 'अन्य', 'ਹੋਰ'] },
];

/* ---------------- What the plan explains ---------------- */

/** Why a physio plan (care.plans). */
export const PLAN_POINTS: { icon: 'user' | 'clock' | 'list'; text: Words }[] = [
  { icon: 'user', text: ['The same physio every visit, who knows the case', 'हर बार वही फ़िज़ियो, जो पूरा हाल जानता है', 'ਹਰ ਵਾਰ ਉਹੀ ਫ਼ਿਜ਼ੀਓ, ਜੋ ਸਾਰਾ ਹਾਲ ਜਾਣਦਾ ਹੈ'] },
  { icon: 'clock', text: ['All visits booked up front on the days you pick', 'सारी विज़िट पहले से आपके चुने दिनों पर बुक', 'ਸਾਰੀਆਂ ਵਿਜ਼ਿਟਾਂ ਪਹਿਲਾਂ ਤੋਂ ਤੁਹਾਡੇ ਚੁਣੇ ਦਿਨਾਂ ਤੇ ਬੁੱਕ'] },
  { icon: 'list', text: ['Reschedule or skip a visit from your plan page', 'प्लान पेज से विज़िट बदलें या छोड़ें', 'ਪਲਾਨ ਪੇਜ ਤੋਂ ਵਿਜ਼ਿਟ ਬਦਲੋ ਜਾਂ ਛੱਡੋ'] },
];

/** What a nurse does on a visit (care.nurse). */
export const NURSE_TASKS: Words[] = [
  ['Medicines on time, BP, sugar and oxygen', 'समय पर दवा, बीपी, शुगर और ऑक्सीजन', 'ਸਮੇਂ ਤੇ ਦਵਾਈ, ਬੀਪੀ, ਸ਼ੂਗਰ ਅਤੇ ਆਕਸੀਜਨ'],
  ['Feeding, bathing and help to move', 'खाना खिलाना, नहलाना और चलने में मदद', 'ਖਾਣਾ ਖਵਾਉਣਾ, ਨਹਾਉਣਾ ਅਤੇ ਤੁਰਨ ਵਿੱਚ ਮਦਦ'],
  ['Dressing, catheter and bed sore care', 'पट्टी, कैथेटर और बेड सोर की देखभाल', 'ਪੱਟੀ, ਕੈਥੀਟਰ ਅਤੇ ਬੈੱਡ ਸੋਰ ਦੀ ਦੇਖਭਾਲ'],
  ['A note for the family after every shift', 'हर शिफ़्ट के बाद परिवार के लिए नोट', 'ਹਰ ਸ਼ਿਫ਼ਟ ਤੋਂ ਬਾਅਦ ਪਰਿਵਾਰ ਲਈ ਨੋਟ'],
];

/* ---------------- Exercises and visit notes ---------------- */

export type Exercise = { name: Words; reps: Words };
/** Exercises the physio set (sample: knee after surgery). */
export const EXERCISES: Exercise[] = [
  { name: ['Straight leg raise', 'सीधी टाँग उठाना', 'ਸਿੱਧੀ ਲੱਤ ਚੁੱਕਣਾ'], reps: ['3 sets of 10, twice a day', '10-10 के 3 सेट, दिन में 2 बार', '10-10 ਦੇ 3 ਸੈੱਟ, ਦਿਨ ਵਿੱਚ 2 ਵਾਰ'] },
  { name: ['Heel slides', 'एड़ी खिसकाना', 'ਅੱਡੀ ਖਿਸਕਾਉਣਾ'], reps: ['2 sets of 15', '15-15 के 2 सेट', '15-15 ਦੇ 2 ਸੈੱਟ'] },
  { name: ['Knee press on a towel', 'तौलिये पर घुटना दबाना', 'ਤੌਲੀਏ ਤੇ ਗੋਡਾ ਦਬਾਉਣਾ'], reps: ['Hold 5 seconds, 10 times', '5 सेकंड रोकें, 10 बार', '5 ਸਕਿੰਟ ਰੋਕੋ, 10 ਵਾਰ'] },
  { name: ['Ankle pumps', 'टखना ऊपर-नीचे', 'ਗਿੱਟਾ ਉੱਪਰ-ਹੇਠਾਂ'], reps: ['20 times every hour', 'हर घंटे 20 बार', 'ਹਰ ਘੰਟੇ 20 ਵਾਰ'] },
];
/** What the nurse keeps up between visits (nurse plans). */
export const CARE_ROUTINE: Exercise[] = [
  { name: ['Medicines', 'दवाइयाँ', 'ਦਵਾਈਆਂ'], reps: ['8 am, 2 pm and 9 pm', 'सुबह 8, दोपहर 2 और रात 9 बजे', 'ਸਵੇਰੇ 8, ਦੁਪਹਿਰ 2 ਅਤੇ ਰਾਤ 9 ਵਜੇ'] },
  { name: ['Turn in bed', 'करवट बदलना', 'ਪਾਸਾ ਬਦਲਣਾ'], reps: ['Every 2 hours', 'हर 2 घंटे', 'ਹਰ 2 ਘੰਟੇ'] },
  { name: ['Water', 'पानी', 'ਪਾਣੀ'], reps: ['8 glasses a day', 'दिन में 8 गिलास', 'ਦਿਨ ਵਿੱਚ 8 ਗਲਾਸ'] },
];

/** Vitals from the last visit: [label, value, unit]. */
export const NOTE_VITALS: { label: Words; value: string; unit: Words }[] = [
  { label: ['BP', 'BP', 'BP'], value: '132/84', unit: ['Blood pressure', 'ब्लड प्रेशर', 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ'] },
  { label: ['Sugar', 'शुगर', 'ਸ਼ੂਗਰ'], value: '118', unit: ['Fasting', 'खाली पेट', 'ਖਾਲੀ ਪੇਟ'] },
  { label: ['SpO2', 'SpO2', 'SpO2'], value: '97%', unit: ['Oxygen', 'ऑक्सीजन', 'ਆਕਸੀਜਨ'] },
  { label: ['Pulse', 'नाड़ी', 'ਨਬਜ਼'], value: '78', unit: ['a minute', 'प्रति मिनट', 'ਪ੍ਰਤੀ ਮਿੰਟ'] },
];
export const NOTE_PAIN = { before: 6, after: 3 };
export const NOTE_DONE: Words[] = [
  ['Hot pack on the knee, 10 minutes', 'घुटने पर गरम सेक, 10 मिनट', 'ਗੋਡੇ ਤੇ ਗਰਮ ਸੇਕ, 10 ਮਿੰਟ'],
  ['Knee bending with help: now 95°, was 85°', 'मदद से घुटना मोड़ना: अब 95°, पहले 85°', 'ਮਦਦ ਨਾਲ ਗੋਡਾ ਮੋੜਨਾ: ਹੁਣ 95°, ਪਹਿਲਾਂ 85°'],
  ['Walked 40 steps with a walker', 'वॉकर से 40 कदम चले', 'ਵਾਕਰ ਨਾਲ 40 ਕਦਮ ਤੁਰੇ'],
];
export const NOTE_NEXT: Words[] = [
  ['Next visit: stairs with support, 5 steps', 'अगली विज़िट: सहारे से 5 सीढ़ियाँ', 'ਅਗਲੀ ਵਿਜ਼ਿਟ: ਸਹਾਰੇ ਨਾਲ 5 ਪੌੜੀਆਂ'],
  ['Ice pack for 10 minutes if the knee swells', 'सूजन हो तो 10 मिनट बर्फ़ से सेक', 'ਸੋਜ ਹੋਵੇ ਤਾਂ 10 ਮਿੰਟ ਬਰਫ਼ ਨਾਲ ਸੇਕ'],
  ['Call us if pain goes above 7', 'दर्द 7 से ऊपर जाए तो हमें कॉल करें', 'ਦਰਦ 7 ਤੋਂ ਉੱਪਰ ਜਾਵੇ ਤਾਂ ਸਾਨੂੰ ਕਾਲ ਕਰੋ'],
];

/** An icon per procedure (the icon set has no syringe). */
export const PROCEDURE_ICON: Record<ProcedureId, 'plus' | 'clock' | 'shield' | 'drop' | 'sparkle' | 'home' | 'bolt'> = {
  injection: 'plus', injectionCourse: 'clock', wound: 'shield', iv: 'drop', nebulise: 'sparkle', catheter: 'home', vitals: 'bolt',
};
