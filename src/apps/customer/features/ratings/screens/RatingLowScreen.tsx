import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Grid, H, H2, Pill, Screen, Spacer, Stars, T, Toggle, useNav, useT, type ScreenProps } from '@/native/ui';
import { ConfirmFixSheet } from '../components/ConfirmFixSheet';
import { FixOptionCard } from '../components/FixOptionCard';
import { badVisitRefund, defaultBlocked, defaultWallet, fixOptions, lowReasons, type FixKind } from '../data';
import { useRatingState } from '../state';

/** Design page 13 · screen 45, when the rating is low (params `{ stars }`, default 2). */
export function RatingLowScreen({ params }: ScreenProps<{ stars?: number }>) {
  const nav = useNav();
  const t = useT();
  const [st, set] = useRatingState();
  const [reasons, setReasons] = useState<string[]>(['Work unfinished']);
  const [fix, setFix] = useState<FixKind>('reclean');
  const [block, setBlock] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const chosen = fixOptions.find((f) => f.k === fix)!;
  const toggleReason = (r: string) => setReasons(reasons.includes(r) ? reasons.filter((x) => x !== r) : [...reasons, r]);
  const done = () => {
    if (fix === 'refund') set({ walletBalance: (st.walletBalance ?? defaultWallet) + badVisitRefund });
    if (block) set((s) => ({ blocked: [...(s.blocked ?? defaultBlocked), 'Sunita D.'] }));
    setConfirm(false);
    nav.toast(chosen.done);
    nav.reset('bookings');
  };
  return (
    <View style={styles.root}>
      <Screen>
        <View style={styles.center}><Stars value={params.stars ?? 2} size={32} /></View>
        <H>{t('Sorry this visit was not good. What went wrong?', 'माफ़ कीजिए, विज़िट अच्छी नहीं रही। क्या गलत हुआ?')}</H>
        <Grid cols={2}>
          {lowReasons.map((r) => (
            <Pill key={r} sel={reasons.includes(r)} onPress={() => toggleReason(r)}>{r}</Pill>
          ))}
        </Grid>
        <H2 style={{ marginTop: 4 }}>{t('How should we fix it?', 'हम इसे कैसे ठीक करें?')}</H2>
        {fixOptions.map((f) => <FixOptionCard key={f.k} option={f} selected={fix === f.k} onPress={() => setFix(f.k)} />)}
        <Card row><T style={styles.grow}>Do not send this helper again</T><Toggle on={block} onChange={setBlock} /></Card>
        <Spacer />
        <Button disabled={!reasons.length} onPress={() => setConfirm(true)}>{t('Send', 'भेजें')}</Button>
      </Screen>
      <ConfirmFixSheet visible={confirm} fix={chosen} reasons={reasons} block={block} onConfirm={done} onClose={() => setConfirm(false)} />
    </View>
  );
}

export default RatingLowScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { alignItems: 'center' },
  grow: { flex: 1 },
});
