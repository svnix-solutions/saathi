/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 62 · Shared home. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H, H2, Input, ListCard, Screen, Sheet, Spacer, T, Toggle, palette, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { MateRow } from '../components/MateRow';
import { FLATMATES, SHARED_WEEKLY, type Mate, type Tri } from '../data';
import { splitBill, splitToggleProblem } from '../rules';

export function SharedHomeScreen() {
  const t = useT();
  const nav = useNav();
  const tri = (x: Tri) => t(x.en, x.hi, x.pa);
  const [mates, setMates] = useState<Mate[]>(FLATMATES);
  const [split, setSplit] = useState(true);
  const [notify, setNotify] = useState(true);
  const [invite, setInvite] = useState(false);
  const [phone, setPhone] = useState('');
  const { share, amount } = splitBill(mates, split, SHARED_WEEKLY);
  const homeCount = mates.filter((m) => !m.invited).length;
  const weekly = rupees(SHARED_WEEKLY);
  const inviteLabel = t('Invite a flatmate', 'फ़्लैटमेट को बुलाएँ', 'ਫ਼ਲੈਟਮੇਟ ਨੂੰ ਬੁਲਾਓ');
  const toggleMate = (i: number) => {
    const problem = splitToggleProblem(mates, i, split);
    if (problem) { nav.toast(tri(problem)); return; }
    setMates((ms) => ms.map((m, j) => (j === i ? { ...m, inSplit: !m.inSplit } : m)));
  };
  const status = (m: Mate, i: number) => (m.invited
    ? t('Invite sent', 'न्योता भेजा', 'ਸੱਦਾ ਭੇਜਿਆ')
    : split && i > 0 && !m.inSplit ? t('Not in this split', 'इस बँटवारे में नहीं', 'ਇਸ ਵੰਡ ਵਿੱਚ ਨਹੀਂ') : tri(m.role));
  const sendInvite = () => {
    if (phone.replace(/\D/g, '').length < 10) { nav.toast(t('Enter a 10-digit number', '10 अंकों का नंबर डालें', '10 ਅੰਕਾਂ ਦਾ ਨੰਬਰ ਪਾਓ')); return; }
    const num = `+91 ${phone}`;
    setMates((ms) => [...ms, { initials: '+91', name: { en: num, hi: num, pa: num }, role: { en: '', hi: '', pa: '' }, inSplit: false, invited: true }]);
    setPhone(''); setInvite(false); nav.toast(t('Invite sent on WhatsApp', 'WhatsApp पर न्योता भेजा गया', 'WhatsApp ’ਤੇ ਸੱਦਾ ਭੇਜਿਆ ਗਿਆ'));
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Shared home', 'साझा घर', 'ਸਾਂਝਾ ਘਰ')} fallback="account" />
        <H>{t(`Flat 204 · ${homeCount} people`, `फ़्लैट 204 · ${homeCount} लोग`, `ਫ਼ਲੈਟ 204 · ${homeCount} ਲੋਕ`)}</H>
        <ListCard>
          {mates.map((m, i) => <MateRow key={m.name.en} mate={m} status={status(m, i)} amount={amount(i)} onPress={() => toggleMate(i)} />)}
        </ListCard>
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Split every bill equally', 'हर बिल बराबर बाँटें', 'ਹਰ ਬਿੱਲ ਬਰਾਬਰ ਵੰਡੋ')}</H2>
            <T s m>
              {split
                ? t(`Monthly plan ${weekly} a week · ${rupees(share)} each`, `मासिक प्लान ${weekly} हर हफ़्ते · हर किसी के ${rupees(share)}`, `ਮਹੀਨੇਵਾਰ ਪਲਾਨ ${weekly} ਹਰ ਹਫ਼ਤੇ · ਹਰ ਇੱਕ ਦੇ ${rupees(share)}`)
                : t(`You pay ${weekly} a week`, `आप हर हफ़्ते ${weekly} देते हैं`, `ਤੁਸੀਂ ਹਰ ਹਫ਼ਤੇ ${weekly} ਦਿੰਦੇ ਹੋ`)}
            </T>
          </View>
          <Toggle on={split} onChange={setSplit} />
        </Card>
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Tell everyone before a visit', 'विज़िट से पहले सबको बताएँ', 'ਵਿਜ਼ਿਟ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰਿਆਂ ਨੂੰ ਦੱਸੋ')}</H2>
            <T s m>{t('So someone is home', 'ताकि कोई घर पर रहे', 'ਤਾਂ ਜੋ ਕੋਈ ਘਰ ਹੋਵੇ')}</T>
          </View>
          <Toggle on={notify} onChange={setNotify} />
        </Card>
        {split && mates[2].inSplit && (
          <Card tone="yellow" onPress={() => nav.toast(t('Reminder sent to Aman on WhatsApp', 'अमन को WhatsApp पर याद दिलाया गया', 'ਅਮਨ ਨੂੰ WhatsApp ’ਤੇ ਯਾਦ ਕਰਾਇਆ ਗਿਆ'))}>
            <T s color={palette.ink}>
              <T s b color={palette.ink}>{t('Aman has not paid this week.', 'अमन ने इस हफ़्ते पैसे नहीं दिए।', 'ਅਮਨ ਨੇ ਇਸ ਹਫ਼ਤੇ ਪੈਸੇ ਨਹੀਂ ਦਿੱਤੇ।')}</T>
              {' '}{t('We remind him; your visits carry on.', 'हम उन्हें याद दिला देंगे; आपकी विज़िट चलती रहेंगी।', 'ਅਸੀਂ ਉਹਨਾਂ ਨੂੰ ਯਾਦ ਕਰਾ ਦਿਆਂਗੇ; ਤੁਹਾਡੀਆਂ ਵਿਜ਼ਿਟਾਂ ਚੱਲਦੀਆਂ ਰਹਿਣਗੀਆਂ।')}
            </T>
          </Card>
        )}
        <Spacer />
        <Button variant="outline" onPress={() => setInvite(true)}>{inviteLabel}</Button>
      </Screen>
      <Sheet visible={invite} onClose={() => setInvite(false)}>
        <H2>{inviteLabel}</H2>
        <T s m>
          {t(
            'They get a WhatsApp link to join Flat 204 and share the bill.',
            'उन्हें फ़्लैट 204 से जुड़ने और बिल बाँटने के लिए WhatsApp लिंक मिलेगा।',
            'ਉਹਨਾਂ ਨੂੰ ਫ਼ਲੈਟ 204 ਨਾਲ ਜੁੜਨ ਅਤੇ ਬਿੱਲ ਵੰਡਣ ਲਈ WhatsApp ਲਿੰਕ ਮਿਲੇਗਾ।',
          )}
        </T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} placeholder="98765 43210" keyboardType="phone-pad" maxLength={11} />
        <Button onPress={sendInvite}>{t('Send invite', 'न्योता भेजें', 'ਸੱਦਾ ਭੇਜੋ')}</Button>
      </Sheet>
    </View>
  );
}

export default SharedHomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
