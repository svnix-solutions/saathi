/**
 * Care store: plans, visits, prescriptions, staff and incidents in one module store, so a prescription approved on
 * `care.prescriptions` lowers the sidebar badge and the overview KPI. Lives for the browser session.
 */
import { useSyncExternalStore } from 'react';
import {
  initialIncidents, initialPlans, initialRx, initialStaff, initialVisits,
  type CarePlan, type CareStaff, type CareVisit, type Incident, type Prescription,
} from './data';

export type CareState = { plans: CarePlan[]; visits: CareVisit[]; rx: Prescription[]; staff: CareStaff[]; incidents: Incident[] };

const initial = (): CareState => ({ plans: initialPlans(), visits: initialVisits(), rx: initialRx(), staff: initialStaff(), incidents: initialIncidents() });

let state: CareState = initial();
const subs = new Set<() => void>();
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };

export function updateCare(fn: (s: CareState) => CareState) { state = fn(state); subs.forEach((f) => f()); }
export function resetCare() { updateCare(() => initial()); }
export function useCare<T>(pick: (s: CareState) => T): T {
  return useSyncExternalStore(subscribe, () => pick(state), () => pick(state));
}

const patch = <K extends 'plans' | 'visits' | 'rx' | 'staff' | 'incidents'>(key: K, id: string, p: Partial<CareState[K][number]>) =>
  updateCare((s) => ({ ...s, [key]: (s[key] as { id: string }[]).map((x) => (x.id === id ? { ...x, ...p } : x)) }));

export const patchPlan = (id: string, p: Partial<CarePlan>) => patch('plans', id, p);
export const patchVisit = (id: string, p: Partial<CareVisit>) => patch('visits', id, p);
export const patchRx = (id: string, p: Partial<Prescription>) => patch('rx', id, p);
export const patchStaff = (id: string, p: Partial<CareStaff>) => patch('staff', id, p);
export const patchIncident = (id: string, p: Partial<Incident>) => patch('incidents', id, p);

/** Prescriptions waiting for review now (sidebar badge, overview KPI). */
export const rxWaiting = () => state.rx.filter((r) => r.status === 'waiting').length;
export const staffById = (id: string) => state.staff.find((s) => s.id === id);
