import { useState } from 'react';
import { useNav, useT, useTimeout } from '@/native/ui';
import { swapMates, swapReplyMs } from '../data';
import { personName } from '../job';

/** Swap a job: pick a teammate, ask, and they take it 2 s later. */
export function useSwapRequest() {
  const nav = useNav();
  const t = useT();
  const [sel, setSel] = useState('kr');
  const [asked, setAsked] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  useTimeout(() => {
    setAccepted(true);
    const name = swapMates.find((m) => m.id === asked)?.name ?? '';
    nav.toast(t(`${name} took the job · no penalty`, `${personName(t, name)} ने काम ले लिया · कोई जुर्माना नहीं`, `${personName(t, name)} ਨੇ ਕੰਮ ਲੈ ਲਿਆ · ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ`));
  }, swapReplyMs, !!asked, asked);
  const mate = swapMates.find((m) => m.id === (asked ?? sel))!;
  const ask = (id: string) => { setSel(id); setAsked(id); };
  return { sel, setSel, asked, accepted, mate, ask };
}
