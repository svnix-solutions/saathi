/** Design page 15 (CUSTOMER M): testimonials — screens 52–55. */
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  Avatar, Button, Card, CharacterTile, Grid, H, H2, Hr, Icon, Lft, Link, Pill, Row, Screen, Sheet, Spacer, Stars, T, Tag,
  Toggle, palette, useAppState, useNav, useT, useTheme, type Face,
} from '@/native/ui';
import { decisions } from '@/data/decisions';
import { CustomerTabs, type CustomerState } from '../chrome';
import { Back, Dots } from './kit';

type Quote = { face: Face; name: string; place: string; stars: number; text: string; short: string; plan?: string; mine?: boolean; deep?: boolean };
const quotes: Quote[] = [
  { face: 'fa', name: 'Farah', place: 'Sector 18', plan: 'monthly plan', stars: 5, text: 'I booked at 8 and by 8:15 Sunita was mopping. My mornings are calm now.', short: 'By 8:15 Sunita was mopping. My mornings are calm now.' },
  { face: 'pn', name: 'Priya', place: 'Sector 21', plan: 'daily help', stars: 4, text: 'The same helper every day. My mother trusts her now.', short: 'The same helper every day. My mother trusts her now.' },
  { face: 'rg', name: 'Rohan', place: 'Block D', plan: 'deep clean', stars: 5, mine: true, deep: true, text: 'Kitchen deep clean before guests came. Worth every rupee.', short: 'Kitchen deep clean before guests came. Worth every rupee.' },
];

export type Testimonial = { status: 'Waiting for approval' | 'Approved' | 'Live' | 'Taken down'; showAs: string; app: boolean; web: boolean; photo: boolean; sent: string };
type TState = CustomerState & { testimonial?: Testimonial };
const myQuote = 'Kitchen slab was spotless. Sunita is always on time.';
const defaultTestimonial: Testimonial = { status: 'Waiting for approval', showAs: 'Nitin, Block C', app: true, web: true, photo: false, sent: 'Sent today' };

/* ---------- 52 · Home with testimonial ---------- */
export function HomeTestimonialScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<CustomerState>();
  const { c } = useTheme();
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 5000); return () => clearInterval(id); }, []);
  const q = quotes[i];
  const book = () => { set({ service: 'general', when: 'now' }); nav.push('chores', { service: 'general' }); };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Row>
          <Pressable onPress={() => nav.push('addresses')} accessibilityRole="button"><Lft>
            <Icon name="pin" color={c.accent} />
            <View><H2>{t(st.address?.label ?? 'Home', 'घर')}</H2><T s m>{st.address?.line ?? 'Flat 204, Block C'}</T></View>
          </Lft></Pressable>
          <Pressable onPress={() => nav.reset('account')} accessibilityLabel="Account"><Avatar face="nk" size={32} /></Pressable>
        </Row>
        <Card tone="yellow" onPress={book}>
          <Lft gap={10}>
            <CharacterTile name="hero" />
            <View style={{ flex: 1 }}><H2 color={palette.ink}>{t('Helper in 15 minutes', '15 मिनट में हेल्पर')}</H2><T s color={palette.ink}>{t('Or schedule for later', 'या बाद के लिए बुक करें')}</T></View>
            <Icon name="chevron" color={palette.ink} />
          </Lft>
        </Card>
        <Row>
          <H2 style={{ fontSize: 15 }}>{t('Loved by your neighbours', 'पड़ोसियों की पसंद')}</H2>
          <Link onPress={() => nav.push('testimonials')}>{t('See all', 'सभी देखें')}</Link>
        </Row>
        <Card sel onPress={() => setI((i + 1) % quotes.length)}>
          <Stars value={q.stars} />
          <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 6, marginBottom: 10, lineHeight: 19, color: c.ink }}>“{q.text}”</Text>
          <Lft>
            <Avatar face={q.face} size={26} />
            <View><T b>{q.name}</T><T s m>{q.place} · {q.plan}</T></View>
          </Lft>
        </Card>
        <Dots count={quotes.length} active={i} onPress={setI} />
        <Grid cols={3}>
          {[['4.6', 'Average', 'औसत'], ['438', 'Ratings', 'रेटिंग'], ['91%', 'On time', 'समय पर']].map(([v, l, hi]) => (
            <Card key={l} style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }} onPress={() => nav.push('testimonials')}>
              <T b>{v}</T><T s m>{t(l, hi)}</T>
            </Card>
          ))}
        </Grid>
      </Screen>
      <CustomerTabs active="home" />
    </View>
  );
}

/* ---------- 53 · All testimonials ---------- */
const filters = [
  { k: 'All', hi: 'सभी', f: (_: Quote) => true },
  { k: 'My area', hi: 'मेरा इलाका', f: (q: Quote) => !!q.mine },
  { k: 'Deep clean', hi: 'डीप क्लीन', f: (q: Quote) => !!q.deep },
];

export function TestimonialsScreen() {
  const t = useT();
  const nav = useNav();
  const [f, setF] = useState(0);
  const list = quotes.filter(filters[f].f);
  return (
    <Screen>
      <Back title={t('What customers say', 'ग्राहक क्या कहते हैं')} />
      <Lft gap={6}>
        {filters.map((x, i) => <Pill key={x.k} s sel={f === i} onPress={() => setF(i)} style={{ paddingVertical: 6, paddingHorizontal: 12 }}>{t(x.k, x.hi)}</Pill>)}
      </Lft>
      {list.map((q) => (
        <Card key={q.name}>
          <Row>
            <Lft><Avatar face={q.face} size={26} /><View><T b>{q.name}</T><T s m>{q.place}</T></View></Lft>
            <Stars value={q.stars} />
          </Row>
          <T style={{ marginTop: 8 }}>“{q.short}”</T>
        </Card>
      ))}
      {list.length === 0 && <T s m center>No testimonials here yet.</T>}
      <Spacer />
      <Button variant="outline" onPress={() => nav.push('testimonialConsent')}>{t('Share your experience', 'अपना अनुभव बताएँ')}</Button>
    </Screen>
  );
}

/* ---------- 54 · Permission to share ---------- */
export function TestimonialConsentScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useAppState<TState>();
  const [showAs, setShowAs] = useState('Nitin, Block C');
  const [photo, setPhoto] = useState(false);
  const [app, setApp] = useState(true);
  const [web, setWeb] = useState(true);
  const share = () => {
    if (!app && !web) { nav.toast('Choose the app, the website or both'); return; }
    set({ testimonial: { status: 'Waiting for approval', showAs, app, web, photo, sent: 'Sent today' } });
    nav.toast(t('Sent for approval · 50 points added', 'मंज़ूरी के लिए भेजा · 50 पॉइंट'));
    nav.replace('myTestimonial');
  };
  return (
    <Screen>
      <Back title={t('Share your experience', 'अपना अनुभव बताएँ')} />
      <H>{t('May we share your review?', 'क्या हम आपकी समीक्षा दिखा सकते हैं?')}</H>
      <Card sel>
        <Stars value={5} />
        <T style={{ marginTop: 6 }}>“{myQuote}”</T>
        <T s m style={{ marginTop: 4 }}>Your review of 14 Nov</T>
      </Card>
      <H2>{t('Show me as', 'मुझे ऐसे दिखाएँ')}</H2>
      <Grid cols={2}>
        {['Nitin, Block C', 'A customer'].map((s) => <Pill key={s} sel={showAs === s} onPress={() => setShowAs(s)}>{s}</Pill>)}
      </Grid>
      <Card style={{ gap: 10 }}>
        <Row><T>Use my photo</T><Toggle on={photo} onChange={setPhoto} /></Row>
        <Hr />
        <Row><T>Show in the app</T><Toggle on={app} onChange={setApp} /></Row>
        <Hr />
        <Row><T>Show on the website</T><Toggle on={web} onChange={setWeb} /></Row>
      </Card>
      <T s m>You can take it down any time from Account. We never edit your words.</T>
      <Spacer />
      <Button onPress={share}>{t('Yes, share it', 'हाँ, दिखाएँ')}</Button>
      <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }}
        onPress={() => { nav.toast(t('Kept private', 'निजी रखा गया')); nav.canGoBack ? nav.back() : nav.reset('home'); }}>
        {t('No, keep it private', 'नहीं, निजी रखें')}
      </Button>
    </Screen>
  );
}

/* ---------- 55 · My testimonial ---------- */
export function MyTestimonialScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<TState>();
  const [confirm, setConfirm] = useState(false);
  const tm = st.testimonial ?? defaultTestimonial;
  const down = tm.status === 'Taken down';
  const where = [tm.app && 'app', tm.web && 'website'].filter(Boolean).join(' and ');
  const step = tm.status === 'Live' ? 3 : tm.status === 'Approved' ? 2 : 1;
  const stepLabel = (label: string, n: number) => <Text style={{ fontSize: 11, fontWeight: step >= n ? '700' : '400', color: step >= n ? c.accent : c.mut }}>{label}</Text>;
  const bar = (on: boolean) => <View style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: on ? palette.green : c.line }} />;
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Back title={t('My testimonial', 'मेरा प्रशंसापत्र')} fallback="account" />
        <Card>
          <Row><Tag tone={down ? 'x' : tm.status === 'Live' ? 'g' : 'y'}>{tm.status}</Tag><T s m>{tm.sent}</T></Row>
          <T style={{ marginTop: 8 }} strike={down}>“{myQuote}”</T>
          <T s m style={{ marginTop: 6 }}>Shown as {tm.showAs} · {where || 'nowhere'}</T>
        </Card>
        {!down && (
          <Pressable onPress={() => nav.toast('An admin approves it on the Saathi Admin panel')}>
            <Row gap={4}>{stepLabel('Sent', 1)}{bar(step >= 2)}{stepLabel('Approved', 2)}{bar(step >= 3)}{stepLabel('Live', 3)}</Row>
          </Pressable>
        )}
        <Card><T s m>{down
          ? 'Your testimonial has been taken down. Nobody can see it. You can share a review again from any past visit.'
          : 'Nobody else can see it yet. Our team approves each testimonial before it is shown, usually within a day. We will tell you when it is live, or why not.'}</T></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>Thank you: 50 points added</H2>
          <T color={palette.ink}>For sharing your experience.</T>
        </Card>
        <Spacer />
        {down
          ? <Button variant="outline" onPress={() => nav.push('testimonialConsent')}>{t('Share it again', 'फिर से दिखाएँ')}</Button>
          : <Button variant="outline" danger style={{ borderColor: c.line }} onPress={() => setConfirm(true)}>{t('Take it down', 'हटा दें')}</Button>}
      </Screen>
      <CustomerTabs active="account" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>Take your testimonial down?</H2>
        <T s m>It will not be shown in the app or on the website. Your {decisions.customer.pointsPerVisit * 5} points stay.</T>
        <Button style={{ backgroundColor: c.red }} onPress={() => { set({ testimonial: { ...tm, status: 'Taken down' } }); setConfirm(false); nav.toast('Testimonial taken down'); }}>{t('Yes, take it down', 'हाँ, हटा दें')}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>Keep it</Button>
      </Sheet>
    </View>
  );
}
