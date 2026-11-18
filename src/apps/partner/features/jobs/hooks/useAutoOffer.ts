import { useNav, useTimeout } from '@/native/ui';
import { autoOfferMs } from '../data';
import { useJobsState } from '../state';

/** Rings a new job ~4 s after Home opens online, once per online session (off when `st.autoOffer` is false). */
export function useAutoOffer() {
  const nav = useNav();
  const [st, set] = useJobsState();
  const enabled = st.online && !st.offerShown && st.autoOffer !== false;
  // restarts whenever one of the three inputs changes, as the original effect did
  useTimeout(() => { set({ offerShown: true }); nav.push('jobRequest'); }, autoOfferMs, enabled, `${st.online}|${st.offerShown}|${st.autoOffer}`);
}
