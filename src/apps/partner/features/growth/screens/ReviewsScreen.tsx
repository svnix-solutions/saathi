import React, { useState } from 'react';
import { Button, Card, H, H2, Input, Page, Row, Screen, Sheet, T, Tag, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { ReviewCard } from '../components/ReviewCard';
import { reviews, thankYouMessages, type Review } from '../data';

/** Design page 28 · screen 41: reviews received, with a thank-you reply or a "not fair" request. */
export function ReviewsScreen() {
  const nav = useNav();
  const t = useT();
  const [seen, setSeen] = useState<number[]>([]);
  const [done, setDone] = useState<Record<number, string>>({});
  const [sheet, setSheet] = useState<{ r: Review; kind: 'thanks' | 'contest' } | null>(null);
  const [msg, setMsg] = useState(thankYouMessages[0]);
  const [why, setWhy] = useState('');
  const fresh = reviews.filter((r) => r.isNew && !seen.includes(r.id)).length;
  const open = (r: Review, kind: 'thanks' | 'contest') => { setSheet({ r, kind }); setMsg(thankYouMessages[0]); setWhy(''); };
  const markSeen = (id: number) => setSeen((s) => (s.includes(id) ? s : [...s, id]));
  const close = (r: Review, outcome: string, toast: string) => { setDone((d) => ({ ...d, [r.id]: outcome })); setSheet(null); nav.toast(toast); };
  return (
    <Page variant="bare">
      <Screen>
        <Row><H>{t('My reviews', 'मेरे रिव्यू')}</H>{fresh > 0 ? <Tag tone="n">{`${fresh} new`}</Tag> : <Tag tone="x">All read</Tag>}</Row>
        {reviews.map((r, i) => (
          <ReviewCard key={r.id} review={r} selected={i === 0 && !seen.includes(r.id)} outcome={done[r.id]}
            onPress={() => markSeen(r.id)} onAction={() => open(r, r.action!)} />
        ))}
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={!!sheet} onClose={() => setSheet(null)}>
        {sheet?.kind === 'thanks' && (
          <>
            <H2>{t('Say thank you', 'धन्यवाद कहें')} · {sheet.r.place}</H2>
            {thankYouMessages.map((m) => <Card key={m} sel={msg === m} onPress={() => setMsg(m)} style={{ paddingVertical: 9 }}><T>{m}</T></Card>)}
            <Button onPress={() => close(sheet.r, 'Thanked', 'Thank-you sent')}>{t('Send', 'भेजें')}</Button>
          </>
        )}
        {sheet?.kind === 'contest' && (
          <>
            <H2>{t('This was not fair', 'यह सही नहीं था')} · {sheet.r.place}</H2>
            <T s m>Tell us what happened. If we agree, this rating is removed from your score.</T>
            <Input small multiline value={why} onChangeText={setWhy} placeholder="e.g. The balcony was locked" />
            <Button disabled={!why.trim()} onPress={() => close(sheet.r, 'Under review', 'Sent to our team. We reply in 48 hours.')}>
              {t('Send to Saathi team', 'साथी टीम को भेजें')}
            </Button>
          </>
        )}
      </Sheet>
    </Page>
  );
}

export default ReviewsScreen;
