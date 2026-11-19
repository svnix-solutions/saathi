/** Design page 37 · Saathi Care — screen 37.8 · Start date and time; a plan shows every visit booked up front. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, ChipGroup, Grid, H2, Icon, Lft, Link, Pill, Row, Screen, Spacer, Steps, T, useNav, useT, useTheme } from '@/native/ui';
import { clockTime } from '@/domain';
import { useCareDraft } from '../state';
import { DayToggles } from '../components/DayToggles';
import { CARE_HOURS, START_DAYS, dateLabel } from '../data';
import { isDaily, stepOf, usesWeekdays, visitCount, visitDates } from '../rules';

/** Visits listed before "Show all". */
const FIRST = 6;

export function ScheduleScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const { draft, setDraft } = useCareDraft();
  const [all, setAll] = useState(false);
  const dates = visitDates(draft);
  const n = visitCount(draft);
  const weekly = usesWeekdays(draft);
  const daily = isDaily(draft);
  const shown = all ? dates : dates.slice(0, FIRST);
  const last = dates[dates.length - 1];
  const ok = !weekly || draft.weekdays.length > 0;
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('When should we come?', 'हम कब आएँ?', 'ਅਸੀਂ ਕਦੋਂ ਆਈਏ?')} fallback="care.home" />
        <Steps {...stepOf(draft, 'care.schedule')} label={t('Date and time', 'तारीख़ और समय', 'ਤਾਰੀਖ਼ ਅਤੇ ਸਮਾਂ')} />
        <H2>{weekly || daily ? t('Start on', 'कब से शुरू करें', 'ਕਦੋਂ ਤੋਂ ਸ਼ੁਰੂ ਕਰੀਏ') : t('Day', 'दिन', 'ਦਿਨ')}</H2>
        <ChipGroup accessibilityLabel={t('Start date', 'शुरू की तारीख़', 'ਸ਼ੁਰੂ ਦੀ ਤਾਰੀਖ਼')} value={String(draft.startDay)} onChange={(k) => setDraft({ startDay: Number(k) })}
          items={START_DAYS.map((d, i) => ({ key: String(i), label: dateLabel(t, d, true) }))} />
        <H2>{t('Time', 'समय', 'ਸਮਾਂ')}</H2>
        <Grid cols={device === 'small' ? 2 : 3}>
          {CARE_HOURS.map((h) => <Pill key={h} s sel={draft.hour === h} onPress={() => setDraft({ hour: h })}>{clockTime(t, h)}</Pill>)}
        </Grid>
        {weekly && <>
          <H2>{t('Visit days', 'विज़िट के दिन', 'ਵਿਜ਼ਿਟ ਦੇ ਦਿਨ')}</H2>
          <DayToggles value={draft.weekdays} onChange={(weekdays) => setDraft({ weekdays })} />
          <T s m>{!ok
            ? t('Pick at least one day.', 'कम से कम एक दिन चुनें।', 'ਘੱਟੋ-ਘੱਟ ਇੱਕ ਦਿਨ ਚੁਣੋ।')
            : t(`${draft.weekdays.length} visits a week. Most patients do best with 3.`, `हफ़्ते में ${draft.weekdays.length} विज़िट। ज़्यादातर मरीज़ों के लिए 3 सबसे अच्छा।`, `ਹਫ਼ਤੇ ਵਿੱਚ ${draft.weekdays.length} ਵਿਜ਼ਿਟਾਂ। ਜ਼ਿਆਦਾਤਰ ਮਰੀਜ਼ਾਂ ਲਈ 3 ਸਭ ਤੋਂ ਵਧੀਆ।`)}</T>
        </>}
        {n > 1 && ok && (
          <Card style={styles.list}>
            <Row>
              <H2 style={styles.grow}>{t(`All ${n} visits booked up front`, `सारी ${n} विज़िट पहले से बुक`, `ਸਾਰੀਆਂ ${n} ਵਿਜ਼ਿਟਾਂ ਪਹਿਲਾਂ ਤੋਂ ਬੁੱਕ`)}</H2>
            </Row>
            {daily && !all
              ? <T s>{t(`Every day from ${dateLabel(t, dates[0])} to ${dateLabel(t, last)}`, `हर दिन, ${dateLabel(t, dates[0])} से ${dateLabel(t, last)} तक`, `ਹਰ ਦਿਨ, ${dateLabel(t, dates[0])} ਤੋਂ ${dateLabel(t, last)} ਤੱਕ`)}</T>
              : shown.map((d, i) => (
                <Lft key={d.getTime()}>
                  <T s b style={[styles.num, { color: c.accent }]}>{i + 1}</T>
                  <T s style={styles.grow}>{dateLabel(t, d, true)}</T>
                  <T s m>{clockTime(t, draft.hour)}</T>
                </Lft>
              ))}
            {dates.length > FIRST && (
              <Link onPress={() => setAll(!all)}>{all ? t('Show less', 'कम दिखाएँ', 'ਘੱਟ ਵਿਖਾਓ') : daily ? t('Show every day', 'हर दिन दिखाएँ', 'ਹਰ ਦਿਨ ਵਿਖਾਓ') : t(`Show all ${n}`, `सभी ${n} दिखाएँ`, `ਸਾਰੀਆਂ ${n} ਵਿਖਾਓ`)}</Link>
            )}
          </Card>
        )}
        <Lft style={styles.top}>
          <Icon name="clock" size={16} color={c.accent} />
          <T s m style={styles.grow}>{t('You can move or skip any visit later from your plan page.', 'बाद में प्लान पेज से कोई भी विज़िट बदल या छोड़ सकते हैं।', 'ਬਾਅਦ ਵਿੱਚ ਪਲਾਨ ਪੇਜ ਤੋਂ ਕੋਈ ਵੀ ਵਿਜ਼ਿਟ ਬਦਲ ਜਾਂ ਛੱਡ ਸਕਦੇ ਹੋ।')}</T>
        </Lft>
        <Spacer />
        <Button disabled={!ok} onPress={() => nav.push('care.confirm')}>{t('Review and pay', 'देखें और भुगतान करें', 'ਵੇਖੋ ਅਤੇ ਭੁਗਤਾਨ ਕਰੋ')}</Button>
      </Screen>
    </View>
  );
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  root: { flex: 1 }, grow: { flex: 1 }, top: { alignItems: 'flex-start' },
  list: { gap: 7 },
  num: { minWidth: 18 },
});
