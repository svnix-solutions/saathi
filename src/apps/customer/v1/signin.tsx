/** Design page 02 · Sign in and registration (screens 1–4). */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  BackHeader, Button, Card, CharacterTile, Grid, H, H2, Icon, Input, Lft, Mark, OtpInput, Pill, Row, Screen, Spacer, Steps, T,
  palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { clock, useCountdown, useV1 } from './kit';

const CODE = '4821';

/* 1 · Mobile number */
export function SigninPhone() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const [phone, setPhone] = useState(st.phone ?? '98765 43210');
  const digits = phone.replace(/\D/g, '');
  const ok = digits.length === 10;
  return (
    <Screen>
      <Row style={{ marginTop: 10, alignItems: 'flex-end' }}>
        <Mark size={52} />
        <CharacterTile name="hero" width={92} height={110} radius={18} zoom={260} x={50} y={9} />
      </Row>
      <H size={22}>{t('Enter your mobile number', 'अपना मोबाइल नंबर डालें')}</H>
      <T m>{t('We will send a 4-digit code. New here? The same step creates your account.', 'हम 4 अंकों का कोड भेजेंगे। नए हैं? इसी कदम से आपका खाता बन जाता है।')}</T>
      <Input prefix="+91" value={phone} keyboardType="phone-pad" maxLength={11} placeholder="98765 43210"
        onChangeText={(s) => {
          const d = s.replace(/\D/g, '').slice(0, 10);
          setPhone(d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d);
        }} />
      {!ok && digits.length > 0 && <T s color={palette.red}>{t('Enter all 10 digits of your number.', 'नंबर के सभी 10 अंक डालें।')}</T>}
      <Spacer />
      <Button disabled={!ok} onPress={() => { set({ phone }); nav.push('signin.otp'); }}>{t('Send code', 'कोड भेजें')}</Button>
      <T s m center>{t('By continuing you agree to the terms and privacy policy.', 'आगे बढ़कर आप शर्तें और निजता नीति मानते हैं।')}</T>
    </Screen>
  );
}

/* 2 · SMS code */
export function SigninOtp() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const [code, setCode] = useState('');
  const [tries, setTries] = useState(5);
  const [wrong, setWrong] = useState(false);
  const [left, setLeft] = useCountdown(22);

  const verify = (v = code) => {
    if (v.length < 4 || tries === 0) return;
    if (v === CODE) {
      setWrong(false);
      if (st.signedIn) { set({ signedIn: true }); nav.reset('home'); nav.toast(t('Welcome back', 'फिर से स्वागत है')); }
      else nav.push('signin.name');
    } else {
      setWrong(true);
      setTries((n) => Math.max(n - 1, 0));
    }
  };

  return (
    <Screen>
      <BackHeader title={t('Change number', 'नंबर बदलें')} onBack={nav.back} />
      <H size={22}>{t('Enter the code', 'कोड डालें')}</H>
      <T m>{t(`Sent by SMS to +91 ${st.phone}. It works for 5 minutes.`, `+91 ${st.phone} पर SMS से भेजा गया। यह 5 मिनट तक चलेगा।`)}</T>
      <OtpInput value={code} error={wrong} onChange={(v) => { setCode(v); if (wrong) setWrong(false); if (v.length === 4) verify(v); }} />
      {left > 0 ? (
        <T s m>{t(`Resend code in ${clock(left)} · the code fills in by itself from the SMS`, `${clock(left)} में दोबारा कोड · SMS से कोड अपने आप भर जाएगा`)}</T>
      ) : (
        <Lft gap={4}>
          <T s m>{t('Did not get it?', 'कोड नहीं मिला?')}</T>
          <Pressable onPress={() => { setLeft(30); setTries(5); setCode(''); setWrong(false); nav.toast(t('New code sent', 'नया कोड भेजा गया')); }}>
            <T s b color={c.accent}>{t('Resend code', 'कोड दोबारा भेजें')}</T>
          </Pressable>
        </Lft>
      )}
      {wrong && (
        <Card tone="red">
          <T s color={c.red}>
            {tries > 0 ? (
              <><T s b color={c.red}>{t('That code is not right.', 'यह कोड सही नहीं है।')}</T> {t(`${tries} tries left, then ask for a new code.`, `${tries} कोशिश बाकी, फिर नया कोड माँगें।`)}</>
            ) : (
              <><T s b color={c.red}>{t('No tries left.', 'कोई कोशिश बाकी नहीं।')}</T> {t('Ask for a new code when the timer ends.', 'टाइमर खत्म होने पर नया कोड माँगें।')}</>
            )}
          </T>
        </Card>
      )}
      <Spacer />
      <Button disabled={code.length < 4 || tries === 0} onPress={() => verify()}>{t('Verify and continue', 'जाँचें और आगे बढ़ें')}</Button>
    </Screen>
  );
}

/* 3 · New customer: name */
export function SigninName() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const [name, setName] = useState(st.signedIn ? '' : st.name || '');
  const [lang, setLang] = useState(st.language);
  const ok = name.trim().length > 1;
  return (
    <Screen>
      <Steps step={2} total={3} />
      <T s m>{t('New customer · step 2 of 3', 'नए ग्राहक · कदम 2 में से 3')}</T>
      <H size={22}>{t('Welcome. What should we call you?', 'स्वागत है। हम आपको क्या कहकर बुलाएँ?')}</H>
      <H2>{t('Your name', 'आपका नाम')}</H2>
      <Input value={name} onChangeText={setName} placeholder="Nitin Kumar" />
      <H2>{t('Language', 'भाषा')}</H2>
      <Grid cols={3}>
        <Pill sel={lang === 'en'} onPress={() => setLang('en')}>English</Pill>
        <Pill sel={lang === 'hi'} onPress={() => setLang('hi')}>हिन्दी</Pill>
        <Pill sel={lang === 'pa'} onPress={() => setLang('pa')}>ਪੰਜਾਬੀ</Pill>
      </Grid>
      <Card><T s m>{t('There is no skip. Home opens only when your name and address are saved.', 'इसे छोड़ा नहीं जा सकता। नाम और पता सेव होने पर ही होम खुलेगा।')}</T></Card>
      <Spacer />
      <Button disabled={!ok} onPress={() => { set({ name: name.trim(), language: lang }); nav.push('signin.address'); }}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

/* 4 · New customer: address. With params.add it is "Add new address" from My addresses. */
export function SigninAddress({ params }: ScreenProps<{ add?: boolean }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const add = !!params.add;
  const [useLoc, setUseLoc] = useState(!add);
  const [line, setLine] = useState(add ? '' : st.address.line);
  const [note, setNote] = useState(add ? '' : st.address.note);
  const outside = /sector\s*40/i.test(line);
  const ok = line.trim().length > 2;

  const save = () => {
    if (outside) { nav.push('err.outsideArea'); return; }
    if (add) { nav.back(); nav.toast(t('Address added', 'पता जोड़ा गया')); return; }
    set({ signedIn: true, address: { label: 'Home', line: line.trim(), note: note.trim() } });
    nav.reset('home');
    nav.toast(t(`Welcome, ${st.name.split(' ')[0]}`, `स्वागत है, ${st.name.split(' ')[0]}`));
  };

  return (
    <Screen>
      {add ? <BackHeader title={t('Add new address', 'नया पता जोड़ें')} onBack={nav.back} /> : (
        <>
          <Steps step={3} total={3} />
          <T s m>{t('New customer · step 3 of 3', 'नए ग्राहक · कदम 3 में से 3')}</T>
        </>
      )}
      <H size={22}>{t('Where should the helper come?', 'हेल्पर कहाँ आए?')}</H>
      <Card sel={useLoc} row onPress={() => { setUseLoc(!useLoc); if (!useLoc && !line) setLine('Flat 204, Block C'); }}>
        <Lft>
          <Icon name="pin" color={c.accent} />
          <View>
            <H2>{t('Use my current location', 'मेरी अभी की जगह लें')}</H2>
            <T s m>{t('Block C, near the park', 'ब्लॉक सी, पार्क के पास')}</T>
          </View>
        </Lft>
      </Card>
      <H2>{t('Flat and building', 'फ़्लैट और बिल्डिंग')}</H2>
      <Input value={line} onChangeText={setLine} placeholder={t('Flat 204, Block C', 'फ़्लैट 204, ब्लॉक सी')} />
      <H2>{t('How to reach (optional)', 'कैसे पहुँचें (वैकल्पिक)')}</H2>
      <Input small value={note} onChangeText={setNote} placeholder={t('Gate 2, tell the guard flat 204', 'गेट 2, गार्ड को फ़्लैट 204 बताएँ')} />
      {ok && !outside && (
        <Card tone="yellow">
          <T s color={palette.ink}><T s b color={palette.ink}>{t('We serve this address.', 'हम इस पते पर सेवा देते हैं।')}</T> {t('A helper can reach you in about 15 minutes.', 'हेल्पर लगभग 15 मिनट में पहुँच सकता है।')}</T>
        </Card>
      )}
      {outside && (
        <Card tone="red"><T s color={c.red}>{t('We are not in Sector 40 yet.', 'हम अभी सेक्टर 40 में नहीं हैं।')}</T></Card>
      )}
      <Spacer />
      <Button disabled={!ok} onPress={save}>{add ? t('Save address', 'पता सेव करें') : t('Save and open Home', 'सेव करें और होम खोलें')}</Button>
    </Screen>
  );
}
