/** Design page 16 (CUSTOMER H): voice, photo estimate and smart booking — screens 56–59. */
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  Bubble, Button, Card, Check, Grid, H, H2, Icon, IconTile, Lft, Link, Mark, Row, Screen, Spacer, T, Tag, Toggle,
  palette, useAppState, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { priceFor, rupees, services } from '@/data/decisions';
import { CustomerTabs, type CustomerState } from '../chrome';
import { Back } from '../v2b/kit';

/* ---------- 56 · Voice booking ---------- */
type VoicePhase = 'idle' | 'listening' | 'done';
export function VoiceBookingScreen({ params }: ScreenProps<{ phase?: VoicePhase }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useAppState<CustomerState>();
  const [phase, setPhase] = useState<VoicePhase>(params?.phase ?? 'idle');
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (phase !== 'listening') return;
    const p = setInterval(() => setPulse((x) => !x), 450);
    const done = setTimeout(() => setPhase('done'), 2600);
    return () => { clearInterval(p); clearTimeout(done); };
  }, [phase]);
  const price = priceFor('general', 60);
  const book = () => {
    set({ service: 'general', minutes: 60, when: 'later', note: 'Kitchen first', slot: 'Tomorrow, 9:00 am' });
    nav.push('confirm');
  };
  const ring = phase === 'listening' ? (pulse ? 116 : 104) : 104;
  return (
    <Screen>
      <Row><H2>{t('Speak to book', 'बोलकर बुक करें')}</H2><Tag tone="n">हिन्दी · English · ਪੰਜਾਬੀ</Tag></Row>
      <View style={{ height: 116, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
        <Pressable onPress={() => setPhase(phase === 'listening' ? 'idle' : 'listening')} accessibilityRole="button" accessibilityLabel={phase === 'listening' ? 'Stop listening' : 'Speak'}
          style={{ width: ring, height: ring, borderRadius: ring / 2, backgroundColor: c.mint, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="mic" size={30} color="#fff" />
          </View>
        </Pressable>
      </View>
      <T s m center>{phase === 'idle' ? t('Tap the mic and say what you need', 'माइक दबाएँ और बताएँ क्या चाहिए') : phase === 'listening' ? t('Listening…', 'सुन रहे हैं…') : t('Tap the mic to say it again', 'दोबारा बोलने के लिए माइक दबाएँ')}</T>
      {phase === 'idle' && (
        <Card style={{ gap: 4 }}>
          <T s m>Try saying</T>
          <T>“कल सुबह 9 बजे एक घंटे की सफ़ाई चाहिए”</T>
          <T>“Dishes for 30 minutes, now”</T>
        </Card>
      )}
      {phase === 'done' && (
        <>
          <Bubble me>कल सुबह 9 बजे एक घंटे की सफ़ाई चाहिए, रसोई पहले।</Bubble>
          <H2>{t('We understood', 'हमने समझा')}</H2>
          <Card sel style={{ gap: 7 }}>
            <Row><T m>Service</T><T b>General cleaning</T></Row>
            <Row><T m>When</T><T b>Tomorrow, 9:00 am</T></Row>
            <Row><T m>How long</T><T b>1 hr · {rupees(price)}</T></Row>
            <Row><T m>Note</T><T b>Kitchen first</T></Row>
          </Card>
        </>
      )}
      <Spacer />
      {phase === 'done' && (
        <Grid cols={2}>
          <Button variant="outline" style={{ paddingVertical: 11 }} onPress={() => { set({ service: 'general', note: 'Kitchen first' }); nav.push('chores', { service: 'general' }); }}>{t('Change', 'बदलें')}</Button>
          <Button style={{ paddingVertical: 12 }} onPress={book}>{t('Book it', 'बुक करें')}</Button>
        </Grid>
      )}
    </Screen>
  );
}

/* ---------- 57 · Photo estimate ---------- */
type PhotoPhase = 'camera' | 'analysing' | 'estimate';
const suggested = ['Kitchen slab scrub', 'Dishes', 'Cabinet fronts'];
export function PhotoEstimateScreen({ params }: ScreenProps<{ phase?: PhotoPhase }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useAppState<CustomerState>();
  const [phase, setPhase] = useState<PhotoPhase>(params?.phase ?? 'camera');
  const [on, setOn] = useState<string[]>(suggested);
  useEffect(() => {
    if (phase !== 'analysing') return;
    const id = setTimeout(() => setPhase('estimate'), 1800);
    return () => clearTimeout(id);
  }, [phase]);
  const minutes = on.length * 30;
  const per30 = services.find((s) => s.id === 'kitchenBath')!.per30;
  const price = (minutes / 30) * per30;
  const hrs = minutes / 60;
  const toggle = (k: string) => setOn((xs) => (xs.includes(k) ? xs.filter((x) => x !== k) : [...xs, k]));
  const use = () => {
    if (!on.length) { nav.toast('Pick at least one task'); return; }
    set({ service: 'kitchenBath', tasks: on, minutes });
    nav.push('time');
  };
  return (
    <Screen>
      <Back title={t('Photo estimate', 'फ़ोटो से अनुमान')} />
      <Pressable onPress={() => setPhase(phase === 'camera' ? 'analysing' : phase === 'estimate' ? 'camera' : phase)} accessibilityRole="button"
        accessibilityLabel={phase === 'camera' ? 'Take photo' : 'Retake photo'}
        style={{ height: 150, borderRadius: 14, backgroundColor: c.mint, alignItems: 'center', justifyContent: 'center', position: 'relative', borderWidth: phase === 'camera' ? 1.5 : 0, borderStyle: 'dashed', borderColor: c.accent }}>
        <View style={{ alignItems: 'center' }}>
          <Icon name="cam" size={30} color={c.accent} />
          <T s color={c.accent}>{phase === 'camera' ? t('Tap to take a photo of the room', 'कमरे की फ़ोटो लेने के लिए दबाएँ') : phase === 'analysing' ? t('Looking at your kitchen…', 'आपकी रसोई देख रहे हैं…') : 'Your kitchen photo'}</T>
        </View>
        {phase === 'estimate' && <Tag style={{ position: 'absolute', left: 10, top: 10 }}>Greasy slab</Tag>}
        {phase === 'estimate' && <Tag style={{ position: 'absolute', right: 10, bottom: 10 }}>Full sink</Tag>}
        {phase === 'analysing' && <View style={{ position: 'absolute', left: 14, right: 14, top: '55%', height: 2, backgroundColor: palette.green, opacity: 0.6 }} />}
      </Pressable>
      {phase === 'estimate' ? (
        <>
          <Row><H2>{t('Suggested for this room', 'इस कमरे के लिए सुझाव')}</H2><Link onPress={() => setPhase('camera')}>{t('Retake', 'फिर से लें')}</Link></Row>
          <Card style={{ gap: 9 }}>
            {suggested.map((k) => (
              <Pressable key={k} onPress={() => toggle(k)} accessibilityRole="checkbox" accessibilityState={{ checked: on.includes(k) }}>
                <Row><Lft><Check on={on.includes(k)} /><T>{k}</T></Lft><T m>30 min</T></Row>
              </Pressable>
            ))}
          </Card>
          <T s m>An estimate from the photo. You can change anything, and the helper confirms at the door.</T>
          <Spacer />
          <Row gap={12}>
            <View><T s m>About {hrs % 1 ? hrs.toFixed(1) : hrs} hr</T><H>{rupees(price)}</H></View>
            <Button style={{ flex: 1 }} onPress={use}>{t('Use this', 'यही लें')}</Button>
          </Row>
        </>
      ) : (
        <>
          <T s m>{phase === 'camera'
            ? 'Take one photo of the room. We suggest the chores, the time and the price.'
            : 'Spotting what needs cleaning…'}</T>
          <Spacer />
          <Button disabled={phase === 'analysing'} icon="cam" onPress={() => setPhase('analysing')}>{phase === 'analysing' ? t('Analysing…', 'जाँच रहे हैं…') : t('Take photo', 'फ़ोटो लें')}</Button>
        </>
      )}
    </Screen>
  );
}

/* ---------- 58 · Smart home screen ---------- */
export function SmartHomeScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<CustomerState & { autoPay?: boolean }>();
  const [fans, setFans] = useState(false);
  const base = priceFor('general', 60);
  const total = base + (fans ? 129 : 0);
  const first = (st.name ?? 'Nitin Kumar').split(' ')[0];
  const repeat = () => {
    set({ service: 'general', minutes: fans ? 90 : 60, when: 'later', slot: 'Saturday, 10:00 am', helper: 'Sunita D.', tasks: fans ? [...(st.tasks ?? []), 'Clean fans'] : st.tasks });
    nav.push('confirm');
  };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <H>{t(`Good morning, ${first}`, `सुप्रभात, ${first}`)}</H>
        <Card sel>
          <T s b color={c.accent}>{t('Your usual', 'आपकी हमेशा वाली बुकिंग')}</T>
          <H2 style={{ fontSize: 15, marginTop: 2 }}>General cleaning, Saturday 10 am</H2>
          <T s m>Booked 4 Saturdays in a row · Sunita is free{fans ? ' · + fans' : ''}</T>
          <Button style={{ marginTop: 10, paddingVertical: 11 }} onPress={repeat}>{t('Book again in one tap', 'एक टैप में फिर बुक करें')} · {rupees(total)}</Button>
        </Card>
        <Card>
          <Lft style={{ alignItems: 'flex-start' }} gap={10}>
            <IconTile name="clock" />
            <View style={{ flex: 1 }}>
              <H2>Fans are due</H2>
              <T s m>Last cleaned 6 weeks ago. Add 30 min on Saturday?</T>
              <Link style={{ marginTop: 6 }} onPress={() => { setFans(!fans); nav.toast(fans ? 'Fans removed from Saturday' : 'Fans added to Saturday · ₹129'); }}>
                {fans ? t('Added · Remove', 'जोड़ा गया · हटाएँ') : t('Add for ₹129', '₹129 में जोड़ें')}
              </Link>
            </View>
          </Lft>
        </Card>
        <Card onPress={() => nav.push('deepClean')}>
          <Lft style={{ alignItems: 'flex-start' }} gap={10}>
            <IconTile name="user" />
            <View style={{ flex: 1 }}>
              <H2>Guests this weekend?</H2>
              <T s m>Book a deep clean for Friday while slots are open.</T>
            </View>
          </Lft>
        </Card>
        <Card row>
          <View style={{ flex: 1 }}><H2>UPI AutoPay</H2><T s m>Pays each visit by itself, up to ₹600</T></View>
          <Toggle on={st.autoPay ?? true} onChange={(v) => { set({ autoPay: v }); nav.toast(v ? 'AutoPay on, up to ₹600 a visit' : 'AutoPay off. You pay after each visit'); }} />
        </Card>
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

/* ---------- 59 · Lock screen and WhatsApp ---------- */
export function LockScreenScreen() {
  const nav = useNav();
  const [mins, setMins] = useState(8);
  const [reply, setReply] = useState(false);
  useEffect(() => {
    if (mins <= 0) return;
    const id = setTimeout(() => setMins((m) => m - 1), 3000);
    return () => clearTimeout(id);
  }, [mins]);
  const pct = Math.min(1, 0.62 + (8 - mins) * 0.0475);
  const clock = `9:${String(52 + (8 - mins)).padStart(2, '0')}`;
  const white = '#fff';
  return (
    <Screen bg={palette.ink}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: white, opacity: 0.7, fontSize: 11 }}>Saturday 21 November</Text>
        <Text style={{ color: white, fontSize: 54, fontWeight: '700', letterSpacing: -1.6, lineHeight: 59 }}>{clock}</Text>
      </View>
      <Card style={{ marginTop: 10 }} onPress={() => nav.push('tracking')}>
        <Row>
          <Lft><Mark size={20} /><T b>Saathi</T></Lft>
          <Tag>{mins > 0 ? 'Live' : 'Arrived'}</Tag>
        </Row>
        <H style={{ marginTop: 8 }}>{mins > 0 ? `Sunita arrives in ${mins} min` : 'Sunita is at your door'}</H>
        <View style={{ height: 7, borderRadius: 4, backgroundColor: palette.mint, marginTop: 9 }}>
          <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 4, backgroundColor: palette.green }} />
        </View>
        <Row style={{ marginTop: 5 }}><T s m>{mins > 0 ? 'On the way' : 'At the door'}</T><T s m>Door code 4821</T></Row>
      </Card>
      <Card onPress={() => setReply(!reply)}>
        <Lft style={{ alignItems: 'flex-start' }} gap={10}>
          <IconTile name="call" bg={palette.green} color="#fff" />
          <View style={{ flex: 1 }}>
            <H2>WhatsApp · Saathi</H2>
            <T s m>{mins > 0 ? `Your helper Sunita is ${mins} min away.` : 'Sunita has reached your door.'} Reply 1 to call her, 2 to change the time.</T>
          </View>
        </Lft>
        {reply && (
          <Grid cols={2} style={{ marginTop: 10 }}>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.toast('Calling Sunita…')}>1 · Call</Button>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.push('changeBooking')}>2 · Change</Button>
          </Grid>
        )}
      </Card>
      <Spacer />
      <Text style={{ color: white, opacity: 0.7, fontSize: 11, textAlign: 'center' }}>Updates on the lock screen and on WhatsApp, without opening the app</Text>
    </Screen>
  );
}
