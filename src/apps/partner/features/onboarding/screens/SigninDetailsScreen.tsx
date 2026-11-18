import React, { useState } from 'react';
import { Button, H, H2, Input, Page, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { SignupSteps } from '../components/SignupSteps';
import { sampleDetails, sampleNames } from '../data';
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
    if (name.trim().length < 3) return nav.toast(t('Please write your full name', 'कृपया पूरा नाम लिखें', 'ਕਿਰਪਾ ਕਰਕੇ ਪੂਰਾ ਨਾਂ ਲਿਖੋ'));
    if (!isEmail(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें', 'ਕਿਰਪਾ ਕਰਕੇ ਈਮੇਲ ਜਾਂਚੋ'));
    set({ name: name.trim().split(' ')[0], fullName: name.trim(), email, area });
    nav.push('signin.work');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={1} />
        <H size={21}>{t('Your details', 'आपकी जानकारी', 'ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ')}</H>
        <H2>{t('Full name, as on your Aadhaar', 'पूरा नाम, जैसा आधार पर है', 'ਪੂਰਾ ਨਾਂ, ਜਿਵੇਂ ਆਧਾਰ ਉੱਤੇ ਹੈ')}</H2>
        <Input value={name} onChangeText={setName} placeholder={t(...sampleNames.fullName)} />
        <H2>{t('Email', 'ईमेल', 'ਈਮੇਲ')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="name@example.com" />
        <T s m>{t('For payslips and account messages. We send a link to confirm it.', 'पे-स्लिप और खाते के संदेशों के लिए। पुष्टि के लिए हम लिंक भेजेंगे।', 'ਪੇ-ਸਲਿੱਪ ਅਤੇ ਖਾਤੇ ਦੇ ਸੁਨੇਹਿਆਂ ਲਈ। ਪੱਕਾ ਕਰਨ ਲਈ ਅਸੀਂ ਲਿੰਕ ਭੇਜਾਂਗੇ।')}</T>
        <H2>{t('Area you live in', 'आप किस इलाके में रहते हैं', 'ਤੁਸੀਂ ਕਿਸ ਇਲਾਕੇ ਵਿੱਚ ਰਹਿੰਦੇ ਹੋ')}</H2>
        <Input value={area} onChangeText={setArea} placeholder={t(...sampleNames.area)} />
        <Spacer />
        <Button size="tall" onPress={go}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninDetailsScreen;
