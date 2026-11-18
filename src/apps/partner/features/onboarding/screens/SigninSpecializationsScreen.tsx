import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, H, H2, Page, Screen, Spacer, T, palette, useNav, useT } from '@/native/ui';
import { profession, requiredDocs, specsOf } from '@/data/professions';
import { SignupSteps } from '../components/SignupSteps';
import { profOf, specsFor, toggleIn } from '../signup';
import { useOnboardingState } from '../state';
import { professionName, specName, specSub } from '../words';

/** Design page 22 (section 96), screen 10 · Specialisations: many, from the chosen work. */
export function SigninSpecializationsScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const p = profession(profOf(st));
  const [picked, setPicked] = useState<string[]>(specsFor(st));
  const extra = requiredDocs(p.id, picked).some((r) => r.specialization);
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} label={false} />
        <BackHeader title={professionName(t, p)} onBack={nav.back} />
        <H size={21}>{t('What do you specialise in?', 'आप किसमें माहिर हैं?', 'ਤੁਸੀਂ ਕਿਸ ਵਿੱਚ ਮਾਹਿਰ ਹੋ?')}</H>
        <T s m>{t('Pick all that apply. You are sent jobs that match.', 'जो भी लागू हों सब चुनें। आपको उन्हीं से मिलते काम भेजे जाएँगे।', 'ਜੋ ਵੀ ਲਾਗੂ ਹੋਣ ਸਾਰੇ ਚੁਣੋ। ਤੁਹਾਨੂੰ ਉਹਨਾਂ ਨਾਲ ਮਿਲਦੇ ਕੰਮ ਭੇਜੇ ਜਾਣਗੇ।')}</T>
        {specsOf(p.id).map((s) => (
          <Card key={s.id} row sel={picked.includes(s.id)} onPress={() => setPicked(toggleIn(picked, s.id))}>
            <View style={styles.fill}><H2>{specName(t, s)}</H2><T s m>{specSub(t, s)}</T></View>
            <Check on={picked.includes(s.id)} size={22} />
          </Card>
        ))}
        <Card tone="yellow">
          <T s color={palette.ink}>{extra
            ? t('One of your choices needs one more certificate. We show the full list before you upload.', 'आपकी एक पसंद के लिए एक और सर्टिफ़िकेट चाहिए। अपलोड से पहले पूरी सूची दिखाएँगे।', 'ਤੁਹਾਡੀ ਇੱਕ ਚੋਣ ਲਈ ਇੱਕ ਹੋਰ ਸਰਟੀਫ਼ਿਕੇਟ ਚਾਹੀਦਾ ਹੈ। ਅੱਪਲੋਡ ਤੋਂ ਪਹਿਲਾਂ ਪੂਰੀ ਸੂਚੀ ਵਿਖਾਵਾਂਗੇ।')
            : t('Some choices need one more certificate. We show the full list before you upload.', 'कुछ पसंद के लिए एक और सर्टिफ़िकेट चाहिए। अपलोड से पहले पूरी सूची दिखाएँगे।', 'ਕੁਝ ਚੋਣਾਂ ਲਈ ਇੱਕ ਹੋਰ ਸਰਟੀਫ਼ਿਕੇਟ ਚਾਹੀਦਾ ਹੈ। ਅੱਪਲੋਡ ਤੋਂ ਪਹਿਲਾਂ ਪੂਰੀ ਸੂਚੀ ਵਿਖਾਵਾਂਗੇ।')}</T>
        </Card>
        <Spacer />
        <Button size="tall" disabled={!picked.length} onPress={() => { set({ specs: picked }); nav.push('signin.skills'); }}>
          {t(`Continue · ${picked.length} picked`, `आगे बढ़ें · ${picked.length} चुने`, `ਅੱਗੇ ਵਧੋ · ${picked.length} ਚੁਣੇ`)}
        </Button>
      </Screen>
    </Page>
  );
}

export default SigninSpecializationsScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
