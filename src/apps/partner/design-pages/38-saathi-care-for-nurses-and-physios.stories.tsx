import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

/** Saathi Care for Saathi's salaried nurses and physiotherapists. Physio stories pass `careRole: 'physio'`. */
const meta: Meta<typeof PartnerApp> = { title: 'Partner app/Design pages/V2/38 Saathi Care for nurses and physios', tags: ['v2', 'design-page'], component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

const physio = { careRole: 'physio', name: 'Arjun' } as const;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="care.today" caption="38 · 1 · Today’s care visits" sub="Nurse: injection course, wound dressing, IV. Prescription checked by a Saathi doctor" />
      <PartnerApp initial="care.today" state={physio} caption="38 · 1 · Today · physio" sub="Physio sessions on a plan, same patient every visit" />
      <PartnerApp initial="care.visit" params={{ visit: 'cv1' }} caption="38 · 2 · Visit checklist" sub="Identity, prescription, consent, vitals, each step ticked" />
      <PartnerApp initial="care.notes" params={{ visit: 'cv4' }} state={physio} caption="38 · 3 · Visit notes" sub="Pain before and after, home exercises, flag for the doctor" />
      <PartnerApp initial="care.patient" params={{ patient: 'ramesh' }} state={physio} caption="38 · 4 · Patient on a plan" sub="Sessions done, pain trend, notes, family, allergies" />
      <PartnerApp initial="care.credentials" caption="38 · 5 · Licence and registration" sub="Council number, expiry, supervising doctor, training" />
    </PhoneRow>
  ),
};

export const Today: S = { args: { initial: 'care.today' } };
export const TodayPhysio: S = { name: 'Today · physio', args: { initial: 'care.today', state: physio } };
export const Visit: S = { args: { initial: 'care.visit', params: { visit: 'cv1' } } };
export const VisitWound: S = { name: 'Visit · wound photo with consent', args: { initial: 'care.visit', params: { visit: 'cv2' } } };
export const Notes: S = { args: { initial: 'care.notes', params: { visit: 'cv4' }, state: physio } };
export const Patient: S = { args: { initial: 'care.patient', params: { patient: 'ramesh' }, state: physio } };
export const Credentials: S = { args: { initial: 'care.credentials' } };
export const CredentialsPhysio: S = { name: 'Credentials · physio', args: { initial: 'care.credentials', state: physio } };
export const HomeHindi: S = { name: 'Home → Saathi Care · Hindi', args: { initial: 'home', locale: 'hi', state: { profession: 'nurse', autoOffer: false } } };
