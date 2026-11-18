import { useEffect, useRef } from 'react';

/**
 * Calls `fn` every `ms` while `enabled`. Always calls the latest `fn`, so it can read fresh state.
 * Pass `ms = null` to pause. Replaces the `useEffect(() => { const id = setInterval(…) … })` blocks in the screens.
 */
export function useInterval(fn: () => void, ms: number | null, enabled = true) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!enabled || ms === null) return;
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);
}
