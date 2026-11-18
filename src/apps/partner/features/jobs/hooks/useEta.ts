import { useState } from 'react';
import { useInterval } from '@/native/ui';
import { etaStart, etaStepMs } from '../data';

/** Minutes to the door on the route screen: the helper "moves", one minute less every 5 s (never below 1). */
export function useEta() {
  const [mins, setMins] = useState(etaStart);
  useInterval(() => setMins((m) => Math.max(1, m - 1)), etaStepMs);
  return mins;
}
