/** Design page 23 (section 59), screen 23 · The customer cancelled: paid for the time, offered a nearby job. */
import React from 'react';
import { View } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, H, H2, Page, Screen, Spacer, StatusIcon, T, useNav, useT } from '@/native/ui';
import { useJobsState } from '../../jobs';
import { cancelPay, nearbyJob } from '../data';

export function CancelledScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useJobsState();
  const week = (st.week ?? 2846) + cancelPay;
  const takeNearby = () => { set({ offer: nearbyJob, week }); nav.reset('jobRequest'); };
  const notNow = () => { set({ week }); nav.reset('home'); nav.toast(t(`${rupees(cancelPay)} added for your time`, `आपके समय के ${rupees(cancelPay)} जुड़े`)); };
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 24 }}><StatusIcon name="home" tone="red" /></View>
        <H center>{t('The customer cancelled', 'ग्राहक ने रद्द किया')}</H>
        <T m center>{t(`Job ${st.job.id} at Flat 204 was cancelled while you were on the way. This does not affect your rating.`, `फ़्लैट 204 का काम ${st.job.id} आपके रास्ते में रहते रद्द हुआ। इससे आपकी रेटिंग पर असर नहीं पड़ेगा।`)}</T>
        <Card sel row>
          <View><H2>{t('For your time', 'आपके समय के लिए')}</H2><T s m>{t("Added to this week's payout", 'इस हफ़्ते के भुगतान में जुड़ा')}</T></View>
          <T b size={18}>₹30</T>
        </Card>
        <Card><H2>{t('Another job is close', 'पास में एक और काम है')}</H2><T s m>{t('Dishes · 30 min · 0.4 km · you earn ₹63', 'बर्तन · 30 मिनट · 0.4 किमी · कमाई ₹63')}</T></Card>
        <Spacer />
        <Button variant="yellow" size="tall" onPress={takeNearby}>{t('Take the nearby job', 'पास वाला काम लें')}</Button>
        <Button variant="plain" onPress={notNow}>{t('Not now', 'अभी नहीं')}</Button>
      </Screen>
    </Page>
  );
}

export default CancelledScreen;
