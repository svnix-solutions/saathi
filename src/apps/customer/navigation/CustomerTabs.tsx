import React from 'react';
import { TabBar, useNav, useT } from '@/native/ui';

export type CustomerTab = 'home' | 'bookings' | 'account';

/** Bottom tabs on Home / Bookings / Account. Switching tabs resets the stack. */
export function CustomerTabs({ active }: { active: CustomerTab }) {
  const nav = useNav();
  const t = useT();
  return (
    <TabBar active={active} onChange={(k) => nav.reset(k)} tabs={[
      { key: 'home', label: t('Home', 'होम'), icon: 'home' },
      { key: 'bookings', label: t('Bookings', 'बुकिंग'), icon: 'list' },
      { key: 'account', label: t('Account', 'खाता'), icon: 'user' },
    ]} />
  );
}
