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
    const when = sel.map((d) => d).join(', ') + ' Nov';
    setApproved((a) => [{ when, why: reason === 'Other' && other ? other : reason, status: 'Pending' }, ...a]);
    setSel([]);
    nav.toast(t(`Request sent for ${when}. We reply within a day.`, `${when} के लिए अनुरोध भेजा।`));
  };
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={t('Time off', 'छुट्टी')} onBack={nav.back} />
        <H>{t('Which days are you away?', 'आप किन दिनों में नहीं होंगी?')}</H>
        <Grid cols={7} gap={5}>
          {timeOffDays.map((d) => <Pill key={d} sel={sel.includes(d)} onPress={() => toggle(d)}>{d}</Pill>)}
        </Grid>
        <H2>{t('Reason', 'कारण')}</H2>
        <Grid cols={2}>
          {timeOffReasons.map(([en, hi]) => <Pill key={en} sel={reason === en} onPress={() => setReason(en)}>{t(en, hi)}</Pill>)}
        </Grid>
        {reason === 'Other' && <Input small value={other} onChangeText={setOther} placeholder="Tell us a little" />}
        <Card tone="yellow"><T color={palette.ink}>Your monthly plan customer on these days will get another partner.</T></Card>
        <H2>{t('Already approved', 'पहले से मंज़ूर')}</H2>
        {approved.map((a, i) => (
          <Card key={a.when + i} row>
            <View style={styles.fill}><H2>{a.when}</H2><T s m>{a.why}</T></View>
            <Tag tone={a.status === 'Approved' ? 'n' : 'y'}>{a.status}</Tag>
          </Card>
        ))}
        <Spacer />
        <Button big disabled={n === 0} onPress={ask}>
          {n === 0 ? t('Pick the days first', 'पहले दिन चुनें') : t(`Ask for ${n} day${n > 1 ? 's' : ''} off`, `${n} दिन की छुट्टी माँगें`)}
        </Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default TimeOffScreen;
