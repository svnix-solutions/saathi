/** Design page 31 (section 57 "WORKER H"): benefits, pay advance, kit shop, community. */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, Button, Card, Col, Grid, H, H2, Hr, Icon, IconTile, Input, Lft, Pill, Row, Screen, Sheet, Spacer, T, Tag,
  TopBar, palette, useNav, useT, useTheme, type Face, type IconName,
} from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { PartnerTabs } from '../chrome';
import { TopH, TopS } from './kit';

/* ---------- 51 · Benefits ---------- */
const BENEFITS: { id: string; icon: IconName; title: string; sub: string; more: string[]; locked?: boolean; active?: boolean }[] = [
  { id: 'acc', icon: 'shield', title: 'Accident cover · active', sub: 'Up to ₹2,00,000 while on a job or travelling to one', active: true,
    more: ['Covers hospital bills and loss of income', 'Starts when you go online, ends when you go offline', 'Policy no. SA-ACC-20418'] },
  { id: 'health', icon: 'user', title: 'Health check-up', sub: 'Free once a year · due in March',
    more: ['Blood test, BP, sugar and eye check', 'At any partner clinic near Block C'] },
  { id: 'sick', icon: 'clock', title: 'Paid sick days', sub: '2 of 6 used this year',
    more: ['Paid at your average day: about ₹640', 'Tell us before 8 am on the day'] },
  { id: 'family', icon: 'home', title: 'Family health cover', sub: 'Opens after 300 visits · 142 done', locked: true,
    more: ['Covers you, your partner and 2 children', '158 visits to go'] },
];

export function BenefitsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [open, setOpen] = useState<string | null>(null);
  const [claim, setClaim] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <H>{t('My benefits', 'मेरे फ़ायदे')}</H>
        {BENEFITS.map((b) => {
          const on = open === b.id;
          return (
            <Card key={b.id} sel={b.active} style={b.locked ? { opacity: 0.6 } : undefined} onPress={() => setOpen(on ? null : b.id)}>
              <Lft style={{ alignItems: 'flex-start' }}>
                <IconTile name={b.icon} bg={b.active ? c.card : undefined} />
                <View style={{ flex: 1 }}>
                  <H2>{b.title}</H2>
                  <T s m>{b.sub}</T>
                </View>
                <View style={{ transform: [{ rotate: on ? '90deg' : '0deg' }] }}><Icon name="chevron" size={14} color={c.mut} /></View>
              </Lft>
              {on && (
                <Col gap={4} style={{ marginTop: 9, paddingLeft: 42 }}>
                  {b.more.map((m) => <T key={m} s>• {m}</T>)}
                  {b.id === 'health' && <Pressable onPress={() => nav.toast('Check-up booked for 3 March, 9 am')}><T s b color={c.accent}>Book check-up</T></Pressable>}
                  {b.id === 'sick' && <Pressable onPress={() => nav.push('timeOff')}><T s b color={c.accent}>Take a sick day</T></Pressable>}
                </Col>
              )}
            </Card>
          );
        })}
        <Spacer />
        <Button variant="outline" onPress={() => setClaim(true)}>{t('How to make a claim', 'क्लेम कैसे करें')}</Button>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={claim} onClose={() => setClaim(false)}>
        <H2>{t('How to make a claim', 'क्लेम कैसे करें')}</H2>
        {['Call the helpline or tap below within 7 days', 'Send a photo of the hospital bill', 'Money reaches your bank in about 10 days'].map((s, i) => (
          <Lft key={s} style={{ alignItems: 'flex-start' }}><Tag tone="n">{String(i + 1)}</Tag><T style={{ flex: 1 }}>{s}</T></Lft>
        ))}
        <T s m>Through our licensed insurance partner.</T>
        <Button icon="call" onPress={() => { setClaim(false); nav.toast('Calling claims helpline…'); }}>{t('Start a claim', 'क्लेम शुरू करें')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 52 · Pay advance ---------- */
export function AdvanceScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [amt, setAmt] = useState(2000);
  const [weeks, setWeeks] = useState(4);
  const [sheet, setSheet] = useState(false);
  const [taken, setTaken] = useState(false);
  const each = Math.round(amt / weeks);
  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <TopS>{t('You can take ahead', 'आप पहले ले सकती हैं')}</TopS>
        <TopH size={30}>up to ₹3,000</TopH>
        <TopS>Based on 6 weeks of steady work</TopS>
      </TopBar>
      <Screen>
        {taken ? (
          <Card tone="mint">
            <Lft><Icon name="check" color={c.accent} /><H2>{rupees(amt)} sent to State Bank ···· 4821</H2></Lft>
            <T s m style={{ marginTop: 4 }}>{rupees(each)} will be taken each {decisions.partner.payoutDay} for {weeks} weeks.</T>
          </Card>
        ) : null}
        <H2>{t('How much do you need?', 'कितने पैसे चाहिए?')}</H2>
        <Grid cols={3}>
          {[1000, 2000, 3000].map((a) => <Pill key={a} sel={amt === a} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}
        </Grid>
        <H2>{t('Pay back from earnings', 'कमाई से वापस')}</H2>
        <Grid cols={2}>
          {[4, 8].map((w) => <Pill key={w} sel={weeks === w} onPress={() => setWeeks(w)}>{w} weeks</Pill>)}
        </Grid>
        <Card style={{ gap: 7 }}>
          <Row><T m>You get today</T><T b>{rupees(amt)}</T></Row>
          <Row><T m>Taken each Monday</T><T b>{rupees(each)}</T></Row>
          <Row><T m>Extra charge</T><T b color={c.accent}>₹0</T></Row>
        </Card>
        <T s m>No interest. If you earn less in a week, we take less that week.</T>
        <Spacer />
        <Button disabled={taken} style={{ paddingVertical: 16 }} textStyle={{ fontSize: 15 }} onPress={() => setSheet(true)}>
          {taken ? t('Advance taken', 'एडवांस ले लिया') : `${t('Get', 'लें')} ${rupees(amt)} ${t('now', 'अभी')}`}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Confirm your advance', 'एडवांस पक्का करें')}</H2>
        <Card style={{ gap: 7 }}>
          <Row><T m>Sent now to</T><T b>State Bank ···· 4821</T></Row>
          <Row><T m>Amount</T><T b>{rupees(amt)}</T></Row>
          <Row><T m>Paid back</T><T b>{rupees(each)} × {weeks} Mondays</T></Row>
          <Row><T m>Interest</T><T b color={c.accent}>₹0</T></Row>
        </Card>
        <Lft style={{ alignItems: 'flex-start' }}><Icon name="shield" size={14} color={c.mut} /><T s m style={{ flex: 1 }}>Advances are given by our licensed bank partner. Saathi takes the repayment from your payout.</T></Lft>
        <Button onPress={() => { setSheet(false); setTaken(true); nav.toast(`${rupees(amt)} is on its way to your bank`); }}>{t('Confirm', 'पक्का करें')} · {rupees(amt)}</Button>
        <Button variant="outline" onPress={() => setSheet(false)}>{t('Not now', 'अभी नहीं')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 53 · Kit shop ---------- */
const KIT: { id: string; icon: IconName; name: string; sub: string; price: number; free?: boolean }[] = [
  { id: 'uniform', icon: 'shirt', name: 'Uniform set', sub: 'First set free · size M', price: 0, free: true },
  { id: 'gloves', icon: 'drop', name: 'Gloves, 5 pairs', sub: '₹60', price: 60 },
  { id: 'cloths', icon: 'sparkle', name: 'Microfibre cloths, 6', sub: '₹120', price: 120 },
  { id: 'bag', icon: 'wallet', name: 'Kit bag', sub: '₹180', price: 180 },
];

export function KitShopScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [cart, setCart] = useState<string[]>(['uniform', 'cloths']);
  const [sheet, setSheet] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const total = KIT.filter((k) => cart.includes(k.id)).reduce((a, k) => a + k.price, 0);
  const toggle = (id: string) => { setOrdered(false); setCart((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])); };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Row><H>{t('Kit shop', 'किट दुकान')}</H><Tag tone="n">Paid from earnings</Tag></Row>
        <Card style={{ gap: 10 }}>
          {KIT.map((k, i) => {
            const on = cart.includes(k.id);
            return (
              <React.Fragment key={k.id}>
                {i > 0 && <Hr />}
                <Row>
                  <Lft style={{ flex: 1 }}>
                    <IconTile name={k.icon} />
                    <View style={{ flex: 1 }}><T b>{k.name}</T><T s m>{k.sub}</T></View>
                  </Lft>
                  {k.free ? <Tag tone="n">Free</Tag> : (
                    <Pressable onPress={() => toggle(k.id)} accessibilityRole="button"
                      style={{ borderWidth: on ? 1.5 : 1, borderColor: on ? c.selBorder : c.line, backgroundColor: on ? c.selBg : c.card, borderRadius: 11, paddingVertical: 5, paddingHorizontal: 14 }}>
                      <T s b color={on ? c.ink : c.accent}>{on ? t('Added', 'जोड़ा') : t('Add', 'जोड़ें')}</T>
                    </Pressable>
                  )}
                </Row>
              </React.Fragment>
            );
          })}
        </Card>
        <Card row onPress={() => nav.toast('Block C hub · Gate 2, next to the milk booth')}>
          <View><H2>Pick up at</H2><T s m>Block C hub · open 7 am to 7 pm</T></View>
          <Icon name="pin" color={c.accent} />
        </Card>
        {ordered && <Card tone="mint"><H2>Order placed</H2><T s m>Ready to pick up tomorrow after 10 am.</T></Card>}
        <Spacer />
        <Button disabled={cart.length === 0 || ordered} onPress={() => setSheet(true)}>
          {ordered ? t('Ordered', 'ऑर्डर हो गया') : `${t('Order', 'ऑर्डर')} ${cart.length} items · ${rupees(total)}`}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Pay from earnings', 'कमाई से भुगतान')}</H2>
        <Card style={{ gap: 7 }}>
          {KIT.filter((k) => cart.includes(k.id)).map((k) => <Row key={k.id}><T m>{k.name}</T><T b>{k.free ? 'Free' : rupees(k.price)}</T></Row>)}
          <Hr />
          <Row><T b>Taken from Monday's payout</T><T b>{rupees(total)}</T></Row>
        </Card>
        <T s m>Nothing to pay now. At cost, no profit for Saathi.</T>
        <Button onPress={() => { setSheet(false); setOrdered(true); nav.toast(`Ordered · ${rupees(total)} from Monday's payout`); }}>{t('Place order', 'ऑर्डर करें')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 54 · Community ---------- */
const BOARD: { rank: number; face: Face; name: string; visits: number; rating: number; me?: boolean }[] = [
  { rank: 1, face: 'rm', name: 'Rekha M.', visits: 22, rating: 4.6 },
  { rank: 2, face: 'sd', name: 'Sunita D. (you)', visits: 19, rating: 4.8, me: true },
  { rank: 3, face: 'kr', name: 'Kavita R.', visits: 17, rating: 4.9 },
];
type Post = { id: string; title: string; body: string; likes: number; liked?: boolean };

export function CommunityScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [posts, setPosts] = useState<Post[]>([
    { id: 'meet', title: 'Meet-up, Sunday 4 pm', body: 'Block C hub. Tea, new uniform fitting, questions.', likes: 12 },
    { id: 'tip', title: 'Tip from Kavita', body: '"Start with the kitchen while the floor dries."', likes: 8 },
  ]);
  const [draft, setDraft] = useState('');
  const [going, setGoing] = useState(false);
  const like = (id: string) => setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)));
  const post = () => {
    if (!draft.trim()) return;
    setPosts((ps) => [{ id: String(Date.now()), title: 'Tip from Sunita', body: `"${draft.trim()}"`, likes: 0 }, ...ps]);
    setDraft('');
    nav.toast('Shared with Block C partners');
  };
  return (
    <Screen>
      <Row><H>{t('Block C partners', 'ब्लॉक सी पार्टनर')}</H><Tag tone="n">This week</Tag></Row>
      <Card style={{ gap: 9 }}>
        {BOARD.map((b, i) => (
          <React.Fragment key={b.rank}>
            {i > 0 && <Hr />}
            <Row style={b.me ? { backgroundColor: c.mint, marginVertical: -4, marginHorizontal: -6, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 8 } : undefined}>
              <Lft><T b style={{ width: 14 }}>{b.rank}</T><Avatar face={b.face} size={28} /><T b>{b.name}</T></Lft>
              <T s m>{b.visits} visits · {b.rating}</T>
            </Row>
          </React.Fragment>
        ))}
      </Card>
      <Card tone="yellow"><H2 color={palette.ink}>Top 3 get ₹200 extra</H2><T color={palette.ink}>4 more visits and you are first.</T></Card>
      <H2>{t('From the team', 'टीम से')}</H2>
      <Card style={{ gap: 8 }}>
        <Input small multiline value={draft} onChangeText={setDraft} placeholder={t('Share a tip with Block C…', 'ब्लॉक सी के साथ कोई सुझाव बाँटें…')} />
        <Button disabled={!draft.trim()} style={{ paddingVertical: 9 }} onPress={post}>{t('Post', 'पोस्ट करें')}</Button>
      </Card>
      {posts.map((p) => (
        <Card key={p.id}>
          <T b>{p.title}</T>
          <T s m>{p.body}</T>
          <Lft gap={14} style={{ marginTop: 7 }}>
            <Pressable onPress={() => like(p.id)} accessibilityRole="button" accessibilityLabel="Like" style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Icon name="star" size={14} color={p.liked ? palette.yellow : c.mut} fill={p.liked} />
              <T s b color={p.liked ? c.ink : c.mut}>{p.likes}</T>
            </Pressable>
            {p.id === 'meet' && (
              <Pressable onPress={() => { setGoing(!going); nav.toast(going ? 'Removed from meet-up' : 'See you Sunday at 4 pm'); }}>
                <T s b color={c.accent}>{going ? "✓ I'm going" : "I'll come"}</T>
              </Pressable>
            )}
          </Lft>
        </Card>
      ))}
    </Screen>
  );
}
