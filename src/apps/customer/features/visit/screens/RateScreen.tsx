import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Grid, H, H2, Input, Pill, Screen, Spacer, Stars, useNav, useT } from '@/native/ui';
import { priceFor, rupees } from '@/domain';
import { rateTags, tips } from '../data';
import { useVisitState } from '../state';

/** Design page 04 · screen 11, rate and tip. */
export function RateScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useVisitState();
  const [stars, setStars] = useState(st.rating ?? 4);
  const [tags, setTags] = useState<string[]>(['On time', 'Thorough']);
  const [tip, setTip] = useState<number>(st.tip ?? 50);
  const [text, setText] = useState('');
  const toggleTag = (en: string) => setTags((l) => (l.includes(en) ? l.filter((x) => x !== en) : [...l, en]));
  const submit = () => {
    const minutes = st.minutes + (st.extraMinutes ?? 0);
    set({ rating: stars, tip, lastVisit: { service: st.service, minutes, price: priceFor(st.service, minutes) } });
    if (stars <= 2 && nav.has('ratingLow')) { nav.replace('ratingLow'); return; }
    nav.reset('bookings');
    nav.toast(tip ? t(`Thanks! ${rupees(tip)} tip goes to Sunita in full`, `धन्यवाद! ${rupees(tip)} टिप पूरी सुनीता को जाएगी`, `ਧੰਨਵਾਦ! ${rupees(tip)} ਟਿਪ ਪੂਰੀ ਸੁਨੀਤਾ ਨੂੰ ਜਾਵੇਗੀ`) : t('Thanks for rating', 'रेटिंग के लिए धन्यवाद', 'ਰੇਟਿੰਗ ਲਈ ਧੰਨਵਾਦ'));
  };
  return (
    <Screen>
      <Avatar face="sd" size={64} style={{ alignSelf: 'center', marginTop: 10 }} />
      <H center>{t('How was Sunita?', 'सुनीता का काम कैसा था?', 'ਸੁਨੀਤਾ ਦਾ ਕੰਮ ਕਿਵੇਂ ਸੀ?')}</H>
      <View style={styles.center}><Stars value={stars} onChange={setStars} size={30} /></View>
      <Grid cols={3}>
        {rateTags.map(([en, hi, pa]) => (
          <Pill key={en} s sel={tags.includes(en)} onPress={() => toggleTag(en)}>{t(en, hi, pa)}</Pill>
        ))}
      </Grid>
      <H2 style={{ marginTop: 6 }}>{t('Add a tip', 'टिप दें', 'ਟਿਪ ਦਿਓ')}</H2>
      <Grid cols={3}>
        {tips.map((n) => <Pill key={n} sel={tip === n} onPress={() => setTip(tip === n ? 0 : n)}>{rupees(n)}</Pill>)}
      </Grid>
      <Input small multiline value={text} onChangeText={setText} style={styles.note} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)', 'ਹੋਰ ਦੱਸੋ (ਜੇ ਚਾਹੋ)')} />
      <Spacer />
      <Button onPress={submit}>{t('Submit', 'भेजें', 'ਭੇਜੋ')}</Button>
    </Screen>
  );
}

export default RateScreen;

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  note: { minHeight: 60 },
});
