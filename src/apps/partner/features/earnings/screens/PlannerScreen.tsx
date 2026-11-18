import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Button, Card, Col, Grid, H2, Lft, ListCard, Page, Pill, ProgressBar, Row, Screen, Sheet, Spacer, T, Toggle, TopBar,
  useNav, useT, useTheme,
} from '@/native/ui';
import { rupees } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { SlotCheck } from '../components/SlotCheck';
import { PER_HOUR, earnedThisWeek, extraHourChoices, goalChoices, plannedEarnings, plannerSlots } from '../data';

/** Design page 30 · screen 50: weekly earnings goal and the best times to work to reach it. */
export function PlannerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
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
        <TopBar.Text dim>{t('My goal this week', 'इस हफ़्ते का लक्ष्य')}</TopBar.Text>
        <TopBar.Title size={26}>{rupees(goal)}</TopBar.Title>
        <ProgressBar value={earned / goal} extra={planned / goal} style={{ marginTop: 10 }} />
        <TopBar.Text dim style={{ marginTop: 4 }}>{rupees(earned)} earned · {toGo ? `${rupees(toGo)} to go` : 'goal reached'}</TopBar.Text>
      </TopBar>
      <Screen>
        <Card sel={reach} tone={reach ? undefined : 'red'}>
          <H2>{reach ? t('You can reach it', 'आप पहुँच सकती हैं') : `${rupees(goal - projected)} short with this plan`}</H2>
          <T s m>{reach ? `About ${jobs} more jobs, at the pace you usually work.` : 'Pick another time below or add hours.'} Plan: about {rupees(projected)}.</T>
        </Card>
        <H2>{t('Best times for you', 'आपके लिए सबसे अच्छा समय')}</H2>
        <ListCard gap={9}>
          {plannerSlots.map((s) => {
            const on = picked.includes(s.id);
            return (
              <Pressable key={s.id} onPress={() => toggle(s.id)} accessibilityRole="checkbox" accessibilityState={{ checked: on }}>
                <Row>
                  <Lft gap={7}>
                    <SlotCheck on={on} />
                    <T m={!on}>{s.label}</T>
                  </Lft>
                  <T b color={on ? c.accent : c.mut}>about ₹{s.amt}</T>
                </Row>
              </Pressable>
            );
          })}
        </ListCard>
        <Row><H2>Extra hours on weekdays</H2><T s m>about ₹{extraHrs * PER_HOUR}</T></Row>
        <Grid cols={4} gap={6}>
          {extraHourChoices.map((h) => <Pill key={h} s sel={extraHrs === h} onPress={() => setExtraHrs(h)}>{h} hr</Pill>)}
        </Grid>
        <Card row>
          <View style={styles.grow}><H2>Remind me before these times</H2><T s m>A message 30 min before</T></View>
          <Toggle on={remind} onChange={(v) => { setRemind(v); nav.toast(v ? 'Reminders on' : 'Reminders off'); }} />
        </Card>
        <Spacer />
        <Button variant="outline" onPress={() => setSheet(true)}>{t('Change my goal', 'लक्ष्य बदलें')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Weekly goal', 'हफ़्ते का लक्ष्य')}</H2>
        <Grid cols={4} gap={6}>
          {goalChoices.map((g) => <Pill key={g} s sel={goal === g} onPress={() => setGoal(g)}>{rupees(g)}</Pill>)}
        </Grid>
        <Col gap={2}><T s m>{t('Your usual week is about ₹3,800.', 'आपका आम हफ़्ता लगभग ₹3,800 का है।')}</T></Col>
        <Button onPress={() => { setSheet(false); nav.toast(`Goal set to ${rupees(goal)}`); }}>{t('Save goal', 'लक्ष्य सेव करें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
});

export default PlannerScreen;
