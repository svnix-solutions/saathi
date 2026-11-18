import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, H, H2, Input, Page, Row, Screen, Sheet, T, Tag, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { ReviewCard } from '../components/ReviewCard';
import { reviewOutcomes, reviews, thankYouMessages, tx, type Review, type Txt } from '../data';

/** Design page 28 · screen 41: reviews received, with a thank-you reply or a "not fair" request. */
export function ReviewsScreen() {
  const nav = useNav();
  const t = useT();
  const [seen, setSeen] = useState<number[]>([]);
  const [done, setDone] = useState<Record<number, Txt>>({});
  const [sheet, setSheet] = useState<{ r: Review; kind: 'thanks' | 'contest' } | null>(null);
  const [msg, setMsg] = useState(thankYouMessages[0]);
  const [why, setWhy] = useState('');
  const fresh = reviews.filter((r) => r.isNew && !seen.includes(r.id)).length;
  const open = (r: Review, kind: 'thanks' | 'contest') => { setSheet({ r, kind }); setMsg(thankYouMessages[0]); setWhy(''); };
  const markSeen = (id: number) => setSeen((s) => (s.includes(id) ? s : [...s, id]));
  const close = (r: Review, outcome: Txt, toast: string) => { setDone((d) => ({ ...d, [r.id]: outcome })); setSheet(null); nav.toast(toast); };
  return (
    <Page variant="bare">
      <Screen>
        <Row style={styles.wrap}><H>{t('My reviews', 'मेरे रिव्यू', 'ਮੇਰੇ ਰਿਵਿਊ')}</H>{fresh > 0 ? <Tag tone="n">{t(`${fresh} new`, `${fresh} नए`, `${fresh} ਨਵੇਂ`)}</Tag> : <Tag tone="x">{t('All read', 'सब पढ़ लिए', 'ਸਾਰੇ ਪੜ੍ਹ ਲਏ')}</Tag>}</Row>
        {reviews.map((r, i) => (
          <ReviewCard key={r.id} review={r} selected={i === 0 && !seen.includes(r.id)} outcome={done[r.id] && tx(t, done[r.id])}
            onPress={() => markSeen(r.id)} onAction={() => open(r, r.action!)} />
        ))}
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={!!sheet} onClose={() => setSheet(null)}>
        {sheet?.kind === 'thanks' && (
          <>
            <H2>{t('Say thank you', 'धन्यवाद कहें', 'ਧੰਨਵਾਦ ਕਹੋ')} · {tx(t, sheet.r.place)}</H2>
            {thankYouMessages.map((m) => <Card key={m.en} sel={msg === m} onPress={() => setMsg(m)} style={{ paddingVertical: 9 }}><T>{tx(t, m)}</T></Card>)}
            <Button onPress={() => close(sheet.r, reviewOutcomes.thanked, t('Thank-you sent', 'धन्यवाद भेजा', 'ਧੰਨਵਾਦ ਭੇਜਿਆ'))}>{t('Send', 'भेजें', 'ਭੇਜੋ')}</Button>
          </>
        )}
        {sheet?.kind === 'contest' && (
          <>
            <H2>{t('This was not fair', 'यह सही नहीं था', 'ਇਹ ਠੀਕ ਨਹੀਂ ਸੀ')} · {tx(t, sheet.r.place)}</H2>
            <T s m>{t('Tell us what happened. If we agree, this rating is removed from your score.', 'बताएँ क्या हुआ। अगर हम सहमत हुए, तो यह रेटिंग आपके स्कोर से हटा दी जाएगी।', 'ਦੱਸੋ ਕੀ ਹੋਇਆ। ਜੇ ਅਸੀਂ ਸਹਿਮਤ ਹੋਏ, ਤਾਂ ਇਹ ਰੇਟਿੰਗ ਤੁਹਾਡੇ ਸਕੋਰ ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤੀ ਜਾਵੇਗੀ।')}</T>
            <Input small multiline value={why} onChangeText={setWhy} placeholder={t('e.g. The balcony was locked', 'जैसे, बालकनी पर ताला था', 'ਜਿਵੇਂ, ਬਾਲਕਨੀ ਨੂੰ ਤਾਲਾ ਲੱਗਿਆ ਸੀ')} />
            <Button disabled={!why.trim()} onPress={() => close(sheet.r, reviewOutcomes.review, t('Sent to our team. We reply in 48 hours.', 'हमारी टीम को भेजा। 48 घंटे में जवाब देंगे।', 'ਸਾਡੀ ਟੀਮ ਨੂੰ ਭੇਜਿਆ। 48 ਘੰਟਿਆਂ ਵਿੱਚ ਜਵਾਬ ਦੇਵਾਂਗੇ।'))}>
              {t('Send to Saathi team', 'Saathi टीम को भेजें', 'Saathi ਟੀਮ ਨੂੰ ਭੇਜੋ')}
            </Button>
          </>
        )}
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  wrap: { flexWrap: 'wrap', rowGap: 6 },
});

export default ReviewsScreen;
