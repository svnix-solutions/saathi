import { banks, unknownBank } from './data';

/**
 * The bank and branch (English, Hindi, Punjabi) for a typed IFSC: `null` until it has the 11-character shape (4 letters, 0, 6 letters/digits);
 * a generic "Bank found" for a valid code we have no sample for.
 */
export const bankFromIfsc = (ifsc: string): [string, string, string, string] | null =>
  (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc) ? banks[ifsc.slice(0, 4)] ?? unknownBank : null);

/** Upper-case letters and digits only, 11 characters max. */
export const cleanIfsc = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
