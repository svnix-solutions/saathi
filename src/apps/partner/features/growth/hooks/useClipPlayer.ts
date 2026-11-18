import { useState } from 'react';
import { useInterval } from '@/native/ui';

/**
 * A fake audio clip of `lengthSec` seconds that plays faster than real time (one second every `stepMs`) and rewinds
 * to 0 when it reaches the end.
 */
export function useClipPlayer(lengthSec = 60, stepMs = 250) {
  const [playing, setPlaying] = useState(false);
  const [sec, setSec] = useState(0);
  useInterval(() => setSec((s) => { if (s >= lengthSec - 1) { setPlaying(false); return 0; } return s + 1; }), stepMs, playing);
  return { playing, sec, toggle: () => setPlaying((p) => !p) };
}
