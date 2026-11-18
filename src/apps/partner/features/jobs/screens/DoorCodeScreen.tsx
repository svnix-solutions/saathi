/** Design page 26, screen 34 · Start with the customer's start code at the door. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { codes, decisions, rupees } from '@/domain';
import {
  Button, Card, H, H2, Icon, IconTile, Lft, OtpInput, Page, Row, Screen, Sheet, Spacer, T, Tag, TopBar, palette, useNav, useT, useTheme,
  type ScreenProps,
} from '@/native/ui';
import { initialPartnerState, useStartCode } from '../../../state';
import { lengthEn } from '../job';
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
    nav.toast(t(`Code matches. ${lengthEn(job.minutes)} clock started.`, 'कोड सही है। घड़ी शुरू।'));
    nav.replace('onJob');
  };
  const callCustomer = () => nav.toast(`Calling ${job.customer}…`);
  const tripPay = rupees(decisions.partner.paidOnCustomerCancel);
  return (
    <Page variant="bare">
      <TopBar>
        <Row><H2 color={palette.white}>{t('You have arrived', 'आप पहुँच गए')}</H2><Tag>{t('On time', 'समय पर')}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Lft style={styles.fill}>
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>{job.customer} · 2nd floor</T></View>
          </Lft>
          <IconTile name="call" onPress={callCustomer} />
        </Card>
        {locked ? <>
          <H style={{ marginTop: 8 }}>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है')}</H>
          <T m>{t(`${codes.maxTries} wrong start codes were typed. Support will call ${job.customer} and start the job with you.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया। सपोर्ट ${job.customer} को कॉल करके आपके साथ काम शुरू करेगा।`)}</T>
          <Spacer />
          <Button big icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'साथी सपोर्ट को कॉल हो रहा है…'))}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
        </> : <>
          <H style={{ marginTop: 8 }}>{t('Ask the customer for their start code', 'ग्राहक से स्टार्ट कोड पूछें')}</H>
          <OtpInput value={code} error={error} onChange={type} />
          {error
            ? <T s color={c.red}>{t(`Code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T>
            : <T s m>{t('The 1 hr clock starts when the code matches.', 'कोड मिलते ही 1 घंटे की घड़ी शुरू होगी।')}</T>}
          <T s m>{t(`After ${codes.maxTries} wrong codes only support can start the job.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट शुरू कर सकता है।`)}</T>
          <T s m>{t('Prototype start code', 'प्रोटोटाइप स्टार्ट कोड')}: {right}</T>
          <Spacer />
          <Button big disabled={code.length < 4} onPress={start}>{t('Start job', 'काम शुरू करें')}</Button>
          <Button variant="plain" onPress={() => setAway(true)}>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}</Button>
        </>}
      </Screen>
      <Sheet visible={away} onClose={() => setAway(false)}>
        <H2>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}</H2>
        <T s m>Wait 10 minutes. If they do not come, you still get {tripPay} for the trip.</T>
        <Button onPress={() => { setAway(false); callCustomer(); }} icon="call">{t('Call the customer', 'ग्राहक को कॉल करें')}</Button>
        <Button variant="outline" onPress={() => { setAway(false); nav.toast('Timer started. We will tell you in 10 min.'); }}>{t('Wait 10 minutes', '10 मिनट रुकें')}</Button>
        <Button variant="outline" danger onPress={() => { setAway(false); nav.reset('home'); nav.toast(`Job closed. ${tripPay} added to earnings.`); }}>
          {t('Mark as no-show', 'ग्राहक नहीं आए')}
        </Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default DoorCodeScreen;
