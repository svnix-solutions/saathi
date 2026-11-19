import { useAppState } from '@/native/ui';
import type { Relation } from '@/domain';
import type { CustomerState } from '../../state';
import { DEFAULT_DRAFT, type CareDraft, type CarePlan } from './rules';

/** Customer state plus the fields only Saathi Care writes. */
export type CareState = CustomerState & {
  /** the booking being built (care.home → care.confirm) */
  careDraft?: Partial<CareDraft>;
  /** who the care is for, picked on the Care home */
  careFor?: Relation;
  /** the plan bought on care.confirm */
  carePlan?: CarePlan;
};

/** `useCustomerState()` typed with the care extras. */
export const useCareState = () => useAppState<CareState>();

/** The draft with defaults filled in, and a setter that merges. */
export function useCareDraft() {
  const [st, set] = useCareState();
  const draft: CareDraft = { ...DEFAULT_DRAFT, ...st.careDraft };
  const setDraft = (patch: Partial<CareDraft>) => set({ careDraft: { ...st.careDraft, ...patch } });
  return { st, set, draft, setDraft };
}
