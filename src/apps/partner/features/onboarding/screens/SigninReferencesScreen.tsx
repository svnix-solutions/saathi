import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Check, H, H2, Input, Lft, Page, Pill, Row, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { SignupSteps } from '../components/SignupSteps';
import { defaultReference2, firstReferencePhone, referenceRelations, sampleNames } from '../data';
import { digits, fmtPhone } from '../signup';
import { useOnboardingState } from '../state';
import { localFirst } from '../words';

/** Design pages 20–21 (section 48), screen 4 · Two references. */
export function SigninReferencesScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useOnboardingState();
  const [name, setName] = useState(st.ref2?.name ?? defaultReference2.name);
  const [phone, setPhone] = useState(st.ref2?.phone ?? defaultReference2.phone);
  const [rel, setRel] = useState(st.ref2?.rel ?? defaultReference2.rel);
  const first = name.trim().split(' ')[0] || t('reference', 'उन्हें', 'ਉਨ੍ਹਾਂ');
  const firstL = name.trim() ? localFirst(t, name.trim()) : first;
  const send = () => {
    if (name.trim().length < 2) return nav.toast(t('Write the name of reference 2', 'दूसरे व्यक्ति का नाम लिखें', 'ਦੂਜੇ ਵਿਅਕਤੀ ਦਾ ਨਾਂ ਲਿਖੋ'));
    if (digits(phone).length !== 10) return nav.toast(t('Phone number needs 10 digits', 'फ़ोन नंबर 10 अंकों का हो', 'ਫ਼ੋਨ ਨੰਬਰ 10 ਅੰਕਾਂ ਦਾ ਹੋਵੇ'));
    if (digits(phone) === digits(st.phone) || digits(phone) === firstReferencePhone) return nav.toast(t('Each number must be different from yours', 'हर नंबर आपके नंबर से अलग हो', 'ਹਰ ਨੰਬਰ ਤੁਹਾਡੇ ਨੰਬਰ ਤੋਂ ਵੱਖਰਾ ਹੋਵੇ'));
    set({ ref2: { name: name.trim(), phone, rel } });
    nav.push('signin.refCode');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={3} />
        <H size={21}>{t('Two people who know you', 'दो लोग जो आपको जानते हैं', 'ਦੋ ਲੋਕ ਜੋ ਤੁਹਾਨੂੰ ਜਾਣਦੇ ਹਨ')}</H>
        <T s m>{t('We send each of them a code on their own phone. Ask them for it to confirm.', 'हम दोनों के फ़ोन पर एक कोड भेजते हैं। पुष्टि के लिए उनसे कोड पूछें।', 'ਅਸੀਂ ਦੋਵਾਂ ਦੇ ਫ਼ੋਨ ਉੱਤੇ ਇੱਕ ਕੋਡ ਭੇਜਦੇ ਹਾਂ। ਪੁਸ਼ਟੀ ਲਈ ਉਨ੍ਹਾਂ ਤੋਂ ਕੋਡ ਪੁੱਛੋ।')}</T>
        <Card sel>
          <Row style={styles.top}>
            <View style={styles.fill}><H2>{t('Reference 1', 'पहचान 1', 'ਪਛਾਣ 1')} · {t(...sampleNames.ref1)}</H2><T s m>+91 98220 14567 · {t('neighbour', 'पड़ोसी', 'ਗੁਆਂਢੀ')}</T></View>
            <Check on size={22} />
          </Row>
          <T s b color={c.accent} style={{ marginTop: 6 }}>{t('Confirmed by code', 'कोड से पुष्टि हुई', 'ਕੋਡ ਨਾਲ ਪੁਸ਼ਟੀ ਹੋਈ')}</T>
        </Card>
        <Card>
          <H2>{t('Reference 2', 'पहचान 2', 'ਪਛਾਣ 2')}</H2>
          <Input small value={name} onChangeText={setName} placeholder={t('Full name', 'पूरा नाम', 'ਪੂਰਾ ਨਾਂ')} style={{ paddingVertical: 9, marginTop: 6 }} />
          <Input small prefix="+91" value={phone} onChangeText={(v) => setPhone(fmtPhone(v))} keyboardType="phone-pad" placeholder="98765 43210" style={{ paddingVertical: 9, marginTop: 6 }} />
          <Lft gap={6} style={{ marginTop: 8, flexWrap: 'wrap' }}>
            {referenceRelations.map((r) => (
              <Pill key={r.en} s sel={rel === r.en} onPress={() => setRel(r.en)} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>{t(r.en, r.hi, r.pa)}</Pill>
            ))}
          </Lft>
        </Card>
        <Spacer />
        <Button size="tall" onPress={send}>{t(`Send code to ${first}`, `${firstL} को कोड भेजें`, `${firstL} ਨੂੰ ਕੋਡ ਭੇਜੋ`)}</Button>
      </Screen>
    </Page>
  );
}

export default SigninReferencesScreen;

const styles = StyleSheet.create({
  top: { alignItems: 'flex-start' },
  fill: { flex: 1 },
});
