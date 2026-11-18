import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Card, Lft, Pill, Screen, T, useNav, useT } from '@/native/ui';
import { ReviewCard } from '../components/ReviewCard';
import { StarShareBar } from '../components/StarShareBar';
import { reviewFilters, reviews, starShares, tr, type ReviewFilter } from '../data';

/** Reviews in the order a filter shows them. */
const filterReviews = (filter: ReviewFilter) => {
  let list = reviews.slice();
  if (filter === 'photos') list = list.filter((r) => r.photo);
  if (filter === 'low') list.sort((a, b) => a.stars - b.stars);
  return list;
};

/** Design page 13 · screen 46, reviews for the helper. */
export function HelperReviewsScreen() {
  const nav = useNav();
  const t = useT();
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const list = filterReviews(filter);
  return (
    <Screen>
      <BackHeader title={t('Reviews for Sunita D.', 'सुनीता डी. के रिव्यू', 'ਸੁਨੀਤਾ ਡੀ. ਦੇ ਰਿਵਿਊ')} onBack={nav.back} />
      <Card row>
        <View><T b size={34} style={styles.score}>4.8</T><T s m>{t('142 visits', '142 विज़िट', '142 ਵਿਜ਼ਿਟਾਂ')}</T></View>
        <View style={styles.bars}>{starShares.map(([n, pct]) => <StarShareBar key={n} stars={n} pct={pct} />)}</View>
      </Card>
      {/* the filter chips wrap to a second line when they do not fit (small phone, Hindi, Punjabi) */}
      <Lft gap={6} style={styles.wrap}>
        {reviewFilters.map(([k, l]) => (
          <Pill key={k} s sel={filter === k} onPress={() => setFilter(k)} style={{ paddingVertical: 6, paddingHorizontal: 12 }}>{tr(t, l)}</Pill>
        ))}
      </Lft>
      {list.map((r) => <ReviewCard key={r.who.en} review={r} />)}
      {list.length === 0 && <T m center>{t('No reviews here yet.', 'अभी यहाँ कोई रिव्यू नहीं।', 'ਹਾਲੇ ਇੱਥੇ ਕੋਈ ਰਿਵਿਊ ਨਹੀਂ।')}</T>}
    </Screen>
  );
}

export default HelperReviewsScreen;

const styles = StyleSheet.create({
  score: { letterSpacing: -0.6 },
  bars: { gap: 3, width: 130 },
  wrap: { flexWrap: 'wrap' },
});
