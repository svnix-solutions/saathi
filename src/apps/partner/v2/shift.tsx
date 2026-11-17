/** Design page 26 · shift check, training, start code, early payout (screens 32–35). */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Button, Card, CharacterTile, CheckRow, Check, Col, H, H2, Hr, Icon, IconTile, Lft, OtpInput, Pill, Grid, Row, Screen,
  Sheet, Spacer, T, Tag, TopBar, palette, useAppState, useNav, useT, useTheme, type IconName,
} from '@/native/ui';
import { codes, decisions, rupees } from '@/data/decisions';
import { PartnerTabs, initialPartnerState, type PartnerState } from '../chrome';
import { Circle, Meter, Root, TopLabel, TopProgress, onGreen } from './kit';

/* ---------- 32 · Shift check-in ---------- */
export function ShiftCheckScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useAppState<PartnerState>();
  const [selfie, setSelfie] = useState<'none' | 'checking' | 'ok'>('none');
  const [checks, setChecks] = useState({ uniform: true, id: true, phone: false });
  useEffect(() => {
    if (selfie !== 'checking') return;
    const id = setTimeout(() => setSelfie('ok'), 1200);
    return () => clearTimeout(id);
  }, [selfie]);
  const allTicked = checks.uniform && checks.id && checks.phone;
  const ready = allTicked && selfie === 'ok';
  const items: { k: keyof typeof checks; en: string; hi: string }[] = [
    { k: 'uniform', en: 'Wearing my uniform', hi: 'मैंने वर्दी पहनी है' },
    { k: 'id', en: 'ID card with me', hi: 'आईडी कार्ड मेरे पास है' },
    { k: 'phone', en: 'Phone charged above 30%', hi: 'फ़ोन 30% से ज़्यादा चार्ज है' },
  ];
  return (
    <Root>
      <Screen>
        <Lft>
          <CharacterTile name="laundry" size={64} />
          <H style={{ flex: 1 }}>{t('Before you go online', 'ऑनलाइन होने से पहले')}</H>
        </Lft>
        <Pressable onPress={() => selfie === 'none' && setSelfie('checking')} accessibilityRole="button" accessibilityLabel="Take a selfie">
          <Circle size={130} border={selfie === 'ok' ? palette.green : c.accent} bg={selfie === 'ok' ? c.mint : undefined}>
            <Icon name={selfie === 'ok' ? 'check' : 'user'} size={34} color={c.accent} />
            <H2 color={c.accent} center>
              {selfie === 'none' ? t('Take a selfie', 'सेल्फ़ी लें') : selfie === 'checking' ? t('Matching…', 'मिला रहे हैं…') : t('It is you', 'पहचान हो गई')}
            </H2>
          </Circle>
        </Pressable>
        <T s m center>{t('We match it with your photo so no one else can use your account.', 'हम इसे आपकी फ़ोटो से मिलाते हैं ताकि कोई और आपका खाता न चला सके।')}</T>
        <Card style={{ gap: 13 }}>
          {items.map((i) => (
            <CheckRow key={i.k} size={24} on={checks[i.k]} label={t(i.en, i.hi)} onPress={() => setChecks((s) => ({ ...s, [i.k]: !s[i.k] }))} />
          ))}
        </Card>
        <Spacer />
        {!ready && (
          <T s m center>
            {selfie !== 'ok' ? t('Take the selfie to continue', 'आगे बढ़ने के लिए सेल्फ़ी लें') : t('Tick all three to go online', 'ऑनलाइन होने के लिए तीनों पर निशान लगाएँ')}
          </T>
        )}
        <Button big disabled={!ready} onPress={() => { set({ online: true }); nav.reset('home'); nav.toast(t('You are online. Jobs will come soon.', 'आप ऑनलाइन हैं।')); }}>
          {t('Go online', 'ऑनलाइन हों')}
        </Button>
      </Screen>
    </Root>
  );
}

/* ---------- 33 · Training lessons ---------- */
type Lesson = { id: string; title: string; hi: string; mins: number; icon: IconName; q: string; options: string[]; answer: number };
const lessons: Lesson[] = [
  { id: 'greet', title: 'Greeting the customer', hi: 'ग्राहक का अभिवादन', mins: 4, icon: 'user', q: 'What do you say first at the door?', options: ['Namaste, I am from Saathi', 'Where is the mop?', 'Nothing, just start'], answer: 0 },
  { id: 'floors', title: 'Floors: sweep and mop', hi: 'फ़र्श: झाड़ू और पोछा', mins: 6, icon: 'home', q: 'Which comes first?', options: ['Mop', 'Sweep', 'Either'], answer: 1 },
  { id: 'scrub', title: 'Kitchen and bathroom scrub', hi: 'किचन और बाथरूम की सफ़ाई', mins: 5, icon: 'drop', q: 'Which cloth is for the toilet?', options: ['The kitchen cloth', 'The red cloth only', 'Any clean cloth'], answer: 1 },
  { id: 'safety', title: 'Safety with cleaners', hi: 'क्लीनर के साथ सुरक्षा', mins: 4, icon: 'shield', q: 'Can you mix bleach with an acid cleaner?', options: ['Yes, it cleans faster', 'Never', 'Only in the bathroom'], answer: 1 },
  { id: 'app', title: 'Using this app', hi: 'यह ऐप चलाना', mins: 3, icon: 'list', q: 'When do you tap "I have arrived"?', options: ['When I leave home', 'At the customer’s door', 'After the job'], answer: 1 },
];

export function TrainingScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [done, setDone] = useState<string[]>(['greet', 'floors']);
  const [watched, setWatched] = useState<Record<string, number>>({ scrub: 2 });
  const [open, setOpen] = useState<Lesson | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pick, setPick] = useState<number | null>(null);
  const [testSheet, setTestSheet] = useState(false);
  const [slot, setSlot] = useState('Sat 10 am');

  // play advances "minutes watched" once a second (1 s = 1 min in the prototype)
  useEffect(() => {
    if (!playing || !open) return;
    const id = setInterval(() => {
      setWatched((w) => {
        const now = Math.min(open.mins, (w[open.id] ?? 0) + 1);
        if (now >= open.mins) setPlaying(false);
        return { ...w, [open.id]: now };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, open]);

  const firstOpen = lessons.findIndex((l) => !done.includes(l.id));
  const openLesson = (l: Lesson, i: number) => {
    if (i > firstOpen && firstOpen >= 0) { nav.toast(t(`Opens after lesson ${i}`, `पाठ ${i} के बाद खुलेगा`)); return; }
    setOpen(l); setPick(null); setPlaying(false);
  };
  const w = open ? (done.includes(open.id) ? open.mins : watched[open.id] ?? 0) : 0;
  const finished = open ? w >= open.mins : false;

  return (
    <Root>
      <TopBar>
        <TopLabel>{t('Training', 'ट्रेनिंग')}</TopLabel>
        <H color={onGreen}>{t(`${done.length} of ${lessons.length} lessons done`, `${lessons.length} में से ${done.length} पाठ पूरे`)}</H>
        <TopProgress pct={done.length / lessons.length} />
      </TopBar>
      <Screen>
        {lessons.map((l, i) => {
          const isDone = done.includes(l.id);
          const current = i === firstOpen;
          const locked = firstOpen >= 0 && i > firstOpen;
          return (
            <Card key={l.id} row sel={current} onPress={() => openLesson(l, i)} style={locked ? { opacity: 0.6 } : undefined}>
              <Lft style={{ flex: 1 }}>
                {isDone ? <Check on size={24} /> : <IconTile name={l.icon} bg={current ? c.card : undefined} />}
                <View style={{ flex: 1 }}>
                  <H2>{t(l.title, l.hi)}</H2>
                  <T s m>
                    {isDone ? `${l.mins} min video` : locked ? `Opens after lesson ${i}` : `${watched[l.id] ?? 0} of ${l.mins} min watched`}
                  </T>
                </View>
              </Lft>
              {current && <Tag>{(watched[l.id] ?? 0) > 0 ? t('Continue', 'जारी रखें') : t('Start', 'शुरू करें')}</Tag>}
            </Card>
          );
        })}
        <Spacer />
        <Button variant="outline" onPress={() => done.length === lessons.length ? setTestSheet(true) : nav.toast(t('Finish all 5 lessons first', 'पहले सभी 5 पाठ पूरे करें'))}>
          {t('Book my home visit test', 'होम विज़िट टेस्ट बुक करें')}
        </Button>
      </Screen>

      <Sheet visible={!!open} onClose={() => { setOpen(null); setPlaying(false); }}>
        {open && (
          <>
            <Row><H2>{t(open.title, open.hi)}</H2><Tag tone="x">{`${w} of ${open.mins} min`}</Tag></Row>
            <Pressable onPress={() => !finished && setPlaying((p) => !p)} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Play'}
              style={{ height: 120, borderRadius: 14, backgroundColor: palette.greenD, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: palette.yellow, alignItems: 'center', justifyContent: 'center' }}>
                {finished ? <Icon name="check" color={palette.ink} /> : playing ? <T b color={palette.ink}>II</T> : <T b color={palette.ink} size={16}>▶</T>}
              </View>
            </Pressable>
            <Meter pct={w / open.mins} style={{ flex: 0 }} />
            {finished ? (
              <Col gap={8}>
                <H2>{t('Quick question', 'एक छोटा सवाल')}: {open.q}</H2>
                {open.options.map((o, i) => (
                  <Card key={o} sel={pick === i} tone={pick === i && i !== open.answer ? 'red' : undefined} onPress={() => setPick(i)} style={{ paddingVertical: 9 }}>
                    <T>{o}</T>
                  </Card>
                ))}
                {pick !== null && pick !== open.answer && <T s color={c.red}>{t('Not quite. Try again.', 'सही नहीं। फिर कोशिश करें।')}</T>}
                <Button disabled={pick !== open.answer} onPress={() => {
                  if (!done.includes(open.id)) setDone((d) => [...d, open.id]);
                  nav.toast(t('Lesson done. Next one is open.', 'पाठ पूरा हुआ।'));
                  setOpen(null);
                }}>{t('Finish lesson', 'पाठ पूरा करें')}</Button>
              </Col>
            ) : (
              <Button onPress={() => setPlaying((p) => !p)}>{playing ? t('Pause', 'रोकें') : w > 0 ? t('Continue watching', 'देखना जारी रखें') : t('Play video', 'वीडियो चलाएँ')}</Button>
            )}
          </>
        )}
      </Sheet>

      <Sheet visible={testSheet} onClose={() => setTestSheet(false)}>
        <H2>{t('Home visit test', 'होम विज़िट टेस्ट')}</H2>
        <T s m>A trainer watches one real visit and gives feedback.</T>
        <Grid cols={3}>
          {['Sat 10 am', 'Sat 2 pm', 'Sun 10 am'].map((s) => <Pill key={s} sel={slot === s} onPress={() => setSlot(s)}>{s}</Pill>)}
        </Grid>
        <Button onPress={() => { setTestSheet(false); nav.toast(`Test booked for ${slot}`); }}>{t('Book', 'बुक करें')} {slot}</Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 34 · Start with start code ---------- */
export function DoorCodeScreen({ params }: { params: { code?: string } }) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useAppState<PartnerState>();
  const job = st.job ?? initialPartnerState.job;
  const right = params.code ?? codes.start;
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [away, setAway] = useState(false);
  const tries = st.startTries ?? 0;
  const left = codes.maxTries - tries;
  const locked = left <= 0;
  const start = () => {
    if (code !== right) { set({ startTries: tries + 1 }); setError(true); setCode(''); return; }
    set({ jobStarted: true, startTries: 0, startVerified: true });
    nav.toast(t(`Code matches. ${job.minutes / 60 >= 1 ? job.minutes / 60 + ' hr' : job.minutes + ' min'} clock started.`, 'कोड सही है। घड़ी शुरू।'));
    nav.replace('onJob');
  };
  return (
    <Root>
      <TopBar>
        <Row><H2 color={onGreen}>{t('You have arrived', 'आप पहुँच गए')}</H2><Tag>{t('On time', 'समय पर')}</Tag></Row>
      </TopBar>
      <Screen>
        <Card row>
          <Lft style={{ flex: 1 }}>
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>{job.customer} · 2nd floor</T></View>
          </Lft>
          <IconTile name="call" onPress={() => nav.toast(`Calling ${job.customer}…`)} />
        </Card>
        {locked ? <>
          <H style={{ marginTop: 8 }}>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है')}</H>
          <T m>{t(`${codes.maxTries} wrong start codes were typed. Support will call ${job.customer} and start the job with you.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया। सपोर्ट ${job.customer} को कॉल करके आपके साथ काम शुरू करेगा।`)}</T>
          <Spacer />
          <Button big icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'साथी सपोर्ट को कॉल हो रहा है…'))}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
        </> : <>
        <H style={{ marginTop: 8 }}>{t('Ask the customer for their start code', 'ग्राहक से स्टार्ट कोड पूछें')}</H>
        <OtpInput value={code} error={error} onChange={(v) => { setCode(v); setError(false); }} />
        {error
          ? <T s color={c.red}>{t(`Code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T>
          : <T s m>{t('The 1 hr clock starts when the code matches.', 'कोड मिलते ही 1 घंटे की घड़ी शुरू होगी।')}</T>}
        <T s m>{t(`After ${codes.maxTries} wrong codes only support can start the job.`, `${codes.maxTries} गलत कोड के बाद काम सिर्फ़ सपोर्ट शुरू कर सकता है।`)}</T>
        <T s m>{t('Prototype start code', 'प्रोटोटाइप स्टार्ट कोड')}: {right}</T>
        <Spacer />
        <Button big disabled={code.length < 4} onPress={start}>{t('Start job', 'काम शुरू करें')}</Button>
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => setAway(true)}>
          {t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}
        </Button>
        </>}
      </Screen>
      <Sheet visible={away} onClose={() => setAway(false)}>
        <H2>{t('Customer is not at home', 'ग्राहक घर पर नहीं हैं')}</H2>
        <T s m>Wait 10 minutes. If they do not come, you still get {rupees(decisions.partner.paidOnCustomerCancel)} for the trip.</T>
        <Button onPress={() => { setAway(false); nav.toast(`Calling ${job.customer}…`); }} icon="call">{t('Call the customer', 'ग्राहक को कॉल करें')}</Button>
        <Button variant="outline" onPress={() => { setAway(false); nav.toast('Timer started. We will tell you in 10 min.'); }}>{t('Wait 10 minutes', '10 मिनट रुकें')}</Button>
        <Button variant="outline" danger onPress={() => { setAway(false); nav.reset('home'); nav.toast(`Job closed. ${rupees(decisions.partner.paidOnCustomerCancel)} added to earnings.`); }}>
          {t('Mark as no-show', 'ग्राहक नहीं आए')}
        </Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 35 · Take out earnings ---------- */
type Payout = { label: string; date: string; amount: number };
export function PayoutEarlyScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const fee = decisions.partner.instantPayoutFee;
  const [balance, setBalance] = useState(2846);
  const [mode, setMode] = useState<'monday' | 'now'>('monday');
  const [amount, setAmount] = useState(2846);
  const [confirm, setConfirm] = useState(false);
  const [history, setHistory] = useState<Payout[]>([
    { label: 'Weekly payout', date: 'Mon 9 Nov', amount: 2610 },
    { label: 'Taken early', date: 'Thu 5 Nov', amount: 800 },
    { label: 'Weekly payout', date: 'Mon 2 Nov', amount: 1945 },
  ]);
  const choices = [balance, 2000, 1000, 500].filter((v, i, a) => v <= balance && v > fee && a.indexOf(v) === i);
  const take = Math.min(amount, balance);
  return (
    <Root>
      <TopBar>
        <TopLabel>{t('Ready to take out', 'निकालने के लिए तैयार')}</TopLabel>
        <H color={onGreen} size={30}>{rupees(balance)}</H>
        <T s color={onGreen} style={{ opacity: 0.8 }}>State Bank ···· 4821</T>
      </TopBar>
      <Screen>
        <Card row sel={mode === 'monday'} onPress={() => setMode('monday')}>
          <View><H2>{t(`Wait for ${decisions.partner.payoutDay}`, 'सोमवार तक रुकें')}</H2><T s m>{t('Free · comes on its own', 'मुफ़्त · अपने आप आएगा')}</T></View>
          <Tag tone="n">{t('No fee', 'कोई फ़ीस नहीं')}</Tag>
        </Card>
        <Card row sel={mode === 'now'} onPress={() => setMode('now')}>
          <View><H2>{t('Take it now', 'अभी निकालें')}</H2><T s m>{t('In your bank in a few minutes', 'कुछ मिनट में बैंक में')}</T></View>
          <Tag>{rupees(fee)} fee</Tag>
        </Card>
        {mode === 'now' && balance > fee && (
          <>
            <H2>{t('How much?', 'कितना?')}</H2>
            <Grid cols={4} gap={6}>
              {choices.map((v) => <Pill key={v} s sel={take === v} onPress={() => setAmount(v)}>{v === balance ? t('All', 'सब') : rupees(v)}</Pill>)}
            </Grid>
            <Button onPress={() => setConfirm(true)}>{t(`Take out ${rupees(take)} now`, `अभी ${rupees(take)} निकालें`)}</Button>
          </>
        )}
        <H2>{t('Earlier', 'पहले')}</H2>
        <Card style={{ gap: 9 }}>
          {history.map((h, i) => (
            <React.Fragment key={h.date + i}>
              {i > 0 && <Hr />}
              <Row><View><T b>{h.label}</T><T s m>{h.date}</T></View><T b>{rupees(h.amount)}</T></Row>
            </React.Fragment>
          ))}
        </Card>
        <Spacer />
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => nav.push('bank')}>
          {t('Change bank account', 'बैंक खाता बदलें')}
        </Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>{t('Take out now?', 'अभी निकालें?')}</H2>
        <Card style={{ gap: 8 }}>
          <Row><T>Amount</T><T b>{rupees(take)}</T></Row>
          <Row><T>Instant fee</T><T b>− {rupees(fee)}</T></Row>
          <Hr />
          <Row><T b>You get</T><T b color={c.accent}>{rupees(take - fee)}</T></Row>
        </Card>
        <T s m>To State Bank ···· 4821. The rest comes free on {decisions.partner.payoutDay}.</T>
        <Button onPress={() => {
          setBalance((b) => b - take);
          setHistory((h) => [{ label: 'Taken early', date: 'Today', amount: take - fee }, ...h]);
          setConfirm(false); setMode('monday'); setAmount(500);
          nav.toast(`${rupees(take - fee)} on its way to State Bank`);
        }}>{t(`Confirm · get ${rupees(take - fee)}`, `पक्का करें · ${rupees(take - fee)}`)}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>{t('Cancel', 'रद्द करें')}</Button>
      </Sheet>
    </Root>
  );
}
