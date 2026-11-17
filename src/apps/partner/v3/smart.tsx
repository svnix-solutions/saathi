/** Design page 30 (section 56 "WORKER G"): voice guide, demand map, photo check, earnings planner. */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  BackHeader, Bubble, Button, Card, CharacterTile, Col, H, H2, Hr, Icon, IconTile, Lft, MapMock, Pill, Row, Screen,
  Sheet, Spacer, T, Tag, Toggle, TopBar, Grid, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { rupees } from '@/data/decisions';
import { PartnerTabs } from '../chrome';
import { PhotoTile, Progress, TopH, TopS } from './kit';

/* ---------- 47 · Voice guide ---------- */
const SCRIPT = ['ब्लॉक सी में सफ़ाई का काम।', 'एक घंटा।', 'छह मिनट दूर।', 'आपको ₹126 मिलेंगे।'];
const SCRIPT_EN = ['Cleaning job in Block C.', 'One hour.', 'Six minutes away.', 'You will get ₹126.'];

export function VoiceGuideScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0); // 0–40 ticks of reading progress
  const [secs, setSecs] = useState(24);
  const [heard, setHeard] = useState<string | null>(null);
  const done = step >= 40;

  useEffect(() => {
    if (!playing || done) return;
    const id = setInterval(() => setStep((s) => Math.min(40, s + 1)), 100);
    return () => clearInterval(id);
  }, [playing, done]);
  useEffect(() => { if (done) setPlaying(false); }, [done]);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const shown = Math.ceil((step / 40) * SCRIPT.length);
  const accept = () => { nav.toast(t('Job accepted · head to Block C', 'काम मिल गया · ब्लॉक सी चलें')); setTimeout(() => nav.push('onJob'), 600); };
  const decline = () => { nav.toast(t('Job declined', 'काम मना किया')); setTimeout(() => nav.reset('home'), 600); };
  const mic = () => {
    if (!done) { setPlaying((p) => !p); return; }
    setHeard('हाँ');
    setTimeout(accept, 700);
  };

  return (
    <Screen bg={palette.greenD}>
      <Row>
        <H2 color="#fff">{t('New job', 'नया काम')}</H2>
        <Tag>{secs > 0 ? `${t('Accept in', 'स्वीकार करें')} 0:${String(secs).padStart(2, '0')}` : t('Time up', 'समय खत्म')}</Tag>
      </Row>
      <Card>
        <Lft>
          <IconTile name="mic" bg={palette.yellow} color={palette.ink} onPress={() => { setStep(0); setPlaying(true); }} />
          <View style={{ flex: 1 }}>
            <H2>{done ? t('Read aloud · tap to replay', 'सुन लिया · फिर से सुनें') : playing ? t('Reading the job aloud', 'काम पढ़ा जा रहा है') : t('Paused', 'रुका हुआ')}</H2>
            <T s m>हिन्दी में सुनें</T>
          </View>
        </Lft>
        <View style={{ marginTop: 10 }}>
          <Bubble>
            <T size={13}>"{SCRIPT.map((w, i) => <T key={i} size={13} color={i < shown ? c.ink : c.mut} style={{ opacity: i < shown ? 1 : 0.35 }}>{w} </T>)}"</T>
          </Bubble>
        </View>
        <Progress pct={step / 40} track={c.line} fill={palette.green} height={4} style={{ marginTop: 9 }} />
        <T s m style={{ marginTop: 6 }}>{SCRIPT_EN.slice(0, Math.max(1, shown)).join(' ')}</T>
      </Card>
      <T s center color="#cfe5dd">{heard ? `${t('Heard', 'सुना')}: "${heard}"` : 'Say "हाँ" to accept or "नहीं" to decline'}</T>
      <Pressable onPress={mic} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Play'}
        style={{ alignSelf: 'center', width: 84, height: 84, borderRadius: 42, backgroundColor: '#0b5d4b', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: palette.yellow, alignItems: 'center', justifyContent: 'center' }}>
          {playing ? (
            <View style={{ flexDirection: 'row', gap: 5 }}><View style={{ width: 6, height: 22, backgroundColor: palette.ink, borderRadius: 2 }} /><View style={{ width: 6, height: 22, backgroundColor: palette.ink, borderRadius: 2 }} /></View>
          ) : <Icon name="mic" size={26} color={palette.ink} />}
        </View>
      </Pressable>
      <T s center color="#cfe5dd">{done ? t('Tap the mic and answer', 'माइक दबाएँ और बोलें') : playing ? t('Tap to pause', 'रोकने के लिए दबाएँ') : t('Tap to keep listening', 'सुनने के लिए दबाएँ')}</T>
      <Spacer />
      <Button variant="yellow" style={{ paddingVertical: 16 }} textStyle={{ fontSize: 15 }} onPress={accept}>{t('Accept job', 'काम लें')}</Button>
      <Button variant="ghostDark" onPress={decline}>{t('Decline', 'मना करें')}</Button>
    </Screen>
  );
}

/* ---------- 48 · Demand map ---------- */
const AREAS = [
  { id: 'D', name: 'Block D', min: 5, waiting: 8, extra: 20, busy: 'Very busy', zone: { left: 10, top: 110, width: 120, height: 100 }, tone: 'r' as const },
  { id: 'S', name: 'Sector 18', min: 12, waiting: 3, extra: 0, busy: 'Busy', zone: { left: 150, top: 6, width: 110, height: 90 }, tone: 'y' as const },
  { id: 'C', name: 'Block C', min: 2, waiting: 0, extra: 0, busy: 'Busy at 6 pm', zone: { left: 60, top: 0, width: 80, height: 70 }, tone: 'x' as const },
];

export function DemandMapScreen() {
  const nav = useNav();
  const t = useT();
  const [sel, setSel] = useState('D');
  const go = (a: typeof AREAS[number]) => nav.toast(`${t('Directions to', 'रास्ता')} ${a.name} · ${a.min} min${a.extra ? ` · ₹${a.extra} extra per job` : ''}`);
  return (
    <View style={{ flex: 1 }}>
      <MapMock height={250} route={false} dots={[{ x: 142, y: 120, icon: 'user' }]}>
        {AREAS.map((a) => {
          const on = a.id === sel;
          const bg = a.tone === 'r' ? 'rgba(179,38,30,.3)' : a.tone === 'y' ? 'rgba(255,201,60,.6)' : 'rgba(11,93,75,.18)';
          return (
            <Pressable key={a.id} onPress={() => setSel(a.id)} accessibilityLabel={a.name}
              style={{ position: 'absolute', ...a.zone, borderRadius: 999, backgroundColor: bg, borderWidth: on ? 2.5 : 0, borderColor: palette.green, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', opacity: on ? 1 : 0.65 }}>
              <Tag tone={a.tone}>{on ? a.name : a.busy}</Tag>
            </Pressable>
          );
        })}
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Lft><CharacterTile name="custom" /><H>{t('Where the work is', 'काम कहाँ है')}</H></Lft>
        <Grid cols={3}>
          {AREAS.map((a) => <Pill key={a.id} s sel={a.id === sel} onPress={() => setSel(a.id)}>{a.name}</Pill>)}
        </Grid>
        {AREAS.filter((a) => a.waiting > 0).map((a) => (
          <Card key={a.id} row sel={a.id === sel} onPress={() => setSel(a.id)}>
            <View style={{ flex: 1 }}>
              <H2>{a.name} · {a.min} min away</H2>
              <T s m>{a.waiting} customers waiting{a.extra ? ` · ₹${a.extra} extra per job` : ''}</T>
            </View>
            <Button variant={a.id === sel ? 'primary' : 'outline'} style={{ paddingVertical: a.id === sel ? 7 : 6, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }} onPress={() => go(a)}>{t('Go', 'चलें')}</Button>
          </Card>
        ))}
        {sel === 'C'
          ? <Card sel><H2>Block C · you are here</H2><T s m>Quiet now. Busy again around 6 pm.</T></Card>
          : <T s m>Busy again around 6 pm in Block C.</T>}
      </Screen>
    </View>
  );
}

/* ---------- 49 · Instant photo check ---------- */
type PState = 'empty' | 'checking' | 'pass' | 'fail';
const PHOTOS = [
  { id: 'floor', label: 'Floor', title: 'Floor photo' },
  { id: 'kitchen', label: 'Kitchen', title: 'Kitchen slab photo' },
  { id: 'balcony', label: 'Balcony', title: 'Balcony photo' },
];

export function PhotoCheckScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [ps, setPs] = useState<Record<string, PState>>({ floor: 'pass', kitchen: 'pass', balcony: 'fail' });
  const capture = (id: string) => {
    setPs((s) => ({ ...s, [id]: 'checking' }));
    // The simulated check passes after a short pause (the retake has the light on).
    setTimeout(() => setPs((s) => ({ ...s, [id]: 'pass' })), 1100);
  };
  const all = PHOTOS.every((p) => ps[p.id] === 'pass');
  return (
    <Screen>
      <BackHeader title={t('Work photos', 'काम की फ़ोटो')} onBack={nav.back} />
      {PHOTOS.map((p) => {
        const s = ps[p.id];
        return (
          <Card key={p.id} tone={s === 'fail' ? 'red' : undefined} onPress={s === 'pass' ? () => capture(p.id) : undefined}>
            <Lft>
              <PhotoTile label={p.label} dark={s === 'fail'}>
                {s === 'checking' ? <T s color={c.accent}>…</T> : s === 'empty' ? <Icon name="cam" color={c.accent} /> : undefined}
              </PhotoTile>
              <View style={{ flex: 1 }}>
                <H2>{p.title}</H2>
                {s === 'pass' && <Lft gap={4}><Icon name="check" size={14} color={c.accent} /><T s color={c.accent}>Looks clean and clear</T></Lft>}
                {s === 'fail' && <T s color={c.red}>Too dark to see. Take it again with the light on.</T>}
                {s === 'checking' && <T s m>{t('Checking photo…', 'फ़ोटो जाँच रहे हैं…')}</T>}
                {s === 'empty' && <T s m>{t('Tap to take photo', 'फ़ोटो लें')}</T>}
              </View>
            </Lft>
            {s === 'fail' && <Button variant="outline" icon="cam" style={{ marginTop: 10, paddingVertical: 9 }} onPress={() => capture(p.id)}>{t('Retake photo', 'फिर से फ़ोटो लें')}</Button>}
          </Card>
        );
      })}
      <T s m>Checked on your phone in a second, so nothing is disputed later.</T>
      <Spacer />
      <Button disabled={!all} onPress={() => nav.push('checkOut')}>{t('Continue to check out', 'चेक आउट करें')}</Button>
    </Screen>
  );
}

/* ---------- 50 · Earnings planner ---------- */
const SLOTS = [
  { id: 'sat-am', label: 'Sat 7 to 10 am', amt: 520 },
  { id: 'sat-pm', label: 'Sat 5 to 8 pm', amt: 380 },
  { id: 'sun-am', label: 'Sun 8 to 11 am', amt: 460 },
];
const PER_HOUR = 130;

export function PlannerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [goal, setGoal] = useState(4000);
  const [picked, setPicked] = useState<string[]>(['sat-am', 'sun-am']);
  const [extraHrs, setExtraHrs] = useState(2);
  const [remind, setRemind] = useState(true);
  const [sheet, setSheet] = useState(false);
  const earned = 2846;
  const toGo = Math.max(0, goal - earned);
  const planned = SLOTS.filter((s) => picked.includes(s.id)).reduce((a, s) => a + s.amt, 0) + extraHrs * PER_HOUR;
  const projected = earned + planned;
  const reach = projected >= goal;
  const jobs = Math.ceil(toGo / 165);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <TopS>{t('My goal this week', 'इस हफ़्ते का लक्ष्य')}</TopS>
        <TopH>{rupees(goal)}</TopH>
        <Progress pct={earned / goal} extra={planned / goal} style={{ marginTop: 10 }} />
        <TopS style={{ marginTop: 4 }}>{rupees(earned)} earned · {toGo ? `${rupees(toGo)} to go` : 'goal reached'}</TopS>
      </TopBar>
      <Screen>
        <Card sel={reach} tone={reach ? undefined : 'red'}>
          <H2>{reach ? t('You can reach it', 'आप पहुँच सकती हैं') : `${rupees(goal - projected)} short with this plan`}</H2>
          <T s m>{reach ? `About ${jobs} more jobs, at the pace you usually work.` : 'Pick another time below or add hours.'} Plan: about {rupees(projected)}.</T>
        </Card>
        <H2>{t('Best times for you', 'आपके लिए सबसे अच्छा समय')}</H2>
        <Card style={{ gap: 9 }}>
          {SLOTS.map((s, i) => (
            <React.Fragment key={s.id}>
              {i > 0 && <Hr />}
              <Pressable onPress={() => toggle(s.id)} accessibilityRole="checkbox" accessibilityState={{ checked: picked.includes(s.id) }}>
                <Row>
                  <Lft gap={7}>
                    <View style={{ width: 16, height: 16, borderRadius: 5, borderWidth: 1.5, borderColor: picked.includes(s.id) ? palette.green : c.line, backgroundColor: picked.includes(s.id) ? palette.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                      {picked.includes(s.id) && <Icon name="check" size={11} color="#fff" strokeWidth={3} />}
                    </View>
                    <T m={!picked.includes(s.id)}>{s.label}</T>
                  </Lft>
                  <T b color={picked.includes(s.id) ? c.accent : c.mut}>about ₹{s.amt}</T>
                </Row>
              </Pressable>
            </React.Fragment>
          ))}
        </Card>
        <Row><H2>Extra hours on weekdays</H2><T s m>about ₹{extraHrs * PER_HOUR}</T></Row>
        <Grid cols={4} gap={6}>
          {[0, 2, 4, 6].map((h) => <Pill key={h} s sel={extraHrs === h} onPress={() => setExtraHrs(h)}>{h} hr</Pill>)}
        </Grid>
        <Card row>
          <View style={{ flex: 1 }}><H2>Remind me before these times</H2><T s m>A message 30 min before</T></View>
          <Toggle on={remind} onChange={(v) => { setRemind(v); nav.toast(v ? 'Reminders on' : 'Reminders off'); }} />
        </Card>
        <Spacer />
        <Button variant="outline" onPress={() => setSheet(true)}>{t('Change my goal', 'लक्ष्य बदलें')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Weekly goal', 'हफ़्ते का लक्ष्य')}</H2>
        <Grid cols={4} gap={6}>
          {[3000, 4000, 5000, 6000].map((g) => <Pill key={g} s sel={goal === g} onPress={() => setGoal(g)}>{rupees(g)}</Pill>)}
        </Grid>
        <Col gap={2}><T s m>{t('Your usual week is about ₹3,800.', 'आपका आम हफ़्ता लगभग ₹3,800 का है।')}</T></Col>
        <Button onPress={() => { setSheet(false); nav.toast(`Goal set to ${rupees(goal)}`); }}>{t('Save goal', 'लक्ष्य सेव करें')}</Button>
      </Sheet>
    </View>
  );
}
