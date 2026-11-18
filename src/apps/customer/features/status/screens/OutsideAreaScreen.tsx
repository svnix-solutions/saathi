import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H2, Spacer, T, Toggle, useNav, useT } from '@/native/ui';
import { StatusScreen } from '../components/StatusScreen';

/** Design page 07 · When something is empty or goes wrong — screen 23 · Outside the service area. */
export function OutsideAreaScreen() {
  const nav = useNav();
  const t = useT();
  const [notify, setNotify] = useState(true);
  const notifyMe = () => { nav.back(); nav.toast(t('We will message you when we open in Sector 40', 'सेक्टर 40 में शुरू होने पर हम मैसेज करेंगे', 'ਸੈਕਟਰ 40 ਵਿੱਚ ਸ਼ੁਰੂ ਹੋਣ ਤੇ ਅਸੀਂ ਮੈਸੇਜ ਕਰਾਂਗੇ')); };
  const otherAddress = () => (nav.canGoBack ? nav.back() : nav.push('signin.address', { add: true }));
  return (
    <StatusScreen
      title={t('Your address', 'आपका पता', 'ਤੁਹਾਡਾ ਪਤਾ')}
      onBack={nav.back}
      icon="pin"
      heading={t('We are not in Sector 40 yet', 'हम अभी सेक्टर 40 में नहीं हैं', 'ਅਸੀਂ ਅਜੇ ਸੈਕਟਰ 40 ਵਿੱਚ ਨਹੀਂ ਹਾਂ')}
      message={t('Saathi opens area by area so helpers can reach you in 15 minutes.', 'Saathi इलाका-दर-इलाका खुलता है ताकि हेल्पर 15 मिनट में पहुँच सकें।', 'Saathi ਇਲਾਕਾ-ਦਰ-ਇਲਾਕਾ ਖੁੱਲ੍ਹਦਾ ਹੈ ਤਾਂ ਜੋ ਹੈਲਪਰ 15 ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚ ਸਕਣ।')}
    >
      <Card row>
        <View style={styles.text}><H2>{t('Tell me when you open here', 'यहाँ शुरू होने पर बताएँ', 'ਇੱਥੇ ਸ਼ੁਰੂ ਹੋਣ ਤੇ ਦੱਸਣਾ')}</H2><T s m>{t('One message, nothing else', 'बस एक मैसेज, और कुछ नहीं', 'ਬੱਸ ਇੱਕ ਮੈਸੇਜ, ਹੋਰ ਕੁਝ ਨਹੀਂ')}</T></View>
        <Toggle on={notify} onChange={setNotify} />
      </Card>
      <Card>
        <H2>{t('Nearest areas we serve', 'पास के इलाके जहाँ हम हैं', 'ਨੇੜਲੇ ਇਲਾਕੇ ਜਿੱਥੇ ਅਸੀਂ ਹਾਂ')}</H2>
        <T s m style={{ marginTop: 4 }}>{t('Sector 21 · Sector 18 · Block C', 'सेक्टर 21 · सेक्टर 18 · ब्लॉक सी', 'ਸੈਕਟਰ 21 · ਸੈਕਟਰ 18 · ਬਲਾਕ ਸੀ')}</T>
      </Card>
      <Spacer />
      <Button disabled={!notify} onPress={notifyMe}>{t('Notify me', 'मुझे बताएँ', 'ਮੈਨੂੰ ਦੱਸੋ')}</Button>
      <Button variant="plain" onPress={otherAddress}>{t('Try another address', 'दूसरा पता डालें', 'ਹੋਰ ਪਤਾ ਪਾਓ')}</Button>
    </StatusScreen>
  );
}

export default OutsideAreaScreen;

const styles = StyleSheet.create({ text: { flex: 1 } });
