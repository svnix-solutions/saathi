import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, ListCard, Page, Row, Screen, Spacer, T, Tag, TopBar, palette, useNav, useT } from '@/native/ui';
import { profession } from '@/data/professions';
import { needsCertificates } from '../signup';
import { useOnboardingState } from '../state';
import { localName, professionName } from '../words';

/** Design pages 20–21 (section 49), screen 8 · Waiting for approval. "Check status" eventually approves and opens Home. */
export function SigninWaitingScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const [checks, setChecks] = useState(0);
  const aadhaarOk = checks >= 1 || st.approved;
  const panOk = checks >= 2 || st.approved;
  const work = profession(st.profession ?? 'house_help');
  const check = () => {
    const n = checks + 1;
    setChecks(n);
    if (n === 1) nav.toast(t('Aadhaar approved. PAN still being checked.', 'आधार मंज़ूर। पैन की जाँच जारी है।', 'ਆਧਾਰ ਮਨਜ਼ੂਰ। ਪੈਨ ਦੀ ਜਾਂਚ ਜਾਰੀ ਹੈ।'));
    if (n >= 2) {
      set({ approved: true });
      nav.toast(t('All approved. Welcome to Saathi Partner!', 'सब मंज़ूर। Saathi Partner में स्वागत है!', 'ਸਭ ਮਨਜ਼ੂਰ। Saathi Partner ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!'));
      setTimeout(() => nav.reset('home'), 900);
    }
  };
  const done = (en: string, hi: string, pa: string) => <Tag tone="n">{t(en, hi, pa)}</Tag>;
  const review = (ok: boolean) => (ok ? <Tag tone="g">{t('Approved', 'मंज़ूर', 'ਮਨਜ਼ੂਰ')}</Tag> : <Tag>{t('Checking', 'जाँच जारी', 'ਜਾਂਚ ਜਾਰੀ')}</Tag>);
  const rows: [string, string, string, React.ReactNode][] = [
    ['Mobile number', 'मोबाइल नंबर', 'ਮੋਬਾਈਲ ਨੰਬਰ', done('Verified', 'सत्यापित', 'ਤਸਦੀਕ ਹੋਇਆ')],
    ['Name and email', 'नाम और ईमेल', 'ਨਾਂ ਅਤੇ ਈਮੇਲ', done('Done', 'हो गया', 'ਹੋ ਗਿਆ')],
    [`Your work · ${work.name}`, `आपका काम · ${work.nameHi}`, `ਤੁਹਾਡਾ ਕੰਮ · ${professionName(t, work)}`, done('Done', 'हो गया', 'ਹੋ ਗਿਆ')],
    ['2 references', '2 पहचान वाले', '2 ਪਛਾਣ ਵਾਲੇ', done('Both confirmed', 'दोनों की पुष्टि', 'ਦੋਵਾਂ ਦੀ ਪੁਸ਼ਟੀ')],
    ['Aadhaar card', 'आधार कार्ड', 'ਆਧਾਰ ਕਾਰਡ', review(aadhaarOk)],
    ['PAN card', 'पैन कार्ड', 'ਪੈਨ ਕਾਰਡ', review(panOk)],
    ...(needsCertificates(st) ? [['Work certificates', 'काम के सर्टिफ़िकेट', 'ਕੰਮ ਦੇ ਸਰਟੀਫ਼ਿਕੇਟ', review(panOk)]] as [string, string, string, React.ReactNode][] : []),
  ];
  return (
    <Page>
      <TopBar>
        <TopBar.Text dim>{t(`Thank you, ${st.name}`, `धन्यवाद, ${localName(t, st.name)}`, `ਧੰਨਵਾਦ, ${localName(t, st.name)}`)}</TopBar.Text>
        <TopBar.Title>{t('We are checking your documents', 'हम आपके दस्तावेज़ जाँच रहे हैं', 'ਅਸੀਂ ਤੁਹਾਡੇ ਦਸਤਾਵੇਜ਼ ਜਾਂਚ ਰਹੇ ਹਾਂ')}</TopBar.Title>
        <TopBar.Text dim style={{ marginTop: 2 }}>{t('Usually within 1 working day', 'आमतौर पर 1 कामकाजी दिन में', 'ਆਮ ਤੌਰ ਉੱਤੇ 1 ਕੰਮਕਾਜੀ ਦਿਨ ਵਿੱਚ')}</TopBar.Text>
      </TopBar>
      <Screen>
        <ListCard gap={11}>
          {rows.map(([en, hi, pa, tag]) => <Row key={en}><T style={styles.fill}>{t(en, hi, pa)}</T>{tag}</Row>)}
        </ListCard>
        <Card tone="yellow">
          <T s color={palette.ink}>
            <T s b color={palette.ink}>{t('Home and jobs open after approval.', 'मंज़ूरी के बाद होम और काम खुलेंगे।', 'ਮਨਜ਼ੂਰੀ ਤੋਂ ਬਾਅਦ ਹੋਮ ਅਤੇ ਕੰਮ ਖੁੱਲ੍ਹਣਗੇ।')}</T> {t('We will send an SMS. If a photo is not clear we ask you to add it again.', 'हम SMS भेजेंगे। फ़ोटो साफ़ न हो तो दोबारा जोड़ने को कहेंगे।', 'ਅਸੀਂ SMS ਭੇਜਾਂਗੇ। ਫ਼ੋਟੋ ਸਾਫ਼ ਨਾ ਹੋਵੇ ਤਾਂ ਦੁਬਾਰਾ ਜੋੜਨ ਲਈ ਕਹਾਂਗੇ।')}
          </T>
        </Card>
        <Spacer />
        <Button variant="plain" onPress={check}>{t('Check status', 'स्थिति देखें', 'ਸਥਿਤੀ ਵੇਖੋ')}</Button>
        <Button size="tall" onPress={() => nav.push('training')}>{t('Start training while you wait', 'इंतज़ार में ट्रेनिंग शुरू करें', 'ਉਡੀਕ ਦੌਰਾਨ ਟ੍ਰੇਨਿੰਗ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninWaitingScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
