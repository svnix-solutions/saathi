import { useEffect, useRef } from 'react';
import { useCountdown } from '@/native/ui';
import { offerSeconds } from '../data';

/** Seconds left to accept a ringing job; calls `onExpire` once when it reaches 0. */
export function useOfferCountdown(onExpire: () => void) {
  const [left] = useCountdown(offerSeconds);
  const expire = useRef(onExpire);
  expire.current = onExpire;
  useEffect(() => {
    if (left > 0) return;
    expire.current();
  }, [left]);
  return left;
}
