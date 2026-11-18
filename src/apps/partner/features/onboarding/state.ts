import { useAppState } from '@/native/ui';
import type { PartnerState } from '../../state';

/** Sign-up fields written by the onboarding screens that are not (yet) in `state/types.ts`. */
export type OnboardingState = PartnerState & {
  /** full name as on Aadhaar (st.name keeps the first name) */
  fullName?: string;
  /** reference 2 confirmed by code */
  refsConfirmed?: boolean;
  /** last 4 digits of the Aadhaar number */
  aadhaarLast4?: string;
  /** PAN number, or 'Form 60' when the partner has none */
  pan?: string;
};

/** `usePartnerState()` typed with the onboarding fields. */
export const useOnboardingState = () => useAppState<OnboardingState>();
