/** Pure job rules and labels shared by the job screens. No React. */
import { serviceNamesHiByTitle, type TFn } from '@/domain';
import { defaultToday, jobReset } from '../../state';
import type { Job, JobsState } from './state';

/** What this job pays the partner (₹258 in the design's 2-hour sample). */
export const earnOf = (st: JobsState) => st.job?.earn ?? 258;
/** The customer's first name ("Nitin"). */
export const firstName = (st: JobsState) => st.job.customer.split(' ')[0];

/** The partner's name on the header ("Sunita" / "सुनीता"). */
export const partnerName = (t: TFn, name: string) => t(name, name === 'Sunita' ? 'सुनीता' : name);
/** Service title in the partner wording ("General cleaning" / "सामान्य सफ़ाई"). */
export const serviceTitle = (t: TFn, service: string) => t(service, serviceNamesHiByTitle[service]);
/** Job length in hours as the header shows it ("1 hr" / "1 घंटा", "0.5 hr" for 30 min). */
export const hoursLabel = (t: TFn, minutes: number) => t(minutes / 60 + ' hr', minutes / 60 + ' घंटा');
/** "1 hr" from 60 min, "30 min" below an hour (English only, as on the earnings line). */
export const lengthEn = (minutes: number) => (minutes >= 60 ? minutes / 60 + ' hr' : minutes + ' min');

/** The job with `task` ticked or unticked. */
export const toggleTask = (job: Job, task: string): Job => ({
  ...job, done: job.done.includes(task) ? job.done.filter((d) => d !== task) : [...job.done, task],
});
/** Tasks not ticked yet. */
export const missingTasks = (job: Job) => job.tasks.filter((x) => !job.done.includes(x));

/** The state change when the finish code closes the job. A happy code adds the earning to today and the week. */
export function closeJob(st: JobsState, happy: boolean): Partial<JobsState> {
  const job = st.job;
  const today = st.today ?? defaultToday;
  return {
    ...jobReset,
    ...(happy ? {
      earnedToday: (st.earnedToday ?? 412) + earnOf(st), jobsToday: (st.jobsToday ?? 3) + 1,
      week: (st.week ?? 2846) + earnOf(st), weekJobs: (st.weekJobs ?? 19) + 1,
      today: [{ title: job.service, titleHi: serviceNamesHiByTitle[job.service] ?? job.service, sub: `11:00 am · ${lengthEn(job.minutes)}`, amt: earnOf(st) }, ...today],
    } : {}),
  };
}
