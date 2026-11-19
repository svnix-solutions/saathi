import type { RouteMap } from '@/native/ui';
import { routes as onboarding } from '../features/onboarding';
import { routes as account } from '../features/account';
import { routes as jobs } from '../features/jobs';
import { routes as status } from '../features/status';
import { routes as earnings } from '../features/earnings';
import { routes as growth } from '../features/growth';
import { routes as care } from '../features/care';

/** Every screen by route name, collected from the features. Route names are a fixed contract. */
export const partnerRoutes: RouteMap = { ...onboarding, ...account, ...jobs, ...status, ...earnings, ...growth, ...care };
