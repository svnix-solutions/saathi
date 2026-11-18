import type { PageMap } from '../../navigation';
import { SmartPage } from './pages/SmartPage';

export { SmartPage };

/**
 * Automation feature — public API of this folder. Other features import only from here.
 * Pages: smart
 */
export const pages: PageMap = {
  smart: { section: 'automation', title: 'Automation', component: SmartPage },
};
