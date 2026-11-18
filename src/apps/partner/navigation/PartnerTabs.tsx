import React from 'react';
import { TabBar, useNav, useT } from '@/native/ui';

export type PartnerTab = 'home' | 'jobs' | 'earnings';

/** Bottom tabs: Home / Jobs / Earnings. Switching tabs resets the stack. */
export function PartnerTabs({ active }: { active: PartnerTab }) {
  const nav = useNav();
  const t = useT();
  return (
    <TabBar active={active} onChange={(k) => nav.reset(k)} tabs={[
      { key: 'home', label: t('Home', 'होम'), icon: 'home' },
      { key: 'jobs', label: t('Jobs', 'काम'), icon: 'list' },
      { key: 'earnings', label: t('Earnings', 'कमाई'), icon: 'wallet' },
    ]} />
  );
}
