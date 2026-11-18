/** Design page 02 · Sign in and registration — screen 1 · Mobile number. */
import React, { useState } from 'react';
import { Button, CharacterTile, H, Input, Mark, Row, Screen, Spacer, T, palette, useNav, useT } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { SAMPLE_PHONE, formatPhone, phoneDigits } from '../data';

export function SigninPhoneScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const [phone, setPhone] = useState(st.phone ?? SAMPLE_PHONE);
  const digits = phoneDigits(phone);
  const complete = digits.length === 10;
  const sendCode = () => { set({ phone }); nav.push('signin.otp'); };
  return (
    <Screen>
      <Row style={{ marginTop: 10, alignItems: 'flex-end' }}>
        <Mark size={52} />
        <CharacterTile name="hero" width={92} height={110} radius={18} zoom={260} x={50} y={9} />
      </Row>
      <H size={22}>{t('Enter your mobile number', 'अपना मोबाइल नंबर डालें', 'ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਪਾਓ')}</H>
      <T m>{t('We will send a 4-digit code. New here? The same step creates your account.', 'हम 4 अंकों का कोड भेजेंगे। नए हैं? इसी कदम से आपका खाता बन जाता है।', 'ਅਸੀਂ 4 ਅੰਕਾਂ ਦਾ ਕੋਡ ਭੇਜਾਂਗੇ। ਨਵੇਂ ਹੋ? ਇਸੇ ਕਦਮ ਨਾਲ ਤੁਹਾਡਾ ਖਾਤਾ ਬਣ ਜਾਂਦਾ ਹੈ।')}</T>
      <Input prefix="+91" value={phone} keyboardType="phone-pad" maxLength={11} placeholder={SAMPLE_PHONE}
        onChangeText={(s) => setPhone(formatPhone(s))} />
      {!complete && digits.length > 0 && <T s color={palette.red}>{t('Enter all 10 digits of your number.', 'नंबर के सभी 10 अंक डालें।', 'ਨੰਬਰ ਦੇ ਸਾਰੇ 10 ਅੰਕ ਪਾਓ।')}</T>}
      <Spacer />
      <Button disabled={!complete} onPress={sendCode}>{t('Send code', 'कोड भेजें', 'ਕੋਡ ਭੇਜੋ')}</Button>
      <T s m center>{t('By continuing you agree to the terms and privacy policy.', 'आगे बढ़कर आप शर्तें और निजता नीति मानते हैं।', 'ਅੱਗੇ ਵਧ ਕੇ ਤੁਸੀਂ ਸ਼ਰਤਾਂ ਅਤੇ ਪਰਦੇਦਾਰੀ ਨੀਤੀ ਮੰਨਦੇ ਹੋ।')}</T>
    </Screen>
  );
}

export default SigninPhoneScreen;
