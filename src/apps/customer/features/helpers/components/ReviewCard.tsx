import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Row, Stars, T, useT, useTheme } from '@/native/ui';
import { tr, type Review } from '../data';

/** One customer review: name, stars, text, optional photo, meta line and Saathi's reply. */
export function ReviewCard({ review }: { review: Review }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card>
      <Row><T b>{tr(t, review.who)}</T><Stars value={review.stars} /></Row>
      <T style={{ marginTop: 4 }}>{tr(t, review.text)}</T>
      {review.photo && (
        <View style={[styles.photo, { backgroundColor: c.mint }]}>
          <T s color={c.accent}>{t('Photo', 'फ़ोटो', 'ਫ਼ੋਟੋ')}</T>
        </View>
      )}
      {review.meta && <T s m style={{ marginTop: 4 }}>{tr(t, review.meta)}</T>}
      {review.reply && (
        <View style={[styles.reply, { backgroundColor: c.mint }]}>
          {/* "Saathi" and ":" as separate text nodes: the brand name stays in Latin script in every language */}
          <T s><T s b>{'Saathi'}{':'}</T> {tr(t, review.reply)}</T>
        </View>
      )}
    </Card>
  );
}

export default ReviewCard;

const styles = StyleSheet.create({
  photo: { marginTop: 6, width: 62, height: 46, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  reply: { marginTop: 6, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8 },
});
