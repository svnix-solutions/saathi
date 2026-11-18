import type { PageMap } from './navigation';
import { pages as v1a } from './v1a/routes';
import { pages as v1b } from './v1b/routes';
import { pages as v2v3 } from './v2v3/routes';

/** Every admin page by name (see PAGES.md). */
export const adminPages: PageMap = { ...v1a, ...v1b, ...v2v3 };
