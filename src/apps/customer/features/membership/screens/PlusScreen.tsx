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
  const priceLabel = plan === 'yearly'
    ? t(`${rupees(plusYearly)} a year`, `${rupees(plusYearly)} साल का`, `${rupees(plusYearly)} ਸਾਲ ਦਾ`)
    : t(`${rupees(plusMonthly)} a month`, `${rupees(plusMonthly)} महीने का`, `${rupees(plusMonthly)} ਮਹੀਨੇ ਦਾ`);
  const join = () => {
    set({ plus: plan });
    nav.toast(t(`Welcome to Saathi Plus · ${priceLabel}`, `Saathi Plus में आपका स्वागत है · ${priceLabel}`, `Saathi Plus ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ · ${priceLabel}`));
  };
  const renews = () => nav.toast(member === 'yearly'
    ? t('You are on Plus yearly. Renews automatically.', 'आप प्लस सालाना पर हैं। अपने आप रिन्यू होगा।', 'ਤੁਸੀਂ ਪਲੱਸ ਸਾਲਾਨਾ ’ਤੇ ਹੋ। ਆਪਣੇ ਆਪ ਰੀਨਿਊ ਹੋਵੇਗਾ।')
    : t('You are on Plus monthly. Renews automatically.', 'आप प्लस मासिक पर हैं। अपने आप रिन्यू होगा।', 'ਤੁਸੀਂ ਪਲੱਸ ਮਹੀਨੇਵਾਰ ’ਤੇ ਹੋ। ਆਪਣੇ ਆਪ ਰੀਨਿਊ ਹੋਵੇਗਾ।'));
  return (
    <View style={styles.root}>
      <TopBar style={styles.inkBar}>
        <Row>
          <Tag>{t('Saathi Plus', 'Saathi Plus', 'Saathi Plus')}</Tag>
          {nav.canGoBack && <Pressable onPress={back} accessibilityRole="button" accessibilityLabel={t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ')}><Icon name="close" color={palette.white} /></Pressable>}
        </Row>
        <H size={22} color={palette.white} style={{ marginTop: 8 }}>{t('Never wait, never pay extra', 'न इंतज़ार, न ज़्यादा पैसे', 'ਨਾ ਉਡੀਕ, ਨਾ ਵਾਧੂ ਪੈਸੇ')}</H>
        <TopBar.Text dim style={{ marginTop: 2 }}>{t('For homes that book every week', 'हर हफ़्ते बुक करने वाले घरों के लिए', 'ਹਰ ਹਫ਼ਤੇ ਬੁੱਕ ਕਰਨ ਵਾਲੇ ਘਰਾਂ ਲਈ')}</TopBar.Text>
      </TopBar>
      <Screen>
        <Card style={styles.perks}>
          {PLUS_PERKS.map((p) => <Lft key={p.en}><Check on /><T style={styles.grow}>{t(p.en, p.hi, p.pa)}</T></Lft>)}
        </Card>
        <Grid cols={2}>
          <Card sel={plan === 'monthly'} onPress={() => setPlan('monthly')} style={styles.centre}>
            <T s m>{t('Monthly', 'मासिक', 'ਮਹੀਨੇਵਾਰ')}</T><H>{rupees(plusMonthly)}</H>
          </Card>
          <Card sel={plan === 'yearly'} onPress={() => setPlan('yearly')} style={styles.centre}>
            <T s m center>{t('Yearly · 2 months free', 'सालाना · 2 महीने मुफ़्त', 'ਸਾਲਾਨਾ · 2 ਮਹੀਨੇ ਮੁਫ਼ਤ')}</T><H>{rupees(plusYearly)}</H>
          </Card>
        </Grid>
        <T s m>
          {t(
            'You booked 9 visits last month. Plus would have saved about ₹140.',
            'पिछले महीने आपने 9 विज़िट बुक कीं। प्लस से लगभग ₹140 बचते।',
            'ਪਿਛਲੇ ਮਹੀਨੇ ਤੁਸੀਂ 9 ਵਿਜ਼ਿਟਾਂ ਬੁੱਕ ਕੀਤੀਆਂ। ਪਲੱਸ ਨਾਲ ਲਗਭਗ ₹140 ਬਚਦੇ।',
          )}
        </T>
        <Spacer />
        {member === plan
          ? <Button variant="outline" onPress={renews}>{t('You are a Plus member', 'आप प्लस सदस्य हैं', 'ਤੁਸੀਂ ਪਲੱਸ ਮੈਂਬਰ ਹੋ')} ✓</Button>
          : <Button onPress={join}>{member ? t('Switch to', 'बदलें', 'ਬਦਲੋ') : t('Join Plus', 'प्लस से जुड़ें', 'ਪਲੱਸ ਨਾਲ ਜੁੜੋ')} · {priceLabel}</Button>}
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
