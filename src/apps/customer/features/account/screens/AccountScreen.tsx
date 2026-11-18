/** Design page 09 · My account, payments, alerts and leaving — screen 28 · My account. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, H, H2, Input, Lft, Link, ListCard, MenuRow, Screen, T, palette, useNav, useT } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { ACCOUNT_MORE, SAMPLE_EMAIL } from '../data';
import { isValidName } from '../rules';

export function AccountScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const [name, setName] = useState(st.name);
  const [email, setEmail] = useState(st.email ?? SAMPLE_EMAIL);
  const save = () => { set({ name: name.trim(), email }); nav.toast(t('Saved', 'सेव हुआ')); };
  const signOut = () => { set({ signedIn: true }); nav.reset('signin.phone'); nav.toast(t('Signed out', 'साइन आउट हुआ')); };
  return (
    <View style={styles.root}>
      <Screen>
        <Lft>
          <Avatar face="nk" size={56} />
          <View>
            <H>{st.name}</H>
            <T s m>{t(`+91 ${st.phone} · verified`, `+91 ${st.phone} · सत्यापित`)}</T>
          </View>
        </Lft>
        <H2>{t('Name', 'नाम')}</H2>
        <Input value={name} onChangeText={setName} />
        <H2>{t('Email (optional)', 'ईमेल (वैकल्पिक)')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Card row>
          <View style={styles.grow}>
            <H2>{t('Mobile number', 'मोबाइल नंबर')}</H2>
            <T s m>{t('Changing it needs a code on the new number', 'बदलने के लिए नए नंबर पर कोड आएगा')}</T>
          </View>
          <Link onPress={() => nav.push('signin.phone')}>{t('Change', 'बदलें')}</Link>
        </Card>
        <ListCard>
          <MenuRow label={t('Addresses', 'पते')} onPress={() => nav.push('addresses')} />
          <MenuRow label={t('Payment methods', 'भुगतान के तरीके')} onPress={() => nav.push('paymentMethods')} />
          <MenuRow label={t('Alerts', 'सूचनाएँ')} onPress={() => nav.push('alertSettings')} />
        </ListCard>
        <Button disabled={!isValidName(name)} onPress={save}>{t('Save', 'सेव करें')}</Button>
        <H2 m style={{ marginTop: 6 }}>{t('More', 'और')}</H2>
        <ListCard>
          {ACCOUNT_MORE.map(([r, en, hi, icon]) => <MenuRow key={r} icon={icon} label={t(en, hi)} onPress={() => nav.push(r)} />)}
        </ListCard>
        <ListCard>
          <MenuRow label={t('Sign out', 'साइन आउट')} onPress={signOut} />
          <MenuRow label={t('Delete my account', 'मेरा खाता हटाएँ')} color={palette.red} onPress={() => nav.push('deleteAccount')} />
        </ListCard>
      </Screen>
      <CustomerTabs active="account" />
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
