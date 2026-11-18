/** Prices and the partner's share. Values come from the launch decisions. No React. */
import { decisions } from '@/data/launchValues';
import { services, type ServiceId } from './services';

/** Price for a duration in minutes. */
export const priceFor = (id: ServiceId, minutes: number) =>
  (services.find((s) => s.id === id)?.per30 ?? 79) * (minutes / 30);

/** What the partner earns from a price (rounded rupees). */
export const partnerShare = (price: number) => Math.round(price * decisions.partner.share);

/** Total price of a booking being built (service × minutes). Was `priceOf` in customer/v1/kit. */
export const priceOf = (booking: { service: ServiceId; minutes: number }) => priceFor(booking.service, booking.minutes);

/** The sample visit: 1 hr of general cleaning = ₹158. Was `visitPrice` in customer/v2a/kit. */
export const visitPrice = decisions.prices.general * 2;
