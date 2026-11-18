import { useEffect, useState } from 'react';

/**
 * Counts up by 1 every `stepMs` (default 1 s) while `running`, from `from` (default 0).
 * Optional `max` stops it there. Returns `[value, setValue]` (voice recording, call length).
 */
export function useTimer(running = true, from = 0, stepMs = 1000, max?: number) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setV((x) => (max !== undefined && x >= max ? x : x + 1)), stepMs);
    return () => clearInterval(id);
  }, [running, stepMs, max]);
  return [v, setV] as const;
}
