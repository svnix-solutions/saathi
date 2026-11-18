import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, CharacterTile, H, H2, Lft, Page, Radio, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { professions, type ProfessionId } from '@/data/professions';
import { SignupSteps } from '../components/SignupSteps';
import { profOf } from '../signup';
import { useOnboardingState } from '../state';
import { professionName, professionSub } from '../words';

/** Design page 22 (section 96), screen 9 · Your work: one profession. */
export function SigninWorkScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const { c } = useTheme();
  const [pick, setPick] = useState<ProfessionId>(profOf(st));
  const go = () => {
    // A new profession clears the old picks so the next screens start from its own list.
    set(pick === st.profession ? {} : { profession: pick, specs: undefined, skills: undefined, docsAdded: undefined });
    nav.push('signin.specializations');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} />
        <H size={21}>{t('What work do you do?', 'आप क्या काम करते हैं?', 'ਤੁਸੀਂ ਕੀ ਕੰਮ ਕਰਦੇ ਹੋ?')}</H>
        <T s m>{t('Pick one. To change it later, ask the team.', 'एक चुनें। बाद में बदलने के लिए टीम से कहें।', 'ਇੱਕ ਚੁਣੋ। ਬਾਅਦ ਵਿੱਚ ਬਦਲਣ ਲਈ ਟੀਮ ਨੂੰ ਕਹੋ।')}</T>
        {professions.filter((p) => p.live).map((p) => (
          <Card key={p.id} row sel={pick === p.id} onPress={() => setPick(p.id)}>
            <Lft style={styles.fill}>
              <CharacterTile name={p.character} bg={pick === p.id ? c.card : undefined} />
              <View style={styles.fill}><H2>{professionName(t, p)}</H2><T s m>{professionSub(t, p)}</T></View>
            </Lft>
            <Radio on={pick === p.id} size={22} mark="dot" />
          </Card>
        ))}
        <Spacer />
        <Button size="tall" onPress={go}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninWorkScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
