import type { PageMap } from '../../navigation';
import { TeamPage } from './pages/TeamPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { RoleViewPage } from './pages/RoleViewPage';

/**
 * Team feature — public API of this folder. Other features import only from here.
 * Pages: team, permissions, roleView
 */
export const pages: PageMap = {
  team: { section: 'team', title: 'Team', component: TeamPage },
  permissions: { section: 'team', title: 'Team / Roles and permissions', component: PermissionsPage },
  roleView: { section: 'support', title: 'Support', component: RoleViewPage },
};

export { TeamPage, PermissionsPage, RoleViewPage };
