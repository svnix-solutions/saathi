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
      <T s m>{t('New customer · step 2 of 3', 'नए ग्राहक · कदम 2 में से 3', 'ਨਵੇਂ ਗਾਹਕ · 3 ਵਿੱਚੋਂ ਕਦਮ 2')}</T>
      <H size={22}>{t('Welcome. What should we call you?', 'स्वागत है। हम आपको क्या कहकर बुलाएँ?', 'ਜੀ ਆਇਆਂ ਨੂੰ। ਅਸੀਂ ਤੁਹਾਨੂੰ ਕੀ ਕਹਿ ਕੇ ਬੁਲਾਈਏ?')}</H>
      <H2>{t('Your name', 'आपका नाम', 'ਤੁਹਾਡਾ ਨਾਂ')}</H2>
      <Input value={name} onChangeText={setName} placeholder={t('Nitin Kumar', 'नितिन कुमार', 'ਨਿਤਿਨ ਕੁਮਾਰ')} />
      <H2>{t('Language', 'भाषा', 'ਭਾਸ਼ਾ')}</H2>
      <Grid cols={3}>
        {LANGUAGES.map((l) => <Pill key={l.id} sel={lang === l.id} onPress={() => setLang(l.id)}>{l.label}</Pill>)}
      </Grid>
      <Card><T s m>{t('There is no skip. Home opens only when your name and address are saved.', 'इसे छोड़ा नहीं जा सकता। नाम और पता सेव होने पर ही होम खुलेगा।', 'ਇਹ ਛੱਡਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ। ਨਾਂ ਅਤੇ ਪਤਾ ਸੇਵ ਹੋਣ ਤੇ ਹੀ ਹੋਮ ਖੁੱਲ੍ਹੇਗਾ।')}</T></Card>
      <Spacer />
      <Button disabled={!valid} onPress={next}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
    </Screen>
  );
}

export default SigninNameScreen;
