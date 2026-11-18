import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H, H2, IconTile, Lft, Screen, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { CustomerTabs } from '../../../navigation/CustomerTabs';

/** Design page 07 · When something is empty or goes wrong — screen 21 · No internet. */
export function OfflineScreen() {
  const nav = useNav();
  const t = useT();
  const [tries, setTries] = useState(0);
  const retry = () => {
    if (tries === 0) { setTries(1); nav.toast(t('Still no connection', 'अभी भी कनेक्शन नहीं')); return; }
    nav.reset('bookings');
    nav.toast(t('Back online', 'फिर से ऑनलाइन'));
  };
  return (
    <View style={styles.fill}>
      <View style={styles.banner}>
        <T s b color={palette.white}>{t('No internet. Showing what we saved.', 'इंटरनेट नहीं है। सेव की गई जानकारी दिखा रहे हैं।')}</T>
      </View>
      <Screen>
        <H>{t('Your bookings', 'आपकी बुकिंग')}</H>
        <Card sel>
          <View style={styles.titleRow}>
            <H2>{t('General cleaning', 'सामान्य सफ़ाई')}</H2><Tag>{t('Today', 'आज')}</Tag>
          </View>
          <T s m style={{ marginTop: 4 }}>{t('Sunita D. · door code 4821', 'सुनीता डी. · दरवाज़ा कोड 4821')}</T>
          <T s m>{t('Last updated 11:02 am', 'आखिरी अपडेट सुबह 11:02')}</T>
        </Card>
        <Card onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…'))}>
          <Lft style={styles.top}>
            <IconTile name="call" />
            <View><H2>{t('Call your helper', 'अपने हेल्पर को कॉल करें')}</H2><T s m>{t('Works without internet', 'इंटरनेट के बिना भी चलता है')}</T></View>
          </Lft>
        </Card>
        <Card><T s m>{t('New bookings and live tracking need a connection. Everything else stays here.', 'नई बुकिंग और लाइव ट्रैकिंग के लिए इंटरनेट चाहिए। बाकी सब यहीं रहेगा।')}</T></Card>
        <Spacer />
        <Button variant="outline" onPress={retry}>{t('Try again', 'फिर कोशिश करें')}</Button>
      </Screen>
      <CustomerTabs active="bookings" />
    </View>
  );
}

export default OfflineScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  banner: { backgroundColor: palette.ink, paddingVertical: 10, paddingHorizontal: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  top: { alignItems: 'flex-start' },
});
