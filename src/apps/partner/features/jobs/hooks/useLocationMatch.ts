import { useState } from 'react';
import { useTimeout } from '@/native/ui';
import { locateMs } from '../data';

/** Check-in's simulated location check: false while "Checking location…", true after 1.2 s. */
export function useLocationMatch() {
  const [located, setLocated] = useState(false);
  useTimeout(() => setLocated(true), locateMs);
  return located;
}
