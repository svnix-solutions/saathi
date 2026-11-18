import { useEffect, useState } from 'react';

/**
 * Counts down by 1 every `stepMs` (default 1 s) from `from` while `running`, stopping at 0.
 * Returns `[value, setValue]`. Replaces `useCountdown` in customer/v1/kit and partner/v1/kit (same signature).
 */
export function useCountdown(from: number, running = true, stepMs = 1000) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setV((x) => (x > 0 ? x - 1 : 0)), stepMs);
    return () => clearInterval(id);
  }, [running, stepMs]);
  return [v, setV] as const;
}
