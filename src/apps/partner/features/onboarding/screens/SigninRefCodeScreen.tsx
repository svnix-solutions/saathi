import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, H, Hr, Link, OtpInput, Page, Row, Screen, Spacer, T, Tag, useCountdown, useNav, useT } from '@/native/ui';
import { mmss } from '@/domain';
import { SignupSteps } from '../components/SignupSteps';
import { WrapBackHeader } from '../components/WrapBackHeader';
import { defaultReference2, refResendSeconds, sampleNames } from '../data';
import { useOnboardingState } from '../state';
import { localFirst, localName } from '../words';

/** Design pages 20–21 (section 48), screen 5 · Reference code. */
export function SigninRefCodeScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const ref = st.ref2 ?? defaultReference2;
  const first = ref.name.split(' ')[0];
  const firstL = localFirst(t, ref.name);
  const refName = localName(t, ref.name);
  const [code, setCode] = useState('71');
  const [ok, setOk] = useState(false);
  const [left, setLeft] = useCountdown(refResendSeconds);
  const confirm = () => {
    setOk(true);
    set({ refsConfirmed: true });
    nav.toast(t(`${first} confirmed`, `${firstL} की पुष्टि हुई`, `${firstL} ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ`));
    setTimeout(() => nav.push('signin.aadhaar'), 700);
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={3} label={false} />
        <WrapBackHeader title={`${t('Reference 2', 'पहचान 2', 'ਪਛਾਣ 2')} · ${refName}`} onBack={nav.back} />
        <H size={21}>{t(`Ask ${first} for the code`, `${firstL} से कोड पूछें`, `${firstL} ਤੋਂ ਕੋਡ ਪੁੱਛੋ`)}</H>
        <T m>{t(`We sent it by SMS to +91 ${ref.phone}, with your name in the message.`, `हमने +91 ${ref.phone} पर SMS भेजा है, उसमें आपका नाम है।`, `ਅਸੀਂ +91 ${ref.phone} ਉੱਤੇ SMS ਭੇਜਿਆ ਹੈ, ਉਸ ਵਿੱਚ ਤੁਹਾਡਾ ਨਾਂ ਹੈ।`)}</T>
        <OtpInput value={code} onChange={setCode} />
        <Row style={styles.wrap}>
          {left > 0 ? <T s m>{t('Send again in', 'फिर से भेजें', 'ਦੁਬਾਰਾ ਭੇਜੋ')} {mmss(left)}</T>
            : <Link onPress={() => { setLeft(refResendSeconds); nav.toast(t(`Code sent again to ${first}`, `${firstL} को कोड फिर भेजा`, `${firstL} ਨੂੰ ਕੋਡ ਦੁਬਾਰਾ ਭੇਜਿਆ`)); }}>{t('Send again', 'फिर से भेजें', 'ਦੁਬਾਰਾ ਭੇਜੋ')}</Link>}
          <Link onPress={nav.back}>{t('Change this number', 'यह नंबर बदलें', 'ਇਹ ਨੰਬਰ ਬਦਲੋ')}</Link>
        </Row>
        <Card style={styles.list}>
          <Row><T style={styles.fill}>{t('Reference 1', 'पहचान 1', 'ਪਛਾਣ 1')} · {t(...sampleNames.ref1)}</T><Tag tone="n">{t('Confirmed', 'पुष्टि हुई', 'ਪੁਸ਼ਟੀ ਹੋਈ')}</Tag></Row>
          <Hr />
          <Row>
            <T style={styles.fill}>{t('Reference 2', 'पहचान 2', 'ਪਛਾਣ 2')} · {refName}</T>
            {ok ? <Tag tone="n">{t('Confirmed', 'पुष्टि हुई', 'ਪੁਸ਼ਟੀ ਹੋਈ')}</Tag> : <Tag>{t('Waiting for code', 'कोड का इंतज़ार', 'ਕੋਡ ਦੀ ਉਡੀਕ')}</Tag>}
          </Row>
        </Card>
        <Spacer />
        <Button size="tall" disabled={code.length < 4 || ok} onPress={confirm}>{t('Confirm reference', 'पुष्टि करें', 'ਪੁਸ਼ਟੀ ਕਰੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninRefCodeScreen;

const styles = StyleSheet.create({
  list: { gap: 8 },
  fill: { flex: 1 },
  wrap: { flexWrap: 'wrap' },
});
