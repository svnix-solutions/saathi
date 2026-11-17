/** Design page 20 (section 4): Home, new job request, on the job, earnings. Plus the Jobs tab (not drawn). */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, Button, Card, CharacterTile, CheckRow, Grid, H, H2, Hr, Icon, IconTile, Lft, Pill, Row, Screen, Sheet, Spacer, T, Tag, Toggle,
  palette, useAppState, useNav, useT, useTheme,
} from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { PartnerTabs } from '../chrome';
import { Big, Page, Plain, TopBar, TopH, TopH2, TopT, defaultToday, leftLabel, mmss, useCountdown, useJobClock, type V1State } from './kit';

/** The job that rings on Home (design screen 10). */
export const newJob = {
  id: '#2041', service: 'General cleaning', minutes: 60, earn: 126, address: 'Flat 204, Block C', customer: 'Nitin K.',
  note: "Please do the kids' room first.", tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'], done: [] as string[],
};
export const taskHi: Record<string, string> = {
  'Sweep and mop floors': 'झाड़ू और पोछा', Dusting: 'धूल झाड़ना', 'Wipe surfaces': 'सतहें पोंछना',
  'Wash dishes': 'बर्तन धोना', 'Wipe kitchen': 'रसोई पोंछना',
};
export const serviceHi: Record<string, string> = {
  'General cleaning': 'सामान्य सफ़ाई', 'Kitchen & bath scrub': 'रसोई और बाथरूम', 'Dishes & meal prep': 'बर्तन और खाना तैयारी', Dishes: 'बर्तन',
};

/* 9 · Home, online (and offline) */
export function Home() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const online = st.online;
  // A new job rings ~4 s after going online (once per online session).
  useEffect(() => {
    if (!online || st.offerShown || st.autoOffer === false) return;
    const id = setTimeout(() => { set({ offerShown: true }); nav.push('jobRequest'); }, 4000);
    return () => clearTimeout(id);
  }, [online, st.offerShown, st.autoOffer]);
  const hour = new Date().getHours();
  const greet = hour < 12 ? t('Good morning', 'सुप्रभात') : hour < 17 ? t('Good afternoon', 'नमस्ते') : t('Good evening', 'शुभ संध्या');
  return (
    <Page>
      <TopBar>
        <Row>
          <View>
            <TopT dim>Saathi Partner · {greet}</TopT>
            <TopH>{t(st.name, st.name === 'Sunita' ? 'सुनीता' : st.name)}</TopH>
          </View>
          <Lft gap={10}>
            <Pressable onPress={() => nav.push('alerts')} accessibilityLabel={t('Alerts', 'सूचनाएँ')} hitSlop={6}>
              <Icon name="bell" color="#fff" size={20} />
            </Pressable>
            <Pressable onPress={() => nav.push('profile')} accessibilityLabel={t('My profile', 'मेरी प्रोफ़ाइल')}><Avatar face="sd" size={40} /></Pressable>
          </Lft>
        </Row>
      </TopBar>
      <Screen>
        <Card sel={online} row>
          <View style={{ flex: 1 }}>
            <H2>{online ? t('You are online', 'आप ऑनलाइन हैं') : t('You are offline', 'आप ऑफ़लाइन हैं')}</H2>
            <T s m>{online ? t('Jobs near you will ring', 'पास का काम आने पर घंटी बजेगी') : t('Turn on to get jobs near you', 'काम पाने के लिए चालू करें')}</T>
          </View>
          <Toggle big on={online} onChange={(v) => { set({ online: v, offerShown: false }); nav.toast(v ? t('You are online', 'आप ऑनलाइन हैं') : t('You are offline. No new jobs will ring.', 'आप ऑफ़लाइन हैं। नया काम नहीं आएगा।')); }} />
        </Card>
        <Grid cols={2}>
          <Card onPress={() => nav.reset('jobs')}><T s m>{t('Jobs today', 'आज के काम')}</T><H>{st.jobsToday ?? 3}</H></Card>
          <Card onPress={() => nav.reset('earnings')}><T s m>{t('Earned today', 'आज की कमाई')}</T><H>{rupees(st.earnedToday ?? 412)}</H></Card>
        </Grid>
        <H2>{t('Next job', 'अगला काम')}</H2>
        <Card onPress={() => nav.push('jobRequest')}>
          <Row><H2>{t('Kitchen & bath scrub', 'रसोई और बाथरूम')}</H2><Tag>2:00 pm</Tag></Row>
          <Lft gap={6} style={{ marginTop: 6 }}><Icon name="pin" color={c.mut} size={16} /><T s m>{t('Block A · 1.4 km away', 'ब्लॉक ए · 1.4 किमी दूर')}</T></Lft>
        </Card>
        {online ? (
          <Card onPress={() => nav.push('err.noJobs')}><T s m>{t('Waiting for a new job. Stay within your area to get more requests.', 'नए काम का इंतज़ार। ज़्यादा काम के लिए अपने इलाके में रहें।')}</T></Card>
        ) : (
          <Card tone="clear"><T s m>{t('You will not get new jobs while offline. Jobs booked ahead still show here.', 'ऑफ़लाइन रहने पर नया काम नहीं आएगा। पहले से बुक काम यहाँ दिखेंगे।')}</T></Card>
        )}
        <Row style={{ marginTop: 2 }}>
          {([
            ['shield', 'My ID card', 'मेरा आईडी', 'idCard'], ['clock', 'Hours', 'समय', 'hours'], ['user', 'Joining', 'जुड़ना', 'joining'], ['call', 'Help', 'मदद', 'help'],
          ] as const).map(([icon, en, hi, route]) => (
            <Pressable key={route} onPress={() => nav.push(route)} style={{ alignItems: 'center', gap: 4, flex: 1 }} accessibilityRole="button">
              <IconTile name={icon} /><T s m>{t(en, hi)}</T>
            </Pressable>
          ))}
        </Row>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

/* 10 · New job request (timed accept) */
export function JobRequest() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const job = (st.offer as typeof newJob | undefined) ?? newJob;
  const [left] = useCountdown(24);
  useEffect(() => {
    if (left > 0) return;
    set({ offerShown: true, offer: undefined });
    nav.reset('home');
    nav.toast(t('Missed: the job went to another partner', 'छूट गया: काम दूसरे पार्टनर को गया'));
  }, [left]);
  const accept = () => {
    set({ job: { ...job, done: [] }, offer: undefined, offerShown: true, selfieIn: false, selfieOut: false, jobEndsAt: undefined, photos: undefined });
    nav.replace('checkIn');
    nav.toast(t('Job accepted. Head to Block C.', 'काम मंज़ूर। ब्लॉक सी जाएँ।'));
  };
  const service = job.service;
  return (
    <Page bg={palette.greenD}>
      <Screen bg={palette.greenD}>
        <Row><H2 color="#fff">{t('New job', 'नया काम')}</H2><Tag>{t(`Accept in ${mmss(left)}`, `${mmss(left)} में मंज़ूर करें`)}</Tag></Row>
        <Card style={{ marginTop: 8 }}>
          <Lft><CharacterTile name={service.startsWith('Dish') ? 'kitchen' : 'clean'} /><View><H>{t(service, serviceHi[service])}</H><T s m>{t(`${job.minutes >= 60 ? job.minutes / 60 + ' hr' : job.minutes + ' min'} · start now`, `${job.minutes >= 60 ? job.minutes / 60 + ' घंटा' : job.minutes + ' मिनट'} · अभी शुरू`)}</T></View></Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Lft><Icon name="pin" color={palette.green} /><View><H2>{t(job.id === '#2041' ? 'Block C · 0.8 km' : 'Block C · 0.4 km', job.id === '#2041' ? 'ब्लॉक सी · 0.8 किमी' : 'ब्लॉक सी · 0.4 किमी')}</H2><T s m>{t(job.id === '#2041' ? 'About 6 min by cycle' : 'About 3 min walk', job.id === '#2041' ? 'साइकिल से लगभग 6 मिनट' : 'पैदल लगभग 3 मिनट')}</T></View></Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Row><T m>{t('You earn', 'आपकी कमाई')}</T><H size={26}>{rupees(job.earn)}</H></Row>
        </Card>
        <Card tone="clear" style={{ borderColor: '#2d6a5b', borderWidth: 1 }}>
          <T s color="#cfe5dd">{t('Tasks', 'काम')}: {job.tasks.map((x) => t(x.toLowerCase(), taskHi[x])).join(', ')}</T>
        </Card>
        <Spacer />
        <Big variant="yellow" pad={18} size={16} onPress={accept}>{t('Accept job', 'काम मंज़ूर करें')}</Big>
        <Button variant="ghostDark" onPress={() => { set({ offerShown: true, offer: undefined }); nav.reset('home'); nav.toast(t('Job declined', 'काम मना किया')); }}>{t('Decline', 'मना करें')}</Button>
      </Screen>
    </Page>
  );
}

/** Ticked task list shared by "On the job" and "No internet". */
export function TaskList({ gap = 14 }: { gap?: number }) {
  const t = useT();
  const [st, set] = useAppState<V1State>();
  const job = st.job;
  const toggle = (x: string) => set({ job: { ...job, done: job.done.includes(x) ? job.done.filter((d) => d !== x) : [...job.done, x] } });
  return (
    <Card style={{ gap }}>
      {job.tasks.map((x) => <CheckRow key={x} size={24} on={job.done.includes(x)} label={t(x, taskHi[x])} onPress={() => toggle(x)} />)}
    </Card>
  );
}

/** "Finish job" with a check that every task is ticked. */
export function FinishButton({ label, labelHi, pad = 16, size = 15 }: { label: string; labelHi: string; pad?: number; size?: number }) {
  const t = useT();
  const nav = useNav();
  const [st] = useAppState<V1State>();
  const [ask, setAsk] = useState(false);
  const missing = st.job.tasks.filter((x) => !st.job.done.includes(x));
  return (
    <>
      <Big pad={pad} size={size} onPress={() => (missing.length ? setAsk(true) : nav.push('finishCode'))}>{t(label, labelHi)}</Big>
      <Sheet visible={ask} onClose={() => setAsk(false)}>
        <H2>{t(`${missing.length} task not ticked`, `${missing.length} काम पर टिक नहीं`)}</H2>
        <T s m>{missing.map((x) => t(x, taskHi[x])).join(', ')}. {t('Tick it if it is done, or tell the customer why.', 'हो गया हो तो टिक करें, नहीं तो ग्राहक को कारण बताएँ।')}</T>
        <Big onPress={() => setAsk(false)}>{t('Keep working', 'काम जारी रखें')}</Big>
        <Plain onPress={() => { setAsk(false); nav.push('finishCode'); }}>{t('Finish anyway', 'फिर भी खत्म करें')}</Plain>
      </Sheet>
    </>
  );
}

/* 11 · On the job */
export function OnJob() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useAppState<V1State>();
  const left = useJobClock();
  const hi = useTheme().locale === 'hi';
  const job = st.job;
  return (
    <Page>
      <TopBar>
        <Row><TopH2>{t(job.service, serviceHi[job.service])} · {t(job.minutes / 60 + ' hr', job.minutes / 60 + ' घंटा')}</TopH2><Tag>{leftLabel(left, hi)}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }} onPress={() => nav.push('live')} accessibilityRole="button">
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>{job.customer}</T></View>
          </Pressable>
          <IconTile name="call" onPress={() => nav.toast(t(`Calling ${job.customer} (number hidden)`, `${job.customer} को कॉल (नंबर छुपा)`))} />
        </Card>
        <Card tone="yellow">
          <T s b color={palette.ink}>{t('Customer note', 'ग्राहक का संदेश')}</T>
          <T color={palette.ink}>{t(job.note, job.note === newJob.note ? 'कृपया पहले बच्चों का कमरा करें।' : job.note)}</T>
        </Card>
        <Row><H2>{t('Tasks', 'काम')}</H2><Lft gap={14}><Pressable onPress={() => nav.push('live')}><T s b color={c.accent}>{t('Live', 'लाइव')}</T></Pressable><Pressable onPress={() => nav.push('help')}><T s b color={c.accent}>{t('Help', 'मदद')}</T></Pressable></Lft></Row>
        <TaskList />
        <Spacer />
        <FinishButton label="Finish job" labelHi="काम खत्म करें" />
      </Screen>
    </Page>
  );
}

/** Daily bars you can tap (M–S). */
function DayBars({ values, sel, onSel }: { values: number[]; sel: number; onSel: (i: number) => void }) {
  const { c } = useTheme();
  const max = Math.max(...values, 1);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 9, height: 96 }}>
        {values.map((v, i) => (
          <Pressable key={i} onPress={() => onSel(i)} accessibilityLabel={`Day ${i + 1}: ${rupees(v)}`}
            style={{ flex: 1, height: `${Math.max(v / max, 0.08) * 100}%`, borderRadius: 5, backgroundColor: i === sel ? palette.green : v === 0 ? c.line : c.mint }} />
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 9, marginTop: 6 }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => <T key={i} s m center style={{ flex: 1 }}>{l}</T>)}</View>
    </View>
  );
}

const dayNames = [['Monday', 'सोमवार'], ['Tuesday', 'मंगलवार'], ['Wednesday', 'बुधवार'], ['Thursday', 'गुरुवार'], ['Friday', 'शुक्रवार'], ['Saturday', 'शनिवार'], ['Sunday', 'रविवार']];

/* 12 · Earnings */
export function Earnings() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useAppState<V1State>();
  const week = st.week ?? 2846;
  const today = st.today ?? defaultToday;
  const todayTotal = st.earnedToday ?? 412;
  // 46 / 62 / 38 / 80 / 55 / 100 / 8 % of Saturday, as drawn
  const days = [0.46, 0.62, 0.38, 0.8, 0.55, 1, 0.08].map((p) => Math.round(p * 640));
  days[5] = todayTotal + 228;
  const [sel, setSel] = useState(5);
  const [line, setLine] = useState<(typeof today)[number] | null>(null);
  return (
    <Page>
      <TopBar>
        <TopT dim>{t('This week', 'इस हफ़्ते')}</TopT>
        <TopH size={30}>{rupees(week)}</TopH>
        <TopT dim>{t(`${st.weekJobs ?? 19} jobs · paid every ${decisions.partner.payoutDay}`, `${st.weekJobs ?? 19} काम · हर सोमवार भुगतान`)}</TopT>
      </TopBar>
      <Screen>
        <Card>
          <DayBars values={days} sel={sel} onSel={setSel} />
          <T s m center style={{ marginTop: 8 }}>{t(dayNames[sel][0], dayNames[sel][1])} · {rupees(days[sel])}</T>
        </Card>
        <H2>{sel === 5 ? t('Today', 'आज') : t(dayNames[sel][0], dayNames[sel][1])}</H2>
        {(sel === 5 ? today : today.slice(0, 2)).map((l, i) => (
          <Card key={i} row onPress={() => setLine(l)}>
            <View><H2>{t(l.title, l.titleHi)}</H2><T s m>{l.sub}</T></View>
            <H2 color={l.tip ? c.accent : undefined}>{l.tip ? `+ ${rupees(l.amt)}` : rupees(l.amt)}</H2>
          </Card>
        ))}
        <Card tone="clear" row onPress={() => nav.push('bank')}>
          <T s m style={{ flex: 1 }}>{t('Paid to State Bank ···· 4821 every Monday', 'हर सोमवार स्टेट बैंक ···· 4821 में')}</T>
          <T s b color={c.accent}>{t('Change', 'बदलें')}</T>
        </Card>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={!!line} onClose={() => setLine(null)}>
        {line && <>
          <Row><H2>{t(line.title, line.titleHi)}</H2><H2>{rupees(line.amt)}</H2></Row>
          <T s m>{line.sub}</T>
          {!line.tip && <Card style={{ gap: 8 }}>
            <Row><T>{t('Customer paid', 'ग्राहक ने दिया')}</T><T>{rupees(Math.round(line.amt / decisions.partner.share))}</T></Row>
            <Row><T>{t('Your share (80%)', 'आपका हिस्सा (80%)')}</T><T b>{rupees(line.amt)}</T></Row>
          </Card>}
          <T s m>{t('Goes into Monday’s payout.', 'सोमवार के भुगतान में जुड़ेगा।')}</T>
          <Big onPress={() => setLine(null)}>{t('OK', 'ठीक है')}</Big>
        </>}
      </Sheet>
    </Page>
  );
}

type JobRow = { en: string; hi: string; when: string; whereEn: string; whereHi: string; earn: number; state: 'now' | 'next' | 'later' | 'done' };
const jobRows: JobRow[] = [
  { en: 'General cleaning', hi: 'सामान्य सफ़ाई', when: '11:10 am · 1 hr', whereEn: 'Flat 204, Block C', whereHi: 'फ़्लैट 204, ब्लॉक सी', earn: 126, state: 'done' },
  { en: 'Dishes & meal prep', hi: 'बर्तन और खाना तैयारी', when: '9:00 am · 1.5 hr', whereEn: 'Block B · 0.6 km', whereHi: 'ब्लॉक बी · 0.6 किमी', earn: 189, state: 'done' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', when: '2:00 pm · 2 hr', whereEn: 'Block A · 1.4 km', whereHi: 'ब्लॉक ए · 1.4 किमी', earn: 206, state: 'next' },
  { en: 'Monthly plan · Nitin K.', hi: 'मासिक प्लान · नितिन के.', when: 'Tomorrow 8:00 am · 1 hr', whereEn: 'Flat 204, Block C', whereHi: 'फ़्लैट 204, ब्लॉक सी', earn: 126, state: 'later' },
  { en: 'Kitchen & bath scrub', hi: 'रसोई और बाथरूम', when: 'Tue 2 pm · 2 hr', whereEn: 'Block A', whereHi: 'ब्लॉक ए', earn: 206, state: 'later' },
];

/* Jobs tab: today's and upcoming jobs (not drawn in the design). */
export function Jobs() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useAppState<V1State>();
  const [tab, setTab] = useState<'today' | 'later'>('today');
  const [open, setOpen] = useState<JobRow | null>(null);
  const active = !!st.selfieIn && !st.selfieOut;
  const rows = jobRows.filter((r) => (tab === 'today' ? r.state !== 'later' : r.state === 'later'));
  return (
    <Page>
      <TopBar>
        <TopT dim>{t('My jobs', 'मेरे काम')}</TopT>
        <TopH>{t(`${st.jobsToday ?? 3} today`, `आज ${st.jobsToday ?? 3}`)}</TopH>
        <TopT dim>{t('1 more booked this afternoon', 'आज दोपहर 1 और बुक')}</TopT>
      </TopBar>
      <Screen>
        <Grid cols={2}>
          <Pill sel={tab === 'today'} onPress={() => setTab('today')}>{t('Today', 'आज')}</Pill>
          <Pill sel={tab === 'later'} onPress={() => setTab('later')}>{t('Upcoming', 'आगे के')}</Pill>
        </Grid>
        {active && tab === 'today' && (
          <Card sel onPress={() => nav.push('onJob')}>
            <Row><H2>{t(st.job.service, serviceHi[st.job.service])}</H2><Tag tone="g">{t('Now', 'अभी')}</Tag></Row>
            <T s m style={{ marginTop: 4 }}>{st.job.address} · {t('tap to open', 'खोलने के लिए दबाएँ')}</T>
          </Card>
        )}
        {rows.map((r, i) => (
          <Card key={i} onPress={() => setOpen(r)}>
            <Row>
              <H2 style={{ flex: 1 }}>{t(r.en, r.hi)}</H2>
              {r.state === 'done' ? <Tag tone="n">{t('Done', 'हो गया')}</Tag> : r.state === 'next' ? <Tag>2:00 pm</Tag> : <Tag tone="x">{t('Booked', 'बुक')}</Tag>}
            </Row>
            <Row style={{ marginTop: 4 }}>
              <T s m>{r.when} · {t(r.whereEn, r.whereHi)}</T>
              <T s b color={r.state === 'done' ? c.accent : undefined}>{rupees(r.earn)}</T>
            </Row>
          </Card>
        ))}
        <Card tone="clear" row onPress={() => nav.push('hours')}>
          <Lft><Icon name="clock" color={c.accent} /><T>{t('My working hours', 'मेरे काम के घंटे')}</T></Lft>
          <Icon name="chevron" color={c.mut} />
        </Card>
      </Screen>
      <PartnerTabs active="jobs" />
      <Sheet visible={!!open} onClose={() => setOpen(null)}>
        {open && <>
          <Row><H2>{t(open.en, open.hi)}</H2><H2>{rupees(open.earn)}</H2></Row>
          <T s m>{open.when} · {t(open.whereEn, open.whereHi)}</T>
          {open.state === 'done'
            ? <T s>{t('Finished and paid into this week. Customer rated 5 stars.', 'पूरा हुआ, इस हफ़्ते के भुगतान में जुड़ा। ग्राहक ने 5 स्टार दिए।')}</T>
            : <T s>{t('We remind you 30 minutes before. Check in at the door with a selfie.', 'हम 30 मिनट पहले याद दिलाएँगे। दरवाज़े पर सेल्फ़ी से चेक-इन करें।')}</T>}
          {open.state === 'next' && <Big onPress={() => { setOpen(null); nav.push('jobRequest'); }}>{t('Open job', 'काम खोलें')}</Big>}
          {open.state === 'later' && <Plain onPress={() => { setOpen(null); nav.push('swapJob'); }}>{t('I cannot make it', 'मैं नहीं आ पाऊँगी')}</Plain>}
          <Plain onPress={() => setOpen(null)}>{t('Close', 'बंद करें')}</Plain>
        </>}
      </Sheet>
    </Page>
  );
}
