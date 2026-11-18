import React, { useState } from 'react';
import { BackHeader, Button, Card, H, H2, Link, OtpInput, Page, Screen, Spacer, T, useCountdown, useNav, useT, useTheme } from '@/native/ui';
import { mmss } from '@/domain';
import { otpResendSeconds, prototypeOtp, samplePhone } from '../data';
import { useOnboardingState } from '../state';

/** Design pages 20–21 (section 48), screen 2 · SMS code (4821 is correct). */
export function SigninOtpScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useOnboardingState();
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  const { c } = useTheme();
  const [left, setLeft] = useCountdown(otpResendSeconds);
  const verify = () => {
    if (code !== prototypeOtp) { setErr(true); return; }
    if (st.approved) { nav.reset('home'); nav.toast(t(`Welcome back, ${st.name}`, `वापसी पर स्वागत, ${st.name}`)); }
    else nav.push('signin.details');
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Change number', 'नंबर बदलें')} onBack={nav.back} />
        <H size={21}>{t('Enter the code', 'कोड डालें')}</H>
        <T m>{t('Sent by SMS to', 'SMS भेजा गया')} +91 {st.phone || samplePhone}</T>
        <OtpInput value={code} error={err} onChange={(v) => { setCode(v); setErr(false); }} />
        {err ? <T s color={c.red} b>{t('Wrong code. Check the SMS and try again.', 'कोड गलत है। SMS देखकर फिर से डालें।')}</T>
          : left > 0 ? <T s m>{t('Resend code in', 'कोड फिर से भेजें')} {mmss(left)}</T>
            : <Link onPress={() => { setLeft(otpResendSeconds); nav.toast(t('New code sent', 'नया कोड भेजा')); }}>{t('Resend code', 'कोड फिर से भेजें')}</Link>}
        <Card sel={st.approved}>
          <H2>{t('Already a partner?', 'पहले से पार्टनर हैं?')}</H2>
          <T s m>{t('You go straight to Home and your jobs.', 'आप सीधे होम और अपने काम पर जाएँगे।')}</T>
        </Card>
        <Card sel={!st.approved}>
          <H2>{t('New here?', 'नए हैं?')}</H2>
          <T s m>{t('Next we ask for your details, the work you do, two references, Aadhaar and PAN, and any certificate your work needs. About 7 minutes.', 'आगे आपकी जानकारी, आपका काम, दो जान-पहचान वाले, आधार और पैन, और आपके काम का कोई सर्टिफ़िकेट माँगेंगे। लगभग 7 मिनट।')}</T>
        </Card>
        <T s m>{t('Prototype: the code is 4821', 'प्रोटोटाइप: कोड 4821 है')}</T>
        <Spacer />
        <Button size="tall" disabled={code.length < 4} onPress={verify}>{t('Verify', 'जाँचें')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninOtpScreen;
