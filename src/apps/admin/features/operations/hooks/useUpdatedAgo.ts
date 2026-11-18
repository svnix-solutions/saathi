import { useEffect, useState } from 'react';

/** Seconds since the live map last refreshed: counts 10 → 30 once a second, then starts again at 1. */
export function useUpdatedAgo() {
  const [ago, setAgo] = useState(10);
  useEffect(() => { const t = setInterval(() => setAgo((a) => (a >= 30 ? 1 : a + 1)), 1000); return () => clearInterval(t); }, []);
  return ago;
}
