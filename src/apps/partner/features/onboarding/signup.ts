/** Sign-up rules and input formatting (no UI). */
import {
  docType, profession, requiredDocs, skillsOf, specializations, specsOf, type DocId, type ProfessionId, type Requirement,
} from '@/data/professions';
import type { TFn } from '@/domain';
import type { PartnerState } from '../../state';
import { docHelp, professionName, specName } from './words';

/** Only the digits of a typed value. */
export const digits = (s: string) => s.replace(/\D/g, '');
/** "9811120034" → "98111 20034" (10 digits max). */
export const fmtPhone = (s: string) => { const d = digits(s).slice(0, 10); return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d; };
export const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
/** "123412341234" → "1234 1234 1234" (12 digits max). */
export const fmtAadhaar = (s: string) => digits(s).slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ');
/** Upper-case letters and digits only, 10 characters max. */
export const cleanPan = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
export const isPan = (s: string) => /^[A-Z]{5}\d{4}[A-Z]$/.test(s);
/** Adds `id` to the list, or removes it when it is there. */
export const toggleIn = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

/* Defaults when a screen is opened alone: the design's Nurse sample, first specialisations and skills of the profession. */
export const profOf = (st: PartnerState): ProfessionId => st.profession ?? 'nurse';
export const specsFor = (st: PartnerState) => st.specs ?? specsOf(profOf(st)).slice(0, 2).map((s) => s.id);
export const skillsFor = (st: PartnerState) => st.skills ?? skillsOf(profOf(st)).slice(0, 3).map((s) => s.id);
export const addedOf = (st: PartnerState): DocId[] => st.docsAdded ?? ['aadhaar', 'pan'];

/** True when the chosen work needs a document beyond Aadhaar and PAN (then step 6 is shown). */
export const needsCertificates = (st: PartnerState) =>
  !!st.profession && requiredDocs(st.profession, st.specs ?? []).some((r) => r.doc !== 'aadhaar' && r.doc !== 'pan');

/** "Everyone", "Every nurse · GNM, ANM or B.Sc", "Because you picked Kids", "Every barber · add if you have one". */
export function askedLine(r: Requirement, t: TFn) {
  const d = docType(r.doc);
  const spec = specializations.find((s) => s.id === r.specialization);
  const p = r.profession && profession(r.profession);
  const who = spec ? t(`Because you picked ${spec.name}`, `क्योंकि आपने ${spec.nameHi} चुना`, `ਕਿਉਂਕਿ ਤੁਸੀਂ ${specName(t, spec)} ਚੁਣਿਆ`)
    : p ? t(`Every ${p.name.toLowerCase()}`, `हर ${p.nameHi} के लिए`, `ਹਰ ${professionName(t, p)} ਲਈ`) : t('Everyone', 'सभी के लिए', 'ਸਾਰਿਆਂ ਲਈ');
  const more = !r.required ? t('add if you have one', 'हो तो जोड़ें', 'ਹੋਵੇ ਤਾਂ ਜੋੜੋ')
    : d.asksNumber && d.asksExpiry ? t('number and valid-until date', 'नंबर और कब तक मान्य', 'ਨੰਬਰ ਅਤੇ ਕਦੋਂ ਤੱਕ ਜਾਇਜ਼')
      : p && !d.asksExpiry ? docHelp(t, d) : '';
  return more ? `${who} · ${more}` : who;
}

/** Shows only the last 4 characters: XXXXXX3307. */
export const maskTail = (s: string) => (s.length <= 4 ? s : 'X'.repeat(s.length - 4) + s.slice(-4));

/**
 * The number field shows the masked value; a longer string means a character was typed, a shorter one means
 * backspace. Returns the new real value.
 */
export const typeMasked = (num: string, shown: string) =>
  (shown.length < maskTail(num).length ? num.slice(0, -1) : (num + shown.slice(-1)).toUpperCase().replace(/[^A-Z0-9]/g, ''));
