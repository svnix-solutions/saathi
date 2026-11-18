/** Design page 09 · My account, payments, alerts and leaving — screen 30 · Alert settings. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BackHeader, H2, ListCard, Row, Screen, T, Tag, Toggle, useNav, useT } from '@/native/ui';
import { ToggleCard } from '../components/ToggleCard';
import { ALERT_DEFAULTS, type AlertSwitch } from '../data';

export function AlertSettingsScreen() {
  const nav = useNav();
  const t = useT();
  const [on, setOn] = useState(ALERT_DEFAULTS);
  const tog = (k: AlertSwitch) => (v: boolean) => setOn((s) => ({ ...s, [k]: v }));
  return (
    <Screen>
      <BackHeader title={t('Alerts', 'सूचनाएँ', 'ਸੂਚਨਾਵਾਂ')} onBack={nav.back} />
      <H2>{t('What we tell you about', 'हम किस बारे में बताते हैं', 'ਅਸੀਂ ਕਿਹੜੀਆਂ ਗੱਲਾਂ ਦੱਸਦੇ ਹਾਂ')}</H2>
      <ListCard>
        <Row><T style={styles.grow}>{t('Helper arrival and door code', 'हेल्पर का आना और दरवाज़ा कोड', 'ਹੈਲਪਰ ਦਾ ਆਉਣਾ ਅਤੇ ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ')}</T><Tag tone="n">{t('Always on', 'हमेशा चालू', 'ਹਮੇਸ਼ਾ ਚਾਲੂ')}</Tag></Row>
        <Row><T style={styles.grow}>{t('Booking reminders', 'बुकिंग की याद', 'ਬੁਕਿੰਗ ਦੀ ਯਾਦ')}</T><Toggle on={on.reminders} onChange={tog('reminders')} /></Row>
        <Row><T style={styles.grow}>{t('Rate your visit', 'विज़िट को रेटिंग दें', 'ਵਿਜ਼ਿਟ ਨੂੰ ਰੇਟਿੰਗ ਦਿਓ')}</T><Toggle on={on.rate} onChange={tog('rate')} /></Row>
        <Row><T style={styles.grow}>{t('Offers and discounts', 'ऑफ़र और छूट', 'ਆਫ਼ਰ ਅਤੇ ਛੋਟ')}</T><Toggle on={on.offers} onChange={tog('offers')} /></Row>
      </ListCard>
      <H2>{t('How', 'कैसे', 'ਕਿਵੇਂ')}</H2>
      <ListCard>
        <Row><T style={styles.grow}>{t('In the app', 'ऐप में', 'ਐਪ ਵਿੱਚ')}</T><Toggle on={on.app} onChange={tog('app')} /></Row>
        <Row><T>SMS</T><Toggle on={on.sms} onChange={tog('sms')} /></Row>
        <Row><T>WhatsApp</T><Toggle on={on.whatsapp} onChange={tog('whatsapp')} /></Row>
      </ListCard>
      <ToggleCard title={t('Quiet hours', 'शांत समय', 'ਸ਼ਾਂਤ ਸਮਾਂ')} sub={t('Nothing but arrivals, 9 pm to 8 am', 'रात 9 से सुबह 8 तक सिर्फ़ आगमन', 'ਰਾਤ 9 ਤੋਂ ਸਵੇਰੇ 8 ਤੱਕ ਸਿਰਫ਼ ਪਹੁੰਚਣ ਦੇ ਸੁਨੇਹੇ')} on={on.quiet} onChange={tog('quiet')} />
      <T s m>{t('Arrival messages cannot be turned off; you need the door code.', 'आगमन के मैसेज बंद नहीं होते; आपको दरवाज़ा कोड चाहिए।', 'ਪਹੁੰਚਣ ਦੇ ਸੁਨੇਹੇ ਬੰਦ ਨਹੀਂ ਹੁੰਦੇ; ਤੁਹਾਨੂੰ ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ ਚਾਹੀਦਾ ਹੈ।')}</T>
    </Screen>
  );
}

export default AlertSettingsScreen;

const styles = StyleSheet.create({ grow: { flex: 1 } });
