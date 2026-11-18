/**
 * Compatibility barrel. The launch values live in ./launchValues.ts (the one place the founders change);
 * the catalogue, prices, codes and formatting moved to src/domain/. This file keeps every old import working.
 */
export { decisions } from './launchValues';
export { services, categories, type ServiceId, type Category, type CharacterId } from '@/domain/services';
export { codes } from '@/domain/codes';
export { rupees } from '@/domain/format';
export { priceFor, partnerShare } from '@/domain/pricing';
