/** Design page 23 (section 59), screen 22 · No internet on the job: work is saved and sent later. */
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { leftLabel } from '@/domain';
import { Card, H2, Page, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { useJobClock } from '../../../state';
import { FinishButton, TaskList, hoursLabel, serviceTitle, useJobsState } from '../../jobs';

export function OfflineScreen() {
  const t = useT();
  const nav = useNav();
  const { locale } = useTheme();
  const [st] = useJobsState();
  const [back, setBack] = useState(false);
  const left = useJobClock();
  const hi = locale === 'hi';
  const job = st.job;
  const reconnect = () => { setBack(true); nav.toast(t('Internet is back. 2 photos and 1 tick sent.', 'इंटरनेट वापस आया। 2 फ़ोटो और 1 टिक भेजे।')); };
  return (
    <Page>
      <Pressable onPress={reconnect} style={[styles.banner, { backgroundColor: back ? palette.green : palette.ink }]} accessibilityRole="button">
        <T s b color={palette.white}>{back ? t('Back online. Everything is sent.', 'फिर से ऑनलाइन। सब भेज दिया।') : t('No internet. Your work is being saved.', 'इंटरनेट नहीं है। आपका काम सेव हो रहा है।')}</T>
      </Pressable>
      <Screen>
        <Row><H2>{serviceTitle(t, job.service)} · {hoursLabel(t, job.minutes)}</H2><Tag>{leftLabel(left, hi)}</Tag></Row>
        <TaskList gap={13} />
        <Card sel><T s><T s b>{t('Carry on working.', 'काम जारी रखें।')}</T> {t('Your check-in time, ticks and photos are kept on the phone and sent when the internet comes back.', 'चेक-इन का समय, टिक और फ़ोटो फ़ोन में रखे हैं और इंटरनेट आने पर भेजे जाएँगे।')}</T></Card>
        <Card row><T>{t('Waiting to send', 'भेजना बाकी')}</T><T b>{back ? t('Nothing', 'कुछ नहीं') : t('2 photos · 1 tick', '2 फ़ोटो · 1 टिक')}</T></Card>
        <Spacer />
        <FinishButton label="Finish job" labelHi="काम खत्म करें" />
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ banner: { paddingVertical: 10, paddingHorizontal: 16 } });

export default OfflineScreen;
