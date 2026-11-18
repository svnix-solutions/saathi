import { useEffect, useRef } from 'react';

/**
 * Calls `fn` once, `ms` after mount (or after `enabled` turns true / `key` changes). Cleared on unmount.
 * For "fake work finishes after 1.2 s" effects in the prototype.
 */
export function useTimeout(fn: () => void, ms: number, enabled = true, key?: unknown) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => ref.current(), ms);
    return () => clearTimeout(id);
  }, [ms, enabled, key]);
}
