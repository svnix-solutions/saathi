/** Design page 28 · ratings both ways, reviews, quality, badges (screens 40–43). */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button, Card, Grid, H, H2, Icon, IconTile, Input, Lft, Link, Pill, Row, Screen, Sheet, Spacer, Stars, T, Tag, TopBar,
  palette, useAppState, useNav, useT, useTheme, type IconName,
} from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { PartnerTabs, initialPartnerState, type PartnerState } from '../chrome';
import { Meter, Root, TopLabel, onGreen } from './kit';

/* ---------- 40 · Rate the customer ---------- */
const homeTags = [['Respectful', 'सम्मानजनक'], ['Supplies ready', 'सामान तैयार'], ['Clear instructions', 'साफ़ निर्देश'], ['Felt safe', 'सुरक्षित लगा']] as const;
const problems = ['Felt unsafe', 'Abusive words', 'Asked for extra work', 'Something else'];

export function RateCustomerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useAppState<PartnerState>();
  const job = st.job ?? initialPartnerState.job;
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(['Respectful', 'Supplies ready']);
  const [report, setReport] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const toggle = (k: string) => setTags((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const finish = (msg: string) => { nav.reset('home'); nav.toast(msg); };
  return (
    <Root>
      <TopBar>
        <Row><H2 color={onGreen}>{t(`Job done · ${rupees(job.earn)} earned`, `काम पूरा · ${rupees(job.earn)} कमाए`)}</H2><Tag>{job.id}</Tag></Row>
      </TopBar>
      <Screen>
        <H>{t('How was this home?', 'यह घर कैसा था?')}</H>
        <View style={{ alignSelf: 'center' }}><Stars size={32} value={stars} onChange={setStars} /></View>
        <Grid cols={2}>
          {homeTags.map(([en, hi]) => <Pill key={en} sel={tags.includes(en)} onPress={() => toggle(en)}>{t(en, hi)}</Pill>)}
        </Grid>
        <Card row tone="red" onPress={() => setReport(true)}>
          <View style={{ flex: 1 }}>
            <H2 color={c.red}>{t('Report a problem', 'समस्या बताएँ')}</H2>
            <T s m>Unsafe, abusive, or asked for extra work</T>
          </View>
          <Icon name="shield" color={c.red} />
        </Card>
        <T s m>{t('The customer does not see your rating. It helps us send partners to good homes.', 'ग्राहक आपकी रेटिंग नहीं देखते। इससे हम पार्टनर को अच्छे घरों में भेजते हैं।')}</T>
        <Spacer />
        <Button big onPress={() => { set({ lastHomeRating: { stars, tags } }); finish(t('Thanks. Your rating is saved.', 'धन्यवाद। रेटिंग सेव हो गई।')); }}>
          {t('Submit', 'भेजें')}
        </Button>
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => finish(t('Skipped', 'छोड़ दिया'))}>
          {t('Skip', 'छोड़ें')}
        </Button>
      </Screen>
      <Sheet visible={report} onClose={() => setReport(false)}>
        <H2 color={c.red}>{t('Report a problem', 'समस्या बताएँ')}</H2>
        <T s m>Only our safety team sees this. The customer is not told who reported.</T>
        {problems.map((p) => <Card key={p} sel={problem === p} onPress={() => setProblem(p)} style={{ paddingVertical: 9 }}><T>{p}</T></Card>)}
        <Button danger disabled={!problem} onPress={() => { setReport(false); finish('Reported. Our safety team will call you in 2 minutes.'); }}>
          {t('Send report', 'रिपोर्ट भेजें')}
        </Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 41 · Reviews received ---------- */
type Review = { id: number; place: string; stars: number; text: string; when: string; tip?: number; isNew?: boolean; action?: 'thanks' | 'contest' };
const reviewData: Review[] = [
  { id: 1, place: 'Flat 204, Block C', stars: 4, text: 'Kitchen slab was spotless. Balcony corner was missed.', when: 'Today', tip: 50, isNew: true, action: 'thanks' },
  { id: 2, place: 'House 18, Sector 21', stars: 5, text: 'Very thorough, always on time.', when: '12 Nov', isNew: true },
  { id: 3, place: 'Flat 9, Block A', stars: 3, text: 'Balcony was missed.', when: '8 Nov', isNew: true, action: 'contest' },
];
const thanks = ['Thank you for the tip!', 'Happy to help. See you next time.', 'Thank you, I will check the balcony next time.'];

export function ReviewsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [seen, setSeen] = useState<number[]>([]);
  const [done, setDone] = useState<Record<number, string>>({});
  const [sheet, setSheet] = useState<{ r: Review; kind: 'thanks' | 'contest' } | null>(null);
  const [msg, setMsg] = useState(thanks[0]);
  const [why, setWhy] = useState('');
  const fresh = reviewData.filter((r) => r.isNew && !seen.includes(r.id)).length;
  const open = (r: Review, kind: 'thanks' | 'contest') => { setSheet({ r, kind }); setMsg(thanks[0]); setWhy(''); };
  return (
    <Root>
      <Screen>
        <Row><H>{t('My reviews', 'मेरे रिव्यू')}</H>{fresh > 0 ? <Tag tone="n">{`${fresh} new`}</Tag> : <Tag tone="x">All read</Tag>}</Row>
        {reviewData.map((r, i) => (
          <Card key={r.id} sel={i === 0 && !seen.includes(r.id)} onPress={() => setSeen((s) => (s.includes(r.id) ? s : [...s, r.id]))}>
            <Row><T b>{r.place}</T><Stars value={r.stars} /></Row>
            <T style={{ marginTop: 4 }}>{r.text}</T>
            {r.action ? (
              <Row style={{ marginTop: 8 }}>
                <T s m>{r.when}{r.tip ? ` · tip ${rupees(r.tip)}` : ''}</T>
                {done[r.id]
                  ? <Tag tone="n">{done[r.id]}</Tag>
                  : <Link onPress={() => open(r, r.action!)}>{r.action === 'thanks' ? t('Say thank you', 'धन्यवाद कहें') : t('This was not fair', 'यह सही नहीं था')}</Link>}
              </Row>
            ) : <T s m style={{ marginTop: 6 }}>{r.when}</T>}
          </Card>
        ))}
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={!!sheet} onClose={() => setSheet(null)}>
        {sheet?.kind === 'thanks' && (
          <>
            <H2>{t('Say thank you', 'धन्यवाद कहें')} · {sheet.r.place}</H2>
            {thanks.map((m) => <Card key={m} sel={msg === m} onPress={() => setMsg(m)} style={{ paddingVertical: 9 }}><T>{m}</T></Card>)}
            <Button onPress={() => { setDone((d) => ({ ...d, [sheet.r.id]: 'Thanked' })); setSheet(null); nav.toast('Thank-you sent'); }}>{t('Send', 'भेजें')}</Button>
          </>
        )}
        {sheet?.kind === 'contest' && (
          <>
            <H2>{t('This was not fair', 'यह सही नहीं था')} · {sheet.r.place}</H2>
            <T s m>Tell us what happened. If we agree, this rating is removed from your score.</T>
            <Input small multiline value={why} onChangeText={setWhy} placeholder="e.g. The balcony was locked" />
            <Button disabled={!why.trim()} onPress={() => { setDone((d) => ({ ...d, [sheet.r.id]: 'Under review' })); setSheet(null); nav.toast('Sent to our team. We reply in 48 hours.'); }}>
              {t('Send to Saathi team', 'साथी टीम को भेजें')}
            </Button>
          </>
        )}
      </Sheet>
    </Root>
  );
}

/* ---------- 42 · Quality score ---------- */
export function QualityScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const q = decisions.quality;
  const [complaint, setComplaint] = useState(false);
  const rating = 4.8, onTime = 0.96, finished = 0.99;
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  const rows = [
    { label: 'Customer rating', hi: 'ग्राहक रेटिंग', value: String(rating), fill: rating / 5, mark: q.minRating / 5, need: `Needs ${q.minRating} or above`, ok: rating >= q.minRating },
    { label: 'Arrived on time', hi: 'समय पर पहुँचीं', value: pct(onTime), fill: onTime, mark: q.onTime, need: `Needs ${pct(q.onTime)} or above`, ok: onTime >= q.onTime },
    { label: 'Jobs finished', hi: 'काम पूरे किए', value: pct(finished), fill: finished, mark: q.finished, need: `Needs ${pct(q.finished)} or above`, ok: finished >= q.finished },
  ];
  const top = rating >= q.topRated.rating && rows.every((r) => r.ok);
  return (
    <Root>
      <TopBar>
        <TopLabel>{t('My quality this month', 'इस महीने की क्वालिटी')}</TopLabel>
        <Row><H color={onGreen} size={26}>{top ? t('Top rated', 'टॉप रेटेड') : t('Good', 'अच्छा')}</H><Tag>{t('Keep it up', 'ऐसे ही रखें')}</Tag></Row>
      </TopBar>
      <Screen>
        {rows.map((r) => (
          <Card key={r.label}>
            <Row><T>{t(r.label, r.hi)}</T><T b color={r.ok ? undefined : c.red}>{r.value}</T></Row>
            <Meter pct={r.fill} mark={r.mark} style={{ flex: 0, marginTop: 5 }} />
            <T s m style={{ marginTop: 3 }}>{r.need}</T>
          </Card>
        ))}
        <Card row onPress={() => setComplaint(true)}><T>{t('Complaints', 'शिकायतें')}</T><Lft gap={6}><T b>1</T><Icon name="chevron" size={14} color={c.mut} /></Lft></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>{t('If a score drops', 'अगर स्कोर गिरे')}</H2>
          <T color={palette.ink}>We call you first, then give a short lesson. Jobs pause only after that.</T>
        </Card>
        <Link onPress={() => nav.push('badges')}>{t('See my badges', 'मेरे बैज देखें')}</Link>
      </Screen>
      <Sheet visible={complaint} onClose={() => setComplaint(false)}>
        <H2>1 complaint this month</H2>
        <Card><T b>Flat 9, Block A · 8 Nov</T><T s m>Balcony was missed.</T></Card>
        <T s m>What happens next: {q.escalation.join(' → ')}. One complaint does not pause your jobs.</T>
        <Button onPress={() => { setComplaint(false); nav.push('reviews'); }}>{t('Open the review', 'रिव्यू खोलें')}</Button>
      </Sheet>
    </Root>
  );
}

/* ---------- 43 · Badges ---------- */
type Badge = { title: string; hi: string; sub: string; icon: IconName; fill?: boolean; earned: boolean; how?: string; go?: string };
const badges: Badge[] = [
  { title: 'Top rated', hi: 'टॉप रेटेड', sub: `${decisions.quality.topRated.rating}+ for ${decisions.quality.topRated.days} days`, icon: 'star', fill: true, earned: true },
  { title: '100 visits', hi: '100 विज़िट', sub: 'Earned 2 Nov', icon: 'check', earned: true },
  { title: 'Always on time', hi: 'हमेशा समय पर', sub: '30 days, no late', icon: 'clock', earned: true },
  { title: 'Favourite of 12', hi: '12 की पसंद', sub: 'Customers chose you', icon: 'user', earned: true },
  { title: 'Deep clean expert', hi: 'डीप क्लीन एक्सपर्ट', sub: 'Finish the lesson', icon: 'drop', earned: false, how: 'Finish the kitchen and bathroom lesson and pass the home visit test.', go: 'training' },
  { title: '500 visits', hi: '500 विज़िट', sub: '142 of 500', icon: 'sparkle', earned: false, how: '358 more visits to go. About 4 months at your pace.' },
];
export function BadgesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [open, setOpen] = useState<Badge | null>(null);
  return (
    <Root>
      <Screen>
        <H>{t('My badges', 'मेरे बैज')}</H>
        <T s m>{t('Customers see these on your profile.', 'ग्राहक इन्हें आपकी प्रोफ़ाइल पर देखते हैं।')}</T>
        <Grid cols={2}>
          {badges.map((b) => (
            <Card key={b.title} sel={b.earned} onPress={() => setOpen(b)} style={[{ alignItems: 'center' }, !b.earned && { opacity: 0.6 }]}>
              <IconTile name={b.icon} bg={b.earned ? palette.yellow : undefined} color={b.earned ? palette.ink : undefined} />
              <H2 center style={{ marginTop: 6 }}>{t(b.title, b.hi)}</H2>
              <T s m center>{b.sub}</T>
            </Card>
          ))}
        </Grid>
      </Screen>
      <Sheet visible={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <Lft>
              <IconTile name={open.icon} bg={open.earned ? palette.yellow : undefined} color={open.earned ? palette.ink : undefined} />
              <View style={{ flex: 1 }}><H2>{t(open.title, open.hi)}</H2><T s m>{open.sub}</T></View>
              <Tag tone={open.earned ? 'n' : 'x'}>{open.earned ? 'Earned' : 'Locked'}</Tag>
            </Lft>
            {open.title === '500 visits' && <Meter pct={142 / 500} style={{ flex: 0 }} />}
            <T s m>{open.earned ? 'Shown on your profile and next to your name when customers book.' : open.how}</T>
            {open.go
              ? <Button onPress={() => { setOpen(null); nav.push(open.go!); }}>{t('Start the lesson', 'पाठ शुरू करें')}</Button>
              : <Button variant="outline" onPress={() => setOpen(null)}>{t('Close', 'बंद करें')}</Button>}
          </>
        )}
      </Sheet>
    </Root>
  );
}
