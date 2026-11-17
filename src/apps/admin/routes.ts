import type { PageMap } from './shell';
import { pages as v1a } from './v1a/routes';
import { pages as v1b } from './v1b/routes';
import { pages as v2v3 } from './v2v3/routes';

export const adminPages: PageMap = { ...v1a, ...v1b, ...v2v3 };
