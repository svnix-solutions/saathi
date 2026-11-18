/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 62 · Shared home. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H, H2, Input, ListCard, Screen, Sheet, Spacer, T, Toggle, palette, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { MateRow } from '../components/MateRow';
import { FLATMATES, SHARED_WEEKLY, type Mate } from '../data';
import { splitBill, splitToggleProblem } from '../rules';

export function SharedHomeScreen() {
  const t = useT();
  const nav = useNav();
  const [mates, setMates] = useState<Mate[]>(FLATMATES);
  const [split, setSplit] = useState(true);
  const [notify, setNotify] = useState(true);
  const [invite, setInvite] = useState(false);
  const [phone, setPhone] = useState('');
  const { share, amount } = splitBill(mates, split, SHARED_WEEKLY);
  const homeCount = mates.filter((m) => !m.invited).length;
  const toggleMate = (i: number) => {
    const problem = splitToggleProblem(mates, i, split);
    if (problem) { nav.toast(problem); return; }
    setMates((ms) => ms.map((m, j) => (j === i ? { ...m, inSplit: !m.inSplit } : m)));
  };
  const status = (m: Mate, i: number) => (m.invited ? 'Invite sent' : split && i > 0 && !m.inSplit ? 'Not in this split' : m.role);
  const sendInvite = () => {
    if (phone.replace(/\D/g, '').length < 10) { nav.toast('Enter a 10-digit number'); return; }
    setMates((ms) => [...ms, { initials: '+91', name: `+91 ${phone}`, role: '', inSplit: false, invited: true }]);
    setPhone(''); setInvite(false); nav.toast('Invite sent on WhatsApp');
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Shared home', 'साझा घर')} fallback="account" />
        <H>Flat 204 · {homeCount} people</H>
        <ListCard>
          {mates.map((m, i) => <MateRow key={m.name} mate={m} status={status(m, i)} amount={amount(i)} onPress={() => toggleMate(i)} />)}
        </ListCard>
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Split every bill equally', 'हर बिल बराबर बाँटें')}</H2>
            <T s m>{split ? `Monthly plan ${rupees(SHARED_WEEKLY)} a week · ${rupees(share)} each` : `You pay ${rupees(SHARED_WEEKLY)} a week`}</T>
          </View>
          <Toggle on={split} onChange={setSplit} />
        </Card>
        <Card row>
          <View style={styles.grow}><H2>Tell everyone before a visit</H2><T s m>So someone is home</T></View>
          <Toggle on={notify} onChange={setNotify} />
        </Card>
        {split && mates[2].inSplit && (
          <Card tone="yellow" onPress={() => nav.toast('Reminder sent to Aman on WhatsApp')}>
            <T s color={palette.ink}><T s b color={palette.ink}>Aman has not paid this week.</T> We remind him; your visits carry on.</T>
          </Card>
        )}
        <Spacer />
        <Button variant="outline" onPress={() => setInvite(true)}>{t('Invite a flatmate', 'फ़्लैटमेट को बुलाएँ')}</Button>
      </Screen>
      <Sheet visible={invite} onClose={() => setInvite(false)}>
        <H2>Invite a flatmate</H2>
        <T s m>They get a WhatsApp link to join Flat 204 and share the bill.</T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} placeholder="98765 43210" keyboardType="phone-pad" maxLength={11} />
        <Button onPress={sendInvite}>{t('Send invite', 'न्योता भेजें')}</Button>
      </Sheet>
    </View>
  );
}

export default SharedHomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
