import { createContext, useContext } from 'react';
import type { PageParams, Section } from '../navigation/types';
import type { Role } from './roles';

/** The signed-in staff member. */
export type Session = { roles: Role[]; zones: string[]; name: string; face: string };

export const defaultSession: Session = { roles: ['Owner'], zones: ['All zones'], name: 'Admin', face: 'ad' };

export type AdminCtx = {
  page: string;
  params: PageParams;
  go: (page: string, params?: PageParams) => void;
  back: () => void;
  toast: (msg: string) => void;
  /** Roles of the signed-in staff member (the "Role view" page signs in as Support). */
  roles: Role[];
  zones: string[];
  setSession: (s: Session) => void;
  signOut: () => void;
  /** The page exists in this prototype. */
  has: (page: string) => boolean;
  /** The signed-in roles can open this sidebar section. */
  canOpen: (section: Section) => boolean;
};

export const AdminContext = createContext<AdminCtx | null>(null);

/** Router, toast and session for admin pages. Outside `<AdminApp>` it returns a harmless Owner stub. */
export function useAdmin(): AdminCtx {
  const v = useContext(AdminContext);
  if (v) return v;
  const noop = () => {};
  return { page: '', params: {}, go: noop, back: noop, toast: noop, roles: ['Owner'], zones: ['All zones'], setSession: noop, signOut: noop, has: () => false, canOpen: () => true };
}
