/** Design page 17 (CUSTOMER I): membership, protection and shared homes — screens 60–63. */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, Button, Card, Check, CheckRow, Grid, H, H2, Hr, Icon, IconTile, Input, Lft, Row, Screen, Sheet, Spacer, T, Tag,
  Toggle, TopBar, palette, useAppState, useNav, useT, useTheme, type Face,
} from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { type CustomerState } from '../chrome';
import { Back, Radio, useBack } from '../v2b/kit';

/* ---------- 60 · Plus membership ---------- */
const perks = ['First in line at busy hours', 'No busy-hour price rise', 'Free cancel up to 15 min before', 'Double points on every visit', 'Damage cover up to ₹10,000'];
export function PlusScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('account');
  const [st, set] = useAppState<CustomerState & { plus?: 'monthly' | 'yearly' }>();
  const [plan, setPlan] = useState<'monthly' | 'yearly'>(st.plus ?? 'yearly');
  const { plusMonthly, plusYearly } = decisions.prices;
  const member = st.plus;
  const join = () => {
    set({ plus: plan });
    nav.toast(t(`Welcome to Saathi Plus · ${plan === 'yearly' ? rupees(plusYearly) + ' a year' : rupees(plusMonthly) + ' a month'}`, 'साथी प्लस में आपका स्वागत है'));
  };
  return (
    <View style={{ flex: 1 }}>
      <TopBar style={{ backgroundColor: palette.ink }}>
        <Row>
          <Tag>Saathi Plus</Tag>
          {nav.canGoBack && <Pressable onPress={back} accessibilityLabel="Close"><Icon name="close" color="#fff" /></Pressable>}
        </Row>
        <H size={22} color="#fff" style={{ marginTop: 8 }}>{t('Never wait, never pay extra', 'न इंतज़ार, न ज़्यादा पैसे')}</H>
        <T s color="#fff" style={{ opacity: 0.8, marginTop: 2 }}>For homes that book every week</T>
      </TopBar>
      <Screen>
        <Card style={{ gap: 10 }}>
          {perks.map((p) => <Lft key={p}><Check on /><T style={{ flex: 1 }}>{p}</T></Lft>)}
        </Card>
        <Grid cols={2}>
          <Card sel={plan === 'monthly'} onPress={() => setPlan('monthly')} style={{ alignItems: 'center' }}>
            <T s m>{t('Monthly', 'मासिक')}</T><H>{rupees(plusMonthly)}</H>
          </Card>
          <Card sel={plan === 'yearly'} onPress={() => setPlan('yearly')} style={{ alignItems: 'center' }}>
            <T s m center>{t('Yearly · 2 months free', 'सालाना · 2 महीने मुफ़्त')}</T><H>{rupees(plusYearly)}</H>
          </Card>
        </Grid>
        <T s m>You booked 9 visits last month. Plus would have saved about ₹140.</T>
        <Spacer />
        {member === plan
          ? <Button variant="outline" onPress={() => nav.toast(`You are on Plus ${member}. Renews automatically.`)}>{t('You are a Plus member', 'आप प्लस सदस्य हैं')} ✓</Button>
          : <Button onPress={join}>{member ? t('Switch to', 'बदलें') : t('Join Plus', 'प्लस से जुड़ें')} · {plan === 'yearly' ? `${rupees(plusYearly)} a year` : `${rupees(plusMonthly)} a month`}</Button>}
      </Screen>
    </View>
  );
}

/* ---------- 61 · Damage claim ---------- */
const items = ['Glass jar, kitchen shelf', 'Vase, living room', 'Plate set', 'Something else'];
export function DamageClaimScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useAppState<CustomerState & { plus?: string }>();
  const [item, setItem] = useState(items[0]);
  const [value, setValue] = useState('450');
  const [photos, setPhotos] = useState(2);
  const [sent, setSent] = useState(false);
  const cap = st.plus ? 10000 : 2000;
  const send = () => {
    const v = Number(value.replace(/\D/g, ''));
    if (!item.trim() || item === 'Something else') { nav.toast('Tell us what was damaged'); return; }
    if (!photos) { nav.toast('Add at least one photo'); return; }
    if (v > cap) { nav.toast(`Cover is up to ${rupees(cap)} per visit`); return; }
    setSent(true);
    nav.toast(t('Claim sent · we reply in one working day', 'दावा भेजा गया'));
  };
  if (sent) {
    return (
      <Screen>
        <Back title={t('Damage protection', 'नुकसान सुरक्षा')} />
        <Card sel>
          <Row><H2>Claim #C-118</H2><Tag>Being checked</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{item} · {rupees(Number(value) || 0)} · visit #2041</T>
        </Card>
        <Card style={{ gap: 10 }}>
          {[['Claim sent', 'Today, with ' + photos + ' photos', true], ['Being checked', 'We talk to Sunita and look at the photos', true], ['Decision', 'Within one working day', false], ['Paid', 'Into your Saathi wallet or bank', false]].map(([a, b, on]) => (
            <Lft key={a as string} style={{ alignItems: 'flex-start' }}>
              <Check on={on as boolean} />
              <View style={{ flex: 1 }}><T b={on as boolean}>{a as string}</T><T s m>{b as string}</T></View>
            </Lft>
          ))}
        </Card>
        <T s m>You do not have to do anything else. We will message you here and on WhatsApp.</T>
        <Spacer />
        <Button onPress={() => nav.reset('home')}>{t('Back to home', 'होम पर जाएँ')}</Button>
        <Button variant="outline" onPress={() => nav.push('supportChat')}>{t('Talk to support', 'सहायता से बात करें')}</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <Back title={t('Damage protection', 'नुकसान सुरक्षा')} />
      <Card sel>
        <Lft gap={10}>
          <IconTile name="shield" bg={c.card} />
          <View style={{ flex: 1 }}><H2>Every visit is covered</H2><T s m>Up to ₹2,000 · ₹10,000 with Plus</T></View>
        </Lft>
      </Card>
      <H>{t('What was damaged?', 'क्या टूटा या ख़राब हुआ?')}</H>
      <Input small value={item === 'Something else' ? '' : item} onChangeText={setItem} placeholder="Describe the item" />
      <Lft gap={6} style={{ flexWrap: 'wrap' }}>
        {items.slice(1).map((x) => (
          <Pressable key={x} onPress={() => setItem(x)} style={{ borderWidth: 1, borderColor: item === x ? c.selBorder : c.line, backgroundColor: item === x ? c.selBg : c.card, borderRadius: 11, paddingVertical: 5, paddingHorizontal: 9 }}>
            <T s>{x}</T>
          </Pressable>
        ))}
      </Lft>
      <Grid cols={2}>
        <Card style={{ alignItems: 'center' }} onPress={() => nav.push('bookings')}><T s m>Visit</T><T b>#2041 · today</T></Card>
        <Card style={{ alignItems: 'center', paddingVertical: 6 }}>
          <T s m>Value</T>
          <Input small prefix="₹" value={value} onChangeText={(v) => setValue(v.replace(/\D/g, ''))} keyboardType="number-pad" style={{ borderWidth: 0, padding: 0, backgroundColor: 'transparent', justifyContent: 'center' }} />
        </Card>
      </Grid>
      <H2>Photos</H2>
      <Grid cols={3}>
        {[...Array.from({ length: photos }).map((_, i) => (
          <Pressable key={i} onPress={() => { setPhotos(photos - 1); nav.toast(`Photo ${i + 1} removed`); }} accessibilityLabel={`Remove photo ${i + 1}`}
            style={{ height: 60, borderRadius: 11, backgroundColor: c.mint, alignItems: 'center', justifyContent: 'center' }}>
            <T s color={c.accent}>Photo {i + 1}</T>
          </Pressable>
        )), photos < 6 ? (
          <Pressable key="add" onPress={() => setPhotos(photos + 1)} accessibilityRole="button" accessibilityLabel="Add photo"
            style={{ height: 60, borderRadius: 11, borderWidth: 1.5, borderStyle: 'dashed', borderColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
            <T s b color={c.accent}>+ Add</T>
          </Pressable>
        ) : null].filter(Boolean)}
      </Grid>
      <T s m>Report within 24 hours. We reply in one working day and pay into your wallet or bank.</T>
      <Spacer />
      <Button onPress={send}>{t('Send claim', 'दावा भेजें')}</Button>
    </Screen>
  );
}

/* ---------- 62 · Shared home ---------- */
type Mate = { face?: Face; initials?: string; name: string; role: string; inSplit: boolean; invited?: boolean };
const weekly = 258;
export function SharedHomeScreen() {
  const t = useT();
  const nav = useNav();
  const [mates, setMates] = useState<Mate[]>([
    { face: 'nk', name: 'Nitin (you)', role: 'Can book and pay', inSplit: true },
    { face: 'rv', name: 'Rahul V.', role: 'Can book and pay', inSplit: true },
    { face: 'ak', name: 'Aman K.', role: 'Pays only', inSplit: true },
  ]);
  const [split, setSplit] = useState(true);
  const [notify, setNotify] = useState(true);
  const [invite, setInvite] = useState(false);
  const [phone, setPhone] = useState('');
  const payers = mates.filter((m, i) => !m.invited && (i === 0 || (split && m.inSplit)));
  const share = Math.round(weekly / payers.length);
  const amount = (m: Mate, i: number) => (m.invited ? null : !split ? (i === 0 ? weekly : 0) : m.inSplit || i === 0 ? share : 0);
  const toggleMate = (i: number) => {
    if (i === 0 || !split || mates[i].invited) { nav.toast(i === 0 ? 'You are always in the split' : !split ? 'Turn on splitting first' : 'Waiting for them to join'); return; }
    setMates((ms) => ms.map((m, j) => (j === i ? { ...m, inSplit: !m.inSplit } : m)));
  };
  const homeCount = mates.filter((m) => !m.invited).length;
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Back title={t('Shared home', 'साझा घर')} fallback="account" />
        <H>Flat 204 · {homeCount} people</H>
        <Card style={{ gap: 10 }}>
          {mates.map((m, i) => {
            const a = amount(m, i);
            return (
              <React.Fragment key={m.name}>
                {i > 0 && <Hr />}
                <Pressable onPress={() => toggleMate(i)} accessibilityRole="button">
                  <Row>
                    <Lft style={{ flex: 1 }}>
                      <Avatar face={m.face} initials={m.initials} size={26} />
                      <View style={{ flex: 1 }}><T b>{m.name}</T><T s m>{m.invited ? 'Invite sent' : split && i > 0 && !m.inSplit ? 'Not in this split' : m.role}</T></View>
                    </Lft>
                    {a === null ? <Tag tone="x">Invited</Tag> : <T b m={a === 0}>{rupees(a)}</T>}
                  </Row>
                </Pressable>
              </React.Fragment>
            );
          })}
        </Card>
        <Card row>
          <View style={{ flex: 1 }}>
            <H2>{t('Split every bill equally', 'हर बिल बराबर बाँटें')}</H2>
            <T s m>{split ? `Monthly plan ${rupees(weekly)} a week · ${rupees(share)} each` : `You pay ${rupees(weekly)} a week`}</T>
          </View>
          <Toggle on={split} onChange={setSplit} />
        </Card>
        <Card row>
          <View style={{ flex: 1 }}><H2>Tell everyone before a visit</H2><T s m>So someone is home</T></View>
          <Toggle on={notify} onChange={setNotify} />
        </Card>
        {split && mates[2].inSplit && (
          <Card tone="yellow" onPress={() => nav.toast('Reminder sent to Aman on WhatsApp')}>
            <T s color={palette.ink}><T s b color={palette.ink}>Aman has not paid this week.</T> We remind him; your visits carry on.</T>
          </Card>
        )}
        <Spacer />
        <Button variant="outline" onPress={() => setInvite(true)}>{t('Invite a flatmate', 'फ़्लैटमेट को बुलाएँ')}</Button>
      </Screen>
      <Sheet visible={invite} onClose={() => setInvite(false)}>
        <H2>Invite a flatmate</H2>
        <T s m>They get a WhatsApp link to join Flat 204 and share the bill.</T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} placeholder="98765 43210" keyboardType="phone-pad" maxLength={11} />
        <Button onPress={() => {
          if (phone.replace(/\D/g, '').length < 10) { nav.toast('Enter a 10-digit number'); return; }
          setMates((ms) => [...ms, { initials: '+91', name: `+91 ${phone}`, role: '', inSplit: false, invited: true }]);
          setPhone(''); setInvite(false); nav.toast('Invite sent on WhatsApp');
        }}>{t('Send invite', 'न्योता भेजें')}</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 63 · Not-at-home visit ---------- */
const entries = [
  { k: 'guard', title: 'Key with the guard', hi: 'चाबी गार्ड के पास', sub: "Guard checks the helper's ID card", detail: 'Leave the key at Gate 2. The guard sees Sunita’s photo and ID before handing it over.' },
  { k: 'neighbour', title: 'Neighbour opens the door', hi: 'पड़ोसी दरवाज़ा खोलेंगे', sub: 'We send them the door code', detail: 'We send Flat 203 the door code 4821 and a message when Sunita arrives.' },
  { k: 'lock', title: 'Smart lock code', hi: 'स्मार्ट लॉक कोड', sub: 'Works once, for this visit only', detail: 'A one-time code is sent to Sunita at check-in and stops working when she leaves.' },
];
const proofs = ['Photo when the door is opened', 'Before and after photos of each room', 'Photo of the locked door at the end'];
export function NotHomeScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useAppState<CustomerState>();
  const [entry, setEntry] = useState('guard');
  const [proof, setProof] = useState<string[]>(proofs);
  const sel = entries.find((e) => e.k === entry)!;
  return (
    <Screen>
      <Back title={t('Visit while I am out', 'मेरी ग़ैरमौजूदगी में विज़िट')} />
      <H>{t('How does the helper get in?', 'हेल्पर अंदर कैसे आएगी?')}</H>
      {entries.map((e) => (
        <Card key={e.k} sel={entry === e.k} row onPress={() => setEntry(e.k)}>
          <View style={{ flex: 1 }}><H2>{t(e.title, e.hi)}</H2><T s m>{e.sub}</T></View>
          <Radio on={entry === e.k} />
        </Card>
      ))}
      <T s m>{sel.detail}</T>
      <H2>{t('You will get', 'आपको मिलेगा')}</H2>
      <Card style={{ gap: 8 }}>
        {proofs.map((p) => (
          <CheckRow key={p} on={proof.includes(p)} label={p} onPress={() => setProof((xs) => (xs.includes(p) ? xs.filter((x) => x !== p) : [...xs, p]))} />
        ))}
      </Card>
      <T s m>Only helpers you have had before, rated {decisions.quality.topRated.rating} or above.</T>
      <Spacer />
      <Button onPress={() => { set({ entry, entryProofs: proof, note: `Not at home: ${sel.title.toLowerCase()}` }); nav.push('confirm'); }}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}
