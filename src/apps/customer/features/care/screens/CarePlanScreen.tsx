/** Design page 37 · Saathi Care — screen 37.10 · My care plan: progress, the physio or nurse, next visit, exercises. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Card, ChipGroup, Grid, H, H2, Icon, Lft, ListCard, MenuRow, Pill, Ring, Row, Screen, Sheet, T, Tag, useNav, useT, useTheme,
} from '@/native/ui';
import { CARE_RESCHEDULE_HOURS, clockTime } from '@/domain';
import { useCareState } from '../state';
import { CareHeader } from '../components/CareHeader';
import { StaffCard } from '../components/StaffCard';
import { CARE_HOURS, CARE_ROUTINE, CARE_STAFF, EXERCISES, START_DAYS, dateLabel, fromIso, iso } from '../data';
import { SAMPLE_PLAN, nextPlanDate, type CarePlan } from '../rules';

/** Upcoming visits listed under the next one. */
const UPCOMING = 4;

export function CarePlanScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [st, set] = useCareState();
  const plan = st.carePlan ?? SAMPLE_PLAN;
  const save = (p: CarePlan) => set({ carePlan: p });
  const [sheet, setSheet] = useState<null | 'move' | 'skip'>(null);
  const physio = plan.kind === 'physio';
  const staff = CARE_STAFF[physio ? 'physio' : 'nurse'];
  const staffName = t(...staff.name);
  const total = plan.visits.length;
  const done = plan.visits.filter((v) => v.done).length;
  const nextIdx = plan.visits.findIndex((v) => !v.done);
  const next = nextIdx >= 0 ? plan.visits[nextIdx] : undefined;
  const later = plan.visits.filter((v, i) => !v.done && i !== nextIdx);
  const taken = new Set(plan.visits.map((v) => v.date));
  const moveDays = START_DAYS.filter((d) => !taken.has(iso(d)) || (next && iso(d) === next.date));
  const [moveDate, setMoveDate] = useState(() => iso(moveDays[0] ?? START_DAYS[0]));
  const [moveHour, setMoveHour] = useState(next?.hour ?? 10);
  const close = () => setSheet(null);
  const openMove = () => { setMoveDate(iso(moveDays[0] ?? START_DAYS[0])); setMoveHour(next?.hour ?? 10); setSheet('move'); };
  const doMove = () => {
    if (nextIdx < 0) return;
    const visits = plan.visits.map((v, i) => (i === nextIdx ? { ...v, date: moveDate, hour: moveHour } : v)).sort((a, b) => a.date.localeCompare(b.date));
    save({ ...plan, visits });
    close();
    const label = `${dateLabel(t, fromIso(moveDate), true)}, ${clockTime(t, moveHour)}`;
    nav.toast(t(`Moved to ${label}. ${staffName} knows.`, `${label} पर बदल दिया। ${staffName} को बता दिया।`, `${label} ਤੇ ਬਦਲ ਦਿੱਤਾ। ${staffName} ਨੂੰ ਦੱਸ ਦਿੱਤਾ।`));
  };
  const skipTo = nextPlanDate(plan);
  const doSkip = () => {
    if (!next) return;
    const visits = [...plan.visits.filter((_, i) => i !== nextIdx), { date: skipTo, hour: next.hour }];
    save({ ...plan, visits, skipped: plan.skipped + 1 });
    close();
    nav.toast(t(`Skipped. Added on ${dateLabel(t, fromIso(skipTo))} instead.`, `छोड़ दी। इसकी जगह ${dateLabel(t, fromIso(skipTo))} को जोड़ी।`, `ਛੱਡ ਦਿੱਤੀ। ਇਸ ਦੀ ਥਾਂ ${dateLabel(t, fromIso(skipTo))} ਨੂੰ ਜੋੜੀ।`));
  };
  const visitLine = (date: string, hour: number) => `${dateLabel(t, fromIso(date), true)} · ${clockTime(t, hour)}`;
  const tasks = physio ? EXERCISES : CARE_ROUTINE;
  return (
    <View style={styles.root}>
      <CareHeader label={t('My care plan', 'मेरा केयर प्लान', 'ਮੇਰਾ ਕੇਅਰ ਪਲਾਨ')} title={t(...plan.title)}
        sub={t(`For ${plan.patient} · ${t(...plan.sub)}`, `${plan.patient} के लिए · ${t(...plan.sub)}`, `${plan.patient} ਲਈ · ${t(...plan.sub)}`)} />
      <Screen>
        <Lft gap={14}>
          <Ring pct={total ? done / total : 0} size={device === 'small' ? 84 : 100}>
            <H size={device === 'small' ? 17 : 20}>{`${done}/${total}`}</H>
            <T s m>{t('done', 'पूरी', 'ਪੂਰੀਆਂ')}</T>
          </Ring>
          <View style={styles.grow}>
            <H2>{t(`${done} of ${total} visits done`, `${total} में से ${done} विज़िट पूरी`, `${total} ਵਿੱਚੋਂ ${done} ਵਿਜ਼ਿਟਾਂ ਪੂਰੀਆਂ`)}</H2>
            <T s m>{t(`${total - done} to go${plan.skipped ? ` · ${plan.skipped} moved to the end` : ''}`, `${total - done} बाकी${plan.skipped ? ` · ${plan.skipped} आख़िर में जोड़ी` : ''}`, `${total - done} ਬਾਕੀ${plan.skipped ? ` · ${plan.skipped} ਅਖੀਰ ਵਿੱਚ ਜੋੜੀ` : ''}`)}</T>
          </View>
        </Lft>
        <StaffCard staff={staff} />
        {next ? (
          <Card tone="mint" style={styles.gap}>
            <Row style={styles.wrap}>
              <T s b color={c.accent}>{t('Next visit', 'अगली विज़िट', 'ਅਗਲੀ ਵਿਜ਼ਿਟ')}</T>
              <Tag tone="g">{t(`Visit ${nextIdx + 1} of ${total}`, `${total} में से ${nextIdx + 1}वीं`, `${total} ਵਿੱਚੋਂ ${nextIdx + 1}ਵੀਂ`)}</Tag>
            </Row>
            <H2>{visitLine(next.date, next.hour)}</H2>
            <T s m>{t(`With ${staffName} · free changes up to ${CARE_RESCHEDULE_HOURS} hours before`, `${staffName} के साथ · ${CARE_RESCHEDULE_HOURS} घंटे पहले तक बदलना मुफ़्त`, `${staffName} ਨਾਲ · ${CARE_RESCHEDULE_HOURS} ਘੰਟੇ ਪਹਿਲਾਂ ਤੱਕ ਬਦਲਣਾ ਮੁਫ਼ਤ`)}</T>
            <Grid cols={device === 'small' ? 1 : 2}>
              <Button variant="outline" onPress={openMove}>{t('Reschedule', 'समय बदलें', 'ਸਮਾਂ ਬਦਲੋ')}</Button>
              <Button variant="outline" onPress={() => setSheet('skip')}>{t('Skip', 'छोड़ें', 'ਛੱਡੋ')}</Button>
            </Grid>
          </Card>
        ) : (
          <Card tone="mint"><H2>{t('All visits done', 'सारी विज़िट पूरी', 'ਸਾਰੀਆਂ ਵਿਜ਼ਿਟਾਂ ਪੂਰੀਆਂ')}</H2>
            <T s m>{t('Book more if your doctor advises it.', 'डॉक्टर कहें तो और बुक करें।', 'ਡਾਕਟਰ ਕਹਿਣ ਤਾਂ ਹੋਰ ਬੁੱਕ ਕਰੋ।')}</T></Card>
        )}
        {later.length > 0 && <>
          <H2>{t('Coming up', 'आगे की विज़िट', 'ਅਗਲੀਆਂ ਵਿਜ਼ਿਟਾਂ')}</H2>
          <ListCard gap={8}>
            {later.slice(0, UPCOMING).map((v) => (
              <Lft key={v.date}><Icon name="clock" size={14} color={c.mut} /><T s style={styles.grow}>{visitLine(v.date, v.hour)}</T></Lft>
            ))}
            {later.length > UPCOMING && <T s m>{t(`and ${later.length - UPCOMING} more, all booked`, `और ${later.length - UPCOMING}, सब बुक`, `ਅਤੇ ${later.length - UPCOMING} ਹੋਰ, ਸਾਰੀਆਂ ਬੁੱਕ`)}</T>}
          </ListCard>
        </>}
        <H2>{physio ? t(`Exercises ${staffName} set`, `${staffName} की बताई कसरत`, `${staffName} ਦੀ ਦੱਸੀ ਕਸਰਤ`) : t('Daily care routine', 'रोज़ की देखभाल', 'ਰੋਜ਼ ਦੀ ਦੇਖਭਾਲ')}</H2>
        <ListCard gap={8}>
          {tasks.map((e) => (
            <View key={e.name[0]}><T b>{t(...e.name)}</T><T s m>{t(...e.reps)}</T></View>
          ))}
        </ListCard>
        <Card pad={false}>
          <MenuRow icon="list" label={t('Last visit notes', 'पिछली विज़िट के नोट्स', 'ਪਿਛਲੀ ਵਿਜ਼ਿਟ ਦੇ ਨੋਟਸ')}
            sub={done ? t('Vitals, pain score, what was done', 'जाँच, दर्द, क्या किया गया', 'ਜਾਂਚ, ਦਰਦ, ਕੀ ਕੀਤਾ ਗਿਆ') : t('After each visit. See a sample', 'हर विज़िट के बाद। नमूना देखें', 'ਹਰ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ। ਨਮੂਨਾ ਵੇਖੋ')}
            onPress={() => nav.push('care.notes')} />
        </Card>
        <Button variant="plain" onPress={() => nav.push('care.home')}>{t('Book more care', 'और देखभाल बुक करें', 'ਹੋਰ ਦੇਖਭਾਲ ਬੁੱਕ ਕਰੋ')}</Button>
      </Screen>
      <Sheet visible={sheet === 'move'} onClose={close}>
        <H2>{t('Move the next visit', 'अगली विज़िट का समय बदलें', 'ਅਗਲੀ ਵਿਜ਼ਿਟ ਦਾ ਸਮਾਂ ਬਦਲੋ')}</H2>
        <T s m>{t(`Same ${physio ? 'physio' : 'nurse'}, free up to ${CARE_RESCHEDULE_HOURS} hours before.`, `वही ${physio ? 'फ़िज़ियो' : 'नर्स'}, ${CARE_RESCHEDULE_HOURS} घंटे पहले तक मुफ़्त।`, `ਉਹੀ ${physio ? 'ਫ਼ਿਜ਼ੀਓ' : 'ਨਰਸ'}, ${CARE_RESCHEDULE_HOURS} ਘੰਟੇ ਪਹਿਲਾਂ ਤੱਕ ਮੁਫ਼ਤ।`)}</T>
        <ChipGroup accessibilityLabel={t('Day', 'दिन', 'ਦਿਨ')} value={moveDate} onChange={setMoveDate}
          items={moveDays.map((d) => ({ key: iso(d), label: dateLabel(t, d, true) }))} />
        <Grid cols={device === 'small' ? 2 : 3}>
          {CARE_HOURS.map((h) => <Pill key={h} s sel={moveHour === h} onPress={() => setMoveHour(h)}>{clockTime(t, h)}</Pill>)}
        </Grid>
        <Button onPress={doMove}>{t('Move visit', 'विज़िट बदलें', 'ਵਿਜ਼ਿਟ ਬਦਲੋ')}</Button>
        <Button variant="plain" onPress={close}>{t('Keep as it is', 'जैसा है रहने दें', 'ਜਿਵੇਂ ਹੈ ਰਹਿਣ ਦਿਓ')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'skip'} onClose={close}>
        <H2>{t('Skip this visit?', 'यह विज़िट छोड़ें?', 'ਇਹ ਵਿਜ਼ਿਟ ਛੱਡਣੀ ਹੈ?')}</H2>
        {next && <T s>{t(
          `${visitLine(next.date, next.hour)} is skipped and nothing is lost: the visit moves to the end of the plan, ${dateLabel(t, fromIso(skipTo))}.`,
          `${visitLine(next.date, next.hour)} की विज़िट छूटेगी, पर पैसा नहीं जाएगा: विज़िट प्लान के आख़िर में, ${dateLabel(t, fromIso(skipTo))} को जुड़ेगी।`,
          `${visitLine(next.date, next.hour)} ਦੀ ਵਿਜ਼ਿਟ ਛੱਡੀ ਜਾਵੇਗੀ, ਪਰ ਪੈਸਾ ਨਹੀਂ ਜਾਵੇਗਾ: ਵਿਜ਼ਿਟ ਪਲਾਨ ਦੇ ਅਖੀਰ ਵਿੱਚ, ${dateLabel(t, fromIso(skipTo))} ਨੂੰ ਜੁੜੇਗੀ।`,
        )}</T>}
        <Button onPress={doSkip}>{t('Skip visit', 'विज़िट छोड़ें', 'ਵਿਜ਼ਿਟ ਛੱਡੋ')}</Button>
        <Button variant="plain" onPress={close}>{t('Keep it', 'रहने दें', 'ਰਹਿਣ ਦਿਓ')}</Button>
      </Sheet>
    </View>
  );
}

export default CarePlanScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, grow: { flex: 1, gap: 2 }, gap: { gap: 8 }, wrap: { flexWrap: 'wrap', rowGap: 4 } });
