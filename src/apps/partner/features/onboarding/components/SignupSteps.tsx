import React from 'react';
import { Steps, useT } from '@/native/ui';

/** The six-step sign-up bar, with "Sign-up · step n of 6" under it unless `label` is false. */
export function SignupSteps({ step, label = true }: { step: number; label?: boolean }) {
  const t = useT();
  return <Steps step={step} total={6} label={label ? t(`Sign-up · step ${step} of 6`, `साइन-अप · चरण ${step} / 6`) : undefined} />;
}

export default SignupSteps;
