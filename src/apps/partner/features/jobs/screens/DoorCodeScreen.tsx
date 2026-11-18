/** Design page 26, screen 34 · Start with the customer's start code at the door. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { codes, decisions, rupees } from '@/domain';
import {
  Button, Card, H, H2, Icon, IconTile, Lft, OtpInput, Page, Row, Screen, Sheet, Spacer, T, Tag, TopBar, palette, useNav, useT, useTheme,
  type ScreenProps,
} from '@/native/ui';
import { initialPartnerState, useStartCode } from '../../../state';
import { lengthEn, personName, placeName } from '../job';
import { useJobsState } from '../state';

export function DoorCodeScreen({ params }: ScreenProps<{ code?: string }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useJobsState();
  const job = st.job ?? initialPartnerState.job;
  const [away, setAway] = useState(false);
  const right = params.code ?? codes.start;
  // same rule and tries as check-in
  const { code, type, wrong: error, left, locked, verify } = useStartCode(right);
  const start = () => {
    if (!verify()) return;
    set({ jobStarted: true });
    nav.toast(t(`Code matches. ${lengthEn(job.minutes)} clock started.`, 'कोड सही है। घड़ी शुरू।', 'ਕੋਡ ਸਹੀ ਹੈ। ਘੜੀ ਸ਼ੁਰੂ।'));
    nav.replace('onJob');
  };
  const customer = personName(t, job.customer);
  const callCustomer = () => nav.toast(t(`Calling ${job.customer}…`, `${customer} को कॉल हो रहा है…`, `${customer} ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…`));
  const tripPay = rupees(decisions.partner.paidOnCustomerCancel);
  return (
    <Page variant="bare">
      <TopBar>
        <Row><H2 color={palette.white} style={styles.fill}>{t('You have arrived', 'आप पहुँच गए', 'ਤੁਸੀਂ ਪਹੁੰਚ ਗਏ')}</H2><Tag>{t('On time', 'समय पर', 'ਸਮੇਂ ਤੇ')}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Lft style={styles.fill}>
            <Icon name="pin" color={c.accent} />
            <View style={styles.fill}><H2>{placeName(t, job.address)}</H2><T s m>{customer} · {t('2nd floor', 'दूसरी मंज़िल', 'ਦੂਜੀ ਮੰਜ਼ਿਲ')}</T></View>
          </Lft>
          <IconTile name="call" onPress={callCustomer} />
        </Card>
        {locked ? <>
          <H style={{ marginTop: 8 }}>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है', 'ਹੁਣ ਇਹ ਕੰਮ ਸਿਰਫ਼ ਸਪੋਰਟ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ')}</H>
          <T m>{t(`${codes.maxTries} wrong start codes were typed. Support will call ${job.customer} and start the job with you.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया। सपोर्ट ${customer} को कॉल करके आपके साथ काम शुरू करेगा।`, `${codes.maxTries} ਵਾਰ ਗ਼ਲਤ ਸਟਾਰਟ ਕੋਡ ਪਾਇਆ ਗਿਆ। ਸਪੋਰਟ ${customer} ਨੂੰ ਕਾਲ ਕਰਕੇ ਤੁਹਾਡੇ ਨਾਲ ਕੰਮ ਸ਼ੁਰੂ ਕਰੇਗਾ।`)}</T>
          <Spacer />
          <Button big icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल हो रहा है…', 'Saathi ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))}>{t('Call support', 'सपोर्ट को कॉल करें', 'ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
        </> : <>
          <H style={{ marginTop: 8 }}>{t('Ask the customer for their start code', 'ग्राहक से स्टार्ट कोड पूछें', 'ਗਾਹਕ ਤੋਂ ਸਟਾਰਟ ਕੋਡ ਪੁੱਛੋ')}</H>
          <OtpInput value={code} error={error} onChange={type} />
          {error
            ? <T s color={c.red}>{t(`Code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`, `ਕੋਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ। ${left} ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ।`)}</T>
            : <T s m>{t('The 1 hr clock starts when the code matches.', 'कोड मिलते ही 1 घंटे की घड़ी शुरू होगी।', 'ਕੋਡ ਮਿਲਦੇ ਹੀ 1 ਘੰਟੇ ਦੀ ਘੜੀ ਸ਼ੁਰੂ ਹੋਵੇਗੀ।')}</T>}
          <T s m>{t(`After ${codes.maxTries} wrong codes only support can start the job.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट शुरू कर सकता है।`, `${codes.maxTries} ਗ਼ਲਤ ਕੋਡਾਂ ਤੋਂ ਬਾਅਦ ਕੰਮ ਸਿਰਫ਼ ਸਪੋਰਟ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ।`)}</T>
          <T s m>{t('Prototype start code', 'प्रोटोटाइप स्टार्ट कोड', 'ਪ੍ਰੋਟੋਟਾਈਪ ਸਟਾਰਟ ਕੋਡ')}: {right}</T>
          <Spacer />
          <Button big disabled={code.length < 4} onPress={start}>{t('Start job', 'काम शुरू करें', 'ਕੰਮ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
          <Button variant="plain" onPress={() => setAway(true)}>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं', 'ਗਾਹਕ ਘਰ ਨਹੀਂ ਹਨ')}</Button>
        </>}
      </Screen>
      <Sheet visible={away} onClose={() => setAway(false)}>
        <H2>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं', 'ਗਾਹਕ ਘਰ ਨਹੀਂ ਹਨ')}</H2>
        <T s m>{t(`Wait 10 minutes. If they do not come, you still get ${tripPay} for the trip.`, `10 मिनट रुकें। अगर वे नहीं आते, तब भी आने-जाने के ${tripPay} मिलेंगे।`, `10 ਮਿੰਟ ਉਡੀਕ ਕਰੋ। ਜੇ ਉਹ ਨਹੀਂ ਆਉਂਦੇ, ਤਾਂ ਵੀ ਆਉਣ-ਜਾਣ ਦੇ ${tripPay} ਮਿਲਣਗੇ।`)}</T>
        <Button onPress={() => { setAway(false); callCustomer(); }} icon="call">{t('Call the customer', 'ग्राहक को कॉल करें', 'ਗਾਹਕ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
        <Button variant="outline" onPress={() => { setAway(false); nav.toast(t('Timer started. We will tell you in 10 min.', 'टाइमर शुरू। 10 मिनट में बताएँगे।', 'ਟਾਈਮਰ ਸ਼ੁਰੂ। 10 ਮਿੰਟ ਵਿੱਚ ਦੱਸਾਂਗੇ।')); }}>{t('Wait 10 minutes', '10 मिनट रुकें', '10 ਮਿੰਟ ਰੁਕੋ')}</Button>
        <Button variant="outline" danger onPress={() => { setAway(false); nav.reset('home'); nav.toast(t(`Job closed. ${tripPay} added to earnings.`, `काम बंद। ${tripPay} कमाई में जुड़े।`, `ਕੰਮ ਬੰਦ। ${tripPay} ਕਮਾਈ ਵਿੱਚ ਜੁੜੇ।`)); }}>
          {t('Mark as no-show', 'ग्राहक नहीं आए', 'ਗਾਹਕ ਨਹੀਂ ਆਏ')}
        </Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default DoorCodeScreen;
