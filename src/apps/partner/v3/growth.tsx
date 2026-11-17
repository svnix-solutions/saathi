/** Design page 32 (section 58 "WORKER I"): career path, documents, swap a job, savings pot. */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Col, Grid, H, H2, Hr, Icon, IconTile, Lft, Pill, Row, Screen, Sheet, Spacer, T, Tag,
  Toggle, TopBar, palette, useNav, useT, useTheme, type Face, type IconName,
} from '@/native/ui';
import { rupees } from '@/data/decisions';
import { PartnerTabs } from '../chrome';
import { Progress, TopH, TopS, weekAhead } from './kit';

/* ---------- 55 · Career path ---------- */
export function CareerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [lessons, setLessons] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const expert = lessons >= 2;
  const steps = [
    { title: 'Partner', sub: 'Joined Oct 2026', state: 'done', more: 'Your first 50 visits are done.' },
    { title: expert ? 'Senior partner' : 'Senior partner · you are here', sub: '₹10 more per job, first pick of plans', state: expert ? 'done' : 'here', more: 'You got here with 100 visits and a 4.8 rating.' },
    { title: expert ? 'Deep clean expert · you are here' : 'Deep clean expert', sub: expert ? '₹129 jobs are open to you' : 'Finish 2 lessons · ₹129 jobs open up', state: expert ? 'here' : 'todo', more: 'Lessons: 1. Bathroom scrub  2. Kitchen degrease.' },
    { title: 'Trainer', sub: '300 visits and 4.7 rating · paid to teach', state: 'todo', more: '142 of 300 visits done.' },
    { title: 'Area lead', sub: 'Fixed monthly pay, looks after 20 partners', state: 'todo', more: 'Open to trainers with 6 months in the role.' },
  ];
  return (
    <Screen>
      <Lft><Avatar face="sd" size={56} /><H>{t('My path', 'मेरा रास्ता')}</H></Lft>
      <Card style={{ gap: 12 }}>
        {steps.map((s, i) => (
          <Pressable key={s.title} onPress={() => setOpen(open === i ? null : i)} accessibilityRole="button">
            <Lft style={{ alignItems: 'flex-start' }}>
              <View style={{
                width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
                borderColor: s.state === 'here' ? palette.yellow : s.state === 'done' ? palette.green : c.line,
                backgroundColor: s.state === 'here' ? palette.yellow : s.state === 'done' ? palette.green : 'transparent',
              }}>
                {s.state === 'done' && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
                {s.state === 'here' && <Icon name="star" size={14} color={palette.ink} />}
              </View>
              <View style={{ flex: 1 }}>
                <H2>{s.title}</H2>
                <T s m>{s.sub}</T>
                {open === i && <T s style={{ marginTop: 3 }}>{s.more}</T>}
              </View>
            </Lft>
          </Pressable>
        ))}
      </Card>
      <Card sel>
        <H2>{expert ? 'Next step: Trainer' : 'Next step: Deep clean expert'}</H2>
        <Progress pct={expert ? 142 / 300 : lessons / 2} track={c.card} fill={palette.green} height={7} style={{ marginTop: 6 }} />
        <T s m style={{ marginTop: 3 }}>{expert ? '142 of 300 visits done' : `${lessons} of 2 lessons done`}</T>
      </Card>
      <Spacer />
      {expert
        ? <Button variant="outline" onPress={() => nav.push('jobs')}>{t('See ₹129 jobs', '₹129 वाले काम देखें')}</Button>
        : <Button onPress={() => { setLessons(2); nav.toast('Lesson 2 done · you are now a Deep clean expert'); }}>{t('Do lesson 2 · 12 min', 'पाठ 2 करें · 12 मिनट')}</Button>}
    </Screen>
  );
}

/* ---------- 56 · Documents ---------- */
type DocState = 'valid' | 'update' | 'checking';
const DOCS: { id: string; icon: IconName; title: string; sub: string }[] = [
  { id: 'aadhaar', icon: 'user', title: 'Aadhaar card', sub: 'Checked 28 Oct 2026 · ···· 4821' },
  { id: 'police', icon: 'shield', title: 'Police verification', sub: 'Valid until Oct 2027' },
  { id: 'bank', icon: 'wallet', title: 'Bank account', sub: 'State Bank ···· 4821' },
  { id: 'photo', icon: 'cam', title: 'Profile photo', sub: 'Older than 1 year · take a new one' },
];

export function DocumentsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, setSt] = useState<Record<string, DocState>>({ aadhaar: 'valid', police: 'valid', bank: 'valid', photo: 'update' });
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    if (st.photo !== 'checking') return;
    const id = setTimeout(() => { setSt((s) => ({ ...s, photo: 'valid' })); nav.toast('Profile photo approved'); }, 2200);
    return () => clearTimeout(id);
  }, [st.photo]);
  const upload = (how: string) => { setSheet(false); setSt((s) => ({ ...s, photo: 'checking' })); nav.toast(`${how} · uploaded, checking now`); };
  const tap = (id: string) => {
    if (id === 'photo' && st.photo === 'update') setSheet(true);
    else if (id === 'bank') nav.push('bank');
    else nav.toast(st[id] === 'checking' ? 'Still checking, takes a minute' : 'This document is valid');
  };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <H>{t('My documents', 'मेरे कागज़')}</H>
        {DOCS.map((d) => {
          const s = st[d.id];
          return (
            <Card key={d.id} row tone={s === 'update' ? 'red' : undefined} onPress={() => tap(d.id)}>
              <Lft style={{ flex: 1 }}>
                <IconTile name={d.icon} />
                <View style={{ flex: 1 }}>
                  <H2>{d.title}</H2>
                  {s === 'update' ? <T s color={c.red}>{d.sub}</T>
                    : s === 'checking' ? <T s m>New photo · checking…</T>
                    : <T s m>{d.id === 'photo' ? 'Updated today' : d.sub}</T>}
                </View>
              </Lft>
              {s === 'valid' && <Tag tone="n">Valid</Tag>}
              {s === 'update' && <Tag tone="r">Update</Tag>}
              {s === 'checking' && <Tag tone="x">Checking</Tag>}
            </Card>
          );
        })}
        <Card row onPress={() => nav.toast('Certificate saved to your phone')}>
          <Lft><IconTile name="list" /><View><H2>Training certificate</H2><T s m>Download or share</T></View></Lft>
          <Icon name="chevron" color={c.mut} />
        </Card>
        <T s m>We remind you 30 days before anything runs out.</T>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('New profile photo', 'नई प्रोफ़ाइल फ़ोटो')}</H2>
        <T s m>Plain background, face clearly seen, no cap or sunglasses.</T>
        <Button icon="cam" onPress={() => upload('Photo taken')}>{t('Take photo', 'फ़ोटो लें')}</Button>
        <Button variant="outline" onPress={() => upload('Photo chosen')}>{t('Choose from gallery', 'गैलरी से चुनें')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 57 · Swap a job ---------- */
const MATES: { id: string; face: Face; name: string; sub: string }[] = [
  { id: 'kr', face: 'kr', name: 'Kavita R.', sub: 'Free then · 1.1 km away' },
  { id: 'rm', face: 'rm', name: 'Rekha M.', sub: 'Free then · 1.6 km away' },
];

export function SwapJobScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [sel, setSel] = useState('kr');
  const [asked, setAsked] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [giveBack, setGiveBack] = useState(false);
  useEffect(() => {
    if (!asked) return;
    const id = setTimeout(() => { setAccepted(true); nav.toast(`${MATES.find((m) => m.id === asked)?.name} took the job · no penalty`); }, 2000);
    return () => clearTimeout(id);
  }, [asked]);
  const mate = MATES.find((m) => m.id === (asked ?? sel))!;
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Cannot do this job?', 'यह काम नहीं कर सकतीं?')} onBack={nav.back} />
        <Card sel>
          <Row><H2>Kitchen &amp; bath scrub</H2><Tag>Tue 2 pm</Tag></Row>
          <T s m style={{ marginTop: 4 }}>Block A · 2 hr · you earn ₹206</T>
        </Card>
        <H>{t('Pass it to another partner', 'किसी और पार्टनर को दें')}</H>
        <Card style={{ gap: 10 }}>
          {MATES.map((m, i) => {
            const on = m.id === sel;
            const isAsked = asked === m.id;
            return (
              <React.Fragment key={m.id}>
                {i > 0 && <Hr />}
                <Pressable onPress={() => !asked && setSel(m.id)}>
                  <Row>
                    <Lft style={{ flex: 1 }}>
                      <Avatar face={m.face} size={28} />
                      <View><T b>{m.name}</T><T s m>{isAsked ? (accepted ? 'Took the job' : 'Asked · waiting for reply…') : m.sub}</T></View>
                    </Lft>
                    {isAsked ? <Tag tone={accepted ? 'g' : 'x'}>{accepted ? 'Taken' : 'Asked'}</Tag> : (
                      <Button disabled={!!asked} variant={on ? 'primary' : 'outline'} style={{ paddingVertical: on ? 6 : 5, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }}
                        onPress={() => { setSel(m.id); setAsked(m.id); }}>{t('Ask', 'पूछें')}</Button>
                    )}
                  </Row>
                </Pressable>
              </React.Fragment>
            );
          })}
        </Card>
        {accepted
          ? <Card tone="mint"><H2>{mate.name} will go on Tue 2 pm</H2><T s m>The customer has been told who is coming. No penalty for you.</T></Card>
          : <Card tone="yellow"><T s color={palette.ink}><T s b color={palette.ink}>No penalty</T> if a partner takes it more than 3 hours before. The customer is told who is coming.</T></Card>}
        <Spacer />
        {accepted
          ? <Button onPress={() => nav.reset('jobs')}>{t('Back to my jobs', 'मेरे काम')}</Button>
          : <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => setGiveBack(true)}>{t('Give it back to Saathi', 'साथी को वापस दें')}</Button>}
      </Screen>
      <Sheet visible={giveBack} onClose={() => setGiveBack(false)}>
        <H2>{t('Give this job back?', 'यह काम वापस करें?')}</H2>
        <T s m>More than 3 hours before, so there is no penalty. We will find another partner.</T>
        <Button danger variant="outline" onPress={() => { setGiveBack(false); nav.toast('Job given back · no penalty'); setTimeout(() => nav.reset('jobs'), 600); }}>{t('Yes, give it back', 'हाँ, वापस करें')}</Button>
        <Button onPress={() => setGiveBack(false)}>{t('Keep the job', 'काम रखें')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 58 · Savings pot ---------- */
export function SavingsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const goal = 10000;
  const [bal, setBal] = useState(6400);
  const [fromPayout, setFromPayout] = useState(true);
  const [perPayout, setPerPayout] = useState(200);
  const [tips, setTips] = useState(true);
  const [recent, setRecent] = useState([
    { label: 'Mon 9 Nov · from payout', amt: 200 },
    { label: 'Tips, last week', amt: 250 },
  ]);
  const [out, setOut] = useState(false);
  const [outAmt, setOutAmt] = useState(1000);
  const weekly = (fromPayout ? perPayout : 0) + (tips ? 250 : 0);
  const left = Math.max(0, goal - bal);
  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <TopS>{t('My savings pot', 'मेरी बचत')}</TopS>
        <TopH size={30}>{rupees(bal)}</TopH>
        <TopS>For: daughter's school fees · {rupees(goal)}</TopS>
        <Progress pct={bal / goal} style={{ marginTop: 10 }} />
      </TopBar>
      <Screen>
        <Card>
          <Row>
            <View style={{ flex: 1 }}><H2>Save from every payout</H2><T s m>{fromPayout ? `₹${perPayout} each Monday` : 'Off'}</T></View>
            <Toggle on={fromPayout} onChange={setFromPayout} />
          </Row>
          {fromPayout && (
            <Grid cols={4} gap={6} style={{ marginTop: 9 }}>
              {[100, 200, 300, 500].map((a) => <Pill key={a} s sel={perPayout === a} onPress={() => setPerPayout(a)}>₹{a}</Pill>)}
            </Grid>
          )}
        </Card>
        <Card row>
          <View style={{ flex: 1 }}><H2>Save my tips</H2><T s m>About ₹250 a week</T></View>
          <Toggle on={tips} onChange={setTips} />
        </Card>
        <Card sel={weekly > 0} tone={weekly > 0 ? undefined : 'red'}>
          {left === 0 ? <H2>Goal reached · well done!</H2>
            : weekly > 0 ? <><H2>You will reach {rupees(goal)} by {weekAhead(left / weekly)}</H2><T s m>At ₹{weekly} a week</T></>
            : <><H2>Saving is off</H2><T s m>Turn on a saving above to reach your goal.</T></>}
        </Card>
        <H2>{t('Recent', 'हाल में')}</H2>
        <Card style={{ gap: 8 }}>
          {recent.map((r, i) => (
            <Row key={i}><T m>{r.label}</T><T b color={r.amt > 0 ? c.accent : c.red}>{r.amt > 0 ? '+' : '−'} {rupees(Math.abs(r.amt))}</T></Row>
          ))}
        </Card>
        <Spacer />
        <Button variant="outline" disabled={bal === 0} onPress={() => setOut(true)}>{t('Take money out', 'पैसे निकालें')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={out} onClose={() => setOut(false)}>
        <H2>{t('Take money out', 'पैसे निकालें')}</H2>
        <Grid cols={3}>
          {[1000, 2000, bal].map((a, i) => <Pill key={i} sel={outAmt === a} onPress={() => setOutAmt(a)}>{i === 2 ? 'All' : rupees(a)}</Pill>)}
        </Grid>
        <Col gap={2}><T s m>Reaches State Bank ···· 4821 in a few minutes. No charge.</T><T s m>Held by our licensed bank partner.</T></Col>
        <Button disabled={outAmt > bal} onPress={() => {
          const a = Math.min(outAmt, bal);
          setBal(bal - a);
          setRecent((r) => [{ label: 'Today · taken out', amt: -a }, ...r]);
          setOut(false);
          nav.toast(`${rupees(a)} sent to your bank`);
        }}>{t('Take out', 'निकालें')} {rupees(Math.min(outAmt, bal))}</Button>
      </Sheet>
    </View>
  );
}
