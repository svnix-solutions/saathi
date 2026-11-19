import type { RouteMap } from '@/native/ui';
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
import { routes as care } from '../features/care';

/** Every screen by route name, collected from the features. Route names are a fixed contract. */
export const customerRoutes: RouteMap = { ...auth, ...home, ...booking, ...visit, ...bookings, ...helpers, ...ratings, ...account, ...wallet, ...membership, ...community, ...support, ...status, ...care };
