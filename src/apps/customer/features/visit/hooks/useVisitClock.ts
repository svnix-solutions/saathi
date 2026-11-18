import { useEffect, useRef } from 'react';
import { useCountdown } from '@/native/ui';
import { inProgressShareLeft } from '../data';

/**
 * The job-in-progress clock: seconds left of the booked time (the design opens 37% done), counting down once a second.
 * `onDone` runs when it reaches 0. `addMinutes(n)` puts time back on the clock.
 */
export function useVisitClock(bookedMinutes: number, onDone: () => void) {
  const [left, setLeft] = useCountdown(Math.round(bookedMinutes * 60 * inProgressShareLeft));
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => { if (left === 0) done.current(); }, [left]);
  return { left, addMinutes: (n: number) => setLeft((x) => x + n * 60) };
}
