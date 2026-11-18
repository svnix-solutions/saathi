import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, H, H2, Input, Link, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { bankFromIfsc, cleanIfsc } from '../bank';
import { sampleBank, sampleProfile, unknownBank, unknownBankName } from '../data';
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
  const bankName = bank === unknownBank ? t(...unknownBankName) : bank?.[0];
  const save = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      set({ bankLabel: upi ? upiId : `${bank?.[0] ?? ''} ···· ${acct.slice(-4)}` });
      nav.toast(upi ? t('UPI ID checked and saved', 'UPI ID जाँचकर सेव', 'UPI ID ਜਾਂਚ ਕੇ ਸੇਵ') : t('₹1 received. Account saved.', '₹1 मिल गया। खाता सेव हुआ।', '₹1 ਮਿਲ ਗਿਆ। ਖਾਤਾ ਸੇਵ ਹੋ ਗਿਆ।'));
      if (nav.canGoBack) nav.back();
    }, 1200);
  };
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Bank account', 'बैंक खाता', 'ਬੈਂਕ ਖਾਤਾ')} onBack={nav.canGoBack ? nav.back : () => nav.reset('profile')} />
        <H>{t('Where should we send your pay?', 'आपकी कमाई कहाँ भेजें?', 'ਤੁਹਾਡੀ ਕਮਾਈ ਕਿੱਥੇ ਭੇਜੀਏ?')}</H>
        {upi ? (
          <>
            <H2>UPI ID</H2>
            <Input value={upiId} onChangeText={setUpiId} placeholder="name@bank" />
            <T s m>{t('We send ₹1 to check the UPI ID is yours.', 'UPI ID आपकी है, यह जाँचने के लिए ₹1 भेजेंगे।', 'UPI ID ਤੁਹਾਡੀ ਹੈ, ਇਹ ਜਾਂਚਣ ਲਈ ₹1 ਭੇਜਾਂਗੇ।')}</T>
          </>
        ) : (
          <>
            <H2>{t('Name on the account', 'खाते पर नाम', 'ਖਾਤੇ ਉੱਤੇ ਨਾਂ')}</H2>
            <Input value={name} onChangeText={setName} />
            <H2>{t('Account number', 'खाता नंबर', 'ਖਾਤਾ ਨੰਬਰ')}</H2>
            <Input value={acct} onChangeText={setAcct} keyboardType="number-pad" />
            <H2>{t('IFSC code', 'IFSC कोड', 'IFSC ਕੋਡ')}</H2>
            <Input value={ifsc} onChangeText={(v) => setIfsc(cleanIfsc(v))} placeholder={sampleBank.ifsc} />
            {bank ? (
              <Card sel row>
                <View style={styles.fill}><H2>{bankName}</H2><T s m>{t(`${bank[1]} · found from the IFSC`, `${bank[2]} · IFSC से मिला`, `${bank[3]} · IFSC ਤੋਂ ਮਿਲਿਆ`)}</T></View>
                <Check on size={18} />
              </Card>
            ) : <Card tone="red"><T s>{t('Type the 11-letter IFSC from your passbook', 'पासबुक से 11 अक्षर का IFSC लिखें', 'ਪਾਸਬੁੱਕ ਤੋਂ 11 ਅੱਖਰਾਂ ਦਾ IFSC ਲਿਖੋ')}</T></Card>}
            <T s m>{t('We send ₹1 to check the account is yours. The name must match your Aadhaar.', 'खाता आपका है, यह जाँचने के लिए ₹1 भेजेंगे। नाम आधार से मेल खाना चाहिए।', 'ਖਾਤਾ ਤੁਹਾਡਾ ਹੈ, ਇਹ ਜਾਂਚਣ ਲਈ ₹1 ਭੇਜਾਂਗੇ। ਨਾਂ ਆਧਾਰ ਨਾਲ ਮਿਲਣਾ ਚਾਹੀਦਾ ਹੈ।')}</T>
          </>
        )}
        <Spacer />
        <Button size="tall" disabled={checking || (!upi && !bank)} onPress={save}>{checking ? t('Sending ₹1…', '₹1 भेज रहे हैं…', '₹1 ਭੇਜ ਰਹੇ ਹਾਂ…') : t('Check and save', 'जाँचें और सेव करें', 'ਜਾਂਚੋ ਅਤੇ ਸੇਵ ਕਰੋ')}</Button>
        <Link center onPress={() => setUpi(!upi)}>{upi ? t('Use a bank account instead', 'बैंक खाता इस्तेमाल करें', 'ਬੈਂਕ ਖਾਤਾ ਵਰਤੋ') : t('Use a UPI ID instead', 'UPI ID इस्तेमाल करें', 'UPI ID ਵਰਤੋ')}</Link>
      </Screen>
    </Page>
  );
}

export default BankScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
