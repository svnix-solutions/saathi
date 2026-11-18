import type { RouteMap } from '@/native/ui';
import { routes as legacy_v1 } from '../v1/routes';
import { routes as legacy_v2a } from '../v2a/routes';
import { routes as legacy_v2b } from '../v2b/routes';
import { routes as legacy_v3 } from '../v3/routes';
import { routes as auth } from '../features/auth';
import { routes as home } from '../features/home';
import { routes as booking } from '../features/booking';
import { routes as visit } from '../features/visit';
import { routes as bookings } from '../features/bookings';
import { routes as helpers } from '../features/helpers';
import { routes as ratings } from '../features/ratings';
import { routes as account } from '../features/account';
import { routes as wallet } from '../features/wallet';
import { routes as membership } from '../features/membership';
import { routes as community } from '../features/community';
import { routes as support } from '../features/support';
import { routes as status } from '../features/status';

/** Migration in progress: feature screens override the legacy area screens with the same route name. */
const legacy: RouteMap = { ...legacy_v1, ...legacy_v2a, ...legacy_v2b, ...legacy_v3 };
const features: RouteMap = { ...auth, ...home, ...booking, ...visit, ...bookings, ...helpers, ...ratings, ...account, ...wallet, ...membership, ...community, ...support, ...status };

export const customerRoutes: RouteMap = { ...legacy, ...features };
