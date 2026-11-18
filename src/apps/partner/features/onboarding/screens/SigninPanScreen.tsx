import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Check, H, H2, Input, Link, Page, Screen, Sheet, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { DocPhotoTile } from '../components/DocPhotoTile';
import { SignupSteps } from '../components/SignupSteps';
import { sampleDetails, samplePan } from '../data';
import { cleanPan, isPan, needsCertificates } from '../signup';
import { useOnboardingState } from '../state';
import { localName } from '../words';

/** Design pages 20–21 (section 49), screen 7 · PAN upload. */
export function SigninPanScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useOnboardingState();
  const [photo, setPhoto] = useState(true);
  const [pan, setPan] = useState(samplePan);
  const [noPan, setNoPan] = useState(false);
  const valid = isPan(pan);
  const fullName = localName(t, st.fullName ?? sampleDetails.fullName);
  const next = needsCertificates(st) ? 'signin.documents' : 'signin.waiting';
  return (
    <Page>
      <Screen>
        <SignupSteps step={5} />
        <H size={21}>{t('PAN card', 'पैन कार्ड', 'ਪੈਨ ਕਾਰਡ')}</H>
        <DocPhotoTile added={photo} addedLabel={t('PAN photo added', 'पैन की फ़ोटो जुड़ी', 'ਪੈਨ ਦੀ ਫ਼ੋਟੋ ਜੁੜ ਗਈ')} addLabel={t('Add PAN photo', 'पैन की फ़ोटो जोड़ें', 'ਪੈਨ ਦੀ ਫ਼ੋਟੋ ਜੋੜੋ')} onPress={() => setPhoto(!photo)} />
        <H2>{t('PAN number', 'पैन नंबर', 'ਪੈਨ ਨੰਬਰ')}</H2>
        <Input value={pan} onChangeText={(v) => setPan(cleanPan(v))} placeholder={samplePan}
          style={valid || pan.length < 10 ? undefined : { borderColor: c.red }} />
        <Card sel row>
          <View style={styles.fill}><H2>{t('Name matches your Aadhaar', 'नाम आधार से मेल खाता है', 'ਨਾਂ ਆਧਾਰ ਨਾਲ ਮਿਲਦਾ ਹੈ')}</H2><T s m>{fullName}</T></View>
          <Check on size={22} />
        </Card>
        <T s m>{t('PAN is needed so your earnings and tax are recorded correctly.', 'पैन ज़रूरी है ताकि आपकी कमाई और टैक्स सही दर्ज हों।', 'ਪੈਨ ਜ਼ਰੂਰੀ ਹੈ ਤਾਂ ਜੋ ਤੁਹਾਡੀ ਕਮਾਈ ਅਤੇ ਟੈਕਸ ਸਹੀ ਦਰਜ ਹੋਣ।')}</T>
        <Link onPress={() => setNoPan(true)}>{t('I do not have a PAN card', 'मेरे पास पैन कार्ड नहीं है', 'ਮੇਰੇ ਕੋਲ ਪੈਨ ਕਾਰਡ ਨਹੀਂ ਹੈ')}</Link>
        <Spacer />
        <Button size="tall" disabled={!photo || !valid} onPress={() => { set({ pan }); nav.push(next); }}>
          {next === 'signin.waiting' ? t('Submit for checking', 'जाँच के लिए भेजें', 'ਜਾਂਚ ਲਈ ਭੇਜੋ') : t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}
        </Button>
      </Screen>
      <Sheet visible={noPan} onClose={() => setNoPan(false)}>
        <H2>{t('No PAN card?', 'पैन कार्ड नहीं है?', 'ਪੈਨ ਕਾਰਡ ਨਹੀਂ ਹੈ?')}</H2>
        <T s m>{t('You can apply for one free online in about 10 days. Until then our team fills Form 60 with you on a short call, and you can start work.', 'आप लगभग 10 दिन में ऑनलाइन मुफ़्त बनवा सकते हैं। तब तक हमारी टीम फ़ोन पर फ़ॉर्म 60 भरवाएगी और आप काम शुरू कर सकते हैं।', 'ਤੁਸੀਂ ਲਗਭਗ 10 ਦਿਨਾਂ ਵਿੱਚ ਆਨਲਾਈਨ ਮੁਫ਼ਤ ਬਣਵਾ ਸਕਦੇ ਹੋ। ਉਦੋਂ ਤੱਕ ਸਾਡੀ ਟੀਮ ਫ਼ੋਨ ਉੱਤੇ ਫ਼ਾਰਮ 60 ਭਰਵਾਏਗੀ ਅਤੇ ਤੁਸੀਂ ਕੰਮ ਸ਼ੁਰੂ ਕਰ ਸਕਦੇ ਹੋ।')}</T>
        <Button size="tall" onPress={() => { setNoPan(false); set({ pan: 'Form 60' }); nav.push(next); nav.toast(t('The team will call you about Form 60', 'टीम फ़ॉर्म 60 के लिए कॉल करेगी', 'ਟੀਮ ਫ਼ਾਰਮ 60 ਲਈ ਕਾਲ ਕਰੇਗੀ')); }}>
          {t('Continue without PAN', 'बिना पैन आगे बढ़ें', 'ਪੈਨ ਤੋਂ ਬਿਨਾਂ ਅੱਗੇ ਵਧੋ')}
        </Button>
        <Button variant="plain" onPress={() => setNoPan(false)}>{t('I will add it', 'मैं जोड़ूँगी', 'ਮੈਂ ਜੋੜਾਂਗੀ')}</Button>
      </Sheet>
    </Page>
  );
}

export default SigninPanScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
