/** Saathi Care rules that are not rendering: what a booking costs, how many visits it has and on which dates. */
import {
  INJECTION_COURSE_DAYS, NURSE_DAYS_OPTIONS, nurseDaily, nurseHourly, perSession, physioPlans, physioSpecialties, planSaving,
  PHYSIO_SESSION_PRICE, procedureById, type Mobility, type NurseShift, type PhysioSpecialty, type ProcedureId, type Relation, type Words,
} from '@/domain';
import { addDays, CARE_TODAY, iso, START_DAYS, weekdayOf } from './data';
import type { Gender } from './data';

export type CareKind = 'physio' | 'nurse' | 'procedure';
export type NurseMode = 'hourly' | 'daily';

export type CarePatient = { relation: Relation; name: string; age: string; gender: Gender; mobility: Mobility; notes: string; homePhone: string };

/** The care booking being built, from the Care home to Confirm. */
export type CareDraft = {
  kind: CareKind;
  specialty: PhysioSpecialty;
  /** physio plan size (one of `physioPlans`) */
  sessions: number;
  nurseMode: NurseMode;
  hours: number;
  shift: NurseShift;
  days: number;
  procedure: ProcedureId;
  /** injection course length */
  courseDays: number;
  rxPhoto: boolean;
  rxDoctor: string;
  patient?: CarePatient;
  /** index into `START_DAYS` */
  startDay: number;
  hour: number;
  /** physio plans: visit days, 0 = Monday */
  weekdays: number[];
};

export const DEFAULT_DRAFT: CareDraft = {
  kind: 'physio', specialty: 'ortho', sessions: 10, nurseMode: 'hourly', hours: 4, shift: 'day12', days: NURSE_DAYS_OPTIONS[0],
  procedure: 'injection', courseDays: 5, rxPhoto: false, rxDoctor: '', startDay: 0, hour: 10, weekdays: [0, 2, 4],
};

/** The sample patient, used when a screen is opened on its own. */
export const SAMPLE_PATIENT: CarePatient = {
  relation: 'parent', name: 'Kamla Devi', age: '68', gender: 'f', mobility: 'support', notes: 'Knee replacement 3 weeks ago', homePhone: '98110 22334',
};

export const physioPlan = (d: CareDraft) => physioPlans.find((p) => p.sessions === d.sessions) ?? physioPlans[0];
export const needsRx = (d: CareDraft) => d.kind === 'procedure' && procedureById(d.procedure).rx;
/** Physio plans with more than one session repeat on chosen weekdays. */
export const usesWeekdays = (d: CareDraft) => d.kind === 'physio' && d.sessions > 1;
/** Nurse by the day and the injection course run on back-to-back days. */
export const isDaily = (d: CareDraft) => (d.kind === 'nurse' && d.nurseMode === 'daily') || (d.kind === 'procedure' && d.procedure === 'injectionCourse');

export const visitCount = (d: CareDraft) => {
  if (d.kind === 'physio') return d.sessions;
  if (d.kind === 'nurse') return d.nurseMode === 'daily' ? d.days : 1;
  return d.procedure === 'injectionCourse' ? clampCourse(d.courseDays) : 1;
};
export const clampCourse = (n: number) => Math.min(INJECTION_COURSE_DAYS.max, Math.max(INJECTION_COURSE_DAYS.min, n));

/** Bill lines: what the customer pays, and what a plan saves against single visits. */
export const careBill = (d: CareDraft) => {
  if (d.kind === 'physio') {
    const p = physioPlan(d);
    return { list: d.sessions * PHYSIO_SESSION_PRICE, saving: planSaving(p), total: p.price, each: perSession(p) };
  }
  if (d.kind === 'nurse') {
    if (d.nurseMode === 'hourly') {
      const h = nurseHourly.find((x) => x.hours === d.hours) ?? nurseHourly[0];
      return { list: h.price, saving: 0, total: h.price, each: h.price };
    }
    const s = nurseDaily.find((x) => x.id === d.shift) ?? nurseDaily[0];
    return { list: s.perDay * d.days, saving: 0, total: s.perDay * d.days, each: s.perDay };
  }
  const p = procedureById(d.procedure);
  const n = visitCount(d);
  return { list: p.price * n, saving: 0, total: p.price * n, each: p.price };
};

/** The dates of every visit, booked up front. */
export const visitDates = (d: CareDraft): Date[] => {
  const start = START_DAYS[d.startDay] ?? START_DAYS[0];
  const n = visitCount(d);
  if (!usesWeekdays(d)) return Array.from({ length: isDaily(d) ? n : 1 }, (_, i) => addDays(start, i));
  const days = d.weekdays.length ? d.weekdays : DEFAULT_DRAFT.weekdays;
  const out: Date[] = [];
  for (let i = 0; out.length < n && i < 400; i++) { const x = addDays(start, i); if (days.includes(weekdayOf(x))) out.push(x); }
  return out;
};

/** Short name of what is booked: "10 physio sessions", "Nurse, 4 hours", "Injection course · 5 days". */
export const draftTitle = (d: CareDraft): Words => {
  if (d.kind === 'physio') {
    const n = d.sessions;
    return n === 1 ? ['1 physio session', '1 फ़िज़ियो सेशन', '1 ਫ਼ਿਜ਼ੀਓ ਸੈਸ਼ਨ'] : [`${n} physio sessions`, `${n} फ़िज़ियो सेशन`, `${n} ਫ਼ਿਜ਼ੀਓ ਸੈਸ਼ਨ`];
  }
  if (d.kind === 'nurse') {
    if (d.nurseMode === 'hourly') return [`Nurse at home, ${d.hours} hours`, `घर पर नर्स, ${d.hours} घंटे`, `ਘਰ ਤੇ ਨਰਸ, ${d.hours} ਘੰਟੇ`];
    const s = nurseDaily.find((x) => x.id === d.shift) ?? nurseDaily[0];
    return [`${s.name[0]} · ${d.days} days`, `${s.name[1]} · ${d.days} दिन`, `${s.name[2]} · ${d.days} ਦਿਨ`];
  }
  const p = procedureById(d.procedure);
  if (d.procedure !== 'injectionCourse') return p.name;
  const n = clampCourse(d.courseDays);
  return [`${p.name[0]} · ${n} days`, `${p.name[1]} · ${n} दिन`, `${p.name[2]} · ${n} ਦਿਨ`];
};
/** The line under the title: the physio problem, the shift, or the procedure. */
export const draftSub = (d: CareDraft): Words => {
  if (d.kind === 'physio') return (physioSpecialties.find((s) => s.id === d.specialty) ?? physioSpecialties[0]).name;
  if (d.kind === 'nurse') return d.nurseMode === 'hourly' ? ['One visit by a licensed nurse', 'लाइसेंस वाली नर्स की एक विज़िट', 'ਲਾਇਸੈਂਸ ਵਾਲੀ ਨਰਸ ਦੀ ਇੱਕ ਵਿਜ਼ਿਟ'] : (nurseDaily.find((x) => x.id === d.shift) ?? nurseDaily[0]).sub;
  return procedureById(d.procedure).sub;
};

/* ---------------- The booked plan ---------------- */

export type CareVisit = { date: string; hour: number; done?: boolean };
/** What Confirm writes and the plan page reads. */
export type CarePlan = {
  kind: CareKind;
  title: Words;
  sub: Words;
  patient: string;
  relation: Relation;
  visits: CareVisit[];
  total: number;
  /** the family doctor the notes are shared with */
  doctor: string;
  /** visits repeat on these weekdays (physio); empty for back-to-back days */
  weekdays: number[];
  skipped: number;
};

/** Build the plan from a confirmed draft. */
export const planFromDraft = (d: CareDraft, doctor: string): CarePlan => ({
  kind: d.kind, title: draftTitle(d), sub: draftSub(d), patient: d.patient?.name || SAMPLE_PATIENT.name, relation: d.patient?.relation ?? 'parent',
  visits: visitDates(d).map((x) => ({ date: iso(x), hour: d.hour })), total: careBill(d).total, doctor,
  weekdays: usesWeekdays(d) ? d.weekdays : [], skipped: 0,
});

/** The sample plan on the plan page when nothing is booked yet: 10 physio sessions, 3 done, Tue/Thu/Sat at 5 pm. */
export const SAMPLE_PLAN: CarePlan = {
  kind: 'physio', title: draftTitle(DEFAULT_DRAFT), sub: draftSub({ ...DEFAULT_DRAFT, specialty: 'postSurgery' }), patient: SAMPLE_PATIENT.name, relation: 'parent', total: physioPlan(DEFAULT_DRAFT).price,
  doctor: 'Dr. R. Malhotra', weekdays: [1, 3, 5], skipped: 0,
  visits: ['2026-11-12', '2026-11-14', '2026-11-17', '2026-11-19', '2026-11-21', '2026-11-24', '2026-11-26', '2026-11-28', '2026-12-01', '2026-12-03']
    .map((date, i) => ({ date, hour: 17, done: i < 3 })),
};

/** The date a skipped visit moves to: the next plan day after the last visit. */
export const nextPlanDate = (plan: CarePlan): string => {
  const last = plan.visits.reduce((m, v) => (v.date > m ? v.date : m), iso(CARE_TODAY));
  const [y, mo, da] = last.split('-').map(Number);
  const from = new Date(y, mo - 1, da);
  for (let i = 1; i < 14; i++) { const x = addDays(from, i); if (!plan.weekdays.length || plan.weekdays.includes(weekdayOf(x))) return iso(x); }
  return iso(addDays(from, 1));
};

/** The screens of the booking flow for this draft, in order. */
export const flowOf = (d: CareDraft): string[] => {
  const tail = ['care.patient', 'care.schedule', 'care.confirm'];
  if (d.kind === 'physio') return ['care.physio', 'care.plans', ...tail];
  if (d.kind === 'nurse') return ['care.nurse', ...tail];
  return needsRx(d) ? ['care.procedures', 'care.prescription', ...tail] : ['care.procedures', ...tail];
};
/** Where a screen sits in the flow: `<Steps {...stepOf(draft, 'care.patient')} />`. */
export const stepOf = (d: CareDraft, route: string) => {
  const f = flowOf(d);
  return { step: Math.max(1, f.indexOf(route) + 1), total: f.length };
};
