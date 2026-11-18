import { useEffect, useRef, useState } from 'react';
import { uploadStep } from '../data';

export type SelfiePhase = 'camera' | 'taken' | 'upload';

/** Selfie camera steps: camera preview → taken → uploading (+20 % every 350 ms); `onUploaded` runs at 100 %. */
export function useSelfieUpload(onUploaded: () => void) {
  const [phase, setPhase] = useState<SelfiePhase>('camera');
  const [pct, setPct] = useState(0);
  const done = useRef(onUploaded);
  done.current = onUploaded;
  useEffect(() => {
    if (phase !== 'upload') return;
    if (pct >= 100) { done.current(); return; }
    const id = setTimeout(() => setPct((p) => Math.min(100, p + uploadStep.pct)), uploadStep.ms);
    return () => clearTimeout(id);
  }, [phase, pct]);
  return {
    phase, pct,
    take: () => phase === 'camera' && setPhase('taken'),
    retake: () => { setPhase('camera'); setPct(0); },
    use: () => phase === 'taken' && setPhase('upload'),
  };
}
