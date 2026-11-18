import { useState } from 'react';
import { useTimeout } from '@/native/ui';

export type SelfieMatch = 'none' | 'checking' | 'ok';

/** Shift check's selfie: tap → "Matching…" → matched after 1.2 s. */
export function useSelfieMatch() {
  const [selfie, setSelfie] = useState<SelfieMatch>('none');
  useTimeout(() => setSelfie('ok'), 1200, selfie === 'checking', selfie);
  return { selfie, take: () => selfie === 'none' && setSelfie('checking') };
}
