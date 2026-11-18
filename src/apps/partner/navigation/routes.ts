import type { RouteMap } from '@/native/ui';
import { routes as legacy_v1 } from '../v1/routes';
import { routes as legacy_v2 } from '../v2/routes';
import { routes as legacy_v3 } from '../v3/routes';
import { routes as onboarding } from '../features/onboarding';
import { routes as account } from '../features/account';
import { routes as jobs } from '../features/jobs';
import { routes as status } from '../features/status';
import { routes as earnings } from '../features/earnings';
import { routes as growth } from '../features/growth';

/** Migration in progress: feature screens override the legacy area screens with the same route name. */
const legacy: RouteMap = { ...legacy_v1, ...legacy_v2, ...legacy_v3 };
const features: RouteMap = { ...onboarding, ...account, ...jobs, ...status, ...earnings, ...growth };

export const partnerRoutes: RouteMap = { ...legacy, ...features };
