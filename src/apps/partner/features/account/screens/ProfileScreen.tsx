import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, CheckRow, Chevron, H, H2, Input, Lft, ListCard, Page, Screen, Sheet, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { isEmail } from '../../onboarding';
import { sampleNames, samplePhone, sampleProfile, seedPhone, spokenLanguagesHi, spokenLanguagesPa } from '../data';
import { useAccountState } from '../state';

/** Design page 24 (section 60), screen 25 · My profile. */
export function ProfileScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAccountState();
  const [email, setEmail] = useState(st.email ?? sampleProfile.email);
  const [emergency, setEmergency] = useState(st.emergency ?? sampleProfile.emergency);
  const [sheet, setSheet] = useState<'phone' | 'lang' | null>(null);
  const [phone, setPhone] = useState(st.phone === seedPhone ? samplePhone : st.phone);
  const [langs, setLangs] = useState<string[]>(st.langs ?? sampleProfile.langs);
  const rawName = st.fullName ?? sampleProfile.fullName;
  const fullName = rawName === sampleNames.fullName[0] ? t(...sampleNames.fullName) : rawName;
  const rows: { en: string; hi: string; pa: string; right?: React.ReactNode; go: () => void }[] = [
    { en: `Mobile number · ${phone}`, hi: `मोबाइल नंबर · ${phone}`, pa: `ਮੋਬਾਈਲ ਨੰਬਰ · ${phone}`, right: <T s b color={c.accent}>{t('Change', 'बदलें', 'ਬਦਲੋ')}</T>, go: () => setSheet('phone') },
    { en: `Languages · ${langs.join(', ')}`, hi: `भाषाएँ · ${langs.map((l) => spokenLanguagesHi[l]).join(', ')}`, pa: `ਭਾਸ਼ਾਵਾਂ · ${langs.map((l) => spokenLanguagesPa[l]).join(', ')}`, go: () => setSheet('lang') },
    { en: 'My documents', hi: 'मेरे दस्तावेज़', pa: 'ਮੇਰੇ ਦਸਤਾਵੇਜ਼', go: () => nav.push('documents') },
    { en: 'Bank account', hi: 'बैंक खाता', pa: 'ਬੈਂਕ ਖਾਤਾ', go: () => nav.push('bank') },
  ];
  const save = () => {
    if (!isEmail(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें', 'ਕਿਰਪਾ ਕਰਕੇ ਈਮੇਲ ਜਾਂਚੋ'));
    set({ email, emergency, phone, langs });
    nav.toast(t('Profile saved', 'प्रोफ़ाइल सेव हो गई', 'ਪ੍ਰੋਫ਼ਾਈਲ ਸੇਵ ਹੋ ਗਈ'));
  };
  return (
    <Page>
      <Screen>
        <Lft gap={10}><Avatar face="sd" size={56} /><View><H>{fullName}</H><T s m>{t('Partner ID KP-0142 · Block C', 'पार्टनर ID KP-0142 · ब्लॉक सी', 'ਪਾਰਟਨਰ ID KP-0142 · ਬਲਾਕ ਸੀ')}</T></View></Lft>
        <H2>{t('Email', 'ईमेल', 'ਈਮੇਲ')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
        <H2>{t('Someone to call in an emergency', 'आपात स्थिति में किसे कॉल करें', 'ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਕਿਸ ਨੂੰ ਕਾਲ ਕਰੀਏ')}</H2>
        <Input value={emergency} onChangeText={setEmergency} />
        <ListCard gap={10}>
          {rows.map((r) => (
            <Card key={r.en} tone="clear" pad={false} style={{ borderWidth: 0 }} row onPress={r.go}>
              <T style={styles.fill}>{t(r.en, r.hi, r.pa)}</T>{r.right ?? <Chevron />}
            </Card>
          ))}
        </ListCard>
        <Spacer />
        <Button size="tall" onPress={save}>{t('Save', 'सेव करें', 'ਸੇਵ ਕਰੋ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet === 'phone'} onClose={() => setSheet(null)}>
        <H2>{t('New mobile number', 'नया मोबाइल नंबर', 'ਨਵਾਂ ਮੋਬਾਈਲ ਨੰਬਰ')}</H2>
        <T s m>{t('We send a code to the new number. Jobs and payslips move to it.', 'नए नंबर पर कोड भेजेंगे। काम और पे-स्लिप उसी पर आएँगे।', 'ਨਵੇਂ ਨੰਬਰ ਉੱਤੇ ਕੋਡ ਭੇਜਾਂਗੇ। ਕੰਮ ਅਤੇ ਪੇ-ਸਲਿੱਪ ਉਸੇ ਉੱਤੇ ਆਉਣਗੇ।')}</T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Button size="tall" onPress={() => { setSheet(null); nav.toast(t('Code sent. Number updated after you enter it.', 'कोड भेजा। डालने पर नंबर बदल जाएगा।', 'ਕੋਡ ਭੇਜਿਆ। ਪਾਉਣ ਉੱਤੇ ਨੰਬਰ ਬਦਲ ਜਾਵੇਗਾ।')); }}>{t('Send code', 'कोड भेजें', 'ਕੋਡ ਭੇਜੋ')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'lang'} onClose={() => setSheet(null)}>
        <H2>{t('Languages I speak', 'मैं कौन-सी भाषाएँ बोलती हूँ', 'ਮੈਂ ਕਿਹੜੀਆਂ ਭਾਸ਼ਾਵਾਂ ਬੋਲਦੀ ਹਾਂ')}</H2>
        <T s m>{t('Customers who speak these are matched with you first.', 'ये भाषाएँ बोलने वाले ग्राहक पहले आपको मिलेंगे।', 'ਇਹ ਭਾਸ਼ਾਵਾਂ ਬੋਲਣ ਵਾਲੇ ਗਾਹਕ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਮਿਲਣਗੇ।')}</T>
        {Object.keys(spokenLanguagesHi).map((l) => (
          <CheckRow key={l} on={langs.includes(l)} label={t(l, spokenLanguagesHi[l], spokenLanguagesPa[l])} onPress={() => setLangs(langs.includes(l) ? langs.filter((x) => x !== l) : [...langs, l])} />
        ))}
        <Button size="tall" onPress={() => setSheet(null)}>{t('Done', 'हो गया', 'ਹੋ ਗਿਆ')}</Button>
      </Sheet>
    </Page>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
