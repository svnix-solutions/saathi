import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, CheckRow, Chevron, H, H2, Input, Lft, ListCard, Page, Screen, Sheet, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { isEmail } from '../../onboarding';
import { samplePhone, sampleProfile, seedPhone, spokenLanguagesHi } from '../data';
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
  const fullName = st.fullName ?? sampleProfile.fullName;
  const rows: { en: string; hi: string; right?: React.ReactNode; go: () => void }[] = [
    { en: `Mobile number · ${phone}`, hi: `मोबाइल नंबर · ${phone}`, right: <T s b color={c.accent}>{t('Change', 'बदलें')}</T>, go: () => setSheet('phone') },
    { en: `Languages · ${langs.join(', ')}`, hi: `भाषाएँ · ${langs.map((l) => spokenLanguagesHi[l]).join(', ')}`, go: () => setSheet('lang') },
    { en: 'My documents', hi: 'मेरे दस्तावेज़', go: () => nav.push('documents') },
    { en: 'Bank account', hi: 'बैंक खाता', go: () => nav.push('bank') },
  ];
  const save = () => {
    if (!isEmail(email)) return nav.toast(t('Please check the email', 'कृपया ईमेल जाँचें'));
    set({ email, emergency, phone, langs });
    nav.toast(t('Profile saved', 'प्रोफ़ाइल सेव हो गई'));
  };
  return (
    <Page>
      <Screen>
        <Lft gap={10}><Avatar face="sd" size={56} /><View><H>{fullName}</H><T s m>{t('Partner ID KP-0142 · Block C', 'पार्टनर आईडी KP-0142 · ब्लॉक सी')}</T></View></Lft>
        <H2>{t('Email', 'ईमेल')}</H2>
        <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
        <H2>{t('Someone to call in an emergency', 'आपात स्थिति में किसे कॉल करें')}</H2>
        <Input value={emergency} onChangeText={setEmergency} />
        <ListCard gap={10}>
          {rows.map((r) => (
            <Card key={r.en} tone="clear" pad={false} style={{ borderWidth: 0 }} row onPress={r.go}>
              <T style={styles.fill}>{t(r.en, r.hi)}</T>{r.right ?? <Chevron />}
            </Card>
          ))}
        </ListCard>
        <Spacer />
        <Button size="tall" onPress={save}>{t('Save', 'सेव करें')}</Button>
      </Screen>
      <PartnerTabs active="home" />
      <Sheet visible={sheet === 'phone'} onClose={() => setSheet(null)}>
        <H2>{t('New mobile number', 'नया मोबाइल नंबर')}</H2>
        <T s m>{t('We send a code to the new number. Jobs and payslips move to it.', 'नए नंबर पर कोड भेजेंगे। काम और पे-स्लिप उसी पर आएँगे।')}</T>
        <Input prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Button size="tall" onPress={() => { setSheet(null); nav.toast(t('Code sent. Number updated after you enter it.', 'कोड भेजा। डालने पर नंबर बदल जाएगा।')); }}>{t('Send code', 'कोड भेजें')}</Button>
      </Sheet>
      <Sheet visible={sheet === 'lang'} onClose={() => setSheet(null)}>
        <H2>{t('Languages I speak', 'मैं कौन-सी भाषाएँ बोलती हूँ')}</H2>
        <T s m>{t('Customers who speak these are matched with you first.', 'ये भाषाएँ बोलने वाले ग्राहक पहले आपको मिलेंगे।')}</T>
        {Object.keys(spokenLanguagesHi).map((l) => (
          <CheckRow key={l} on={langs.includes(l)} label={t(l, spokenLanguagesHi[l])} onPress={() => setLangs(langs.includes(l) ? langs.filter((x) => x !== l) : [...langs, l])} />
        ))}
        <Button size="tall" onPress={() => setSheet(null)}>{t('Done', 'हो गया')}</Button>
      </Sheet>
    </Page>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
