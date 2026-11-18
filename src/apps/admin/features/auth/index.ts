import type { PageMap } from '../../navigation';
import { LoginPage } from './pages/LoginPage';

export { LoginPage };

/**
 * Auth feature — public API of this folder. Other features import only from here.
 * Pages: login
 */
export const pages: PageMap = {
  login: { section: 'dashboard', title: 'Sign in', component: LoginPage },
};
