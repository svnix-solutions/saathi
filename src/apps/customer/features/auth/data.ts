/** Sign-in sample values and rules (design page 02). */

/** The SMS code the prototype accepts. */
export const SMS_CODE = '4821';
/** Wrong tries allowed before a new code is needed. */
export const OTP_TRIES = 5;
/** Seconds before "Resend code" appears the first time, and after a resend. */
export const OTP_FIRST_WAIT = 22;
export const OTP_RESEND_WAIT = 30;

export const SAMPLE_PHONE = '98765 43210';
export const SAMPLE_ADDRESS_LINE = 'Flat 204, Block C';

/** Languages offered on the name step, in their own script. */
export const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिन्दी' },
  { id: 'pa', label: 'ਪੰਜਾਬੀ' },
] as const;

/** Keeps the first 10 digits and writes them as "98765 43210". */
export function formatPhone(input: string) {
  const d = input.replace(/\D/g, '').slice(0, 10);
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

export const phoneDigits = (phone: string) => phone.replace(/\D/g, '');

/** Sector 40 is outside the service area in the prototype. */
export const isOutsideArea = (line: string) => /sector\s*40/i.test(line);
