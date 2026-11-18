import React, { useState } from 'react';
import { Button, H, H2, Input, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { SignupSteps } from '../components/SignupSteps';
import { sampleDetails } from '../data';
import { isEmail } from '../signup';
import { useOnboardingState } from '../state';

/** Design pages 20–21 (section 48), screen 3 · Name and email. */
export function SigninDetailsScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const [name, setName] = useState(st.name === 'Sunita' ? sampleDetails.fullName : st.name);
  const [email, setEmail] = useState(st.email ?? sampleDetails.email);
  const [area, setArea] = useState(st.area ?? sampleDetails.area);
  const go = () => {
    if (name.trim().length < 3) return nav.toast(t('Please write your full name', 'कृपया पूरा नाम लिखें'));
    if (!isEmail(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें'));
    set({ name: name.trim().split(' ')[0], fullName: name.trim(), email, area });
    nav.push('signin.work');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={1} />
        <H size={21}>{t('Your details', 'आपकी जानकारी')}</H>
        <H2>{t('Full name, as on your Aadhaar', 'पूरा नाम, जैसा आधार पर है')}</H2>
        <Input value={name} onChangeText={setName} placeholder="Sunita Devi" />
        <H2>{t('Email', 'ईमेल')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="name@example.com" />
        <T s m>{t('For payslips and account messages. We send a link to confirm it.', 'पे-स्लिप और खाते के संदेशों के लिए। पुष्टि के लिए हम लिंक भेजेंगे।')}</T>
        <H2>{t('Area you live in', 'आप किस इलाके में रहते हैं')}</H2>
        <Input value={area} onChangeText={setArea} placeholder="Block C" />
        <Spacer />
        <Button size="tall" onPress={go}>{t('Continue', 'आगे बढ़ें')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninDetailsScreen;
