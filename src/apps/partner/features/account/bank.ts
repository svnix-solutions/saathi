import { banks } from './data';

/**
 * The bank and branch for a typed IFSC: `null` until it has the 11-character shape (4 letters, 0, 6 letters/digits);
 * a generic "Bank found" for a valid code we have no sample for.
 */
export const bankFromIfsc = (ifsc: string): [string, string] | null =>
  (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc) ? banks[ifsc.slice(0, 4)] ?? ['Bank found', 'Branch from the IFSC'] : null);

/** Upper-case letters and digits only, 11 characters max. */
export const cleanIfsc = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
