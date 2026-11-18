/** Design page 09 · My account, payments, alerts and leaving — screen 29 · Payment methods. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H, H2, Input, Link, Screen, Sheet, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { ToggleCard } from '../components/ToggleCard';
import { PRIMARY_UPI } from '../data';
import { isUpiId } from '../rules';

export function PaymentMethodsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useCustomerState();
  const [autoPay, setAutoPay] = useState(true);
  const [card, setCard] = useState(true);
  const [wallet, setWallet] = useState(true);
  const [cash, setCash] = useState(true);
  const [extra, setExtra] = useState<string[]>([]);
  const [def, setDef] = useState(PRIMARY_UPI);
  const [sheet, setSheet] = useState<null | 'remove' | 'add'>(null);
  const [newId, setNewId] = useState('');
  const upis = [PRIMARY_UPI, ...extra];
  const close = () => setSheet(null);
  const removeCard = () => { setCard(false); close(); nav.toast(t('Card removed', 'कार्ड हटाया गया', 'ਕਾਰਡ ਹਟਾ ਦਿੱਤਾ ਗਿਆ')); };
  const addUpi = () => { setExtra((l) => [...l, newId]); setNewId(''); close(); nav.toast(t('UPI ID added', 'UPI ID जोड़ा गया', 'UPI ID ਜੋੜ ਦਿੱਤੀ ਗਈ')); };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Payment methods', 'भुगतान के तरीके', 'ਭੁਗਤਾਨ ਦੇ ਤਰੀਕੇ')} onBack={nav.back} />
        {upis.map((id) => (
          <Card key={id} sel={def === id} row onPress={() => { setDef(id); set({ pay: 'upi' }); }}>
            <View style={styles.grow}><H2>{`UPI · ${id}`}</H2><T s m>{def === id ? t('Used first', 'पहले इसी से', 'ਪਹਿਲਾਂ ਇਸੇ ਨਾਲ') : t('Tap to use first', 'पहले इस्तेमाल के लिए दबाएँ', 'ਪਹਿਲਾਂ ਵਰਤਣ ਲਈ ਦਬਾਓ')}</T></View>
            {def === id && <Tag>{t('Default', 'मुख्य', 'ਮੁੱਖ')}</Tag>}
          </Card>
        ))}
        <ToggleCard title="UPI AutoPay" sub={t('Pays each visit by itself, up to ₹600', 'हर विज़िट का भुगतान अपने आप, ₹600 तक', 'ਹਰ ਵਿਜ਼ਿਟ ਦਾ ਭੁਗਤਾਨ ਆਪਣੇ ਆਪ, ₹600 ਤੱਕ')} on={autoPay} onChange={setAutoPay} />
        {card && (
          <Card row>
            <View style={styles.grow}><H2>{t('Card ending 4821', '4821 पर खत्म होने वाला कार्ड', '4821 ’ਤੇ ਖ਼ਤਮ ਹੋਣ ਵਾਲਾ ਕਾਰਡ')}</H2><T s m>{t('Held by the payment company, not by us', 'भुगतान कंपनी के पास, हमारे पास नहीं', 'ਭੁਗਤਾਨ ਕੰਪਨੀ ਕੋਲ, ਸਾਡੇ ਕੋਲ ਨਹੀਂ')}</T></View>
            <Link color={c.red} onPress={() => setSheet('remove')}>{t('Remove', 'हटाएँ', 'ਹਟਾਓ')}</Link>
          </Card>
        )}
        <ToggleCard title={t('Saathi wallet', 'Saathi वॉलेट', 'Saathi ਵਾਲੇਟ')} sub={t('₹240 · used before UPI', '₹240 · UPI से पहले इस्तेमाल', '₹240 · UPI ਤੋਂ ਪਹਿਲਾਂ ਵਰਤਿਆ ਜਾਂਦਾ')} on={wallet} onChange={setWallet} onPress={() => nav.push('wallet')} />
        <ToggleCard title={t('Cash after the job', 'काम के बाद नकद', 'ਕੰਮ ਤੋਂ ਬਾਅਦ ਨਕਦ')} sub={t('Pay the helper, get a receipt', 'हेल्पर को दें, रसीद पाएँ', 'ਹੈਲਪਰ ਨੂੰ ਦਿਓ, ਰਸੀਦ ਲਓ')} on={cash} onChange={setCash} />
        <Spacer />
        <Button variant="outline" onPress={() => setSheet('add')}>{t('Add a card or UPI ID', 'कार्ड या UPI ID जोड़ें', 'ਕਾਰਡ ਜਾਂ UPI ID ਜੋੜੋ')}</Button>
      </Screen>
      <Sheet visible={sheet === 'remove'} onClose={close}>
        <H>{t('Remove card ending 4821?', '4821 वाला कार्ड हटाएँ?', '4821 ਵਾਲਾ ਕਾਰਡ ਹਟਾਉਣਾ ਹੈ?')}</H>
        <Button variant="outline" danger style={{ borderColor: c.red }} onPress={removeCard}>{t('Remove', 'हटाएँ', 'ਹਟਾਓ')}</Button>
        <Button onPress={close}>{t('Keep it', 'रहने दें', 'ਰਹਿਣ ਦਿਓ')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'add'} onClose={close}>
        <H>{t('Add a UPI ID', 'UPI ID जोड़ें', 'UPI ID ਜੋੜੋ')}</H>
        <Input value={newId} onChangeText={setNewId} placeholder={t('name@bank', 'नाम@बैंक', 'ਨਾਂ@ਬੈਂਕ')} />
        <Button disabled={!isUpiId(newId)} onPress={addUpi}>{t('Add', 'जोड़ें', 'ਜੋੜੋ')}</Button>
      </Sheet>
    </View>
  );
}

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
