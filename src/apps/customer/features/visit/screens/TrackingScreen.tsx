import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Avatar, Button, Card, H, H2, IconTile, Lft, MapMock, Screen, Spacer, T, Tag, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { codes } from '@/domain';
import { CancelVisitSheet } from '../components/CancelVisitSheet';
import { CodeCard } from '../components/CodeCard';
import { mapHomeX } from '../data';
import { VisitSteps } from '../components/VisitSteps';
import { useHelperArrival } from '../hooks/useHelperArrival';
import { useVisitState } from '../state';

/** Design page 04 · screen 9 (helper on the way) and 9b (start code once she arrives, params `{ arrived: true }`). */
export function TrackingScreen({ params }: ScreenProps<{ arrived?: boolean }>) {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [, set] = useVisitState();
  const small = device === 'small';
  const { eta, arrived, skipToArrival, helperX } = useHelperArrival(!!params.arrived, () => {
    set({ startedByCode: true });
    nav.replace('inProgress');
    nav.toast(t('Sunita started the job with your code', 'सुनीता ने आपके कोड से काम शुरू किया', 'ਸੁਨੀਤਾ ਨੇ ਤੁਹਾਡੇ ਕੋਡ ਨਾਲ ਕੰਮ ਸ਼ੁਰੂ ਕੀਤਾ'));
  });
  const [cancel, setCancel] = useState(false);
  const mapY = small ? 52 : 84;
  // the start code spaced out ("4 8 2 1"); the last digit has no letter spacing after it, so it cannot poke past the card
  const spaced = codes.start.split('').join(' ');
  const headline = arrived
    ? t('Sunita is at your door', 'सुनीता आपके दरवाज़े पर हैं', 'ਸੁਨੀਤਾ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ ਹੈ')
    : eta === 1 ? t('Arriving in 1 minute', '1 मिनट में पहुँचेंगी', '1 ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚੇਗੀ') : t(`Arriving in ${eta} minutes`, `${eta} मिनट में पहुँचेंगी`, `${eta} ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚੇਗੀ`);
  return (
    <View style={styles.root}>
      <Pressable onPress={skipToArrival} accessibilityLabel={t('Skip to arrival', 'पहुँचने तक आगे बढ़ें', 'ਪਹੁੰਚਣ ਤੱਕ ਅੱਗੇ ਵਧੋ')}>
        <MapMock height={small ? 150 : 230} route={!arrived} dots={[
          { x: helperX, y: mapY, icon: 'user', tone: 'yellow' },
          { x: mapHomeX, y: mapY, icon: 'home' },
        ]} />
      </Pressable>
      <Screen style={{ paddingTop: 14 }}>
        <Tag tone={arrived ? 'g' : 'y'}>{arrived ? t('Arrived', 'पहुँच गईं', 'ਪਹੁੰਚ ਗਈ') : t('On the way', 'रास्ते में', 'ਰਾਹ ਵਿੱਚ')}</Tag>
        <Pressable onPress={skipToArrival}>
          <H>{headline}</H>
        </Pressable>
        <Card row>
          <Lft style={styles.grow}>
            <Avatar face="sd" />
            <View style={styles.grow}>
              <H2>{t('Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.')}</H2>
              <T s m>{t('Trained · ID checked', 'प्रशिक्षित · आईडी जाँची गई', 'ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ · ਆਈਡੀ ਜਾਂਚੀ ਗਈ')}</T>
            </View>
          </Lft>
          <IconTile name="call" onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…', 'ਸੁਨੀਤਾ ਡੀ. ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))} />
        </Card>
        <VisitSteps arrived={arrived} />
        {arrived ? <>
          <CodeCard sel title={t('Start code', 'शुरू करने का कोड', 'ਸ਼ੁਰੂ ਕਰਨ ਦਾ ਕੋਡ')} code={codes.start}
            note={t('Read it out to Sunita. She types it to start the job.', 'यह कोड सुनीता को बताएँ। वे इसे डालकर काम शुरू करेंगी।', 'ਇਹ ਕੋਡ ਸੁਨੀਤਾ ਨੂੰ ਦੱਸੋ। ਉਹ ਇਸ ਨੂੰ ਪਾ ਕੇ ਕੰਮ ਸ਼ੁਰੂ ਕਰੇਗੀ।')} />
          <Card><T s m>{t('Only give it once she is at your door. Her photo above should match the person you see.', 'कोड तभी दें जब वे दरवाज़े पर हों। ऊपर की फ़ोटो सामने वाले व्यक्ति से मिलनी चाहिए।', 'ਕੋਡ ਤਾਂ ਹੀ ਦਿਓ ਜਦੋਂ ਉਹ ਦਰਵਾਜ਼ੇ ਤੇ ਹੋਵੇ। ਉੱਪਰ ਵਾਲੀ ਫ਼ੋਟੋ ਸਾਹਮਣੇ ਵਾਲੇ ਬੰਦੇ ਨਾਲ ਮਿਲਣੀ ਚਾਹੀਦੀ ਹੈ।')}</T></Card>
        </> : (
          <Card>
            <T s m>{t('Start code, read it out when the helper arrives: ', 'शुरू करने का कोड, हेल्पर के आने पर बताएँ: ', 'ਸ਼ੁਰੂ ਕਰਨ ਦਾ ਕੋਡ, ਹੈਲਪਰ ਦੇ ਆਉਣ ਤੇ ਦੱਸੋ: ')}<T b size={14} color={c.ink}><Text style={styles.inlineCode}>{spaced.slice(0, -1)}</Text>{spaced.slice(-1)}</T></T>
          </Card>
        )}
        <Spacer />
        {!arrived && <Button variant="outline" danger onPress={() => setCancel(true)}>{t('Cancel booking', 'बुकिंग रद्द करें', 'ਬੁਕਿੰਗ ਰੱਦ ਕਰੋ')}</Button>}
      </Screen>
      <CancelVisitSheet visible={cancel} onClose={() => setCancel(false)} onCancel={() => {
        setCancel(false);
        nav.reset('home');
        nav.toast(t('Booking cancelled', 'बुकिंग रद्द हुई', 'ਬੁਕਿੰਗ ਰੱਦ ਹੋ ਗਈ'));
      }} />
    </View>
  );
}

export default TrackingScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
  inlineCode: { letterSpacing: 2.8 },
});
