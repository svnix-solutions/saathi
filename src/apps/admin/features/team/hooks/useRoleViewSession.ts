import { useEffect } from 'react';
import { useAdmin } from '../../../session';
import { OWNER_SESSION, SUPPORT_SESSION } from '../data';

/**
 * The role-view page signs in as Support when it opens (once), and offers switching back to Owner.
 * Returns whether the panel is currently seen as a Support person.
 */
export function useRoleViewSession() {
  const { setSession, roles } = useAdmin();
  const asSupport = roles.length === 1 && roles[0] === 'Support';
  useEffect(() => {
    if (!asSupport) setSession({ ...SUPPORT_SESSION, roles: [...SUPPORT_SESSION.roles] });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on first open, like the design
  }, []);
  return {
    asSupport,
    viewAsSupport: () => setSession({ ...SUPPORT_SESSION, roles: [...SUPPORT_SESSION.roles] }),
    backToOwner: () => setSession({ ...OWNER_SESSION, roles: [...OWNER_SESSION.roles] }),
  };
}
