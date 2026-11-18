/** Design page 16 (CUSTOMER H) · Voice, photo estimate and smart booking — screen 58 · Smart home screen. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H, H2, IconTile, Lft, Link, Screen, T, Toggle, useNav, useT, useTheme } from '@/native/ui';
import { priceFor, rupees } from '@/domain';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { useBookingState } from '../../booking';
import { FANS_PRICE } from '../data';

export function SmartHomeScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useBookingState();
  const [fans, setFans] = useState(false);
  const total = priceFor('general', 60) + (fans ? FANS_PRICE : 0);
  const name = st.name ?? 'Nitin Kumar';
  const first = name === 'Nitin Kumar' ? t('Nitin', 'नितिन', 'ਨਿਤਿਨ') : name.split(' ')[0];
  const repeat = () => {
    set({ service: 'general', minutes: fans ? 90 : 60, when: 'later', slot: 'Saturday, 10:00 am', helper: 'Sunita D.', tasks: fans ? [...(st.tasks ?? []), 'Clean fans'] : st.tasks });
    nav.push('confirm');
  };
  const toggleFans = () => { setFans(!fans); nav.toast(fans
    ? t('Fans removed from Saturday', 'शनिवार से पंखे हटाए', 'ਸ਼ਨੀਵਾਰ ਤੋਂ ਪੱਖੇ ਹਟਾ ਦਿੱਤੇ')
    : t('Fans added to Saturday · ₹129', 'शनिवार में पंखे जोड़े · ₹129', 'ਸ਼ਨੀਵਾਰ ਵਿੱਚ ਪੱਖੇ ਜੋੜ ਦਿੱਤੇ · ₹129')); };
  const setAutoPay = (v: boolean) => { set({ autoPay: v }); nav.toast(v
    ? t('AutoPay on, up to ₹600 a visit', 'ऑटोपे चालू, हर विज़िट ₹600 तक', 'ਆਟੋਪੇ ਚਾਲੂ, ਹਰ ਵਿਜ਼ਿਟ ₹600 ਤੱਕ')
    : t('AutoPay off. You pay after each visit', 'ऑटोपे बंद। हर विज़िट के बाद आप भुगतान करें', 'ਆਟੋਪੇ ਬੰਦ। ਹਰ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ ਤੁਸੀਂ ਭੁਗਤਾਨ ਕਰੋ')); };
  return (
    <View style={styles.page}>
      <Screen>
        <H>{t(`Good morning, ${first}`, `सुप्रभात, ${first}`, `ਸ਼ੁਭ ਸਵੇਰ, ${first}`)}</H>
        <Card sel>
          <T s b color={c.accent}>{t('Your usual', 'आपकी हमेशा वाली बुकिंग', 'ਤੁਹਾਡੀ ਹਮੇਸ਼ਾ ਵਾਲੀ ਬੁਕਿੰਗ')}</T>
          <H2 style={{ fontSize: 15, marginTop: 2 }}>{t('General cleaning, Saturday 10 am', 'सामान्य सफ़ाई, शनिवार सुबह 10 बजे', 'ਆਮ ਸਫ਼ਾਈ, ਸ਼ਨੀਵਾਰ ਸਵੇਰੇ 10 ਵਜੇ')}</H2>
          <T s m>
            {t('Booked 4 Saturdays in a row · Sunita is free', 'लगातार 4 शनिवार बुक किया · सुनीता खाली है', 'ਲਗਾਤਾਰ 4 ਸ਼ਨੀਵਾਰ ਬੁੱਕ ਕੀਤਾ · ਸੁਨੀਤਾ ਵਿਹਲੀ ਹੈ')}
            {fans ? t(' · + fans', ' · + पंखे', ' · + ਪੱਖੇ') : ''}
          </T>
          <Button style={{ marginTop: 10, paddingVertical: 11 }} onPress={repeat}>{t('Book again in one tap', 'एक टैप में फिर बुक करें', 'ਇੱਕ ਟੈਪ ਵਿੱਚ ਫਿਰ ਬੁੱਕ ਕਰੋ')} · {rupees(total)}</Button>
        </Card>
        <Card>
          <Lft style={styles.top} gap={10}>
            <IconTile name="clock" />
            <View style={styles.grow}>
              <H2>{t('Fans are due', 'पंखों की सफ़ाई का समय', 'ਪੱਖਿਆਂ ਦੀ ਸਫ਼ਾਈ ਦਾ ਸਮਾਂ')}</H2>
              <T s m>{t('Last cleaned 6 weeks ago. Add 30 min on Saturday?', 'पिछली बार 6 हफ़्ते पहले साफ़ हुए। शनिवार को 30 मिनट जोड़ें?', 'ਪਿਛਲੀ ਵਾਰ 6 ਹਫ਼ਤੇ ਪਹਿਲਾਂ ਸਾਫ਼ ਹੋਏ। ਸ਼ਨੀਵਾਰ ਨੂੰ 30 ਮਿੰਟ ਜੋੜੀਏ?')}</T>
              <Link style={{ marginTop: 6 }} onPress={toggleFans}>
                {fans ? t('Added · Remove', 'जोड़ा गया · हटाएँ', 'ਜੋੜ ਦਿੱਤਾ · ਹਟਾਓ') : t('Add for ₹129', '₹129 में जोड़ें', '₹129 ਵਿੱਚ ਜੋੜੋ')}
              </Link>
            </View>
          </Lft>
        </Card>
        <Card onPress={() => nav.push('deepClean')}>
          <Lft style={styles.top} gap={10}>
            <IconTile name="user" />
            <View style={styles.grow}>
              <H2>{t('Guests this weekend?', 'इस वीकेंड मेहमान आ रहे हैं?', 'ਇਸ ਵੀਕਐਂਡ ਮਹਿਮਾਨ ਆ ਰਹੇ ਨੇ?')}</H2>
              <T s m>{t('Book a deep clean for Friday while slots are open.', 'स्लॉट खाली रहते शुक्रवार की डीप क्लीन बुक करें।', 'ਸਲਾਟ ਖਾਲੀ ਹੋਣ ਤੱਕ ਸ਼ੁੱਕਰਵਾਰ ਦੀ ਡੀਪ ਕਲੀਨ ਬੁੱਕ ਕਰੋ।')}</T>
            </View>
          </Lft>
        </Card>
        <Card row>
          <View style={styles.grow}><H2>{t('UPI AutoPay', 'UPI ऑटोपे', 'UPI ਆਟੋਪੇ')}</H2><T s m>{t('Pays each visit by itself, up to ₹600', 'हर विज़िट का भुगतान अपने आप, ₹600 तक', 'ਹਰ ਵਿਜ਼ਿਟ ਦਾ ਭੁਗਤਾਨ ਆਪਣੇ ਆਪ, ₹600 ਤੱਕ')}</T></View>
          <Toggle on={st.autoPay ?? true} onChange={setAutoPay} />
        </Card>
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  grow: { flex: 1 },
  top: { alignItems: 'flex-start' },
});

export default SmartHomeScreen;
