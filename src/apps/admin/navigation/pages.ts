import type { PageMap } from './types';
import { pages as legacy_v1a } from '../v1a/routes';
import { pages as legacy_v1b } from '../v1b/routes';
import { pages as legacy_v2v3 } from '../v2v3/routes';
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

/** Migration in progress: feature pages override the legacy area pages with the same name. */
const legacy: PageMap = { ...legacy_v1a, ...legacy_v1b, ...legacy_v2v3 };
const features: PageMap = { ...auth, ...operations, ...safety, ...automation, ...campaigns, ...partners, ...customers, ...quality, ...team, ...finance, ...support, ...catalog };

/** Every admin page by name (see PAGES.md). */
export const adminPages: PageMap = { ...legacy, ...features };
