import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Link, Row, Stars, T, Tag, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { tx, type Review } from '../data';

export type ReviewCardProps = {
  review: Review;
  /** highlighted as the newest unread review */
  selected: boolean;
  /** tag shown once the partner has thanked or contested ("Thanked", "Under review") */
  outcome?: string;
  onPress: () => void;
  /** "Say thank you" / "This was not fair" */
  onAction: () => void;
};

/** One customer review with its stars, date, tip, and a thank-you or contest action. */
export function ReviewCard({ review: r, selected, outcome, onPress, onAction }: ReviewCardProps) {
  const t = useT();
  return (
    <Card sel={selected} onPress={onPress}>
      <Row><T b style={styles.grow}>{tx(t, r.place)}</T><Stars value={r.stars} /></Row>
      <T style={{ marginTop: 4 }}>{tx(t, r.text)}</T>
      {r.action ? (
        <Row style={[styles.wrap, { marginTop: 8 }]}>
          <T s m>{tx(t, r.when)}{r.tip ? t(` · tip ${rupees(r.tip)}`, ` · टिप ${rupees(r.tip)}`, ` · ਟਿੱਪ ${rupees(r.tip)}`) : ''}</T>
          {outcome
            ? <Tag tone="n">{outcome}</Tag>
            : <Link onPress={onAction}>{r.action === 'thanks' ? t('Say thank you', 'धन्यवाद कहें', 'ਧੰਨਵਾਦ ਕਹੋ') : t('This was not fair', 'यह सही नहीं था', 'ਇਹ ਠੀਕ ਨਹੀਂ ਸੀ')}</Link>}
        </Row>
      ) : <T s m style={{ marginTop: 6 }}>{tx(t, r.when)}</T>}
    </Card>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default ReviewCard;
