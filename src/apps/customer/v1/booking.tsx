/** Design page 03 · Book a helper (screens 5–8). */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Check, CheckRow, Grid, H, H2, Hr, Icon, Input, Lft, Link, Pill, Row, Screen, Spacer, T,
  palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { decisions, rupees, services, type ServiceId } from '@/data/decisions';
import { CustomerTabs } from '../chrome';
import { dur, priceOf, shortName, svc, svcName, taskName, useV1 } from './kit';

/* 5 · Home */
export function Home() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useV1();
  const grid = services.slice(0, 4);
  const custom = services[4];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Row>
          <Lft>
            <Icon name="pin" color={c.accent} />
            <View>
              <H2>{st.address.label === 'Home' ? t('Home', 'घर') : st.address.label}</H2>
              <T s m>{st.address.line === 'Flat 204, Block C' ? t('Flat 204, Block C', 'फ़्लैट 204, ब्लॉक सी') : st.address.line}</T>
            </View>
          </Lft>
          <Pressable onPress={() => nav.reset('account')} accessibilityLabel="Account"><Avatar face="nk" size={32} /></Pressable>
        </Row>
        <Card tone="yellow" onPress={() => nav.push('chores', { service: st.service })}>
          <Lft>
            <CharacterTile name="hero" />
            <View>
              <H2 color={palette.ink}>{t('Helper in 15 minutes', '15 मिनट में हेल्पर')}</H2>
              <T s color={palette.ink}>{t('Or schedule for later', 'या बाद का समय चुनें')}</T>
            </View>
          </Lft>
        </Card>
        <H size={16}>{t('What needs doing today?', 'आज क्या काम करवाना है?')}</H>
        <Grid cols={2}>
          {grid.map((s) => (
            <Card key={s.id} onPress={() => nav.push('chores', { service: s.id })}>
              <CharacterTile name={s.character} />
              <H2 style={{ marginTop: 5 }}>{svcName(t, s.id)}</H2>
              <T s m>{t(`from ${rupees(s.per30)}`, `${rupees(s.per30)} से`)}</T>
            </Card>
          ))}
        </Grid>
        <Card row onPress={() => nav.push('chores', { service: custom.id })}>
          <Lft>
            <CharacterTile name={custom.character} />
            <View>
              <H2>{svcName(t, custom.id)}</H2>
              <T s m>{t(`You choose the chores · ${rupees(custom.per30)}`, `काम आप चुनें · ${rupees(custom.per30)}`)}</T>
            </View>
          </Lft>
        </Card>
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

/* 6 · Choose chores */
export function Chores({ params }: ScreenProps<{ service?: ServiceId }>) {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const id: ServiceId = params.service ?? st.service;
  const s = svc(id);
  const [ticked, setTicked] = useState<string[]>(() =>
    id === st.service && st.tasks.length ? st.tasks.filter((x) => s.tasks.includes(x)) : s.tasks.slice(0, Math.min(3, s.tasks.length)));
  const [note, setNote] = useState(id === st.service ? st.note : '');
  const toggle = (task: string) => setTicked((l) => (l.includes(task) ? l.filter((x) => x !== task) : [...l, task]));
  return (
    <Screen>
      <BackHeader title={svcName(t, id)} onBack={nav.back} />
      <Lft>
        <CharacterTile name={s.character} size={64} />
        <H style={{ flex: 1 }}>{t('What should the helper do?', 'हेल्पर क्या काम करे?')}</H>
      </Lft>
      <Card style={{ gap: 11 }}>
        {s.tasks.map((task) => <CheckRow key={task} on={ticked.includes(task)} label={taskName(t, task)} onPress={() => toggle(task)} />)}
      </Card>
      <H2>{t('Anything specific?', 'कुछ खास?')}</H2>
      <Input small multiline value={note} onChangeText={setNote} style={{ minHeight: 70 }}
        placeholder={t("Please do the kids' room first.", 'पहले बच्चों का कमरा कर दें।')} />
      <T s m>{t('Helpers bring nothing with them. Keep your broom, mop and cleaner ready.', 'हेल्पर कुछ साथ नहीं लाते। झाड़ू, पोछा और क्लीनर तैयार रखें।')}</T>
      <Spacer />
      <Button disabled={!ticked.length} onPress={() => { set({ service: id, tasks: ticked, note }); nav.push('time'); }}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

const durations = [30, 60, 90, 120, 150, 180];
const days = [
  { id: 'today', en: 'Today', hi: 'आज' },
  { id: 'tomorrow', en: 'Tomorrow', hi: 'कल' },
  { id: 'wed', en: 'Wed 18', hi: 'बुध 18' },
] as const;

/* 7 · Duration and time */
export function Time() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const [minutes, setMinutes] = useState(st.minutes);
  const [when, setWhen] = useState(st.when);
  const [day, setDay] = useState(st.day ?? 'tomorrow');
  const price = priceOf({ service: st.service, minutes });
  const dayLabel = days.find((d) => d.id === day)!;
  return (
    <Screen>
      <BackHeader title={t('Time', 'समय')} onBack={nav.back} />
      <H>{t('How long?', 'कितनी देर?')}</H>
      <Grid cols={3}>
        {durations.map((m) => <Pill key={m} sel={minutes === m} onPress={() => setMinutes(m)}>{dur(t, m)}</Pill>)}
      </Grid>
      <H style={{ marginTop: 6 }}>{t('When?', 'कब?')}</H>
      <Grid cols={2}>
        <Card sel={when === 'now'} onPress={() => setWhen('now')}>
          <Icon name="bolt" color={c.accent} fill />
          <H2>{t('Now', 'अभी')}</H2>
          <T s m>{t('Arrives in 15 min', '15 मिनट में पहुँचेंगे')}</T>
        </Card>
        <Card sel={when === 'later'} onPress={() => setWhen('later')}>
          <Icon name="clock" />
          <H2>{t('Schedule', 'समय तय करें')}</H2>
          <T s m>{when === 'later' ? t(`${dayLabel.en} · 10:00 am`, `${dayLabel.hi} · सुबह 10:00`) : t('Pick date and time', 'तारीख और समय चुनें')}</T>
        </Card>
      </Grid>
      <Grid cols={3}>
        {days.map((d) => (
          <Pill key={d.id} s sel={when === 'later' && day === d.id} onPress={() => { setWhen('later'); setDay(d.id); }}>{t(d.en, d.hi)}</Pill>
        ))}
      </Grid>
      <Card style={{ gap: 8 }}>
        <H2>{t('Good to know', 'जानने लायक')}</H2>
        {[
          t('Add 30 minutes while the helper is there', 'हेल्पर के रहते 30 मिनट और जोड़ें'),
          t(`Free to cancel until ${decisions.customer.freeCancelUntilHrs} hr before`, `${decisions.customer.freeCancelUntilHrs} घंटा पहले तक मुफ़्त रद्द करें`),
          t('Pay only after the visit is booked', 'बुकिंग पक्की होने के बाद ही भुगतान'),
        ].map((x) => <Lft key={x}><Check on /><T s style={{ flex: 1 }}>{x}</T></Lft>)}
      </Card>
      <Spacer />
      <Row gap={12}>
        <View>
          <T s m>{`${dur(t, minutes)} · ${shortName(t, st.service)}${when === 'later' ? ' · ' + t(dayLabel.en, dayLabel.hi) : ''}`}</T>
          <H>{rupees(price)}</H>
        </View>
        <Button style={{ flex: 1 }} onPress={() => { set({ minutes, when, day }); nav.push('confirm'); }}>{t('Continue', 'आगे बढ़ें')}</Button>
      </Row>
    </Screen>
  );
}

/** "Sweep, mop, dusting, surfaces" for the default chores, else the ticked list. */
function taskSummary(t: (e: string, h?: string) => string, tasks: string[]) {
  const def = ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];
  if (tasks.length === 3 && def.every((d) => tasks.includes(d))) return t('Sweep, mop, dusting, surfaces', 'झाड़ू, पोछा, धूल, सतहें');
  return tasks.map((x) => taskName(t, x)).join(', ');
}

/* 8 · Confirm and pay */
export function Confirm() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const s = svc(st.service);
  const price = priceOf(st);
  const day = { today: ['Today', 'आज'], tomorrow: ['Tomorrow', 'कल'], wed: ['Wed 18', 'बुध 18'] }[st.day ?? 'tomorrow'];

  const book = () => {
    if (st.pay === 'upi' && st.simulatePaymentFail && !st.paymentFailedOnce) {
      set({ paymentFailedOnce: true });
      nav.push('err.paymentFailed');
      return;
    }
    set({ extraMinutes: 0 });
    if (st.when === 'later') {
      set({ upcoming: { service: st.service, minutes: st.minutes, slot: `${day[0]} · 10:00 am`, slotHi: `${day[1]} · सुबह 10:00`, helper: 'Rekha M.' } });
      nav.reset('bookings');
      nav.toast(t(`Booked for ${day[0]}, 10:00 am`, `${day[1]} सुबह 10:00 के लिए बुक हुआ`));
      return;
    }
    nav.reset('tracking');
    nav.toast(t('Sunita D. accepted your booking', 'सुनीता डी. ने बुकिंग ले ली'));
  };

  return (
    <Screen>
      <BackHeader title={t('Confirm booking', 'बुकिंग पक्की करें')} onBack={nav.back} />
      <Card>
        <Lft>
          <CharacterTile name={s.character} />
          <View style={{ flex: 1 }}>
            <H2>{`${svcName(t, st.service)} · ${dur(t, st.minutes)}`}</H2>
            <T s m>{taskSummary(t, st.tasks)}</T>
          </View>
        </Lft>
        <Hr style={{ marginVertical: 10 }} />
        <Lft>
          <Icon name={st.when === 'now' ? 'bolt' : 'clock'} color={c.accent} fill={st.when === 'now'} />
          <T>{st.when === 'now' ? t('Arrives in about 15 minutes', 'लगभग 15 मिनट में पहुँचेंगे') : t(`${day[0]} at 10:00 am`, `${day[1]} सुबह 10:00 बजे`)}</T>
        </Lft>
      </Card>
      <Card row>
        <Lft>
          <Icon name="pin" color={c.accent} />
          <View>
            <H2>{st.address.label === 'Home' ? t('Home', 'घर') : st.address.label}</H2>
            <T s m>{st.address.line === 'Flat 204, Block C' ? t('Flat 204, Block C', 'फ़्लैट 204, ब्लॉक सी') : st.address.line}</T>
          </View>
        </Lft>
        <Link onPress={() => nav.push('addresses')}>{t('Change', 'बदलें')}</Link>
      </Card>
      <H2>{t('Pay with', 'भुगतान का तरीका')}</H2>
      <Grid cols={2}>
        <Pill sel={st.pay === 'upi'} onPress={() => set({ pay: 'upi' })}>UPI</Pill>
        <Pill sel={st.pay === 'cash'} onPress={() => set({ pay: 'cash' })}>{t('Cash after job', 'काम के बाद नकद')}</Pill>
      </Grid>
      <Card style={{ gap: 6 }}>
        <Row><T m>{t(`Service, ${dur(t, st.minutes)}`, `सेवा, ${dur(t, st.minutes)}`)}</T><T>{rupees(price)}</T></Row>
        <Row><T m>{t('Arrival fee', 'आने का शुल्क')}</T><T>{rupees(decisions.prices.arrivalFee)}</T></Row>
        <Hr />
        <Row><H2>{t('Total', 'कुल')}</H2><H2>{rupees(price + decisions.prices.arrivalFee)}</H2></Row>
      </Card>
      <Spacer />
      <Button onPress={book}>{t(`Book helper · ${rupees(price)}`, `हेल्पर बुक करें · ${rupees(price)}`)}</Button>
    </Screen>
  );
}
