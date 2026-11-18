import { useEffect, useState } from 'react';

/** `Date.now()`, refreshed once a second (drives the "open for m:ss" timers). */
export function useNow() {
  const [t, setT] = useState(Date.now());
  useEffect(() => { const h = setInterval(() => setT(Date.now()), 1000); return () => clearInterval(h); }, []);
  return t;
}
