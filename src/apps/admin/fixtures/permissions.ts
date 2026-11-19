/**
 * Roles and permissions matrix (Team · Permissions · Role view pages). It lives in a tiny module store so that edits
 * on the Permissions page show up in the Team page summary ("12 of 24 permissions") during one Storybook session.
 */
import { useSyncExternalStore } from 'react';
import type { Role } from '../session/roles';

export const matrixRoles0: Role[] = ['Owner', 'Operations', 'Support', 'Finance', 'Quality', 'Marketing', 'Viewer'];

/** area, permission, then one char per role in matrixRoles0 order (1 = allowed). */
const rows0: [string, string, string][] = [
  ['Dashboard', 'See the live dashboard', '1111111'],
  ['Bookings', 'See bookings', '1111101'],
  ['', 'Assign a partner by hand', '1100000'],
  ['', 'Cancel a booking', '1110000'],
  ['Care', 'See care plans and visits', '1100101'],
  ['', 'Approve or reject prescriptions', '1100100'],
  ['', 'Handle clinical incidents', '1100100'],
  ['Live map', 'See locations and attendance', '1100101'],
  ['Safety', 'Handle safety alerts', '1110000'],
  ['Automation', 'Change auto-assign rules', '1100000'],
  ['Partners', 'See partners and documents', '1111101'],
  ['', 'Approve or suspend a partner', '1100000'],
  ['', 'Check sign-up documents', '1100100'],
  ['Customers', 'See customers', '1111111'],
  ['', 'Block or add wallet credit', '1000000'],
  ['Ratings', 'See ratings and quality', '1100111'],
  ['', 'Approve reviews and testimonials', '1000110'],
  ['Pricing & zones', 'Change service prices', '1000000'],
  ['', 'Open or tune a zone', '1100000'],
  ['Payouts', 'See partner payouts', '1001001'],
  ['', 'Approve and send payouts', '1001000'],
  ['', 'Refund a customer', '1111000'],
  ['Campaigns', 'Offer codes and campaigns', '1000010'],
  ['Support', 'See support tickets', '1110001'],
  ['', 'Reply to and close tickets', '1010000'],
  ['Team', 'Add admins and change roles', '1000000'],
  ['', 'See who changed what', '1001001'],
];

export type Matrix = {
  roles: string[];
  rows: { area: string; perm: string }[];
  /** grid[row][roleIndex] */
  grid: boolean[][];
  /** refund limit in ₹ per role */
  limits: Record<string, number>;
};

let state: Matrix = {
  roles: [...matrixRoles0],
  rows: rows0.map(([area, perm]) => ({ area, perm })),
  grid: rows0.map(([, , bits]) => bits.split('').map((b) => b === '1')),
  limits: { Owner: 100000, Finance: 5000, Operations: 1000, Support: 200 },
};
const subs = new Set<() => void>();

export const matrixStore = {
  get: () => state,
  set: (next: Matrix) => { state = next; subs.forEach((f) => f()); },
  subscribe: (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; },
};

export function useMatrix(): [Matrix, (m: Matrix) => void] {
  const m = useSyncExternalStore(matrixStore.subscribe, matrixStore.get, matrixStore.get);
  return [m, matrixStore.set];
}

/** Number of permissions a set of roles gets (union) and the highest refund limit. */
export function rolesSummary(m: Matrix, roles: string[]) {
  const idx = roles.map((r) => m.roles.indexOf(r)).filter((i) => i >= 0);
  const count = m.grid.filter((row) => idx.some((i) => row[i])).length;
  const refundRow = m.rows.findIndex((r) => r.perm === 'Refund a customer');
  const canRefund = refundRow >= 0 && idx.some((i) => m.grid[refundRow][i]);
  const limit = canRefund ? Math.max(0, ...roles.map((r) => m.limits[r] ?? 0)) : 0;
  return { count, total: m.rows.length, limit };
}
