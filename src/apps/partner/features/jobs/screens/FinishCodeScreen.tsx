/** Design page 30 (section 100), screen 42 · Finish code. Same screen for both codes: the partner is never told which is which. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { codes } from '@/domain';
import {
  Button, Card, H, H2, Icon, Lft, OtpInput, Page, Row, Screen, Spacer, StatusIcon, T, Tag, TopBar, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { useFinishCode } from '../hooks/useFinishCode';
import { firstNameT, personName, placeName } from '../job';
import { useJobsState } from '../state';

export function FinishCodeScreen({ params }: ScreenProps<{ code?: string }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useJobsState();
  const job = st.job;
  const { code, type, err, tries, left, locked, check } = useFinishCode(params.code);
  const customer = personName(t, job.customer);
  const callSupport = () => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल…', 'Saathi ਸਪੋਰਟ ਨੂੰ ਕਾਲ…'));

  if (locked) {
    return (
      <Page>
        <TopBar><Row><TopBar.Heading>{t('Finish job', 'काम खत्म करें', 'ਕੰਮ ਖ਼ਤਮ ਕਰੋ')}</TopBar.Heading><Tag>{customer}</Tag></Row></TopBar>
        <Screen>
          <StatusIcon name="shield" tone="red" />
          <H center>{t('Only support can finish this job', 'अब सिर्फ़ सपोर्ट यह काम खत्म कर सकता है', 'ਹੁਣ ਸਿਰਫ਼ ਸਪੋਰਟ ਇਹ ਕੰਮ ਖ਼ਤਮ ਕਰ ਸਕਦਾ ਹੈ')}</H>
          <T m center>{t(`${codes.maxTries} wrong codes were typed. Support will call ${firstNameT(t, st)} and close the job with you.`, `${codes.maxTries} बार गलत कोड डाला गया। सपोर्ट ${firstNameT(t, st)} को कॉल करके आपके साथ काम बंद करेगा।`, `${codes.maxTries} ਵਾਰ ਗ਼ਲਤ ਕੋਡ ਪਾਇਆ ਗਿਆ। ਸਪੋਰਟ ${firstNameT(t, st)} ਨੂੰ ਕਾਲ ਕਰਕੇ ਤੁਹਾਡੇ ਨਾਲ ਕੰਮ ਬੰਦ ਕਰੇਗਾ।`)}</T>
          <Spacer />
          <Button size="tall" icon="call" onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें', 'ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
        </Screen>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar><Row><TopBar.Heading>{t('Finish job', 'काम खत्म करें', 'ਕੰਮ ਖ਼ਤਮ ਕਰੋ')}</TopBar.Heading><Tag>{err ? customer : t('10:02 to 11:00', '10:02 से 11:00', '10:02 ਤੋਂ 11:00')}</Tag></Row></TopBar>
      <Screen>
        {!err && (
          <Card row>
            <Lft style={styles.fill}>
              <Icon name="pin" color={c.accent} />
              <View style={styles.fill}><H2>{placeName(t, job.address)}</H2><T s m>{customer} · {t(`${job.minutes / 60} hr job · 58 min worked`, `${job.minutes / 60} घंटे का काम · 58 मिनट किया`, `${job.minutes / 60} ਘੰਟੇ ਦਾ ਕੰਮ · 58 ਮਿੰਟ ਕੀਤਾ`)}</T></View>
            </Lft>
          </Card>
        )}
        <H style={{ marginTop: 8 }}>{t('Ask the customer for their finish code', 'ग्राहक से उनका फ़िनिश कोड पूछें', 'ਗਾਹਕ ਤੋਂ ਉਹਨਾਂ ਦਾ ਫ਼ਿਨਿਸ਼ ਕੋਡ ਪੁੱਛੋ')}</H>
        <OtpInput value={code} error={err} onChange={type} />
        {err ? <>
          <Card style={{ borderColor: c.red }}><T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `यह कोड मेल नहीं खाता। ${left} कोशिश बाकी।`, `ਇਹ ਕੋਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ। ${left} ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ।`)}</T></Card>
          <T s m>{t(`After ${codes.maxTries} wrong codes the job can only be finished by support. Start codes have their own 5 tries.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट खत्म कर सकता है। स्टार्ट कोड की अपनी 5 कोशिशें हैं।`, `${codes.maxTries} ਗ਼ਲਤ ਕੋਡਾਂ ਤੋਂ ਬਾਅਦ ਕੰਮ ਸਿਰਫ਼ ਸਪੋਰਟ ਖ਼ਤਮ ਕਰ ਸਕਦਾ ਹੈ। ਸਟਾਰਟ ਕੋਡ ਦੀਆਂ ਆਪਣੀਆਂ 5 ਕੋਸ਼ਿਸ਼ਾਂ ਹਨ।`)}</T>
        </> : <T s m>{t('The customer has two codes in their app. Type the one they give you.', 'ग्राहक के ऐप में दो कोड हैं। जो कोड वे दें, वही डालें।', 'ਗਾਹਕ ਦੇ ਐਪ ਵਿੱਚ ਦੋ ਕੋਡ ਹਨ। ਜਿਹੜਾ ਕੋਡ ਉਹ ਦੇਣ, ਉਹੀ ਪਾਓ।')}</T>}
        <Spacer />
        <Button size="tall" disabled={code.length < 4 || err} onPress={check}>{t('Finish job', 'काम खत्म करें', 'ਕੰਮ ਖ਼ਤਮ ਕਰੋ')}</Button>
        {tries > 0
          ? <Button variant="plain" onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें', 'ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
          : <Button variant="plain" onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${customer} को कॉल (नंबर छुपा)`, `${customer} ਨੂੰ ਕਾਲ (ਨੰਬਰ ਲੁਕਿਆ)`))}>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं', 'ਗਾਹਕ ਘਰ ਨਹੀਂ ਹਨ')}</Button>}
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default FinishCodeScreen;
