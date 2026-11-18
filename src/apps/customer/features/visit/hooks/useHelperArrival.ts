import { useCountdown, useTimeout } from '@/native/ui';
import { mapHelperStartX, mapHomeX, startCodeDelayMs, trackingEtaFrom, trackingStepMs } from '../data';

/**
 * Tracking clock: the ETA counts down one "minute" every 2 s. Once the helper arrives (and the screen was not opened
 * straight on the start code) `onStartedByCode` runs a few seconds later, the prototype playing the partner.
 * Returns the ETA, a way to skip to arrival, and the helper dot's x on the map.
 */
export function useHelperArrival(openedArrived: boolean, onStartedByCode: () => void) {
  const [eta, setEta] = useCountdown(openedArrived ? 0 : trackingEtaFrom, true, trackingStepMs);
  const arrived = eta === 0;
  useTimeout(onStartedByCode, startCodeDelayMs, arrived && !openedArrived);
  // helper dot slides from x=42 towards the home dot as the ETA drops
  const helperX = arrived ? mapHomeX : mapHelperStartX + ((mapHomeX - mapHelperStartX) * (trackingEtaFrom - eta)) / trackingEtaFrom;
  return { eta, arrived, skipToArrival: () => setEta(0), helperX };
}
