import type { RouteMap } from '@/native/nav';
import { routes as v1 } from './v1/routes';
import { routes as v2a } from './v2a/routes';
import { routes as v2b } from './v2b/routes';
import { routes as v3 } from './v3/routes';

export const customerRoutes: RouteMap = { ...v1, ...v2a, ...v2b, ...v3 };
