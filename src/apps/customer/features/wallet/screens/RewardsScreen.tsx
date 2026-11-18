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
  const { c } = useTheme();
  const { points, cost, off, canRedeem, canFreeMinutes, gold, toGold, redeem, takeFreeMinutes } = useRewards();
  const [confirm, setConfirm] = useState(false);
  const spendPoints = () => { redeem(); setConfirm(false); nav.toast(`${rupees(off)} off added to your next visit`); };
  const freeMinutes = () => { takeFreeMinutes(); nav.toast('30 free minutes added to your next visit'); };
  const go = (route?: string) => route && (route === 'home' ? nav.reset(route) : nav.push(route));
  return (
    <View style={styles.root}>
      <BalanceHeader label="Saathi points" value={points}>
        <ProgressBar value={toGold} style={{ marginTop: 10 }} />
        <TopBar.Text dim style={{ marginTop: 4 }}>{gold ? 'Gold member' : `Silver · ${GOLD_POINTS - points} more points to Gold`}</TopBar.Text>
      </BalanceHeader>
      <Screen>
        <H2>{t('Use your points', 'अपने पॉइंट्स इस्तेमाल करें')}</H2>
        <Card row style={{ opacity: canRedeem ? 1 : 0.6 }}>
          <View><H2>{rupees(off)} off a visit</H2><T s m>{cost} points{canRedeem ? '' : ` · ${cost - points} more needed`}</T></View>
          {canRedeem && <Button style={{ paddingVertical: 7, paddingHorizontal: 14 }} textStyle={styles.smallLabel} onPress={() => setConfirm(true)}>{t('Use', 'इस्तेमाल करें')}</Button>}
        </Card>
        <Card row style={{ opacity: canFreeMinutes ? 1 : 0.6 }} onPress={canFreeMinutes ? freeMinutes : undefined}>
          <View><H2>30 minutes free</H2><T s m>{`${FREE_MINUTES_POINTS} points`}{canFreeMinutes ? '' : ` · ${FREE_MINUTES_POINTS - points} more needed`}</T></View>
        </Card>
        <H2>{t('Earn more', 'और कमाएँ')}</H2>
        <ListCard gap={9}>
          {EARN_POINTS.map(([l, n, route]) => (
            <Row key={l}><Link color={undefined} onPress={() => go(route)}><T>{l}</T></Link><T b color={c.accent}>+{n}</T></Row>
          ))}
        </ListCard>
        <T s m>Gold members get the helper they favourite first.</T>
      </Screen>
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>Use {cost} points?</H2>
        <T m>You get {rupees(off)} off your next visit. {points - cost} points will be left.</T>
        <Grid cols={2}>
          <Button variant="outline" onPress={() => setConfirm(false)}>Not now</Button>
          <Button onPress={spendPoints}>Use points</Button>
        </Grid>
      </Sheet>
    </View>
  );
}

export default RewardsScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  smallLabel: { fontSize: 12 },
});
