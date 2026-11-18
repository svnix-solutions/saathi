import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, ListCard, Page, Row, Screen, Spacer, T, Tag, TopBar, palette, useNav, useT } from '@/native/ui';
import { profession } from '@/data/professions';
import { needsCertificates } from '../signup';
import { useOnboardingState } from '../state';

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
    if (n === 1) nav.toast(t('Aadhaar approved. PAN still being checked.', 'आधार मंज़ूर। पैन की जाँच जारी है।'));
    if (n >= 2) {
      set({ approved: true });
      nav.toast(t('All approved. Welcome to Saathi Partner!', 'सब मंज़ूर। Saathi Partner में स्वागत है!'));
      setTimeout(() => nav.reset('home'), 900);
    }
  };
  const done = (en: string, hi: string) => <Tag tone="n">{t(en, hi)}</Tag>;
  const review = (ok: boolean) => (ok ? <Tag tone="g">{t('Approved', 'मंज़ूर')}</Tag> : <Tag>{t('Checking', 'जाँच जारी')}</Tag>);
  const rows: [string, string, React.ReactNode][] = [
    ['Mobile number', 'मोबाइल नंबर', done('Verified', 'सत्यापित')],
    ['Name and email', 'नाम और ईमेल', done('Done', 'हो गया')],
    [`Your work · ${work.name}`, `आपका काम · ${work.nameHi}`, done('Done', 'हो गया')],
    ['2 references', '2 पहचान वाले', done('Both confirmed', 'दोनों की पुष्टि')],
    ['Aadhaar card', 'आधार कार्ड', review(aadhaarOk)],
    ['PAN card', 'पैन कार्ड', review(panOk)],
    ...(needsCertificates(st) ? [['Work certificates', 'काम के सर्टिफ़िकेट', review(panOk)]] as [string, string, React.ReactNode][] : []),
  ];
  return (
    <Page>
      <TopBar>
        <TopBar.Text dim>{t(`Thank you, ${st.name}`, `धन्यवाद, ${st.name}`)}</TopBar.Text>
        <TopBar.Title>{t('We are checking your documents', 'हम आपके दस्तावेज़ जाँच रहे हैं')}</TopBar.Title>
        <TopBar.Text dim style={{ marginTop: 2 }}>{t('Usually within 1 working day', 'आमतौर पर 1 कामकाजी दिन में')}</TopBar.Text>
      </TopBar>
      <Screen>
        <ListCard gap={11}>
          {rows.map(([en, hi, tag]) => <Row key={en}><T style={styles.fill}>{t(en, hi)}</T>{tag}</Row>)}
        </ListCard>
        <Card tone="yellow">
          <T s color={palette.ink}>
            <T s b color={palette.ink}>{t('Home and jobs open after approval.', 'मंज़ूरी के बाद होम और काम खुलेंगे।')}</T> {t('We will send an SMS. If a photo is not clear we ask you to add it again.', 'हम SMS भेजेंगे। फ़ोटो साफ़ न हो तो दोबारा जोड़ने को कहेंगे।')}
          </T>
        </Card>
        <Spacer />
        <Button variant="plain" onPress={check}>{t('Check status', 'स्थिति देखें')}</Button>
        <Button size="tall" onPress={() => nav.push('training')}>{t('Start training while you wait', 'इंतज़ार में ट्रेनिंग शुरू करें')}</Button>
      </Screen>
    </Page>
  );
}

export default SigninWaitingScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
