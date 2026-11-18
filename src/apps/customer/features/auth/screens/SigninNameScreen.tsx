/** Design page 02 · Sign in and registration — screen 3 · New customer: name. */
import React, { useState } from 'react';
import { Button, Card, Grid, H, H2, Input, Pill, Screen, Spacer, Steps, T, useNav, useT } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { LANGUAGES } from '../data';

export function SigninNameScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const [name, setName] = useState(st.signedIn ? '' : st.name || '');
  const [lang, setLang] = useState(st.language);
  const valid = name.trim().length > 1;
  const next = () => { set({ name: name.trim(), language: lang }); nav.push('signin.address'); };
  return (
    <Screen>
      <Steps step={2} total={3} />
      <T s m>{t('New customer · step 2 of 3', 'नए ग्राहक · कदम 2 में से 3')}</T>
      <H size={22}>{t('Welcome. What should we call you?', 'स्वागत है। हम आपको क्या कहकर बुलाएँ?')}</H>
      <H2>{t('Your name', 'आपका नाम')}</H2>
      <Input value={name} onChangeText={setName} placeholder="Nitin Kumar" />
      <H2>{t('Language', 'भाषा')}</H2>
      <Grid cols={3}>
        {LANGUAGES.map((l) => <Pill key={l.id} sel={lang === l.id} onPress={() => setLang(l.id)}>{l.label}</Pill>)}
      </Grid>
      <Card><T s m>{t('There is no skip. Home opens only when your name and address are saved.', 'इसे छोड़ा नहीं जा सकता। नाम और पता सेव होने पर ही होम खुलेगा।')}</T></Card>
      <Spacer />
      <Button disabled={!valid} onPress={next}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

export default SigninNameScreen;
