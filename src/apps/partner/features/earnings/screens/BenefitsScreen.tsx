import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button, H, H2, Lft, Page, Screen, Sheet, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { BenefitCard } from '../components/BenefitCard';
import { benefits, claimSteps } from '../data';

/** Design page 31 · screen 51: accident cover, health check-up, sick days and family cover. */
export function BenefitsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [open, setOpen] = useState<string | null>(null);
  const [claim, setClaim] = useState(false);
  const actions: Record<string, React.ReactNode> = {
    health: <Pressable onPress={() => nav.toast('Check-up booked for 3 March, 9 am')} accessibilityRole="button"><T s b color={c.accent}>Book check-up</T></Pressable>,
    sick: <Pressable onPress={() => nav.push('timeOff')} accessibilityRole="button"><T s b color={c.accent}>Take a sick day</T></Pressable>,
  };
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My benefits', 'मेरे फ़ायदे')}</H>
        {benefits.map((b) => (
          <BenefitCard key={b.id} benefit={b} open={open === b.id} onToggle={() => setOpen(open === b.id ? null : b.id)} action={actions[b.id]} />
        ))}
        <Spacer />
        <Button variant="outline" onPress={() => setClaim(true)}>{t('How to make a claim', 'क्लेम कैसे करें')}</Button>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={claim} onClose={() => setClaim(false)}>
        <H2>{t('How to make a claim', 'क्लेम कैसे करें')}</H2>
        {claimSteps.map((s, i) => (
          <Lft key={s} style={styles.step}><Tag tone="n">{String(i + 1)}</Tag><T style={styles.grow}>{s}</T></Lft>
        ))}
        <T s m>Through our licensed insurance partner.</T>
        <Button icon="call" onPress={() => { setClaim(false); nav.toast('Calling claims helpline…'); }}>{t('Start a claim', 'क्लेम शुरू करें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  step: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});

export default BenefitsScreen;
