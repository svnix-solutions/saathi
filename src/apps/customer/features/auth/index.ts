import type { RouteMap } from '@/native/ui';
import { SigninPhoneScreen } from './screens/SigninPhoneScreen';
import { SigninOtpScreen } from './screens/SigninOtpScreen';
import { SigninNameScreen } from './screens/SigninNameScreen';
import { SigninAddressScreen } from './screens/SigninAddressScreen';

export { SigninPhoneScreen, SigninOtpScreen, SigninNameScreen, SigninAddressScreen };

/**
 * Auth feature — public API of this folder. Other features import only from here.
 * Routes: signin.phone, signin.otp, signin.name, signin.address
 */
export const routes: RouteMap = {
  'signin.phone': SigninPhoneScreen,
  'signin.otp': SigninOtpScreen,
  'signin.name': SigninNameScreen,
  'signin.address': SigninAddressScreen,
};
