/** Design page 11 · Wallet, referrals and chat (screens 36–39). */
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Avatar, BackHeader, Bubble, Button, Card, Grid, H, H2, Hr, Icon, Input, Lft, Link, Pill, Row, Screen, Sheet,
  T, Tag, Toggle, TopBar, palette, useNav, useT, useTheme, type IconName,
} from '@/native/ui';
import { decisions } from '@/data/decisions';
import { Radio, TopBack, rupees, useV2 } from './kit';

/* ---------- 36 · Wallet ---------- */
type Txn = { title: string; sub: string; amt: number };
const AMOUNTS = [200, 500, 1000];

export function WalletScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const balance = st.walletBalance ?? 240;
  const [amt, setAmt] = useState(500);
  const [first, setFirst] = useState(true);
  const [sheet, setSheet] = useState(false);
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [txns, setTxns] = useState<Txn[]>([
    { title: 'Refund · visit ended early', sub: 'Today · #2031', amt: 79 },
    { title: 'General cleaning', sub: 'Today · #2041', amt: -158 },
    { title: 'Referral reward', sub: '12 Nov · Meera joined', amt: decisions.customer.referralReward },
  ]);
  const add = () => {
    set({ walletBalance: balance + amt });
    setTxns([{ title: `Added from ${method === 'upi' ? 'UPI' : 'card'}`, sub: 'Just now', amt }, ...txns]);
    setSheet(false);
    nav.toast(`${rupees(amt)} added to your wallet`);
  };
  return (
    <View style={{ flex: 1 }}>
      <TopBar style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Lft><TopBack /><T s color="#fff" style={{ opacity: 0.8 }}>Saathi wallet</T></Lft>
        <H size={30} color="#fff">{rupees(balance)}</H>
        <T s color="#fff" style={{ opacity: 0.8 }}>Used first on your next booking</T>
      </TopBar>
      <Screen>
        <H2>{t('Add money', 'पैसे जोड़ें')}</H2>
        <Grid cols={3}>{AMOUNTS.map((a) => <Pill key={a} sel={a === amt} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}</Grid>
        <Button style={{ paddingVertical: 11 }} onPress={() => setSheet(true)}>{t(`Add ${rupees(amt)}`, `${rupees(amt)} जोड़ें`)}</Button>
        <H2 style={{ marginTop: 4 }}>Recent</H2>
        <Card style={{ gap: 9 }}>
          {txns.map((x, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Hr />}
              <Row>
                <View style={{ flex: 1 }}><T b>{x.title}</T><T s m>{x.sub}</T></View>
                <T b color={x.amt > 0 ? c.accent : undefined}>{x.amt > 0 ? '+' : '−'} {rupees(Math.abs(x.amt))}</T>
              </Row>
            </React.Fragment>
          ))}
        </Card>
        <Card row>
          <View><H2>Pay from wallet first</H2><T s m>Rest goes to UPI</T></View>
          <Toggle on={first} onChange={(v) => { setFirst(v); nav.toast(v ? 'Wallet will be used first' : 'Wallet will not be used automatically'); }} />
        </Card>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>Add {rupees(amt)} to wallet</H2>
        {([['upi', 'UPI', 'nitin@okaxis'], ['card', 'Debit card', '•••• 4242']] as const).map(([k, l, s]) => (
          <Card key={k} row sel={method === k} onPress={() => setMethod(k)}>
            <View><H2>{l}</H2><T s m>{s}</T></View><Radio on={method === k} />
          </Card>
        ))}
        <T s m>New balance {rupees(balance + amt)}</T>
        <Button onPress={add}>Pay {rupees(amt)}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 37 · Refer a friend ---------- */
export function ReferScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const r = decisions.customer.referralReward;
  const code = 'NITIN100';
  const [reminded, setReminded] = useState(false);
  const copy = () => {
    try { (globalThis as any).navigator?.clipboard?.writeText(code); } catch { /* prototype */ }
    nav.toast(`Code ${code} copied`);
  };
  return (
    <Screen>
      <BackHeader title={t('Invite friends', 'दोस्तों को बुलाएँ')} onBack={nav.back} />
      <Card tone="yellow" style={{ paddingVertical: 18, paddingHorizontal: 14 }}>
        <H size={22} color={palette.ink}>{t(`Give ₹${r},\nget ₹${r}`, `₹${r} दें,\n₹${r} पाएँ`)}</H>
        <T color={palette.ink} style={{ marginTop: 6 }}>Your friend gets ₹{r} off the first visit. You get ₹{r} in your wallet when it is done.</T>
      </Card>
      <H2>Your code</H2>
      <Card row onPress={copy} style={{ borderWidth: 1.5, borderRadius: 12, padding: 12 }}>
        <T b size={15} style={{ letterSpacing: 2 }}>{code}</T>
        <Link onPress={copy}>Copy</Link>
      </Card>
      <Button onPress={() => nav.toast('Opening WhatsApp with your invite…')}>{t('Share on WhatsApp', 'WhatsApp पर भेजें')}</Button>
      <H2 style={{ marginTop: 4 }}>2 friends joined · ₹{2 * r} earned</H2>
      <Card style={{ gap: 9 }}>
        <Row><Lft><Avatar face="ms" size={26} /><T>Meera S.</T></Lft><Tag tone="n">₹{r} added</Tag></Row>
        <Hr />
        <Row><Lft><Avatar face="ap" size={26} /><T>Arjun P.</T></Lft><Tag tone="n">₹{r} added</Tag></Row>
        <Hr />
        <Row>
          <Lft><Avatar face="rg" size={26} /><T>Rohan G.</T></Lft>
          {reminded ? <Tag tone="x">Reminder sent</Tag> : <Link color={c.mut} onPress={() => { setReminded(true); nav.toast('Reminder sent to Rohan'); }}><Tag tone="x">Not booked yet</Tag></Link>}
        </Row>
      </Card>
    </Screen>
  );
}

/* ---------- 38 · Chat with helper ---------- */
type Msg = { me: boolean; text: string };
const REPLIES = ['Okay, noted.', 'Theek hai, I will be there soon.', 'Sure, no problem.', 'Got it, thank you!'];

export function ChatScreen() {
  const nav = useNav();
  const { c } = useTheme();
  const [msgs, setMsgs] = useState<Msg[]>([
    { me: false, text: 'Namaste, I am on the way. Which gate should I come to?' },
    { me: true, text: 'Gate 2, near the park. Tell the guard flat 204.' },
    { me: false, text: 'Okay. Do you have a mop and floor cleaner?' },
    { me: true, text: 'Yes, everything is in the balcony.' },
  ]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const replyN = useRef(0);
  const scroller = useRef<any>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (text: string) => {
    const v = text.trim();
    if (!v) return;
    setMsgs((m) => [...m, { me: true, text: v }]);
    setDraft('');
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { me: false, text: REPLIES[replyN.current++ % REPLIES.length] }]);
    }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.surface }}>
      <TopBar style={{ paddingBottom: 12, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Row>
          <Lft>
            <TopBack />
            <Avatar face="sd" size={26} />
            <View><H2 color="#fff">Sunita D.</H2><T s color="#fff" style={{ opacity: 0.8 }}>{typing ? 'Typing…' : 'Arriving in 5 min'}</T></View>
          </Lft>
          <Link onPress={() => nav.toast('Calling Sunita through a private number…')}><Icon name="call" color="#fff" /></Link>
        </Row>
      </TopBar>
      <ScrollView ref={scroller} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 8 }}
        onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: true })}>
        {msgs.map((m, i) => <Bubble key={i} me={m.me}>{m.text}</Bubble>)}
        {typing && <Bubble>…</Bubble>}
        <T s m center>Numbers stay private. Chat closes after the visit.</T>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingBottom: 14, gap: 8 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {['Ring the bell', 'Call me when here', 'I am home'].map((q) => (
            <Pill key={q} s onPress={() => send(q)} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>{q}</Pill>
          ))}
        </View>
        <Row style={{ borderWidth: 1.5, borderColor: c.line, borderRadius: 12, paddingVertical: 4, paddingLeft: 0, paddingRight: 12, backgroundColor: c.card }}>
          <Input small value={draft} onChangeText={setDraft} placeholder="Type a message" style={{ flex: 1, borderWidth: 0, paddingVertical: 5, backgroundColor: 'transparent' }} />
          <Link onPress={() => send(draft)}>Send</Link>
        </Row>
      </View>
    </View>
  );
}

/* ---------- 39 · Alerts ---------- */
const ALERTS: { icon: IconName; title: string; sub: string; go: string; fill?: boolean }[] = [
  { icon: 'bolt', title: 'Sunita arrives in 5 minutes', sub: 'Keep the door code 4821 ready · now', go: 'tracking', fill: true },
  { icon: 'wallet', title: '₹79 refunded to wallet', sub: 'Visit #2031 ended early · 1 hr ago', go: 'wallet' },
  { icon: 'clock', title: 'Plan visit tomorrow, 8:00 am', sub: 'Skip free until 9 pm tonight · 3 hr ago', go: 'plan' },
  { icon: 'star', title: 'How was Rekha?', sub: "Rate yesterday's visit · yesterday", go: 'ratingDetailed' },
  { icon: 'sparkle', title: '₹100 off deep clean this week', sub: 'Code DIWALI · 2 days ago', go: 'deepClean' },
];

export function AlertsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const read = st.readAlerts ?? [1, 2, 3, 4];
  const unread = ALERTS.length - read.length;
  return (
    <Screen>
      <Row>
        <Lft><TopBack color={c.ink} /><H>{t('Alerts', 'सूचनाएँ')}</H></Lft>
        {unread > 0 ? <Link onPress={() => { set({ readAlerts: ALERTS.map((_, i) => i) }); nav.toast('All alerts marked read'); }}>Mark all read</Link> : <T s m>All read</T>}
      </Row>
      {ALERTS.map((a, i) => {
        const isNew = !read.includes(i);
        return (
          <Card key={i} sel={isNew} onPress={() => { if (isNew) set({ readAlerts: [...read, i] }); nav.push(a.go); }}>
            <Lft style={{ alignItems: 'flex-start' }}>
              <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: isNew ? c.card : c.mint, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={a.icon} color={c.accent} fill={a.fill} />
              </View>
              <View style={{ flex: 1 }}><H2>{a.title}</H2><T s m>{a.sub}</T></View>
            </Lft>
          </Card>
        );
      })}
    </Screen>
  );
}
