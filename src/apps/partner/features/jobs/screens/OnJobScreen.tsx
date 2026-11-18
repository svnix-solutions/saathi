/** Design page 20 (section 4), screen 11 · On the job. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { timeLeft } from '@/domain';
import { Card, H2, Icon, IconTile, Lft, Page, Row, Screen, Spacer, T, Tag, TopBar, palette, useNav, useT, useTheme } from '@/native/ui';
import { useJobClock } from '../../../state';
import { FinishButton } from '../components/FinishButton';
import { TaskList } from '../components/TaskList';
import { newJob, newJobNoteHi, newJobNotePa } from '../data';
import { hoursLabel, personName, placeName, serviceTitle } from '../job';
import { useJobsState } from '../state';

export function OnJobScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useJobsState();
  const left = useJobClock();
  const job = st.job;
  return (
    <Page>
      <TopBar>
        <Row><View style={styles.fill}><TopBar.Heading>{serviceTitle(t, job.service)} · {hoursLabel(t, job.minutes)}</TopBar.Heading></View><Tag>{timeLeft(t, left)}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Pressable style={styles.place} onPress={() => nav.push('live')} accessibilityRole="button">
            <Icon name="pin" color={c.accent} />
            <View style={styles.fill}><H2>{placeName(t, job.address)}</H2><T s m>{personName(t, job.customer)}</T></View>
          </Pressable>
          <IconTile name="call" onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${personName(t, job.customer)} को कॉल (नंबर छुपा)`, `${personName(t, job.customer)} ਨੂੰ ਕਾਲ (ਨੰਬਰ ਲੁਕਿਆ)`))} />
        </Card>
        <Card tone="yellow">
          <T s b color={palette.ink}>{t('Customer note', 'ग्राहक का संदेश', 'ਗਾਹਕ ਦਾ ਸੁਨੇਹਾ')}</T>
          <T color={palette.ink}>{t(job.note, job.note === newJob.note ? newJobNoteHi : job.note, job.note === newJob.note ? newJobNotePa : job.note)}</T>
        </Card>
        <Row>
          <H2>{t('Tasks', 'काम', 'ਕੰਮ')}</H2>
          <Lft gap={14}>
            <Pressable onPress={() => nav.push('live')} accessibilityRole="button"><T s b color={c.accent}>{t('Live', 'लाइव', 'ਲਾਈਵ')}</T></Pressable>
            <Pressable onPress={() => nav.push('help')} accessibilityRole="button"><T s b color={c.accent}>{t('Help', 'मदद', 'ਮਦਦ')}</T></Pressable>
          </Lft>
        </Row>
        <TaskList />
        <Spacer />
        <FinishButton label="Finish job" labelHi="काम खत्म करें" labelPa="ਕੰਮ ਖ਼ਤਮ ਕਰੋ" />
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ place: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }, fill: { flex: 1 } });

export default OnJobScreen;
