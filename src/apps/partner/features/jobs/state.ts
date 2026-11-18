import { useAppState } from '@/native/ui';
import type { PartnerState } from '../../state';

/** One job as the partner app keeps it (`st.job`, and the offer that rings on Home). */
export type Job = PartnerState['job'];

/** Partner state plus the fields only the job flow writes. */
export type JobsState = PartnerState & {
  /** the job ringing on the job-request screen; falls back to `newJob` (set by "Take the nearby job") */
  offer?: Job;
  /** the start code matched on the door-code screen (design page 26) */
  jobStarted?: boolean;
  /** the partner's last rating of a home (design page 28, screen 40) */
  lastHomeRating?: { stars: number; tags: string[] };
};

/** `usePartnerState()` typed with the job-flow fields. */
export const useJobsState = () => useAppState<JobsState>();
