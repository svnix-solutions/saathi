import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';
import { SAMPLE_PATIENT, SAMPLE_PLAN } from '../features/care';

const meta: Meta = { title: 'Customer app/Design pages/V2/37 Saathi Care: physio and nursing at home', tags: ['v2', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

/** A booking half built: the physio plan for a parent, used by the later screens of the flow. */
const physioDraft = { careDraft: { kind: 'physio' as const, specialty: 'postSurgery' as const, sessions: 10, patient: SAMPLE_PATIENT } };
const nurseDraft = { careDraft: { kind: 'nurse' as const, nurseMode: 'daily' as const, shift: 'day12' as const, days: 15, patient: SAMPLE_PATIENT } };
const rxDraft = { careDraft: { kind: 'procedure' as const, procedure: 'injectionCourse' as const, courseDays: 5 } };
const withPlan = { carePlan: SAMPLE_PLAN };

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="home" caption="37.0 · Home with Saathi Care" sub="A large Care card under the 15-minute card" />
      <CustomerApp initial="home" params={{ category: 'nursing' }} caption="37.0b · Care chip" sub="Care is the hero when the chip is picked" />
      <CustomerApp initial="care.home" state={withPlan} caption="37.1 · Saathi Care" sub="Who it is for, physio or nurse, trust" />
      <CustomerApp initial="care.physio" caption="37.2 · Physiotherapy" sub="Pick the problem" />
      <CustomerApp initial="care.plans" state={physioDraft} caption="37.3 · Session plans" sub="Pay once, same physio, visits booked up front" />
      <CustomerApp initial="care.nurse" state={nurseDraft} caption="37.4 · Nurse care" sub="By the hour or by the day" />
      <CustomerApp initial="care.procedures" state={rxDraft} caption="37.5 · Short procedures" sub="Injection course with a days stepper" />
      <CustomerApp initial="care.prescription" state={rxDraft} caption="37.6 · Prescription" sub="Checked by a Saathi doctor first" />
      <CustomerApp initial="care.patient" state={{ careFor: 'parent' }} caption="37.7 · Patient details" sub="For a parent, or prefilled for me" />
      <CustomerApp initial="care.schedule" state={physioDraft} caption="37.8 · Schedule" sub="Visit days and every date up front" />
      <CustomerApp initial="care.confirm" state={physioDraft} caption="37.9 · Confirm and pay" sub="What, who, when, price, reschedule rule" />
      <CustomerApp initial="care.plan" state={withPlan} caption="37.10 · My care plan" sub="Progress, next visit, reschedule or skip" />
      <CustomerApp initial="care.notes" state={withPlan} caption="37.11 · Visit notes" sub="Vitals, pain, exercises, shared with the doctor" />
    </PhoneRow>
  ),
};

export const Home: S = { name: '37.0 · Home with Saathi Care', render: () => <CustomerApp initial="home" /> };
export const HomeCare: S = { name: '37.0b · Care chip on Home', render: () => <CustomerApp initial="home" params={{ category: 'nursing' }} /> };
export const CareHome: S = { name: '37.1 · Saathi Care', render: () => <CustomerApp initial="care.home" /> };
export const CareHomeWithPlan: S = { name: '37.1b · Saathi Care with a plan', render: () => <CustomerApp initial="care.home" state={withPlan} /> };
export const Physio: S = { name: '37.2 · Physiotherapy', render: () => <CustomerApp initial="care.physio" /> };
export const Plans: S = { name: '37.3 · Session plans', render: () => <CustomerApp initial="care.plans" state={physioDraft} /> };
export const Nurse: S = { name: '37.4 · Nurse care', render: () => <CustomerApp initial="care.nurse" /> };
export const NurseDaily: S = { name: '37.4b · Nurse by the day', render: () => <CustomerApp initial="care.nurse" state={nurseDraft} /> };
export const Procedures: S = { name: '37.5 · Short procedures', render: () => <CustomerApp initial="care.procedures" state={rxDraft} /> };
export const Prescription: S = { name: '37.6 · Prescription', render: () => <CustomerApp initial="care.prescription" state={rxDraft} /> };
export const Patient: S = { name: '37.7 · Patient details', render: () => <CustomerApp initial="care.patient" state={{ careFor: 'parent' }} /> };
export const Schedule: S = { name: '37.8 · Schedule', render: () => <CustomerApp initial="care.schedule" state={physioDraft} /> };
export const Confirm: S = { name: '37.9 · Confirm and pay', render: () => <CustomerApp initial="care.confirm" state={physioDraft} /> };
export const Plan: S = { name: '37.10 · My care plan', render: () => <CustomerApp initial="care.plan" state={withPlan} /> };
export const Notes: S = { name: '37.11 · Visit notes', render: () => <CustomerApp initial="care.notes" state={withPlan} /> };
