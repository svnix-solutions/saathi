import { update } from '../../fixtures';

/** Rejected sign-ups leave the partner list. */
export function removePartner(id: string) {
  update((s) => ({ ...s, partners: s.partners.filter((p) => p.id !== id) }));
}
