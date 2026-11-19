/**
 * Saathi Care in the admin panel (design page 39): care plans, today's visits, prescriptions waiting for review,
 * clinical staff and incidents. Prices and the catalogue come from `@/domain` (care.ts); only the operations data
 * lives here. Admin is English only, so domain labels are read with `en()`.
 */
import { physioPlans, physioSpecialties, procedureById, nurseDaily, type PhysioSpecialty, type ProcedureId, type Words } from '@/domain';

/** English label of a domain `[en, hi, pa]` triple. */
export const en = (w: Words) => w[0];

/** The day the sample data is drawn for (same day as the Dashboard). */
export const TODAY = '2026-11-16';
export const TODAY_LABEL = 'Monday 16 November';
/** A licence or registration expiring sooner than this is flagged. */
export const EXPIRY_WARN_DAYS = 60;
/** A plan with this many missed sessions is at risk. */
export const AT_RISK_MISSED = 2;

const DAY = 86_400_000;
export const daysUntil = (iso: string) => Math.round((Date.parse(iso) - Date.parse(TODAY)) / DAY);
export const dateLabel = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
/** "Today", "Tomorrow", "Yesterday" or "18 Nov" for visits near today. */
export const dayLabel = (iso: string) => {
  const d = daysUntil(iso);
  if (d === 0) return 'Today';
  if (d === 1) return 'Tomorrow';
  if (d === -1) return 'Yesterday';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

/* ---------------- Doctors and clinical staff ---------------- */

export type Doctor = { id: string; name: string; field: string };
export const doctors: Doctor[] = [
  { id: 'dr-mehra', name: 'Dr. Anil Mehra', field: 'Orthopaedics' },
  { id: 'dr-kaur', name: 'Dr. Simran Kaur', field: 'General medicine' },
  { id: 'dr-rao', name: 'Dr. Vivek Rao', field: 'Neurology' },
];
export const doctorById = (id?: string) => doctors.find((d) => d.id === id);

export type StaffRole = 'physio' | 'nurse';
export type StaffStatus = 'active' | 'toVerify' | 'paused';
export type CareStaff = {
  id: string; name: string; initials: string; role: StaffRole; zone: string;
  council: string; regNo: string; expiry: string;
  specialisations: string[]; supervisor: string; rating?: number;
  /** booked hours / available hours this week, 0–100 */
  utilisation: number; status: StaffStatus; joined: string;
};

export const roleLabel: Record<StaffRole, string> = { physio: 'Physiotherapist', nurse: 'Nurse' };

export const initialStaff = (): CareStaff[] => [
  { id: 'kp', name: 'Kavita Pillai', initials: 'KP', role: 'physio', zone: 'South Delhi', council: 'Delhi Council for Physiotherapy', regNo: 'DCPT-2017-1182', expiry: '2027-08-31',
    specialisations: [en(physioSpecialties[0].name), en(physioSpecialties[1].name)], supervisor: 'dr-mehra', rating: 4.9, utilisation: 86, status: 'active', joined: 'Mar 2024' },
  { id: 'rs', name: 'Rahul Sethi', initials: 'RS', role: 'physio', zone: 'Gurugram', council: 'Haryana Physiotherapy Council', regNo: 'HPC-2019-0457', expiry: '2026-12-20',
    specialisations: [en(physioSpecialties[2].name), en(physioSpecialties[3].name)], supervisor: 'dr-rao', rating: 4.8, utilisation: 92, status: 'active', joined: 'Jul 2024' },
  { id: 'nb', name: 'Neha Bansal', initials: 'NB', role: 'physio', zone: 'Noida', council: 'UP State Physiotherapy Council', regNo: 'UPPC-2020-2210', expiry: '2028-02-28',
    specialisations: [en(physioSpecialties[4].name), en(physioSpecialties[7].name)], supervisor: 'dr-mehra', rating: 4.7, utilisation: 64, status: 'active', joined: 'Jan 2025' },
  { id: 'aj', name: 'Ankit Joshi', initials: 'AJ', role: 'physio', zone: 'South Delhi', council: 'Delhi Council for Physiotherapy', regNo: 'DCPT-2021-0934', expiry: '2027-04-30',
    specialisations: [en(physioSpecialties[5].name), en(physioSpecialties[6].name)], supervisor: 'dr-mehra', rating: 4.6, utilisation: 58, status: 'active', joined: 'Jun 2025' },
  { id: 'ms', name: 'Mary Samuel', initials: 'MS', role: 'nurse', zone: 'South Delhi', council: 'Delhi Nursing Council', regNo: 'DNC-2015-04417', expiry: '2027-03-31',
    specialisations: ['IV and injections', 'Wound care', 'Elder care'], supervisor: 'dr-kaur', rating: 4.9, utilisation: 94, status: 'active', joined: 'Feb 2024' },
  { id: 'pt', name: 'Pooja Thakur', initials: 'PT', role: 'nurse', zone: 'Gurugram', council: 'Haryana Nurses Registration Council', regNo: 'HNRC-2018-7731', expiry: '2026-12-05',
    specialisations: ['Catheter care', 'Post-surgery care'], supervisor: 'dr-kaur', rating: 4.8, utilisation: 81, status: 'active', joined: 'Apr 2024' },
  { id: 'sg', name: 'Sunil George', initials: 'SG', role: 'nurse', zone: 'Noida', council: 'UP Nurses and Midwives Council', regNo: 'UPNMC-2019-1176', expiry: '2027-09-30',
    specialisations: ['Live-in care', 'Nebulisation', 'Vitals'], supervisor: 'dr-kaur', rating: 4.7, utilisation: 100, status: 'active', joined: 'Aug 2024' },
  { id: 'rk', name: 'Ritu Kumari', initials: 'RK', role: 'nurse', zone: 'South Delhi', council: 'Delhi Nursing Council', regNo: 'DNC-2023-09912', expiry: '2026-11-30',
    specialisations: ['Injections', 'Vitals'], supervisor: 'dr-kaur', rating: 4.5, utilisation: 47, status: 'active', joined: 'Sep 2025' },
  { id: 'dm', name: 'Divya Menon', initials: 'DM', role: 'nurse', zone: 'Gurugram', council: 'Haryana Nurses Registration Council', regNo: 'HNRC-2024-1043', expiry: '2029-05-31',
    specialisations: ['Wound care', 'Elder care'], supervisor: 'dr-kaur', utilisation: 0, status: 'toVerify', joined: 'Nov 2026' },
];

/* ---------------- Care plans and their sessions ---------------- */

export type PlanKind = 'physio' | 'nurse';
export type PlanStatus = 'active' | 'paused' | 'completed';
export type SessionStatus = 'done' | 'missed' | 'skipped' | 'booked' | 'today';
export type CareSession = { n: number; date: string; time: string; status: SessionStatus; note?: string };

export type CarePlan = {
  id: string; patient: string; age: number; bookedBy: string; relation: string; zone: string;
  kind: PlanKind; specialty?: PhysioSpecialty; shift?: 'day12' | 'live24';
  /** what the plan is, e.g. "10 sessions" or "15 days" */
  total: number; staffId: string; status: PlanStatus; price: number; time: string;
  sessions: CareSession[];
};

const physioPrice = (n: number) => physioPlans.find((p) => p.sessions === n)?.price ?? 0;
const nursePrice = (shift: 'day12' | 'live24', days: number) => (nurseDaily.find((s) => s.id === shift)?.perDay ?? 0) * days;

/** Sessions of a plan: `done` before today (with the listed misses), today's slot, then booked. */
function sessionsOf(total: number, startOffset: number, time: string, missed: number[], skipped: number[] = [], everyDays = 2): CareSession[] {
  return Array.from({ length: total }, (_, i) => {
    const off = startOffset + i * everyDays;
    const date = new Date(Date.parse(TODAY) + off * DAY).toISOString().slice(0, 10);
    const n = i + 1;
    const status: SessionStatus = off < 0 ? (missed.includes(n) ? 'missed' : skipped.includes(n) ? 'skipped' : 'done') : off === 0 ? 'today' : 'booked';
    return { n, date, time, status };
  });
}

export const initialPlans = (): CarePlan[] => [
  { id: 'CP-2041', patient: 'Kamla Devi', age: 72, bookedBy: 'Rohan K.', relation: 'mother', zone: 'South Delhi', kind: 'physio', specialty: 'postSurgery', total: 10,
    staffId: 'kp', status: 'active', price: physioPrice(10), time: '10:30', sessions: sessionsOf(10, -8, '10:30', []) },
  { id: 'CP-2038', patient: 'Harbans Singh', age: 68, bookedBy: 'Gurpreet S.', relation: 'father', zone: 'Gurugram', kind: 'physio', specialty: 'neuro', total: 28,
    staffId: 'rs', status: 'active', price: physioPrice(28), time: '09:00', sessions: sessionsOf(28, -18, '09:00', [6, 8, 9]) },
  { id: 'CP-2044', patient: 'Meera Iyer', age: 34, bookedBy: 'Meera Iyer', relation: 'self', zone: 'Noida', kind: 'physio', specialty: 'sports', total: 6,
    staffId: 'nb', status: 'active', price: physioPrice(6), time: '18:00', sessions: sessionsOf(6, -3, '18:00', [2]) },
  { id: 'CP-2032', patient: 'Shanti Gupta', age: 81, bookedBy: 'Vikas G.', relation: 'mother', zone: 'South Delhi', kind: 'physio', specialty: 'elderly', total: 14,
    staffId: 'aj', status: 'active', price: physioPrice(14), time: '16:00', sessions: sessionsOf(14, -16, '16:00', [5, 7]) },
  { id: 'CP-2029', patient: 'Arjun Malhotra', age: 45, bookedBy: 'Arjun Malhotra', relation: 'self', zone: 'Gurugram', kind: 'physio', specialty: 'ortho', total: 10,
    staffId: 'rs', status: 'paused', price: physioPrice(10), time: '07:30', sessions: sessionsOf(10, -10, '07:30', [], [4]) },
  { id: 'CP-2019', patient: 'Leela Nair', age: 63, bookedBy: 'Anita N.', relation: 'mother', zone: 'Noida', kind: 'physio', specialty: 'ortho', total: 6,
    staffId: 'nb', status: 'completed', price: physioPrice(6), time: '11:00', sessions: sessionsOf(6, -14, '11:00', []) },
  { id: 'CN-1107', patient: 'Om Prakash Sharma', age: 79, bookedBy: 'Neha S.', relation: 'father', zone: 'South Delhi', kind: 'nurse', shift: 'day12', total: 15,
    staffId: 'ms', status: 'active', price: nursePrice('day12', 15), time: '08:00', sessions: sessionsOf(15, -6, '08:00', [], [], 1) },
  { id: 'CN-1111', patient: 'Baldev Raj', age: 84, bookedBy: 'Sunita R.', relation: 'father', zone: 'Noida', kind: 'nurse', shift: 'live24', total: 30,
    staffId: 'sg', status: 'active', price: nursePrice('live24', 30), time: '24 h', sessions: sessionsOf(30, -11, '24 h', [], [], 1) },
  { id: 'CN-1114', patient: 'Pushpa Arora', age: 76, bookedBy: 'Karan A.', relation: 'mother', zone: 'Gurugram', kind: 'nurse', shift: 'day12', total: 7,
    staffId: 'pt', status: 'active', price: nursePrice('day12', 7), time: '08:00', sessions: sessionsOf(7, -4, '08:00', [2, 3], [], 1) },
];

export const planWhat = (p: CarePlan) => p.kind === 'physio'
  ? `Physio · ${en(physioSpecialties.find((s) => s.id === p.specialty)?.name ?? physioSpecialties[0].name)}`
  : `Nurse · ${en(nurseDaily.find((s) => s.id === p.shift)?.name ?? nurseDaily[0].name)}`;
export const planUnit = (p: CarePlan) => (p.kind === 'physio' ? 'sessions' : 'days');
export const doneOf = (p: CarePlan) => p.sessions.filter((s) => s.status === 'done').length;
export const missedOf = (p: CarePlan) => p.sessions.filter((s) => s.status === 'missed').length;
export const nextOf = (p: CarePlan) => p.sessions.find((s) => s.status === 'today' || s.status === 'booked');
export const atRisk = (p: CarePlan) => p.status === 'active' && missedOf(p) >= AT_RISK_MISSED;

/* ---------------- Today's visits ---------------- */

export type VisitStatus = 'done' | 'inVisit' | 'onWay' | 'upcoming' | 'late' | 'missed';
export type CareVisit = { id: string; patient: string; what: string; staffId: string; time: string; status: VisitStatus; planId?: string; zone: string };

export const initialVisits = (): CareVisit[] => [
  { id: 'V-501', patient: 'Om Prakash Sharma', what: 'Nurse · 12-hour day', staffId: 'ms', time: '08:00', status: 'inVisit', planId: 'CN-1107', zone: 'South Delhi' },
  { id: 'V-502', patient: 'Pushpa Arora', what: 'Nurse · 12-hour day', staffId: 'pt', time: '08:00', status: 'late', planId: 'CN-1114', zone: 'Gurugram' },
  { id: 'V-503', patient: 'Harbans Singh', what: 'Physio · Stroke and nerves', staffId: 'rs', time: '09:00', status: 'done', planId: 'CP-2038', zone: 'Gurugram' },
  { id: 'V-504', patient: 'Kamla Devi', what: 'Physio · After surgery', staffId: 'kp', time: '10:30', status: 'onWay', planId: 'CP-2041', zone: 'South Delhi' },
  { id: 'V-505', patient: 'Rekha Bhatia', what: `${en(procedureById('injection').name)} (Rx)`, staffId: 'rk', time: '11:15', status: 'upcoming', zone: 'South Delhi' },
  { id: 'V-506', patient: 'Sanjay Kohli', what: en(procedureById('wound').name), staffId: 'pt', time: '13:00', status: 'upcoming', zone: 'Gurugram' },
  { id: 'V-507', patient: 'Shanti Gupta', what: 'Physio · Elder care', staffId: 'aj', time: '16:00', status: 'upcoming', planId: 'CP-2032', zone: 'South Delhi' },
  { id: 'V-508', patient: 'Farida Khan', what: `${en(procedureById('iv').name)} (Rx)`, staffId: 'ms', time: '19:30', status: 'upcoming', zone: 'South Delhi' },
];

export const visitStatus: Record<VisitStatus, { label: string; tone: 'y' | 'g' | 'n' | 'x' | 'r' }> = {
  done: { label: 'Done', tone: 'n' }, inVisit: { label: 'In visit', tone: 'g' }, onWay: { label: 'On the way', tone: 'g' },
  upcoming: { label: 'Booked', tone: 'x' }, late: { label: 'Running late', tone: 'r' }, missed: { label: 'Missed', tone: 'r' },
};

/* ---------------- Prescriptions ---------------- */

export type RxStatus = 'waiting' | 'approved' | 'rejected' | 'clearer';
export type Prescription = {
  id: string; patient: string; age: number; bookedBy: string; procedure: ProcedureId; medicine: string;
  doctor: string; clinic: string; regNo: string; written: string; slot: string; uploaded: string; status: RxStatus; reason?: string;
  /** what the photo shows, for the placeholder */
  photo: 'clear' | 'blurry' | 'cut';
};

export const initialRx = (): Prescription[] => [
  { id: 'RX-3301', patient: 'Rekha Bhatia', age: 58, bookedBy: 'Rekha Bhatia', procedure: 'injection', medicine: 'Inj. Vitamin B12 1500 mcg IM, once', doctor: 'Dr. P. Arora', clinic: 'Arora Clinic, Lajpat Nagar',
    regNo: 'DMC-48211', written: '2026-11-14', slot: 'Today 11:15', uploaded: '42 min ago', status: 'waiting', photo: 'clear' },
  { id: 'RX-3302', patient: 'Farida Khan', age: 66, bookedBy: 'Imran K.', procedure: 'iv', medicine: 'IV Ceftriaxone 1 g in 100 ml NS, twice a day, 5 days', doctor: 'Dr. S. Qureshi', clinic: 'City Care Hospital, Saket',
    regNo: 'DMC-39017', written: '2026-11-15', slot: 'Today 19:30', uploaded: '1 h ago', status: 'waiting', photo: 'clear' },
  { id: 'RX-3303', patient: 'Gopal Verma', age: 71, bookedBy: 'Ritika V.', procedure: 'injectionCourse', medicine: 'Inj. Enoxaparin 40 mg SC, daily, 7 days', doctor: 'Dr. M. Batra', clinic: 'Batra Ortho Centre, Gurugram',
    regNo: 'HMC-22104', written: '2026-11-13', slot: 'Tomorrow 09:00', uploaded: '2 h ago', status: 'waiting', photo: 'blurry' },
  { id: 'RX-3304', patient: 'Asha Rani', age: 80, bookedBy: 'Deepak R.', procedure: 'catheter', medicine: 'Foley catheter change, 16 Fr', doctor: 'Dr. K. Suri', clinic: 'Suri Nursing Home, Noida',
    regNo: 'UPMC-61830', written: '2026-10-02', slot: 'Tomorrow 12:00', uploaded: '3 h ago', status: 'waiting', photo: 'clear' },
  { id: 'RX-3305', patient: 'Tanvi Shah', age: 6, bookedBy: 'Nikhil S.', procedure: 'nebulise', medicine: 'Neb. Levosalbutamol 0.63 mg, three times a day', doctor: 'Dr. R. Menon', clinic: 'Little Steps Child Clinic, Noida',
    regNo: 'UPMC-70442', written: '2026-11-16', slot: 'Today 17:00', uploaded: '12 min ago', status: 'waiting', photo: 'cut' },
  { id: 'RX-3298', patient: 'Prem Lata', age: 74, bookedBy: 'Sachin L.', procedure: 'injection', medicine: 'Inj. Diclofenac 75 mg IM, once', doctor: 'Dr. A. Goel', clinic: 'Goel Clinic, Dwarka',
    regNo: 'DMC-27719', written: '2026-11-15', slot: 'Today 08:30', uploaded: 'Yesterday', status: 'approved', photo: 'clear' },
];

export const rxRejectReasons = [
  'Prescription is older than 30 days',
  'Medicine or dose not written clearly',
  'No doctor signature or registration number',
  'Name on prescription does not match patient',
  'Procedure not safe at home',
];
export const rxStatus: Record<RxStatus, { label: string; tone: 'y' | 'g' | 'n' | 'x' | 'r' }> = {
  waiting: { label: 'Waiting', tone: 'y' }, approved: { label: 'Approved', tone: 'n' }, rejected: { label: 'Rejected', tone: 'r' }, clearer: { label: 'Asked for photo', tone: 'x' },
};

/* ---------------- Incidents and doctor-review flags ---------------- */

export type Severity = 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'assigned' | 'resolved';
export type Incident = {
  id: string; kind: 'incident' | 'review'; title: string; note: string; patient: string; planId?: string;
  raisedBy: string; raised: string; severity: Severity; status: IncidentStatus; doctor?: string; resolution?: string;
  vitals?: string;
};

export const initialIncidents = (): Incident[] => [
  { id: 'IN-118', kind: 'review', title: 'BP high on two visits', note: 'BP 168/98 today and 162/96 on Saturday. Patient says headache since morning. Asked family to give evening dose on time.',
    patient: 'Om Prakash Sharma', planId: 'CN-1107', raisedBy: 'ms', raised: 'Today 09:40', severity: 'high', status: 'open', vitals: 'BP 168/98 · Pulse 88 · SpO2 96%' },
  { id: 'IN-117', kind: 'incident', title: 'Patient slipped during walking practice', note: 'Patient lost balance on the 3rd step, I held her, she sat down. No fall to the floor, no pain. Stopped the session early.',
    patient: 'Shanti Gupta', planId: 'CP-2032', raisedBy: 'aj', raised: 'Yesterday 16:40', severity: 'medium', status: 'assigned', doctor: 'dr-mehra' },
  { id: 'IN-116', kind: 'review', title: 'Wound red and warm around stitches', note: 'Redness 2 cm around the knee wound, warm to touch, small discharge. Dressing changed, photo in visit notes.',
    patient: 'Kamla Devi', planId: 'CP-2041', raisedBy: 'kp', raised: 'Yesterday 11:20', severity: 'high', status: 'open', vitals: 'Temp 99.4 °F' },
  { id: 'IN-115', kind: 'review', title: 'Sugar low before lunch', note: 'Fasting sugar 68 mg/dL, patient sweaty. Gave juice as per plan, rechecked 104 after 15 min.',
    patient: 'Baldev Raj', planId: 'CN-1111', raisedBy: 'sg', raised: '14 Nov 13:05', severity: 'medium', status: 'assigned', doctor: 'dr-kaur', vitals: 'Sugar 68 → 104 mg/dL' },
  { id: 'IN-112', kind: 'incident', title: 'Needle-stick injury to nurse', note: 'Small prick while capping the needle after an injection. Washed, reported at once, post-exposure check booked.',
    patient: 'Prem Lata', raisedBy: 'rk', raised: '12 Nov 09:10', severity: 'low', status: 'resolved', doctor: 'dr-kaur', resolution: 'Checked at clinic, no risk found. Retraining on safe capping done.' },
];

export const severityTone: Record<Severity, 'r' | 'y' | 'x'> = { high: 'r', medium: 'y', low: 'x' };
export const incidentStatus: Record<IncidentStatus, { label: string; tone: 'y' | 'g' | 'n' | 'x' | 'r' }> = {
  open: { label: 'Open', tone: 'r' }, assigned: { label: 'With doctor', tone: 'y' }, resolved: { label: 'Resolved', tone: 'n' },
};

/** Weekly missed sessions across all care plans, Monday first (last value is this week so far). */
export const MISSED_TREND = [6, 4, 5, 3, 4];
/** On-time arrivals over the last 7 days, share 0–1, for the KPI sparkline. */
export const ON_TIME_TREND = [0.86, 0.9, 0.88, 0.93, 0.91, 0.94, 0.92];
/** Active plans over the last 6 weeks, share of the top, for the sparkline. */
export const PLANS_TREND = [0.5, 0.58, 0.64, 0.7, 0.84, 1];
