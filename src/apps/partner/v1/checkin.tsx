/** Design page 22 (section 54): check in, selfie, live on the job, check out. */
import React, { useEffect, useState } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import {
  Avatar, Button, Card, Grid, H, H2, Hr, Icon, IconTile, Lft, MapMock, OtpInput, Row, Screen, Spacer, T, Tag, Toggle,
  palette, useAppState, useNav, useT, useTheme,
} from '@/native/ui';
import { codes, rupees } from '@/data/decisions';
import { Big, Cb, Page, PhotoTile, TopBar, TopH2, TopT, defaultToday, leftLabel, useJobClock, type V1State } from './kit';
import { serviceHi } from './jobs';

function CheckLine({ on, title, sub, icon, sel, onPress, busy }: { on?: boolean; title: string; sub: string; icon?: 'pin' | 'clock' | 'user'; sel?: boolean; onPress?: () => void; busy?: boolean }) {
  const { c } = useTheme();
  return (
    <Card row sel={sel} onPress={onPress}>
      <Lft style={{ flex: 1 }}>
        <Cb on={on} />
        <View style={{ flex: 1 }}><H2>{title}</H2><T s m>{sub}</T></View>
      </Lft>
      {icon && <Icon name={icon} color={busy ? c.mut : c.accent} />}
    </Card>
  );
}

/* 17 · Check in */
export function CheckIn() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [located, setLocated] = useState(false);
  useEffect(() => { const id = setTimeout(() => setLocated(true), 1200); return () => clearTimeout(id); }, []);
  const job = st.job;
  const selfie = !!st.selfieIn;
  // start code: typed by the partner, read out by the customer; 5 wrong tries, then support (shared with the start-code screen)
  const verified = !!st.startVerified;
  const tries = st.startTries ?? 0;
  const left = codes.maxTries - tries;
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const verify = () => {
    if (code === codes.start) { set({ startVerified: true, startTries: 0 }); nav.toast(t('Start code matches', 'स्टार्ट कोड सही है')); return; }
    set({ startTries: tries + 1 }); setWrong(true); setCode('');
  };
  return (
    <Page>
      <TopBar>
        <Row><TopH2>{t('Check in', 'चेक-इन')}</TopH2><Tag>{t('Job', 'काम')} {job.id}</Tag></Row>
        <TopT dim style={{ marginTop: 4 }}>{job.address} · {t(job.service, serviceHi[job.service])} · {t(job.minutes / 60 + ' hr', job.minutes / 60 + ' घंटा')}</TopT>
      </TopBar>
      <Screen>
        <CheckLine on={located} busy={!located} icon="pin"
          title={located ? t('Location matched', 'लोकेशन मिल गई') : t('Checking location…', 'लोकेशन जाँच रहे हैं…')}
          sub={located ? t('You are 12 m from the door', 'आप दरवाज़े से 12 मीटर दूर हैं') : t('Stand near the door', 'दरवाज़े के पास खड़े हों')}
          onPress={() => !located && nav.push('err.locationOff')} />
        <CheckLine on icon="clock" title={t('Time 11:08 am', 'समय 11:08 am')} sub={t('On time · due by 11:10', 'समय पर · 11:10 तक पहुँचना था')} />
        {verified
          ? <CheckLine on title={t('Start code matched', 'स्टार्ट कोड मिल गया')} sub={t('Read out by the customer', 'ग्राहक ने बताया')} />
          : left <= 0
            ? <Card tone="red" style={{ gap: 8 }}>
                <H2>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है')}</H2>
                <T s m>{t(`${codes.maxTries} wrong start codes were typed.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया।`)}</T>
                <Button icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'साथी सपोर्ट को कॉल हो रहा है…'))}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
              </Card>
            : <Card sel style={{ gap: 9 }}>
                <H2>{t('Ask the customer for the start code', 'ग्राहक से स्टार्ट कोड पूछें')}</H2>
                <OtpInput value={code} error={wrong} onChange={(v) => { setCode(v); setWrong(false); }} />
                {wrong
                  ? <T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T>
                  : <T s m>{t(`It is in the customer's app. Prototype code: ${codes.start}`, `यह ग्राहक के ऐप में है। प्रोटोटाइप कोड: ${codes.start}`)}</T>}
                <Button disabled={code.length < 4} onPress={verify}>{t('Verify code', 'कोड जाँचें')}</Button>
              </Card>}
        <CheckLine on={selfie} sel={verified && !selfie} icon="user" title={t('Selfie', 'सेल्फ़ी')}
          sub={selfie ? t('Added · clock started', 'जुड़ गई · समय शुरू') : verified ? t('Needed to start the clock', 'समय शुरू करने के लिए ज़रूरी') : t('After the start code', 'स्टार्ट कोड के बाद')}
          onPress={() => (verified ? nav.push('selfie', { mode: 'in' }) : nav.toast(t('Enter the start code first', 'पहले स्टार्ट कोड डालें')))} />
        <Spacer />
        {selfie
          ? <Big onPress={() => nav.reset('onJob')}>{t('Start the job', 'काम शुरू करें')}</Big>
          : <Big disabled={!located || !verified} onPress={() => nav.push('selfie', { mode: 'in' })}>{t('Take selfie and check in', 'सेल्फ़ी लें और चेक-इन करें')}</Big>}
      </Screen>
    </Page>
  );
}

/* 18 · Selfie: camera preview → captured → uploading → done */
export function Selfie({ params }: { params: { mode?: 'in' | 'out' } }) {
  const t = useT();
  const nav = useNav();
  const [, set] = useAppState<V1State>();
  const mode = params.mode ?? 'in';
  const [phase, setPhase] = useState<'camera' | 'taken' | 'upload'>('camera');
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (phase !== 'upload') return;
    if (pct >= 100) {
      if (mode === 'in') {
        set({ selfieIn: true, checkedInAt: '11:08 am', jobEndsAt: Date.now() + 60 * 60 * 1000 });
        nav.reset('onJob');
        nav.toast(t('Checked in at 11:08 am. The clock has started.', '11:08 am पर चेक-इन। समय शुरू।'));
      } else {
        set({ selfieOut: true });
        nav.back();
        nav.toast(t('Check-out selfie added', 'चेक-आउट सेल्फ़ी जुड़ गई'));
      }
      return;
    }
    const id = setTimeout(() => setPct((p) => Math.min(100, p + 20)), 350);
    return () => clearTimeout(id);
  }, [phase, pct]);
  const dim = '#cfe5dd';
  return (
    <Page bg={palette.ink}>
      <Screen bg={palette.ink} gap={12}>
        <Row>
          <H2 color="#fff">{mode === 'in' ? t('Check-in selfie', 'चेक-इन सेल्फ़ी') : t('Check-out selfie', 'चेक-आउट सेल्फ़ी')}</H2>
          <Pressable onPress={nav.back} hitSlop={8}><T s color="#fff" style={{ opacity: 0.8 }}>{t('Close', 'बंद')}</T></Pressable>
        </Row>
        <Pressable onPress={() => phase === 'camera' && setPhase('taken')} accessibilityLabel={t('Take photo', 'फ़ोटो लें')}
          style={{ height: 300, borderRadius: 18, backgroundColor: '#24332f', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 150, height: 200, borderRadius: 100, borderWidth: 3, borderStyle: phase === 'camera' ? 'dashed' : 'solid', borderColor: palette.yellow, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {phase === 'camera'
              ? <T s center color={dim}>{t('Camera', 'कैमरा')}{'\n'}{t('preview', 'प्रीव्यू')}</T>
              : <Avatar face="sd" size={190} bg="#24332f" />}
          </View>
        </Pressable>
        <T s center color={dim}>{t('Keep your face in the oval. Uniform and ID card should be visible.', 'चेहरा अंडाकार में रखें। वर्दी और आईडी कार्ड दिखने चाहिए।')}</T>
        <Spacer />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 26 }}>
          <Pressable onPress={() => { setPhase('camera'); setPct(0); }} disabled={phase === 'camera'} style={{ width: 60 }}>
            <T s center color="#fff" style={{ opacity: phase === 'camera' ? 0.4 : 1 }}>{t('Retake', 'फिर लें')}</T>
          </Pressable>
          <Pressable onPress={() => phase === 'camera' && setPhase('taken')} accessibilityRole="button" accessibilityLabel={t('Take photo', 'फ़ोटो लें')}
            style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: '#fff', borderWidth: 5, borderColor: palette.yellow, opacity: phase === 'camera' ? 1 : 0.5 } as ViewStyle} />
          <Pressable onPress={() => phase === 'taken' && setPhase('upload')} disabled={phase !== 'taken'} style={{ width: 60 }}>
            <T s center b color={palette.yellow} style={{ opacity: phase === 'taken' ? 1 : 0.4 }}>{t('Use photo', 'यही रखें')}</T>
          </Pressable>
        </View>
        <View style={{ opacity: phase === 'upload' ? 1 : 0.35 }}>
          <View style={{ height: 6, borderRadius: 4, backgroundColor: '#24332f' }}>
            <View style={{ width: `${phase === 'upload' ? pct : 0}%`, height: '100%', borderRadius: 4, backgroundColor: palette.yellow }} />
          </View>
          <T s center color={dim} style={{ marginTop: 5 }}>
            {phase === 'upload' ? t(`Uploading ${pct}% · works on slow internet`, `अपलोड ${pct}% · धीमे इंटरनेट पर भी`) : phase === 'taken' ? t('Looks good? Tap “Use photo”', 'ठीक है? “यही रखें” दबाएँ') : t('Tap the white button to take the photo', 'फ़ोटो के लिए सफ़ेद बटन दबाएँ')}
          </T>
        </View>
      </Screen>
    </Page>
  );
}

/* 19 · Live on the job */
export function Live() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const left = useJobClock();
  const hi = useTheme().locale === 'hi';
  return (
    <Page>
      <MapMock height={170} route={false} dots={[]}>
        <View style={{ position: 'absolute', left: 112, top: 32, width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(11,93,75,.18)' }} />
        <View style={{ position: 'absolute', left: 142, top: 62, width: 30, height: 30, borderRadius: 15, borderWidth: 3, borderColor: '#fff', backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="user" size={14} color="#fff" />
        </View>
        <Pressable onPress={nav.back} style={{ position: 'absolute', left: 12, top: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: c.card, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel="Back">
          <Icon name="back" color={c.ink} />
        </Pressable>
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Row><H>{t('You are live', 'आप लाइव हैं')}</H><Tag tone="g">{t('Live', 'लाइव')}</Tag></Row>
        <Card row>
          <View><T s m>{t(`Checked in ${st.checkedInAt ?? '11:08 am'}`, `${st.checkedInAt ?? '11:08 am'} पर चेक-इन`)}</T><H size={26} style={{ marginTop: 4 }}>{leftLabel(left, hi)}</H></View>
          <IconTile name="clock" onPress={() => nav.push('help')} />
        </Card>
        <H2>{t('Who can see you', 'आपको कौन देख सकता है')}</H2>
        <Card style={{ gap: 9 }}>
          <Row><T style={{ flex: 1 }}>{t('Saathi team', 'Saathi टीम')}</T><Tag tone="n">{t('Always on a job', 'काम के दौरान हमेशा')}</Tag></Row>
          <Hr />
          <Row><T style={{ flex: 1 }}>{t('Customer', 'ग्राहक')}</T><Tag tone="n">{t('Until check-out', 'चेक-आउट तक')}</Tag></Row>
          <Hr />
          <Row><T style={{ flex: 1 }}>{t('My family', 'मेरा परिवार')}</T><Toggle on={!!st.familyLive} onChange={(v) => { set({ familyLive: v }); nav.toast(v ? t('Ravi can see your location until check-out', 'रवि चेक-आउट तक आपकी लोकेशन देख सकते हैं') : t('Family sharing off', 'परिवार से शेयर बंद')); }} /></Row>
        </Card>
        <T s m>{t('Live location stops by itself when you check out.', 'चेक-आउट करते ही लाइव लोकेशन अपने-आप बंद हो जाती है।')}</T>
        <Spacer />
        <Big pad={14} size={14} onPress={() => nav.push('checkOut')}>{t('Finish and check out', 'खत्म करें और चेक-आउट')}</Big>
      </Screen>
    </Page>
  );
}

/* 20 · Check out */
export function CheckOut() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const job = st.job;
  const photos = st.photos ?? ['Floor', 'Kitchen'];
  const photoHi: Record<string, string> = { Floor: 'फ़र्श', Kitchen: 'रसोई', Bathroom: 'बाथरूम', Room: 'कमरा' };
  const addPhoto = () => {
    const next = ['Floor', 'Kitchen', 'Bathroom', 'Room'].find((p) => !photos.includes(p)) ?? `Photo ${photos.length + 1}`;
    set({ photos: [...photos, next] });
    nav.toast(t('Photo added', 'फ़ोटो जुड़ गई'));
  };
  const selfie = !!st.selfieOut;
  return (
    <Page>
      <TopBar><Row><TopH2>{t('Check out', 'चेक-आउट')}</TopH2><Tag>{t('Job', 'काम')} {job.id}</Tag></Row></TopBar>
      <Screen>
        <Grid cols={3}>
          <Card style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }}><T s m>{t('In', 'आए')}</T><T b>11:08</T></Card>
          <Card style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }}><T s m>{t('Out', 'गए')}</T><T b>12:10</T></Card>
          <Card sel style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }}><T s m>{t('Worked', 'काम किया')}</T><T b>{t('1 hr 2 min', '1 घंटा 2 मिनट')}</T></Card>
        </Grid>
        <Card row onPress={() => nav.back()}>
          <Lft><Cb on={job.done.length === job.tasks.length} /><H2>{t(`${job.done.length} of ${job.tasks.length} tasks done`, `${job.tasks.length} में से ${job.done.length} काम पूरे`)}</H2></Lft>
        </Card>
        <H2>{t('Photos of finished work', 'पूरे काम की फ़ोटो')}</H2>
        <Grid cols={3}>
          {photos.map((p) => <PhotoTile key={p} added height={66} label={t(p, photoHi[p])} onPress={() => { set({ photos: photos.filter((x) => x !== p) }); nav.toast(t('Photo removed', 'फ़ोटो हटाई')); }} />)}
          <PhotoTile height={66} bold label={t('+ Add', '+ जोड़ें')} onPress={addPhoto} />
        </Grid>
        <CheckLine on={selfie} sel={!selfie} icon="user" title={t('Check-out selfie', 'चेक-आउट सेल्फ़ी')}
          sub={selfie ? t('Added', 'जुड़ गई') : t("At the customer's door", 'ग्राहक के दरवाज़े पर')} onPress={() => nav.push('selfie', { mode: 'out' })} />
        <CheckLine sel={selfie} title={t('Finish code', 'फ़िनिश कोड')} sub={t('The customer gives one of two codes; it closes the job', 'ग्राहक दो में से एक कोड देगा; इससे काम बंद होगा')}
          onPress={() => (selfie ? nav.push('finishCode') : nav.toast(t('Take the check-out selfie first', 'पहले चेक-आउट सेल्फ़ी लें')))} />
        <Spacer />
        <Row><T m>{t('You earn', 'आपकी कमाई')}</T><H>{rupees(job.earn)}</H></Row>
        {selfie
          ? <Big onPress={() => nav.push('finishCode')}>{t('Ask for the finish code', 'फ़िनिश कोड पूछें')}</Big>
          : <Big disabled={photos.length === 0} onPress={() => nav.push('selfie', { mode: 'out' })}>{t('Take selfie and check out', 'सेल्फ़ी लें और चेक-आउट करें')}</Big>}
      </Screen>
    </Page>
  );
}
