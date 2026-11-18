/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 60 · Plus membership. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Check, Grid, H, Icon, Lft, Row, Screen, Spacer, T, Tag, TopBar, palette, useBack, useNav, useT } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { useCustomerState } from '../../../state';
import { PLUS_PERKS } from '../data';

type PlusPlan = 'monthly' | 'yearly';

export function PlusScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('account');
  const [st, set] = useCustomerState();
  const [plan, setPlan] = useState<PlusPlan>(st.plus ?? 'yearly');
  const { plusMonthly, plusYearly } = decisions.prices;
  const member = st.plus;
  const priceLabel = plan === 'yearly' ? `${rupees(plusYearly)} a year` : `${rupees(plusMonthly)} a month`;
  const join = () => {
    set({ plus: plan });
    nav.toast(t(`Welcome to Saathi Plus · ${plan === 'yearly' ? rupees(plusYearly) + ' a year' : rupees(plusMonthly) + ' a month'}`, 'साथी प्लस में आपका स्वागत है'));
  };
  return (
    <View style={styles.root}>
      <TopBar style={styles.inkBar}>
        <Row>
          <Tag>Saathi Plus</Tag>
          {nav.canGoBack && <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Close"><Icon name="close" color={palette.white} /></Pressable>}
        </Row>
        <H size={22} color={palette.white} style={{ marginTop: 8 }}>{t('Never wait, never pay extra', 'न इंतज़ार, न ज़्यादा पैसे')}</H>
        <TopBar.Text dim style={{ marginTop: 2 }}>For homes that book every week</TopBar.Text>
      </TopBar>
      <Screen>
        <Card style={styles.perks}>
          {PLUS_PERKS.map((p) => <Lft key={p}><Check on /><T style={styles.grow}>{p}</T></Lft>)}
        </Card>
        <Grid cols={2}>
          <Card sel={plan === 'monthly'} onPress={() => setPlan('monthly')} style={styles.centre}>
            <T s m>{t('Monthly', 'मासिक')}</T><H>{rupees(plusMonthly)}</H>
          </Card>
          <Card sel={plan === 'yearly'} onPress={() => setPlan('yearly')} style={styles.centre}>
            <T s m center>{t('Yearly · 2 months free', 'सालाना · 2 महीने मुफ़्त')}</T><H>{rupees(plusYearly)}</H>
          </Card>
        </Grid>
        <T s m>You booked 9 visits last month. Plus would have saved about ₹140.</T>
        <Spacer />
        {member === plan
          ? <Button variant="outline" onPress={() => nav.toast(`You are on Plus ${member}. Renews automatically.`)}>{t('You are a Plus member', 'आप प्लस सदस्य हैं')} ✓</Button>
          : <Button onPress={join}>{member ? t('Switch to', 'बदलें') : t('Join Plus', 'प्लस से जुड़ें')} · {priceLabel}</Button>}
      </Screen>
    </View>
  );
}

export default PlusScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  inkBar: { backgroundColor: palette.ink },
  perks: { gap: 10 },
  grow: { flex: 1 },
  centre: { alignItems: 'center' },
});
