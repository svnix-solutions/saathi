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
    const title = method === 'upi'
      ? { en: 'Added from UPI', hi: 'UPI से जोड़े', pa: 'UPI ਤੋਂ ਜੋੜੇ' }
      : { en: 'Added from card', hi: 'कार्ड से जोड़े', pa: 'ਕਾਰਡ ਤੋਂ ਜੋੜੇ' };
    setTxns([{ title, sub: { en: 'Just now', hi: 'अभी', pa: 'ਹੁਣੇ' }, amt }, ...txns]);
    setSheet(false);
    nav.toast(t(`${rupees(amt)} added to your wallet`, `${rupees(amt)} आपके वॉलेट में जुड़ गए`, `${rupees(amt)} ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ਜੁੜ ਗਏ`));
  };
  const payFirst = (v: boolean) => { setFirst(v); nav.toast(v
    ? t('Wallet will be used first', 'पहले वॉलेट से पैसे कटेंगे', 'ਪਹਿਲਾਂ ਵਾਲੇਟ ’ਚੋਂ ਪੈਸੇ ਕੱਟੇ ਜਾਣਗੇ')
    : t('Wallet will not be used automatically', 'वॉलेट अपने आप इस्तेमाल नहीं होगा', 'ਵਾਲੇਟ ਆਪਣੇ ਆਪ ਨਹੀਂ ਵਰਤਿਆ ਜਾਵੇਗਾ')); };
  return (
    <View style={styles.root}>
      <BalanceHeader label={t('Saathi wallet', 'Saathi वॉलेट', 'Saathi ਵਾਲੇਟ')} value={rupees(balance)}>
        <TopBar.Text dim>{t('Used first on your next booking', 'अगली बुकिंग में पहले यही इस्तेमाल होगा', 'ਅਗਲੀ ਬੁਕਿੰਗ ਵਿੱਚ ਪਹਿਲਾਂ ਇਹੀ ਵਰਤਿਆ ਜਾਵੇਗਾ')}</TopBar.Text>
      </BalanceHeader>
      <Screen>
        <H2>{t('Add money', 'पैसे जोड़ें', 'ਪੈਸੇ ਜੋੜੋ')}</H2>
        <Grid cols={3}>{TOP_UP_AMOUNTS.map((a) => <Pill key={a} sel={a === amt} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}</Grid>
        <Button style={{ paddingVertical: 11 }} onPress={() => setSheet(true)}>{t(`Add ${rupees(amt)}`, `${rupees(amt)} जोड़ें`, `${rupees(amt)} ਜੋੜੋ`)}</Button>
        <H2 style={{ marginTop: 4 }}>{t('Recent', 'हाल के', 'ਹਾਲ ਦੇ')}</H2>
        <ListCard gap={9}>
          {txns.map((x, i) => <TxnRow key={i} txn={x} />)}
        </ListCard>
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Pay from wallet first', 'पहले वॉलेट से भुगतान', 'ਪਹਿਲਾਂ ਵਾਲੇਟ ਤੋਂ ਭੁਗਤਾਨ')}</H2>
            <T s m>{t('Rest goes to UPI', 'बाकी UPI से', 'ਬਾਕੀ UPI ਤੋਂ')}</T>
          </View>
          <Toggle on={first} onChange={payFirst} />
        </Card>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t(`Add ${rupees(amt)} to wallet`, `वॉलेट में ${rupees(amt)} जोड़ें`, `ਵਾਲੇਟ ਵਿੱਚ ${rupees(amt)} ਜੋੜੋ`)}</H2>
        {TOP_UP_METHODS.map(([k, l, s]) => (
          <Card key={k} row sel={method === k} onPress={() => setMethod(k)}>
            <View style={styles.grow}><H2>{t(l.en, l.hi, l.pa)}</H2><T s m>{s}</T></View><Radio on={method === k} />
          </Card>
        ))}
        <T s m>{t(`New balance ${rupees(balance + amt)}`, `नया बैलेंस ${rupees(balance + amt)}`, `ਨਵਾਂ ਬੈਲੇਂਸ ${rupees(balance + amt)}`)}</T>
        <Button onPress={add}>{t(`Pay ${rupees(amt)}`, `${rupees(amt)} चुकाएँ`, `${rupees(amt)} ਭਰੋ`)}</Button>
      </Sheet>
    </View>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, grow: { flex: 1 } });
