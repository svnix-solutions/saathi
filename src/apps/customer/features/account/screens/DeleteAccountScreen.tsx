/** Design page 09 · My account, payments, alerts and leaving — screen 31 · Delete my account. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, H, H2, Lft, OtpInput, Screen, Sheet, Spacer, T, palette, useNav, useT, useTheme } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { DELETE_CODE, DELETE_ITEMS } from '../data';
import { toggleIndex } from '../rules';

export function DeleteAccountScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useCustomerState();
  const [ticked, setTicked] = useState<number[]>([]);
  const [sheet, setSheet] = useState(false);
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const sendCode = () => {
    if (ticked.length < DELETE_ITEMS.length) { nav.toast(t('Tick each item to confirm', 'पुष्टि के लिए हर बात पर टिक करें', 'ਪੱਕਾ ਕਰਨ ਲਈ ਹਰ ਗੱਲ ’ਤੇ ਟਿਕ ਕਰੋ')); return; }
    setSheet(true); nav.toast(t(`Code sent to +91 98765 43210`, `+91 98765 43210 पर कोड भेजा गया`, `+91 98765 43210 ’ਤੇ ਕੋਡ ਭੇਜਿਆ ਗਿਆ`));
  };
  const keep = () => { nav.back(); nav.toast(t('Your account stays', 'आपका खाता बना रहेगा', 'ਤੁਹਾਡਾ ਖਾਤਾ ਬਣਿਆ ਰਹੇਗਾ')); };
  const confirm = () => {
    if (code !== DELETE_CODE) { setWrong(true); return; }
    setSheet(false); set({ signedIn: false }); nav.reset('signin.phone'); nav.toast(t('Account deleted. ₹240 sent to your UPI.', 'खाता हटाया गया। ₹240 आपके UPI पर भेजे गए।', 'ਖਾਤਾ ਹਟਾ ਦਿੱਤਾ ਗਿਆ। ₹240 ਤੁਹਾਡੇ UPI ’ਤੇ ਭੇਜੇ ਗਏ।'));
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Delete my account', 'मेरा खाता हटाएँ', 'ਮੇਰਾ ਖਾਤਾ ਹਟਾਓ')} onBack={nav.back} />
        <H>{t('Are you sure you want to leave?', 'क्या आप सच में जाना चाहते हैं?', 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?')}</H>
        <Card style={styles.list}>
          <H2>{t('This removes', 'इससे हट जाएगा', 'ਇਸ ਨਾਲ ਹਟ ਜਾਵੇਗਾ')}</H2>
          {DELETE_ITEMS.map(([en, hi, pa], i) => (
            <Pressable key={i} accessibilityRole="checkbox" accessibilityState={{ checked: ticked.includes(i) }} onPress={() => setTicked((l) => toggleIndex(l, i))}>
              <Lft style={styles.top}><Check on={ticked.includes(i)} /><T s style={styles.grow}>{t(en, hi, pa)}</T></Lft>
            </Pressable>
          ))}
        </Card>
        <Card tone="yellow">
          <T s color={palette.ink}><T s b color={palette.ink}>{t('You have ₹240 in your wallet.', 'आपके वॉलेट में ₹240 हैं।', 'ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ₹240 ਹਨ।')}</T> {t('We send it back to your UPI before closing the account.', 'खाता बंद करने से पहले हम इसे आपके UPI पर लौटा देंगे।', 'ਖਾਤਾ ਬੰਦ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਅਸੀਂ ਇਹ ਤੁਹਾਡੇ UPI ’ਤੇ ਵਾਪਸ ਭੇਜ ਦਿਆਂਗੇ।')}</T>
        </Card>
        <Card><T s m>{t('Bills and payment records are kept for the time the law requires, then removed.', 'बिल और भुगतान रिकॉर्ड कानून के तय समय तक रखे जाते हैं, फिर हटा दिए जाते हैं।', 'ਬਿੱਲ ਅਤੇ ਭੁਗਤਾਨ ਦੇ ਰਿਕਾਰਡ ਕਾਨੂੰਨ ਮੁਤਾਬਕ ਤੈਅ ਸਮੇਂ ਤੱਕ ਰੱਖੇ ਜਾਂਦੇ ਹਨ, ਫਿਰ ਹਟਾ ਦਿੱਤੇ ਜਾਂਦੇ ਹਨ।')}</T></Card>
        <Spacer />
        <Button style={{ backgroundColor: c.red }} onPress={sendCode}>{t('Send code and delete', 'कोड भेजें और हटाएँ', 'ਕੋਡ ਭੇਜੋ ਅਤੇ ਹਟਾਓ')}</Button>
        <Button variant="outline" style={{ borderColor: c.line }} textStyle={{ color: c.ink }} onPress={keep}>{t('Keep my account', 'मेरा खाता रखें', 'ਮੇਰਾ ਖਾਤਾ ਰੱਖੋ')}</Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H>{t('Enter the code', 'कोड डालें', 'ਕੋਡ ਪਾਓ')}</H>
        <T s m>{t('Use 4821 in this prototype.', 'इस प्रोटोटाइप में 4821 डालें।', 'ਇਸ ਪ੍ਰੋਟੋਟਾਈਪ ਵਿੱਚ 4821 ਪਾਓ।')}</T>
        <OtpInput value={code} error={wrong} onChange={(v) => { setCode(v); setWrong(false); }} />
        {wrong && <T s color={c.red}>{t('That code is not right.', 'यह कोड सही नहीं है।', 'ਇਹ ਕੋਡ ਸਹੀ ਨਹੀਂ ਹੈ।')}</T>}
        <Button style={{ backgroundColor: c.red }} disabled={code.length < 4} onPress={confirm}>{t('Delete my account', 'मेरा खाता हटाएँ', 'ਮੇਰਾ ਖਾਤਾ ਹਟਾਓ')}</Button>
      </Sheet>
    </View>
  );
}

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { gap: 9 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
