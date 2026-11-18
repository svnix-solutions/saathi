import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Grid, H, H2, Lft, Link, Meter, Page, Pill, Screen, Stars, T, Tag, palette, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { ratingData, type RatingPeriod } from '../data';

/** Design page 27 · screen 37: my ratings by period, star breakdown and what customers say. */
export function RatingsScreen() {
  const nav = useNav();
  const t = useT();
  const [period, setPeriod] = useState<RatingPeriod>('all');
  const d = ratingData[period];
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My ratings', 'मेरी रेटिंग')}</H>
        <Grid cols={3}>
          {(Object.keys(ratingData) as RatingPeriod[]).map((k) => <Pill key={k} s sel={period === k} onPress={() => setPeriod(k)}>{ratingData[k].label}</Pill>)}
        </Grid>
        <Card row>
          <View><T b size={40} style={{ letterSpacing: -0.8, lineHeight: 44 }}>{d.avg}</T><T s m>from {d.visits} visits</T></View>
          <Stars value={5} />
        </Card>
        <Card style={styles.breakdown}>
          {d.dist.map((n, i) => (
            <Lft key={i}>
              <T s style={styles.starLabel}>{5 - i}</T>
              <Meter value={n / d.visits} />
              <T s style={{ width: 22, textAlign: 'right' }}>{n}</T>
            </Lft>
          ))}
        </Card>
        <H2>{t('Customers say', 'ग्राहक कहते हैं')}</H2>
        <Lft gap={6} style={styles.wrap}>
          {d.tags.map(([k, n]) => <Tag key={k} tone="n">{`${k} · ${n}`}</Tag>)}
        </Lft>
        <Card tone="yellow" onPress={() => nav.push('reviews')}>
          <H2 color={palette.ink}>{t('Tip to improve', 'सुधार की सलाह')}</H2>
          <T color={palette.ink}>4 customers said the balcony was missed. Check it before you finish.</T>
        </Card>
        <Link onPress={() => nav.push('reviews')}>{t('Read all reviews', 'सभी रिव्यू पढ़ें')}</Link>
      </Screen>
      <PartnerTabs active="earnings" />
    </Page>
  );
}

const styles = StyleSheet.create({
  breakdown: { gap: 7 },
  starLabel: { width: 10 },
  wrap: { flexWrap: 'wrap' },
});

export default RatingsScreen;
