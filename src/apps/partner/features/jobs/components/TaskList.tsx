import React from 'react';
import { taskName, taskNamesHiPartner } from '@/domain';
import { Card, CheckRow, useT } from '@/native/ui';
import { toggleTask } from '../job';
import { useJobsState } from '../state';

/** Ticked task list of the current job, shared by "On the job" and "No internet". */
export function TaskList({ gap = 14 }: { gap?: number }) {
  const t = useT();
  const [st, set] = useJobsState();
  const job = st.job;
  return (
    <Card style={{ gap }}>
      {job.tasks.map((x) => (
        <CheckRow key={x} size={24} on={job.done.includes(x)} label={taskName(t, x, taskNamesHiPartner)} onPress={() => set({ job: toggleTask(job, x) })} />
      ))}
    </Card>
  );
}

export default TaskList;
