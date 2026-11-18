import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Card, Lft, Pill, Screen, T, useNav } from '@/native/ui';
import { ReviewCard } from '../components/ReviewCard';
import { StarShareBar } from '../components/StarShareBar';
import { reviewFilters, reviews, starShares, type ReviewFilter } from '../data';

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
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const list = filterReviews(filter);
  return (
    <Screen>
      <BackHeader title="Reviews for Sunita D." onBack={nav.back} />
      <Card row>
        <View><T b size={34} style={styles.score}>4.8</T><T s m>142 visits</T></View>
        <View style={styles.bars}>{starShares.map(([n, pct]) => <StarShareBar key={n} stars={n} pct={pct} />)}</View>
      </Card>
      <Lft gap={6}>
        {reviewFilters.map(([k, l]) => (
          <Pill key={k} s sel={filter === k} onPress={() => setFilter(k)} style={{ paddingVertical: 6, paddingHorizontal: 12 }}>{l}</Pill>
        ))}
      </Lft>
      {list.map((r) => <ReviewCard key={r.who} review={r} />)}
      {list.length === 0 && <T m center>No reviews here yet.</T>}
    </Screen>
  );
}

export default HelperReviewsScreen;

const styles = StyleSheet.create({
  score: { letterSpacing: -0.6 },
  bars: { gap: 3, width: 130 },
});
