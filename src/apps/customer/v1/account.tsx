/** Design page 09 · My account, payments, alerts and leaving (screens 28–31). */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Check, H, H2, Input, Lft, Link, OtpInput, Row, Screen, Sheet, Spacer, T, Tag, Toggle,
  palette, useNav, useT, useTheme,
} from '@/native/ui';
import type { IconName } from '@/native/ui';
import { CustomerTabs } from '../chrome';
import { MenuRow, Rows, useV1 } from './kit';

/* 28 · My account */
export function Account() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const [name, setName] = useState(st.name);
  const [email, setEmail] = useState(st.email ?? 'nitin.k@example.com');
  const more: [string, string, string, IconName][] = [
    ['plan', 'My monthly plan', 'मेरा मासिक प्लान', 'clock'],
    ['favourites', 'Favourite helpers', 'पसंदीदा हेल्पर', 'star'],
    ['wallet', 'Wallet', 'वॉलेट', 'wallet'],
    ['rewards', 'Points and rewards', 'पॉइंट और इनाम', 'sparkle'],
    ['refer', 'Refer a friend', 'दोस्त को बुलाएँ', 'user'],
    ['gift', 'Gift a visit', 'विज़िट गिफ़्ट करें', 'sparkle'],
    ['plus', 'Saathi Plus', 'साथी प्लस', 'bolt'],
    ['society', 'My society', 'मेरी सोसाइटी', 'home'],
    ['sharedHome', 'Shared home', 'साझा घर', 'key'],
    ['alerts', 'Messages', 'संदेश', 'bell'],
    ['language', 'Language', 'भाषा', 'list'],
    ['help', 'Help and safety', 'मदद और सुरक्षा', 'shield'],
  ];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Lft>
          <Avatar face="nk" size={56} />
          <View>
            <H>{st.name}</H>
            <T s m>{t(`+91 ${st.phone} · verified`, `+91 ${st.phone} · सत्यापित`)}</T>
          </View>
        </Lft>
        <H2>{t('Name', 'नाम')}</H2>
        <Input value={name} onChangeText={setName} />
        <H2>{t('Email (optional)', 'ईमेल (वैकल्पिक)')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Card row>
          <View style={{ flex: 1 }}>
            <H2>{t('Mobile number', 'मोबाइल नंबर')}</H2>
            <T s m>{t('Changing it needs a code on the new number', 'बदलने के लिए नए नंबर पर कोड आएगा')}</T>
          </View>
          <Link onPress={() => nav.push('signin.phone')}>{t('Change', 'बदलें')}</Link>
        </Card>
        <Card>
          <Rows>
            <MenuRow label={t('Addresses', 'पते')} onPress={() => nav.push('addresses')} />
            <MenuRow label={t('Payment methods', 'भुगतान के तरीके')} onPress={() => nav.push('paymentMethods')} />
            <MenuRow label={t('Alerts', 'सूचनाएँ')} onPress={() => nav.push('alertSettings')} />
          </Rows>
        </Card>
        <Button disabled={name.trim().length < 2} onPress={() => { set({ name: name.trim(), email }); nav.toast(t('Saved', 'सेव हुआ')); }}>{t('Save', 'सेव करें')}</Button>
        <H2 m style={{ marginTop: 6 }}>{t('More', 'और')}</H2>
        <Card>
          <Rows>
            {more.map(([r, en, hi, icon]) => <MenuRow key={r} icon={icon} label={t(en, hi)} onPress={() => nav.push(r)} />)}
          </Rows>
        </Card>
        <Card>
          <Rows>
            <MenuRow label={t('Sign out', 'साइन आउट')} onPress={() => { set({ signedIn: true }); nav.reset('signin.phone'); nav.toast(t('Signed out', 'साइन आउट हुआ')); }} />
            <MenuRow label={t('Delete my account', 'मेरा खाता हटाएँ')} color={palette.red} onPress={() => nav.push('deleteAccount')} />
          </Rows>
        </Card>
      </Screen>
      <CustomerTabs active="account" />
    </View>
  );
}

/* 29 · Payment methods */
export function PaymentMethods() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useV1();
  const [autoPay, setAutoPay] = useState(true);
  const [card, setCard] = useState(true);
  const [wallet, setWallet] = useState(true);
  const [cash, setCash] = useState(true);
  const [extra, setExtra] = useState<string[]>([]);
  const [def, setDef] = useState('nitin@upi');
  const [sheet, setSheet] = useState<null | 'remove' | 'add'>(null);
  const [newId, setNewId] = useState('');
  const upis = ['nitin@upi', ...extra];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Payment methods', 'भुगतान के तरीके')} onBack={nav.back} />
        {upis.map((id) => (
          <Card key={id} sel={def === id} row onPress={() => { setDef(id); set({ pay: 'upi' }); }}>
            <View><H2>{`UPI · ${id}`}</H2><T s m>{def === id ? t('Used first', 'पहले इसी से') : t('Tap to use first', 'पहले इस्तेमाल के लिए दबाएँ')}</T></View>
            {def === id && <Tag>{t('Default', 'मुख्य')}</Tag>}
          </Card>
        ))}
        <Card row>
          <View style={{ flex: 1 }}><H2>UPI AutoPay</H2><T s m>{t('Pays each visit by itself, up to ₹600', 'हर विज़िट का भुगतान अपने आप, ₹600 तक')}</T></View>
          <Toggle on={autoPay} onChange={setAutoPay} />
        </Card>
        {card && (
          <Card row>
            <View style={{ flex: 1 }}><H2>{t('Card ending 4821', '4821 पर खत्म होने वाला कार्ड')}</H2><T s m>{t('Held by the payment company, not by us', 'भुगतान कंपनी के पास, हमारे पास नहीं')}</T></View>
            <Link color={c.red} onPress={() => setSheet('remove')}>{t('Remove', 'हटाएँ')}</Link>
          </Card>
        )}
        <Card row onPress={() => nav.push('wallet')}>
          <View style={{ flex: 1 }}><H2>{t('Saathi wallet', 'साथी वॉलेट')}</H2><T s m>{t('₹240 · used before UPI', '₹240 · UPI से पहले इस्तेमाल')}</T></View>
          <Toggle on={wallet} onChange={setWallet} />
        </Card>
        <Card row>
          <View style={{ flex: 1 }}><H2>{t('Cash after the job', 'काम के बाद नकद')}</H2><T s m>{t('Pay the helper, get a receipt', 'हेल्पर को दें, रसीद पाएँ')}</T></View>
          <Toggle on={cash} onChange={setCash} />
        </Card>
        <Spacer />
        <Button variant="outline" onPress={() => setSheet('add')}>{t('Add a card or UPI ID', 'कार्ड या UPI ID जोड़ें')}</Button>
      </Screen>
      <Sheet visible={sheet === 'remove'} onClose={() => setSheet(null)}>
        <H>{t('Remove card ending 4821?', '4821 वाला कार्ड हटाएँ?')}</H>
        <Button variant="outline" danger style={{ borderColor: c.red }} onPress={() => { setCard(false); setSheet(null); nav.toast(t('Card removed', 'कार्ड हटाया गया')); }}>{t('Remove', 'हटाएँ')}</Button>
        <Button onPress={() => setSheet(null)}>{t('Keep it', 'रहने दें')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'add'} onClose={() => setSheet(null)}>
        <H>{t('Add a UPI ID', 'UPI ID जोड़ें')}</H>
        <Input value={newId} onChangeText={setNewId} placeholder="name@bank" />
        <Button disabled={!/^\S+@\S+$/.test(newId)} onPress={() => { setExtra((l) => [...l, newId]); setNewId(''); setSheet(null); nav.toast(t('UPI ID added', 'UPI ID जोड़ा गया')); }}>{t('Add', 'जोड़ें')}</Button>
      </Sheet>
    </View>
  );
}

/* 30 · Alert settings */
export function AlertSettings() {
  const nav = useNav();
  const t = useT();
  const [on, setOn] = useState({ reminders: true, rate: true, offers: false, app: true, sms: true, whatsapp: false, quiet: true });
  const tog = (k: keyof typeof on) => (v: boolean) => setOn((s) => ({ ...s, [k]: v }));
  return (
    <Screen>
      <BackHeader title={t('Alerts', 'सूचनाएँ')} onBack={nav.back} />
      <H2>{t('What we tell you about', 'हम किस बारे में बताते हैं')}</H2>
      <Card>
        <Rows>
          <Row><T style={{ flex: 1 }}>{t('Helper arrival and door code', 'हेल्पर का आना और दरवाज़ा कोड')}</T><Tag tone="n">{t('Always on', 'हमेशा चालू')}</Tag></Row>
          <Row><T>{t('Booking reminders', 'बुकिंग की याद')}</T><Toggle on={on.reminders} onChange={tog('reminders')} /></Row>
          <Row><T>{t('Rate your visit', 'विज़िट को रेटिंग दें')}</T><Toggle on={on.rate} onChange={tog('rate')} /></Row>
          <Row><T>{t('Offers and discounts', 'ऑफ़र और छूट')}</T><Toggle on={on.offers} onChange={tog('offers')} /></Row>
        </Rows>
      </Card>
      <H2>{t('How', 'कैसे')}</H2>
      <Card>
        <Rows>
          <Row><T>{t('In the app', 'ऐप में')}</T><Toggle on={on.app} onChange={tog('app')} /></Row>
          <Row><T>SMS</T><Toggle on={on.sms} onChange={tog('sms')} /></Row>
          <Row><T>WhatsApp</T><Toggle on={on.whatsapp} onChange={tog('whatsapp')} /></Row>
        </Rows>
      </Card>
      <Card row>
        <View style={{ flex: 1 }}><H2>{t('Quiet hours', 'शांत समय')}</H2><T s m>{t('Nothing but arrivals, 9 pm to 8 am', 'रात 9 से सुबह 8 तक सिर्फ़ आगमन')}</T></View>
        <Toggle on={on.quiet} onChange={tog('quiet')} />
      </Card>
      <T s m>{t('Arrival messages cannot be turned off; you need the door code.', 'आगमन के मैसेज बंद नहीं होते; आपको दरवाज़ा कोड चाहिए।')}</T>
    </Screen>
  );
}

/* 31 · Delete my account */
export function DeleteAccount() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useV1();
  const items = [
    t('Your name, addresses and saved payment methods', 'आपका नाम, पते और सेव किए भुगतान तरीके'),
    t('Your favourites, points and reviews', 'आपके पसंदीदा, पॉइंट और रिव्यू'),
    t('Your monthly plan, from tomorrow', 'आपका मासिक प्लान, कल से'),
  ];
  const [ticked, setTicked] = useState<number[]>([]);
  const [sheet, setSheet] = useState(false);
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Delete my account', 'मेरा खाता हटाएँ')} onBack={nav.back} />
        <H>{t('Are you sure you want to leave?', 'क्या आप सच में जाना चाहते हैं?')}</H>
        <Card style={{ gap: 9 }}>
          <H2>{t('This removes', 'इससे हट जाएगा')}</H2>
          {items.map((x, i) => (
            <Pressable key={i} accessibilityRole="checkbox" accessibilityState={{ checked: ticked.includes(i) }}
              onPress={() => setTicked((l) => (l.includes(i) ? l.filter((y) => y !== i) : [...l, i]))}>
              <Lft style={{ alignItems: 'flex-start' }}><Check on={ticked.includes(i)} /><T s style={{ flex: 1 }}>{x}</T></Lft>
            </Pressable>
          ))}
        </Card>
        <Card tone="yellow">
          <T s color={palette.ink}><T s b color={palette.ink}>{t('You have ₹240 in your wallet.', 'आपके वॉलेट में ₹240 हैं।')}</T> {t('We send it back to your UPI before closing the account.', 'खाता बंद करने से पहले हम इसे आपके UPI पर लौटा देंगे।')}</T>
        </Card>
        <Card><T s m>{t('Bills and payment records are kept for the time the law requires, then removed.', 'बिल और भुगतान रिकॉर्ड कानून के तय समय तक रखे जाते हैं, फिर हटा दिए जाते हैं।')}</T></Card>
        <Spacer />
        <Button style={{ backgroundColor: c.red }} onPress={() => {
          if (ticked.length < items.length) { nav.toast(t('Tick each item to confirm', 'पुष्टि के लिए हर बात पर टिक करें')); return; }
          setSheet(true); nav.toast(t(`Code sent to +91 98765 43210`, `+91 98765 43210 पर कोड भेजा गया`));
        }}>{t('Send code and delete', 'कोड भेजें और हटाएँ')}</Button>
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={() => { nav.back(); nav.toast(t('Your account stays', 'आपका खाता बना रहेगा')); }}>{t('Keep my account', 'मेरा खाता रखें')}</Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H>{t('Enter the code', 'कोड डालें')}</H>
        <T s m>{t('Use 4821 in this prototype.', 'इस प्रोटोटाइप में 4821 डालें।')}</T>
        <OtpInput value={code} error={wrong} onChange={(v) => { setCode(v); setWrong(false); }} />
        {wrong && <T s color={c.red}>{t('That code is not right.', 'यह कोड सही नहीं है।')}</T>}
        <Button style={{ backgroundColor: c.red }} disabled={code.length < 4} onPress={() => {
          if (code !== '4821') { setWrong(true); return; }
          setSheet(false); set({ signedIn: false }); nav.reset('signin.phone'); nav.toast(t('Account deleted. ₹240 sent to your UPI.', 'खाता हटाया गया। ₹240 आपके UPI पर भेजे गए।'));
        }}>{t('Delete my account', 'मेरा खाता हटाएँ')}</Button>
      </Sheet>
    </View>
  );
}
