/** Design pages 20–21 (sections 48, 49): sign in, sign up, references, Aadhaar, PAN, waiting. Work and certificates: ./work.tsx */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackHeader, Card, CheckRow, Grid, H, H2, Hr, Input, Lft, Mark, OtpInput, Pill, Row, Screen, Sheet, Spacer, T, Tag,
  useAppState, useNav, useT, useTheme, type Locale,
} from '@/native/ui';
import { profession } from '@/data/professions';
import { needsCertificates } from './work';
import { Big, Cb, GreenText, Page, Plain, PhotoTile, SignupSteps, TopBar, TopH, TopH2, TopT, mmss, useCountdown, type V1State } from './kit';

const digits = (s: string) => s.replace(/\D/g, '');
const fmtPhone = (s: string) => { const d = digits(s).slice(0, 10); return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d; };

/* 1 · Mobile number */
export function SigninPhone() {
  const t = useT();
  const nav = useNav();
  const { locale } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [phone, setPhone] = useState(st.phone === '98100 22334' ? '98111 20034' : st.phone);
  const ok = digits(phone).length === 10;
  const langs: { k: Locale; l: string }[] = [{ k: 'hi', l: 'हिन्दी' }, { k: 'en', l: 'English' }, { k: 'pa', l: 'ਪੰਜਾਬੀ' }];
  return (
    <Page>
      <TopBar>
        <Lft><Mark size={30} /><View><TopH2>Saathi Partner</TopH2><TopT dim>{t('Work near home. Paid every week.', 'घर के पास काम। हर हफ़्ते पैसे।')}</TopT></View></Lft>
      </TopBar>
      <Screen>
        <H size={21}>{t('Enter your mobile number', 'अपना मोबाइल नंबर डालें')}</H>
        <T m>{t('We will send a 4-digit code. Use the number you want jobs on.', 'हम 4 अंकों का कोड भेजेंगे। वही नंबर डालें जिस पर काम चाहिए।')}</T>
        <Input prefix="+91" value={phone} onChangeText={(v) => setPhone(fmtPhone(v))} keyboardType="phone-pad" placeholder="98111 20034" />
        <Grid cols={3}>
          {langs.map((l) => <Pill key={l.k} sel={(st.locale ?? locale) === l.k} onPress={() => set({ locale: l.k })}>{l.l}</Pill>)}
        </Grid>
        <Spacer />
        <Big disabled={!ok} onPress={() => { set({ phone }); nav.push('signin.otp'); }}>{t('Send code', 'कोड भेजें')}</Big>
      </Screen>
    </Page>
  );
}

/* 2 · SMS code (4821 is correct) */
export function SigninOtp() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  const { c } = useTheme();
  const [left, setLeft] = useCountdown(22);
  const verify = () => {
    if (code !== '4821') { setErr(true); return; }
    if (st.approved) { nav.reset('home'); nav.toast(t(`Welcome back, ${st.name}`, `वापसी पर स्वागत, ${st.name}`)); }
    else nav.push('signin.details');
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Change number', 'नंबर बदलें')} onBack={nav.back} />
        <H size={21}>{t('Enter the code', 'कोड डालें')}</H>
        <T m>{t('Sent by SMS to', 'SMS भेजा गया')} +91 {st.phone || '98111 20034'}</T>
        <OtpInput value={code} error={err} onChange={(v) => { setCode(v); setErr(false); }} />
        {err ? <T s color={c.red} b>{t('Wrong code. Check the SMS and try again.', 'कोड गलत है। SMS देखकर फिर से डालें।')}</T>
          : left > 0 ? <T s m>{t('Resend code in', 'कोड फिर से भेजें')} {mmss(left)}</T>
            : <GreenText onPress={() => { setLeft(22); nav.toast(t('New code sent', 'नया कोड भेजा')); }}>{t('Resend code', 'कोड फिर से भेजें')}</GreenText>}
        <Card sel={st.approved}><H2>{t('Already a partner?', 'पहले से पार्टनर हैं?')}</H2><T s m>{t('You go straight to Home and your jobs.', 'आप सीधे होम और अपने काम पर जाएँगे।')}</T></Card>
        <Card sel={!st.approved}><H2>{t('New here?', 'नए हैं?')}</H2><T s m>{t('Next we ask for your details, the work you do, two references, Aadhaar and PAN, and any certificate your work needs. About 7 minutes.', 'आगे आपकी जानकारी, आपका काम, दो जान-पहचान वाले, आधार और पैन, और आपके काम का कोई सर्टिफ़िकेट माँगेंगे। लगभग 7 मिनट।')}</T></Card>
        <T s m>{t('Prototype: the code is 4821', 'प्रोटोटाइप: कोड 4821 है')}</T>
        <Spacer />
        <Big disabled={code.length < 4} onPress={verify}>{t('Verify', 'जाँचें')}</Big>
      </Screen>
    </Page>
  );
}

/* 3 · Name and email */
export function SigninDetails() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const [name, setName] = useState(st.name === 'Sunita' ? 'Sunita Devi' : st.name);
  const [email, setEmail] = useState(st.email ?? 'sunita.devi@example.com');
  const [area, setArea] = useState(st.area ?? 'Block C');
  const go = () => {
    if (name.trim().length < 3) return nav.toast(t('Please write your full name', 'कृपया पूरा नाम लिखें'));
    if (!/^\S+@\S+\.\S+$/.test(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें'));
    set({ name: name.trim().split(' ')[0], fullName: name.trim(), email, area });
    nav.push('signin.work');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={1} />
        <H size={21}>{t('Your details', 'आपकी जानकारी')}</H>
        <H2>{t('Full name, as on your Aadhaar', 'पूरा नाम, जैसा आधार पर है')}</H2>
        <Input value={name} onChangeText={setName} placeholder="Sunita Devi" />
        <H2>{t('Email', 'ईमेल')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="name@example.com" />
        <T s m>{t('For payslips and account messages. We send a link to confirm it.', 'पे-स्लिप और खाते के संदेशों के लिए। पुष्टि के लिए हम लिंक भेजेंगे।')}</T>
        <H2>{t('Area you live in', 'आप किस इलाके में रहते हैं')}</H2>
        <Input value={area} onChangeText={setArea} placeholder="Block C" />
        <Spacer />
        <Big onPress={go}>{t('Continue', 'आगे बढ़ें')}</Big>
      </Screen>
    </Page>
  );
}

const rels = [{ en: 'Neighbour', hi: 'पड़ोसी' }, { en: 'Past employer', hi: 'पुराने मालिक' }, { en: 'Relative', hi: 'रिश्तेदार' }];

/* 4 · Two references */
export function SigninReferences() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [name, setName] = useState(st.ref2?.name ?? 'Ramesh Kumar');
  const [phone, setPhone] = useState(st.ref2?.phone ?? '98765 43210');
  const [rel, setRel] = useState(st.ref2?.rel ?? 'Past employer');
  const first = name.trim().split(' ')[0] || t('reference', 'उन्हें');
  const send = () => {
    if (name.trim().length < 2) return nav.toast(t('Write the name of reference 2', 'दूसरे व्यक्ति का नाम लिखें'));
    if (digits(phone).length !== 10) return nav.toast(t('Phone number needs 10 digits', 'फ़ोन नंबर 10 अंकों का हो'));
    if (digits(phone) === digits(st.phone) || digits(phone) === '9822014567') return nav.toast(t('Each number must be different from yours', 'हर नंबर आपके नंबर से अलग हो'));
    set({ ref2: { name: name.trim(), phone, rel } });
    nav.push('signin.refCode');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={3} />
        <H size={21}>{t('Two people who know you', 'दो लोग जो आपको जानते हैं')}</H>
        <T s m>{t('We send each of them a code on their own phone. Ask them for it to confirm.', 'हम दोनों के फ़ोन पर एक कोड भेजते हैं। पुष्टि के लिए उनसे कोड पूछें।')}</T>
        <Card sel>
          <Row style={{ alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}><H2>{t('Reference 1', 'पहचान 1')} · Kamla Devi</H2><T s m>+91 98220 14567 · {t('neighbour', 'पड़ोसी')}</T></View>
            <Cb on size={22} />
          </Row>
          <T s b color={c.accent} style={{ marginTop: 6 }}>{t('Confirmed by code', 'कोड से पुष्टि हुई')}</T>
        </Card>
        <Card>
          <H2>{t('Reference 2', 'पहचान 2')}</H2>
          <Input small value={name} onChangeText={setName} placeholder={t('Full name', 'पूरा नाम')} style={{ paddingVertical: 9, marginTop: 6 }} />
          <Input small prefix="+91" value={phone} onChangeText={(v) => setPhone(fmtPhone(v))} keyboardType="phone-pad" placeholder="98765 43210" style={{ paddingVertical: 9, marginTop: 6 }} />
          <Lft gap={6} style={{ marginTop: 8, flexWrap: 'wrap' }}>
            {rels.map((r) => <Pill key={r.en} s sel={rel === r.en} onPress={() => setRel(r.en)} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>{t(r.en, r.hi)}</Pill>)}
          </Lft>
        </Card>
        <Spacer />
        <Big onPress={send}>{t(`Send code to ${first}`, `${first} को कोड भेजें`)}</Big>
      </Screen>
    </Page>
  );
}

/* 5 · Reference code */
export function SigninRefCode() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const ref = st.ref2 ?? { name: 'Ramesh Kumar', phone: '98765 43210', rel: 'Past employer' };
  const first = ref.name.split(' ')[0];
  const [code, setCode] = useState('71');
  const [ok, setOk] = useState(false);
  const [left, setLeft] = useCountdown(18);
  const confirm = () => {
    setOk(true);
    set({ refsConfirmed: true });
    nav.toast(t(`${first} confirmed`, `${first} की पुष्टि हुई`));
    setTimeout(() => nav.push('signin.aadhaar'), 700);
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={3} label={false} />
        <BackHeader title={`${t('Reference 2', 'पहचान 2')} · ${ref.name}`} onBack={nav.back} />
        <H size={21}>{t(`Ask ${first} for the code`, `${first} से कोड पूछें`)}</H>
        <T m>{t(`We sent it by SMS to +91 ${ref.phone}, with your name in the message.`, `हमने +91 ${ref.phone} पर SMS भेजा है, उसमें आपका नाम है।`)}</T>
        <OtpInput value={code} onChange={setCode} />
        <Row>
          {left > 0 ? <T s m>{t('Send again in', 'फिर से भेजें')} {mmss(left)}</T>
            : <GreenText onPress={() => { setLeft(18); nav.toast(t(`Code sent again to ${first}`, `${first} को कोड फिर भेजा`)); }}>{t('Send again', 'फिर से भेजें')}</GreenText>}
          <GreenText onPress={nav.back}>{t('Change this number', 'यह नंबर बदलें')}</GreenText>
        </Row>
        <Card style={{ gap: 8 }}>
          <Row><T style={{ flex: 1 }}>{t('Reference 1', 'पहचान 1')} · Kamla Devi</T><Tag tone="n">{t('Confirmed', 'पुष्टि हुई')}</Tag></Row>
          <Hr />
          <Row><T style={{ flex: 1 }}>{t('Reference 2', 'पहचान 2')} · {ref.name}</T>{ok ? <Tag tone="n">{t('Confirmed', 'पुष्टि हुई')}</Tag> : <Tag>{t('Waiting for code', 'कोड का इंतज़ार')}</Tag>}</Row>
        </Card>
        <Spacer />
        <Big disabled={code.length < 4 || ok} onPress={confirm}>{t('Confirm reference', 'पुष्टि करें')}</Big>
      </Screen>
    </Page>
  );
}

/* 6 · Aadhaar upload */
export function SigninAadhaar() {
  const t = useT();
  const nav = useNav();
  const [, set] = useAppState<V1State>();
  const { c } = useTheme();
  const [front, setFront] = useState(true);
  const [back, setBack] = useState(false);
  const [num, setNum] = useState('');
  const [clear, setClear] = useState(true);
  const [corners, setCorners] = useState(true);
  const masked = 'XXXX XXXX 4821';
  const numOk = num === '' || digits(num).length === 12;
  const ready = front && back && clear && corners && numOk;
  return (
    <Page>
      <Screen>
        <SignupSteps step={4} />
        <H size={21}>{t('Aadhaar card', 'आधार कार्ड')}</H>
        <Grid cols={2}>
          <PhotoTile added={front} icon={front ? 'check' : 'cam'} label={front ? t('Front added', 'आगे का हिस्सा जुड़ा') : t('Add front side', 'आगे का हिस्सा जोड़ें')}
            onPress={() => { setFront(!front); }} />
          <PhotoTile added={back} icon={back ? 'check' : 'cam'} label={back ? t('Back added', 'पीछे का हिस्सा जुड़ा') : t('Add back side', 'पीछे का हिस्सा जोड़ें')}
            onPress={() => { setBack(!back); if (!back) nav.toast(t('Photo added', 'फ़ोटो जुड़ गई')); }} />
        </Grid>
        <H2>{t('Aadhaar number', 'आधार नंबर')}</H2>
        <Input value={num} onChangeText={(v) => setNum(digits(v).slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 '))} keyboardType="number-pad"
          placeholder={masked} style={numOk ? undefined : { borderColor: c.red }} />
        <Card style={{ gap: 7 }}>
          <CheckRow s on={clear} onPress={() => setClear(!clear)} label={t('Photo is clear, not blurred', 'फ़ोटो साफ़ है, धुंधली नहीं')} />
          <CheckRow s on={corners} onPress={() => setCorners(!corners)} label={t('All four corners are visible', 'चारों कोने दिख रहे हैं')} />
        </Card>
        <T s m>{t('Only the last 4 digits are shown and kept. The photo is seen only by the team that checks it.', 'सिर्फ़ आख़िरी 4 अंक दिखते और रखे जाते हैं। फ़ोटो सिर्फ़ जाँच करने वाली टीम देखती है।')}</T>
        <Spacer />
        <Big disabled={!ready} onPress={() => { set({ aadhaarLast4: digits(num).slice(-4) || '4821' }); nav.push('signin.pan'); }}>{t('Continue', 'आगे बढ़ें')}</Big>
      </Screen>
    </Page>
  );
}

/* 7 · PAN upload */
export function SigninPan() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [photo, setPhoto] = useState(true);
  const [pan, setPan] = useState('ABCDE1234F');
  const [noPan, setNoPan] = useState(false);
  const valid = /^[A-Z]{5}\d{4}[A-Z]$/.test(pan);
  const fullName = (st.fullName as string | undefined) ?? 'Sunita Devi';
  const next = needsCertificates(st) ? 'signin.documents' : 'signin.waiting';
  return (
    <Page>
      <Screen>
        <SignupSteps step={5} />
        <H size={21}>{t('PAN card', 'पैन कार्ड')}</H>
        <PhotoTile added={photo} icon={photo ? 'check' : 'cam'} label={photo ? t('PAN photo added', 'पैन की फ़ोटो जुड़ी') : t('Add PAN photo', 'पैन की फ़ोटो जोड़ें')} onPress={() => setPhoto(!photo)} />
        <H2>{t('PAN number', 'पैन नंबर')}</H2>
        <Input value={pan} onChangeText={(v) => setPan(v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))} placeholder="ABCDE1234F"
          style={valid || pan.length < 10 ? undefined : { borderColor: c.red }} />
        <Card sel row>
          <View style={{ flex: 1 }}><H2>{t('Name matches your Aadhaar', 'नाम आधार से मेल खाता है')}</H2><T s m>{fullName}</T></View>
          <Cb on size={22} />
        </Card>
        <T s m>{t('PAN is needed so your earnings and tax are recorded correctly.', 'पैन ज़रूरी है ताकि आपकी कमाई और टैक्स सही दर्ज हों।')}</T>
        <GreenText onPress={() => setNoPan(true)}>{t('I do not have a PAN card', 'मेरे पास पैन कार्ड नहीं है')}</GreenText>
        <Spacer />
        <Big disabled={!photo || !valid} onPress={() => { set({ pan }); nav.push(next); }}>{next === 'signin.waiting' ? t('Submit for checking', 'जाँच के लिए भेजें') : t('Continue', 'आगे बढ़ें')}</Big>
      </Screen>
      <Sheet visible={noPan} onClose={() => setNoPan(false)}>
        <H2>{t('No PAN card?', 'पैन कार्ड नहीं है?')}</H2>
        <T s m>{t('You can apply for one free online in about 10 days. Until then our team fills Form 60 with you on a short call, and you can start work.', 'आप लगभग 10 दिन में ऑनलाइन मुफ़्त बनवा सकते हैं। तब तक हमारी टीम फ़ोन पर फ़ॉर्म 60 भरवाएगी और आप काम शुरू कर सकते हैं।')}</T>
        <Big onPress={() => { setNoPan(false); set({ pan: 'Form 60' }); nav.push(next); nav.toast(t('The team will call you about Form 60', 'टीम फ़ॉर्म 60 के लिए कॉल करेगी')); }}>{t('Continue without PAN', 'बिना पैन आगे बढ़ें')}</Big>
        <Plain onPress={() => setNoPan(false)}>{t('I will add it', 'मैं जोड़ूँगी')}</Plain>
      </Sheet>
    </Page>
  );
}

/* 8 · Waiting for approval. "Check status" eventually approves and opens Home. */
export function SigninWaiting() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const [checks, setChecks] = useState(0);
  const aadhaarOk = checks >= 1 || st.approved;
  const panOk = checks >= 2 || st.approved;
  const work = profession(st.profession ?? 'house_help');
  const check = () => {
    const n = checks + 1;
    setChecks(n);
    if (n === 1) nav.toast(t('Aadhaar approved. PAN still being checked.', 'आधार मंज़ूर। पैन की जाँच जारी है।'));
    if (n >= 2) {
      set({ approved: true });
      nav.toast(t('All approved. Welcome to Saathi Partner!', 'सब मंज़ूर। Saathi Partner में स्वागत है!'));
      setTimeout(() => nav.reset('home'), 900);
    }
  };
  const rows: [string, string, React.ReactNode][] = [
    ['Mobile number', 'मोबाइल नंबर', <Tag tone="n">{t('Verified', 'सत्यापित')}</Tag>],
    ['Name and email', 'नाम और ईमेल', <Tag tone="n">{t('Done', 'हो गया')}</Tag>],
    [`Your work · ${work.name}`, `आपका काम · ${work.nameHi}`, <Tag tone="n">{t('Done', 'हो गया')}</Tag>],
    ['2 references', '2 पहचान वाले', <Tag tone="n">{t('Both confirmed', 'दोनों की पुष्टि')}</Tag>],
    ['Aadhaar card', 'आधार कार्ड', aadhaarOk ? <Tag tone="g">{t('Approved', 'मंज़ूर')}</Tag> : <Tag>{t('Checking', 'जाँच जारी')}</Tag>],
    ['PAN card', 'पैन कार्ड', panOk ? <Tag tone="g">{t('Approved', 'मंज़ूर')}</Tag> : <Tag>{t('Checking', 'जाँच जारी')}</Tag>],
    ...(needsCertificates(st) ? [['Work certificates', 'काम के सर्टिफ़िकेट', panOk ? <Tag tone="g">{t('Approved', 'मंज़ूर')}</Tag> : <Tag>{t('Checking', 'जाँच जारी')}</Tag>]] as [string, string, React.ReactNode][] : []),
  ];
  return (
    <Page>
      <TopBar>
        <TopT dim>{t(`Thank you, ${st.name}`, `धन्यवाद, ${st.name}`)}</TopT>
        <TopH>{t('We are checking your documents', 'हम आपके दस्तावेज़ जाँच रहे हैं')}</TopH>
        <TopT dim style={{ marginTop: 2 }}>{t('Usually within 1 working day', 'आमतौर पर 1 कामकाजी दिन में')}</TopT>
      </TopBar>
      <Screen>
        <Card style={{ gap: 11 }}>
          {rows.map(([en, hi, tag], i) => (
            <View key={en} style={{ gap: 11 }}>
              {i > 0 && <Hr />}
              <Row><T style={{ flex: 1 }}>{t(en, hi)}</T>{tag}</Row>
            </View>
          ))}
        </Card>
        <Card tone="yellow"><T s color="#0f1f1c"><T s b color="#0f1f1c">{t('Home and jobs open after approval.', 'मंज़ूरी के बाद होम और काम खुलेंगे।')}</T> {t('We will send an SMS. If a photo is not clear we ask you to add it again.', 'हम SMS भेजेंगे। फ़ोटो साफ़ न हो तो दोबारा जोड़ने को कहेंगे।')}</T></Card>
        <Spacer />
        <Plain onPress={check}>{t('Check status', 'स्थिति देखें')}</Plain>
        <Big onPress={() => nav.push('training')}>{t('Start training while you wait', 'इंतज़ार में ट्रेनिंग शुरू करें')}</Big>
      </Screen>
    </Page>
  );
}
