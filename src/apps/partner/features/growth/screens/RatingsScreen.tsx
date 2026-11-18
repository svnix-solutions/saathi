import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Grid, H, H2, Lft, Link, Meter, Page, Pill, Screen, Stars, T, Tag, palette, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { ratingData, ratingTags, tx, type RatingPeriod } from '../data';

/** Design page 27 · screen 37: my ratings by period, star breakdown and what customers say. */
export function RatingsScreen() {
  const nav = useNav();
  const t = useT();
  const [period, setPeriod] = useState<RatingPeriod>('all');
  const d = ratingData[period];
  return (
    <Page variant="bare">
      <Screen>
        <H>{t('My ratings', 'मेरी रेटिंग', 'ਮੇਰੀ ਰੇਟਿੰਗ')}</H>
        <Grid cols={3}>
          {(Object.keys(ratingData) as RatingPeriod[]).map((k) => <Pill key={k} s sel={period === k} onPress={() => setPeriod(k)}>{tx(t, ratingData[k].label)}</Pill>)}
        </Grid>
        <Card row>
          <View><T b size={40} style={{ letterSpacing: -0.8, lineHeight: 44 }}>{d.avg}</T><T s m>{t(`from ${d.visits} visits`, `${d.visits} विज़िट से`, `${d.visits} ਵਿਜ਼ਿਟਾਂ ਤੋਂ`)}</T></View>
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
        <H2>{t('Customers say', 'ग्राहक कहते हैं', 'ਗਾਹਕ ਕਹਿੰਦੇ ਹਨ')}</H2>
        <Lft gap={6} style={styles.wrap}>
          {d.tags.map(([k, n]) => <Tag key={k} tone="n">{`${tx(t, ratingTags[k])} · ${n}`}</Tag>)}
        </Lft>
        <Card tone="yellow" onPress={() => nav.push('reviews')}>
          <H2 color={palette.ink}>{t('Tip to improve', 'सुधार की सलाह', 'ਸੁਧਾਰ ਦੀ ਸਲਾਹ')}</H2>
          <T color={palette.ink}>{t('4 customers said the balcony was missed. Check it before you finish.', '4 ग्राहकों ने कहा कि बालकनी छूट गई। काम ख़त्म करने से पहले देख लें।', '4 ਗਾਹਕਾਂ ਨੇ ਕਿਹਾ ਕਿ ਬਾਲਕਨੀ ਰਹਿ ਗਈ। ਕੰਮ ਮੁਕਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਦੇਖ ਲਓ।')}</T>
        </Card>
        <Link onPress={() => nav.push('reviews')}>{t('Read all reviews', 'सभी रिव्यू पढ़ें', 'ਸਾਰੇ ਰਿਵਿਊ ਪੜ੍ਹੋ')}</Link>
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
