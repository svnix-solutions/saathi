/** Design page 23 (section 59), screen 24 · Location is off: why it is needed, and how to turn it on. */
import React from 'react';
import { View } from 'react-native';
import { Button, Card, CheckRow, H, Page, Screen, Spacer, StatusIcon, T, useNav, useT } from '@/native/ui';
import { usePartnerState } from '../../../state';
import { locationPoints } from '../data';
import { useTurnOnLocation } from '../hooks/useTurnOnLocation';

export function LocationOffScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = usePartnerState();
  const { busy, open } = useTurnOnLocation();
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 24 }}><StatusIcon name="pin" /></View>
        <H center>{t('Turn on location to go online', 'ऑनलाइन होने के लिए लोकेशन चालू करें')}</H>
        <T m center>{t('We use it only while you are online, to send jobs near you and to check you in at the door.', 'हम इसे सिर्फ़ ऑनलाइन रहते इस्तेमाल करते हैं, पास का काम भेजने और दरवाज़े पर चेक-इन के लिए।')}</T>
        <Card style={{ gap: 10 }}>{locationPoints.map(([en, hi]) => <CheckRow key={en} on label={t(en, hi)} />)}</Card>
        <Spacer />
        <Button size="tall" disabled={busy} onPress={open}>{busy ? t('Opening settings…', 'सेटिंग खुल रही है…') : t('Open phone settings', 'फ़ोन की सेटिंग खोलें')}</Button>
        <Button variant="plain" onPress={() => { set({ online: false }); nav.reset('home'); }}>{t('Stay offline', 'ऑफ़लाइन रहें')}</Button>
      </Screen>
    </Page>
  );
}

export default LocationOffScreen;
