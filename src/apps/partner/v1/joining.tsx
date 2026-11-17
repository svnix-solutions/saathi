/** Design page 21 (section 51): joining, working hours, digital ID card, help. */
import React, { useState } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import {
  Avatar, BackHeader, Card, Grid, H, H2, Hr, Icon, IconTile, Lft, Mark, Pill, Row, Screen, Sheet, Spacer, T, Tag, Toggle,
  palette, useAppState, useNav, useT, useTheme, type IconName, type Locale,
} from '@/native/ui';
import { PartnerTabs } from '../chrome';
import { Big, Cb, Page, Plain, TopBar, TopH, TopT, type V1State } from './kit';

/* 13 · Joining */
export function Joining() {
  const t = useT();
  const nav = useNav();
  const [police, setPolice] = useState(false);
  const steps = [
    { on: true, en: 'Mobile number', hi: 'मोबाइल नंबर', subEn: 'Verified', subHi: 'सत्यापित' },
    { on: true, en: 'Aadhaar, PAN and 2 references', hi: 'आधार, पैन और 2 पहचान वाले', subEn: 'Added at sign-up · approved', subHi: 'साइन-अप में जोड़े · मंज़ूर' },
  ];
  return (
    <Page>
      <TopBar>
        <TopT dim>{t('Welcome to Saathi Partner', 'Saathi Partner में स्वागत है')}</TopT>
        <TopH>{t('Finish joining', 'जुड़ना पूरा करें')}</TopH>
        <View style={{ height: 6, borderRadius: 4, backgroundColor: '#2d6a5b', marginTop: 10 }}>
          <View style={{ width: '50%', height: '100%', borderRadius: 4, backgroundColor: palette.yellow }} />
        </View>
        <TopT dim style={{ marginTop: 4 }}>{t('2 of 4 steps done', '4 में से 2 चरण पूरे')}</TopT>
      </TopBar>
      <Screen>
        {steps.map((s) => (
          <Card key={s.en} row><Lft style={{ flex: 1 }}><Cb on /><View style={{ flex: 1 }}><H2>{t(s.en, s.hi)}</H2><T s m>{t(s.subEn, s.subHi)}</T></View></Lft></Card>
        ))}
        <Card row onPress={() => setPolice(true)}>
          <Lft style={{ flex: 1 }}><Cb /><View style={{ flex: 1 }}><H2>{t('Police verification', 'पुलिस सत्यापन')}</H2><T s m>{t('We are checking · about 3 days', 'जाँच जारी · लगभग 3 दिन')}</T></View></Lft>
          <Tag>{t('In review', 'जाँच में')}</Tag>
        </Card>
        <Card sel row onPress={() => nav.push('training')}>
          <Lft style={{ flex: 1 }}><Cb /><View style={{ flex: 1 }}><H2>{t('Training', 'ट्रेनिंग')}</H2><T s m>{t('4 short videos and a home visit test', '4 छोटे वीडियो और एक घर पर टेस्ट')}</T></View></Lft>
        </Card>
        <Spacer />
        <Big onPress={() => nav.push('training')}>{t('Start training', 'ट्रेनिंग शुरू करें')}</Big>
      </Screen>
      <Sheet visible={police} onClose={() => setPolice(false)}>
        <H2>{t('Police verification', 'पुलिस सत्यापन')}</H2>
        <T s m>{t('Sent to the Block C police station on Monday. Most checks finish in 3 days. We send an SMS when it is done; you can take jobs meanwhile once training is passed.', 'सोमवार को ब्लॉक सी थाने भेजा गया। ज़्यादातर जाँच 3 दिन में पूरी होती है। पूरा होने पर SMS आएगा।')}</T>
        <Big onPress={() => setPolice(false)}>{t('OK', 'ठीक है')}</Big>
      </Sheet>
    </Page>
  );
}

const days = [['M', 'सो'], ['T', 'मं'], ['W', 'बु'], ['T', 'गु'], ['F', 'शु'], ['S', 'श'], ['S', 'र']];

/* 14 · Working hours */
export function Hours() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const on = (st.workDays as boolean[] | undefined) ?? [true, true, true, true, true, true, false];
  const shifts = (st.shifts as boolean[] | undefined) ?? [true, true, false];
  const shiftRows = [['Morning', 'सुबह', '6 am to 10 am', 'सुबह 6 से 10'], ['Midday', 'दोपहर', '10 am to 2 pm', 'सुबह 10 से दोपहर 2'], ['Evening', 'शाम', '4 pm to 8 pm', 'शाम 4 से 8']];
  return (
    <Page>
      <Screen>
        <H>{t('My working hours', 'मेरे काम के घंटे')}</H>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          {days.map(([en, hi], i) => (
            <Pill key={i} style={{ flex: 1 }} sel={on[i]} onPress={() => set({ workDays: on.map((v, j) => (j === i ? !v : v)) })}>{t(en, hi)}</Pill>
          ))}
        </View>
        {shiftRows.map(([en, hi, subEn, subHi], i) => (
          <Card key={en} row>
            <View><H2>{t(en, hi)}</H2><T s m>{t(subEn, subHi)}</T></View>
            <Toggle on={shifts[i]} onChange={(v) => { set({ shifts: shifts.map((s, j) => (j === i ? v : s)) }); nav.toast(v ? t(`${en} on`, `${hi} चालू`) : t(`${en} off`, `${hi} बंद`)); }} />
          </Card>
        ))}
        <H2>{t('Booked ahead', 'पहले से बुक')}</H2>
        <Card onPress={() => nav.toast(t('Monthly plan: Mon to Sat, 8:00 am at Flat 204', 'मासिक प्लान: सोम से शनि, सुबह 8 बजे, फ़्लैट 204'))}>
          <Row><H2>{t('Monthly plan · Nitin K.', 'मासिक प्लान · नितिन के.')}</H2><Tag>8:00 am</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{t('Mon to Sat · General cleaning · 1 hr', 'सोम से शनि · सामान्य सफ़ाई · 1 घंटा')}</T>
        </Card>
        <Card onPress={() => nav.toast(t('Kitchen & bath scrub on Tuesday at 2 pm, Block A', 'मंगलवार दोपहर 2 बजे, ब्लॉक ए'))}>
          <Row><H2>{t('Kitchen & bath scrub', 'रसोई और बाथरूम')}</H2><Tag>{t('Tue 2 pm', 'मंगल 2 pm')}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{t('Block A · 2 hr', 'ब्लॉक ए · 2 घंटे')}</T>
        </Card>
      </Screen>
      <PartnerTabs active="jobs" />
    </Page>
  );
}

/* 15 · Digital ID card */
export function IdCard() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useAppState<V1State>();
  const [scan, setScan] = useState(false);
  const fullName = st.name === 'Sunita' ? 'Sunita D.' : st.name;
  return (
    <Page bg={palette.greenD}>
      <Screen bg={palette.greenD}>
        <Row>
          <Pressable onPress={nav.back} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} accessibilityRole="button" hitSlop={8}>
            <Icon name="back" color="#fff" /><H2 color="#fff">{t('My ID card', 'मेरा आईडी कार्ड')}</H2>
          </Pressable>
          <T s color="#fff" style={{ opacity: 0.8 }}>{t('Show at the gate', 'गेट पर दिखाएँ')}</T>
        </Row>
        <Card style={{ alignItems: 'center', paddingVertical: 18, paddingHorizontal: 14, marginTop: 6 }}>
          <Lft gap={6}><Mark size={24} /><H2 style={{ fontSize: 15 }}>Saathi Partner</H2></Lft>
          <Avatar face="sd" size={84} style={{ marginTop: 14, marginBottom: 8 }} />
          <H>{fullName}</H>
          <T s m>{t('Partner ID KP-0142 · Block C zone', 'पार्टनर आईडी KP-0142 · ब्लॉक सी')}</T>
          <Lft gap={5} style={{ justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            <Tag tone="n">{t('ID checked', 'आईडी जाँची')}</Tag><Tag tone="n">{t('Police verified', 'पुलिस सत्यापित')}</Tag><Tag tone="n">{t('Trained', 'प्रशिक्षित')}</Tag>
          </Lft>
          <Hr style={{ marginVertical: 14, alignSelf: 'stretch' }} />
          <Pressable onPress={() => setScan(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }} accessibilityRole="button">
            <View accessibilityLabel={t('Verification code', 'सत्यापन कोड')}
              style={{ width: 72, height: 72, borderWidth: 5, borderColor: '#fff', outlineWidth: 1, outlineStyle: 'solid', outlineColor: c.line,
                backgroundImage: `conic-gradient(${palette.ink} 25%, #fff 0 50%, ${palette.ink} 0 75%, #fff 0)`, backgroundSize: '12px 12px' } as ViewStyle} />
            <View><H2>{t('Scan to check', 'जाँचने के लिए स्कैन करें')}</H2><T s m>{t('Opens a Saathi\npage with this photo', 'इस फ़ोटो के साथ\nSaathi पेज खुलेगा')}</T></View>
          </Pressable>
        </Card>
        <Spacer />
        <T s center color="#cfe5dd">{t(`Valid today for booking ${st.job.id}, Flat 204`, `आज बुकिंग ${st.job.id}, फ़्लैट 204 के लिए मान्य`)}</T>
      </Screen>
      <Sheet visible={scan} onClose={() => setScan(false)}>
        <Lft><Avatar face="sd" size={44} /><View><H2>{fullName} · KP-0142</H2><T s m>saathi.in/check/KP-0142</T></View></Lft>
        <Tag tone="g">{t('Verified partner · on a job now', 'सत्यापित पार्टनर · अभी काम पर')}</Tag>
        <T s m>{t('This is what the guard sees after scanning: the same photo, name and today’s booking.', 'स्कैन करने पर गार्ड यही देखता है: वही फ़ोटो, नाम और आज की बुकिंग।')}</T>
        <Big onPress={() => setScan(false)}>{t('Close', 'बंद करें')}</Big>
      </Sheet>
    </Page>
  );
}

type HelpTopic = { icon: IconName; en: string; hi: string; tipEn: string; tipHi: string; act: string; actHi: string };
const topics: HelpTopic[] = [
  { icon: 'home', en: 'Customer not at home', hi: 'ग्राहक घर पर नहीं', tipEn: 'Wait 10 minutes at the door. We call the customer for you. If nobody comes you are paid ₹30 for the trip.', tipHi: 'दरवाज़े पर 10 मिनट रुकें। हम ग्राहक को कॉल करेंगे। कोई न आए तो आने के ₹30 मिलेंगे।', act: 'Call the customer for me', actHi: 'ग्राहक को कॉल करें' },
  { icon: 'wallet', en: 'Payment problem', hi: 'भुगतान की समस्या', tipEn: 'Payouts go to your bank every Monday. Missing money is checked within 2 days.', tipHi: 'हर सोमवार बैंक में भुगतान। कम पैसे की जाँच 2 दिन में होती है।', act: 'Report a payment problem', actHi: 'भुगतान की शिकायत करें' },
  { icon: 'clock', en: 'Job needs more time', hi: 'काम में और समय चाहिए', tipEn: 'We ask the customer to add 30 minutes. You earn more for the extra time.', tipHi: 'हम ग्राहक से 30 मिनट जोड़ने को कहेंगे। ज़्यादा समय की ज़्यादा कमाई।', act: 'Ask for 30 more minutes', actHi: '30 मिनट और माँगें' },
  { icon: 'sparkle', en: 'No cleaning supplies', hi: 'सफ़ाई का सामान नहीं', tipEn: 'Ask the customer first. If there is nothing, we note it and you do what is possible.', tipHi: 'पहले ग्राहक से पूछें। कुछ न हो तो हम दर्ज करेंगे, जितना हो सके करें।', act: 'Tell the team', actHi: 'टीम को बताएँ' },
];

/* 16 · Help */
export function Help() {
  const t = useT();
  const nav = useNav();
  const { locale } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [topic, setTopic] = useState<HelpTopic | null>(null);
  const [sos, setSos] = useState(false);
  const [lang, setLang] = useState(false);
  const cur = st.locale ?? locale;
  const langs: [Locale, string][] = [['en', 'English'], ['hi', 'हिन्दी'], ['pa', 'ਪੰਜਾਬੀ']];
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Help', 'मदद')} onBack={nav.canGoBack ? nav.back : () => nav.reset('home')} />
        <Card onPress={() => setSos(true)} style={{ backgroundColor: palette.red, borderWidth: 0, paddingVertical: 16 }}>
          <Lft><Icon name="shield" size={28} color="#fff" /><View><H2 color="#fff" style={{ fontSize: 16 }}>{t('I do not feel safe', 'मैं सुरक्षित महसूस नहीं कर रही')}</H2><T s color="#fff">{t('Calls our safety team right now', 'तुरंत हमारी सुरक्षा टीम को कॉल')}</T></View></Lft>
        </Card>
        <Grid cols={2}>
          {topics.map((x) => (
            <Card key={x.en} onPress={() => setTopic(x)}><IconTile name={x.icon} /><H2 style={{ marginTop: 8 }}>{t(x.en, x.hi)}</H2></Card>
          ))}
        </Grid>
        <Card row onPress={() => setLang(true)}>
          <View><H2>{t('Language', 'भाषा')}</H2><T s m>English · हिन्दी · ਪੰਜਾਬੀ</T></View>
          <T s b color={useTheme().c.accent}>{t('Change', 'बदलें')}</T>
        </Card>
        <Spacer />
        <Big icon="call" onPress={() => nav.toast(t('Calling Saathi partner support…', 'Saathi पार्टनर सहायता को कॉल…'))}>{t('Call Saathi', 'Saathi को कॉल करें')}</Big>
      </Screen>
      <Sheet visible={sos} onClose={() => setSos(false)}>
        <Lft><Icon name="shield" size={24} color={palette.red} /><H2>{t('Calling the safety team', 'सुरक्षा टीम को कॉल हो रही है')}</H2></Lft>
        <T s m>{t('Your live location and this booking are shared with them. Leave the house if you can. Ravi (your emergency contact) gets an SMS.', 'आपकी लाइव लोकेशन और यह बुकिंग उनसे शेयर की गई है। हो सके तो घर से बाहर निकलें। रवि को SMS भेजा गया।')}</T>
        <Big variant="outline" onPress={() => { setSos(false); nav.toast(t('Call ended. The safety team will call you back.', 'कॉल खत्म। सुरक्षा टीम वापस कॉल करेगी।')); }}>{t('End call', 'कॉल खत्म करें')}</Big>
      </Sheet>
      <Sheet visible={!!topic} onClose={() => setTopic(null)}>
        {topic && <>
          <Lft><IconTile name={topic.icon} /><H2>{t(topic.en, topic.hi)}</H2></Lft>
          <T s m>{t(topic.tipEn, topic.tipHi)}</T>
          <Big onPress={() => { setTopic(null); nav.toast(t('Done. The team is on it.', 'हो गया। टीम देख रही है।')); }}>{t(topic.act, topic.actHi)}</Big>
          <Plain onPress={() => setTopic(null)}>{t('Close', 'बंद करें')}</Plain>
        </>}
      </Sheet>
      <Sheet visible={lang} onClose={() => setLang(false)}>
        <H2>{t('App language', 'ऐप की भाषा')}</H2>
        <Grid cols={3}>{langs.map(([k, l]) => <Pill key={k} sel={cur === k} onPress={() => set({ locale: k })}>{l}</Pill>)}</Grid>
        <Big onPress={() => setLang(false)}>{t('Done', 'हो गया')}</Big>
      </Sheet>
    </Page>
  );
}
