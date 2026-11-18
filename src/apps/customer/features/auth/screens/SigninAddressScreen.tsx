/** Design page 02 · Sign in and registration — screen 4 · New customer: address. With params.add it is "Add new address" from My addresses. */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackHeader, Button, Card, H, H2, Icon, Input, Lft, Screen, Spacer, Steps, T, palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { useCustomerState } from '../../../state';
import { SAMPLE_ADDRESS_LINE, isOutsideArea } from '../data';

export function SigninAddressScreen({ params }: ScreenProps<{ add?: boolean }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const add = !!params.add;
  const [useLoc, setUseLoc] = useState(!add);
  const [line, setLine] = useState(add ? '' : st.address.line);
  const [note, setNote] = useState(add ? '' : st.address.note);
  const outside = isOutsideArea(line);
  const valid = line.trim().length > 2;

  const toggleLocation = () => { setUseLoc(!useLoc); if (!useLoc && !line) setLine(SAMPLE_ADDRESS_LINE); };

  const save = () => {
    if (outside) { nav.push('err.outsideArea'); return; }
    if (add) { nav.back(); nav.toast(t('Address added', 'पता जोड़ा गया')); return; }
    set({ signedIn: true, address: { label: 'Home', line: line.trim(), note: note.trim() } });
    nav.reset('home');
    const first = st.name.split(' ')[0];
    nav.toast(t(`Welcome, ${first}`, `स्वागत है, ${first}`));
  };

  return (
    <Screen>
      {add ? <BackHeader title={t('Add new address', 'नया पता जोड़ें')} onBack={nav.back} /> : (
        <>
          <Steps step={3} total={3} />
          <T s m>{t('New customer · step 3 of 3', 'नए ग्राहक · कदम 3 में से 3')}</T>
        </>
      )}
      <H size={22}>{t('Where should the helper come?', 'हेल्पर कहाँ आए?')}</H>
      <Card sel={useLoc} row onPress={toggleLocation}>
        <Lft>
          <Icon name="pin" color={c.accent} />
          <View>
            <H2>{t('Use my current location', 'मेरी अभी की जगह लें')}</H2>
            <T s m>{t('Block C, near the park', 'ब्लॉक सी, पार्क के पास')}</T>
          </View>
        </Lft>
      </Card>
      <H2>{t('Flat and building', 'फ़्लैट और बिल्डिंग')}</H2>
      <Input value={line} onChangeText={setLine} placeholder={t('Flat 204, Block C', 'फ़्लैट 204, ब्लॉक सी')} />
      <H2>{t('How to reach (optional)', 'कैसे पहुँचें (वैकल्पिक)')}</H2>
      <Input small value={note} onChangeText={setNote} placeholder={t('Gate 2, tell the guard flat 204', 'गेट 2, गार्ड को फ़्लैट 204 बताएँ')} />
      {valid && !outside && (
        <Card tone="yellow">
          <T s color={palette.ink}><T s b color={palette.ink}>{t('We serve this address.', 'हम इस पते पर सेवा देते हैं।')}</T> {t('A helper can reach you in about 15 minutes.', 'हेल्पर लगभग 15 मिनट में पहुँच सकता है।')}</T>
        </Card>
      )}
      {outside && (
        <Card tone="red"><T s color={c.red}>{t('We are not in Sector 40 yet.', 'हम अभी सेक्टर 40 में नहीं हैं।')}</T></Card>
      )}
      <Spacer />
      <Button disabled={!valid} onPress={save}>{add ? t('Save address', 'पता सेव करें') : t('Save and open Home', 'सेव करें और होम खोलें')}</Button>
    </Screen>
  );
}

export default SigninAddressScreen;
