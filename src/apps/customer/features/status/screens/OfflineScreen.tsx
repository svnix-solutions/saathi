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
    if (tries === 0) { setTries(1); nav.toast(t('Still no connection', 'अभी भी कनेक्शन नहीं', 'ਅਜੇ ਵੀ ਕਨੈਕਸ਼ਨ ਨਹੀਂ')); return; }
    nav.reset('bookings');
    nav.toast(t('Back online', 'फिर से ऑनलाइन', 'ਫਿਰ ਤੋਂ ਔਨਲਾਈਨ'));
  };
  return (
    <View style={styles.fill}>
      <View style={styles.banner}>
        <T s b color={palette.white}>{t('No internet. Showing what we saved.', 'इंटरनेट नहीं है। सेव की गई जानकारी दिखा रहे हैं।', 'ਇੰਟਰਨੈੱਟ ਨਹੀਂ ਹੈ। ਸੇਵ ਕੀਤੀ ਜਾਣਕਾਰੀ ਦਿਖਾ ਰਹੇ ਹਾਂ।')}</T>
      </View>
      <Screen>
        <H>{t('Your bookings', 'आपकी बुकिंग', 'ਤੁਹਾਡੀਆਂ ਬੁਕਿੰਗਾਂ')}</H>
        <Card sel>
          <View style={styles.titleRow}>
            <H2 style={styles.shrink}>{t('General cleaning', 'सामान्य सफ़ाई', 'ਆਮ ਸਫ਼ਾਈ')}</H2><Tag>{t('Today', 'आज', 'ਅੱਜ')}</Tag>
          </View>
          <T s m style={{ marginTop: 4 }}>{t('Sunita D. · door code 4821', 'सुनीता डी. · दरवाज़ा कोड 4821', 'ਸੁਨੀਤਾ ਡੀ. · ਦਰਵਾਜ਼ਾ ਕੋਡ 4821')}</T>
          <T s m>{t('Last updated 11:02 am', 'आखिरी अपडेट सुबह 11:02', 'ਆਖਰੀ ਅੱਪਡੇਟ ਸਵੇਰੇ 11:02')}</T>
        </Card>
        <Card onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…', 'ਸੁਨੀਤਾ ਡੀ. ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))}>
          <Lft style={styles.top}>
            <IconTile name="call" />
            <View><H2>{t('Call your helper', 'अपने हेल्पर को कॉल करें', 'ਆਪਣੇ ਹੈਲਪਰ ਨੂੰ ਕਾਲ ਕਰੋ')}</H2><T s m>{t('Works without internet', 'इंटरनेट के बिना भी चलता है', 'ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਵੀ ਚੱਲਦਾ ਹੈ')}</T></View>
          </Lft>
        </Card>
        <Card><T s m>{t('New bookings and live tracking need a connection. Everything else stays here.', 'नई बुकिंग और लाइव ट्रैकिंग के लिए इंटरनेट चाहिए। बाकी सब यहीं रहेगा।', 'ਨਵੀਂ ਬੁਕਿੰਗ ਅਤੇ ਲਾਈਵ ਟ੍ਰੈਕਿੰਗ ਲਈ ਇੰਟਰਨੈੱਟ ਚਾਹੀਦਾ ਹੈ। ਬਾਕੀ ਸਭ ਇੱਥੇ ਹੀ ਰਹੇਗਾ।')}</T></Card>
        <Spacer />
        <Button variant="outline" onPress={retry}>{t('Try again', 'फिर कोशिश करें', 'ਫਿਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ')}</Button>
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
  shrink: { flexShrink: 1 },
});
