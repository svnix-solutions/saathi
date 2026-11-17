import React from 'react';
import { TabBar, useNav, useT } from '@/native/ui';
import type { DocId, ProfessionId } from '@/data/professions';

/** Prototype-wide partner state (read/write with useAppState<PartnerState>()). Areas may add optional fields. */
export type PartnerState = {
  name: string;
  phone: string;
  online: boolean;
  approved: boolean;
  /** set when the partner picks a language in the app; overrides the toolbar locale */
  locale?: 'en' | 'hi' | 'pa';
  /** sign-up choices (design page 22) */
  profession?: ProfessionId;
  specs?: string[];
  skills?: string[];
  docsAdded?: DocId[];
  /** wrong finish codes typed on the current job (design page 30) */
  finishTries?: number;
  /** current job */
  job: { id: string; service: string; minutes: number; earn: number; address: string; customer: string; note: string; tasks: string[]; done: string[] };
  [k: string]: unknown;
};

export const initialPartnerState: PartnerState = {
  name: 'Sunita',
  phone: '98100 22334',
  online: true,
  approved: true,
  job: {
    id: '#2041', service: 'General cleaning', minutes: 60, earn: 126, address: 'Flat 204, Block C', customer: 'Nitin K.',
    note: "Please do the kids' room first.", tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'], done: ['Sweep and mop floors', 'Dusting'],
  },
};

/** Bottom tabs: Home / Jobs / Earnings. Switching tabs resets the stack. */
export function PartnerTabs({ active }: { active: 'home' | 'jobs' | 'earnings' }) {
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
