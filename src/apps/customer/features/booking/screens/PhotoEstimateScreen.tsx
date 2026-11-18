/** Design page 16 (CUSTOMER H) · Voice, photo estimate and smart booking — screen 57 · Photo estimate. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, Check, H, H2, Icon, Lft, Link, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { dur, rupees } from '@/domain';
import { radius } from '@/tokens';
import { PHOTO_SUGGESTED, choreName } from '../data';
import { usePhotoEstimate, type PhotoPhase } from '../hooks/usePhotoEstimate';
import { useBookingState } from '../state';

export function PhotoEstimateScreen({ params }: ScreenProps<{ phase?: PhotoPhase }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useBookingState();
  const { phase, setPhase, tasks, toggle, minutes, price, hours } = usePhotoEstimate(params?.phase ?? 'camera');
  const use = () => {
    if (!tasks.length) { nav.toast(t('Pick at least one task', 'कम से कम एक काम चुनें', 'ਘੱਟੋ-ਘੱਟ ਇੱਕ ਕੰਮ ਚੁਣੋ')); return; }
    set({ service: 'kitchenBath', tasks, minutes });
    nav.push('time');
  };
  const hrs = hours % 1 ? hours.toFixed(1) : String(hours);
  const tapPhoto = () => setPhase(phase === 'camera' ? 'analysing' : phase === 'estimate' ? 'camera' : phase);
  const photoText = phase === 'camera' ? t('Tap to take a photo of the room', 'कमरे की फ़ोटो लेने के लिए दबाएँ', 'ਕਮਰੇ ਦੀ ਫ਼ੋਟੋ ਲੈਣ ਲਈ ਦਬਾਓ')
    : phase === 'analysing' ? t('Looking at your kitchen…', 'आपकी रसोई देख रहे हैं…', 'ਤੁਹਾਡੀ ਰਸੋਈ ਦੇਖ ਰਹੇ ਹਾਂ…') : t('Your kitchen photo', 'आपकी रसोई की फ़ोटो', 'ਤੁਹਾਡੀ ਰਸੋਈ ਦੀ ਫ਼ੋਟੋ');
  return (
    <Screen>
      <BackHeader title={t('Photo estimate', 'फ़ोटो से अनुमान', 'ਫ਼ੋਟੋ ਤੋਂ ਅੰਦਾਜ਼ਾ')} fallback="home" />
      <Pressable onPress={tapPhoto} accessibilityRole="button" accessibilityLabel={phase === 'camera' ? t('Take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ') : t('Retake photo', 'फ़ोटो फिर से लें', 'ਫ਼ੋਟੋ ਦੁਬਾਰਾ ਲਓ')}
        style={[styles.photo, { backgroundColor: c.mint, borderWidth: phase === 'camera' ? 1.5 : 0, borderColor: c.accent }]}>
        <View style={styles.center}>
          <Icon name="cam" size={30} color={c.accent} />
          <T s color={c.accent}>{photoText}</T>
        </View>
        {phase === 'estimate' && <Tag style={{ position: 'absolute', left: 10, top: 10 }}>{t('Greasy slab', 'चिकनी स्लैब', 'ਚਿਕਨੀ ਸਲੈਬ')}</Tag>}
        {phase === 'estimate' && <Tag style={{ position: 'absolute', right: 10, bottom: 10 }}>{t('Full sink', 'भरा हुआ सिंक', 'ਭਰਿਆ ਹੋਇਆ ਸਿੰਕ')}</Tag>}
        {phase === 'analysing' && <View style={styles.scanLine} />}
      </Pressable>
      {phase === 'estimate' ? (
        <>
          <Row><H2>{t('Suggested for this room', 'इस कमरे के लिए सुझाव', 'ਇਸ ਕਮਰੇ ਲਈ ਸੁਝਾਅ')}</H2><Link onPress={() => setPhase('camera')}>{t('Retake', 'फिर से लें', 'ਦੁਬਾਰਾ ਲਓ')}</Link></Row>
          <Card style={styles.list}>
            {PHOTO_SUGGESTED.map((k) => (
              <Pressable key={k} onPress={() => toggle(k)} accessibilityRole="checkbox" accessibilityState={{ checked: tasks.includes(k) }}>
                <Row><Lft><Check on={tasks.includes(k)} /><T>{choreName(t, k)}</T></Lft><T m>{dur(t, 30)}</T></Row>
              </Pressable>
            ))}
          </Card>
          <T s m>{t(
            'An estimate from the photo. You can change anything, and the helper confirms at the door.',
            'फ़ोटो से अनुमान। आप कुछ भी बदल सकते हैं, हेल्पर दरवाज़े पर पक्का करेगी।',
            'ਫ਼ੋਟੋ ਤੋਂ ਅੰਦਾਜ਼ਾ। ਤੁਸੀਂ ਕੁਝ ਵੀ ਬਦਲ ਸਕਦੇ ਹੋ, ਹੈਲਪਰ ਦਰਵਾਜ਼ੇ ਤੇ ਪੱਕਾ ਕਰੇਗੀ।',
          )}</T>
          <Spacer />
          <Row gap={12}>
            <View><T s m>{t(`About ${hrs} hr`, `लगभग ${hrs} घंटा`, `ਲਗਭਗ ${hrs} ਘੰਟਾ`)}</T><H>{rupees(price)}</H></View>
            <Button style={styles.grow} onPress={use}>{t('Use this', 'यही लें', 'ਇਹੀ ਲਓ')}</Button>
          </Row>
        </>
      ) : (
        <>
          <T s m>{phase === 'camera'
            ? t('Take one photo of the room. We suggest the chores, the time and the price.', 'कमरे की एक फ़ोटो लें। हम काम, समय और दाम बताएँगे।', 'ਕਮਰੇ ਦੀ ਇੱਕ ਫ਼ੋਟੋ ਲਓ। ਅਸੀਂ ਕੰਮ, ਸਮਾਂ ਅਤੇ ਕੀਮਤ ਦੱਸਾਂਗੇ।')
            : t('Spotting what needs cleaning…', 'देख रहे हैं क्या साफ़ करना है…', 'ਦੇਖ ਰਹੇ ਹਾਂ ਕੀ ਸਾਫ਼ ਕਰਨਾ ਹੈ…')}</T>
          <Spacer />
          <Button disabled={phase === 'analysing'} icon="cam" onPress={() => setPhase('analysing')}>{phase === 'analysing' ? t('Analysing…', 'जाँच रहे हैं…', 'ਜਾਂਚ ਰਹੇ ਹਾਂ…') : t('Take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ')}</Button>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  photo: { height: 150, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center', position: 'relative', borderStyle: 'dashed' },
  center: { alignItems: 'center' },
  scanLine: { position: 'absolute', left: 14, right: 14, top: '55%', height: 2, backgroundColor: palette.green, opacity: 0.6 },
  list: { gap: 9 },
  grow: { flex: 1 },
});

export default PhotoEstimateScreen;
