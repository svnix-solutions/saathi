/** Design page 20 (section 4), screen 11 · On the job. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { leftLabel } from '@/domain';
import { Card, H2, Icon, IconTile, Lft, Page, Row, Screen, Spacer, T, Tag, TopBar, palette, useNav, useT, useTheme } from '@/native/ui';
import { useJobClock } from '../../../state';
import { FinishButton } from '../components/FinishButton';
import { TaskList } from '../components/TaskList';
import { newJob, newJobNoteHi } from '../data';
import { hoursLabel, serviceTitle } from '../job';
import { useJobsState } from '../state';

export function OnJobScreen() {
  const t = useT();
  const nav = useNav();
  const { c, locale } = useTheme();
  const [st] = useJobsState();
  const left = useJobClock();
  const hi = locale === 'hi';
  const job = st.job;
  return (
    <Page>
      <TopBar>
        <Row><TopBar.Heading>{serviceTitle(t, job.service)} · {hoursLabel(t, job.minutes)}</TopBar.Heading><Tag>{leftLabel(left, hi)}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Pressable style={styles.place} onPress={() => nav.push('live')} accessibilityRole="button">
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>{job.customer}</T></View>
          </Pressable>
          <IconTile name="call" onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${job.customer} को कॉल (नंबर छुपा)`))} />
        </Card>
        <Card tone="yellow">
          <T s b color={palette.ink}>{t('Customer note', 'ग्राहक का संदेश')}</T>
          <T color={palette.ink}>{t(job.note, job.note === newJob.note ? newJobNoteHi : job.note)}</T>
        </Card>
        <Row>
          <H2>{t('Tasks', 'काम')}</H2>
          <Lft gap={14}>
            <Pressable onPress={() => nav.push('live')} accessibilityRole="button"><T s b color={c.accent}>{t('Live', 'लाइव')}</T></Pressable>
            <Pressable onPress={() => nav.push('help')} accessibilityRole="button"><T s b color={c.accent}>{t('Help', 'मदद')}</T></Pressable>
          </Lft>
        </Row>
        <TaskList />
        <Spacer />
        <FinishButton label="Finish job" labelHi="काम खत्म करें" />
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ place: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 } });

export default OnJobScreen;
