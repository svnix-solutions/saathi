import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, H2, Icon, Lft, Link, Meter, Page, Row, Screen, Sheet, T, Tag, TopBar, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { qualityRows, tx } from '../data';

/** The escalation steps from the launch values, in Hindi and Punjabi. */
const escalationWords: Record<string, { hi: string; pa: string }> = {
  Call: { hi: 'फ़ोन', pa: 'ਫ਼ੋਨ' }, Lesson: { hi: 'पाठ', pa: 'ਪਾਠ' }, Pause: { hi: 'काम रुकेगा', pa: 'ਕੰਮ ਰੁਕੇਗਾ' },
};

/** Design page 28 · screen 42: my quality this month against the minimums, complaints and what happens if a score drops. */
export function QualityScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [complaint, setComplaint] = useState(false);
  const { rows, top } = qualityRows();
  const steps = (l: 'hi' | 'pa') => decisions.quality.escalation.map((e) => escalationWords[e]?.[l] ?? e).join(' → ');
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('My quality this month', 'इस महीने की क्वालिटी', 'ਇਸ ਮਹੀਨੇ ਦੀ ਕੁਆਲਿਟੀ')}</TopBar.Label>
        <Row style={styles.wrap}><TopBar.Title size={26}>{top ? t('Top rated', 'टॉप रेटेड', 'ਟਾਪ ਰੇਟਿਡ') : t('Good', 'अच्छा', 'ਵਧੀਆ')}</TopBar.Title><Tag>{t('Keep it up', 'ऐसे ही रखें', 'ਇਸੇ ਤਰ੍ਹਾਂ ਰੱਖੋ')}</Tag></Row>
      </TopBar>
      <Screen>
        {rows.map((r) => (
          <Card key={r.label}>
            <Row><T style={styles.grow}>{t(r.label, r.hi, r.pa)}</T><T b color={r.ok ? undefined : c.red}>{r.value}</T></Row>
            <Meter value={r.fill} mark={r.mark} style={{ flex: 0, marginTop: 5 }} />
            <T s m style={{ marginTop: 3 }}>{tx(t, r.need)}</T>
          </Card>
        ))}
        <Card row onPress={() => setComplaint(true)}><T style={styles.grow}>{t('Complaints', 'शिकायतें', 'ਸ਼ਿਕਾਇਤਾਂ')}</T><Lft gap={6}><T b>1</T><Icon name="chevron" size={14} color={c.mut} /></Lft></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>{t('If a score drops', 'अगर स्कोर गिरे', 'ਜੇ ਸਕੋਰ ਘਟੇ')}</H2>
          <T color={palette.ink}>{t('We call you first, then give a short lesson. Jobs pause only after that.', 'पहले हम आपको फ़ोन करेंगे, फिर एक छोटा पाठ देंगे। उसके बाद ही काम रुकेगा।', 'ਪਹਿਲਾਂ ਅਸੀਂ ਤੁਹਾਨੂੰ ਫ਼ੋਨ ਕਰਾਂਗੇ, ਫਿਰ ਇੱਕ ਛੋਟਾ ਪਾਠ ਦੇਵਾਂਗੇ। ਉਸ ਤੋਂ ਬਾਅਦ ਹੀ ਕੰਮ ਰੁਕੇਗਾ।')}</T>
        </Card>
        <Link onPress={() => nav.push('badges')}>{t('See my badges', 'मेरे बैज देखें', 'ਮੇਰੇ ਬੈਜ ਦੇਖੋ')}</Link>
      </Screen>
      <Sheet visible={complaint} onClose={() => setComplaint(false)}>
        <H2>{t('1 complaint this month', 'इस महीने 1 शिकायत', 'ਇਸ ਮਹੀਨੇ 1 ਸ਼ਿਕਾਇਤ')}</H2>
        <Card><T b>{t('Flat 9, Block A · 8 Nov', 'फ़्लैट 9, ब्लॉक ए · 8 नवंबर', 'ਫ਼ਲੈਟ 9, ਬਲਾਕ ਏ · 8 ਨਵੰਬਰ')}</T><T s m>{t('Balcony was missed.', 'बालकनी छूट गई।', 'ਬਾਲਕਨੀ ਰਹਿ ਗਈ।')}</T></Card>
        <T s m>{t(`What happens next: ${decisions.quality.escalation.join(' → ')}. One complaint does not pause your jobs.`, `आगे क्या होगा: ${steps('hi')}। एक शिकायत से आपका काम नहीं रुकता।`, `ਅੱਗੇ ਕੀ ਹੋਵੇਗਾ: ${steps('pa')}। ਇੱਕ ਸ਼ਿਕਾਇਤ ਨਾਲ ਤੁਹਾਡਾ ਕੰਮ ਨਹੀਂ ਰੁਕਦਾ।`)}</T>
        <Button onPress={() => { setComplaint(false); nav.push('reviews'); }}>{t('Open the review', 'रिव्यू खोलें', 'ਰਿਵਿਊ ਖੋਲ੍ਹੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default QualityScreen;
