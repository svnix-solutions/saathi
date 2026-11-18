/** Design page 27, screen 39 · Time off: pick the days away and a reason. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, H2, Input, Page, Pill, Screen, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { timeOffApproved, timeOffDays, timeOffReasons, type TimeOffRequest } from '../data';

export function TimeOffScreen() {
  const nav = useNav();
  const t = useT();
  const [sel, setSel] = useState<number[]>([19, 20]);
  const [reason, setReason] = useState<string>('Family');
  const [other, setOther] = useState('');
  const [approved, setApproved] = useState<TimeOffRequest[]>(timeOffApproved);
  const toggle = (d: number) => setSel((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d].sort((a, b) => a - b)));
  const n = sel.length;
  const ask = () => {
    const days = sel.join(', ');
    const when = { en: days + ' Nov', hi: days + ' नवंबर', pa: days + ' ਨਵੰਬਰ' };
    const r = timeOffReasons.find(([en]) => en === reason) ?? timeOffReasons[0];
    const why = reason === 'Other' && other ? { en: other, hi: other, pa: other } : { en: r[0], hi: r[1], pa: r[2] };
    setApproved((a) => [{ when, why, status: 'Pending' }, ...a]);
    setSel([]);
    nav.toast(t(`Request sent for ${when.en}. We reply within a day.`, `${when.hi} के लिए अनुरोध भेजा। एक दिन में जवाब देंगे।`, `${when.pa} ਲਈ ਬੇਨਤੀ ਭੇਜੀ। ਇੱਕ ਦਿਨ ਵਿੱਚ ਜਵਾਬ ਦੇਵਾਂਗੇ।`));
  };
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={t('Time off', 'छुट्टी', 'ਛੁੱਟੀ')} onBack={nav.back} />
        <H>{t('Which days are you away?', 'आप किन दिनों में नहीं होंगी?', 'ਤੁਸੀਂ ਕਿਹੜੇ ਦਿਨ ਨਹੀਂ ਹੋਵੋਗੇ?')}</H>
        <Grid cols={7} gap={5}>
          {timeOffDays.map((d) => <Pill key={d} sel={sel.includes(d)} onPress={() => toggle(d)}>{d}</Pill>)}
        </Grid>
        <H2>{t('Reason', 'कारण', 'ਕਾਰਨ')}</H2>
        <Grid cols={2}>
          {timeOffReasons.map(([en, hi, pa]) => <Pill key={en} sel={reason === en} onPress={() => setReason(en)}>{t(en, hi, pa)}</Pill>)}
        </Grid>
        {reason === 'Other' && <Input small value={other} onChangeText={setOther} placeholder={t('Tell us a little', 'थोड़ा बताइए', 'ਥੋੜ੍ਹਾ ਦੱਸੋ')} />}
        <Card tone="yellow"><T color={palette.ink}>{t('Your monthly plan customer on these days will get another partner.', 'इन दिनों आपके मासिक प्लान वाले ग्राहक को दूसरा पार्टनर मिलेगा।', 'ਇਹਨਾਂ ਦਿਨਾਂ ਵਿੱਚ ਤੁਹਾਡੇ ਮਹੀਨੇ ਦੇ ਪਲਾਨ ਵਾਲੇ ਗਾਹਕ ਨੂੰ ਕੋਈ ਹੋਰ ਪਾਰਟਨਰ ਮਿਲੇਗਾ।')}</T></Card>
        <H2>{t('Already approved', 'पहले से मंज़ूर', 'ਪਹਿਲਾਂ ਤੋਂ ਮਨਜ਼ੂਰ')}</H2>
        {approved.map((a, i) => (
          <Card key={a.when.en + i} row>
            <View style={styles.fill}><H2>{t(a.when.en, a.when.hi, a.when.pa)}</H2><T s m>{t(a.why.en, a.why.hi, a.why.pa)}</T></View>
            <Tag tone={a.status === 'Approved' ? 'n' : 'y'}>{a.status === 'Approved' ? t('Approved', 'मंज़ूर', 'ਮਨਜ਼ੂਰ') : t('Pending', 'बाकी', 'ਬਾਕੀ')}</Tag>
          </Card>
        ))}
        <Spacer />
        <Button big disabled={n === 0} onPress={ask}>
          {n === 0 ? t('Pick the days first', 'पहले दिन चुनें', 'ਪਹਿਲਾਂ ਦਿਨ ਚੁਣੋ') : t(`Ask for ${n} day${n > 1 ? 's' : ''} off`, `${n} दिन की छुट्टी माँगें`, `${n} ਦਿਨ ਦੀ ਛੁੱਟੀ ਮੰਗੋ`)}
        </Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default TimeOffScreen;
