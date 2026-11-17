/** Design page 13 · Ratings, reviews and rewards (screens 44–47). */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackHeader, Button, Card, Grid, H, H2, Hr, Input, Lft, Link, Pill, Row, Screen, Sheet, Spacer, Stars, T, Toggle, TopBar,
  palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { decisions } from '@/data/decisions';
import { Radio, TopBack, rupees, useV2, visitPrice } from './kit';

/* ---------- 44 · Detailed rating ---------- */
export function RatingDetailedScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const [overall, setOverall] = useState(4);
  const [parts, setParts] = useState({ time: 5, quality: 4, behaviour: 5 });
  const [text, setText] = useState('Kitchen slab was spotless. Balcony corner was missed.');
  const [photo, setPhoto] = useState(false);
  const [showName, setShowName] = useState(true);
  const avg = (parts.time + parts.quality + parts.behaviour) / 3;
  const rows: [keyof typeof parts, string][] = [['time', 'On time'], ['quality', 'Cleaning quality'], ['behaviour', 'Behaviour']];
  const submit = () => {
    const pts = 5 + (photo ? 20 : 0);
    set({ rating: overall, ratingParts: parts, points: (st.points ?? 320) + pts });
    if (avg < 3) { nav.push('ratingLow', { stars: Math.round(avg) }); return; }
    nav.toast(`Thanks for rating Sunita · +${pts} points`);
    nav.reset('bookings');
  };
  return (
    <Screen>
      <BackHeader title={t('Rate your visit', 'विज़िट को रेट करें')} onBack={nav.back} />
      <View style={{ alignItems: 'center', gap: 6 }}>
        <T s m>Overall, with Sunita D.</T>
        <Stars value={overall} onChange={setOverall} size={32} />
      </View>
      <Card style={{ gap: 10 }}>
        {rows.map(([k, l], i) => (
          <React.Fragment key={k}>
            {i > 0 && <Hr />}
            <Row><T>{l}</T><Stars value={parts[k]} onChange={(n) => setParts({ ...parts, [k]: n })} /></Row>
          </React.Fragment>
        ))}
      </Card>
      <Input small multiline value={text} onChangeText={setText} placeholder="Tell us more (optional)" style={{ minHeight: 70, borderWidth: 1, borderRadius: 14 }} />
      <Lft gap={6}>
        <Pill s onPress={() => { setPhoto(!photo); nav.toast(photo ? 'Photo removed' : 'Photo added'); }} style={{ paddingVertical: 7, paddingHorizontal: 12 }}>
          <T s b color={c.accent}>{photo ? '✓ Photo added' : '+ Add photo'}</T>
        </Pill>
        <T s m>+20 points for a photo review</T>
      </Lft>
      <Card row><T style={{ flex: 1 }}>Show my first name on the review</T><Toggle on={showName} onChange={setShowName} /></Card>
      <Spacer />
      <Button onPress={submit}>{t('Submit rating', 'रेटिंग भेजें')}</Button>
    </Screen>
  );
}

/* ---------- 45 · When the rating is low ---------- */
const REASONS = ['Came late', 'Work unfinished', 'Rude behaviour', 'Something damaged'];

export function RatingLowScreen({ params }: ScreenProps<{ stars?: number }>) {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV2();
  const refund = Math.round(visitPrice * decisions.customer.badVisitRefund);
  const [reasons, setReasons] = useState<string[]>(['Work unfinished']);
  const [fix, setFix] = useState<'reclean' | 'refund' | 'call'>('reclean');
  const [block, setBlock] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const fixes = [
    { k: 'reclean' as const, title: 'Send a helper back, free', sub: 'Today, to finish the work', done: 'A helper is coming back today, free' },
    { k: 'refund' as const, title: `Refund ${rupees(refund)} to wallet`, sub: 'Half of this visit', done: `${rupees(refund)} refunded to your wallet` },
    { k: 'call' as const, title: 'Call me', sub: 'Our team rings within 10 min', done: 'Our team will call you within 10 min' },
  ];
  const chosen = fixes.find((f) => f.k === fix)!;
  const done = () => {
    if (fix === 'refund') set({ walletBalance: (st.walletBalance ?? 240) + refund });
    if (block) set((s) => ({ blocked: [...(s.blocked ?? ['Mohan T.']), 'Sunita D.'] }));
    setConfirm(false);
    nav.toast(chosen.done);
    nav.reset('bookings');
  };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <View style={{ alignItems: 'center' }}><Stars value={params.stars ?? 2} size={32} /></View>
        <H>{t('Sorry this visit was not good. What went wrong?', 'माफ़ कीजिए, विज़िट अच्छी नहीं रही। क्या गलत हुआ?')}</H>
        <Grid cols={2}>
          {REASONS.map((r) => (
            <Pill key={r} sel={reasons.includes(r)} onPress={() => setReasons(reasons.includes(r) ? reasons.filter((x) => x !== r) : [...reasons, r])}>{r}</Pill>
          ))}
        </Grid>
        <H2 style={{ marginTop: 4 }}>{t('How should we fix it?', 'हम इसे कैसे ठीक करें?')}</H2>
        {fixes.map((f) => (
          <Card key={f.k} row sel={fix === f.k} onPress={() => setFix(f.k)}>
            <View><H2>{f.title}</H2><T s m>{f.sub}</T></View>
            <Radio on={fix === f.k} />
          </Card>
        ))}
        <Card row><T style={{ flex: 1 }}>Do not send this helper again</T><Toggle on={block} onChange={setBlock} /></Card>
        <Spacer />
        <Button disabled={!reasons.length} onPress={() => setConfirm(true)}>{t('Send', 'भेजें')}</Button>
      </Screen>
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>Confirm the fix</H2>
        <Card sel><H2>{chosen.title}</H2><T s m>{chosen.sub}</T></Card>
        <T s m>Reported: {reasons.join(', ')}{block ? ' · Sunita will not be sent again' : ''}</T>
        <Grid cols={2}>
          <Button variant="outline" onPress={() => setConfirm(false)}>Back</Button>
          <Button onPress={done}>Confirm</Button>
        </Grid>
      </Sheet>
    </View>
  );
}

/* ---------- 46 · Helper reviews ---------- */
const REVIEWS = [
  { who: 'Farah', stars: 5, text: 'Very thorough, always on time.', meta: 'Laundry · 12 Nov', photo: true },
  { who: 'Priya', stars: 4, text: 'Good work. Came 5 minutes late.', meta: 'General cleaning · 9 Nov' },
  { who: 'A customer', stars: 3, text: 'Balcony was missed.', reply: 'We sent a helper back the same day.' },
];

export function HelperReviewsScreen() {
  const nav = useNav();
  const { c } = useTheme();
  const [filter, setFilter] = useState<'all' | 'photos' | 'low'>('all');
  let list = REVIEWS.slice();
  if (filter === 'photos') list = list.filter((r) => r.photo);
  if (filter === 'low') list.sort((a, b) => a.stars - b.stars);
  const bar = (n: string, pct: number) => (
    <Lft gap={6}>
      <T s>{n}</T>
      <View style={{ flex: 1, height: 6, borderRadius: 4, backgroundColor: c.mint }}>
        <View style={{ width: `${pct}%`, height: '100%', borderRadius: 4, backgroundColor: palette.green }} />
      </View>
    </Lft>
  );
  return (
    <Screen>
      <BackHeader title="Reviews for Sunita D." onBack={nav.back} />
      <Card row>
        <View><T b size={34} style={{ letterSpacing: -0.6 }}>4.8</T><T s m>142 visits</T></View>
        <View style={{ gap: 3, width: 130 }}>{bar('5', 84)}{bar('4', 13)}{bar('3', 3)}</View>
      </Card>
      <Lft gap={6}>
        {([['all', 'All'], ['photos', 'With photos'], ['low', 'Low first']] as const).map(([k, l]) => (
          <Pill key={k} s sel={filter === k} onPress={() => setFilter(k)} style={{ paddingVertical: 6, paddingHorizontal: 12 }}>{l}</Pill>
        ))}
      </Lft>
      {list.map((r) => (
        <Card key={r.who}>
          <Row><T b>{r.who}</T><Stars value={r.stars} /></Row>
          <T style={{ marginTop: 4 }}>{r.text}</T>
          {r.photo && (
            <View style={{ marginTop: 6, width: 62, height: 46, borderRadius: 9, backgroundColor: c.mint, alignItems: 'center', justifyContent: 'center' }}>
              <T s color={c.accent}>Photo</T>
            </View>
          )}
          {r.meta && <T s m style={{ marginTop: 4 }}>{r.meta}</T>}
          {r.reply && (
            <View style={{ marginTop: 6, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8, backgroundColor: c.mint }}>
              <T s><T s b>Saathi:</T> {r.reply}</T>
            </View>
          )}
        </Card>
      ))}
      {list.length === 0 && <T m center>No reviews here yet.</T>}
    </Screen>
  );
}

/* ---------- 47 · Rewards ---------- */
export function RewardsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const points = st.points ?? 320;
  const { points: cost, rupees: off } = decisions.customer.pointsRedeem;
  const gold = 500;
  const [confirm, setConfirm] = useState(false);
  const canUse = points >= cost;
  const redeem = () => {
    set({ points: points - cost, voucher: off });
    setConfirm(false);
    nav.toast(`${rupees(off)} off added to your next visit`);
  };
  const earn: [string, number, string?][] = [
    ['Every visit', decisions.customer.pointsPerVisit, 'home'], ['Rate the visit', 5, 'ratingDetailed'],
    ['Review with a photo', 20, 'ratingDetailed'], ["A friend's first visit", 50, 'refer'],
  ];
  return (
    <View style={{ flex: 1 }}>
      <TopBar style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Lft><TopBack /><T s color="#fff" style={{ opacity: 0.8 }}>Saathi points</T></Lft>
        <H size={30} color="#fff">{points}</H>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: '#2d6a5b', marginTop: 10 }}>
          <View style={{ width: `${Math.min(100, (points / gold) * 100)}%`, height: '100%', borderRadius: 4, backgroundColor: palette.yellow }} />
        </View>
        <T s color="#fff" style={{ opacity: 0.8, marginTop: 4 }}>{points >= gold ? 'Gold member' : `Silver · ${gold - points} more points to Gold`}</T>
      </TopBar>
      <Screen>
        <H2>{t('Use your points', 'अपने पॉइंट्स इस्तेमाल करें')}</H2>
        <Card row style={{ opacity: canUse ? 1 : 0.6 }}>
          <View><H2>{rupees(off)} off a visit</H2><T s m>{cost} points{canUse ? '' : ` · ${cost - points} more needed`}</T></View>
          {canUse && <Button style={{ paddingVertical: 7, paddingHorizontal: 14 }} textStyle={{ fontSize: 12 }} onPress={() => setConfirm(true)}>{t('Use', 'इस्तेमाल करें')}</Button>}
        </Card>
        <Card row style={{ opacity: points >= 500 ? 1 : 0.6 }} onPress={points >= 500 ? () => { set({ points: points - 500 }); nav.toast('30 free minutes added to your next visit'); } : undefined}>
          <View><H2>30 minutes free</H2><T s m>500 points{points >= 500 ? '' : ` · ${500 - points} more needed`}</T></View>
        </Card>
        <H2>{t('Earn more', 'और कमाएँ')}</H2>
        <Card style={{ gap: 9 }}>
          {earn.map(([l, n, go], i) => (
            <React.Fragment key={l}>
              {i > 0 && <Hr />}
              <Row><Link color={undefined} onPress={() => go && (go === 'home' ? nav.reset(go) : nav.push(go))}><T>{l}</T></Link><T b color={c.accent}>+{n}</T></Row>
            </React.Fragment>
          ))}
        </Card>
        <T s m>Gold members get the helper they favourite first.</T>
      </Screen>
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>Use {cost} points?</H2>
        <T m>You get {rupees(off)} off your next visit. {points - cost} points will be left.</T>
        <Grid cols={2}>
          <Button variant="outline" onPress={() => setConfirm(false)}>Not now</Button>
          <Button onPress={redeem}>Use points</Button>
        </Grid>
      </Sheet>
    </View>
  );
}
