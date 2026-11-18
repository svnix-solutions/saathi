import { useState } from 'react';
import { useTimeout } from '@/native/ui';
import { lockEtaFrom, lockStepMs } from '../data';

/**
 * Lock-screen preview clock: the helper is 8 min away and one minute passes every 3 s.
 * Returns minutes left, the progress share for the bar and the lock-screen time ("9:52" → "10:00"-ish).
 */
export function useLockScreenEta() {
  const [mins, setMins] = useState(lockEtaFrom);
  useTimeout(() => setMins((m) => m - 1), lockStepMs, mins > 0, mins);
  const passed = lockEtaFrom - mins;
  const pct = Math.min(1, 0.62 + passed * 0.0475);
  const clock = `9:${String(52 + passed).padStart(2, '0')}`;
  return { mins, pct, clock };
}
