import type { Locale } from '@/native/ui';
import type { DocId } from '@/data/professions';

/** The SMS code that signs the partner in on the prototype. */
export const prototypeOtp = '4821';
/** Seconds before "Resend code" appears on the OTP screen and on the reference-code screen. */
export const otpResendSeconds = 22;
export const refResendSeconds = 18;

/** The seed state's phone; the phone screen shows the sign-up sample number instead. */
export const seedPhone = '98100 22334';
export const samplePhone = '98111 20034';

/** App languages on the phone screen, in the design's order. */
export const appLanguages: { k: Locale; l: string }[] = [{ k: 'hi', l: 'हिन्दी' }, { k: 'en', l: 'English' }, { k: 'pa', l: 'ਪੰਜਾਬੀ' }];

/** Sample sign-up details. */
export const sampleDetails = { fullName: 'Sunita Devi', email: 'sunita.devi@example.com', area: 'Block C' };
/** The sample name and area as shown in Hindi and Punjabi (placeholders and the PAN name check). */
export const sampleNames = {
  fullName: ['Sunita Devi', 'सुनीता देवी', 'ਸੁਨੀਤਾ ਦੇਵੀ'], area: ['Block C', 'ब्लॉक सी', 'ਬਲਾਕ ਸੀ'],
  name: ['Sunita', 'सुनीता', 'ਸੁਨੀਤਾ'], ref1: ['Kamla Devi', 'कमला देवी', 'ਕਮਲਾ ਦੇਵੀ'], ref2: ['Ramesh Kumar', 'रमेश कुमार', 'ਰਮੇਸ਼ ਕੁਮਾਰ'],
} as const;

/** How reference 2 knows the partner. */
export const referenceRelations = [
  { en: 'Neighbour', hi: 'पड़ोसी', pa: 'ਗੁਆਂਢੀ' }, { en: 'Past employer', hi: 'पुराने मालिक', pa: 'ਪੁਰਾਣੇ ਮਾਲਕ' },
  { en: 'Relative', hi: 'रिश्तेदार', pa: 'ਰਿਸ਼ਤੇਦਾਰ' },
];

/** Reference 1 is already confirmed in the design; its number cannot be reused. */
export const firstReferencePhone = '9822014567';
export const defaultReference2 = { name: 'Ramesh Kumar', phone: '98765 43210', rel: 'Past employer' };

/** Aadhaar placeholder (only the last 4 digits are kept). */
export const maskedAadhaar = 'XXXX XXXX 4821';
export const samplePan = 'ABCDE1234F';

/** Field label for the document number, by document type. */
export const docNumberLabels: Partial<Record<DocId, [string, string, string]>> = {
  aadhaar: ['Aadhaar number', 'आधार नंबर', 'ਆਧਾਰ ਨੰਬਰ'], pan: ['PAN number', 'पैन नंबर', 'ਪੈਨ ਨੰਬਰ'],
  nursing_registration: ['Registration number', 'रजिस्ट्रेशन नंबर', 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ'],
  electrical_licence: ['Licence number', 'लाइसेंस नंबर', 'ਲਾਇਸੈਂਸ ਨੰਬਰ'],
};

/** Sample filled-in certificate (`params.sample`). */
export const sampleCertificate = { number: 'MH203307', validUntil: '31 Mar 2029', validUntilHi: '31 मार्च 2029', validUntilPa: '31 ਮਾਰਚ 2029' };
