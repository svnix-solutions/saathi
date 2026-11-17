/** Design page 14 (CUSTOMER J): language, gifting, support and society — screens 48–51. */
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View, type TextStyle } from 'react-native';
import {
  Avatar, Bubble, Button, Card, CharacterTile, Check, Grid, H, H2, Hr, Icon, Input, Lft, Link, Pill, Row,
  Screen, Spacer, T, Tag, ThemeProvider, Toggle, TopBar, palette, useAppState, useNav, useT, useTheme,
} from '@/native/ui';
import { font } from '@/tokens';
import { decisions, priceFor, rupees } from '@/data/decisions';
import { CustomerTabs, type CustomerState } from '../chrome';
import { Back, Radio, useBack } from './kit';

type Lang = CustomerState['language'];
const sizes = [{ k: 'Small', hi: 'छोटा', pa: 'ਛੋਟਾ', scale: 0.9 }, { k: 'Medium', hi: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ', scale: 1 }, { k: 'Large', hi: 'बड़ा', pa: 'ਵੱਡਾ', scale: 1.22 }];

/* ---------- 48 · Language and display ---------- */
export function LanguageScreen() {
  const [st, set] = useAppState<CustomerState & { textScale?: number; darkMode?: boolean; readAloud?: boolean; helperLang?: boolean }>();
  const theme = useTheme();
  const lang: Lang = st.language ?? 'en';
  const scale = st.textScale ?? theme.textScale;
  const dark = st.darkMode ?? theme.dark;
  return (
    <ThemeProvider locale={lang} textScale={scale} dark={dark}>
      <LanguageBody st={st} set={set} lang={lang} scale={scale} dark={dark} />
    </ThemeProvider>
  );
}

function LanguageBody({ st, set, lang, scale, dark }: { st: any; set: (p: any) => void; lang: Lang; scale: number; dark: boolean }) {
  const t = useT();
  const nav = useNav();
  const { fs } = useTheme();
  const langs: { k: Lang; label: string }[] = [{ k: 'en', label: 'English' }, { k: 'hi', label: 'हिन्दी' }, { k: 'pa', label: 'ਪੰਜਾਬੀ' }];
  const choose = (k: Lang) => { set({ language: k }); nav.toast(k === 'hi' ? 'भाषा: हिन्दी' : k === 'pa' ? 'ਭਾਸ਼ਾ: ਪੰਜਾਬੀ' : 'Language: English'); };
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Back title={t('Language and display', 'भाषा और डिस्प्ले', 'ਭਾਸ਼ਾ ਅਤੇ ਡਿਸਪਲੇ')} fallback="account" />
        <H2>{t('App language', 'ऐप की भाषा', 'ਐਪ ਦੀ ਭਾਸ਼ਾ')}</H2>
        <Card style={{ gap: 10 }}>
          {langs.map((l, i) => (
            <React.Fragment key={l.k}>
              {i > 0 && <Hr />}
              <Pressable onPress={() => choose(l.k)} accessibilityRole="radio" accessibilityState={{ selected: lang === l.k }}>
                <Row><T>{l.label}</T><Radio on={lang === l.k} /></Row>
              </Pressable>
            </React.Fragment>
          ))}
        </Card>
        <H2>{t('Text size', 'अक्षरों का आकार', 'ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ')}</H2>
        <Grid cols={3}>
          {sizes.map((z) => (
            <Pill key={z.k} s={z.k === 'Small'} sel={Math.abs(scale - z.scale) < 0.01} onPress={() => set({ textScale: z.scale })}>
              {z.k === 'Large' ? <Text style={{ fontSize: fs(15), fontWeight: '600' }}>{t(z.k, z.hi, z.pa)}</Text> : t(z.k, z.hi, z.pa)}
            </Pill>
          ))}
        </Grid>
        <Card style={{ gap: 10 }}>
          <Row><T>{t('Dark mode', 'डार्क मोड', 'ਡਾਰਕ ਮੋਡ')}</T><Toggle on={dark} onChange={(v) => set({ darkMode: v })} /></Row>
          <Hr />
          <Row><T>{t('Read screens aloud', 'स्क्रीन पढ़कर सुनाएँ', 'ਸਕ੍ਰੀਨ ਪੜ੍ਹ ਕੇ ਸੁਣਾਓ')}</T><Toggle on={!!st.readAloud} onChange={(v) => { set({ readAloud: v }); if (v) nav.toast(t('Screens will be read aloud', 'स्क्रीन पढ़कर सुनाई जाएँगी')); }} /></Row>
          <Hr />
          <Row><T style={{ flex: 1 }}>{t('Helper should speak my language', 'हेल्पर मेरी भाषा बोले', 'ਹੈਲਪਰ ਮੇਰੀ ਭਾਸ਼ਾ ਬੋਲੇ')}</T><Toggle on={st.helperLang ?? true} onChange={(v) => set({ helperLang: v })} /></Row>
        </Card>
        <T s m>{t('Messages from your helper are translated into your language.', 'हेल्पर के संदेश आपकी भाषा में अनुवाद होते हैं।', 'ਹੈਲਪਰ ਦੇ ਸੁਨੇਹੇ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਅਨੁਵਾਦ ਹੁੰਦੇ ਹਨ।')}</T>
      </Screen>
      <CustomerTabs active="account" />
    </View>
  );
}

/* ---------- 49 · Gift a visit ---------- */
const gifts = [
  { k: '1 visit', hi: '1 विज़िट', price: priceFor('general', 60) },
  { k: '4 visits', hi: '4 विज़िट', price: 600 },
  { k: 'Deep clean', hi: 'डीप क्लीन', price: 774 },
];

export function GiftScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('account');
  const [gift, setGift] = useState(1);
  const [name, setName] = useState('Asha aunty');
  const [phone, setPhone] = useState('98220 14567');
  const [msg, setMsg] = useState('With love. Put your feet up this Sunday.');
  const price = gifts[gift].price;
  const send = () => {
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) { nav.toast(t('Add their name and a 10-digit number', 'नाम और 10 अंकों का नंबर डालें')); return; }
    nav.toast(t(`Gift sent to ${name} on WhatsApp`, `${name} को WhatsApp पर उपहार भेजा गया`));
    setTimeout(back, 1200);
  };
  return (
    <Screen>
      <Back title={t('Gift a visit', 'विज़िट उपहार दें')} fallback="account" />
      <Card tone="yellow">
        <Lft gap={10}>
          <CharacterTile name="hero" size={64} />
          <View style={{ flex: 1 }}>
            <H size={17} color={palette.ink}>{t('A clean home, from you', 'आपकी ओर से साफ़ घर')}</H>
            <T s color={palette.ink}>For parents, a new mother, a friend moving in</T>
          </View>
        </Lft>
      </Card>
      <H2>{t('Choose a gift', 'उपहार चुनें')}</H2>
      <Grid cols={3}>
        {gifts.map((g, i) => (
          <Pill key={g.k} sel={gift === i} onPress={() => setGift(i)}>
            {t(g.k, g.hi) + '\n'}<T s m>{rupees(g.price)}</T>
          </Pill>
        ))}
      </Grid>
      <H2>{t('Who is it for?', 'यह किसके लिए है?')}</H2>
      <Input small value={name} onChangeText={setName} placeholder="Their name" />
      <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Mobile number" maxLength={11} />
      <Input small multiline value={msg} onChangeText={setMsg} placeholder="Add a message" style={{ minHeight: 54 }} />
      <T s m>They get a WhatsApp message and book the time themselves. Valid 3 months.</T>
      <Spacer />
      <Button onPress={send}>{t('Send gift', 'उपहार भेजें')} · {rupees(price)}</Button>
    </Screen>
  );
}

/* ---------- 50 · Support chat ---------- */
type Msg = { me?: boolean; text: React.ReactNode; choices?: string[] };
const firstChat: Msg[] = [
  { me: true, text: 'My helper left 20 minutes early' },
  { text: 'Sorry about that. I can see visit #2031 was booked for 1 hr and ended after 40 min.' },
  { text: <>I have added <Text style={{ fontWeight: '700' }}>₹53</Text> to your wallet for the 20 minutes. Would you also like a helper sent back to finish?</>, choices: ['Yes, send someone', 'No, refund is fine'] },
  { me: true, text: 'Yes, send someone' },
  { text: 'Done. Rekha arrives in about 15 minutes, free of charge.' },
];

function cannedReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes('no, refund')) return 'Okay. The ₹53 stays in your wallet. Anything else I can help with?';
  if (s.includes('yes, send')) return 'Done. Rekha arrives in about 15 minutes, free of charge.';
  if (/refund|money|charge|paid|pay/.test(s)) return 'Refunds go to your Saathi wallet at once, or to your bank in 3 to 5 days. Shall I send it to the bank?';
  if (/late|where|arriv|time/.test(s)) return 'Rekha is 6 minutes away. You can follow her live from Bookings.';
  if (/cancel/.test(s)) return `You can cancel free up to ${decisions.customer.freeCancelUntilHrs} hr before the visit. Want me to cancel it?`;
  if (/thank|ok|great/.test(s)) return 'Happy to help. Have a calm day!';
  return 'Thanks, I have noted that. A person from our team will reply here within 5 minutes if I cannot fix it.';
}

export function SupportChatScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('help');
  const { c, fs } = useTheme();
  const [msgs, setMsgs] = useState<Msg[]>(firstChat);
  const [picked, setPicked] = useState<Record<number, string>>({ 2: 'Yes, send someone' });
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const scroll = useRef<any>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (q: string, extra?: Msg[]) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, ...(extra ?? []), { me: true, text: q.trim() }]);
    setText('');
    setTyping(true);
    timer.current = setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { text: cannedReply(q) }]); }, 1100);
  };
  const choose = (i: number, choice: string) => {
    if (picked[i]) { nav.toast('Already answered'); return; }
    setPicked((p) => ({ ...p, [i]: choice }));
    send(choice);
  };
  const person = () => {
    setTyping(true);
    timer.current = setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { text: 'Hi Nitin, I am Meena from the Saathi team. I have read the chat. How can I help?' }]); }, 1300);
    nav.toast(t('Connecting you to a person…', 'किसी व्यक्ति से जोड़ रहे हैं…'));
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.surface }}>
      <TopBar style={{ paddingBottom: 12 }}>
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Back"><Lft>
          <Icon name="back" color={c.onGreen} />
          <View>
            <H2 color={c.onGreen}>{t('Saathi help', 'साथी सहायता')}</H2>
            <T s color={c.onGreen} style={{ opacity: 0.8 }}>Answers in seconds, a person if needed</T>
          </View>
        </Lft></Pressable>
      </TopBar>
      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 8 }}
        onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })} showsVerticalScrollIndicator={false}>
        {msgs.map((m, i) => (
          <React.Fragment key={i}>
            <Bubble me={m.me}>{m.text}</Bubble>
            {m.choices && (
              <Lft gap={6} style={{ flexWrap: 'wrap' }}>
                {m.choices.map((ch) => <Pill key={ch} s sel={picked[i] === ch} onPress={() => choose(i, ch)} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>{ch}</Pill>)}
              </Lft>
            )}
          </React.Fragment>
        ))}
        {typing && <Bubble>…</Bubble>}
        <Lft style={{ justifyContent: 'center' }} gap={4}>
          <T s m>Not solved?</T><Link onPress={person}>{t('Talk to a person', 'किसी व्यक्ति से बात करें')}</Link>
        </Lft>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ borderWidth: 1.5, borderColor: c.line, borderRadius: 12, paddingVertical: 9, paddingHorizontal: 12, backgroundColor: c.card, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TextInput value={text} onChangeText={setText} placeholder={t('Type a message', 'संदेश लिखें')} placeholderTextColor={c.mut}
            onSubmitEditing={() => send(text)} returnKeyType="send"
            style={{ flex: 1, minWidth: 0, fontFamily: font.family, fontSize: fs(13), color: c.ink, padding: 0, outlineStyle: 'none' } as unknown as TextStyle} />
          <Pressable onPress={() => (text.trim() ? send(text) : nav.toast(t('Hold to record a voice message', 'आवाज़ संदेश के लिए दबाकर रखें')))} accessibilityLabel={text.trim() ? 'Send' : 'Voice message'} hitSlop={6}>
            <Icon name={text.trim() ? 'chevron' : 'mic'} color={c.accent} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* ---------- 51 · My society ---------- */
const neighbourHelpers = [
  { face: 'sd' as const, name: 'Sunita D.', flats: 12 },
  { face: 'rm' as const, name: 'Rekha M.', flats: 7 },
];

export function SocietyScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useAppState<CustomerState>();
  const { c } = useTheme();
  const [joined, setJoined] = useState(false);
  const [slot, setSlot] = useState(false);
  const [guard, setGuard] = useState(true);
  return (
    <Screen>
      <Row>
        <Lft>
          {nav.canGoBack && <Pressable onPress={nav.back} accessibilityLabel="Back"><Icon name="back" color={c.ink} /></Pressable>}
          <H>Green Park Society</H>
        </Lft>
        <Tag tone="n">Block C</Tag>
      </Row>
      <Card sel onPress={() => { setJoined(!joined); nav.toast(joined ? 'Left the society offer' : '10% off added to every booking'); }}>
        <Row>
          <T s b color={c.accent}>{t('Society offer', 'सोसाइटी ऑफ़र')}</T>
          {joined ? <Tag tone="g">{t('Joined', 'जुड़ गए')}</Tag> : <T s b color={c.accent}>{t('Join', 'जुड़ें')}</T>}
        </Row>
        <H2 style={{ fontSize: 15, marginTop: 2 }}>10% off for all 240 flats</H2>
        <T s m>Agreed with your residents' association until March</T>
      </Card>
      <Card>
        <H2>Share a helper's morning</H2>
        <T s m>3 neighbours have Sunita 8 to 11 am. Take 11 am and save ₹20.</T>
        <Button variant={slot ? 'primary' : 'outline'} style={{ marginTop: 10, paddingVertical: 9 }}
          onPress={() => { setSlot(!slot); nav.toast(slot ? 'Slot released' : 'Sunita booked for 11 am · ₹20 saved'); }}>
          {slot ? t('11 am slot is yours', '11 बजे का स्लॉट आपका') : t('Take the 11 am slot', '11 बजे का स्लॉट लें')}
        </Button>
      </Card>
      <H2>Helpers your neighbours trust</H2>
      <Card style={{ gap: 9 }}>
        {neighbourHelpers.map((h, i) => (
          <React.Fragment key={h.name}>
            {i > 0 && <Hr />}
            <Row>
              <Lft>
                <Avatar face={h.face} size={26} />
                <View><T b>{h.name}</T><T s m>Favourite of {h.flats} flats here</T></View>
              </Lft>
              <Link onPress={() => { set({ service: 'general', helper: h.name }); nav.push('chores', { service: 'general', helper: h.name }); }}>{t('Book', 'बुक')}</Link>
            </Row>
          </React.Fragment>
        ))}
      </Card>
      <Card row onPress={() => { setGuard(!guard); nav.toast(guard ? 'Guard list turned off' : 'Your helpers are on the Gate 2 list'); }}>
        <View style={{ flex: 1 }}><H2>Guard has the helper list</H2><T s m>Faster entry at Gate 2</T></View>
        <Check on={guard} />
      </Card>
    </Screen>
  );
}
