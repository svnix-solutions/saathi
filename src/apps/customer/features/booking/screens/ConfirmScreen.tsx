/** Design page 03 · Book a helper — screen 8 · Confirm and pay. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, CharacterTile, Grid, H2, Hr, Icon, Lft, Link, Pill, Row, Screen, Spacer, T, useNav, useT, useTheme,
} from '@/native/ui';
import { decisions, dur, priceOf, rupees, serviceById, serviceName } from '@/domain';
import { useCustomerState } from '../../../state';
import { SavedAddress } from '../components/SavedAddress';
import { SCHEDULED_HELPER, dayById, taskSummary } from '../data';

export function ConfirmScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const s = serviceById(st.service);
  const price = priceOf(st);
  const day = dayById(st.day ?? 'tomorrow');
  const fee = decisions.prices.arrivalFee;

  const book = () => {
    if (st.pay === 'upi' && st.simulatePaymentFail && !st.paymentFailedOnce) {
      set({ paymentFailedOnce: true });
      nav.push('err.paymentFailed');
      return;
    }
    set({ extraMinutes: 0 });
    if (st.when === 'later') {
      set({ upcoming: { service: st.service, minutes: st.minutes, slot: `${day.en} · 10:00 am`, slotHi: `${day.hi} · सुबह 10:00`, helper: SCHEDULED_HELPER } });
      nav.reset('bookings');
      nav.toast(t(`Booked for ${day.en}, 10:00 am`, `${day.hi} सुबह 10:00 के लिए बुक हुआ`));
      return;
    }
    nav.reset('tracking');
    nav.toast(t('Sunita D. accepted your booking', 'सुनीता डी. ने बुकिंग ले ली'));
  };

  return (
    <Screen>
      <BackHeader title={t('Confirm booking', 'बुकिंग पक्की करें')} onBack={nav.back} />
      <Card>
        <Lft>
          <CharacterTile name={s.character} />
          <View style={styles.grow}>
            <H2>{`${serviceName(t, st.service)} · ${dur(t, st.minutes)}`}</H2>
            <T s m>{taskSummary(t, st.tasks)}</T>
          </View>
        </Lft>
        <Hr style={{ marginVertical: 10 }} />
        <Lft>
          <Icon name={st.when === 'now' ? 'bolt' : 'clock'} color={c.accent} fill={st.when === 'now'} />
          <T>{st.when === 'now' ? t('Arrives in about 15 minutes', 'लगभग 15 मिनट में पहुँचेंगे') : t(`${day.en} at 10:00 am`, `${day.hi} सुबह 10:00 बजे`)}</T>
        </Lft>
      </Card>
      <Card row>
        <SavedAddress address={st.address} />
        <Link onPress={() => nav.push('addresses')}>{t('Change', 'बदलें')}</Link>
      </Card>
      <H2>{t('Pay with', 'भुगतान का तरीका')}</H2>
      <Grid cols={2}>
        <Pill sel={st.pay === 'upi'} onPress={() => set({ pay: 'upi' })}>UPI</Pill>
        <Pill sel={st.pay === 'cash'} onPress={() => set({ pay: 'cash' })}>{t('Cash after job', 'काम के बाद नकद')}</Pill>
      </Grid>
      <Card style={styles.bill}>
        <Row><T m>{t(`Service, ${dur(t, st.minutes)}`, `सेवा, ${dur(t, st.minutes)}`)}</T><T>{rupees(price)}</T></Row>
        <Row><T m>{t('Arrival fee', 'आने का शुल्क')}</T><T>{rupees(fee)}</T></Row>
        <Hr />
        <Row><H2>{t('Total', 'कुल')}</H2><H2>{rupees(price + fee)}</H2></Row>
      </Card>
      <Spacer />
      <Button onPress={book}>{t(`Book helper · ${rupees(price)}`, `हेल्पर बुक करें · ${rupees(price)}`)}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  bill: { gap: 6 },
});

export default ConfirmScreen;
