import { useAppState } from '@/native/ui';
import type { PartnerState } from '../../state';
import type { CareRole, FlagReason, Vitals } from './data';

/** The note sent after a care visit (shown on the patient's page afterwards). */
export type SentCareNote = { before: number; after: number; text: string; flag?: FlagReason };

/** Partner state plus the fields only Saathi Care writes. */
export type CareState = PartnerState & {
  /** nurse or physiotherapist: which visits and which council licence the app shows (default nurse) */
  careRole?: CareRole;
  /** visits finished today (notes sent) */
  careDone?: string[];
  /** readings recorded on the visit checklist, by visit id */
  careVitals?: Record<string, Vitals>;
  /** notes sent today, by visit id */
  careNotes?: Record<string, SentCareNote>;
  /** licence renewal sent from the credentials screen */
  careRenewSent?: boolean;
};

/** `usePartnerState()` typed with the Saathi Care fields. */
export const useCareState = () => useAppState<CareState>();
