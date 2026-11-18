/** Design page 30 (section 100), screen 42 · Finish code. Same screen for both codes: the partner is never told which is which. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { codes } from '@/domain';
import {
  Button, Card, H, H2, Icon, Lft, OtpInput, Page, Row, Screen, Spacer, StatusIcon, T, Tag, TopBar, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { useFinishCode } from '../hooks/useFinishCode';
import { firstName } from '../job';
import { useJobsState } from '../state';

export function FinishCodeScreen({ params }: ScreenProps<{ code?: string }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useJobsState();
  const job = st.job;
  const { code, type, err, tries, left, locked, check } = useFinishCode(params.code);
  const callSupport = () => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल…'));

  if (locked) {
    return (
      <Page>
        <TopBar><Row><TopBar.Heading>{t('Finish job', 'काम खत्म करें')}</TopBar.Heading><Tag>{job.customer}</Tag></Row></TopBar>
        <Screen>
          <StatusIcon name="shield" tone="red" />
          <H center>{t('Only support can finish this job', 'अब सिर्फ़ सपोर्ट यह काम खत्म कर सकता है')}</H>
          <T m center>{t(`${codes.maxTries} wrong codes were typed. Support will call ${firstName(st)} and close the job with you.`, `${codes.maxTries} बार गलत कोड डाला गया। सपोर्ट ${firstName(st)} को कॉल करके आपके साथ काम बंद करेगा।`)}</T>
          <Spacer />
          <Button size="tall" icon="call" onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
        </Screen>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar><Row><TopBar.Heading>{t('Finish job', 'काम खत्म करें')}</TopBar.Heading><Tag>{err ? job.customer : t('10:02 to 11:00', '10:02 से 11:00')}</Tag></Row></TopBar>
      <Screen>
        {!err && (
          <Card row>
            <Lft style={styles.fill}>
              <Icon name="pin" color={c.accent} />
              <View><H2>{job.address}</H2><T s m>{job.customer} · {t(`${job.minutes / 60} hr job · 58 min worked`, `${job.minutes / 60} घंटे का काम · 58 मिनट किया`)}</T></View>
            </Lft>
          </Card>
        )}
        <H style={{ marginTop: 8 }}>{t('Ask the customer for their finish code', 'ग्राहक से उनका फ़िनिश कोड पूछें')}</H>
        <OtpInput value={code} error={err} onChange={type} />
        {err ? <>
          <Card style={{ borderColor: c.red }}><T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `यह कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T></Card>
          <T s m>{t(`After ${codes.maxTries} wrong codes the job can only be finished by support. Start codes have their own 5 tries.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट खत्म कर सकता है। स्टार्ट कोड की अपनी 5 कोशिशें हैं।`)}</T>
        </> : <T s m>{t('The customer has two codes in their app. Type the one they give you.', 'ग्राहक के ऐप में दो कोड हैं। जो कोड वे दें, वही डालें।')}</T>}
        <Spacer />
        <Button size="tall" disabled={code.length < 4 || err} onPress={check}>{t('Finish job', 'काम खत्म करें')}</Button>
        {tries > 0
          ? <Button variant="plain" onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
          : <Button variant="plain" onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${job.customer} को कॉल (नंबर छुपा)`))}>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}</Button>}
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default FinishCodeScreen;
