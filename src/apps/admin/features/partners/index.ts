import type { PageMap } from '../../navigation';
import { PartnersPage } from './pages/PartnersPage';
import { PartnerDetailPage } from './pages/PartnerDetailPage';
import { SignupsPage } from './pages/SignupsPage';
import { ProfessionsPage } from './pages/ProfessionsPage';

/**
 * Partners feature — public API of this folder. Other features import only from here.
 * Pages: partners, partnerDetail, signups, professions
 */
export const pages: PageMap = {
  partners: { section: 'partners', title: 'Partners', component: PartnersPage },
  partnerDetail: { section: 'partners', title: 'Partners / Sunita D.', component: PartnerDetailPage },
  signups: { section: 'partners', title: 'Partners / Sign-ups', component: SignupsPage },
  professions: { section: 'pricing', title: 'Pricing & zones / Professions & documents', component: ProfessionsPage },
};

export { PartnersPage, PartnerDetailPage, SignupsPage, ProfessionsPage };
