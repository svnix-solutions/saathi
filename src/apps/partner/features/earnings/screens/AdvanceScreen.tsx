import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Grid, H2, Icon, Lft, Page, Pill, Screen, Sheet, Spacer, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { AmountLine } from '../components/AmountLine';
import { advanceAmounts, advanceWeeks } from '../data';

/** Design page 31 · screen 52: take up to ₹3,000 ahead, paid back from Monday payouts with no interest. */
export function AdvanceScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [amt, setAmt] = useState(2000);
  const [weeks, setWeeks] = useState(4);
  const [sheet, setSheet] = useState(false);
  const [taken, setTaken] = useState(false);
  const each = Math.round(amt / weeks);
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Text dim>{t('You can take ahead', 'आप पहले ले सकती हैं')}</TopBar.Text>
        <TopBar.Title size={30}>up to ₹3,000</TopBar.Title>
        <TopBar.Text dim>Based on 6 weeks of steady work</TopBar.Text>
      </TopBar>
      <Screen>
        {taken ? (
          <Card tone="mint">
            <Lft><Icon name="check" color={c.accent} /><H2>{rupees(amt)} sent to State Bank ···· 4821</H2></Lft>
            <T s m style={{ marginTop: 4 }}>{rupees(each)} will be taken each {decisions.partner.payoutDay} for {weeks} weeks.</T>
          </Card>
        ) : null}
        <H2>{t('How much do you need?', 'कितने पैसे चाहिए?')}</H2>
        <Grid cols={3}>
          {advanceAmounts.map((a) => <Pill key={a} sel={amt === a} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}
        </Grid>
        <H2>{t('Pay back from earnings', 'कमाई से वापस')}</H2>
        <Grid cols={2}>
          {advanceWeeks.map((w) => <Pill key={w} sel={weeks === w} onPress={() => setWeeks(w)}>{w} weeks</Pill>)}
        </Grid>
        <Card style={styles.summary}>
          <AmountLine label="You get today" value={rupees(amt)} />
          <AmountLine label="Taken each Monday" value={rupees(each)} />
          <AmountLine label="Extra charge" value="₹0" accent />
        </Card>
        <T s m>No interest. If you earn less in a week, we take less that week.</T>
        <Spacer />
        <Button disabled={taken} style={{ paddingVertical: 16 }} textStyle={styles.bigLabel} onPress={() => setSheet(true)}>
          {taken ? t('Advance taken', 'एडवांस ले लिया') : `${t('Get', 'लें')} ${rupees(amt)} ${t('now', 'अभी')}`}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Confirm your advance', 'एडवांस पक्का करें')}</H2>
        <Card style={styles.summary}>
          <AmountLine label="Sent now to" value="State Bank ···· 4821" />
          <AmountLine label="Amount" value={rupees(amt)} />
          <AmountLine label="Paid back" value={<>{rupees(each)} × {weeks} Mondays</>} />
          <AmountLine label="Interest" value="₹0" accent />
        </Card>
        <Lft style={styles.top}><Icon name="shield" size={14} color={c.mut} /><T s m style={styles.grow}>Advances are given by our licensed bank partner. Saathi takes the repayment from your payout.</T></Lft>
        <Button onPress={() => { setSheet(false); setTaken(true); nav.toast(`${rupees(amt)} is on its way to your bank`); }}>{t('Confirm', 'पक्का करें')} · {rupees(amt)}</Button>
        <Button variant="outline" onPress={() => setSheet(false)}>{t('Not now', 'अभी नहीं')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  summary: { gap: 7 },
  bigLabel: { fontSize: 15 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});

export default AdvanceScreen;
