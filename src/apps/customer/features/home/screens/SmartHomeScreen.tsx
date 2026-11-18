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
  const first = (st.name ?? 'Nitin Kumar').split(' ')[0];
  const repeat = () => {
    set({ service: 'general', minutes: fans ? 90 : 60, when: 'later', slot: 'Saturday, 10:00 am', helper: 'Sunita D.', tasks: fans ? [...(st.tasks ?? []), 'Clean fans'] : st.tasks });
    nav.push('confirm');
  };
  const toggleFans = () => { setFans(!fans); nav.toast(fans ? 'Fans removed from Saturday' : 'Fans added to Saturday · ₹129'); };
  const setAutoPay = (v: boolean) => { set({ autoPay: v }); nav.toast(v ? 'AutoPay on, up to ₹600 a visit' : 'AutoPay off. You pay after each visit'); };
  return (
    <View style={styles.page}>
      <Screen>
        <H>{t(`Good morning, ${first}`, `सुप्रभात, ${first}`)}</H>
        <Card sel>
          <T s b color={c.accent}>{t('Your usual', 'आपकी हमेशा वाली बुकिंग')}</T>
          <H2 style={{ fontSize: 15, marginTop: 2 }}>General cleaning, Saturday 10 am</H2>
          <T s m>Booked 4 Saturdays in a row · Sunita is free{fans ? ' · + fans' : ''}</T>
          <Button style={{ marginTop: 10, paddingVertical: 11 }} onPress={repeat}>{t('Book again in one tap', 'एक टैप में फिर बुक करें')} · {rupees(total)}</Button>
        </Card>
        <Card>
          <Lft style={styles.top} gap={10}>
            <IconTile name="clock" />
            <View style={styles.grow}>
              <H2>Fans are due</H2>
              <T s m>Last cleaned 6 weeks ago. Add 30 min on Saturday?</T>
              <Link style={{ marginTop: 6 }} onPress={toggleFans}>
                {fans ? t('Added · Remove', 'जोड़ा गया · हटाएँ') : t('Add for ₹129', '₹129 में जोड़ें')}
              </Link>
            </View>
          </Lft>
        </Card>
        <Card onPress={() => nav.push('deepClean')}>
          <Lft style={styles.top} gap={10}>
            <IconTile name="user" />
            <View style={styles.grow}>
              <H2>Guests this weekend?</H2>
              <T s m>Book a deep clean for Friday while slots are open.</T>
            </View>
          </Lft>
        </Card>
        <Card row>
          <View style={styles.grow}><H2>UPI AutoPay</H2><T s m>Pays each visit by itself, up to ₹600</T></View>
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
