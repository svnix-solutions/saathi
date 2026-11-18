/** Prototype sample data for the team pages (team, roles and permissions, role view). */
import type { Session } from '../../session';

/* ---------------- team ---------------- */

export type Grant = { zones: string; until?: string };
export type TeamMember = {
  id: string; name: string; face?: string; email: string; joined: string; last: string; status: 'Active' | 'Invited' | 'Removed';
  roles: Record<string, Grant>;
};

export const ALL_ZONES = 'All zones';

export const initialTeam: TeamMember[] = [
  { id: 'ad', name: 'Admin', face: 'ad', email: 'admin@saathi', joined: 'Aug 2026', last: 'Today, 9:02', status: 'Active', roles: { Owner: { zones: ALL_ZONES } } },
  { id: 'ol', name: 'Ops lead', face: 'ol', email: 'ops@saathi', joined: 'Sep 2026', last: 'Today, 8:40', status: 'Active', roles: { Operations: { zones: ALL_ZONES }, Quality: { zones: ALL_ZONES } } },
  { id: 's1', name: 'Support 1', face: 's1', email: 'support1@saathi', joined: 'Oct 2026', last: 'Today, 9:10', status: 'Active', roles: { Support: { zones: 'Block C, Sector 21' } } },
  { id: 's2', name: 'Support 2', face: 's2', email: 'support2@saathi', joined: 'Oct 2026', last: 'Yesterday', status: 'Active', roles: { Support: { zones: ALL_ZONES }, Finance: { zones: ALL_ZONES, until: '30 Nov' } } },
  { id: 'ac', name: 'Accounts', face: 'ac', email: 'accounts@saathi', joined: 'Sep 2026', last: 'Monday', status: 'Active', roles: { Finance: { zones: ALL_ZONES } } },
  { id: 'mk', name: 'Marketing', face: 'mk', email: 'marketing@saathi', joined: 'Oct 2026', last: '12 Nov', status: 'Active', roles: { Marketing: { zones: ALL_ZONES } } },
  { id: 'au', name: 'Auditor', face: 'au', email: 'auditor@saathi', joined: 'Nov 2026', last: 'Never', status: 'Invited', roles: { Viewer: { zones: ALL_ZONES } } },
];

/** Roles in the order the Team page lists them. */
export const roleOrder = ['Support', 'Finance', 'Operations', 'Quality', 'Marketing', 'Viewer', 'Owner'];
export const zoneOptions = [ALL_ZONES, 'Block C, Sector 21', 'Block A', 'Block C', 'Block D', 'Sector 18', 'Sector 21'];
/** '' = until removed; a date = cover role that ends by itself. */
export const untilOptions = ['', '30 Nov', '15 Dec', '31 Dec'];
export const untilLabel = (u: string) => (u ? `As cover, till ${u}` : 'Until removed');

/** "SD" from "Sunita Devi". */
export const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

/* ---------------- role view ---------------- */

export const SUPPORT_SESSION: Session = { roles: ['Support'], zones: ['Block C', 'Sector 21'], name: 'Anu', face: 'au' };
export const OWNER_SESSION: Session = { roles: ['Owner'], zones: ['All zones'], name: 'Admin', face: 'ad' };

export type SupportTicket = {
  id: string; title: string; from: string; zone: string; wait: string; status: 'Open' | 'Answered' | 'Passed on'; urgent?: boolean;
  /** full and part refund in ₹ (0 = no refund buttons), and minutes the part refund is for */
  full: number; part: number; mins: number;
};

export const supportTickets: SupportTicket[] = [
  { id: '2031', title: 'Work was not finished', from: 'Sameer T. · #2031', zone: 'Block C', wait: '20 min', status: 'Open', urgent: true, full: 158, part: 53, mins: 20 },
  { id: '2038', title: 'Customer not at home', from: 'Rekha M. · #2038', zone: 'Sector 21', wait: '35 min', status: 'Open', full: 158, part: 30, mins: 0 },
  { id: '2019', title: 'Charged wrongly', from: 'Priya N. · #2019', zone: 'Sector 21', wait: '2 hr', status: 'Open', full: 258, part: 100, mins: 0 },
  { id: 'p-anita', title: 'Payment problem', from: 'Anita B. · payout', zone: 'Sector 21', wait: 'Yesterday', status: 'Answered', full: 0, part: 0, mins: 0 },
];
