/** Design page 16 (CUSTOMER H) · Voice, photo estimate and smart booking — screen 57 · Photo estimate. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, Check, H, H2, Icon, Lft, Link, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { rupees } from '@/domain';
import { radius } from '@/tokens';
import { PHOTO_SUGGESTED } from '../data';
import { usePhotoEstimate, type PhotoPhase } from '../hooks/usePhotoEstimate';
import { useBookingState } from '../state';

export function PhotoEstimateScreen({ params }: ScreenProps<{ phase?: PhotoPhase }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useBookingState();
  const { phase, setPhase, tasks, toggle, minutes, price, hours } = usePhotoEstimate(params?.phase ?? 'camera');
  const use = () => {
    if (!tasks.length) { nav.toast('Pick at least one task'); return; }
    set({ service: 'kitchenBath', tasks, minutes });
    nav.push('time');
  };
  const tapPhoto = () => setPhase(phase === 'camera' ? 'analysing' : phase === 'estimate' ? 'camera' : phase);
  const photoText = phase === 'camera' ? t('Tap to take a photo of the room', 'कमरे की फ़ोटो लेने के लिए दबाएँ')
    : phase === 'analysing' ? t('Looking at your kitchen…', 'आपकी रसोई देख रहे हैं…') : 'Your kitchen photo';
  return (
    <Screen>
      <BackHeader title={t('Photo estimate', 'फ़ोटो से अनुमान')} fallback="home" />
      <Pressable onPress={tapPhoto} accessibilityRole="button" accessibilityLabel={phase === 'camera' ? 'Take photo' : 'Retake photo'}
        style={[styles.photo, { backgroundColor: c.mint, borderWidth: phase === 'camera' ? 1.5 : 0, borderColor: c.accent }]}>
        <View style={styles.center}>
          <Icon name="cam" size={30} color={c.accent} />
          <T s color={c.accent}>{photoText}</T>
        </View>
        {phase === 'estimate' && <Tag style={{ position: 'absolute', left: 10, top: 10 }}>Greasy slab</Tag>}
        {phase === 'estimate' && <Tag style={{ position: 'absolute', right: 10, bottom: 10 }}>Full sink</Tag>}
        {phase === 'analysing' && <View style={styles.scanLine} />}
      </Pressable>
      {phase === 'estimate' ? (
        <>
          <Row><H2>{t('Suggested for this room', 'इस कमरे के लिए सुझाव')}</H2><Link onPress={() => setPhase('camera')}>{t('Retake', 'फिर से लें')}</Link></Row>
          <Card style={styles.list}>
            {PHOTO_SUGGESTED.map((k) => (
              <Pressable key={k} onPress={() => toggle(k)} accessibilityRole="checkbox" accessibilityState={{ checked: tasks.includes(k) }}>
                <Row><Lft><Check on={tasks.includes(k)} /><T>{k}</T></Lft><T m>30 min</T></Row>
              </Pressable>
            ))}
          </Card>
          <T s m>An estimate from the photo. You can change anything, and the helper confirms at the door.</T>
          <Spacer />
          <Row gap={12}>
            <View><T s m>About {hours % 1 ? hours.toFixed(1) : hours} hr</T><H>{rupees(price)}</H></View>
            <Button style={styles.grow} onPress={use}>{t('Use this', 'यही लें')}</Button>
          </Row>
        </>
      ) : (
        <>
          <T s m>{phase === 'camera'
            ? 'Take one photo of the room. We suggest the chores, the time and the price.'
            : 'Spotting what needs cleaning…'}</T>
          <Spacer />
          <Button disabled={phase === 'analysing'} icon="cam" onPress={() => setPhase('analysing')}>{phase === 'analysing' ? t('Analysing…', 'जाँच रहे हैं…') : t('Take photo', 'फ़ोटो लें')}</Button>
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
