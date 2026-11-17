import type { RouteMap } from '@/native/nav';
import { routes as v1 } from './v1/routes';
import { routes as v2 } from './v2/routes';
import { routes as v3 } from './v3/routes';

export const partnerRoutes: RouteMap = { ...v1, ...v2, ...v3 };
