/** Design page 11 · Wallet, referrals and chat — screen 36 · Wallet. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Grid, H2, ListCard, Pill, Radio, Screen, Sheet, T, Toggle, TopBar, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { useCustomerState } from '../../../state';
import { BalanceHeader } from '../components/BalanceHeader';
import { TxnRow } from '../components/TxnRow';
import { SAMPLE_TXNS, TOP_UP_AMOUNTS, TOP_UP_METHODS, WALLET_BALANCE_DEFAULT, type TopUpMethod, type Txn } from '../data';

export function WalletScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const balance = st.walletBalance ?? WALLET_BALANCE_DEFAULT;
  const [amt, setAmt] = useState(500);
  const [first, setFirst] = useState(true);
  const [sheet, setSheet] = useState(false);
  const [method, setMethod] = useState<TopUpMethod>('upi');
  const [txns, setTxns] = useState<Txn[]>(SAMPLE_TXNS);
  const add = () => {
    set({ walletBalance: balance + amt });
    setTxns([{ title: `Added from ${method === 'upi' ? 'UPI' : 'card'}`, sub: 'Just now', amt }, ...txns]);
    setSheet(false);
    nav.toast(`${rupees(amt)} added to your wallet`);
  };
  const payFirst = (v: boolean) => { setFirst(v); nav.toast(v ? 'Wallet will be used first' : 'Wallet will not be used automatically'); };
  return (
    <View style={styles.root}>
      <BalanceHeader label="Saathi wallet" value={rupees(balance)}>
        <TopBar.Text dim>Used first on your next booking</TopBar.Text>
      </BalanceHeader>
      <Screen>
        <H2>{t('Add money', 'पैसे जोड़ें')}</H2>
        <Grid cols={3}>{TOP_UP_AMOUNTS.map((a) => <Pill key={a} sel={a === amt} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}</Grid>
        <Button style={{ paddingVertical: 11 }} onPress={() => setSheet(true)}>{t(`Add ${rupees(amt)}`, `${rupees(amt)} जोड़ें`)}</Button>
        <H2 style={{ marginTop: 4 }}>Recent</H2>
        <ListCard gap={9}>
          {txns.map((x, i) => <TxnRow key={i} txn={x} />)}
        </ListCard>
        <Card row>
          <View><H2>Pay from wallet first</H2><T s m>Rest goes to UPI</T></View>
          <Toggle on={first} onChange={payFirst} />
        </Card>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>Add {rupees(amt)} to wallet</H2>
        {TOP_UP_METHODS.map(([k, l, s]) => (
          <Card key={k} row sel={method === k} onPress={() => setMethod(k)}>
            <View><H2>{l}</H2><T s m>{s}</T></View><Radio on={method === k} />
          </Card>
        ))}
        <T s m>New balance {rupees(balance + amt)}</T>
        <Button onPress={add}>Pay {rupees(amt)}</Button>
      </Sheet>
    </View>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({ root: { flex: 1 } });
