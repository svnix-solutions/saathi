/** Design page 27 · route, ratings, bonuses, time off (screens 36–39). */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  BackHeader, Button, Card, Col, Grid, H, H2, Icon, IconTile, Input, Lft, Link, MapMock, Pill, Row, Screen, Sheet,
  Spacer, Stars, T, Tag, TopBar, palette, useAppState, useNav, useT, useTheme, type IconName,
} from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { PartnerTabs, initialPartnerState, type PartnerState } from '../chrome';
import { Meter, Root, TopLabel, TopProgress, onGreen } from './kit';

/* ---------- 36 · Route to the job ---------- */
const steps = [
  { icon: 'chevron' as IconName, text: 'Head north on Main Road', d: '300 m' },
  { icon: 'chevron' as IconName, text: 'Turn right at the market', d: '350 m' },
  { icon: 'pin' as IconName, text: 'Gate 2, near the park', d: '150 m' },
  { icon: 'home' as IconName, text: 'Block C, take the lift to 2nd floor', d: '' },
];
export function RouteScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useAppState<PartnerState>();
  const job = st.job ?? initialPartnerState.job;
  const [mins, setMins] = useState(6);
  const [showSteps, setShowSteps] = useState(false);
  // the helper "moves": one minute less every 5 s
  useEffect(() => {
    const id = setInterval(() => setMins((m) => Math.max(1, m - 1)), 5000);
    return () => clearInterval(id);
  }, []);
  const km = (mins * 0.8 / 6).toFixed(1);
  const userX = 42 + (6 - mins) * 18; // walks along the green line
  return (
    <Root>
      <MapMock height={230} route={false} dots={[{ x: Math.min(userX, 142), y: 84, icon: 'user', tone: 'yellow' }, { x: 142, y: 166, icon: 'home' }]}>
        <View style={{ position: 'absolute', left: 60, top: 98, width: 96, height: 4, backgroundColor: palette.green }} />
        <View style={{ position: 'absolute', left: 155, top: 98, width: 4, height: 84, backgroundColor: palette.green }} />
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Row><H>{mins} min · {km} km</H><Tag>{t('Reach by 11:08', '11:08 तक पहुँचें')}</Tag></Row>
        <Card row onPress={() => setShowSteps(true)}>
          <Lft style={{ flex: 1 }}>
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>Gate 2, near the park</T></View>
          </Lft>
          <Link onPress={() => setShowSteps(true)}>{t('Steps', 'रास्ता')}</Link>
        </Card>
        <Grid cols={2}>
          <Button variant="outline" icon="call" style={{ paddingVertical: 10 }} onPress={() => nav.toast(`Calling ${job.customer}…`)}>{t('Call', 'कॉल')}</Button>
          <Button variant="outline" style={{ paddingVertical: 10 }} onPress={() => nav.toast(`Sent to ${job.customer}: “I am on my way, ${mins} min.”`)}>{t('Message', 'मैसेज')}</Button>
        </Grid>
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => nav.toast('Opening Google Maps…')}>
          {t('Open in maps', 'मैप में खोलें')}
        </Button>
        <Spacer />
        <Button big onPress={() => nav.push('checkIn')}>{t('I have arrived', 'मैं पहुँच गई')}</Button>
      </Screen>
      <Sheet visible={showSteps} onClose={() => setShowSteps(false)}>
        <Row><H2>{t('Steps to the door', 'दरवाज़े तक का रास्ता')}</H2><T s m>{km} km</T></Row>
        {steps.map((s, i) => (
          <Lft key={i}>
            <IconTile name={s.icon} size={30} />
            <T style={{ flex: 1 }}>{s.text}</T>
            {s.d ? <T s m>{s.d}</T> : null}
          </Lft>
        ))}
        <Button onPress={() => setShowSteps(false)}>{t('OK', 'ठीक है')}</Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 37 · My ratings ---------- */
const ratingData = {
  all: { label: 'All time', avg: 4.8, visits: 142, dist: [119, 18, 4, 1, 0], tags: [['On time', 96], ['Thorough', 88], ['Polite', 71]] },
  month: { label: '30 days', avg: 4.9, visits: 38, dist: [34, 4, 0, 0, 0], tags: [['On time', 30], ['Thorough', 27], ['Polite', 19]] },
  week: { label: 'This week', avg: 4.7, visits: 9, dist: [7, 1, 1, 0, 0], tags: [['On time', 8], ['Thorough', 6], ['Polite', 4]] },
} as const;
type Period = keyof typeof ratingData;

export function RatingsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [period, setPeriod] = useState<Period>('all');
  const d = ratingData[period];
  return (
    <Root>
      <Screen>
        <H>{t('My ratings', 'मेरी रेटिंग')}</H>
        <Grid cols={3}>
          {(Object.keys(ratingData) as Period[]).map((k) => <Pill key={k} s sel={period === k} onPress={() => setPeriod(k)}>{ratingData[k].label}</Pill>)}
        </Grid>
        <Card row>
          <View><T b size={40} style={{ letterSpacing: -0.8, lineHeight: 44 }}>{d.avg}</T><T s m>from {d.visits} visits</T></View>
          <Stars value={5} />
        </Card>
        <Card style={{ gap: 7 }}>
          {d.dist.map((n, i) => (
            <Lft key={i}>
              <T s style={{ width: 10 }}>{5 - i}</T>
              <Meter pct={n / d.visits} />
              <T s style={{ width: 22, textAlign: 'right' }}>{n}</T>
            </Lft>
          ))}
        </Card>
        <H2>{t('Customers say', 'ग्राहक कहते हैं')}</H2>
        <Lft gap={6} style={{ flexWrap: 'wrap' }}>
          {d.tags.map(([k, n]) => <Tag key={k} tone="n">{`${k} · ${n}`}</Tag>)}
        </Lft>
        <Card tone="yellow" onPress={() => nav.push('reviews')}>
          <H2 color={palette.ink}>{t('Tip to improve', 'सुधार की सलाह')}</H2>
          <T color={palette.ink}>4 customers said the balcony was missed. Check it before you finish.</T>
        </Card>
        <Link onPress={() => nav.push('reviews')}>{t('Read all reviews', 'सभी रिव्यू पढ़ें')}</Link>
      </Screen>
      <PartnerTabs active="earnings" />
    </Root>
  );
}

/* ---------- 38 · Bonuses ---------- */
export function BonusesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useAppState<PartnerState>();
  const { rupees: bonus, jobs: target } = decisions.partner.weeklyBonus;
  const done = typeof st.weekJobs === 'number' ? (st.weekJobs as number) : 19;
  const left = Math.max(0, target - done);
  const [friend, setFriend] = useState(false);
  const rows: { icon: IconName; fill?: boolean; title: string; hi: string; sub: string; tag?: React.ReactNode; go: () => void }[] = [
    { icon: 'bolt', fill: true, title: 'Busy hours', hi: 'व्यस्त घंटे', sub: `7 to 10 am · ${rupees(decisions.partner.busyHourExtra)} extra per job`, tag: <Tag>{t('Live now', 'अभी चालू')}</Tag>, go: () => nav.push('demandMap') },
    { icon: 'star', title: `Keep ${decisions.quality.topRated.rating} or above`, hi: `${decisions.quality.topRated.rating} या ऊपर रखें`, sub: `${rupees(200)} at month end`, tag: <Tag tone="n">{t('On track', 'सही राह पर')}</Tag>, go: () => nav.push('quality') },
    { icon: 'user', title: 'Bring a friend to work', hi: 'दोस्त को जोड़ें', sub: `${rupees(decisions.partner.referralBonus.rupees)} after their ${decisions.partner.referralBonus.afterJobs}th job`, go: () => setFriend(true) },
    { icon: 'drop', title: 'Learn deep cleaning', hi: 'डीप क्लीनिंग सीखें', sub: `Unlocks ${rupees(decisions.prices.kitchenBath)} jobs`, tag: <T s b color={c.accent}>{t('Start', 'शुरू')}</T>, go: () => nav.push('training') },
  ];
  return (
    <Root>
      <TopBar>
        <TopLabel>{t("This week's bonus", 'इस हफ़्ते का बोनस')}</TopLabel>
        <H color={onGreen}>{t(`Do ${target} jobs, earn ${rupees(bonus)} extra`, `${target} काम करें, ${rupees(bonus)} ज़्यादा कमाएँ`)}</H>
        <TopProgress pct={done / target} />
        <T s color={onGreen} style={{ opacity: 0.8, marginTop: 4 }}>
          {left > 0 ? `${done} of ${target} done · ${left} to go by Sunday` : `Done! ${rupees(bonus)} comes with Monday's payout`}
        </T>
      </TopBar>
      <Screen>
        <H2>{t('More ways to earn', 'कमाने के और तरीके')}</H2>
        {rows.map((r) => (
          <Card key={r.title} row onPress={r.go}>
            <Lft style={{ flex: 1 }}>
              <IconTile name={r.icon} />
              <View style={{ flex: 1 }}><H2>{t(r.title, r.hi)}</H2><T s m>{r.sub}</T></View>
            </Lft>
            {r.tag}
          </Card>
        ))}
      </Screen>
      <Sheet visible={friend} onClose={() => setFriend(false)}>
        <H2>{t('Bring a friend to work', 'दोस्त को जोड़ें')}</H2>
        <T s m>Your friend signs up with your code. You get {rupees(decisions.partner.referralBonus.rupees)} after their {decisions.partner.referralBonus.afterJobs}th job.</T>
        <Card tone="mint" row><T b size={18} style={{ letterSpacing: 2 }}>SUNITA500</T><Link onPress={() => nav.toast('Code copied')}>Copy</Link></Card>
        <Button onPress={() => { setFriend(false); nav.toast('Opening WhatsApp…'); }}>{t('Share on WhatsApp', 'व्हाट्सऐप पर भेजें')}</Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 39 · Time off ---------- */
const days = [17, 18, 19, 20, 21, 22, 23];
const reasons = [['Family', 'परिवार'], ['Not well', 'तबियत ठीक नहीं'], ['Festival', 'त्योहार'], ['Other', 'अन्य']] as const;
export function TimeOffScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [sel, setSel] = useState<number[]>([19, 20]);
  const [reason, setReason] = useState<string>('Family');
  const [other, setOther] = useState('');
  const [approved, setApproved] = useState<{ when: string; why: string; status: 'Approved' | 'Pending' }[]>([
    { when: 'Sun 30 Nov', why: 'Weekly day off', status: 'Approved' },
  ]);
  const toggle = (d: number) => setSel((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d].sort((a, b) => a - b)));
  const n = sel.length;
  const ask = () => {
    const when = sel.map((d) => d).join(', ') + ' Nov';
    setApproved((a) => [{ when, why: reason === 'Other' && other ? other : reason, status: 'Pending' }, ...a]);
    setSel([]);
    nav.toast(t(`Request sent for ${when}. We reply within a day.`, `${when} के लिए अनुरोध भेजा।`));
  };
  return (
    <Root>
      <Screen>
        <BackHeader title={t('Time off', 'छुट्टी')} onBack={nav.back} />
        <H>{t('Which days are you away?', 'आप किन दिनों में नहीं होंगी?')}</H>
        <Grid cols={7} gap={5}>
          {days.map((d) => <Pill key={d} sel={sel.includes(d)} onPress={() => toggle(d)}>{d}</Pill>)}
        </Grid>
        <H2>{t('Reason', 'कारण')}</H2>
        <Grid cols={2}>
          {reasons.map(([en, hi]) => <Pill key={en} sel={reason === en} onPress={() => setReason(en)}>{t(en, hi)}</Pill>)}
        </Grid>
        {reason === 'Other' && <Input small value={other} onChangeText={setOther} placeholder="Tell us a little" />}
        <Card tone="yellow"><T color={palette.ink}>Your monthly plan customer on these days will get another partner.</T></Card>
        <H2>{t('Already approved', 'पहले से मंज़ूर')}</H2>
        {approved.map((a, i) => (
          <Card key={a.when + i} row>
            <View style={{ flex: 1 }}><H2>{a.when}</H2><T s m>{a.why}</T></View>
            <Tag tone={a.status === 'Approved' ? 'n' : 'y'}>{a.status}</Tag>
          </Card>
        ))}
        <Spacer />
        <Button big disabled={n === 0} onPress={ask}>
          {n === 0 ? t('Pick the days first', 'पहले दिन चुनें') : t(`Ask for ${n} day${n > 1 ? 's' : ''} off`, `${n} दिन की छुट्टी माँगें`)}
        </Button>
      </Screen>
    </Root>
  );
}
