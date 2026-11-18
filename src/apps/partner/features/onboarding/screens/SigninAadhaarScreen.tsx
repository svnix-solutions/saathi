import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, CheckRow, Grid, H, H2, Input, Page, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { DocPhotoTile } from '../components/DocPhotoTile';
import { SignupSteps } from '../components/SignupSteps';
import { maskedAadhaar } from '../data';
import { digits, fmtAadhaar } from '../signup';
import { useOnboardingState } from '../state';

/** Design pages 20–21 (section 49), screen 6 · Aadhaar upload. */
export function SigninAadhaarScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useOnboardingState();
  const { c } = useTheme();
  const [front, setFront] = useState(true);
  const [back, setBack] = useState(false);
  const [num, setNum] = useState('');
  const [clear, setClear] = useState(true);
  const [corners, setCorners] = useState(true);
  const numOk = num === '' || digits(num).length === 12;
  const ready = front && back && clear && corners && numOk;
  return (
    <Page>
      <Screen>
        <SignupSteps step={4} />
        <H size={21}>{t('Aadhaar card', 'आधार कार्ड', 'ਆਧਾਰ ਕਾਰਡ')}</H>
        <Grid cols={2}>
          <DocPhotoTile added={front} addedLabel={t('Front added', 'आगे का हिस्सा जुड़ा', 'ਅਗਲਾ ਪਾਸਾ ਜੁੜ ਗਿਆ')} addLabel={t('Add front side', 'आगे का हिस्सा जोड़ें', 'ਅਗਲਾ ਪਾਸਾ ਜੋੜੋ')}
            onPress={() => { setFront(!front); }} />
          <DocPhotoTile added={back} addedLabel={t('Back added', 'पीछे का हिस्सा जुड़ा', 'ਪਿਛਲਾ ਪਾਸਾ ਜੁੜ ਗਿਆ')} addLabel={t('Add back side', 'पीछे का हिस्सा जोड़ें', 'ਪਿਛਲਾ ਪਾਸਾ ਜੋੜੋ')}
            onPress={() => { setBack(!back); if (!back) nav.toast(t('Photo added', 'फ़ोटो जुड़ गई', 'ਫ਼ੋਟੋ ਜੁੜ ਗਈ')); }} />
        </Grid>
        <H2>{t('Aadhaar number', 'आधार नंबर', 'ਆਧਾਰ ਨੰਬਰ')}</H2>
        <Input value={num} onChangeText={(v) => setNum(fmtAadhaar(v))} keyboardType="number-pad"
          placeholder={maskedAadhaar} style={numOk ? undefined : { borderColor: c.red }} />
        <Card style={styles.checks}>
          <CheckRow s on={clear} onPress={() => setClear(!clear)} label={t('Photo is clear, not blurred', 'फ़ोटो साफ़ है, धुंधली नहीं', 'ਫ਼ੋਟੋ ਸਾਫ਼ ਹੈ, ਧੁੰਦਲੀ ਨਹੀਂ')} />
          <CheckRow s on={corners} onPress={() => setCorners(!corners)} label={t('All four corners are visible', 'चारों कोने दिख रहे हैं', 'ਚਾਰੇ ਕੋਨੇ ਦਿਸ ਰਹੇ ਹਨ')} />
        </Card>
        <T s m>{t('Only the last 4 digits are shown and kept. The photo is seen only by the team that checks it.', 'सिर्फ़ आख़िरी 4 अंक दिखते और रखे जाते हैं। फ़ोटो सिर्फ़ जाँच करने वाली टीम देखती है।', 'ਸਿਰਫ਼ ਆਖ਼ਰੀ 4 ਅੰਕ ਦਿਸਦੇ ਅਤੇ ਰੱਖੇ ਜਾਂਦੇ ਹਨ। ਫ਼ੋਟੋ ਸਿਰਫ਼ ਜਾਂਚ ਕਰਨ ਵਾਲੀ ਟੀਮ ਵੇਖਦੀ ਹੈ।')}</T>
        <Spacer />
        <Button size="tall" disabled={!ready} onPress={() => { set({ aadhaarLast4: digits(num).slice(-4) || '4821' }); nav.push('signin.pan'); }}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninAadhaarScreen;

const styles = StyleSheet.create({
  checks: { gap: 7 },
});
