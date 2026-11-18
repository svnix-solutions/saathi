import { useEffect, useState } from 'react';

/**
 * The current time in ms, refreshed every `ms` (default 1 s). Use it for clocks computed from a deadline:
 * `const left = Math.max(0, Math.round((endsAt - useNow()) / 1000))` (partner/v1 `useJobClock`).
 */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(id); }, [ms]);
  return now;
}
