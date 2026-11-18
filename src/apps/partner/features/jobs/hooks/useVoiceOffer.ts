import { useEffect, useState } from 'react';
import { useCountdown, useInterval, useNav, useT } from '@/native/ui';
import { offerSeconds, voiceScript, voiceTickMs, voiceTicks } from '../data';

/** The voice guide: reads the job aloud (40 ticks of 100 ms), counts down the accept time, and answers by voice. */
export function useVoiceOffer() {
  const nav = useNav();
  const t = useT();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0); // 0–40 ticks of reading progress
  const [secs] = useCountdown(offerSeconds);
  const [heard, setHeard] = useState<string | null>(null);
  const done = step >= voiceTicks;

  useInterval(() => setStep((s) => Math.min(voiceTicks, s + 1)), voiceTickMs, playing && !done);
  useEffect(() => { if (done) setPlaying(false); }, [done]);

  const accept = () => { nav.toast(t('Job accepted · head to Block C', 'काम मिल गया · ब्लॉक सी चलें')); setTimeout(() => nav.push('onJob'), 600); };
  const decline = () => { nav.toast(t('Job declined', 'काम मना किया')); setTimeout(() => nav.reset('home'), 600); };
  const mic = () => {
    if (!done) { setPlaying((p) => !p); return; }
    setHeard('हाँ');
    setTimeout(accept, 700);
  };
  const replay = () => { setStep(0); setPlaying(true); };
  /** how many script lines are read so far */
  const shown = Math.ceil((step / voiceTicks) * voiceScript.length);
  return { playing, step, done, secs, heard, shown, accept, decline, mic, replay };
}
