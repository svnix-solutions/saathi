import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
    nav.toast(t('Sunita started the job with your code', 'सुनीता ने आपके कोड से काम शुरू किया'));
  });
  const [cancel, setCancel] = useState(false);
  const mapY = small ? 52 : 84;
  const headline = arrived
    ? t('Sunita is at your door', 'सुनीता आपके दरवाज़े पर हैं')
    : eta === 1 ? t('Arriving in 1 minute', '1 मिनट में पहुँचेंगी') : t(`Arriving in ${eta} minutes`, `${eta} मिनट में पहुँचेंगी`);
  return (
    <View style={styles.root}>
      <Pressable onPress={skipToArrival} accessibilityLabel={t('Skip to arrival', 'पहुँचने तक आगे बढ़ें')}>
        <MapMock height={small ? 150 : 230} route={!arrived} dots={[
          { x: helperX, y: mapY, icon: 'user', tone: 'yellow' },
          { x: mapHomeX, y: mapY, icon: 'home' },
        ]} />
      </Pressable>
      <Screen style={{ paddingTop: 14 }}>
        <Tag tone={arrived ? 'g' : 'y'}>{arrived ? t('Arrived', 'पहुँच गईं') : t('On the way', 'रास्ते में')}</Tag>
        <Pressable onPress={skipToArrival}>
          <H>{headline}</H>
        </Pressable>
        <Card row>
          <Lft>
            <Avatar face="sd" />
            <View>
              <H2>Sunita D.</H2>
              <T s m>{t('Trained · ID checked', 'प्रशिक्षित · आईडी जाँची गई')}</T>
            </View>
          </Lft>
          <IconTile name="call" onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…'))} />
        </Card>
        <VisitSteps arrived={arrived} />
        {arrived ? <>
          <CodeCard sel title={t('Start code', 'शुरू करने का कोड')} code={codes.start}
            note={t('Read it out to Sunita. She types it to start the job.', 'यह कोड सुनीता को बताएँ। वे इसे डालकर काम शुरू करेंगी।')} />
          <Card><T s m>{t('Only give it once she is at your door. Her photo above should match the person you see.', 'कोड तभी दें जब वे दरवाज़े पर हों। ऊपर की फ़ोटो सामने वाले व्यक्ति से मिलनी चाहिए।')}</T></Card>
        </> : (
          <Card>
            <T s m>{t('Start code, read it out when the helper arrives: ', 'शुरू करने का कोड, हेल्पर के आने पर बताएँ: ')}<T b size={14} color={c.ink} style={styles.inlineCode}>{codes.start.split('').join(' ')}</T></T>
          </Card>
        )}
        <Spacer />
        {!arrived && <Button variant="outline" danger onPress={() => setCancel(true)}>{t('Cancel booking', 'बुकिंग रद्द करें')}</Button>}
      </Screen>
      <CancelVisitSheet visible={cancel} onClose={() => setCancel(false)} onCancel={() => {
        setCancel(false);
        nav.reset('home');
        nav.toast(t('Booking cancelled', 'बुकिंग रद्द हुई'));
      }} />
    </View>
  );
}

export default TrackingScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  inlineCode: { letterSpacing: 2.8 },
});
