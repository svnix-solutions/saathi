/** Design page 23 (section 59): no jobs, no internet, customer cancelled, location off. */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, Button, Card, CheckRow, H, H2, Row, Screen, Spacer, T, Tag, Toggle,
  palette, useAppState, useNav, useT, useTheme,
} from '@/native/ui';
import { rupees } from '@/data/decisions';
import { PartnerTabs } from '../chrome';
import { Badge, Big, Page, Plain, TopBar, TopH, TopT, leftLabel, useJobClock, type V1State } from './kit';
import { FinishButton, TaskList, serviceHi } from './jobs';

/* 21 · No jobs right now */
export function NoJobs() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const online = st.online;
  return (
    <Page>
      <TopBar>
        <Row>
          <View><TopT dim>Saathi Partner</TopT><TopH>{t(st.name, st.name === 'Sunita' ? 'सुनीता' : st.name)}</TopH></View>
          <Pressable onPress={() => nav.push('profile')}><Avatar face="sd" size={40} /></Pressable>
        </Row>
      </TopBar>
      <Screen>
        <Card sel={online} row>
          <View><H2>{online ? t('You are online', 'आप ऑनलाइन हैं') : t('You are offline', 'आप ऑफ़लाइन हैं')}</H2><T s m>{online ? t('Online for 22 min', '22 मिनट से ऑनलाइन') : t('No jobs will ring', 'कोई काम नहीं आएगा')}</T></View>
          <Toggle on={online} onChange={(v) => set({ online: v })} />
        </Card>
        <View style={{ marginTop: 10 }}><Badge name="clock" /></View>
        <H center>{t('No jobs near you right now', 'अभी आपके पास कोई काम नहीं')}</H>
        <T m center>{t('It is usually quiet from 2 to 4 pm. Keep the app open and we will ring you.', 'आमतौर पर 2 से 4 बजे काम कम होता है। ऐप खुला रखें, हम घंटी बजाएँगे।')}</T>
        <Card onPress={() => nav.push('demandMap')}><H2>{t('Next busy time', 'अगला व्यस्त समय')}</H2><T s m>{t('Around 5 pm in Block C', 'ब्लॉक सी में लगभग शाम 5 बजे')}</T></Card>
        <Spacer />
        <Button variant="outline" onPress={() => { set({ online: false }); nav.reset('home'); nav.toast(t('You are offline', 'आप ऑफ़लाइन हैं')); }}>{t('Go offline for now', 'अभी ऑफ़लाइन जाएँ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

/* 22 · No internet on the job */
export function Offline() {
  const t = useT();
  const nav = useNav();
  const [st] = useAppState<V1State>();
  const [back, setBack] = useState(false);
  const left = useJobClock();
  const hi = useTheme().locale === 'hi';
  const job = st.job;
  return (
    <Page>
      <Pressable onPress={() => { setBack(true); nav.toast(t('Internet is back. 2 photos and 1 tick sent.', 'इंटरनेट वापस आया। 2 फ़ोटो और 1 टिक भेजे।')); }}
        style={{ backgroundColor: back ? palette.green : palette.ink, paddingVertical: 10, paddingHorizontal: 16 }} accessibilityRole="button">
        <T s b color="#fff">{back ? t('Back online. Everything is sent.', 'फिर से ऑनलाइन। सब भेज दिया।') : t('No internet. Your work is being saved.', 'इंटरनेट नहीं है। आपका काम सेव हो रहा है।')}</T>
      </Pressable>
      <Screen>
        <Row><H2>{t(job.service, serviceHi[job.service])} · {t(job.minutes / 60 + ' hr', job.minutes / 60 + ' घंटा')}</H2><Tag>{leftLabel(left, hi)}</Tag></Row>
        <TaskList gap={13} />
        <Card sel><T s><T s b>{t('Carry on working.', 'काम जारी रखें।')}</T> {t('Your check-in time, ticks and photos are kept on the phone and sent when the internet comes back.', 'चेक-इन का समय, टिक और फ़ोटो फ़ोन में रखे हैं और इंटरनेट आने पर भेजे जाएँगे।')}</T></Card>
        <Card row><T>{t('Waiting to send', 'भेजना बाकी')}</T><T b>{back ? t('Nothing', 'कुछ नहीं') : t('2 photos · 1 tick', '2 फ़ोटो · 1 टिक')}</T></Card>
        <Spacer />
        <FinishButton label="Finish job" labelHi="काम खत्म करें" />
      </Screen>
    </Page>
  );
}

/* 23 · Customer cancelled */
export function Cancelled() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const nearby = {
    id: '#2046', service: 'Dishes', minutes: 30, earn: 63, address: 'Flat 112, Block C', customer: 'Priya N.',
    note: 'Dishes are in the sink.', tasks: ['Wash dishes', 'Wipe kitchen'], done: [] as string[],
  };
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 24 }}><Badge name="home" tone="red" /></View>
        <H center>{t('The customer cancelled', 'ग्राहक ने रद्द किया')}</H>
        <T m center>{t(`Job ${st.job.id} at Flat 204 was cancelled while you were on the way. This does not affect your rating.`, `फ़्लैट 204 का काम ${st.job.id} आपके रास्ते में रहते रद्द हुआ। इससे आपकी रेटिंग पर असर नहीं पड़ेगा।`)}</T>
        <Card sel row>
          <View><H2>{t('For your time', 'आपके समय के लिए')}</H2><T s m>{t("Added to this week's payout", 'इस हफ़्ते के भुगतान में जुड़ा')}</T></View>
          <T b size={18}>₹30</T>
        </Card>
        <Card><H2>{t('Another job is close', 'पास में एक और काम है')}</H2><T s m>{t('Dishes · 30 min · 0.4 km · you earn ₹63', 'बर्तन · 30 मिनट · 0.4 किमी · कमाई ₹63')}</T></Card>
        <Spacer />
        <Big variant="yellow" onPress={() => { set({ offer: nearby, week: (st.week ?? 2846) + 30 }); nav.reset('jobRequest'); }}>{t('Take the nearby job', 'पास वाला काम लें')}</Big>
        <Plain onPress={() => { set({ week: (st.week ?? 2846) + 30 }); nav.reset('home'); nav.toast(t(`${rupees(30)} added for your time`, `आपके समय के ${rupees(30)} जुड़े`)); }}>{t('Not now', 'अभी नहीं')}</Plain>
      </Screen>
    </Page>
  );
}

/* 24 · Location is off */
export function LocationOff() {
  const t = useT();
  const nav = useNav();
  const [, set] = useAppState<V1State>();
  const [busy, setBusy] = useState(false);
  const points = [
    ['Not tracked when you are offline', 'ऑफ़लाइन होने पर ट्रैक नहीं होता'],
    ['Customers see you only on their job', 'ग्राहक सिर्फ़ अपने काम पर देखते हैं'],
    ['Stops by itself at check-out', 'चेक-आउट पर अपने-आप बंद'],
  ];
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 24 }}><Badge name="pin" /></View>
        <H center>{t('Turn on location to go online', 'ऑनलाइन होने के लिए लोकेशन चालू करें')}</H>
        <T m center>{t('We use it only while you are online, to send jobs near you and to check you in at the door.', 'हम इसे सिर्फ़ ऑनलाइन रहते इस्तेमाल करते हैं, पास का काम भेजने और दरवाज़े पर चेक-इन के लिए।')}</T>
        <Card style={{ gap: 10 }}>{points.map(([en, hi]) => <CheckRow key={en} on label={t(en, hi)} />)}</Card>
        <Spacer />
        <Big disabled={busy} onPress={() => {
          setBusy(true);
          setTimeout(() => { set({ online: true, offerShown: false }); nav.reset('home'); nav.toast(t('Location is on. You are online.', 'लोकेशन चालू। आप ऑनलाइन हैं।')); }, 800);
        }}>{busy ? t('Opening settings…', 'सेटिंग खुल रही है…') : t('Open phone settings', 'फ़ोन की सेटिंग खोलें')}</Big>
        <Plain onPress={() => { set({ online: false }); nav.reset('home'); }}>{t('Stay offline', 'ऑफ़लाइन रहें')}</Plain>
      </Screen>
    </Page>
  );
}

