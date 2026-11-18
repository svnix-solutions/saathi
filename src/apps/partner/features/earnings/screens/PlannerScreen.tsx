import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Button, Card, Col, Grid, H2, Lft, ListCard, Page, Pill, ProgressBar, Row, Screen, Sheet, Spacer, T, Toggle, TopBar,
  useNav, useT, useTheme,
} from '@/native/ui';
import { rupees } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { SlotCheck } from '../components/SlotCheck';
import { PER_HOUR, earnedThisWeek, extraHourChoices, goalChoices, plannedEarnings, plannerSlots, tx } from '../data';

/** Design page 30 · screen 50: weekly earnings goal and the best times to work to reach it. */
export function PlannerScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [goal, setGoal] = useState(4000);
  const [picked, setPicked] = useState<string[]>(['sat-am', 'sun-am']);
  const [extraHrs, setExtraHrs] = useState(2);
  const [remind, setRemind] = useState(true);
  const [sheet, setSheet] = useState(false);
  const earned = earnedThisWeek;
  const toGo = Math.max(0, goal - earned);
  const planned = plannedEarnings(picked, extraHrs);
  const projected = earned + planned;
  const reach = projected >= goal;
  const jobs = Math.ceil(toGo / 165);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Text dim>{t('My goal this week', 'इस हफ़्ते का लक्ष्य', 'ਇਸ ਹਫ਼ਤੇ ਦਾ ਟੀਚਾ')}</TopBar.Text>
        <TopBar.Title size={26}>{rupees(goal)}</TopBar.Title>
        <ProgressBar value={earned / goal} extra={planned / goal} style={{ marginTop: 10 }} />
        <TopBar.Text dim style={{ marginTop: 4 }}>
          {toGo
            ? t(`${rupees(earned)} earned · ${rupees(toGo)} to go`, `${rupees(earned)} कमाए · ${rupees(toGo)} बाकी`, `${rupees(earned)} ਕਮਾਏ · ${rupees(toGo)} ਬਾਕੀ`)
            : t(`${rupees(earned)} earned · goal reached`, `${rupees(earned)} कमाए · लक्ष्य पूरा`, `${rupees(earned)} ਕਮਾਏ · ਟੀਚਾ ਪੂਰਾ`)}
        </TopBar.Text>
      </TopBar>
      <Screen>
        <Card sel={reach} tone={reach ? undefined : 'red'}>
          <H2>{reach ? t('You can reach it', 'आप पहुँच सकती हैं', 'ਤੁਸੀਂ ਪਹੁੰਚ ਸਕਦੇ ਹੋ') : t(`${rupees(goal - projected)} short with this plan`, `इस प्लान से ${rupees(goal - projected)} कम`, `ਇਸ ਪਲਾਨ ਨਾਲ ${rupees(goal - projected)} ਘੱਟ`)}</H2>
          <T s m>
            {reach
              ? t(`About ${jobs} more jobs, at the pace you usually work.`, `आपकी आम रफ़्तार से लगभग ${jobs} काम और।`, `ਤੁਹਾਡੀ ਆਮ ਰਫ਼ਤਾਰ ਨਾਲ ਲਗਭਗ ${jobs} ਕੰਮ ਹੋਰ।`)
              : t('Pick another time below or add hours.', 'नीचे कोई और समय चुनें या घंटे जोड़ें।', 'ਹੇਠਾਂ ਕੋਈ ਹੋਰ ਸਮਾਂ ਚੁਣੋ ਜਾਂ ਘੰਟੇ ਜੋੜੋ।')}
            {' '}{t(`Plan: about ${rupees(projected)}.`, `प्लान: लगभग ${rupees(projected)}।`, `ਪਲਾਨ: ਲਗਭਗ ${rupees(projected)}।`)}
          </T>
        </Card>
        <H2>{t('Best times for you', 'आपके लिए सबसे अच्छा समय', 'ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ')}</H2>
        <ListCard gap={9}>
          {plannerSlots.map((s) => {
            const on = picked.includes(s.id);
            return (
              <Pressable key={s.id} onPress={() => toggle(s.id)} accessibilityRole="checkbox" accessibilityState={{ checked: on }}>
                <Row>
                  <Lft gap={7} style={styles.grow}>
                    <SlotCheck on={on} />
                    <T m={!on} style={styles.grow}>{tx(t, s.label)}</T>
                  </Lft>
                  <T b color={on ? c.accent : c.mut}>{t(`about ₹${s.amt}`, `लगभग ₹${s.amt}`, `ਲਗਭਗ ₹${s.amt}`)}</T>
                </Row>
              </Pressable>
            );
          })}
        </ListCard>
        <Row><H2 style={styles.grow}>{t('Extra hours on weekdays', 'हफ़्ते के दिनों में और घंटे', 'ਹਫ਼ਤੇ ਦੇ ਦਿਨਾਂ ਵਿੱਚ ਹੋਰ ਘੰਟੇ')}</H2><T s m>{t(`about ₹${extraHrs * PER_HOUR}`, `लगभग ₹${extraHrs * PER_HOUR}`, `ਲਗਭਗ ₹${extraHrs * PER_HOUR}`)}</T></Row>
        <Grid cols={4} gap={6}>
          {extraHourChoices.map((h) => <Pill key={h} s sel={extraHrs === h} onPress={() => setExtraHrs(h)}>{t(`${h} hr`, `${h} घंटे`, `${h} ਘੰਟੇ`)}</Pill>)}
        </Grid>
        <Card row>
          <View style={styles.grow}><H2>{t('Remind me before these times', 'इन समय से पहले याद दिलाएँ', 'ਇਨ੍ਹਾਂ ਸਮਿਆਂ ਤੋਂ ਪਹਿਲਾਂ ਯਾਦ ਕਰਾਓ')}</H2><T s m>{t('A message 30 min before', '30 मिनट पहले एक मैसेज', '30 ਮਿੰਟ ਪਹਿਲਾਂ ਇੱਕ ਮੈਸੇਜ')}</T></View>
          <Toggle on={remind} onChange={(v) => { setRemind(v); nav.toast(v ? t('Reminders on', 'याद दिलाना चालू', 'ਯਾਦ ਕਰਾਉਣਾ ਚਾਲੂ') : t('Reminders off', 'याद दिलाना बंद', 'ਯਾਦ ਕਰਾਉਣਾ ਬੰਦ')); }} />
        </Card>
        <Spacer />
        <Button variant="outline" onPress={() => setSheet(true)}>{t('Change my goal', 'लक्ष्य बदलें', 'ਟੀਚਾ ਬਦਲੋ')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Weekly goal', 'हफ़्ते का लक्ष्य', 'ਹਫ਼ਤੇ ਦਾ ਟੀਚਾ')}</H2>
        <Grid cols={device === 'small' ? 2 : 4} gap={6}>
          {goalChoices.map((g) => <Pill key={g} s sel={goal === g} onPress={() => setGoal(g)}>{rupees(g)}</Pill>)}
        </Grid>
        <Col gap={2}><T s m>{t('Your usual week is about ₹3,800.', 'आपका आम हफ़्ता लगभग ₹3,800 का है।', 'ਤੁਹਾਡਾ ਆਮ ਹਫ਼ਤਾ ਲਗਭਗ ₹3,800 ਦਾ ਹੁੰਦਾ ਹੈ।')}</T></Col>
        <Button onPress={() => { setSheet(false); nav.toast(t(`Goal set to ${rupees(goal)}`, `लक्ष्य ${rupees(goal)} रखा गया`, `ਟੀਚਾ ${rupees(goal)} ਰੱਖਿਆ ਗਿਆ`)); }}>{t('Save goal', 'लक्ष्य सेव करें', 'ਟੀਚਾ ਸੇਵ ਕਰੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
});

export default PlannerScreen;
