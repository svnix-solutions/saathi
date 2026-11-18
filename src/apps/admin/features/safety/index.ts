import type { PageMap } from '../../navigation';
import { SafetyPage } from './pages/SafetyPage';

export { SafetyPage };

/**
 * Safety feature — public API of this folder. Other features import only from here.
 * Pages: safety
 */
export const pages: PageMap = {
  safety: { section: 'safety', title: 'Safety', component: SafetyPage },
};
