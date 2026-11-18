import React, { useState } from 'react';
import { BackHeader, Button, Card, H, H2, Link, OtpInput, Page, Screen, Spacer, T, useCountdown, useNav, useT, useTheme } from '@/native/ui';
import { mmss } from '@/domain';
import { otpResendSeconds, prototypeOtp, samplePhone } from '../data';
import { useOnboardingState } from '../state';
import { localName } from '../words';

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
    if (st.approved) { nav.reset('home'); nav.toast(t(`Welcome back, ${st.name}`, `वापसी पर स्वागत, ${localName(t, st.name)}`, `ਜੀ ਆਇਆਂ ਨੂੰ, ${localName(t, st.name)}`)); }
    else nav.push('signin.details');
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Change number', 'नंबर बदलें', 'ਨੰਬਰ ਬਦਲੋ')} onBack={nav.back} />
        <H size={21}>{t('Enter the code', 'कोड डालें', 'ਕੋਡ ਪਾਓ')}</H>
        <T m>{t('Sent by SMS to', 'SMS भेजा गया', 'SMS ਭੇਜਿਆ ਗਿਆ')} +91 {st.phone || samplePhone}</T>
        <OtpInput value={code} error={err} onChange={(v) => { setCode(v); setErr(false); }} />
        {err ? <T s color={c.red} b>{t('Wrong code. Check the SMS and try again.', 'कोड गलत है। SMS देखकर फिर से डालें।', 'ਕੋਡ ਗਲਤ ਹੈ। SMS ਵੇਖ ਕੇ ਦੁਬਾਰਾ ਪਾਓ।')}</T>
          : left > 0 ? <T s m>{t('Resend code in', 'कोड फिर से भेजें', 'ਕੋਡ ਦੁਬਾਰਾ ਭੇਜੋ')} {mmss(left)}</T>
            : <Link onPress={() => { setLeft(otpResendSeconds); nav.toast(t('New code sent', 'नया कोड भेजा', 'ਨਵਾਂ ਕੋਡ ਭੇਜਿਆ')); }}>{t('Resend code', 'कोड फिर से भेजें', 'ਕੋਡ ਦੁਬਾਰਾ ਭੇਜੋ')}</Link>}
        <Card sel={st.approved}>
          <H2>{t('Already a partner?', 'पहले से पार्टनर हैं?', 'ਪਹਿਲਾਂ ਤੋਂ ਪਾਰਟਨਰ ਹੋ?')}</H2>
          <T s m>{t('You go straight to Home and your jobs.', 'आप सीधे होम और अपने काम पर जाएँगे।', 'ਤੁਸੀਂ ਸਿੱਧੇ ਹੋਮ ਅਤੇ ਆਪਣੇ ਕੰਮਾਂ ਉੱਤੇ ਜਾਓਗੇ।')}</T>
        </Card>
        <Card sel={!st.approved}>
          <H2>{t('New here?', 'नए हैं?', 'ਨਵੇਂ ਹੋ?')}</H2>
          <T s m>{t('Next we ask for your details, the work you do, two references, Aadhaar and PAN, and any certificate your work needs. About 7 minutes.', 'आगे आपकी जानकारी, आपका काम, दो जान-पहचान वाले, आधार और पैन, और आपके काम का कोई सर्टिफ़िकेट माँगेंगे। लगभग 7 मिनट।', 'ਅੱਗੇ ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ, ਤੁਹਾਡਾ ਕੰਮ, ਦੋ ਜਾਣ-ਪਛਾਣ ਵਾਲੇ, ਆਧਾਰ ਅਤੇ ਪੈਨ, ਅਤੇ ਤੁਹਾਡੇ ਕੰਮ ਦਾ ਕੋਈ ਸਰਟੀਫ਼ਿਕੇਟ ਮੰਗਾਂਗੇ। ਲਗਭਗ 7 ਮਿੰਟ।')}</T>
        </Card>
        <T s m>{t('Prototype: the code is 4821', 'प्रोटोटाइप: कोड 4821 है', 'ਪ੍ਰੋਟੋਟਾਈਪ: ਕੋਡ 4821 ਹੈ')}</T>
        <Spacer />
        <Button size="tall" disabled={code.length < 4} onPress={verify}>{t('Verify', 'जाँचें', 'ਜਾਂਚੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninOtpScreen;
