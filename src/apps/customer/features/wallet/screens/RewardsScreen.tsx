/** Design page 13 · Ratings, reviews and rewards — screen 47 · Rewards. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Grid, H2, Link, ListCard, ProgressBar, Row, Screen, Sheet, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { BalanceHeader } from '../components/BalanceHeader';
import { useRewards } from '../hooks/useRewards';
import { EARN_POINTS, FREE_MINUTES_POINTS, GOLD_POINTS } from '../data';

export function RewardsScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const { points, cost, off, canRedeem, canFreeMinutes, gold, toGold, redeem, takeFreeMinutes } = useRewards();
  const [confirm, setConfirm] = useState(false);
  const spendPoints = () => { redeem(); setConfirm(false); nav.toast(t(`${rupees(off)} off added to your next visit`, `अगली विज़िट पर ${rupees(off)} की छूट जुड़ गई`, `ਅਗਲੀ ਵਿਜ਼ਿਟ ’ਤੇ ${rupees(off)} ਦੀ ਛੋਟ ਜੁੜ ਗਈ`)); };
  const freeMinutes = () => { takeFreeMinutes(); nav.toast(t('30 free minutes added to your next visit', 'अगली विज़िट में 30 मिनट मुफ़्त जुड़ गए', 'ਅਗਲੀ ਵਿਜ਼ਿਟ ਵਿੱਚ 30 ਮਿੰਟ ਮੁਫ਼ਤ ਜੁੜ ਗਏ')); };
  /** "300 points", plus " · 80 more needed" while the balance is short. */
  const pointsLine = (need: number) => {
    const short = need - points;
    return short > 0
      ? t(`${need} points · ${short} more needed`, `${need} पॉइंट · ${short} और चाहिए`, `${need} ਪੁਆਇੰਟ · ${short} ਹੋਰ ਚਾਹੀਦੇ`)
      : t(`${need} points`, `${need} पॉइंट`, `${need} ਪੁਆਇੰਟ`);
  };
  const go = (route?: string) => route && (route === 'home' ? nav.reset(route) : nav.push(route));
  return (
    <View style={styles.root}>
      <BalanceHeader label={t('Saathi points', 'Saathi पॉइंट', 'Saathi ਪੁਆਇੰਟ')} value={points}>
        <ProgressBar value={toGold} style={{ marginTop: 10 }} />
        <TopBar.Text dim style={{ marginTop: 4 }}>{gold
          ? t('Gold member', 'गोल्ड सदस्य', 'ਗੋਲਡ ਮੈਂਬਰ')
          : t(`Silver · ${GOLD_POINTS - points} more points to Gold`, `सिल्वर · गोल्ड के लिए ${GOLD_POINTS - points} पॉइंट और`, `ਸਿਲਵਰ · ਗੋਲਡ ਲਈ ${GOLD_POINTS - points} ਪੁਆਇੰਟ ਹੋਰ`)}</TopBar.Text>
      </BalanceHeader>
      <Screen>
        <H2>{t('Use your points', 'अपने पॉइंट्स इस्तेमाल करें', 'ਆਪਣੇ ਪੁਆਇੰਟ ਵਰਤੋ')}</H2>
        <Card row style={{ opacity: canRedeem ? 1 : 0.6 }}>
          <View style={styles.grow}>
            <H2>{t(`${rupees(off)} off a visit`, `एक विज़िट पर ${rupees(off)} की छूट`, `ਇੱਕ ਵਿਜ਼ਿਟ ’ਤੇ ${rupees(off)} ਦੀ ਛੋਟ`)}</H2>
            <T s m>{pointsLine(cost)}</T>
          </View>
          {canRedeem && <Button style={{ paddingVertical: 7, paddingHorizontal: 14 }} textStyle={styles.smallLabel} onPress={() => setConfirm(true)}>{t('Use', 'इस्तेमाल करें', 'ਵਰਤੋ')}</Button>}
        </Card>
        <Card row style={{ opacity: canFreeMinutes ? 1 : 0.6 }} onPress={canFreeMinutes ? freeMinutes : undefined}>
          <View style={styles.grow}>
            <H2>{t('30 minutes free', '30 मिनट मुफ़्त', '30 ਮਿੰਟ ਮੁਫ਼ਤ')}</H2>
            <T s m>{pointsLine(FREE_MINUTES_POINTS)}</T>
          </View>
        </Card>
        <H2>{t('Earn more', 'और कमाएँ', 'ਹੋਰ ਕਮਾਓ')}</H2>
        <ListCard gap={9}>
          {EARN_POINTS.map(([l, n, route]) => (
            <Row key={l.en}><Link color={undefined} style={styles.grow} onPress={() => go(route)}><T>{t(l.en, l.hi, l.pa)}</T></Link><T b color={c.accent}>+{n}</T></Row>
          ))}
        </ListCard>
        <T s m>{t('Gold members get the helper they favourite first.', 'गोल्ड सदस्यों को उनका पसंदीदा हेल्पर पहले मिलता है।', 'ਗੋਲਡ ਮੈਂਬਰਾਂ ਨੂੰ ਉਹਨਾਂ ਦਾ ਪਸੰਦੀਦਾ ਹੈਲਪਰ ਪਹਿਲਾਂ ਮਿਲਦਾ ਹੈ।')}</T>
      </Screen>
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>{t(`Use ${cost} points?`, `${cost} पॉइंट इस्तेमाल करें?`, `${cost} ਪੁਆਇੰਟ ਵਰਤਣੇ ਹਨ?`)}</H2>
        <T m>{t(
          `You get ${rupees(off)} off your next visit. ${points - cost} points will be left.`,
          `अगली विज़िट पर ${rupees(off)} की छूट मिलेगी। ${points - cost} पॉइंट बचेंगे।`,
          `ਅਗਲੀ ਵਿਜ਼ਿਟ ’ਤੇ ${rupees(off)} ਦੀ ਛੋਟ ਮਿਲੇਗੀ। ${points - cost} ਪੁਆਇੰਟ ਬਚਣਗੇ।`,
        )}</T>
        <Grid cols={device === 'small' ? 1 : 2}>
          <Button variant="outline" onPress={() => setConfirm(false)}>{t('Not now', 'अभी नहीं', 'ਹੁਣ ਨਹੀਂ')}</Button>
          <Button onPress={spendPoints}>{t('Use points', 'पॉइंट इस्तेमाल करें', 'ਪੁਆਇੰਟ ਵਰਤੋ')}</Button>
        </Grid>
      </Sheet>
    </View>
  );
}

export default RewardsScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  smallLabel: { fontSize: 12 },
  grow: { flex: 1 },
});
