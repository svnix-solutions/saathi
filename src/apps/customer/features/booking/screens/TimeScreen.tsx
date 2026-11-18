/** Design page 03 · Book a helper — screen 7 · Duration and time. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, Grid, H, H2, Icon, Lft, Pill, Row, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { decisions, dur, priceOf, rupees, serviceShortName } from '@/domain';
import { useCustomerState } from '../../../state';
import { DAYS, DURATIONS, dayById } from '../data';

export function TimeScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const [minutes, setMinutes] = useState(st.minutes);
  const [when, setWhen] = useState(st.when);
  const [day, setDay] = useState(st.day ?? 'tomorrow');
  const price = priceOf({ service: st.service, minutes });
  const dayLabel = dayById(day);
  const goodToKnow = [
    t('Add 30 minutes while the helper is there', 'हेल्पर के रहते 30 मिनट और जोड़ें'),
    t(`Free to cancel until ${decisions.customer.freeCancelUntilHrs} hr before`, `${decisions.customer.freeCancelUntilHrs} घंटा पहले तक मुफ़्त रद्द करें`),
    t('Pay only after the visit is booked', 'बुकिंग पक्की होने के बाद ही भुगतान'),
  ];
  const summary = `${dur(t, minutes)} · ${serviceShortName(t, st.service)}${when === 'later' ? ' · ' + t(dayLabel.en, dayLabel.hi) : ''}`;
  const next = () => { set({ minutes, when, day }); nav.push('confirm'); };
  return (
    <Screen>
      <BackHeader title={t('Time', 'समय')} onBack={nav.back} />
      <H>{t('How long?', 'कितनी देर?')}</H>
      <Grid cols={3}>
        {DURATIONS.map((m) => <Pill key={m} sel={minutes === m} onPress={() => setMinutes(m)}>{dur(t, m)}</Pill>)}
      </Grid>
      <H style={{ marginTop: 6 }}>{t('When?', 'कब?')}</H>
      <Grid cols={2}>
        <Card sel={when === 'now'} onPress={() => setWhen('now')}>
          <Icon name="bolt" color={c.accent} fill />
          <H2>{t('Now', 'अभी')}</H2>
          <T s m>{t('Arrives in 15 min', '15 मिनट में पहुँचेंगे')}</T>
        </Card>
        <Card sel={when === 'later'} onPress={() => setWhen('later')}>
          <Icon name="clock" />
          <H2>{t('Schedule', 'समय तय करें')}</H2>
          <T s m>{when === 'later' ? t(`${dayLabel.en} · 10:00 am`, `${dayLabel.hi} · सुबह 10:00`) : t('Pick date and time', 'तारीख और समय चुनें')}</T>
        </Card>
      </Grid>
      <Grid cols={3}>
        {DAYS.map((d) => (
          <Pill key={d.id} s sel={when === 'later' && day === d.id} onPress={() => { setWhen('later'); setDay(d.id); }}>{t(d.en, d.hi)}</Pill>
        ))}
      </Grid>
      <Card style={styles.notes}>
        <H2>{t('Good to know', 'जानने लायक')}</H2>
        {goodToKnow.map((x) => <Lft key={x}><Check on /><T s style={styles.grow}>{x}</T></Lft>)}
      </Card>
      <Spacer />
      <Row gap={12}>
        <View>
          <T s m>{summary}</T>
          <H>{rupees(price)}</H>
        </View>
        <Button style={styles.grow} onPress={next}>{t('Continue', 'आगे बढ़ें')}</Button>
      </Row>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  notes: { gap: 8 },
});

export default TimeScreen;
