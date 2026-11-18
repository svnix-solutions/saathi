import type { Role } from '../../session';

/** Demo password for every account. */
export const PASSWORD = 'saathi';
/** Demo 6-digit code sent by SMS. */
export const CODE = '482193';
/** Seconds before "Send again" is offered. */
export const RESEND_SECS = 24;

export type LoginError = null | 'wrong' | 'locked' | 'norole' | 'off' | 'code';

export type DemoAccount = { name: string; face: string; roles: Role[]; label: string };

/** Which demo staff member an email signs in as (emails starting opslead / support pick other roles). */
export function accountFor(email: string): DemoAccount {
  const e = email.toLowerCase();
  if (e.startsWith('opslead')) return { name: 'Ops lead', face: 'ol', roles: ['Operations'], label: 'Roles: Operations, Quality · all zones. You will see 8 of 13 menus.' };
  if (e.startsWith('support')) return { name: 'Anu', face: 'au', roles: ['Support'], label: 'Role: Support · Block C, Sector 21. You will see 5 of 13 menus.' };
  return { name: 'Admin', face: 'ad', roles: ['Owner'], label: 'Role: Owner · all zones. You will see all 13 menus.' };
}

/** Zones the signed-in account covers. */
export const zonesFor = (a: DemoAccount) => (a.roles[0] === 'Support' ? ['Block C', 'Sector 21'] : ['All zones']);
