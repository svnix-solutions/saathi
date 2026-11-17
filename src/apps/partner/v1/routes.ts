import type { RouteMap } from '@/native/nav';
import { withLang } from './kit';
import { SigninAadhaar, SigninDetails, SigninOtp, SigninPan, SigninPhone, SigninRefCode, SigninReferences, SigninWaiting } from './signin';
import { Earnings, Home, JobRequest, Jobs, OnJob } from './jobs';
import { Help, Hours, IdCard, Joining } from './joining';
import { CheckIn, CheckOut, Live, Selfie } from './checkin';
import { Cancelled, LocationOff, NoJobs, Offline } from './errors';
import { Alerts, Bank, Profile } from './account';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
const raw: RouteMap = {
  'signin.phone': SigninPhone, 'signin.otp': SigninOtp, 'signin.details': SigninDetails, 'signin.references': SigninReferences,
  'signin.refCode': SigninRefCode, 'signin.aadhaar': SigninAadhaar, 'signin.pan': SigninPan, 'signin.waiting': SigninWaiting,
  home: Home, jobRequest: JobRequest, onJob: OnJob, earnings: Earnings, jobs: Jobs,
  joining: Joining, hours: Hours, idCard: IdCard, help: Help,
  checkIn: CheckIn, selfie: Selfie, live: Live, checkOut: CheckOut,
  'err.noJobs': NoJobs, 'err.offline': Offline, 'err.cancelled': Cancelled, 'err.locationOff': LocationOff,
  profile: Profile, bank: Bank, alerts: Alerts,
};

/** Each screen re-reads the language picked inside the app (st.locale). */
export const routes: RouteMap = Object.fromEntries(Object.entries(raw).map(([k, C]) => [k, withLang(C)]));
