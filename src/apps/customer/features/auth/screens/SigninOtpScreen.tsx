/** Design page 02 · Sign in and registration — screen 2 · SMS code. */
import React from 'react';
import { Pressable } from 'react-native';
import { BackHeader, Button, Card, H, Lft, OtpInput, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { clock } from '@/domain';
import { useCustomerState } from '../../../state';
import { useOtp } from '../hooks/useOtp';

export function SigninOtpScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const otp = useOtp();

  const verify = (v?: string) => {
    if (!otp.check(v)) return;
    if (st.signedIn) { set({ signedIn: true }); nav.reset('home'); nav.toast(t('Welcome back', 'फिर से स्वागत है', 'ਫਿਰ ਤੋਂ ਜੀ ਆਇਆਂ ਨੂੰ')); }
    else nav.push('signin.name');
  };

  const resend = () => { otp.resend(); nav.toast(t('New code sent', 'नया कोड भेजा गया', 'ਨਵਾਂ ਕੋਡ ਭੇਜ ਦਿੱਤਾ')); };

  return (
    <Screen>
      <BackHeader title={t('Change number', 'नंबर बदलें', 'ਨੰਬਰ ਬਦਲੋ')} onBack={nav.back} />
      <H size={22}>{t('Enter the code', 'कोड डालें', 'ਕੋਡ ਪਾਓ')}</H>
      <T m>{t(`Sent by SMS to +91 ${st.phone}. It works for 5 minutes.`, `+91 ${st.phone} पर SMS से भेजा गया। यह 5 मिनट तक चलेगा।`, `+91 ${st.phone} ਤੇ SMS ਰਾਹੀਂ ਭੇਜਿਆ। ਇਹ 5 ਮਿੰਟ ਤੱਕ ਚੱਲੇਗਾ।`)}</T>
      <OtpInput value={otp.code} error={otp.wrong} onChange={(v) => { otp.type(v); if (v.length === 4) verify(v); }} />
      {otp.left > 0 ? (
        <T s m>{t(`Resend code in ${clock(otp.left)} · the code fills in by itself from the SMS`, `${clock(otp.left)} में दोबारा कोड · SMS से कोड अपने आप भर जाएगा`, `${clock(otp.left)} ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਡ · SMS ਤੋਂ ਕੋਡ ਆਪਣੇ ਆਪ ਭਰ ਜਾਵੇਗਾ`)}</T>
      ) : (
        <Lft gap={4}>
          <T s m>{t('Did not get it?', 'कोड नहीं मिला?', 'ਕੋਡ ਨਹੀਂ ਮਿਲਿਆ?')}</T>
          <Pressable onPress={resend} accessibilityRole="button">
            <T s b color={c.accent}>{t('Resend code', 'कोड दोबारा भेजें', 'ਕੋਡ ਦੁਬਾਰਾ ਭੇਜੋ')}</T>
          </Pressable>
        </Lft>
      )}
      {otp.wrong && (
        <Card tone="red">
          <T s color={c.red}>
            {otp.tries > 0 ? (
              <><T s b color={c.red}>{t('That code is not right.', 'यह कोड सही नहीं है।', 'ਇਹ ਕੋਡ ਸਹੀ ਨਹੀਂ ਹੈ।')}</T> {t(`${otp.tries} tries left, then ask for a new code.`, `${otp.tries} कोशिश बाकी, फिर नया कोड माँगें।`, `${otp.tries} ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ, ਫਿਰ ਨਵਾਂ ਕੋਡ ਮੰਗੋ।`)}</>
            ) : (
              <><T s b color={c.red}>{t('No tries left.', 'कोई कोशिश बाकी नहीं।', 'ਕੋਈ ਕੋਸ਼ਿਸ਼ ਬਾਕੀ ਨਹੀਂ।')}</T> {t('Ask for a new code when the timer ends.', 'टाइमर खत्म होने पर नया कोड माँगें।', 'ਟਾਈਮਰ ਖ਼ਤਮ ਹੋਣ ਤੇ ਨਵਾਂ ਕੋਡ ਮੰਗੋ।')}</>
            )}
          </T>
        </Card>
      )}
      <Spacer />
      <Button disabled={!otp.ready} onPress={() => verify()}>{t('Verify and continue', 'जाँचें और आगे बढ़ें', 'ਜਾਂਚੋ ਅਤੇ ਅੱਗੇ ਵਧੋ')}</Button>
    </Screen>
  );
}

export default SigninOtpScreen;
