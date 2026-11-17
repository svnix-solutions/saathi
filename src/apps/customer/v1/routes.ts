import type { RouteMap } from '@/native/nav';
import { SigninAddress, SigninName, SigninOtp, SigninPhone } from './signin';
import { Chores, Confirm, Home, Time } from './booking';
import { Bookings, InProgress, Rate, Tracking } from './visit';
import { FinishCodes, NotHappy } from './codes';
import { Addresses, ChangeBooking, Help } from './manage';
import { ErrNoHelper, ErrOffline, ErrOutsideArea, ErrPaymentFailed } from './errors';
import { Account, AlertSettings, DeleteAccount, PaymentMethods } from './account';

/** Screens owned by this area. Keys are the shared route names listed in ../ROUTES.md. */
export const routes: RouteMap = {
  'signin.phone': SigninPhone,
  'signin.otp': SigninOtp,
  'signin.name': SigninName,
  'signin.address': SigninAddress,
  home: Home,
  chores: Chores,
  time: Time,
  confirm: Confirm,
  tracking: Tracking,
  inProgress: InProgress,
  'visit.finish': FinishCodes,
  'visit.notHappy': NotHappy,
  rate: Rate,
  bookings: Bookings,
  addresses: Addresses,
  changeBooking: ChangeBooking,
  help: Help,
  'err.noHelper': ErrNoHelper,
  'err.offline': ErrOffline,
  'err.paymentFailed': ErrPaymentFailed,
  'err.outsideArea': ErrOutsideArea,
  account: Account,
  paymentMethods: PaymentMethods,
  alertSettings: AlertSettings,
  deleteAccount: DeleteAccount,
};
