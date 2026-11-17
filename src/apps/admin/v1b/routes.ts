import type { PageMap } from '../shell';
import { Team, Permissions, RoleView } from './team';
import { Signups } from './signups';
import { Safety } from './safety';
import { Services } from './services';
import { PartnerDetail } from './partnerDetail';

/** Admin pages owned by this area. Keys are the shared page names listed in ../PAGES.md. */
export const pages: PageMap = {
  team: { section: 'team', title: 'Team', component: Team },
  permissions: { section: 'team', title: 'Team / Roles and permissions', component: Permissions },
  roleView: { section: 'support', title: 'Support', component: RoleView },
  signups: { section: 'partners', title: 'Partners / Sign-ups', component: Signups },
  safety: { section: 'safety', title: 'Safety', component: Safety },
  services: { section: 'pricing', title: 'Pricing & zones / Services', component: Services },
  partnerDetail: { section: 'partners', title: 'Partners / Sunita D.', component: PartnerDetail },
};
