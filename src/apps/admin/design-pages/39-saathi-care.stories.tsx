import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AdminApp } from '../App';
import { adminPages } from '../navigation/pages';

/** Saathi Admin V2, design page 39: Saathi Care — care plans, prescriptions to review, clinical staff, incidents. */
const meta: Meta<typeof AdminApp> = {
  title: 'Admin panel/Design pages/V2/39 Saathi Care', tags: ['v2', 'design-page'],
  component: AdminApp,
  parameters: { layout: 'fullscreen' },
  args: { pages: adminPages },
};
export default meta;
type S = StoryObj<typeof AdminApp>;

export const Overview: S = { name: '39 Care overview', args: { initial: 'care' } };
export const Prescriptions: S = { name: '39 Prescriptions', args: { initial: 'care.prescriptions' } };
export const Plans: S = { name: '39 Care plans', args: { initial: 'care.plans' } };
export const PlanOpen: S = { name: '39 One care plan', args: { initial: 'care.plans', initialParams: { id: 'CP-2038' } } };
export const Staff: S = { name: '39 Clinical staff', args: { initial: 'care.staff' } };
export const Incidents: S = { name: '39 Incidents', args: { initial: 'care.incidents' } };
export const AsOperations: S = { name: '39 Care as Operations', args: { initial: 'care', session: { name: 'Ravi M.', face: 'rm', roles: ['Operations'], zones: ['South Delhi'] } } };
