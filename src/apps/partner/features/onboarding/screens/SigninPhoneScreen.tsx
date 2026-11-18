import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Grid, H, Input, Lft, Mark, Page, Pill, Screen, Spacer, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { appLanguages, samplePhone, seedPhone } from '../data';
import { digits, fmtPhone } from '../signup';
import { useOnboardingState } from '../state';

/** Design pages 20–21 (section 48), screen 1 · Mobile number. */
export function SigninPhoneScreen() {
  const t = useT();
  const nav = useNav();
  const { locale } = useTheme();
  const [st, set] = useOnboardingState();
  const [phone, setPhone] = useState(st.phone === seedPhone ? samplePhone : st.phone);
  const ok = digits(phone).length === 10;
  return (
    <Page>
      <TopBar>
        <Lft>
          <Mark size={30} />
          <View>
            <TopBar.Heading>Saathi Partner</TopBar.Heading>
            <TopBar.Text dim>{t('Work near home. Paid every week.', 'घर के पास काम। हर हफ़्ते पैसे।', 'ਘਰ ਦੇ ਨੇੜੇ ਕੰਮ। ਹਰ ਹਫ਼ਤੇ ਪੈਸੇ।')}</TopBar.Text>
          </View>
        </Lft>
      </TopBar>
      <Screen>
        <H size={21}>{t('Enter your mobile number', 'अपना मोबाइल नंबर डालें', 'ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਪਾਓ')}</H>
        <T m>{t('We will send a 4-digit code. Use the number you want jobs on.', 'हम 4 अंकों का कोड भेजेंगे। वही नंबर डालें जिस पर काम चाहिए।', 'ਅਸੀਂ 4 ਅੰਕਾਂ ਦਾ ਕੋਡ ਭੇਜਾਂਗੇ। ਉਹੀ ਨੰਬਰ ਪਾਓ ਜਿਸ ਉੱਤੇ ਕੰਮ ਚਾਹੀਦਾ ਹੈ।')}</T>
        <Input prefix="+91" value={phone} onChangeText={(v) => setPhone(fmtPhone(v))} keyboardType="phone-pad" placeholder={samplePhone} />
        <Grid cols={3}>
          {appLanguages.map((l) => <Pill key={l.k} sel={(st.locale ?? locale) === l.k} onPress={() => set({ locale: l.k })}>{l.l}</Pill>)}
        </Grid>
        <Spacer />
        <Button size="tall" disabled={!ok} onPress={() => { set({ phone }); nav.push('signin.otp'); }}>{t('Send code', 'कोड भेजें', 'ਕੋਡ ਭੇਜੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninPhoneScreen;
