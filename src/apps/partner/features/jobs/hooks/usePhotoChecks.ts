import { useState } from 'react';
import { photoCheckMs, workPhotos, workPhotosStart, type PhotoState } from '../data';

/** Instant photo check: a (re)taken photo shows "Checking…", then passes after a short pause (the retake has the light on). */
export function usePhotoChecks() {
  const [ps, setPs] = useState<Record<string, PhotoState>>(workPhotosStart);
  const capture = (id: string) => {
    setPs((s) => ({ ...s, [id]: 'checking' }));
    setTimeout(() => setPs((s) => ({ ...s, [id]: 'pass' })), photoCheckMs);
  };
  return { ps, capture, all: workPhotos.every((p) => ps[p.id] === 'pass') };
}
