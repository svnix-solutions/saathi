/** Design page 04 · During and after the visit (screens 9–12). */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, Button, Card, CheckRow, Grid, H, H2, IconTile, Input, Lft, Link, MapMock, Pill, Ring, Row, Screen, Sheet, Spacer, Stars, T, Tag,
  palette, useNav, useT, useTheme,
} from '@/native/ui';
import { decisions, priceFor, rupees } from '@/data/decisions';
import { CustomerTabs } from '../chrome';
import { clock, defaultUpcoming, dur, svc, svcName, taskName, useCountdown, useV1 } from './kit';

/* 9 · Helper on the way */
export function Tracking() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const small = device === 'small';
  const [eta, setEta] = useCountdown(12, true, 2000); // one "minute" every 2 s
  const [cancel, setCancel] = useState(false);
  const arrived = eta === 0;
  useEffect(() => {
    if (!arrived) return;
    const id = setTimeout(() => nav.replace('inProgress'), 2500);
    return () => clearTimeout(id);
  }, [arrived]);
  const hx = 142; // design: home dot at left 142, helper starts at 42
  const hy = small ? 52 : 84;
  // helper dot slides from x=42 towards the home dot as the ETA drops
  const px = arrived ? hx : 42 + ((hx - 42) * (12 - eta)) / 12;
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => setEta(0)} accessibilityLabel={t('Skip to arrival', 'पहुँचने तक आगे बढ़ें')}>
        <MapMock height={small ? 150 : 230} route={!arrived} dots={[
          { x: px, y: hy, icon: 'user', tone: 'yellow' },
          { x: hx, y: hy, icon: 'home' },
        ]} />
      </Pressable>
      <Screen style={{ paddingTop: 14 }}>
        <Tag tone={arrived ? 'g' : 'y'}>{arrived ? t('Arrived', 'पहुँच गईं') : t('On the way', 'रास्ते में')}</Tag>
        <Pressable onPress={() => setEta(0)}>
          <H>{arrived ? t('Sunita is at your door', 'सुनीता आपके दरवाज़े पर हैं') : eta === 1 ? t('Arriving in 1 minute', '1 मिनट में पहुँचेंगी') : t(`Arriving in ${eta} minutes`, `${eta} मिनट में पहुँचेंगी`)}</H>
        </Pressable>
        <Card row>
          <Lft>
            <Avatar face="sd" />
            <View>
              <H2>Sunita D.</H2>
              <T s m>{t('Trained · ID checked', 'प्रशिक्षित · आईडी जाँची गई')}</T>
            </View>
          </Lft>
          <IconTile name="call" onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…'))} />
        </Card>
        <Row gap={4}>
          <T s b color={c.accent}>{t('Assigned', 'तय')}</T>
          <View style={{ flex: 1, height: 3, backgroundColor: palette.green, borderRadius: 2 }} />
          <T s b color={c.accent}>{t('On the way', 'रास्ते में')}</T>
          <View style={{ flex: 1, height: 3, backgroundColor: arrived ? palette.green : c.line, borderRadius: 2 }} />
          {arrived ? <T s b color={c.accent}>{t('Arrived', 'पहुँचीं')}</T> : <T s m>{t('Arrived', 'पहुँचीं')}</T>}
        </Row>
        <Card>
          <T s m>{t('Share this code when the helper arrives: ', 'हेल्पर के आने पर यह कोड बताएँ: ')}<T b size={14} color={c.ink} style={{ letterSpacing: 2.8 }}>4 8 2 1</T></T>
        </Card>
        <Spacer />
        {arrived
          ? <Button onPress={() => nav.replace('inProgress')}>{t('Start the visit', 'काम शुरू करें')}</Button>
          : <Button variant="outline" danger onPress={() => setCancel(true)}>{t('Cancel booking', 'बुकिंग रद्द करें')}</Button>}
      </Screen>
      <Sheet visible={cancel} onClose={() => setCancel(false)}>
        <H>{t('Cancel this booking?', 'यह बुकिंग रद्द करें?')}</H>
        <T m>{t(`Sunita is already on the way, so a ₹${decisions.customer.lateCancelFee} fee applies. After she arrives it is ₹${decisions.customer.cancelAfterArrival}.`,
          `सुनीता रास्ते में हैं, इसलिए ₹${decisions.customer.lateCancelFee} शुल्क लगेगा। उनके पहुँचने के बाद ₹${decisions.customer.cancelAfterArrival}।`)}</T>
        <Button variant="outline" danger onPress={() => { setCancel(false); nav.reset('home'); nav.toast(t('Booking cancelled', 'बुकिंग रद्द हुई')); }}>
          {t(`Cancel · ₹${decisions.customer.lateCancelFee}`, `रद्द करें · ₹${decisions.customer.lateCancelFee}`)}
        </Button>
        <Button onPress={() => setCancel(false)}>{t('Keep my helper', 'हेल्पर रहने दें')}</Button>
      </Sheet>
    </View>
  );
}

/* 10 · Job in progress */
export function InProgress() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const extra = st.extraMinutes ?? 0;
  const total = (st.minutes + extra) * 60;
  // the design opens at 38:12 left of 1 hr (37% done)
  const [left, setLeft] = useCountdown(Math.round(st.minutes * 60 * 0.6367));
  const tasks = st.tasks.length ? st.tasks : ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'];
  const [done, setDone] = useState<string[]>(tasks.slice(0, Math.min(2, tasks.length - 1)));
  const allDone = tasks.every((x) => done.includes(x));
  const per30 = svc(st.service).per30;
  useEffect(() => { if (left === 0) nav.replace('rate'); }, [left]);
  return (
    <Screen>
      <Row><H2>{t('Job in progress', 'काम चल रहा है')}</H2><Tag>{t('Live', 'लाइव')}</Tag></Row>
      <Ring pct={1 - left / total}>
        <View style={{ alignItems: 'center' }}>
          <H size={26}>{clock(left)}</H>
          <T s m>{t(`left of ${dur(t, st.minutes + extra)}`, `${dur(t, st.minutes + extra)} में से बाकी`)}</T>
        </View>
      </Ring>
      <Card style={{ gap: 10 }}>
        {tasks.map((x) => (
          <CheckRow key={x} done on={done.includes(x)} label={taskName(t, x)}
            onPress={() => setDone((l) => (l.includes(x) ? l.filter((y) => y !== x) : [...l, x]))} />
        ))}
      </Card>
      <Card row>
        <Lft><Avatar face="sd" size={32} /><H2>Sunita D.</H2></Lft>
        <IconTile name="call" onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…'))} />
      </Card>
      <Spacer />
      {allDone && <Button onPress={() => nav.replace('rate')}>{t('All done · rate the visit', 'काम पूरा · रेटिंग दें')}</Button>}
      <Button variant="yellow" onPress={() => {
        set({ extraMinutes: extra + 30 });
        setLeft((x) => x + 30 * 60);
        nav.toast(t(`30 minutes added · ${rupees(per30)}`, `30 मिनट जोड़े गए · ${rupees(per30)}`));
      }}>{t(`Add 30 minutes · ${rupees(per30)}`, `30 मिनट जोड़ें · ${rupees(per30)}`)}</Button>
    </Screen>
  );
}

const rateTags = [['On time', 'समय पर'], ['Thorough', 'अच्छी तरह'], ['Polite', 'विनम्र']] as const;
const tips = [20, 50, 100];

/* 11 · Rate and tip */
export function Rate() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const [stars, setStars] = useState(st.rating ?? 4);
  const [tags, setTags] = useState<string[]>(['On time', 'Thorough']);
  const [tip, setTip] = useState<number>(st.tip ?? 50);
  const [text, setText] = useState('');
  const submit = () => {
    const minutes = st.minutes + (st.extraMinutes ?? 0);
    set({ rating: stars, tip, lastVisit: { service: st.service, minutes, price: priceFor(st.service, minutes) } });
    if (stars <= 2 && nav.has('ratingLow')) { nav.replace('ratingLow'); return; }
    nav.reset('bookings');
    nav.toast(tip ? t(`Thanks! ${rupees(tip)} tip goes to Sunita in full`, `धन्यवाद! ${rupees(tip)} टिप पूरी सुनीता को जाएगी`) : t('Thanks for rating', 'रेटिंग के लिए धन्यवाद'));
  };
  return (
    <Screen>
      <Avatar face="sd" size={64} style={{ alignSelf: 'center', marginTop: 10 }} />
      <H center>{t('How was Sunita?', 'सुनीता का काम कैसा था?')}</H>
      <View style={{ alignItems: 'center' }}><Stars value={stars} onChange={setStars} size={30} /></View>
      <Grid cols={3}>
        {rateTags.map(([en, hi]) => (
          <Pill key={en} s sel={tags.includes(en)} onPress={() => setTags((l) => (l.includes(en) ? l.filter((x) => x !== en) : [...l, en]))}>{t(en, hi)}</Pill>
        ))}
      </Grid>
      <H2 style={{ marginTop: 6 }}>{t('Add a tip', 'टिप दें')}</H2>
      <Grid cols={3}>
        {tips.map((n) => <Pill key={n} sel={tip === n} onPress={() => setTip(tip === n ? 0 : n)}>{rupees(n)}</Pill>)}
      </Grid>
      <Input small multiline value={text} onChangeText={setText} style={{ minHeight: 60 }} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)')} />
      <Spacer />
      <Button onPress={submit}>{t('Submit', 'भेजें')}</Button>
    </Screen>
  );
}

/* 12 · My bookings */
export function Bookings() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useV1();
  const up = st.upcoming === undefined ? defaultUpcoming : st.upcoming;
  const last = st.lastVisit ?? { service: 'general' as const, minutes: 60, price: 158 };
  const again = (service: typeof last.service) => nav.push('chores', { service });
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <H>{t('Your bookings', 'आपकी बुकिंग')}</H>
        <H2 m>{t('Upcoming', 'आने वाली')}</H2>
        {up ? (
          <Card sel>
            <Row><H2>{svcName(t, up.service)}</H2><Tag>{t(up.slot.split(' · ')[0], up.slotHi.split(' · ')[0])}</Tag></Row>
            <T s m style={{ marginTop: 4 }}>{`${t(up.slot.split(' · ')[1], up.slotHi.split(' · ')[1])} · ${dur(t, up.minutes)} · ${rupees(priceFor(up.service, up.minutes))}`}</T>
            <Row style={{ marginTop: 10 }}>
              <Link onPress={() => nav.push('changeBooking')}>{t('Reschedule', 'समय बदलें')}</Link>
              <Link color={c.red} onPress={() => nav.push('changeBooking', { cancel: true })}>{t('Cancel', 'रद्द करें')}</Link>
            </Row>
          </Card>
        ) : (
          <Card><T s m>{t('Nothing booked. Tap Home to book a helper.', 'कोई बुकिंग नहीं। हेल्पर बुक करने के लिए होम दबाएँ।')}</T></Card>
        )}
        <H2 m>{t('Past', 'पिछली')}</H2>
        <Card>
          <Row><H2>{svcName(t, last.service)}</H2><T>{rupees(last.price)}</T></Row>
          <T s m style={{ marginTop: 4 }}>{`${t('Today', 'आज')} · ${dur(t, last.minutes)} · Sunita D.`}</T>
          <View style={{ marginTop: 8 }}><Link onPress={() => again(last.service)}>{t('Book again', 'फिर से बुक करें')}</Link></View>
        </Card>
        <Card>
          <Row><H2>{svcName(t, 'laundry')}</H2><T>{rupees(priceFor('laundry', 90))}</T></Row>
          <T s m style={{ marginTop: 4 }}>{`${t('12 Nov', '12 नवं')} · ${dur(t, 90)}`}</T>
          <View style={{ marginTop: 8 }}><Link onPress={() => again('laundry')}>{t('Book again', 'फिर से बुक करें')}</Link></View>
        </Card>
      </Screen>
      <CustomerTabs active="bookings" />
    </View>
  );
}
