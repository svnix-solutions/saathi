import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, H, H2, Input, Link, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { bankFromIfsc, cleanIfsc } from '../bank';
import { sampleBank, sampleProfile } from '../data';
import { useAccountState } from '../state';

/** Design page 24 (section 60), screen 26 · Bank account. */
export function BankScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAccountState();
  const [name, setName] = useState(st.fullName ?? sampleProfile.fullName);
  const [acct, setAcct] = useState(sampleBank.account);
  const [ifsc, setIfsc] = useState(sampleBank.ifsc);
  const [upi, setUpi] = useState(false);
  const [upiId, setUpiId] = useState(sampleBank.upiId);
  const [checking, setChecking] = useState(false);
  const bank = bankFromIfsc(ifsc);
  const save = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      set({ bankLabel: upi ? upiId : `${bank?.[0] ?? ''} ···· ${acct.slice(-4)}` });
      nav.toast(upi ? t('UPI ID checked and saved', 'UPI आईडी जाँचकर सेव') : t('₹1 received. Account saved.', '₹1 मिल गया। खाता सेव हुआ।'));
      if (nav.canGoBack) nav.back();
    }, 1200);
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Bank account', 'बैंक खाता')} onBack={nav.canGoBack ? nav.back : () => nav.reset('profile')} />
        <H>{t('Where should we send your pay?', 'आपकी कमाई कहाँ भेजें?')}</H>
        {upi ? (
          <>
            <H2>{t('UPI ID', 'UPI आईडी')}</H2>
            <Input value={upiId} onChangeText={setUpiId} placeholder="name@bank" />
            <T s m>{t('We send ₹1 to check the UPI ID is yours.', 'UPI आईडी आपकी है, यह जाँचने के लिए ₹1 भेजेंगे।')}</T>
          </>
        ) : (
          <>
            <H2>{t('Name on the account', 'खाते पर नाम')}</H2>
            <Input value={name} onChangeText={setName} />
            <H2>{t('Account number', 'खाता नंबर')}</H2>
            <Input value={acct} onChangeText={setAcct} keyboardType="number-pad" />
            <H2>{t('IFSC code', 'IFSC कोड')}</H2>
            <Input value={ifsc} onChangeText={(v) => setIfsc(cleanIfsc(v))} placeholder={sampleBank.ifsc} />
            {bank ? (
              <Card sel row>
                <View style={styles.fill}><H2>{bank[0]}</H2><T s m>{t(`${bank[1]} · found from the IFSC`, `${bank[1]} · IFSC से मिला`)}</T></View>
                <Check on size={18} />
              </Card>
            ) : <Card tone="red"><T s>{t('Type the 11-letter IFSC from your passbook', 'पासबुक से 11 अक्षर का IFSC लिखें')}</T></Card>}
            <T s m>{t('We send ₹1 to check the account is yours. The name must match your Aadhaar.', 'खाता आपका है, यह जाँचने के लिए ₹1 भेजेंगे। नाम आधार से मेल खाना चाहिए।')}</T>
          </>
        )}
        <Spacer />
        <Button size="tall" disabled={checking || (!upi && !bank)} onPress={save}>{checking ? t('Sending ₹1…', '₹1 भेज रहे हैं…') : t('Check and save', 'जाँचें और सेव करें')}</Button>
        <Link center onPress={() => setUpi(!upi)}>{upi ? t('Use a bank account instead', 'बैंक खाता इस्तेमाल करें') : t('Use a UPI ID instead', 'UPI आईडी इस्तेमाल करें')}</Link>
      </Screen>
    </Page>
  );
}

export default BankScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
