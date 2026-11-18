import React from 'react';
import { Card, Link, Row, Stars, T, Tag, useT } from '@/native/ui';
import { rupees } from '@/domain';
import type { Review } from '../data';

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
      <Row><T b>{r.place}</T><Stars value={r.stars} /></Row>
      <T style={{ marginTop: 4 }}>{r.text}</T>
      {r.action ? (
        <Row style={{ marginTop: 8 }}>
          <T s m>{r.when}{r.tip ? ` · tip ${rupees(r.tip)}` : ''}</T>
          {outcome
            ? <Tag tone="n">{outcome}</Tag>
            : <Link onPress={onAction}>{r.action === 'thanks' ? t('Say thank you', 'धन्यवाद कहें') : t('This was not fair', 'यह सही नहीं था')}</Link>}
        </Row>
      ) : <T s m style={{ marginTop: 6 }}>{r.when}</T>}
    </Card>
  );
}

export default ReviewCard;
