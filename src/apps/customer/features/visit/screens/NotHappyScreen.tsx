import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, CheckRow, H, H2, Input, Pill, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { problems } from '../data';

/** Design page 06 · screen 9e, after the not-happy code. */
export function NotHappyScreen() {
  const nav = useNav();
  const t = useT();
  const [picked, setPicked] = useState<string[]>(['Work not finished']);
  const [text, setText] = useState('Bathroom floor not mopped');
  const toggle = (p: string) => setPicked((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]));
  const send = () => {
    nav.reset('bookings');
    nav.toast(t('Sent to support · ticket opened, they will call you by 11:20', 'सपोर्ट को भेजा · टिकट खुला, 11:20 तक कॉल आएगी'));
  };
  return (
    <Screen>
      <H>{t('Sorry the job was not right', 'माफ़ कीजिए, काम ठीक नहीं हुआ')}</H>
      <Card style={styles.checks}>
        <CheckRow on label={t('Job closed with your not-happy code', 'आपके खुश-नहीं वाले कोड से काम बंद हुआ')} />
        <CheckRow on label={t('Your payment is on hold', 'आपका भुगतान रोका गया है')} />
        <CheckRow on label={t('Support will call you by 11:20', 'सपोर्ट 11:20 तक कॉल करेगा')} />
      </Card>
      <H2>{t('What went wrong?', 'क्या गलत हुआ?')}</H2>
      <View style={styles.pills}>
        {problems.map(([en, hi]) => (
          <Pill key={en} s sel={picked.includes(en)} onPress={() => toggle(en)} style={{ paddingHorizontal: 11 }}>{t(en, hi)}</Pill>
        ))}
      </View>
      <Input small multiline value={text} onChangeText={setText} style={styles.note} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)')} />
      <Spacer />
      <Button disabled={!picked.length && !text.trim()} onPress={send}>{t('Send to support', 'सपोर्ट को भेजें')}</Button>
      <T s m center>{t('Codes are one-time: 3 per booking, shown only in your app.', 'कोड एक बार के हैं: हर बुकिंग में 3, सिर्फ़ आपके ऐप में।')}</T>
    </Screen>
  );
}

export default NotHappyScreen;

const styles = StyleSheet.create({
  checks: { gap: 8 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  note: { minHeight: 58 },
});
