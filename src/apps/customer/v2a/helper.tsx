/** Design page 12 · Helper profile, visit report and more ways to book (screens 40–43). */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Check, CheckRow, Grid, H, H2, Hr, Icon, Input, Lft, Link, Pill, Row, Screen,
  Sheet, Spacer, T, Tag, Toggle, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { decisions } from '@/data/decisions';
import { Stepper, fmtMin, rupees, useV2 } from './kit';

/* ---------- 40 · Helper profile ---------- */
export function HelperProfileScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV2();
  const favs = st.favourites ?? ['Sunita D.'];
  const fav = favs.includes('Sunita D.');
  const toggle = () => {
    set({ favourites: fav ? favs.filter((x) => x !== 'Sunita D.') : [...favs, 'Sunita D.'] });
    nav.toast(fav ? 'Sunita removed from favourites' : 'Sunita added to favourites');
  };
  const stat = (v: string, l: string, onPress?: () => void) => (
    <Card onPress={onPress} style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }}><T b>{v}</T><T s m>{l}</T></Card>
  );
  return (
    <Screen>
      <BackHeader title={t('Your helper', 'आपकी हेल्पर')} onBack={nav.back} />
      <View style={{ alignItems: 'center' }}>
        <Avatar face="sd" size={72} style={{ marginBottom: 6 }} />
        <H>Sunita D.</H>
        <T s m center>With Saathi since Oct 2026 · 142 visits</T>
      </View>
      <Lft gap={5} style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        <Tag tone="n">ID checked</Tag><Tag tone="n">Police verified</Tag><Tag tone="n">Trained</Tag>
      </Lft>
      <Grid cols={3}>
        {stat('4.8', 'Rating', () => nav.push('helperReviews'))}
        {stat('96%', 'On time')}
        {stat('6', 'Your visits', () => nav.push('visitReport'))}
      </Grid>
      <H2>Good at</H2>
      <Lft gap={6} style={{ flexWrap: 'wrap' }}>
        {['Floors', 'Kitchen scrub', 'Laundry'].map((s) => <Pill key={s} s style={{ paddingVertical: 6, paddingHorizontal: 10 }}>{s}</Pill>)}
      </Lft>
      <Card>
        <T s><T s b>Speaks</T> Hindi, Punjabi</T>
        <Hr style={{ marginVertical: 8 }} />
        <T s><T s b>Customers say</T> "Very thorough, always on time."</T>
        <View style={{ marginTop: 6 }}><Link onPress={() => nav.push('helperReviews')}>Read all 142 reviews</Link></View>
      </Card>
      <Spacer />
      <Grid cols={2}>
        <Button variant={fav ? 'yellow' : 'outline'} icon={fav ? 'star' : undefined} style={{ paddingVertical: 11 }} onPress={toggle}>{t('Favourite', 'पसंदीदा')}</Button>
        <Button style={{ paddingVertical: 12 }} onPress={() => nav.push('chores', { service: 'general', helper: 'Sunita D.' })}>{t('Book Sunita', 'सुनीता को बुक करें')}</Button>
      </Grid>
    </Screen>
  );
}

/* ---------- 41 · Visit report ---------- */
export function VisitReportScreen({ params }: ScreenProps<{ id?: string }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const id = params.id ?? '2041';
  const [photo, setPhoto] = useState<string | null>(null);
  const box = (l: string, v: string, sel?: boolean) => (
    <Card sel={sel} style={{ paddingVertical: 9, paddingHorizontal: 4, alignItems: 'center' }}><T s m>{l}</T><T b>{v}</T></Card>
  );
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={`${t('Visit report', 'विज़िट रिपोर्ट')} · #${id}`} onBack={nav.back} />
        <Grid cols={3}>{box('In', '11:08')}{box('Out', '12:10')}{box('Worked', '1 hr 2 min', true)}</Grid>
        <Card row onPress={() => nav.push('helperProfile')}>
          <Lft style={{ flex: 1 }}><Avatar face="sd" /><View style={{ flex: 1 }}><H2>Sunita D.</H2><T s m>Selfie matched at check-in and check-out</T></View></Lft>
          <Check on />
        </Card>
        <H2>Work done</H2>
        <Card style={{ gap: 9 }}>
          {['Sweep and mop floors', 'Dusting', 'Wipe surfaces'].map((w) => <CheckRow key={w} on label={w} />)}
        </Card>
        <H2>Photos from the helper</H2>
        <Grid cols={3}>
          {['Floor', 'Kitchen', 'Balcony'].map((p) => (
            <Card key={p} pad={false} onPress={() => setPhoto(p)} style={{ height: 62, borderRadius: 11, backgroundColor: c.mint, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
              <T s color={c.accent}>{p}</T>
            </Card>
          ))}
        </Grid>
        <Spacer />
        <Button variant="outline" danger onPress={() => nav.push('ratingLow', { stars: 2 })}>{t('Something is not right', 'कुछ ठीक नहीं है')}</Button>
      </Screen>
      <Sheet visible={!!photo} onClose={() => setPhoto(null)}>
        <H2>{photo} · after cleaning</H2>
        <View style={{ height: 200, borderRadius: 14, backgroundColor: c.mint, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="cam" size={32} color={c.accent} />
          <T s color={c.accent}>Photo taken 12:08 pm</T>
        </View>
        <Button variant="outline" onPress={() => setPhoto(null)}>Close</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 42 · Book for family ---------- */
const FAMILY_HOMES = [
  { label: "Parents' home", line: 'House 18, Sector 21', contact: 'Mrs Kapoor', phone: '98111 20034' },
  { label: "Sister's flat", line: 'B-702, Green Towers, Sector 50', contact: 'Priya Kumar', phone: '98990 41127' },
];

export function BookForFamilyScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const [who, setWho] = useState<'me' | 'family'>('family');
  const [home, setHome] = useState(0);
  const [name, setName] = useState(FAMILY_HOMES[0].contact);
  const [phone, setPhone] = useState(FAMILY_HOMES[0].phone);
  const [sms, setSms] = useState(true);
  const [hindi, setHindi] = useState(true);
  const [iPay, setIPay] = useState(true);
  const pick = (i: number) => { setHome(i); setName(FAMILY_HOMES[i].contact); setPhone(FAMILY_HOMES[i].phone); };
  const go = () => {
    if (who === 'family') {
      const h = FAMILY_HOMES[home];
      set({ address: { label: h.label, line: h.line, note: `${name} will open the door` }, bookingFor: { name, phone, sms, hindi, iPay } });
    }
    nav.push('time');
  };
  return (
    <Screen>
      <BackHeader title={t('Book for someone else', 'किसी और के लिए बुक करें')} onBack={nav.back} />
      <H>{t('Who is the visit for?', 'विज़िट किसके लिए है?')}</H>
      <Grid cols={2}>
        <Pill sel={who === 'me'} onPress={() => setWho('me')}>{t('Me', 'मैं')}</Pill>
        <Pill sel={who === 'family'} onPress={() => setWho('family')}>{t('Family', 'परिवार')}</Pill>
      </Grid>
      {who === 'me' ? (
        <Card sel><Lft><Icon name="pin" color={c.accent} /><View><H2>{st.address?.label ?? 'Home'}</H2><T s m>{st.address?.line ?? 'Flat 204, Block C'}</T></View></Lft></Card>
      ) : (
        <>
          {FAMILY_HOMES.map((h, i) => (
            <Card key={h.label} sel={home === i} onPress={() => pick(i)}>
              <Lft><Icon name="pin" color={home === i ? c.accent : c.mut} /><View><H2>{h.label}</H2><T s m>{h.line}</T></View></Lft>
            </Card>
          ))}
          <Link onPress={() => nav.push('addresses')}>+ Add another home</Link>
          <H2>Who will open the door?</H2>
          <Input small value={name} onChangeText={setName} placeholder="Name" />
          <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone number" />
          <Card style={{ gap: 10 }}>
            <Row><T style={{ flex: 1 }}>Send them the door code by SMS</T><Toggle on={sms} onChange={setSms} /></Row>
            <Hr />
            <Row><T style={{ flex: 1 }}>Helper should speak Hindi</T><Toggle on={hindi} onChange={setHindi} /></Row>
            <Hr />
            <Row><T style={{ flex: 1 }}>I will pay and get the report</T><Toggle on={iPay} onChange={setIPay} /></Row>
          </Card>
        </>
      )}
      <Spacer />
      <Button disabled={who === 'family' && (!name.trim() || phone.replace(/\D/g, '').length < 10)} onPress={go}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

/* ---------- 43 · Deep clean builder ---------- */
const ROOMS = [
  { id: 'bath', name: 'Bathrooms', sub: '45 min each', min: 45 },
  { id: 'kitchen', name: 'Kitchen with cabinets', sub: '1 hr', min: 60 },
  { id: 'fridge', name: 'Fridge inside', sub: '30 min', min: 30 },
  { id: 'fans', name: 'Ceiling fans', sub: '15 min each', min: 15 },
];

export function DeepCleanScreen() {
  const nav = useNav();
  const t = useT();
  const [, set] = useV2();
  const [qty, setQty] = useState<Record<string, number>>({ bath: 2, kitchen: 1, fridge: 0, fans: 2 });
  const [two, setTwo] = useState(true);
  const minutes = ROOMS.reduce((a, r) => a + (qty[r.id] ?? 0) * r.min, 0);
  const price = Math.round((minutes / 30) * decisions.prices.kitchenBath);
  const wall = two ? Math.ceil(minutes / 2 / 15) * 15 : minutes;
  return (
    <Screen>
      <BackHeader title={t('Deep clean', 'डीप क्लीन')} onBack={nav.back} />
      <Lft><CharacterTile name="deep" size={64} /><H style={{ flex: 1 }}>{t('Build it room by room', 'कमरे के हिसाब से बनाएँ')}</H></Lft>
      <Card style={{ gap: 10 }}>
        {ROOMS.map((r, i) => (
          <React.Fragment key={r.id}>
            {i > 0 && <Hr />}
            <Row>
              <View><T b>{r.name}</T><T s m>{r.sub}</T></View>
              <Stepper value={qty[r.id] ?? 0} max={r.id === 'kitchen' || r.id === 'fridge' ? 1 : 6} onChange={(n) => setQty({ ...qty, [r.id]: n })} />
            </Row>
          </React.Fragment>
        ))}
      </Card>
      <Card sel={two} row onPress={() => setTwo(!two)}>
        <View style={{ flex: 1 }}>
          <H2>2 helpers together</H2>
          <T s m>{minutes ? `Done in ${fmtMin(Math.ceil(minutes / 2 / 15) * 15)} instead of ${fmtMin(minutes)}` : 'Add a room first'}</T>
        </View>
        <Toggle on={two} onChange={setTwo} />
      </Card>
      <Spacer />
      <Row gap={12}>
        <View><T s m>{fmtMin(minutes)} of work</T><H>{rupees(price)}</H></View>
        <Button style={{ flex: 1 }} disabled={!minutes} onPress={() => {
          set({ service: 'kitchenBath', minutes: wall, deepClean: { rooms: qty, helpers: two ? 2 : 1, workMinutes: minutes, price } });
          nav.push('time', { deepClean: true });
        }}>{t('Pick a time', 'समय चुनें')}</Button>
      </Row>
    </Screen>
  );
}
