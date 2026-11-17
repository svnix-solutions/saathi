import React from 'react';
import { TabBar, useNav, useT } from '@/native/ui';
import type { ServiceId } from '@/data/decisions';

/** Prototype-wide customer state (read/write with useAppState<CustomerState>()). Areas may add optional fields. */
export type CustomerState = {
  signedIn: boolean;
  name: string;
  phone: string;
  /** set when the customer picks a language in the app; overrides the toolbar locale */
  language?: 'en' | 'hi' | 'pa';
  simulatePaymentFail?: boolean;
  address: { label: string; line: string; note: string };
  /** booking being built */
  service: ServiceId;
  tasks: string[];
  note: string;
  minutes: number;
  when: 'now' | 'later';
  pay: 'upi' | 'cash';
  rating?: number;
  tip?: number;
  [k: string]: unknown;
};

export const initialCustomerState: CustomerState = {
  signedIn: true,
  name: 'Nitin Kumar',
  phone: '98765 43210',
  address: { label: 'Home', line: 'Flat 204, Block C', note: 'Gate 2, tell the guard flat 204' },
  service: 'general',
  tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'],
  note: "Please do the kids' room first.",
  minutes: 60,
  when: 'now',
  pay: 'upi',
};

/** Bottom tabs on Home / Bookings / Account. Switching tabs resets the stack. */
export function CustomerTabs({ active }: { active: 'home' | 'bookings' | 'account' }) {
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
