/** Design page 10 · Plans, favourites, supplies and receipts (screens 32–35). */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Grid, H, H2, Hr, Icon, Lft, Link, Pill, Row, Screen, Sheet,
  Spacer, T, Toggle, palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { decisions, priceFor } from '@/data/decisions';
import { CustomerTabs } from '../chrome';
import { Line, PickSheet, Stepper, fmtMin, rupees, useV2 } from './kit';

/* ---------- 32 · Monthly plan ---------- */
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TIMES = ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '4:00 pm', '5:00 pm', '6:00 pm'];
const LENGTHS = [30, 60, 90, 120];
const HELPERS = [
  { id: 'Sunita D.', face: 'sd' as const }, { id: 'Rekha M.', face: 'rm' as const }, { id: 'Kiran R.', face: 'kr' as const },
];

export function PlanScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useV2();
  const [days, setDays] = useState([true, true, true, true, true, true, false]);
  const [time, setTime] = useState('8:00 am');
  const [len, setLen] = useState(60);
  const [helper, setHelper] = useState(HELPERS[0]);
  const [sheet, setSheet] = useState<null | 'time' | 'len' | 'helper'>(null);

  const perWeek = days.filter(Boolean).length;
  const visits = Math.round((perWeek * 52) / 12);
  const each = priceFor('general', len);
  const sub = visits * each;
  const saving = Math.round(sub * decisions.prices.monthlyPlanSaving);

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Monthly plan', 'मासिक प्लान')} onBack={nav.back} />
        <Lft><CharacterTile name="hero" size={64} /><H style={{ flex: 1 }}>{t('Same helper, every day', 'हर दिन वही हेल्पर')}</H></Lft>
        <H2>{t('Which days?', 'कौन से दिन?')}</H2>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          {DAYS.map((d, i) => (
            <Pill key={i} sel={days[i]} style={{ flex: 1 }} onPress={() => setDays(days.map((v, j) => (j === i ? !v : v)))}>{d}</Pill>
          ))}
        </View>
        <Grid cols={2}>
          <Card onPress={() => setSheet('time')}><T s m>Start time</T><H2>{time}</H2></Card>
          <Card onPress={() => setSheet('len')}><T s m>Each visit</T><H2>{fmtMin(len)}</H2></Card>
        </Grid>
        <Card row>
          <Lft><Avatar face={helper.face} /><View><H2>{helper.id}</H2><T s m>Your regular helper</T></View></Lft>
          <Link onPress={() => setSheet('helper')}>Change</Link>
        </Card>
        <Card style={{ gap: 6 }}>
          <Line label={`${visits} visits × ${rupees(each)}`} value={rupees(sub)} />
          <Line label={`Plan saving ${decisions.prices.monthlyPlanSaving * 100}%`} value={`− ${rupees(saving)}`} green />
          <Hr />
          <Line bold label="Per month" value={rupees(sub - saving)} />
        </Card>
        <T s m>Skip a day or pause the plan any time, free until 9 pm the night before.</T>
        <Spacer />
        <Button disabled={!perWeek} onPress={() => {
          set({ plan: { days, time, minutes: len, helper: helper.id, perMonth: sub - saving } });
          nav.toast(`Plan started with ${helper.id} · ${rupees(sub - saving)} a month`);
          nav.reset('home');
        }}>{t('Start plan', 'प्लान शुरू करें')}</Button>
      </Screen>
      <PickSheet visible={sheet === 'time'} title="Start time" value={time} onClose={() => setSheet(null)} onPick={setTime}
        options={TIMES.map((v) => ({ v, label: v }))} />
      <PickSheet visible={sheet === 'len'} title="Each visit" value={len} onClose={() => setSheet(null)} onPick={setLen}
        options={LENGTHS.map((v) => ({ v, label: `${fmtMin(v)} · ${rupees(priceFor('general', v))}` }))} />
      <Sheet visible={sheet === 'helper'} onClose={() => setSheet(null)}>
        <H2>Choose your regular helper</H2>
        {HELPERS.map((h) => (
          <Card key={h.id} row sel={h.id === helper.id} onPress={() => { setHelper(h); setSheet(null); }}>
            <Lft><Avatar face={h.face} size={32} /><H2>{h.id}</H2></Lft>
            {h.id === helper.id && <Icon name="check" color={c.accent} />}
          </Card>
        ))}
      </Sheet>
    </View>
  );
}

/* ---------- 33 · Favourite helpers ---------- */
export function FavouritesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV2();
  const favs = st.favourites ?? ['Sunita D.'];
  const blocked = st.blocked ?? ['Mohan T.'];
  const [prefer, setPrefer] = useState(true);
  const [manage, setManage] = useState(false);
  const toggleFav = (n: string) => {
    const next = favs.includes(n) ? favs.filter((x) => x !== n) : [...favs, n];
    set({ favourites: next });
    nav.toast(favs.includes(n) ? `${n} removed from favourites` : `${n} added to favourites`);
  };
  const book = (name: string) => { set({ helper: name, service: 'general' }); nav.push('chores', { service: 'general', helper: name }); };
  const people = [
    { n: 'Sunita D.', face: 'sd' as const, sub: '6 visits · you rated 5', first: 'Sunita' },
    { n: 'Rekha M.', face: 'rm' as const, sub: '2 visits · you rated 4', first: 'Rekha' },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <H>{t('Your helpers', 'आपके हेल्पर')}</H>
        {people.map((p) => {
          const fav = favs.includes(p.n);
          return (
            <Card key={p.n} sel={fav}>
              <Row>
                <Lft>
                  <Avatar face={p.face} />
                  <View><Link color={c.ink} onPress={() => p.face === 'sd' ? nav.push('helperProfile') : toggleFav(p.n)}><H2>{p.n}</H2></Link><T s m>{p.sub}</T></View>
                </Lft>
                {fav
                  ? <Pill onPress={() => toggleFav(p.n)} style={{ backgroundColor: palette.yellow, borderWidth: 0, paddingVertical: 3, paddingHorizontal: 9 }}><T s b color={palette.ink}>Favourite</T></Pill>
                  : <Link onPress={() => toggleFav(p.n)}><Icon name="star" color={c.mut} /></Link>}
              </Row>
              <Button variant={fav ? 'primary' : 'outline'} style={{ marginTop: 10, paddingVertical: fav ? 10 : 9 }} onPress={() => book(p.n)}>
                {t(`Book ${p.first}`, `${p.first} को बुक करें`)}
              </Button>
            </Card>
          );
        })}
        <Card row>
          <View style={{ flex: 1 }}><H2>Prefer my favourites</H2><T s m>We try them first, then send the nearest helper</T></View>
          <Toggle on={prefer} onChange={(v) => { setPrefer(v); nav.toast(v ? 'Favourites will be tried first' : 'Nearest helper will be sent'); }} />
        </Card>
        <Card row onPress={() => setManage(true)}>
          <View><H2>Do not send again</H2><T s m>{blocked.length} helper{blocked.length === 1 ? '' : 's'} blocked</T></View>
          <Link onPress={() => setManage(true)}>Manage</Link>
        </Card>
      </Screen>
      <CustomerTabs active="account" />
      <Sheet visible={manage} onClose={() => setManage(false)}>
        <H2>Do not send again</H2>
        {blocked.length === 0 && <T m>No helpers blocked.</T>}
        {blocked.map((b) => (
          <Card key={b} row>
            <Lft><Avatar face="mt" size={32} /><H2>{b}</H2></Lft>
            <Link onPress={() => { set({ blocked: blocked.filter((x) => x !== b) }); nav.toast(`${b} unblocked`); }}>Unblock</Link>
          </Card>
        ))}
        <Button variant="outline" onPress={() => setManage(false)}>Done</Button>
      </Sheet>
    </View>
  );
}

/* ---------- 34 · Supplies ---------- */
const SUPPLIES = [
  { id: 'floor', name: 'Floor cleaner, 500 ml', price: 89 },
  { id: 'dish', name: 'Dish liquid, 250 ml', price: 65 },
  { id: 'mop', name: 'Mop refill', price: 149 },
  { id: 'cloth', name: 'Microfibre cloths, 3', price: 99 },
  { id: 'bath', name: 'Bathroom cleaner, 500 ml', price: 95 },
];

export function SuppliesScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV2();
  const [qty, setQty] = useState<Record<string, number>>(st.supplies ?? { floor: 1, dish: 1 });
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = SUPPLIES.reduce((a, s) => a + (qty[s.id] ?? 0) * s.price, 0);
  return (
    <Screen>
      <BackHeader title={t('Add supplies', 'सामान जोड़ें')} onBack={nav.back} />
      <Lft><CharacterTile name="kitchen" size={64} /><H size={16} style={{ flex: 1 }}>{t('Nothing at home? The helper brings it.', 'घर पर सामान नहीं? हेल्पर ले आएगी।')}</H></Lft>
      <Card style={{ gap: 10 }}>
        {SUPPLIES.map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && <Hr />}
            <Row>
              <View><T b>{s.name}</T><T s m>{rupees(s.price)}</T></View>
              <Stepper value={qty[s.id] ?? 0} onChange={(n) => setQty({ ...qty, [s.id]: n })} />
            </Row>
          </React.Fragment>
        ))}
      </Card>
      <T s m>Supplies are yours to keep. Added to the visit bill.</T>
      <Spacer />
      <Button onPress={() => {
        set({ supplies: qty });
        nav.toast(count ? `${count} item${count === 1 ? '' : 's'} added to the visit · ${rupees(total)}` : 'No supplies added');
        nav.back();
      }}>{count ? `Add ${count} item${count === 1 ? '' : 's'} · ${rupees(total)}` : t('Continue without supplies', 'बिना सामान आगे बढ़ें')}</Button>
    </Screen>
  );
}

/* ---------- 35 · Receipt ---------- */
export function ReceiptScreen({ params }: ScreenProps<{ id?: string }>) {
  const nav = useNav();
  const t = useT();
  const id = params.id ?? '2041';
  return (
    <Screen>
      <BackHeader title={`${t('Receipt', 'रसीद')} · #${id}`} onBack={nav.back} />
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }}>
          <Icon name="check" size={22} color="#fff" strokeWidth={3} />
        </View>
        <H size={24}>{t('Paid', 'भुगतान')} ₹237</H>
        <T s m>Today, 12:14 pm · Sunita D.</T>
      </View>
      <Card style={{ gap: 7 }}>
        <Line label="General cleaning, 1 hr" value="₹158" />
        <Line label="Extra 30 minutes" value="₹79" />
        <Line label="Offer FIRST50" value="− ₹50" green />
        <Line label="Tip for Sunita" value="₹50" />
        <Hr />
        <Line bold label="Total" value="₹237" />
      </Card>
      <Card style={{ gap: 6 }}>
        <Row><T s m>From wallet</T><T s>₹79</T></Row>
        <Row><T s m>UPI</T><T s>₹158</T></Row>
      </Card>
      <Link onPress={() => nav.push('visitReport', { id })}>See the visit report</Link>
      <Spacer />
      <Grid cols={2}>
        <Button variant="outline" style={{ paddingVertical: 11 }} onPress={() => nav.toast(`Invoice #${id} downloaded (PDF)`)}>{t('Get invoice', 'इनवॉइस लें')}</Button>
        <Button style={{ paddingVertical: 12 }} onPress={() => nav.push('chores', { service: 'general', helper: 'Sunita D.' })}>{t('Book again', 'फिर से बुक करें')}</Button>
      </Grid>
    </Screen>
  );
}
