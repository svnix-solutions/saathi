/** Design page 30 (section 100): finishing a job with the customer's code. */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, H, H2, Icon, Input, Lft, OtpInput, Row, Screen, Spacer, T, Tag, palette, useAppState, useNav, useT, useTheme } from '@/native/ui';
import { codes, rupees } from '@/data/decisions';
import { Badge, Big, Page, Plain, TopBar, TopH2, defaultToday, jobReset, type V1State } from './kit';
import { serviceHi } from './jobs';

/** What this job pays the partner (₹258 in the design's 2-hour sample). */
const earnOf = (st: V1State) => st.job?.earn ?? 258;
const firstName = (st: V1State) => st.job.customer.split(' ')[0];

/* 42 · Finish code. Same screen for both codes: the partner is never told which is which. */
export function FinishCode({ params }: { params: { code?: string } }) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const job = st.job;
  const tries = st.finishTries ?? 0;
  const left = codes.maxTries - tries;
  const [code, setCode] = useState(params.code ?? '');
  const [err, setErr] = useState(!!params.code && tries > 0);
  const callSupport = () => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल…'));
  const check = () => {
    if (code === codes.finishHappy || code === codes.finishNotHappy) {
      const happy = code === codes.finishHappy;
      const today = st.today ?? defaultToday;
      set({
        ...jobReset,
        ...(happy ? {
          earnedToday: (st.earnedToday ?? 412) + earnOf(st), jobsToday: (st.jobsToday ?? 3) + 1,
          week: (st.week ?? 2846) + earnOf(st), weekJobs: (st.weekJobs ?? 19) + 1,
          today: [{ title: job.service, titleHi: serviceHi[job.service] ?? job.service, sub: `11:00 am · ${job.minutes >= 60 ? job.minutes / 60 + ' hr' : job.minutes + ' min'}`, amt: earnOf(st) }, ...today],
        } : {}),
      });
      nav.reset(happy ? 'finish.happy' : 'finish.notHappy');
      return;
    }
    set({ finishTries: tries + 1 });
    setErr(true);
  };

  if (left <= 0) {
    return (
      <Page>
        <TopBar><Row><TopH2>{t('Finish job', 'काम खत्म करें')}</TopH2><Tag>{job.customer}</Tag></Row></TopBar>
        <Screen>
          <Badge name="shield" tone="red" />
          <H center>{t('Only support can finish this job', 'अब सिर्फ़ सपोर्ट यह काम खत्म कर सकता है')}</H>
          <T m center>{t(`${codes.maxTries} wrong codes were typed. Support will call ${firstName(st)} and close the job with you.`, `${codes.maxTries} बार गलत कोड डाला गया। सपोर्ट ${firstName(st)} को कॉल करके आपके साथ काम बंद करेगा।`)}</T>
          <Spacer />
          <Big icon="call" onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें')}</Big>
        </Screen>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar><Row><TopH2>{t('Finish job', 'काम खत्म करें')}</TopH2><Tag>{err ? job.customer : t('10:02 to 11:00', '10:02 से 11:00')}</Tag></Row></TopBar>
      <Screen>
        {!err && (
          <Card row>
            <Lft style={{ flex: 1 }}>
              <Icon name="pin" color={c.accent} />
              <View><H2>{job.address}</H2><T s m>{job.customer} · {t(`${job.minutes / 60} hr job · 58 min worked`, `${job.minutes / 60} घंटे का काम · 58 मिनट किया`)}</T></View>
            </Lft>
          </Card>
        )}
        <H style={{ marginTop: 8 }}>{t('Ask the customer for their finish code', 'ग्राहक से उनका फ़िनिश कोड पूछें')}</H>
        <OtpInput value={code} error={err} onChange={(v) => { setCode(v); setErr(false); }} />
        {err ? <>
          <Card style={{ borderColor: c.red }}><T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `यह कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T></Card>
          <T s m>{t(`After ${codes.maxTries} wrong codes the job can only be finished by support. Start codes have their own 5 tries.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट खत्म कर सकता है। स्टार्ट कोड की अपनी 5 कोशिशें हैं।`)}</T>
        </> : <T s m>{t('The customer has two codes in their app. Type the one they give you.', 'ग्राहक के ऐप में दो कोड हैं। जो कोड वे दें, वही डालें।')}</T>}
        <Spacer />
        <Big disabled={code.length < 4 || err} onPress={check}>{t('Finish job', 'काम खत्म करें')}</Big>
        {tries > 0
          ? <Plain onPress={callSupport}>{t('Call support', 'सपोर्ट को कॉल करें')}</Plain>
          : <Plain onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${job.customer} को कॉल (नंबर छुपा)`))}>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}</Plain>}
      </Screen>
    </Page>
  );
}

/* 43 · Happy code: earning added straight away */
export function FinishHappy() {
  const t = useT();
  const nav = useNav();
  const [st] = useAppState<V1State>();
  const name = firstName(st);
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 14 }}><Badge name="check" /></View>
        <H center>{t('Job complete', 'काम पूरा हुआ')}</H>
        <T m center>{t(`${name} was happy with the work.`, `${name} काम से ख़ुश थे।`)}</T>
        <Card row><T m>{t('Added to this week', 'इस हफ़्ते में जुड़े')}</T><H size={20}>{rupees(earnOf(st))}</H></Card>
        <Spacer />
        <Big onPress={() => nav.push('rateCustomer')}>{t(`Rate ${name}`, `${name} को रेटिंग दें`)}</Big>
      </Screen>
    </Page>
  );
}

/* 44 · Not-happy code: job closed, earning held (not taken) */
export function FinishNotHappy() {
  const t = useT();
  const nav = useNav();
  const [st] = useAppState<V1State>();
  const name = firstName(st);
  const [note, setNote] = useState('');
  const send = () => {
    nav.reset('home');
    nav.toast(note.trim() ? t('Note sent to support', 'नोट सपोर्ट को भेजा') : t('Support will call you', 'सपोर्ट आपको कॉल करेगा'));
  };
  return (
    <Page>
      <Screen>
        <View style={{ width: 64, height: 64, borderRadius: 32, alignSelf: 'center', marginTop: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.yellow }}>
          <Icon name="alert" size={30} color={palette.ink} />
        </View>
        <H center>{t('Job closed', 'काम बंद हुआ')}</H>
        <T m center>{t(`${name} was not happy with this visit. Support will call him, then you.`, `${name} इस बार के काम से ख़ुश नहीं थे। सपोर्ट पहले उन्हें, फिर आपको कॉल करेगा।`)}</T>
        <Card row><T m style={{ flex: 1 }}>{t(`${rupees(earnOf(st))} on hold until then`, `तब तक ${rupees(earnOf(st))} रुके रहेंगे`)}</T><Tag>{t('Usually 1 day', 'आमतौर पर 1 दिन')}</Tag></Card>
        <H2>{t('Anything support should know?', 'सपोर्ट को कुछ बताना है?')}</H2>
        <Input multiline value={note} onChangeText={setNote} placeholder={t('Customer asked me to skip the balcony', 'ग्राहक ने बालकनी छोड़ने को कहा')} style={{ minHeight: 58 }} />
        <Spacer />
        <Big onPress={send}>{t('Send note', 'नोट भेजें')}</Big>
      </Screen>
    </Page>
  );
}
