/** Design page 16 (CUSTOMER H) · Voice, photo estimate and smart booking — screen 56 · Voice booking. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Bubble, Button, Card, Grid, H2, Icon, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { priceFor, rupees } from '@/domain';
import { useVoiceListening, type VoicePhase } from '../hooks/useVoiceListening';
import { useBookingState } from '../state';

const RING = 104;
const RING_PULSE = 116;

export function VoiceBookingScreen({ params }: ScreenProps<{ phase?: VoicePhase }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [, set] = useBookingState();
  const { phase, listening, pulse, toggle } = useVoiceListening(params?.phase ?? 'idle');
  const price = priceFor('general', 60);
  const book = () => {
    set({ service: 'general', minutes: 60, when: 'later', note: 'Kitchen first', slot: 'Tomorrow, 9:00 am' });
    nav.push('confirm');
  };
  const change = () => { set({ service: 'general', note: 'Kitchen first' }); nav.push('chores', { service: 'general' }); };
  const ring = listening && pulse ? RING_PULSE : RING;
  const hint = phase === 'idle' ? t('Tap the mic and say what you need', 'माइक दबाएँ और बताएँ क्या चाहिए')
    : listening ? t('Listening…', 'सुन रहे हैं…') : t('Tap the mic to say it again', 'दोबारा बोलने के लिए माइक दबाएँ');
  return (
    <Screen>
      <Row><H2>{t('Speak to book', 'बोलकर बुक करें')}</H2><Tag tone="n">हिन्दी · English · ਪੰਜਾਬੀ</Tag></Row>
      <View style={styles.micArea}>
        <Pressable onPress={toggle} accessibilityRole="button" accessibilityLabel={listening ? 'Stop listening' : 'Speak'}
          style={[styles.ring, { width: ring, height: ring, borderRadius: ring / 2, backgroundColor: c.mint }]}>
          <View style={styles.mic}>
            <Icon name="mic" size={30} color={palette.white} />
          </View>
        </Pressable>
      </View>
      <T s m center>{hint}</T>
      {phase === 'idle' && (
        <Card style={styles.examples}>
          <T s m>Try saying</T>
          <T>“कल सुबह 9 बजे एक घंटे की सफ़ाई चाहिए”</T>
          <T>“Dishes for 30 minutes, now”</T>
        </Card>
      )}
      {phase === 'done' && (
        <>
          <Bubble me>कल सुबह 9 बजे एक घंटे की सफ़ाई चाहिए, रसोई पहले।</Bubble>
          <H2>{t('We understood', 'हमने समझा')}</H2>
          <Card sel style={styles.understood}>
            <Row><T m>Service</T><T b>General cleaning</T></Row>
            <Row><T m>When</T><T b>Tomorrow, 9:00 am</T></Row>
            <Row><T m>How long</T><T b>1 hr · {rupees(price)}</T></Row>
            <Row><T m>Note</T><T b>Kitchen first</T></Row>
          </Card>
        </>
      )}
      <Spacer />
      {phase === 'done' && (
        <Grid cols={2}>
          <Button variant="outline" style={{ paddingVertical: 11 }} onPress={change}>{t('Change', 'बदलें')}</Button>
          <Button style={{ paddingVertical: 12 }} onPress={book}>{t('Book it', 'बुक करें')}</Button>
        </Grid>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  micArea: { height: 116, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  ring: { alignItems: 'center', justifyContent: 'center' },
  mic: { width: 72, height: 72, borderRadius: 36, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' },
  examples: { gap: 4 },
  understood: { gap: 7 },
});

export default VoiceBookingScreen;
