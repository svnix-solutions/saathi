import type { DocId, ProfessionId } from '@/data/professions';
import type { Locale } from '@/native/ui';

/** One line in today's earnings list. */
export type PayLine = { title: string; titleHi: string; sub: string; amt: number; tip?: boolean };

/**
 * Everything the partner prototype remembers while you click through it.
 * Read and write it with `usePartnerState()`. Fields are grouped by the feature that owns them.
 */
export type PartnerState = {
  name: string;
  phone: string;
  online: boolean;
  approved: boolean;
  /** set when the partner picks a language in the app; overrides the toolbar locale */
  locale?: Locale;
  /** sign-up choices (design page 22) */
  profession?: ProfessionId;
  specs?: string[];
  skills?: string[];
  docsAdded?: DocId[];
  /** wrong finish codes typed on the current job (design page 30) */
  finishTries?: number;
  /** wrong start codes typed on the current job; at codes.maxTries only support can start it */
  startTries?: number;
  /** the customer's start code matched at check-in (or on the start-code screen) */
  startVerified?: boolean;
  /** current job */
  job: { id: string; service: string; minutes: number; earn: number; address: string; customer: string; note: string; tasks: string[]; done: string[] };
  /* ---- profile & sign-up ---- */
  email?: string;
  area?: string;
  emergency?: string;
  ref2?: { name: string; phone: string; rel: string };
  /* ---- home ---- */
  /** auto-ring a new job ~4 s after Home opens online (off on design pages) */
  autoOffer?: boolean;
  offerShown?: boolean;
  alertsRead?: string[];
  /* ---- current job ---- */
  selfieIn?: boolean;
  selfieOut?: boolean;
  jobEndsAt?: number;
  checkedInAt?: string;
  photos?: string[];
  familyLive?: boolean;
  /* ---- earnings ---- */
  jobsToday?: number;
  earnedToday?: number;
  week?: number;
  weekJobs?: number;
  today?: PayLine[];
  /** Feature-specific extras not listed above. Prefer adding a typed field here. */
  [k: string]: unknown;
};
