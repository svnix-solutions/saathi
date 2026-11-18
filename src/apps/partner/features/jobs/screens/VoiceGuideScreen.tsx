/** Design page 30 (section 56 "WORKER G"), screen 47 · Voice guide: the job read aloud, answered by voice. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Bubble, Button, Card, H2, Icon, IconTile, Lft, ProgressBar, Row, Screen, Spacer, T, Tag, palette, useT, useTheme } from '@/native/ui';
import { voiceScript, voiceScriptEn, voiceScriptPa, voiceTicks } from '../data';
import { useVoiceOffer } from '../hooks/useVoiceOffer';
import { tint } from '@/tokens';

export function VoiceGuideScreen() {
  const t = useT();
  const { c, locale } = useTheme();
  /** the job is read aloud in Punjabi when the app is in Punjabi, else in Hindi; the English line under it shows in English only */
  const script = locale === 'pa' ? voiceScriptPa : voiceScript;
  const { playing, step, done, secs, heard, shown, accept, decline, mic, replay } = useVoiceOffer();
  return (
    <Screen bg={palette.greenD}>
      <Row>
        <H2 color={palette.white} style={styles.fill}>{t('New job', 'नया काम', 'ਨਵਾਂ ਕੰਮ')}</H2>
        <Tag>{secs > 0 ? t(`Accept in 0:${String(secs).padStart(2, '0')}`, `स्वीकार करें 0:${String(secs).padStart(2, '0')}`, `0:${String(secs).padStart(2, '0')} ਵਿੱਚ ਮਨਜ਼ੂਰ ਕਰੋ`) : t('Time up', 'समय खत्म', 'ਸਮਾਂ ਖ਼ਤਮ')}</Tag>
      </Row>
      <Card>
        <Lft>
          <IconTile name="mic" bg={palette.yellow} color={palette.ink} onPress={replay} />
          <View style={styles.fill}>
            <H2>{done ? t('Read aloud · tap to replay', 'सुन लिया · फिर से सुनें', 'ਸੁਣ ਲਿਆ · ਦੁਬਾਰਾ ਸੁਣੋ') : playing ? t('Reading the job aloud', 'काम पढ़ा जा रहा है', 'ਕੰਮ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ') : t('Paused', 'रुका हुआ', 'ਰੁਕਿਆ ਹੋਇਆ')}</H2>
            <T s m>{t('हिन्दी में सुनें', 'हिन्दी में सुनें', 'ਪੰਜਾਬੀ ਵਿੱਚ ਸੁਣੋ')}</T>
          </View>
        </Lft>
        <View style={{ marginTop: 10 }}>
          <Bubble>
            <T size={13}>"{script.map((w, i) => <T key={i} size={13} color={i < shown ? c.ink : c.mut} style={{ opacity: i < shown ? 1 : 0.35 }}>{w} </T>)}"</T>
          </Bubble>
        </View>
        <ProgressBar value={step / voiceTicks} track={c.line} fill={palette.green} height={4} style={{ marginTop: 9 }} />
        {locale === 'en' && <T s m style={{ marginTop: 6 }}>{voiceScriptEn.slice(0, Math.max(1, shown)).join(' ')}</T>}
      </Card>
      <T s center color={tint.onDeepGreenMuted}>{heard ? `${t('Heard', 'सुना', 'ਸੁਣਿਆ')}: "${t(heard, heard, 'ਹਾਂ')}"` : t('Say "हाँ" to accept or "नहीं" to decline', 'काम लेने के लिए "हाँ" बोलें, मना करने के लिए "नहीं"', 'ਕੰਮ ਲੈਣ ਲਈ "ਹਾਂ" ਬੋਲੋ, ਮਨ੍ਹਾ ਕਰਨ ਲਈ "ਨਹੀਂ"')}</T>
      <Pressable onPress={mic} accessibilityRole="button" accessibilityLabel={playing ? t('Pause', 'रोकें', 'ਰੋਕੋ') : t('Play', 'चलाएँ', 'ਚਲਾਓ')} style={styles.micRing}>
        <View style={styles.mic}>
          {playing ? (
            <View style={styles.pause}><View style={styles.pauseBar} /><View style={styles.pauseBar} /></View>
          ) : <Icon name="mic" size={26} color={palette.ink} />}
        </View>
      </Pressable>
      <T s center color={tint.onDeepGreenMuted}>{done ? t('Tap the mic and answer', 'माइक दबाएँ और बोलें', 'ਮਾਈਕ ਦਬਾਓ ਅਤੇ ਬੋਲੋ') : playing ? t('Tap to pause', 'रोकने के लिए दबाएँ', 'ਰੋਕਣ ਲਈ ਦਬਾਓ') : t('Tap to keep listening', 'सुनने के लिए दबाएँ', 'ਸੁਣਨ ਲਈ ਦਬਾਓ')}</T>
      <Spacer />
      <Button variant="yellow" style={{ paddingVertical: 16 }} textStyle={{ fontSize: 15 }} onPress={accept}>{t('Accept job', 'काम लें', 'ਕੰਮ ਲਓ')}</Button>
      <Button variant="ghostDark" onPress={decline}>{t('Decline', 'मना करें', 'ਮਨ੍ਹਾ ਕਰੋ')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  micRing: { alignSelf: 'center', width: 84, height: 84, borderRadius: 42, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' },
  mic: { width: 58, height: 58, borderRadius: 29, backgroundColor: palette.yellow, alignItems: 'center', justifyContent: 'center' },
  pause: { flexDirection: 'row', gap: 5 },
  pauseBar: { width: 6, height: 22, backgroundColor: palette.ink, borderRadius: 2 },
});

export default VoiceGuideScreen;
