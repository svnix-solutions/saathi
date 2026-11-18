import { useEffect, useRef, useState } from 'react';
import { codes } from '@/domain';
import { usePartnerState } from './hooks';

/** Everything that belongs to one job. Cleared when a job is accepted and when it is closed, so tries and
 *  photos from one job never carry into the next. */
export const jobReset = {
  selfieIn: false, selfieOut: false, jobEndsAt: undefined, photos: undefined, familyLive: false,
  startTries: 0, startVerified: false, finishTries: 0,
};

/** The customer's start code, used by check-in and the start-code screen: 5 tries per job, then only support can start it. */
export function useStartCode(right: string = codes.start) {
  const [st, set] = usePartnerState();
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const tries = st.startTries ?? 0;
  const left = codes.maxTries - tries;
  /** true when the code matches; a miss uses one try and clears the boxes */
  const verify = () => {
    if (code === right) { set({ startVerified: true, startTries: 0 }); return true; }
    set({ startTries: tries + 1 }); setWrong(true); setCode('');
    return false;
  };
  const type = (v: string) => { setCode(v); setWrong(false); };
  return { code, type, wrong, left, locked: left <= 0, verified: !!st.startVerified, verify };
}

/** Seconds left on the current job (counts down from st.jobEndsAt, or 38:12 when no job clock is set). */
export function useJobClock() {
  const [st] = usePartnerState();
  const fallback = useRef(Date.now() + 2292 * 1000);
  const ends = st.jobEndsAt ?? fallback.current;
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  return Math.max(0, Math.round((ends - now) / 1000));
}
