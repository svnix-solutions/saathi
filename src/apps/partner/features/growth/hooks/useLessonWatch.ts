import { useState } from 'react';
import { useInterval } from '@/native/ui';
import { lessonsWatched, type Lesson } from '../data';

/**
 * Minutes watched per lesson. While `playing`, the open lesson advances one "minute" a second (1 s = 1 min in the
 * prototype) and stops by itself at the end.
 */
export function useLessonWatch(open: Lesson | null) {
  const [watched, setWatched] = useState<Record<string, number>>(lessonsWatched);
  const [playing, setPlaying] = useState(false);
  useInterval(() => {
    if (!open) return;
    setWatched((w) => {
      const now = Math.min(open.mins, (w[open.id] ?? 0) + 1);
      if (now >= open.mins) setPlaying(false);
      return { ...w, [open.id]: now };
    });
  }, 1000, playing && !!open);
  return { watched, playing, setPlaying };
}
