import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Col, Grid, H2, Page, Pill, ProgressBar, Row, Screen, Sheet, Spacer, T, Toggle, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { rupees, weekAhead } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { perPayoutChoices, savingsGoal, savingsRecent, savingsStart, tipsPerWeek, type SavingsLine } from '../data';

/** Design page 32 · screen 58: savings pot towards a goal, filled from payouts and tips. */
export function SavingsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const goal = savingsGoal;
  const [bal, setBal] = useState(savingsStart);
  const [fromPayout, setFromPayout] = useState(true);
  const [perPayout, setPerPayout] = useState(200);
  const [tips, setTips] = useState(true);
  const [recent, setRecent] = useState<SavingsLine[]>(savingsRecent);
  const [out, setOut] = useState(false);
  const [outAmt, setOutAmt] = useState(1000);
  const weekly = (fromPayout ? perPayout : 0) + (tips ? tipsPerWeek : 0);
  const left = Math.max(0, goal - bal);
  const takeOut = () => {
    const a = Math.min(outAmt, bal);
    setBal(bal - a);
    setRecent((r) => [{ label: 'Today · taken out', amt: -a }, ...r]);
    setOut(false);
    nav.toast(`${rupees(a)} sent to your bank`);
  };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Text dim>{t('My savings pot', 'मेरी बचत')}</TopBar.Text>
        <TopBar.Title size={30}>{rupees(bal)}</TopBar.Title>
        <TopBar.Text dim>For: daughter's school fees · {rupees(goal)}</TopBar.Text>
        <ProgressBar value={bal / goal} style={{ marginTop: 10 }} />
      </TopBar>
      <Screen>
        <Card>
          <Row>
            <View style={styles.grow}><H2>Save from every payout</H2><T s m>{fromPayout ? `₹${perPayout} each Monday` : 'Off'}</T></View>
            <Toggle on={fromPayout} onChange={setFromPayout} />
          </Row>
          {fromPayout && (
            <Grid cols={4} gap={6} style={{ marginTop: 9 }}>
              {perPayoutChoices.map((a) => <Pill key={a} s sel={perPayout === a} onPress={() => setPerPayout(a)}>₹{a}</Pill>)}
            </Grid>
          )}
        </Card>
        <Card row>
          <View style={styles.grow}><H2>Save my tips</H2><T s m>About ₹250 a week</T></View>
          <Toggle on={tips} onChange={setTips} />
        </Card>
        <Card sel={weekly > 0} tone={weekly > 0 ? undefined : 'red'}>
          {left === 0 ? <H2>Goal reached · well done!</H2>
            : weekly > 0 ? <><H2>You will reach {rupees(goal)} by {weekAhead(left / weekly)}</H2><T s m>At ₹{weekly} a week</T></>
            : <><H2>Saving is off</H2><T s m>Turn on a saving above to reach your goal.</T></>}
        </Card>
        <H2>{t('Recent', 'हाल में')}</H2>
        <Card style={styles.list}>
          {recent.map((r, i) => (
            <Row key={i}><T m>{r.label}</T><T b color={r.amt > 0 ? c.accent : c.red}>{r.amt > 0 ? '+' : '−'} {rupees(Math.abs(r.amt))}</T></Row>
          ))}
        </Card>
        <Spacer />
        <Button variant="outline" disabled={bal === 0} onPress={() => setOut(true)}>{t('Take money out', 'पैसे निकालें')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={out} onClose={() => setOut(false)}>
        <H2>{t('Take money out', 'पैसे निकालें')}</H2>
        <Grid cols={3}>
          {[1000, 2000, bal].map((a, i) => <Pill key={i} sel={outAmt === a} onPress={() => setOutAmt(a)}>{i === 2 ? 'All' : rupees(a)}</Pill>)}
        </Grid>
        <Col gap={2}><T s m>Reaches State Bank ···· 4821 in a few minutes. No charge.</T><T s m>Held by our licensed bank partner.</T></Col>
        <Button disabled={outAmt > bal} onPress={takeOut}>{t('Take out', 'निकालें')} {rupees(Math.min(outAmt, bal))}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  list: { gap: 8 },
});

export default SavingsScreen;
