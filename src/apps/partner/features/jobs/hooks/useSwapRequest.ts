import { useState } from 'react';
import { useNav, useTimeout } from '@/native/ui';
import { swapMates, swapReplyMs } from '../data';

/** Swap a job: pick a teammate, ask, and they take it 2 s later. */
export function useSwapRequest() {
  const nav = useNav();
  const [sel, setSel] = useState('kr');
  const [asked, setAsked] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  useTimeout(() => { setAccepted(true); nav.toast(`${swapMates.find((m) => m.id === asked)?.name} took the job · no penalty`); }, swapReplyMs, !!asked, asked);
  const mate = swapMates.find((m) => m.id === (asked ?? sel))!;
  const ask = (id: string) => { setSel(id); setAsked(id); };
  return { sel, setSel, asked, accepted, mate, ask };
}
