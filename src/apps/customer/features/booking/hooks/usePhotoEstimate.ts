import { useState } from 'react';
import { useTimeout } from '@/native/ui';
import { serviceById } from '@/domain';
import { PHOTO_ANALYSE_MS, PHOTO_SUGGESTED, toggleIn } from '../data';

export type PhotoPhase = 'camera' | 'analysing' | 'estimate';

/** Photo → suggested chores: the fake analysis takes 1.8 s; each ticked chore is 30 min of kitchen & bathroom. */
export function usePhotoEstimate(initial: PhotoPhase = 'camera') {
  const [phase, setPhase] = useState<PhotoPhase>(initial);
  const [tasks, setTasks] = useState<string[]>(PHOTO_SUGGESTED);
  useTimeout(() => setPhase('estimate'), PHOTO_ANALYSE_MS, phase === 'analysing');
  const minutes = tasks.length * 30;
  const price = (minutes / 30) * serviceById('kitchenBath').per30;
  const hours = minutes / 60;
  const toggle = (k: string) => setTasks((xs) => toggleIn(xs, k));
  return { phase, setPhase, tasks, toggle, minutes, price, hours };
}
