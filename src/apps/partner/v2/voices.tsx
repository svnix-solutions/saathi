/** Design page 29 · partner stories, kind words, share my story (screens 44–46). */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Col, H, H2, Hr, Icon, Input, Lft, Link, Row, Screen, Spacer, Stars, T, Tag, Toggle,
  TopBar, palette, useNav, useT, useTheme, type Face,
} from '@/native/ui';
import { PartnerTabs } from '../chrome';
import { Circle, Meter, Root, TopLabel, onGreen } from './kit';

/* ---------- 44 · Partner stories ---------- */
const partnerStories: { face: Face; name: string; sub: string; quote: string; audio?: boolean }[] = [
  { face: 'kr', name: 'Kavita R.', sub: 'Sector 18 · partner for 1 year', quote: '“I work mornings only and still earn more than before. My evenings are for my children.”', audio: true },
  { face: 'rm', name: 'Rekha M.', sub: 'Sector 21 · senior partner', quote: '“Money comes every Monday. I have never had to ask.”' },
  { face: 'ab', name: 'Anita B.', sub: 'Sector 21 · trainer', quote: '“I started with cleaning. Now I teach new partners.”' },
];
export function StoriesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setSec((s) => { if (s >= 59) { setPlaying(false); return 0; } return s + 1; }), 250);
    return () => clearInterval(id);
  }, [playing]);
  return (
    <Root>
      <Screen>
        <Row><H>{t('Partner stories', 'पार्टनर की कहानियाँ')}</H><Link onPress={() => nav.push('kindWords')}>{t('Kind words', 'अच्छे शब्द')}</Link></Row>
        {partnerStories.map((s, i) => (
          <Card key={s.name} sel={i === 0}>
            <Lft>
              <Avatar face={s.face} size={40} />
              <View><H2>{s.name}</H2><T s m>{s.sub}</T></View>
            </Lft>
            {s.audio
              ? <T size={14} style={{ fontWeight: '600', marginTop: 10, lineHeight: 19 }}>{s.quote}</T>
              : <T style={{ marginTop: 8 }}>{s.quote}</T>}
            {s.audio && (
              <Col gap={6} style={{ marginTop: 8 }}>
                <Link onPress={() => setPlaying((p) => !p)}>
                  {playing ? `Pause · 0:${String(sec).padStart(2, '0')} of 1:00` : sec > 0 ? `Resume in हिन्दी · 0:${String(sec).padStart(2, '0')}` : 'Listen in हिन्दी · 1 min'}
                </Link>
                {(playing || sec > 0) && <Meter pct={sec / 60} style={{ flex: 0 }} />}
              </Col>
            )}
          </Card>
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => nav.push('shareStory')}>{t('Share my story', 'अपनी कहानी बताएँ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
    </Root>
  );
}

/* ---------- 45 · Kind words for me ---------- */
const kind: { face: Face; who: string; quote: string; where: string }[] = [
  { face: 'fa', who: 'Farah, Sector 18', quote: '“By 8:15 Sunita was mopping. My mornings are calm now.”', where: 'On the website' },
  { face: 'nk', who: 'Nitin, Block C', quote: '“Kitchen slab was spotless. Sunita is always on time.”', where: 'In the app' },
];
export function KindWordsScreen() {
  const nav = useNav();
  const t = useT();
  const [show, setShow] = useState(true);
  const [thanked, setThanked] = useState<string[]>([]);
  return (
    <Root>
      <TopBar>
        <TopLabel>{t('Kind words for you', 'आपके लिए अच्छे शब्द')}</TopLabel>
        <H color={onGreen}>{t('12 customers thanked you', '12 ग्राहकों ने धन्यवाद कहा')}</H>
      </TopBar>
      <Screen>
        {kind.map((k) => (
          <Card key={k.who}>
            <Row><Lft><Avatar face={k.face} size={30} /><T b>{k.who}</T></Lft><Stars value={5} /></Row>
            <T style={{ marginTop: 8 }}>{k.quote}</T>
            <Row style={{ marginTop: 8 }}>
              <Tag tone="n">{k.where}</Tag>
              {thanked.includes(k.who)
                ? <T s m>Thanked</T>
                : <Link onPress={() => { setThanked((s) => [...s, k.who]); nav.toast(`Thank-you sent to ${k.who.split(',')[0]}`); }}>{t('Say thank you', 'धन्यवाद कहें')}</Link>}
            </Row>
          </Card>
        ))}
        <Card row>
          <View style={{ flex: 1 }}><H2>{t('Show these on my profile', 'इन्हें मेरी प्रोफ़ाइल पर दिखाएँ')}</H2><T s m>Customers see them before booking</T></View>
          <Toggle on={show} onChange={(v) => { setShow(v); nav.toast(v ? 'Shown on your profile' : 'Hidden from your profile'); }} />
        </Card>
      </Screen>
    </Root>
  );
}

/* ---------- 46 · Share my story ---------- */
export function ShareStoryScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [text, setText] = useState('');
  const [rec, setRec] = useState(false);
  const [secs, setSecs] = useState(0);
  const [useName, setUseName] = useState(true);
  const [showJoin, setShowJoin] = useState(true);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (!rec) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [rec]);
  const ready = text.trim().length > 0 || secs > 0;

  if (sent) {
    return (
      <Root>
        <Screen>
          <BackHeader title={t('Share my story', 'अपनी कहानी बताएँ')} onBack={nav.back} />
          <Spacer />
          <Circle size={96} bg={c.mint}><Icon name="check" size={36} color={c.accent} strokeWidth={3} /></Circle>
          <H center>{t('Sent for approval', 'मंज़ूरी के लिए भेजा')}</H>
          <T s m center>Our team will show you the final words before any partner sees them. Usually within 2 days.</T>
          <Spacer />
          <Button big onPress={nav.back}>{t('Back to stories', 'कहानियों पर वापस')}</Button>
        </Screen>
      </Root>
    );
  }
  return (
    <Root>
      <Screen>
        <BackHeader title={t('Share my story', 'अपनी कहानी बताएँ')} onBack={nav.back} />
        <H>{t('Tell new partners what this work is like', 'नए पार्टनर को बताएँ यह काम कैसा है')}</H>
        <Pressable onPress={() => setRec((r) => !r)} accessibilityRole="button" accessibilityLabel={rec ? 'Stop recording' : 'Record'}>
          <Circle size={96} bg={rec ? palette.yellow : c.mint}>
            <View style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: rec ? palette.red : palette.green, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="mic" size={28} color="#fff" />
            </View>
          </Circle>
        </Pressable>
        <T s m center>
          {rec ? `Recording · 0:${String(secs).padStart(2, '0')} · tap to stop`
            : secs > 0 ? `Voice note saved · 0:${String(secs).padStart(2, '0')}`
              : t('Hold and speak, in any language. Or type below.', 'किसी भी भाषा में बोलें। या नीचे लिखें।')}
        </T>
        <Input small multiline value={text} onChangeText={setText} placeholder={t('Type your story', 'अपनी कहानी लिखें')} style={{ minHeight: 60 }} />
        <Card style={{ gap: 10 }}>
          <Row><T style={{ flex: 1 }}>{t('Use my name and photo', 'मेरा नाम और फ़ोटो दिखाएँ')}</T><Toggle on={useName} onChange={setUseName} /></Row>
          <Hr />
          <Row><T style={{ flex: 1 }}>{t('Show to people thinking of joining', 'जुड़ने वालों को दिखाएँ')}</T><Toggle on={showJoin} onChange={setShowJoin} /></Row>
        </Card>
        <T s m>Our team approves each story before other partners can see it, and shows you the final words first.</T>
        <Spacer />
        <Button big disabled={!ready} onPress={() => { setRec(false); setSent(true); nav.toast(t('Sent for approval', 'मंज़ूरी के लिए भेजा')); }}>
          {t('Send my story', 'मेरी कहानी भेजें')}
        </Button>
      </Screen>
    </Root>
  );
}
