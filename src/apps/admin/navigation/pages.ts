import type { PageMap } from './types';
import { pages as auth } from '../features/auth';
import { pages as operations } from '../features/operations';
import { pages as safety } from '../features/safety';
import { pages as automation } from '../features/automation';
import { pages as campaigns } from '../features/campaigns';
import { pages as partners } from '../features/partners';
import { pages as customers } from '../features/customers';
import { pages as quality } from '../features/quality';
import { pages as team } from '../features/team';
import { pages as finance } from '../features/finance';
import { pages as support } from '../features/support';
import { pages as catalog } from '../features/catalog';
import { pages as care } from '../features/care';

/** Every admin page by name, collected from the features (see PAGES.md). */
export const adminPages: PageMap = { ...auth, ...operations, ...safety, ...automation, ...campaigns, ...partners, ...customers, ...quality, ...team, ...finance, ...support, ...catalog, ...care };
