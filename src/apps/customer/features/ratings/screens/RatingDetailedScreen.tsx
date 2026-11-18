import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Input, Lft, ListCard, Pill, Row, Screen, Spacer, Stars, T, Toggle, useNav, useT, useTheme } from '@/native/ui';
import { defaultParts, defaultPoints, photoPoints, ratePoints, ratingRows, sampleReviewText } from '../data';
import { useRatingState } from '../state';
import { tr } from '../../helpers';

/** Design page 13 · screen 44, detailed rating. */
export function RatingDetailedScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useRatingState();
  const [overall, setOverall] = useState(4);
  const [parts, setParts] = useState(defaultParts);
  const [text, setText] = useState(() => tr(t, sampleReviewText));
  const [photo, setPhoto] = useState(false);
  const [showName, setShowName] = useState(true);
  const avg = (parts.time + parts.quality + parts.behaviour) / 3;
  const togglePhoto = () => { setPhoto(!photo); nav.toast(photo ? t('Photo removed', 'फ़ोटो हटाई', 'ਫ਼ੋਟੋ ਹਟਾਈ') : t('Photo added', 'फ़ोटो जोड़ी', 'ਫ਼ੋਟੋ ਜੋੜੀ')); };
  const submit = () => {
    const pts = ratePoints + (photo ? photoPoints : 0);
    set({ rating: overall, ratingParts: parts, points: (st.points ?? defaultPoints) + pts });
    if (avg < 3) { nav.push('ratingLow', { stars: Math.round(avg) }); return; }
    nav.toast(t(`Thanks for rating Sunita · +${pts} points`, `सुनीता को रेट करने के लिए धन्यवाद · +${pts} पॉइंट`, `ਸੁਨੀਤਾ ਨੂੰ ਰੇਟ ਕਰਨ ਲਈ ਧੰਨਵਾਦ · +${pts} ਪੁਆਇੰਟ`));
    nav.reset('bookings');
  };
  return (
    <Screen>
      <BackHeader title={t('Rate your visit', 'विज़िट को रेट करें', 'ਵਿਜ਼ਿਟ ਨੂੰ ਰੇਟ ਕਰੋ')} onBack={nav.back} />
      <View style={styles.overall}>
        <T s m center>{t('Overall, with Sunita D.', 'सुनीता डी. के साथ, कुल मिलाकर', 'ਸੁਨੀਤਾ ਡੀ. ਨਾਲ, ਕੁੱਲ ਮਿਲਾ ਕੇ')}</T>
        <Stars value={overall} onChange={setOverall} size={32} />
      </View>
      <ListCard gap={10}>
        {ratingRows.map(([k, l]) => (
          <Row key={k}><T style={styles.grow}>{tr(t, l)}</T><Stars value={parts[k]} onChange={(n) => setParts({ ...parts, [k]: n })} /></Row>
        ))}
      </ListCard>
      <Input small multiline value={text} onChangeText={setText} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)', 'ਹੋਰ ਦੱਸੋ (ਜੇ ਚਾਹੋ)')} style={[styles.note, { borderWidth: 1, borderRadius: 14 }]} />
      <Lft gap={6}>
        <Pill s onPress={togglePhoto} style={{ paddingVertical: 7, paddingHorizontal: 12 }}>
          <T s b color={c.accent}>{photo ? t('✓ Photo added', '✓ फ़ोटो जुड़ी', '✓ ਫ਼ੋਟੋ ਜੁੜ ਗਈ') : t('+ Add photo', '+ फ़ोटो जोड़ें', '+ ਫ਼ੋਟੋ ਜੋੜੋ')}</T>
        </Pill>
        <T s m style={styles.grow}>{t(`+${photoPoints} points for a photo review`, `फ़ोटो वाले रिव्यू पर +${photoPoints} पॉइंट`, `ਫ਼ੋਟੋ ਵਾਲੇ ਰਿਵਿਊ ਤੇ +${photoPoints} ਪੁਆਇੰਟ`)}</T>
      </Lft>
      <Card row><T style={styles.grow}>{t('Show my first name on the review', 'रिव्यू पर मेरा पहला नाम दिखाएँ', 'ਰਿਵਿਊ ਤੇ ਮੇਰਾ ਪਹਿਲਾ ਨਾਮ ਵਿਖਾਓ')}</T><Toggle on={showName} onChange={setShowName} /></Card>
      <Spacer />
      <Button onPress={submit}>{t('Submit rating', 'रेटिंग भेजें', 'ਰੇਟਿੰਗ ਭੇਜੋ')}</Button>
    </Screen>
  );
}

export default RatingDetailedScreen;

const styles = StyleSheet.create({
  overall: { alignItems: 'center', gap: 6 },
  note: { minHeight: 70 },
  grow: { flex: 1 },
});
