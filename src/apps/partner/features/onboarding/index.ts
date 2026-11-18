import type { RouteMap } from '@/native/ui';
import { SigninAadhaarScreen } from './screens/SigninAadhaarScreen';
import { SigninDetailsScreen } from './screens/SigninDetailsScreen';
import { SigninDocUploadScreen } from './screens/SigninDocUploadScreen';
import { SigninDocumentsScreen } from './screens/SigninDocumentsScreen';
import { SigninOtpScreen } from './screens/SigninOtpScreen';
import { SigninPanScreen } from './screens/SigninPanScreen';
import { SigninPhoneScreen } from './screens/SigninPhoneScreen';
import { SigninRefCodeScreen } from './screens/SigninRefCodeScreen';
import { SigninReferencesScreen } from './screens/SigninReferencesScreen';
import { SigninSkillsScreen } from './screens/SigninSkillsScreen';
import { SigninSpecializationsScreen } from './screens/SigninSpecializationsScreen';
import { SigninWaitingScreen } from './screens/SigninWaitingScreen';
import { SigninWorkScreen } from './screens/SigninWorkScreen';

export {
  SigninAadhaarScreen, SigninDetailsScreen, SigninDocUploadScreen, SigninDocumentsScreen, SigninOtpScreen, SigninPanScreen,
  SigninPhoneScreen, SigninRefCodeScreen, SigninReferencesScreen, SigninSkillsScreen, SigninSpecializationsScreen,
  SigninWaitingScreen, SigninWorkScreen,
};
export { isEmail, needsCertificates } from './signup';
export type { OnboardingState } from './state';

/**
 * Onboarding feature — public API of this folder. Other features import only from here.
 * Routes: signin.phone, signin.otp, signin.details, signin.references, signin.refCode, signin.aadhaar, signin.pan, signin.waiting, signin.work, signin.specializations, signin.skills, signin.documents, signin.docUpload
 */
export const routes: RouteMap = {
  'signin.phone': SigninPhoneScreen, 'signin.otp': SigninOtpScreen, 'signin.details': SigninDetailsScreen,
  'signin.references': SigninReferencesScreen, 'signin.refCode': SigninRefCodeScreen, 'signin.aadhaar': SigninAadhaarScreen,
  'signin.pan': SigninPanScreen, 'signin.waiting': SigninWaitingScreen, 'signin.work': SigninWorkScreen,
  'signin.specializations': SigninSpecializationsScreen, 'signin.skills': SigninSkillsScreen,
  'signin.documents': SigninDocumentsScreen, 'signin.docUpload': SigninDocUploadScreen,
};
