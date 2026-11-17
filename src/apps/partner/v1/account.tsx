/** Design page 24 (section 60): my profile, bank account, alerts. */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Avatar, BackHeader, Card, CheckRow, H, H2, Hr, Icon, IconTile, Input, Lft, Row, Screen, Sheet, Spacer, T,
  useAppState, useNav, useT, useTheme, type IconName,
} from '@/native/ui';
import { PartnerTabs } from '../chrome';
import { Big, Cb, Chev, GreenText, Page, type V1State } from './kit';

/* 25 · My profile */
export function Profile() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const [email, setEmail] = useState(st.email ?? 'sunita.devi@example.com');
  const [emergency, setEmergency] = useState(st.emergency ?? 'Ravi (husband) · 98111 45678');
  const [sheet, setSheet] = useState<'phone' | 'lang' | null>(null);
  const [phone, setPhone] = useState(st.phone === '98100 22334' ? '98111 20034' : st.phone);
  const [langs, setLangs] = useState<string[]>((st.langs as string[] | undefined) ?? ['Hindi', 'Punjabi']);
  const langHi: Record<string, string> = { Hindi: 'हिन्दी', Punjabi: 'पंजाबी', English: 'अंग्रेज़ी', Bengali: 'बांग्ला' };
  const fullName = (st.fullName as string | undefined) ?? 'Sunita Devi';
  const rows: { en: string; hi: string; right?: React.ReactNode; go: () => void }[] = [
    { en: `Mobile number · ${phone}`, hi: `मोबाइल नंबर · ${phone}`, right: <T s b color={c.accent}>{t('Change', 'बदलें')}</T>, go: () => setSheet('phone') },
    { en: `Languages · ${langs.join(', ')}`, hi: `भाषाएँ · ${langs.map((l) => langHi[l]).join(', ')}`, go: () => setSheet('lang') },
    { en: 'My documents', hi: 'मेरे दस्तावेज़', go: () => nav.push('documents') },
    { en: 'Bank account', hi: 'बैंक खाता', go: () => nav.push('bank') },
  ];
  return (
    <Page>
      <Screen>
        <Lft gap={10}><Avatar face="sd" size={56} /><View><H>{fullName}</H><T s m>{t('Partner ID KP-0142 · Block C', 'पार्टनर आईडी KP-0142 · ब्लॉक सी')}</T></View></Lft>
        <H2>{t('Email', 'ईमेल')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
        <H2>{t('Someone to call in an emergency', 'आपात स्थिति में किसे कॉल करें')}</H2>
        <Input value={emergency} onChangeText={setEmergency} />
        <Card style={{ gap: 10 }}>
          {rows.map((r, i) => (
            <View key={r.en} style={{ gap: 10 }}>
              {i > 0 && <Hr />}
              <Card tone="clear" pad={false} style={{ borderWidth: 0 }} row onPress={r.go}>
                <T style={{ flex: 1 }}>{t(r.en, r.hi)}</T>{r.right ?? <Chev />}
              </Card>
            </View>
          ))}
        </Card>
        <Spacer />
        <Big onPress={() => {
          if (!/^\S+@\S+\.\S+$/.test(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें'));
          set({ email, emergency, phone, langs });
          nav.toast(t('Profile saved', 'प्रोफ़ाइल सेव हो गई'));
        }}>{t('Save', 'सेव करें')}</Big>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet === 'phone'} onClose={() => setSheet(null)}>
        <H2>{t('New mobile number', 'नया मोबाइल नंबर')}</H2>
        <T s m>{t('We send a code to the new number. Jobs and payslips move to it.', 'नए नंबर पर कोड भेजेंगे। काम और पे-स्लिप उसी पर आएँगे।')}</T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Big onPress={() => { setSheet(null); nav.toast(t('Code sent. Number updated after you enter it.', 'कोड भेजा। डालने पर नंबर बदल जाएगा।')); }}>{t('Send code', 'कोड भेजें')}</Big>
      </Sheet>
      <Sheet visible={sheet === 'lang'} onClose={() => setSheet(null)}>
        <H2>{t('Languages I speak', 'मैं कौन-सी भाषाएँ बोलती हूँ')}</H2>
        <T s m>{t('Customers who speak these are matched with you first.', 'ये भाषाएँ बोलने वाले ग्राहक पहले आपको मिलेंगे।')}</T>
        {Object.keys(langHi).map((l) => (
          <CheckRow key={l} on={langs.includes(l)} label={t(l, langHi[l])} onPress={() => setLangs(langs.includes(l) ? langs.filter((x) => x !== l) : [...langs, l])} />
        ))}
        <Big onPress={() => setSheet(null)}>{t('Done', 'हो गया')}</Big>
      </Sheet>
    </Page>
  );
}

const banks: Record<string, [string, string]> = {
  SBIN: ['State Bank of India', 'Block C branch'], HDFC: ['HDFC Bank', 'Sector 18 branch'], ICIC: ['ICICI Bank', 'Main Road branch'],
  PUNB: ['Punjab National Bank', 'Block B branch'], BARB: ['Bank of Baroda', 'Market branch'],
};

/* 26 · Bank account */
export function Bank() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const [name, setName] = useState((st.fullName as string | undefined) ?? 'Sunita Devi');
  const [acct, setAcct] = useState('•••• •••• 4821');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [upi, setUpi] = useState(false);
  const [upiId, setUpiId] = useState('sunita@okaxis');
  const [checking, setChecking] = useState(false);
  const bank = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc) ? banks[ifsc.slice(0, 4)] ?? ['Bank found', 'Branch from the IFSC'] : null;
  const save = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      set({ bankLabel: upi ? upiId : `${bank?.[0] ?? ''} ···· ${acct.slice(-4)}` });
      nav.toast(upi ? t('UPI ID checked and saved', 'UPI आईडी जाँचकर सेव') : t('₹1 received. Account saved.', '₹1 मिल गया। खाता सेव हुआ।'));
      if (nav.canGoBack) nav.back();
    }, 1200);
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Bank account', 'बैंक खाता')} onBack={nav.canGoBack ? nav.back : () => nav.reset('profile')} />
        <H>{t('Where should we send your pay?', 'आपकी कमाई कहाँ भेजें?')}</H>
        {upi ? (
          <>
            <H2>{t('UPI ID', 'UPI आईडी')}</H2>
            <Input value={upiId} onChangeText={setUpiId} placeholder="name@bank" />
            <T s m>{t('We send ₹1 to check the UPI ID is yours.', 'UPI आईडी आपकी है, यह जाँचने के लिए ₹1 भेजेंगे।')}</T>
          </>
        ) : (
          <>
            <H2>{t('Name on the account', 'खाते पर नाम')}</H2>
            <Input value={name} onChangeText={setName} />
            <H2>{t('Account number', 'खाता नंबर')}</H2>
            <Input value={acct} onChangeText={setAcct} keyboardType="number-pad" />
            <H2>{t('IFSC code', 'IFSC कोड')}</H2>
            <Input value={ifsc} onChangeText={(v) => setIfsc(v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11))} placeholder="SBIN0001234" />
            {bank ? (
              <Card sel row>
                <View style={{ flex: 1 }}><H2>{bank[0]}</H2><T s m>{t(`${bank[1]} · found from the IFSC`, `${bank[1]} · IFSC से मिला`)}</T></View>
                <Cb on size={18} />
              </Card>
            ) : <Card tone="red"><T s>{t('Type the 11-letter IFSC from your passbook', 'पासबुक से 11 अक्षर का IFSC लिखें')}</T></Card>}
            <T s m>{t('We send ₹1 to check the account is yours. The name must match your Aadhaar.', 'खाता आपका है, यह जाँचने के लिए ₹1 भेजेंगे। नाम आधार से मेल खाना चाहिए।')}</T>
          </>
        )}
        <Spacer />
        <Big disabled={checking || (!upi && !bank)} onPress={save}>{checking ? t('Sending ₹1…', '₹1 भेज रहे हैं…') : t('Check and save', 'जाँचें और सेव करें')}</Big>
        <GreenText center onPress={() => setUpi(!upi)}>{upi ? t('Use a bank account instead', 'बैंक खाता इस्तेमाल करें') : t('Use a UPI ID instead', 'UPI आईडी इस्तेमाल करें')}</GreenText>
      </Screen>
    </Page>
  );
}

type Alert = { id: string; icon: IconName; fill?: boolean; en: string; hi: string; subEn: string; subHi: string; go: string };
const alerts: Alert[] = [
  { id: 'pay', icon: 'wallet', en: '₹2,846 sent to your bank', hi: '₹2,846 आपके बैंक में भेजे', subEn: 'Weekly payout · State Bank ···· 4821 · today', subHi: 'साप्ताहिक भुगतान · स्टेट बैंक ···· 4821 · आज', go: 'earnings' },
  { id: 'rev', icon: 'star', en: 'New review: 5 stars', hi: 'नई समीक्षा: 5 स्टार', subEn: '"Kitchen slab was spotless" · 2 hr ago', subHi: '"किचन स्लैब चमक रहा था" · 2 घंटे पहले', go: 'reviews' },
  { id: 'pol', icon: 'shield', en: 'Police verification done', hi: 'पुलिस सत्यापन पूरा', subEn: 'Valid until Oct 2027 · yesterday', subHi: 'अक्टूबर 2027 तक मान्य · कल', go: 'joining' },
  { id: 'busy', icon: 'bolt', fill: true, en: 'Busy hour tomorrow, 7 to 10 am', hi: 'कल व्यस्त समय, सुबह 7 से 10', subEn: '₹20 extra per job in Block C · yesterday', subHi: 'ब्लॉक सी में हर काम पर ₹20 ज़्यादा · कल', go: 'hours' },
  { id: 'off', icon: 'clock', en: 'Day off approved', hi: 'छुट्टी मंज़ूर', subEn: 'Sun 30 Nov · 2 days ago', subHi: 'रवि 30 नवंबर · 2 दिन पहले', go: 'timeOff' },
];

/* 27 · Alerts */
export function Alerts() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAppState<V1State>();
  const read = st.alertsRead ?? ['rev', 'pol', 'busy', 'off'];
  const open = (a: Alert) => { set({ alertsRead: [...new Set([...read, a.id])] }); nav.push(a.go); };
  return (
    <Page>
      <Screen>
        <Row>
          <Pressable onPress={nav.back} disabled={!nav.canGoBack} accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {nav.canGoBack && <Icon name="back" color={c.ink} />}
            <H>{t('Alerts', 'सूचनाएँ')}</H>
          </Pressable>
          <GreenText onPress={() => { set({ alertsRead: alerts.map((a) => a.id) }); nav.toast(t('All marked as read', 'सब पढ़ा हुआ')); }}>{t('Mark all read', 'सब पढ़ा हुआ करें')}</GreenText>
        </Row>
        {alerts.map((a) => {
          const unread = !read.includes(a.id);
          return (
            <Card key={a.id} sel={unread} onPress={() => open(a)}>
              <Lft style={{ alignItems: 'flex-start' }}>
                <IconTile name={a.icon} bg={unread ? c.card : undefined} />
                <View style={{ flex: 1 }}><H2>{t(a.en, a.hi)}</H2><T s m>{t(a.subEn, a.subHi)}</T></View>
              </Lft>
            </Card>
          );
        })}
      </Screen>
    </Page>
  );
}

