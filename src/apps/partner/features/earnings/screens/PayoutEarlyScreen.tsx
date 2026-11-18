import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Grid, H2, Hr, ListCard, Page, Pill, Row, Screen, Sheet, Spacer, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { payoutChoices, payoutHistory, startBalance, takenEarly, todayTxt, tx, type Payout } from '../data';

/** Design page 26 · screen 35: take out earnings now (for a fee) or wait for the free Monday payout. */
export function PayoutEarlyScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
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
    setHistory((h) => [{ label: takenEarly, date: todayTxt, amount: take - fee }, ...h]);
    setConfirm(false); setMode('monday'); setAmount(500);
    nav.toast(t(`${rupees(take - fee)} on its way to State Bank`, `${rupees(take - fee)} स्टेट बैंक में भेजे जा रहे हैं`, `${rupees(take - fee)} ਸਟੇਟ ਬੈਂਕ ਵਿੱਚ ਭੇਜੇ ਜਾ ਰਹੇ ਹਨ`));
  };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('Ready to take out', 'निकालने के लिए तैयार', 'ਕੱਢਣ ਲਈ ਤਿਆਰ')}</TopBar.Label>
        <TopBar.Title size={30}>{rupees(balance)}</TopBar.Title>
        <TopBar.Text dim>{t('State Bank ···· 4821', 'स्टेट बैंक ···· 4821', 'ਸਟੇਟ ਬੈਂਕ ···· 4821')}</TopBar.Text>
      </TopBar>
      <Screen>
        <Card row sel={mode === 'monday'} onPress={() => setMode('monday')}>
          <View style={styles.grow}><H2>{t(`Wait for ${decisions.partner.payoutDay}`, 'सोमवार तक रुकें', 'ਸੋਮਵਾਰ ਤੱਕ ਰੁਕੋ')}</H2><T s m>{t('Free · comes on its own', 'मुफ़्त · अपने आप आएगा', 'ਮੁਫ਼ਤ · ਆਪਣੇ ਆਪ ਆਵੇਗਾ')}</T></View>
          <Tag tone="n">{t('No fee', 'कोई फ़ीस नहीं', 'ਕੋਈ ਫ਼ੀਸ ਨਹੀਂ')}</Tag>
        </Card>
        <Card row sel={mode === 'now'} onPress={() => setMode('now')}>
          <View style={styles.grow}><H2>{t('Take it now', 'अभी निकालें', 'ਹੁਣੇ ਕੱਢੋ')}</H2><T s m>{t('In your bank in a few minutes', 'कुछ मिनट में बैंक में', 'ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ ਬੈਂਕ ਵਿੱਚ')}</T></View>
          <Tag>{t(`${rupees(fee)} fee`, `${rupees(fee)} फ़ीस`, `${rupees(fee)} ਫ਼ੀਸ`)}</Tag>
        </Card>
        {mode === 'now' && balance > fee && (
          <>
            <H2>{t('How much?', 'कितना?', 'ਕਿੰਨਾ?')}</H2>
            <Grid cols={device === 'small' ? 2 : 4} gap={6}>
              {choices.map((v) => <Pill key={v} s sel={take === v} onPress={() => setAmount(v)}>{v === balance ? t('All', 'सब', 'ਸਾਰੇ') : rupees(v)}</Pill>)}
            </Grid>
            <Button onPress={() => setConfirm(true)}>{t(`Take out ${rupees(take)} now`, `अभी ${rupees(take)} निकालें`, `ਹੁਣੇ ${rupees(take)} ਕੱਢੋ`)}</Button>
          </>
        )}
        <H2>{t('Earlier', 'पहले', 'ਪਹਿਲਾਂ')}</H2>
        <ListCard gap={9}>
          {history.map((h, i) => (
            <Row key={h.date.en + i}><View style={styles.grow}><T b>{tx(t, h.label)}</T><T s m>{tx(t, h.date)}</T></View><T b>{rupees(h.amount)}</T></Row>
          ))}
        </ListCard>
        <Spacer />
        <Button variant="plain" onPress={() => nav.push('bank')}>{t('Change bank account', 'बैंक खाता बदलें', 'ਬੈਂਕ ਖਾਤਾ ਬਦਲੋ')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>{t('Take out now?', 'अभी निकालें?', 'ਹੁਣੇ ਕੱਢਣੇ ਹਨ?')}</H2>
        <Card style={styles.receipt}>
          <Row><T>{t('Amount', 'रकम', 'ਰਕਮ')}</T><T b>{rupees(take)}</T></Row>
          <Row><T>{t('Instant fee', 'तुरंत निकालने की फ़ीस', 'ਤੁਰੰਤ ਕੱਢਣ ਦੀ ਫ਼ੀਸ')}</T><T b>− {rupees(fee)}</T></Row>
          <Hr />
          <Row><T b>{t('You get', 'आपको मिलेंगे', 'ਤੁਹਾਨੂੰ ਮਿਲਣਗੇ')}</T><T b color={c.accent}>{rupees(take - fee)}</T></Row>
        </Card>
        <T s m>{t(`To State Bank ···· 4821. The rest comes free on ${decisions.partner.payoutDay}.`, 'स्टेट बैंक ···· 4821 में। बाकी सोमवार को मुफ़्त आएगा।', 'ਸਟੇਟ ਬੈਂਕ ···· 4821 ਵਿੱਚ। ਬਾਕੀ ਸੋਮਵਾਰ ਨੂੰ ਮੁਫ਼ਤ ਆਵੇਗਾ।')}</T>
        <Button onPress={takeOut}>{t(`Confirm · get ${rupees(take - fee)}`, `पक्का करें · ${rupees(take - fee)}`, `ਪੱਕਾ ਕਰੋ · ${rupees(take - fee)}`)}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>{t('Cancel', 'रद्द करें', 'ਰੱਦ ਕਰੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  receipt: { gap: 8 },
  grow: { flex: 1 },
});

export default PayoutEarlyScreen;
