/**
 * Saathi Care for nurses and physiotherapists (design page 38): today's visits, the patients on a plan, and the
 * staff member's licence. Prototype sample data. Every label is a `[en, hi, pa]` triple: render it with `t(...label)`.
 * Catalogue names (procedures, physio specialties, relations) come from `@/domain`.
 */
import { physioSpecialties, procedureById, relations, type PhysioSpecialty, type ProcedureId, type Relation, type TFn, type Words } from '@/domain';

export type CareRole = 'nurse' | 'physio';
export type PatientId = 'harbans' | 'kamla' | 'omPrakash' | 'ramesh' | 'jaswant';

/* ---------------- Patients ---------------- */

export type CareNote = { when: Words; by: Words; text: Words; pain?: number };

export type CarePatient = {
  id: PatientId;
  first: Words;
  age: number;
  /** what the plan is for */
  plan: Words;
  /** visits on the plan: done before today, and in all */
  done: number;
  total: number;
  conditions: Words[];
  /** empty = no known allergies */
  allergies: Words[];
  family: { name: Words; relation: Relation };
  /** pain score 0–10 after each earlier visit, oldest first */
  pain: number[];
  notes: CareNote[];
};

const drMehra: Words = ['Dr Mehra', 'डॉ. मेहरा', 'ਡਾ. ਮਹਿਰਾ'];
const drBhatia: Words = ['Dr Bhatia', 'डॉ. भाटिया', 'ਡਾ. ਭਾਟੀਆ'];
const drSandhu: Words = ['Dr Sandhu', 'डॉ. संधू', 'ਡਾ. ਸੰਧੂ'];
const you: Words = ['You', 'आप', 'ਤੁਸੀਂ'];
const otherNurse: Words = ['Nurse Anita', 'नर्स अनीता', 'ਨਰਸ ਅਨੀਤਾ'];
const yesterday: Words = ['Yesterday', 'कल', 'ਕੱਲ੍ਹ'];
const daysAgo = (n: number): Words => [`${n} days ago`, `${n} दिन पहले`, `${n} ਦਿਨ ਪਹਿਲਾਂ`];

export const carePatients: Record<PatientId, CarePatient> = {
  harbans: {
    id: 'harbans', first: ['Harbans', 'हरबंस', 'ਹਰਬੰਸ'], age: 67,
    plan: ['Injection course for a chest infection', 'छाती के इन्फ़ेक्शन का इंजेक्शन कोर्स', 'ਛਾਤੀ ਦੀ ਇਨਫ਼ੈਕਸ਼ਨ ਲਈ ਟੀਕਿਆਂ ਦਾ ਕੋਰਸ'],
    done: 1, total: 5,
    conditions: [['Type 2 diabetes', 'टाइप 2 शुगर', 'ਟਾਈਪ 2 ਸ਼ੂਗਰ'], ['Chest infection', 'छाती का इन्फ़ेक्शन', 'ਛਾਤੀ ਦੀ ਇਨਫ਼ੈਕਸ਼ਨ']],
    allergies: [['Penicillin', 'पेनिसिलिन', 'ਪੈਨਿਸਿਲਿਨ']],
    family: { name: ['Gurpreet', 'गुरप्रीत', 'ਗੁਰਪ੍ਰੀਤ'], relation: 'child' },
    pain: [4],
    notes: [
      { when: yesterday, by: you, pain: 4, text: ['Day 1 injection given in the left arm. No reaction in 15 minutes. Sugar 162 before breakfast.', 'दिन 1 का इंजेक्शन बाएँ हाथ में दिया। 15 मिनट में कोई रिएक्शन नहीं। नाश्ते से पहले शुगर 162।', 'ਦਿਨ 1 ਦਾ ਟੀਕਾ ਖੱਬੀ ਬਾਂਹ ਵਿੱਚ ਲਾਇਆ। 15 ਮਿੰਟ ਵਿੱਚ ਕੋਈ ਰਿਐਕਸ਼ਨ ਨਹੀਂ। ਨਾਸ਼ਤੇ ਤੋਂ ਪਹਿਲਾਂ ਸ਼ੂਗਰ 162।'] },
    ],
  },
  kamla: {
    id: 'kamla', first: ['Kamla', 'कमला', 'ਕਮਲਾ'], age: 74,
    plan: ['Dressing after hip surgery, every 2 days', 'कूल्हे के ऑपरेशन के बाद पट्टी, हर 2 दिन', 'ਕੂਲ੍ਹੇ ਦੇ ਅਪਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ ਪੱਟੀ, ਹਰ 2 ਦਿਨ'],
    done: 2, total: 6,
    conditions: [['Hip surgery wound', 'कूल्हे के ऑपरेशन का घाव', 'ਕੂਲ੍ਹੇ ਦੇ ਅਪਰੇਸ਼ਨ ਦਾ ਜ਼ਖ਼ਮ'], ['High BP', 'हाई बीपी', 'ਹਾਈ ਬੀਪੀ']],
    allergies: [],
    family: { name: ['Neha', 'नेहा', 'ਨੇਹਾ'], relation: 'child' },
    pain: [6, 5],
    notes: [
      { when: daysAgo(2), by: you, pain: 5, text: ['Wound clean and dry, edges closing. Dressing changed. Sleeping better.', 'घाव साफ़ और सूखा, किनारे भर रहे हैं। पट्टी बदली। नींद बेहतर है।', 'ਜ਼ਖ਼ਮ ਸਾਫ਼ ਅਤੇ ਸੁੱਕਾ, ਕਿਨਾਰੇ ਭਰ ਰਹੇ ਹਨ। ਪੱਟੀ ਬਦਲੀ। ਨੀਂਦ ਚੰਗੀ ਹੈ।'] },
      { when: daysAgo(4), by: otherNurse, pain: 6, text: ['First dressing at home. Slight redness near the stitches, shown to the doctor.', 'घर पर पहली पट्टी। टाँकों के पास थोड़ी लाली, डॉक्टर को दिखाई।', 'ਘਰ ਤੇ ਪਹਿਲੀ ਪੱਟੀ। ਟਾਂਕਿਆਂ ਕੋਲ ਥੋੜ੍ਹੀ ਲਾਲੀ, ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਈ।'] },
    ],
  },
  omPrakash: {
    id: 'omPrakash', first: ['Om Prakash', 'ओम प्रकाश', 'ਓਮ ਪ੍ਰਕਾਸ਼'], age: 81,
    plan: ['IV fluids for 3 days', '3 दिन IV ड्रिप', '3 ਦਿਨ IV ਡ੍ਰਿੱਪ'],
    done: 0, total: 3,
    conditions: [['Weak kidneys', 'किडनी कमज़ोर', 'ਗੁਰਦੇ ਕਮਜ਼ੋਰ'], ['Low water in the body', 'शरीर में पानी की कमी', 'ਸਰੀਰ ਵਿੱਚ ਪਾਣੀ ਦੀ ਕਮੀ']],
    allergies: [['Sulpha medicines', 'सल्फ़ा दवाइयाँ', 'ਸਲਫ਼ਾ ਦਵਾਈਆਂ']],
    family: { name: ['Savitri', 'सावित्री', 'ਸਾਵਿਤਰੀ'], relation: 'spouse' },
    pain: [],
    notes: [],
  },
  ramesh: {
    id: 'ramesh', first: ['Ramesh', 'रमेश', 'ਰਮੇਸ਼'], age: 62,
    plan: ['Physio after knee replacement, 10 sessions', 'घुटना बदलने के बाद फ़िज़ियो, 10 सेशन', 'ਗੋਡਾ ਬਦਲਣ ਤੋਂ ਬਾਅਦ ਫ਼ਿਜ਼ੀਓ, 10 ਸੈਸ਼ਨ'],
    done: 3, total: 10,
    conditions: [['Right knee replaced', 'दायाँ घुटना बदला गया', 'ਸੱਜਾ ਗੋਡਾ ਬਦਲਿਆ ਗਿਆ'], ['High BP', 'हाई बीपी', 'ਹਾਈ ਬੀਪੀ']],
    allergies: [['Ibuprofen', 'आइबुप्रोफ़ेन', 'ਆਈਬਿਊਪ੍ਰੋਫ਼ੈਨ']],
    family: { name: ['Pooja', 'पूजा', 'ਪੂਜਾ'], relation: 'child' },
    pain: [7, 6, 5],
    notes: [
      { when: daysAgo(2), by: you, pain: 5, text: ['Knee bends to 85°. Walked 20 m with the walker. Ice after exercises.', 'घुटना 85° तक मुड़ा। वॉकर से 20 मीटर चले। कसरत के बाद बर्फ़।', 'ਗੋਡਾ 85° ਤੱਕ ਮੁੜਿਆ। ਵਾਕਰ ਨਾਲ 20 ਮੀਟਰ ਤੁਰੇ। ਕਸਰਤ ਤੋਂ ਬਾਅਦ ਬਰਫ਼।'] },
      { when: daysAgo(4), by: you, pain: 6, text: ['Knee bends to 70°. Swelling less. Added straight leg raises.', 'घुटना 70° तक मुड़ा। सूजन कम। सीधी टाँग उठाना जोड़ा।', 'ਗੋਡਾ 70° ਤੱਕ ਮੁੜਿਆ। ਸੋਜ ਘੱਟ। ਸਿੱਧੀ ਲੱਤ ਚੁੱਕਣਾ ਜੋੜਿਆ।'] },
    ],
  },
  jaswant: {
    id: 'jaswant', first: ['Jaswant', 'जसवंत', 'ਜਸਵੰਤ'], age: 70,
    plan: ['Physio after a stroke, 14 sessions', 'लकवे के बाद फ़िज़ियो, 14 सेशन', 'ਅਧਰੰਗ ਤੋਂ ਬਾਅਦ ਫ਼ਿਜ਼ੀਓ, 14 ਸੈਸ਼ਨ'],
    done: 6, total: 14,
    conditions: [['Stroke, left side weak', 'लकवा, बायाँ हिस्सा कमज़ोर', 'ਅਧਰੰਗ, ਖੱਬਾ ਪਾਸਾ ਕਮਜ਼ੋਰ'], ['Type 2 diabetes', 'टाइप 2 शुगर', 'ਟਾਈਪ 2 ਸ਼ੂਗਰ']],
    allergies: [],
    family: { name: ['Manpreet', 'मनप्रीत', 'ਮਨਪ੍ਰੀਤ'], relation: 'child' },
    pain: [3, 3, 2, 3, 2, 2],
    notes: [
      { when: daysAgo(2), by: you, pain: 2, text: ['Stood up from the chair alone 5 times. Left hand grip better.', 'कुर्सी से 5 बार ख़ुद खड़े हुए। बाएँ हाथ की पकड़ बेहतर।', 'ਕੁਰਸੀ ਤੋਂ 5 ਵਾਰ ਆਪ ਖੜ੍ਹੇ ਹੋਏ। ਖੱਬੇ ਹੱਥ ਦੀ ਪਕੜ ਚੰਗੀ।'] },
      { when: daysAgo(5), by: you, pain: 2, text: ['Balance practice with support. Family taught the evening stretches.', 'सहारे से संतुलन का अभ्यास। परिवार को शाम की स्ट्रेचिंग सिखाई।', 'ਸਹਾਰੇ ਨਾਲ ਸੰਤੁਲਨ ਦਾ ਅਭਿਆਸ। ਪਰਿਵਾਰ ਨੂੰ ਸ਼ਾਮ ਦੀ ਸਟ੍ਰੈਚਿੰਗ ਸਿਖਾਈ।'] },
    ],
  },
};

/* ---------------- Today's visits ---------------- */

export type Exercise = { id: string; name: Words; reps: number };

export type CareVisit = {
  id: string;
  role: CareRole;
  patient: PatientId;
  /** a physio session (specialty) or a nurse procedure */
  specialty?: PhysioSpecialty;
  procedure?: ProcedureId;
  /** which visit of the plan this is, and how the plan counts */
  n: number;
  of: number;
  unit: 'session' | 'day' | 'visit';
  hour: number;
  min: number;
  minutes: number;
  area: Words;
  /** prescription checked by a Saathi doctor before the visit was sent (procedures with `rx`) */
  rx?: { doctor: Words; medicine: Words };
  /** what is done at the visit, ticked one by one */
  steps: Words[];
  /** exercises the physio sets for the patient after the session */
  exercises?: Exercise[];
  /** a wound to photograph (only with consent) */
  wound?: boolean;
};

export const careVisits: CareVisit[] = [
  {
    id: 'cv1', role: 'nurse', patient: 'harbans', procedure: 'injectionCourse', n: 2, of: 5, unit: 'day', hour: 9, min: 0, minutes: 30,
    area: ['Model Town', 'मॉडल टाउन', 'ਮਾਡਲ ਟਾਊਨ'],
    rx: { doctor: drMehra, medicine: ['Ceftriaxone 1 g, into the muscle, once a day', 'सेफ़्ट्रिएक्सोन 1 g, मांसपेशी में, दिन में एक बार', 'ਸੈਫ਼ਟ੍ਰਿਐਕਸੋਨ 1 g, ਮਾਸਪੇਸ਼ੀ ਵਿੱਚ, ਦਿਨ ਵਿੱਚ ਇੱਕ ਵਾਰ'] },
    steps: [
      ['Medicine name, dose and expiry checked', 'दवा का नाम, ख़ुराक और एक्सपायरी जाँची', 'ਦਵਾਈ ਦਾ ਨਾਂ, ਖ਼ੁਰਾਕ ਅਤੇ ਐਕਸਪਾਇਰੀ ਜਾਂਚੀ'],
      ['Hands washed, new syringe opened in front of the family', 'हाथ धोए, नई सिरिंज परिवार के सामने खोली', 'ਹੱਥ ਧੋਤੇ, ਨਵੀਂ ਸਰਿੰਜ ਪਰਿਵਾਰ ਦੇ ਸਾਹਮਣੇ ਖੋਲ੍ਹੀ'],
      ['Injection given', 'इंजेक्शन दिया', 'ਟੀਕਾ ਲਾਇਆ'],
      ['Watched for 15 minutes, no reaction', '15 मिनट देखा, कोई रिएक्शन नहीं', '15 ਮਿੰਟ ਦੇਖਿਆ, ਕੋਈ ਰਿਐਕਸ਼ਨ ਨਹੀਂ'],
      ['Needle put in the sharps box', 'सुई शार्प्स बॉक्स में डाली', 'ਸੂਈ ਸ਼ਾਰਪਸ ਡੱਬੇ ਵਿੱਚ ਪਾਈ'],
    ],
  },
  {
    id: 'cv2', role: 'nurse', patient: 'kamla', procedure: 'wound', n: 3, of: 6, unit: 'visit', hour: 11, min: 30, minutes: 45,
    area: ['Sector 21', 'सेक्टर 21', 'ਸੈਕਟਰ 21'], wound: true,
    steps: [
      ['Old dressing removed', 'पुरानी पट्टी हटाई', 'ਪੁਰਾਣੀ ਪੱਟੀ ਹਟਾਈ'],
      ['Wound checked for redness, smell or pus', 'घाव में लाली, बदबू या पस देखा', 'ਜ਼ਖ਼ਮ ਵਿੱਚ ਲਾਲੀ, ਬਦਬੂ ਜਾਂ ਪਸ ਦੇਖੀ'],
      ['Cleaned with saline', 'सलाइन से साफ़ किया', 'ਸਲਾਈਨ ਨਾਲ ਸਾਫ਼ ਕੀਤਾ'],
      ['New sterile dressing put on', 'नई साफ़ पट्टी लगाई', 'ਨਵੀਂ ਸਾਫ਼ ਪੱਟੀ ਲਾਈ'],
      ['Used dressing bagged and taken away', 'पुरानी पट्टी थैली में बंद करके ले गए', 'ਪੁਰਾਣੀ ਪੱਟੀ ਥੈਲੀ ਵਿੱਚ ਬੰਦ ਕਰਕੇ ਲੈ ਗਏ'],
    ],
  },
  {
    id: 'cv3', role: 'nurse', patient: 'omPrakash', procedure: 'iv', n: 1, of: 3, unit: 'day', hour: 16, min: 0, minutes: 120,
    area: ['Civil Lines', 'सिविल लाइंस', 'ਸਿਵਲ ਲਾਈਨਜ਼'],
    rx: { doctor: drBhatia, medicine: ['Normal saline 500 ml over 2 hours', 'नॉर्मल सलाइन 500 ml, 2 घंटे में', 'ਨਾਰਮਲ ਸਲਾਈਨ 500 ml, 2 ਘੰਟਿਆਂ ਵਿੱਚ'] },
    steps: [
      ['Drip bag, label and expiry checked', 'ड्रिप की थैली, लेबल और एक्सपायरी जाँची', 'ਡ੍ਰਿੱਪ ਦੀ ਥੈਲੀ, ਲੇਬਲ ਅਤੇ ਐਕਸਪਾਇਰੀ ਜਾਂਚੀ'],
      ['Line put in, no swelling at the spot', 'लाइन लगाई, जगह पर सूजन नहीं', 'ਲਾਈਨ ਲਾਈ, ਥਾਂ ਤੇ ਸੋਜ ਨਹੀਂ'],
      ['Drip speed set as prescribed', 'पर्चे के हिसाब से ड्रिप की रफ़्तार रखी', 'ਪਰਚੀ ਮੁਤਾਬਕ ਡ੍ਰਿੱਪ ਦੀ ਰਫ਼ਤਾਰ ਰੱਖੀ'],
      ['Line taken out, spot pressed and covered', 'लाइन निकाली, जगह दबाकर ढकी', 'ਲਾਈਨ ਕੱਢੀ, ਥਾਂ ਦਬਾ ਕੇ ਢਕੀ'],
    ],
  },
  {
    id: 'cv4', role: 'physio', patient: 'ramesh', specialty: 'postSurgery', n: 4, of: 10, unit: 'session', hour: 8, min: 30, minutes: 45,
    area: ['Rajouri Garden', 'राजौरी गार्डन', 'ਰਾਜੌਰੀ ਗਾਰਡਨ'],
    steps: [
      ['Knee checked for swelling and warmth', 'घुटने में सूजन और गर्मी देखी', 'ਗੋਡੇ ਵਿੱਚ ਸੋਜ ਅਤੇ ਗਰਮੀ ਦੇਖੀ'],
      ['Knee bend measured', 'घुटने का मुड़ना नापा', 'ਗੋਡੇ ਦਾ ਮੁੜਨਾ ਮਿਣਿਆ'],
      ['Exercises done together', 'कसरत साथ में करवाई', 'ਕਸਰਤ ਨਾਲ ਕਰਵਾਈ'],
      ['Walking practice with the walker', 'वॉकर से चलने का अभ्यास', 'ਵਾਕਰ ਨਾਲ ਤੁਰਨ ਦਾ ਅਭਿਆਸ'],
      ['Ice pack for 10 minutes', '10 मिनट बर्फ़ की सिकाई', '10 ਮਿੰਟ ਬਰਫ਼ ਦੀ ਸਿਕਾਈ'],
    ],
    exercises: [
      { id: 'heel', name: ['Heel slides', 'एड़ी खिसकाना', 'ਅੱਡੀ ਖਿਸਕਾਉਣਾ'], reps: 10 },
      { id: 'slr', name: ['Straight leg raise', 'सीधी टाँग उठाना', 'ਸਿੱਧੀ ਲੱਤ ਚੁੱਕਣਾ'], reps: 10 },
      { id: 'quad', name: ['Knee press into a towel', 'तौलिये पर घुटना दबाना', 'ਤੌਲੀਏ ਤੇ ਗੋਡਾ ਦਬਾਉਣਾ'], reps: 15 },
    ],
  },
  {
    id: 'cv5', role: 'physio', patient: 'jaswant', specialty: 'neuro', n: 7, of: 14, unit: 'session', hour: 17, min: 30, minutes: 45,
    area: ['Jawahar Nagar', 'जवाहर नगर', 'ਜਵਾਹਰ ਨਗਰ'],
    steps: [
      ['Balance check standing with support', 'सहारे से खड़े होकर संतुलन देखा', 'ਸਹਾਰੇ ਨਾਲ ਖੜ੍ਹੇ ਹੋ ਕੇ ਸੰਤੁਲਨ ਦੇਖਿਆ'],
      ['Sit to stand practice', 'बैठकर खड़े होने का अभ्यास', 'ਬੈਠ ਕੇ ਖੜ੍ਹੇ ਹੋਣ ਦਾ ਅਭਿਆਸ'],
      ['Left hand and arm exercises', 'बाएँ हाथ और बाँह की कसरत', 'ਖੱਬੇ ਹੱਥ ਅਤੇ ਬਾਂਹ ਦੀ ਕਸਰਤ'],
      ['Walk in the corridor with you beside', 'आपके साथ गलियारे में चलना', 'ਤੁਹਾਡੇ ਨਾਲ ਗਲਿਆਰੇ ਵਿੱਚ ਤੁਰਨਾ'],
    ],
    exercises: [
      { id: 'sts', name: ['Sit to stand', 'बैठकर खड़े होना', 'ਬੈਠ ਕੇ ਖੜ੍ਹੇ ਹੋਣਾ'], reps: 5 },
      { id: 'grip', name: ['Squeeze a soft ball', 'नरम गेंद दबाना', 'ਨਰਮ ਗੇਂਦ ਦਬਾਉਣਾ'], reps: 15 },
      { id: 'ankle', name: ['Ankle pumps', 'टखना ऊपर-नीचे', 'ਗਿੱਟਾ ਉੱਪਰ-ਹੇਠਾਂ'], reps: 20 },
    ],
  },
];

export const visitById = (id?: string) => careVisits.find((v) => v.id === id) ?? careVisits[0];
export const visitsFor = (role: CareRole) => careVisits.filter((v) => v.role === role);
export const visitToday = (patient: PatientId) => careVisits.find((v) => v.patient === patient);

/* ---------------- Labels ---------------- */

/** "Physio session 4 of 10" · "Injection course · day 2 of 5" · "Wound dressing · visit 3 of 6". */
export function visitTitle(t: TFn, v: CareVisit) {
  if (v.specialty) return t(`Physio session ${v.n} of ${v.of}`, `फ़िज़ियो सेशन · ${v.of} में से ${v.n}`, `ਫ਼ਿਜ਼ੀਓ ਸੈਸ਼ਨ · ${v.of} ਵਿੱਚੋਂ ${v.n}`);
  const name = t(...procedureById(v.procedure ?? 'injection').name);
  if (v.of <= 1) return name;
  return v.unit === 'day'
    ? t(`${name} · day ${v.n} of ${v.of}`, `${name} · ${v.of} में से दिन ${v.n}`, `${name} · ${v.of} ਵਿੱਚੋਂ ਦਿਨ ${v.n}`)
    : t(`${name} · visit ${v.n} of ${v.of}`, `${name} · ${v.of} में से विज़िट ${v.n}`, `${name} · ${v.of} ਵਿੱਚੋਂ ਵਿਜ਼ਿਟ ${v.n}`);
}

/** The line under the title: the physio specialty, or what the patient's plan is for. */
export function visitSub(t: TFn, v: CareVisit) {
  if (v.specialty) return t(...(physioSpecialties.find((s) => s.id === v.specialty) ?? physioSpecialties[0]).name);
  return t(...carePatients[v.patient].plan);
}

/** "Harbans, 67". */
export const patientLine = (t: TFn, p: CarePatient) => `${t(...p.first)}, ${p.age}`;
export const relationName = (t: TFn, r: Relation) => t(...(relations.find((x) => x.id === r) ?? relations[0]).name);
export const minutesLabel = (t: TFn, m: number) => (m >= 60 && m % 60 === 0
  ? t(`${m / 60} hr`, `${m / 60} घंटे`, `${m / 60} ਘੰਟੇ`)
  : t(`${m} min`, `${m} मिनट`, `${m} ਮਿੰਟ`));

/* ---------------- Visit checklist and notes ---------------- */

export type Vitals = { bp: string; sugar: string; spo2: string; pulse: string };
export const emptyVitals: Vitals = { bp: '', sugar: '', spo2: '', pulse: '' };

export const vitalFields: { key: keyof Vitals; label: Words; unit: string; placeholder: string; keyboard: 'default' | 'number-pad' }[] = [
  { key: 'bp', label: ['BP', 'BP', 'BP'], unit: 'mmHg', placeholder: '120/80', keyboard: 'default' },
  { key: 'sugar', label: ['Sugar', 'शुगर', 'ਸ਼ੂਗਰ'], unit: 'mg/dL', placeholder: '110', keyboard: 'number-pad' },
  { key: 'spo2', label: ['SpO2', 'SpO2', 'SpO2'], unit: '%', placeholder: '97', keyboard: 'number-pad' },
  { key: 'pulse', label: ['Pulse', 'नब्ज़', 'ਨਬਜ਼'], unit: '/min', placeholder: '76', keyboard: 'number-pad' },
];

/** Readings outside these ranges are shown in red and suggest a doctor review. */
export function vitalWarning(v: Vitals) {
  const [sys, dia] = v.bp.split('/').map((x) => Number(x));
  const out: (keyof Vitals)[] = [];
  if (sys && (sys >= 160 || sys < 90 || (dia && dia >= 100))) out.push('bp');
  if (Number(v.sugar) && (Number(v.sugar) >= 250 || Number(v.sugar) < 70)) out.push('sugar');
  if (Number(v.spo2) && Number(v.spo2) < 94) out.push('spo2');
  if (Number(v.pulse) && (Number(v.pulse) > 110 || Number(v.pulse) < 50)) out.push('pulse');
  return out;
}

export const nextStepOptions: { id: string; label: Words }[] = [
  { id: 'same', label: ['Continue the plan as it is', 'प्लान ऐसे ही जारी रखें', 'ਪਲਾਨ ਇਵੇਂ ਹੀ ਜਾਰੀ ਰੱਖੋ'] },
  { id: 'more', label: ['Add harder exercises next time', 'अगली बार कठिन कसरत जोड़ें', 'ਅਗਲੀ ਵਾਰ ਔਖੀ ਕਸਰਤ ਜੋੜੋ'] },
  { id: 'family', label: ['Family to help with home exercises', 'घर की कसरत में परिवार मदद करे', 'ਘਰ ਦੀ ਕਸਰਤ ਵਿੱਚ ਪਰਿਵਾਰ ਮਦਦ ਕਰੇ'] },
  { id: 'water', label: ['Drink more water, rest the area', 'ज़्यादा पानी पिएँ, उस जगह को आराम दें', 'ਵੱਧ ਪਾਣੀ ਪੀਓ, ਉਸ ਥਾਂ ਨੂੰ ਆਰਾਮ ਦਿਓ'] },
];

export type FlagReason = 'pain' | 'vitals' | 'wound' | 'reaction' | 'other';
export const flagReasons: { id: FlagReason; label: Words }[] = [
  { id: 'pain', label: ['Pain is worse', 'दर्द बढ़ा', 'ਦਰਦ ਵਧਿਆ'] },
  { id: 'vitals', label: ['Readings out of range', 'रीडिंग ठीक नहीं', 'ਰੀਡਿੰਗ ਠੀਕ ਨਹੀਂ'] },
  { id: 'wound', label: ['Wound looks infected', 'घाव में इन्फ़ेक्शन लगता है', 'ਜ਼ਖ਼ਮ ਵਿੱਚ ਇਨਫ਼ੈਕਸ਼ਨ ਲੱਗਦੀ ਹੈ'] },
  { id: 'reaction', label: ['Reaction to medicine', 'दवा का रिएक्शन', 'ਦਵਾਈ ਦਾ ਰਿਐਕਸ਼ਨ'] },
  { id: 'other', label: ['Something else', 'कुछ और', 'ਕੁਝ ਹੋਰ'] },
];

/* ---------------- Credentials ---------------- */

export type Credential = {
  council: Words;
  number: string;
  /** expiry, as shown */
  expires: Words;
  /** days until expiry: under 90 shows "Renew soon" */
  daysLeft: number;
  qualification: Words;
  specialisations: Words[];
  supervisor: { name: Words; role: Words };
  training: { name: Words; when: Words }[];
};

export const credentials: Record<CareRole, Credential> = {
  nurse: {
    council: ['Delhi Nursing Council', 'दिल्ली नर्सिंग काउंसिल', 'ਦਿੱਲੀ ਨਰਸਿੰਗ ਕੌਂਸਲ'],
    number: 'DNC/RN/2017/48213',
    expires: ['31 January 2027', '31 जनवरी 2027', '31 ਜਨਵਰੀ 2027'], daysLeft: 73,
    qualification: ['GNM, registered nurse', 'GNM, रजिस्टर्ड नर्स', 'GNM, ਰਜਿਸਟਰਡ ਨਰਸ'],
    specialisations: [procedureById('injection').name, procedureById('wound').name, procedureById('iv').name, procedureById('catheter').name,
      ['Elder care', 'बुज़ुर्गों की देखभाल', 'ਬਜ਼ੁਰਗਾਂ ਦੀ ਦੇਖਭਾਲ']],
    supervisor: { name: drMehra, role: ['Saathi Care doctor, general medicine', 'Saathi Care डॉक्टर, जनरल मेडिसिन', 'Saathi Care ਡਾਕਟਰ, ਜਨਰਲ ਮੈਡੀਸਨ'] },
    training: [
      { name: ['Basic life support (BLS)', 'बेसिक लाइफ़ सपोर्ट (BLS)', 'ਬੇਸਿਕ ਲਾਈਫ਼ ਸਪੋਰਟ (BLS)'], when: ['March 2026', 'मार्च 2026', 'ਮਾਰਚ 2026'] },
      { name: ['Infection control at home', 'घर पर इन्फ़ेक्शन से बचाव', 'ਘਰ ਤੇ ਇਨਫ਼ੈਕਸ਼ਨ ਤੋਂ ਬਚਾਅ'], when: ['June 2026', 'जून 2026', 'ਜੂਨ 2026'] },
      { name: ['Saathi home visit manners', 'Saathi घर विज़िट के तौर-तरीक़े', 'Saathi ਘਰ ਵਿਜ਼ਿਟ ਦੇ ਤੌਰ-ਤਰੀਕੇ'], when: ['June 2026', 'जून 2026', 'ਜੂਨ 2026'] },
    ],
  },
  physio: {
    council: ['Delhi Council for Physiotherapy', 'दिल्ली फ़िज़ियोथेरेपी काउंसिल', 'ਦਿੱਲੀ ਫ਼ਿਜ਼ੀਓਥੈਰੇਪੀ ਕੌਂਸਲ'],
    number: 'DCPT/2019/07734',
    expires: ['30 September 2028', '30 सितंबर 2028', '30 ਸਤੰਬਰ 2028'], daysLeft: 680,
    qualification: ['BPT, physiotherapist', 'BPT, फ़िज़ियोथेरेपिस्ट', 'BPT, ਫ਼ਿਜ਼ੀਓਥੈਰੇਪਿਸਟ'],
    specialisations: [physioSpecialties[1].name, physioSpecialties[2].name, physioSpecialties[3].name, physioSpecialties[0].name],
    supervisor: { name: drSandhu, role: ['Saathi Care doctor, bones and joints', 'Saathi Care डॉक्टर, हड्डी और जोड़', 'Saathi Care ਡਾਕਟਰ, ਹੱਡੀਆਂ ਅਤੇ ਜੋੜ'] },
    training: [
      { name: ['Basic life support (BLS)', 'बेसिक लाइफ़ सपोर्ट (BLS)', 'ਬੇਸਿਕ ਲਾਈਫ਼ ਸਪੋਰਟ (BLS)'], when: ['April 2026', 'अप्रैल 2026', 'ਅਪ੍ਰੈਲ 2026'] },
      { name: ['Safe lifting and fall prevention', 'सुरक्षित उठाना और गिरने से बचाव', 'ਸੁਰੱਖਿਅਤ ਚੁੱਕਣਾ ਅਤੇ ਡਿੱਗਣ ਤੋਂ ਬਚਾਅ'], when: ['May 2026', 'मई 2026', 'ਮਈ 2026'] },
      { name: ['Saathi home visit manners', 'Saathi घर विज़िट के तौर-तरीक़े', 'Saathi ਘਰ ਵਿਜ਼ਿਟ ਦੇ ਤੌਰ-ਤਰੀਕੇ'], when: ['June 2026', 'जून 2026', 'ਜੂਨ 2026'] },
    ],
  },
};

export const roleName = (t: TFn, r: CareRole) => (r === 'nurse' ? t('Nurse', 'नर्स', 'ਨਰਸ') : t('Physiotherapist', 'फ़िज़ियोथेरेपिस्ट', 'ਫ਼ਿਜ਼ੀਓਥੈਰੇਪਿਸਟ'));
