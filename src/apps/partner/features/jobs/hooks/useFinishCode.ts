import { useState } from 'react';
import { codes } from '@/domain';
import { useNav } from '@/native/ui';
import { closeJob } from '../job';
import { useJobsState } from '../state';

/** The customer's finish code: either code closes the job (happy or not); 5 wrong codes and only support can finish it. */
export function useFinishCode(initial?: string) {
  const nav = useNav();
  const [st, set] = useJobsState();
  const tries = st.finishTries ?? 0;
  const left = codes.maxTries - tries;
  const [code, setCode] = useState(initial ?? '');
  const [err, setErr] = useState(!!initial && tries > 0);
  const type = (v: string) => { setCode(v); setErr(false); };
  const check = () => {
    if (code === codes.finishHappy || code === codes.finishNotHappy) {
      const happy = code === codes.finishHappy;
      set(closeJob(st, happy));
      nav.reset(happy ? 'finish.happy' : 'finish.notHappy');
      return;
    }
    set({ finishTries: tries + 1 });
    setErr(true);
  };
  return { code, type, err, tries, left, locked: left <= 0, check };
}
