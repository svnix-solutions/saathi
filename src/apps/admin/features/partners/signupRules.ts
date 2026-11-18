/** Pure helpers for the sign-ups page: which certificates a sign-up needs and how her work is named. */
import { docType, profession, requiredDocs, specializations } from '@/data/professions';
import type { Signup } from './data';

/** Certificates the work needs, beyond Aadhaar and PAN. */
export const certsOf = (s: Signup) =>
  requiredDocs(s.prof, s.specs).filter((r) => r.doc !== 'aadhaar' && r.doc !== 'pan').map((r) => ({ ...docType(r.doc), required: r.required }));

/** "House help · Deep cleaning" */
export const workOf = (s: Signup) =>
  [profession(s.prof).name, ...s.specs.map((id) => specializations.find((x) => x.id === id)?.name)].join(' · ');
