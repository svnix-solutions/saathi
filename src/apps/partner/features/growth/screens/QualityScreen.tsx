import React, { useState } from 'react';
import { Button, Card, H2, Icon, Lft, Link, Meter, Page, Row, Screen, Sheet, T, Tag, TopBar, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { qualityRows } from '../data';

/** Design page 28 · screen 42: my quality this month against the minimums, complaints and what happens if a score drops. */
export function QualityScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [complaint, setComplaint] = useState(false);
  const { rows, top } = qualityRows();
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t('My quality this month', 'इस महीने की क्वालिटी')}</TopBar.Label>
        <Row><TopBar.Title size={26}>{top ? t('Top rated', 'टॉप रेटेड') : t('Good', 'अच्छा')}</TopBar.Title><Tag>{t('Keep it up', 'ऐसे ही रखें')}</Tag></Row>
      </TopBar>
      <Screen>
        {rows.map((r) => (
          <Card key={r.label}>
            <Row><T>{t(r.label, r.hi)}</T><T b color={r.ok ? undefined : c.red}>{r.value}</T></Row>
            <Meter value={r.fill} mark={r.mark} style={{ flex: 0, marginTop: 5 }} />
            <T s m style={{ marginTop: 3 }}>{r.need}</T>
          </Card>
        ))}
        <Card row onPress={() => setComplaint(true)}><T>{t('Complaints', 'शिकायतें')}</T><Lft gap={6}><T b>1</T><Icon name="chevron" size={14} color={c.mut} /></Lft></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>{t('If a score drops', 'अगर स्कोर गिरे')}</H2>
          <T color={palette.ink}>We call you first, then give a short lesson. Jobs pause only after that.</T>
        </Card>
        <Link onPress={() => nav.push('badges')}>{t('See my badges', 'मेरे बैज देखें')}</Link>
      </Screen>
      <Sheet visible={complaint} onClose={() => setComplaint(false)}>
        <H2>1 complaint this month</H2>
        <Card><T b>Flat 9, Block A · 8 Nov</T><T s m>Balcony was missed.</T></Card>
        <T s m>What happens next: {decisions.quality.escalation.join(' → ')}. One complaint does not pause your jobs.</T>
        <Button onPress={() => { setComplaint(false); nav.push('reviews'); }}>{t('Open the review', 'रिव्यू खोलें')}</Button>
      </Sheet>
    </Page>
  );
}

export default QualityScreen;
