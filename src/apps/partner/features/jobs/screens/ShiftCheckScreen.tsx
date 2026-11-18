/** Design page 26, screen 32 · Shift check-in: selfie match and a checklist before going online. */
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button, Card, CharacterTile, CheckRow, Circle, H, H2, Icon, Lft, Page, Screen, Spacer, T, palette, useNav, useT, useTheme } from '@/native/ui';
import { shiftChecks, shiftChecksStart } from '../data';
import { useSelfieMatch } from '../hooks/useSelfieMatch';
import { useJobsState } from '../state';

export function ShiftCheckScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useJobsState();
  const { selfie, take } = useSelfieMatch();
  const [checks, setChecks] = useState(shiftChecksStart);
  const allTicked = checks.uniform && checks.id && checks.phone;
  const ready = allTicked && selfie === 'ok';
  const goOnline = () => { set({ online: true }); nav.reset('home'); nav.toast(t('You are online. Jobs will come soon.', 'आप ऑनलाइन हैं। काम जल्द आएगा।', 'ਤੁਸੀਂ ਆਨਲਾਈਨ ਹੋ। ਕੰਮ ਜਲਦੀ ਆਵੇਗਾ।')); };
  return (
    <Page variant="bare">
      <Screen>
        <Lft>
          <CharacterTile name="laundry" size={64} />
          <H style={styles.fill}>{t('Before you go online', 'ऑनलाइन होने से पहले', 'ਆਨਲਾਈਨ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ')}</H>
        </Lft>
        <Pressable onPress={take} accessibilityRole="button" accessibilityLabel={t('Take a selfie', 'सेल्फ़ी लें', 'ਸੈਲਫ਼ੀ ਲਓ')}>
          <Circle size={130} border={selfie === 'ok' ? palette.green : c.accent} bg={selfie === 'ok' ? c.mint : undefined}>
            <Icon name={selfie === 'ok' ? 'check' : 'user'} size={34} color={c.accent} />
            <H2 color={c.accent} center>
              {selfie === 'none' ? t('Take a selfie', 'सेल्फ़ी लें', 'ਸੈਲਫ਼ੀ ਲਓ') : selfie === 'checking' ? t('Matching…', 'मिला रहे हैं…', 'ਮਿਲਾ ਰਹੇ ਹਾਂ…') : t('It is you', 'पहचान हो गई', 'ਪਛਾਣ ਹੋ ਗਈ')}
            </H2>
          </Circle>
        </Pressable>
        <T s m center>{t('We match it with your photo so no one else can use your account.', 'हम इसे आपकी फ़ोटो से मिलाते हैं ताकि कोई और आपका खाता न चला सके।', 'ਅਸੀਂ ਇਸ ਨੂੰ ਤੁਹਾਡੀ ਫ਼ੋਟੋ ਨਾਲ ਮਿਲਾਉਂਦੇ ਹਾਂ ਤਾਂ ਜੋ ਕੋਈ ਹੋਰ ਤੁਹਾਡਾ ਖਾਤਾ ਨਾ ਚਲਾ ਸਕੇ।')}</T>
        <Card style={{ gap: 13 }}>
          {shiftChecks.map((i) => (
            <CheckRow key={i.k} size={24} on={checks[i.k]} label={t(i.en, i.hi, i.pa)} onPress={() => setChecks((s) => ({ ...s, [i.k]: !s[i.k] }))} />
          ))}
        </Card>
        <Spacer />
        {!ready && (
          <T s m center>
            {selfie !== 'ok' ? t('Take the selfie to continue', 'आगे बढ़ने के लिए सेल्फ़ी लें', 'ਅੱਗੇ ਵਧਣ ਲਈ ਸੈਲਫ਼ੀ ਲਓ') : t('Tick all three to go online', 'ऑनलाइन होने के लिए तीनों पर निशान लगाएँ', 'ਆਨਲਾਈਨ ਹੋਣ ਲਈ ਤਿੰਨਾਂ ਤੇ ਨਿਸ਼ਾਨ ਲਗਾਓ')}
          </T>
        )}
        <Button big disabled={!ready} onPress={goOnline}>{t('Go online', 'ऑनलाइन हों', 'ਆਨਲਾਈਨ ਹੋਵੋ')}</Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default ShiftCheckScreen;
