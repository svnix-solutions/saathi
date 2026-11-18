/** Design page 23 (section 59), screen 22 · No internet on the job: work is saved and sent later. */
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { serviceNamesHiByTitle, serviceNamesPaByTitle, timeLeft } from '@/domain';
import { Card, H2, Page, Row, Screen, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { useJobClock } from '../../../state';
import { FinishButton, TaskList, useJobsState } from '../../jobs';

export function OfflineScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useJobsState();
  const [back, setBack] = useState(false);
  const left = useJobClock();
  const job = st.job;
  const reconnect = () => { setBack(true); nav.toast(t('Internet is back. 2 photos and 1 tick sent.', 'इंटरनेट वापस आया। 2 फ़ोटो और 1 टिक भेजे।', 'ਇੰਟਰਨੈੱਟ ਵਾਪਸ ਆ ਗਿਆ। 2 ਫ਼ੋਟੋਆਂ ਅਤੇ 1 ਟਿੱਕ ਭੇਜੇ।')); };
  return (
    <Page>
      <Pressable onPress={reconnect} style={[styles.banner, { backgroundColor: back ? palette.green : palette.ink }]} accessibilityRole="button">
        <T s b color={palette.white}>{back ? t('Back online. Everything is sent.', 'फिर से ऑनलाइन। सब भेज दिया।', 'ਮੁੜ ਆਨਲਾਈਨ। ਸਭ ਭੇਜ ਦਿੱਤਾ।') : t('No internet. Your work is being saved.', 'इंटरनेट नहीं है। आपका काम सेव हो रहा है।', 'ਇੰਟਰਨੈੱਟ ਨਹੀਂ ਹੈ। ਤੁਹਾਡਾ ਕੰਮ ਸੇਵ ਹੋ ਰਿਹਾ ਹੈ।')}</T>
      </Pressable>
      <Screen>
        <Row><H2 style={styles.shrink}>{t(job.service, serviceNamesHiByTitle[job.service], serviceNamesPaByTitle[job.service])} · {t(job.minutes / 60 + ' hr', job.minutes / 60 + ' घंटा', job.minutes / 60 + ' ਘੰਟਾ')}</H2><Tag>{timeLeft(t, left)}</Tag></Row>
        <TaskList gap={13} />
        <Card sel><T s><T s b>{t('Carry on working.', 'काम जारी रखें।', 'ਕੰਮ ਜਾਰੀ ਰੱਖੋ।')}</T> {t('Your check-in time, ticks and photos are kept on the phone and sent when the internet comes back.', 'चेक-इन का समय, टिक और फ़ोटो फ़ोन में रखे हैं और इंटरनेट आने पर भेजे जाएँगे।', 'ਚੈੱਕ-ਇਨ ਦਾ ਸਮਾਂ, ਟਿੱਕ ਅਤੇ ਫ਼ੋਟੋਆਂ ਫ਼ੋਨ ਵਿੱਚ ਰੱਖੀਆਂ ਹਨ ਅਤੇ ਇੰਟਰਨੈੱਟ ਆਉਣ ਉੱਤੇ ਭੇਜੀਆਂ ਜਾਣਗੀਆਂ।')}</T></Card>
        <Card row><T>{t('Waiting to send', 'भेजना बाकी', 'ਭੇਜਣਾ ਬਾਕੀ')}</T><T b>{back ? t('Nothing', 'कुछ नहीं', 'ਕੁਝ ਨਹੀਂ') : t('2 photos · 1 tick', '2 फ़ोटो · 1 टिक', '2 ਫ਼ੋਟੋਆਂ · 1 ਟਿੱਕ')}</T></Card>
        <Spacer />
        {/* FinishButton translates with t(label, labelHi) only; passing the already-translated text gives Punjabi too. */}
        <FinishButton label={t('Finish job', 'काम खत्म करें', 'ਕੰਮ ਪੂਰਾ ਕਰੋ')} labelHi={t('Finish job', 'काम खत्म करें', 'ਕੰਮ ਪੂਰਾ ਕਰੋ')} />
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ banner: { paddingVertical: 10, paddingHorizontal: 16 }, shrink: { flexShrink: 1 } });

export default OfflineScreen;
