import type { ServiceId } from '@/domain';
import type { Locale } from '@/native/ui';

/** The upcoming sample booking shown on Bookings and Change booking. */
export type UpcomingBooking = { service: ServiceId; minutes: number; slot: string; slotHi: string; helper: string };
/** A finished visit, kept after rating so "Book again" and the receipt can read it. */
export type LastVisit = { service: ServiceId; minutes: number; price: number };
/** A testimonial the customer offered (design page 15). */
export type Testimonial = { status: 'Waiting for approval' | 'Approved' | 'Live' | 'Taken down'; showAs: string; app: boolean; web: boolean; photo: boolean; sent: string };

/**
 * Everything the customer prototype remembers while you click through it.
 * Read and write it with `useCustomerState()`. Fields are grouped by the feature that owns them.
 */
export type CustomerState = {
  /* ---- auth / profile ---- */
  signedIn: boolean;
  name: string;
  phone: string;
  email?: string;
  /** set when the customer picks a language in the app; overrides the toolbar locale */
  language?: Locale;
  address: { label: string; line: string; note: string };
  homeSize?: '1' | '2' | '3';
  bathrooms?: number;
  pets?: boolean;
  elderly?: boolean;

  /* ---- booking being built ---- */
  service: ServiceId;
  tasks: string[];
  note: string;
  minutes: number;
  when: 'now' | 'later';
  /** scheduled day when `when` is 'later' */
  day?: 'today' | 'tomorrow' | 'wed';
  pay: 'upi' | 'cash';
  /** confirm screen: UPI fails once when true (default false) */
  simulatePaymentFail?: boolean;
  paymentFailedOnce?: boolean;
  supplies?: Record<string, number>;

  /* ---- visit ---- */
  /** minutes added during the visit */
  extraMinutes?: number;
  rating?: number;
  tip?: number;
  lastVisit?: LastVisit;
  upcoming?: UpcomingBooking | null;

  /* ---- helpers ---- */
  favourites?: string[];
  blocked?: string[];

  /* ---- money & membership ---- */
  walletBalance?: number;
  points?: number;
  plus?: 'monthly' | 'yearly';
  autoPay?: boolean;

  /* ---- alerts, display, community ---- */
  readAlerts?: number[];
  textScale?: number;
  darkMode?: boolean;
  readAloud?: boolean;
  helperLang?: boolean;
  testimonial?: Testimonial;

  /** Feature-specific extras not listed above. Prefer adding a typed field here. */
  [k: string]: unknown;
};
