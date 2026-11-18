import { useEffect, useState } from 'react';
import { RESEND_SECS } from '../data';

/** Seconds left before the code can be sent again; counts down once a second while `active`. */
export function useResendCountdown(active: boolean) {
  const [secs, setSecs] = useState(RESEND_SECS);
  useEffect(() => {
    if (!active || secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [active, secs]);
  return { secs, restart: () => setSecs(RESEND_SECS) };
}
