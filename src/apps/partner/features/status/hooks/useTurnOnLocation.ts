import { useState } from 'react';
import { useNav, useT } from '@/native/ui';
import { usePartnerState } from '../../../state';
import { settingsMs } from '../data';

/** "Open phone settings": shows "Opening settings…", then turns location on and takes the partner online. */
export function useTurnOnLocation() {
  const nav = useNav();
  const t = useT();
  const [, set] = usePartnerState();
  const [busy, setBusy] = useState(false);
  const open = () => {
    setBusy(true);
    setTimeout(() => { set({ online: true, offerShown: false }); nav.reset('home'); nav.toast(t('Location is on. You are online.', 'लोकेशन चालू। आप ऑनलाइन हैं।')); }, settingsMs);
  };
  return { busy, open };
}
