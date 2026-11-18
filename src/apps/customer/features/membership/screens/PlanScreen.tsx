/** Design page 10 · Plans, favourites, supplies and receipts — screen 32 · Monthly plan. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Grid, H, H2, Hr, Icon, KeyValue, Lft, Link, PickSheet, Pill, Screen, Sheet, Spacer, T,
  useNav, useT, useTheme,
} from '@/native/ui';
import { clockTime, decisions, fmtMin, priceFor, rupees, type TFn } from '@/domain';
import { useMembershipState } from '../state';
import { PLAN_DAYS, PLAN_DAYS_DEFAULT, PLAN_HELPERS, PLAN_LENGTHS, PLAN_TIMES, type Tri } from '../data';
import { planPrice } from '../rules';

/** "8:00 am" (how plan times are stored) in the current language. */
const timeLabel = (t: TFn, v: string) => {
  const [hm, ap] = v.split(' ');
  const [h, m] = hm.split(':').map(Number);
  return clockTime(t, ap === 'pm' && h !== 12 ? h + 12 : h, m);
};

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
  const tri = (x: Tri) => t(x.en, x.hi, x.pa);
  const helperName = tri(helper.name);
  const { perWeek, visits, each, sub, saving, perMonth } = planPrice(days, len);
  const savingPct = decisions.prices.monthlyPlanSaving * 100;
  const startTimeLabel = t('Start time', 'शुरू होने का समय', 'ਸ਼ੁਰੂ ਹੋਣ ਦਾ ਸਮਾਂ');
  const eachVisitLabel = t('Each visit', 'हर विज़िट', 'ਹਰ ਵਿਜ਼ਿਟ');
  const closeLabel = t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ');
  const start = () => {
    set({ plan: { days, time, minutes: len, helper: helper.id, perMonth } });
    nav.toast(t(
      `Plan started with ${helper.id} · ${rupees(perMonth)} a month`,
      `${helperName} के साथ प्लान शुरू · ${rupees(perMonth)} महीना`,
      `${helperName} ਨਾਲ ਪਲਾਨ ਸ਼ੁਰੂ · ${rupees(perMonth)} ਮਹੀਨਾ`,
    ));
    nav.reset('home');
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Monthly plan', 'मासिक प्लान', 'ਮਹੀਨੇਵਾਰ ਪਲਾਨ')} onBack={nav.back} />
        <Lft><CharacterTile name="hero" size={64} /><H style={styles.grow}>{t('Same helper, every day', 'हर दिन वही हेल्पर', 'ਹਰ ਦਿਨ ਉਹੀ ਹੈਲਪਰ')}</H></Lft>
        <H2>{t('Which days?', 'कौन से दिन?', 'ਕਿਹੜੇ ਦਿਨ?')}</H2>
        <View style={styles.days}>
          {PLAN_DAYS.map((d, i) => (
            <Pill key={i} sel={days[i]} style={styles.grow} onPress={() => setDays(days.map((v, j) => (j === i ? !v : v)))}>{tri(d)}</Pill>
          ))}
        </View>
        <Grid cols={2}>
          <Card onPress={() => setSheet('time')}><T s m>{startTimeLabel}</T><H2>{timeLabel(t, time)}</H2></Card>
          <Card onPress={() => setSheet('len')}><T s m>{eachVisitLabel}</T><H2>{fmtMin(len, t)}</H2></Card>
        </Grid>
        <Card row>
          <Lft style={styles.grow}>
            <Avatar face={helper.face} />
            <View style={styles.grow}><H2>{helperName}</H2><T s m>{t('Your regular helper', 'आपका रोज़ का हेल्पर', 'ਤੁਹਾਡਾ ਰੋਜ਼ ਦਾ ਹੈਲਪਰ')}</T></View>
          </Lft>
          <Link onPress={() => setSheet('helper')}>{t('Change', 'बदलें', 'ਬਦਲੋ')}</Link>
        </Card>
        <Card style={styles.bill}>
          <KeyValue label={t(`${visits} visits × ${rupees(each)}`, `${visits} विज़िट × ${rupees(each)}`, `${visits} ਵਿਜ਼ਿਟਾਂ × ${rupees(each)}`)} value={rupees(sub)} />
          <KeyValue label={t(`Plan saving ${savingPct}%`, `प्लान की बचत ${savingPct}%`, `ਪਲਾਨ ਦੀ ਬੱਚਤ ${savingPct}%`)} value={`− ${rupees(saving)}`} valueTone="accent" />
          <Hr />
          <KeyValue variant="total" label={t('Per month', 'हर महीने', 'ਹਰ ਮਹੀਨੇ')} value={rupees(perMonth)} />
        </Card>
        <T s m>
          {t(
            'Skip a day or pause the plan any time, free until 9 pm the night before.',
            'कोई दिन छोड़ें या प्लान कभी भी रोकें, एक रात पहले 9 बजे तक मुफ़्त।',
            'ਕੋਈ ਦਿਨ ਛੱਡੋ ਜਾਂ ਪਲਾਨ ਕਦੇ ਵੀ ਰੋਕੋ, ਇੱਕ ਰਾਤ ਪਹਿਲਾਂ 9 ਵਜੇ ਤੱਕ ਮੁਫ਼ਤ।',
          )}
        </T>
        <Spacer />
        <Button disabled={!perWeek} onPress={start}>{t('Start plan', 'प्लान शुरू करें', 'ਪਲਾਨ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
      </Screen>
      <PickSheet visible={sheet === 'time'} title={startTimeLabel} value={time} onClose={close} onPick={setTime} closeLabel={closeLabel}
        options={PLAN_TIMES.map((v) => ({ v, label: timeLabel(t, v) }))} />
      <PickSheet visible={sheet === 'len'} title={eachVisitLabel} value={len} onClose={close} onPick={setLen} closeLabel={closeLabel}
        options={PLAN_LENGTHS.map((v) => ({ v, label: `${fmtMin(v, t)} · ${rupees(priceFor('general', v))}` }))} />
      <Sheet visible={sheet === 'helper'} onClose={close}>
        <H2>{t('Choose your regular helper', 'अपना रोज़ का हेल्पर चुनें', 'ਆਪਣਾ ਰੋਜ਼ ਦਾ ਹੈਲਪਰ ਚੁਣੋ')}</H2>
        {PLAN_HELPERS.map((h) => (
          <Card key={h.id} row sel={h.id === helper.id} onPress={() => { setHelper(h); close(); }}>
            <Lft style={styles.grow}><Avatar face={h.face} size={32} /><H2 style={styles.grow}>{tri(h.name)}</H2></Lft>
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
