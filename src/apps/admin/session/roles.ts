import type { Section } from '../navigation/types';

/**
 * Staff roles. The first five drive the sidebar today; Quality, Marketing and Viewer are the extra roles of the
 * Team and Permissions pages (v1b), which used to be plain strings there.
 */
export type Role = 'Owner' | 'Operations' | 'Support' | 'Finance' | 'Partner team' | 'Quality' | 'Marketing' | 'Viewer';

export const roles: Role[] = ['Owner', 'Operations', 'Support', 'Finance', 'Partner team', 'Quality', 'Marketing', 'Viewer'];

/**
 * Which sidebar sections each role can open (Owner sees everything). Quality, Marketing and Viewer follow the
 * "See …" rows of the permission matrix (`fixtures/permissions.ts`); no sign-in uses them yet.
 */
export const roleSections: Record<Role, Section[] | 'all'> = {
  Owner: 'all',
  Operations: ['dashboard', 'bookings', 'care', 'live', 'safety', 'automation', 'partners', 'customers', 'ratings'],
  Support: ['dashboard', 'bookings', 'safety', 'customers', 'support'],
  Finance: ['dashboard', 'payouts', 'pricing'],
  'Partner team': ['dashboard', 'partners', 'ratings', 'live'],
  Quality: ['dashboard', 'bookings', 'care', 'live', 'partners', 'customers', 'ratings'],
  Marketing: ['dashboard', 'customers', 'ratings', 'campaigns'],
  Viewer: ['dashboard', 'bookings', 'care', 'live', 'partners', 'customers', 'ratings', 'payouts', 'support', 'team'],
};

/** True when any of `roles` can open `section`. Unknown role names open nothing. */
export function rolesCanOpen(roles: readonly string[], section: Section): boolean {
  return roles.some((r) => {
    const s = roleSections[r as Role];
    return s === 'all' || (!!s && s.includes(section));
  });
}
