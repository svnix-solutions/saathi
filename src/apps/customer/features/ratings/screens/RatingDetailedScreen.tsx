import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Input, Lft, ListCard, Pill, Row, Screen, Spacer, Stars, T, Toggle, useNav, useT, useTheme } from '@/native/ui';
import { defaultParts, defaultPoints, photoPoints, ratePoints, ratingRows, sampleReviewText } from '../data';
import { useRatingState } from '../state';

/** Design page 13 · screen 44, detailed rating. */
export function RatingDetailedScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useRatingState();
  const [overall, setOverall] = useState(4);
  const [parts, setParts] = useState(defaultParts);
  const [text, setText] = useState(sampleReviewText);
  const [photo, setPhoto] = useState(false);
  const [showName, setShowName] = useState(true);
  const avg = (parts.time + parts.quality + parts.behaviour) / 3;
  const togglePhoto = () => { setPhoto(!photo); nav.toast(photo ? 'Photo removed' : 'Photo added'); };
  const submit = () => {
    const pts = ratePoints + (photo ? photoPoints : 0);
    set({ rating: overall, ratingParts: parts, points: (st.points ?? defaultPoints) + pts });
    if (avg < 3) { nav.push('ratingLow', { stars: Math.round(avg) }); return; }
    nav.toast(`Thanks for rating Sunita · +${pts} points`);
    nav.reset('bookings');
  };
  return (
    <Screen>
      <BackHeader title={t('Rate your visit', 'विज़िट को रेट करें')} onBack={nav.back} />
      <View style={styles.overall}>
        <T s m>Overall, with Sunita D.</T>
        <Stars value={overall} onChange={setOverall} size={32} />
      </View>
      <ListCard gap={10}>
        {ratingRows.map(([k, l]) => (
          <Row key={k}><T>{l}</T><Stars value={parts[k]} onChange={(n) => setParts({ ...parts, [k]: n })} /></Row>
        ))}
      </ListCard>
      <Input small multiline value={text} onChangeText={setText} placeholder="Tell us more (optional)" style={[styles.note, { borderWidth: 1, borderRadius: 14 }]} />
      <Lft gap={6}>
        <Pill s onPress={togglePhoto} style={{ paddingVertical: 7, paddingHorizontal: 12 }}>
          <T s b color={c.accent}>{photo ? '✓ Photo added' : '+ Add photo'}</T>
        </Pill>
        <T s m>+20 points for a photo review</T>
      </Lft>
      <Card row><T style={styles.grow}>Show my first name on the review</T><Toggle on={showName} onChange={setShowName} /></Card>
      <Spacer />
      <Button onPress={submit}>{t('Submit rating', 'रेटिंग भेजें')}</Button>
    </Screen>
  );
}

export default RatingDetailedScreen;

const styles = StyleSheet.create({
  overall: { alignItems: 'center', gap: 6 },
  note: { minHeight: 70 },
  grow: { flex: 1 },
});
