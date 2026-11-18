/**
 * Punjabi (and the missing Hindi) for the profession lists in `@/data/professions`, which carry only English and Hindi.
 * Keyed by id; the helpers return the name in the current language.
 */
import type { TFn } from '@/domain';
import type { DocType, Profession, Skill, Specialization } from '@/data/professions';
import { sampleNames } from './data';

const professionPa: Record<string, [string, string]> = {
  house_help: ['ਘਰੇਲੂ ਮਦਦ', 'ਸਫ਼ਾਈ, ਭਾਂਡੇ, ਕੱਪੜੇ'],
  nurse: ['ਨਰਸ', 'ਘਰ ਵਿੱਚ ਦੇਖਭਾਲ ਅਤੇ ਨਰਸਿੰਗ'],
  home_service: ['ਹੋਮ ਸਰਵਿਸ', 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ, ਪਲੰਬਰ, ਤਰਖਾਣ'],
  barber: ['ਨਾਈ', 'ਗਾਹਕ ਦੇ ਘਰ ਵਾਲ ਕਟਾਈ'],
};

const specializationPa: Record<string, [string, string]> = {
  deep_clean: ['ਡੂੰਘੀ ਸਫ਼ਾਈ', 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ'],
  cooking: ['ਖਾਣਾ ਬਣਾਉਣਾ', 'ਰੋਜ਼ ਦਾ ਖਾਣਾ'],
  elderly: ['ਬਜ਼ੁਰਗਾਂ ਦੀ ਦੇਖਭਾਲ', 'ਘਰ ਵਿੱਚ ਬਜ਼ੁਰਗ ਮਰੀਜ਼'],
  post_surgery: ['ਅਪਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ ਦੇਖਭਾਲ', 'ਪੱਟੀ, ਦਵਾਈ, ਰਿਕਵਰੀ'],
  baby: ['ਮਾਂ ਅਤੇ ਬੱਚੇ ਦੀ ਦੇਖਭਾਲ', 'ਡਿਲੀਵਰੀ ਤੋਂ ਬਾਅਦ'],
  electrician: ['ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ', 'ਸਵਿੱਚ, ਪੱਖੇ, ਵਾਇਰਿੰਗ'],
  plumber: ['ਪਲੰਬਰ', 'ਟੂਟੀਆਂ, ਲੀਕੇਜ, ਨਾਲੀਆਂ'],
  carpenter: ['ਤਰਖਾਣ', 'ਫ਼ਰਨੀਚਰ ਅਤੇ ਦਰਵਾਜ਼ੇ'],
  men: ['ਮਰਦ', 'ਕਟਿੰਗ, ਦਾੜ੍ਹੀ, ਸ਼ੇਵ'],
  kids: ['ਬੱਚੇ', 'ਬੱਚਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਦੀ ਟ੍ਰੇਨਿੰਗ ਜ਼ਰੂਰੀ'],
  women: ['ਔਰਤਾਂ', 'ਕਟਿੰਗ ਅਤੇ ਟ੍ਰਿਮ'],
};

const skillPa: Record<string, string> = {
  sweep_mop: 'ਝਾੜੂ-ਪੋਚਾ', bathroom: 'ਬਾਥਰੂਮ ਦੀ ਸਫ਼ਾਈ', dishes: 'ਭਾਂਡੇ', laundry: 'ਕੱਪੜੇ ਅਤੇ ਪ੍ਰੈੱਸ',
  injection: 'ਇੰਜੈਕਸ਼ਨ', wound_dressing: 'ਜ਼ਖ਼ਮ ਦੀ ਪੱਟੀ', vitals: 'ਬੀਪੀ ਅਤੇ ਸ਼ੂਗਰ ਦੀ ਜਾਂਚ', catheter: 'ਕੈਥੀਟਰ ਦੀ ਦੇਖਭਾਲ',
  wiring: 'ਵਾਇਰਿੰਗ ਅਤੇ ਸਵਿੱਚ', fan_fitting: 'ਪੱਖਾ ਅਤੇ ਲਾਈਟ ਫ਼ਿਟਿੰਗ', tap_leak: 'ਟੂਟੀਆਂ ਅਤੇ ਲੀਕੇਜ', furniture: 'ਫ਼ਰਨੀਚਰ ਦੀ ਮੁਰੰਮਤ',
  hair_cut: 'ਵਾਲ ਕੱਟਣਾ', beard_trim: 'ਦਾੜ੍ਹੀ ਟ੍ਰਿਮ', shave: 'ਸ਼ੇਵ', hair_colour: 'ਵਾਲਾਂ ਨੂੰ ਰੰਗ',
};

/** Document name in Punjabi, and the `help` line in Hindi and Punjabi. */
const docWords: Record<string, { pa: string; helpHi: string; helpPa: string }> = {
  aadhaar: { pa: 'ਆਧਾਰ ਕਾਰਡ', helpHi: 'आगे और पीछे, चारों कोने दिखें', helpPa: 'ਅੱਗਾ ਅਤੇ ਪਿੱਛਾ, ਚਾਰੇ ਕੋਨੇ ਦਿਸਣ' },
  pan: { pa: 'ਪੈਨ ਕਾਰਡ', helpHi: 'ताकि कमाई और टैक्स सही दर्ज हों', helpPa: 'ਤਾਂ ਜੋ ਕਮਾਈ ਅਤੇ ਟੈਕਸ ਸਹੀ ਦਰਜ ਹੋਣ' },
  police_verification: { pa: 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ', helpHi: 'अपने इलाके के थाने से', helpPa: 'ਆਪਣੇ ਇਲਾਕੇ ਦੇ ਥਾਣੇ ਤੋਂ' },
  bank: { pa: 'ਬੈਂਕ ਪਾਸਬੁੱਕ ਜਾਂ ਚੈੱਕ', helpHi: 'हर हफ़्ते के भुगतान के लिए', helpPa: 'ਹਰ ਹਫ਼ਤੇ ਦੇ ਭੁਗਤਾਨ ਲਈ' },
  nursing_certificate: { pa: 'ਨਰਸਿੰਗ ਸਰਟੀਫ਼ਿਕੇਟ', helpHi: 'GNM, ANM या B.Sc', helpPa: 'GNM, ANM ਜਾਂ B.Sc' },
  nursing_registration: { pa: 'ਨਰਸਿੰਗ ਕੌਂਸਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ', helpHi: 'राज्य नर्सिंग काउंसिल का कार्ड', helpPa: 'ਸੂਬੇ ਦੀ ਨਰਸਿੰਗ ਕੌਂਸਲ ਦਾ ਕਾਰਡ' },
  iti_certificate: { pa: 'ਆਈਟੀਆਈ ਸਰਟੀਫ਼ਿਕੇਟ', helpHi: 'इलेक्ट्रीशियन, प्लंबर या बढ़ई का ट्रेड', helpPa: 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ, ਪਲੰਬਰ ਜਾਂ ਤਰਖਾਣ ਦਾ ਟ੍ਰੇਡ' },
  electrical_licence: { pa: 'ਵਾਇਰਮੈਨ ਲਾਇਸੈਂਸ', helpHi: 'राज्य के बिजली लाइसेंस बोर्ड से', helpPa: 'ਸੂਬੇ ਦੇ ਬਿਜਲੀ ਲਾਇਸੈਂਸ ਬੋਰਡ ਤੋਂ' },
  barber_certificate: { pa: 'ਨਾਈ/ਬਿਊਟੀ ਕੋਰਸ ਸਰਟੀਫ਼ਿਕੇਟ', helpHi: 'कोई भी मान्य कोर्स', helpPa: 'ਕੋਈ ਵੀ ਮਾਨਤਾ ਵਾਲਾ ਕੋਰਸ' },
  child_safety: { pa: 'ਬੱਚਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਦੀ ਟ੍ਰੇਨਿੰਗ', helpHi: 'Saathi ट्रेनिंग, या किसी कोर्स का सर्टिफ़िकेट', helpPa: 'Saathi ਟ੍ਰੇਨਿੰਗ, ਜਾਂ ਕਿਸੇ ਕੋਰਸ ਦਾ ਸਰਟੀਫ਼ਿਕੇਟ' },
};

export const professionName = (t: TFn, p: Profession) => t(p.name, p.nameHi, professionPa[p.id]?.[0]);
export const professionSub = (t: TFn, p: Profession) => t(p.sub, p.subHi, professionPa[p.id]?.[1]);
export const specName = (t: TFn, s: Specialization) => t(s.name, s.nameHi, specializationPa[s.id]?.[0]);
export const specSub = (t: TFn, s: Specialization) => t(s.sub, s.subHi, specializationPa[s.id]?.[1]);
export const skillName = (t: TFn, s: Skill) => t(s.name, s.nameHi, skillPa[s.id]);
export const docName = (t: TFn, d: DocType) => t(d.name, d.nameHi, docWords[d.id]?.pa);
export const docHelp = (t: TFn, d: DocType) => t(d.help, docWords[d.id]?.helpHi, docWords[d.id]?.helpPa);

/** A sample person's name in the current language ("Ramesh Kumar" → "रमेश कुमार"); a typed name stays as typed. */
export const localName = (t: TFn, name: string) => {
  const e = Object.values(sampleNames).find(([en]) => en === name);
  return e ? t(e[0], e[1], e[2]) : name;
};
/** The first word of `localName`. */
export const localFirst = (t: TFn, name: string) => localName(t, name).split(' ')[0];
