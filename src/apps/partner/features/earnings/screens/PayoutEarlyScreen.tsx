import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Grid, H2, Hr, ListCard, Page, Pill, Row, Screen, Sheet, Spacer, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { payoutChoices, payoutHistory, startBalance, type Payout } from '../data';

/** Design page 26 · screen 35: take out earnings now (for a fee) or wait for the free Monday payout. */
export function PayoutEarlyScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const fee = decisions.partner.instantPayoutFee;
  const [balance, setBalance] = useState(startBalance);
  const [mode, setMode] = useState<'monday' | 'now'>('monday');
  const [amount, setAmount] = useState(startBalance);
  const [confirm, setConfirm] = useState(false);
  const [history, setHistory] = useState<Payout[]>(payoutHistory);
  const choices = payoutChoices(balance, fee);
  const take = Math.min(amount, balance);
  const takeOut = () => {
    setBalance((b) => b - take);
    setHistory((h) => [{ label: 'Taken early', date: 'Today', amount: take - fee }, ...h]);
    setConfirm(false); setMode('monday'); setAmount(500);
    nav.toast(`${rupees(take - fee)} on its way to State Bank`);
  };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('Ready to take out', 'निकालने के लिए तैयार')}</TopBar.Label>
        <TopBar.Title size={30}>{rupees(balance)}</TopBar.Title>
        <TopBar.Text dim>State Bank ···· 4821</TopBar.Text>
      </TopBar>
      <Screen>
        <Card row sel={mode === 'monday'} onPress={() => setMode('monday')}>
          <View><H2>{t(`Wait for ${decisions.partner.payoutDay}`, 'सोमवार तक रुकें')}</H2><T s m>{t('Free · comes on its own', 'मुफ़्त · अपने आप आएगा')}</T></View>
          <Tag tone="n">{t('No fee', 'कोई फ़ीस नहीं')}</Tag>
        </Card>
        <Card row sel={mode === 'now'} onPress={() => setMode('now')}>
          <View><H2>{t('Take it now', 'अभी निकालें')}</H2><T s m>{t('In your bank in a few minutes', 'कुछ मिनट में बैंक में')}</T></View>
          <Tag>{rupees(fee)} fee</Tag>
        </Card>
        {mode === 'now' && balance > fee && (
          <>
            <H2>{t('How much?', 'कितना?')}</H2>
            <Grid cols={4} gap={6}>
              {choices.map((v) => <Pill key={v} s sel={take === v} onPress={() => setAmount(v)}>{v === balance ? t('All', 'सब') : rupees(v)}</Pill>)}
            </Grid>
            <Button onPress={() => setConfirm(true)}>{t(`Take out ${rupees(take)} now`, `अभी ${rupees(take)} निकालें`)}</Button>
          </>
        )}
        <H2>{t('Earlier', 'पहले')}</H2>
        <ListCard gap={9}>
          {history.map((h, i) => (
            <Row key={h.date + i}><View><T b>{h.label}</T><T s m>{h.date}</T></View><T b>{rupees(h.amount)}</T></Row>
          ))}
        </ListCard>
        <Spacer />
        <Button variant="plain" onPress={() => nav.push('bank')}>{t('Change bank account', 'बैंक खाता बदलें')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>{t('Take out now?', 'अभी निकालें?')}</H2>
        <Card style={styles.receipt}>
          <Row><T>Amount</T><T b>{rupees(take)}</T></Row>
          <Row><T>Instant fee</T><T b>− {rupees(fee)}</T></Row>
          <Hr />
          <Row><T b>You get</T><T b color={c.accent}>{rupees(take - fee)}</T></Row>
        </Card>
        <T s m>To State Bank ···· 4821. The rest comes free on {decisions.partner.payoutDay}.</T>
        <Button onPress={takeOut}>{t(`Confirm · get ${rupees(take - fee)}`, `पक्का करें · ${rupees(take - fee)}`)}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>{t('Cancel', 'रद्द करें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  receipt: { gap: 8 },
});

export default PayoutEarlyScreen;
