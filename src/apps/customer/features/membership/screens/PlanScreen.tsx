/** Design page 10 · Plans, favourites, supplies and receipts — screen 32 · Monthly plan. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Grid, H, H2, Hr, Icon, KeyValue, Lft, Link, PickSheet, Pill, Screen, Sheet, Spacer, T,
  useNav, useT, useTheme,
} from '@/native/ui';
import { decisions, fmtMin, priceFor, rupees } from '@/domain';
import { useMembershipState } from '../state';
import { PLAN_DAYS, PLAN_DAYS_DEFAULT, PLAN_HELPERS, PLAN_LENGTHS, PLAN_TIMES } from '../data';
import { planPrice } from '../rules';

export function PlanScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useMembershipState();
  const [days, setDays] = useState(PLAN_DAYS_DEFAULT);
  const [time, setTime] = useState('8:00 am');
  const [len, setLen] = useState(60);
  const [helper, setHelper] = useState(PLAN_HELPERS[0]);
  const [sheet, setSheet] = useState<null | 'time' | 'len' | 'helper'>(null);
  const close = () => setSheet(null);
  const { perWeek, visits, each, sub, saving, perMonth } = planPrice(days, len);
  const start = () => {
    set({ plan: { days, time, minutes: len, helper: helper.id, perMonth } });
    nav.toast(`Plan started with ${helper.id} · ${rupees(perMonth)} a month`);
    nav.reset('home');
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Monthly plan', 'मासिक प्लान')} onBack={nav.back} />
        <Lft><CharacterTile name="hero" size={64} /><H style={styles.grow}>{t('Same helper, every day', 'हर दिन वही हेल्पर')}</H></Lft>
        <H2>{t('Which days?', 'कौन से दिन?')}</H2>
        <View style={styles.days}>
          {PLAN_DAYS.map((d, i) => (
            <Pill key={i} sel={days[i]} style={styles.grow} onPress={() => setDays(days.map((v, j) => (j === i ? !v : v)))}>{d}</Pill>
          ))}
        </View>
        <Grid cols={2}>
          <Card onPress={() => setSheet('time')}><T s m>Start time</T><H2>{time}</H2></Card>
          <Card onPress={() => setSheet('len')}><T s m>Each visit</T><H2>{fmtMin(len)}</H2></Card>
        </Grid>
        <Card row>
          <Lft><Avatar face={helper.face} /><View><H2>{helper.id}</H2><T s m>Your regular helper</T></View></Lft>
          <Link onPress={() => setSheet('helper')}>Change</Link>
        </Card>
        <Card style={styles.bill}>
          <KeyValue label={`${visits} visits × ${rupees(each)}`} value={rupees(sub)} />
          <KeyValue label={`Plan saving ${decisions.prices.monthlyPlanSaving * 100}%`} value={`− ${rupees(saving)}`} valueTone="accent" />
          <Hr />
          <KeyValue variant="total" label="Per month" value={rupees(perMonth)} />
        </Card>
        <T s m>Skip a day or pause the plan any time, free until 9 pm the night before.</T>
        <Spacer />
        <Button disabled={!perWeek} onPress={start}>{t('Start plan', 'प्लान शुरू करें')}</Button>
      </Screen>
      <PickSheet visible={sheet === 'time'} title="Start time" value={time} onClose={close} onPick={setTime}
        options={PLAN_TIMES.map((v) => ({ v, label: v }))} />
      <PickSheet visible={sheet === 'len'} title="Each visit" value={len} onClose={close} onPick={setLen}
        options={PLAN_LENGTHS.map((v) => ({ v, label: `${fmtMin(v)} · ${rupees(priceFor('general', v))}` }))} />
      <Sheet visible={sheet === 'helper'} onClose={close}>
        <H2>Choose your regular helper</H2>
        {PLAN_HELPERS.map((h) => (
          <Card key={h.id} row sel={h.id === helper.id} onPress={() => { setHelper(h); close(); }}>
            <Lft><Avatar face={h.face} size={32} /><H2>{h.id}</H2></Lft>
            {h.id === helper.id && <Icon name="check" color={c.accent} />}
          </Card>
        ))}
      </Sheet>
    </View>
  );
}

export default PlanScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
  days: { flexDirection: 'row', gap: 5 },
  bill: { gap: 6 },
});
