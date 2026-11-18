import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BackHeader, Button, Card, H, Hr, Link, OtpInput, Page, Row, Screen, Spacer, T, Tag, useCountdown, useNav, useT } from '@/native/ui';
import { mmss } from '@/domain';
import { SignupSteps } from '../components/SignupSteps';
import { defaultReference2, refResendSeconds } from '../data';
import { useOnboardingState } from '../state';

/** Design pages 20–21 (section 48), screen 5 · Reference code. */
export function SigninRefCodeScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const ref = st.ref2 ?? defaultReference2;
  const first = ref.name.split(' ')[0];
  const [code, setCode] = useState('71');
  const [ok, setOk] = useState(false);
  const [left, setLeft] = useCountdown(refResendSeconds);
  const confirm = () => {
    setOk(true);
    set({ refsConfirmed: true });
    nav.toast(t(`${first} confirmed`, `${first} की पुष्टि हुई`));
    setTimeout(() => nav.push('signin.aadhaar'), 700);
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={3} label={false} />
        <BackHeader title={`${t('Reference 2', 'पहचान 2')} · ${ref.name}`} onBack={nav.back} />
        <H size={21}>{t(`Ask ${first} for the code`, `${first} से कोड पूछें`)}</H>
        <T m>{t(`We sent it by SMS to +91 ${ref.phone}, with your name in the message.`, `हमने +91 ${ref.phone} पर SMS भेजा है, उसमें आपका नाम है।`)}</T>
        <OtpInput value={code} onChange={setCode} />
        <Row>
          {left > 0 ? <T s m>{t('Send again in', 'फिर से भेजें')} {mmss(left)}</T>
            : <Link onPress={() => { setLeft(refResendSeconds); nav.toast(t(`Code sent again to ${first}`, `${first} को कोड फिर भेजा`)); }}>{t('Send again', 'फिर से भेजें')}</Link>}
          <Link onPress={nav.back}>{t('Change this number', 'यह नंबर बदलें')}</Link>
        </Row>
        <Card style={styles.list}>
          <Row><T style={styles.fill}>{t('Reference 1', 'पहचान 1')} · Kamla Devi</T><Tag tone="n">{t('Confirmed', 'पुष्टि हुई')}</Tag></Row>
          <Hr />
          <Row>
            <T style={styles.fill}>{t('Reference 2', 'पहचान 2')} · {ref.name}</T>
            {ok ? <Tag tone="n">{t('Confirmed', 'पुष्टि हुई')}</Tag> : <Tag>{t('Waiting for code', 'कोड का इंतज़ार')}</Tag>}
          </Row>
        </Card>
        <Spacer />
        <Button size="tall" disabled={code.length < 4 || ok} onPress={confirm}>{t('Confirm reference', 'पुष्टि करें')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninRefCodeScreen;

const styles = StyleSheet.create({
  list: { gap: 8 },
  fill: { flex: 1 },
});
