import type { PageMap } from '../../navigation';
import { SupportPage } from './pages/SupportPage';
import { TicketPage } from './pages/TicketPage';
import { ClaimsPage } from './pages/ClaimsPage';

/**
 * Support feature — public API of this folder. Other features import only from here.
 * Pages: support, ticket, claims
 */
export const pages: PageMap = {
  support: { section: 'support', title: 'Support', component: SupportPage },
  ticket: { section: 'support', title: 'Support', component: TicketPage },
  claims: { section: 'support', title: 'Support / Damage claims', component: ClaimsPage },
};

export { SupportPage, TicketPage, ClaimsPage };
export { TicketTag, type TicketTagProps } from './components/TicketTag';
export { ReasonChips, type ReasonChipsProps } from './components/ReasonChips';
