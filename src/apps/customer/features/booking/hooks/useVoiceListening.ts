import { useState } from 'react';
import { useInterval, useTimeout } from '@/native/ui';
import { VOICE_LISTEN_MS, VOICE_PULSE_MS } from '../data';

export type VoicePhase = 'idle' | 'listening' | 'done';

/** Fake speech recognition: while listening the mic pulses, and after 2.6 s the phrase is "understood". */
export function useVoiceListening(initial: VoicePhase = 'idle') {
  const [phase, setPhase] = useState<VoicePhase>(initial);
  const [pulse, setPulse] = useState(false);
  const listening = phase === 'listening';
  useInterval(() => setPulse((x) => !x), VOICE_PULSE_MS, listening);
  useTimeout(() => setPhase('done'), VOICE_LISTEN_MS, listening);
  const toggle = () => setPhase(listening ? 'idle' : 'listening');
  return { phase, listening, pulse, toggle };
}
