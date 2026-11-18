import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button, H, H2, Lft, Page, Screen, Sheet, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { BenefitCard } from '../components/BenefitCard';
import { benefits, claimSteps, tx } from '../data';

/** Design page 31 · screen 51: accident cover, health check-up, sick days and family cover. */
export function BenefitsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [open, setOpen] = useState<string | null>(null);
  const [claim, setClaim] = useState(false);
  const actions: Record<string, React.ReactNode> = {
    health: <Pressable onPress={() => nav.toast(t('Check-up booked for 3 March, 9 am', 'चेक-अप 3 मार्च, सुबह 9 बजे बुक हुआ', 'ਜਾਂਚ 3 ਮਾਰਚ, ਸਵੇਰੇ 9 ਵਜੇ ਬੁੱਕ ਹੋਈ'))} accessibilityRole="button"><T s b color={c.accent}>{t('Book check-up', 'चेक-अप बुक करें', 'ਜਾਂਚ ਬੁੱਕ ਕਰੋ')}</T></Pressable>,
    sick: <Pressable onPress={() => nav.push('timeOff')} accessibilityRole="button"><T s b color={c.accent}>{t('Take a sick day', 'बीमारी की छुट्टी लें', 'ਬਿਮਾਰੀ ਦੀ ਛੁੱਟੀ ਲਓ')}</T></Pressable>,
  };
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My benefits', 'मेरे फ़ायदे', 'ਮੇਰੇ ਫ਼ਾਇਦੇ')}</H>
        {benefits.map((b) => (
          <BenefitCard key={b.id} benefit={b} open={open === b.id} onToggle={() => setOpen(open === b.id ? null : b.id)} action={actions[b.id]} />
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => setClaim(true)}>{t('How to make a claim', 'क्लेम कैसे करें', 'ਕਲੇਮ ਕਿਵੇਂ ਕਰੀਏ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={claim} onClose={() => setClaim(false)}>
        <H2>{t('How to make a claim', 'क्लेम कैसे करें', 'ਕਲੇਮ ਕਿਵੇਂ ਕਰੀਏ')}</H2>
        {claimSteps.map((s, i) => (
          <Lft key={s.en} style={styles.step}><Tag tone="n">{String(i + 1)}</Tag><T style={styles.grow}>{tx(t, s)}</T></Lft>
        ))}
        <T s m>{t('Through our licensed insurance partner.', 'हमारे लाइसेंस वाले बीमा पार्टनर के ज़रिए।', 'ਸਾਡੇ ਲਾਇਸੈਂਸ ਵਾਲੇ ਬੀਮਾ ਪਾਰਟਨਰ ਰਾਹੀਂ।')}</T>
        <Button icon="call" onPress={() => { setClaim(false); nav.toast(t('Calling claims helpline…', 'क्लेम हेल्पलाइन पर फ़ोन जा रहा है…', 'ਕਲੇਮ ਹੈਲਪਲਾਈਨ ਤੇ ਫ਼ੋਨ ਜਾ ਰਿਹਾ ਹੈ…')); }}>{t('Start a claim', 'क्लेम शुरू करें', 'ਕਲੇਮ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  step: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});

export default BenefitsScreen;
