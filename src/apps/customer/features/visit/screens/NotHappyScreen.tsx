import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, CheckRow, H, H2, Input, Pill, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { notHappySampleNote, problems } from '../data';
import { tr } from '../../helpers';

/** Design page 06 · screen 9e, after the not-happy code. */
export function NotHappyScreen() {
  const nav = useNav();
  const t = useT();
  const [picked, setPicked] = useState<string[]>(['Work not finished']);
  const [text, setText] = useState(() => tr(t, notHappySampleNote));
  const toggle = (p: string) => setPicked((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]));
  const send = () => {
    nav.reset('bookings');
    nav.toast(t('Sent to support · ticket opened, they will call you by 11:20', 'सपोर्ट को भेजा · टिकट खुला, 11:20 तक कॉल आएगी', 'ਸਪੋਰਟ ਨੂੰ ਭੇਜਿਆ · ਟਿਕਟ ਖੁੱਲ੍ਹ ਗਈ, 11:20 ਤੱਕ ਕਾਲ ਆਵੇਗੀ'));
  };
  return (
    <Screen>
      <H>{t('Sorry the job was not right', 'माफ़ कीजिए, काम ठीक नहीं हुआ', 'ਮਾਫ਼ ਕਰਨਾ, ਕੰਮ ਠੀਕ ਨਹੀਂ ਹੋਇਆ')}</H>
      <Card style={styles.checks}>
        <CheckRow on label={t('Job closed with your not-happy code', 'आपके खुश-नहीं वाले कोड से काम बंद हुआ', 'ਤੁਹਾਡੇ ਖੁਸ਼-ਨਹੀਂ ਵਾਲੇ ਕੋਡ ਨਾਲ ਕੰਮ ਬੰਦ ਹੋਇਆ')} />
        <CheckRow on label={t('Your payment is on hold', 'आपका भुगतान रोका गया है', 'ਤੁਹਾਡਾ ਭੁਗਤਾਨ ਰੋਕਿਆ ਗਿਆ ਹੈ')} />
        <CheckRow on label={t('Support will call you by 11:20', 'सपोर्ट 11:20 तक कॉल करेगा', 'ਸਪੋਰਟ ਟੀਮ 11:20 ਤੱਕ ਕਾਲ ਕਰੇਗੀ')} />
      </Card>
      <H2>{t('What went wrong?', 'क्या गलत हुआ?', 'ਕੀ ਗੜਬੜ ਹੋਈ?')}</H2>
      <View style={styles.pills}>
        {problems.map(([en, hi, pa]) => (
          <Pill key={en} s sel={picked.includes(en)} onPress={() => toggle(en)} style={{ paddingHorizontal: 11 }}>{t(en, hi, pa)}</Pill>
        ))}
      </View>
      <Input small multiline value={text} onChangeText={setText} style={styles.note} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)', 'ਹੋਰ ਦੱਸੋ (ਜੇ ਚਾਹੋ)')} />
      <Spacer />
      <Button disabled={!picked.length && !text.trim()} onPress={send}>{t('Send to support', 'सपोर्ट को भेजें', 'ਸਪੋਰਟ ਨੂੰ ਭੇਜੋ')}</Button>
      <T s m center>{t('Codes are one-time: 3 per booking, shown only in your app.', 'कोड एक बार के हैं: हर बुकिंग में 3, सिर्फ़ आपके ऐप में।', 'ਕੋਡ ਇੱਕ ਵਾਰ ਦੇ ਹਨ: ਹਰ ਬੁਕਿੰਗ ਵਿੱਚ 3, ਸਿਰਫ਼ ਤੁਹਾਡੀ ਐਪ ਵਿੱਚ।')}</T>
    </Screen>
  );
}

export default NotHappyScreen;

const styles = StyleSheet.create({
  checks: { gap: 8 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  note: { minHeight: 58 },
});
