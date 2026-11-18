/** Design page 22 (section 54), screen 18 · Selfie: camera preview → captured → uploading → done. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, H2, Page, Row, Screen, Spacer, T, palette, useNav, useT, type ScreenProps } from '@/native/ui';
import { jobColors } from '../data';
import { useSelfieUpload } from '../hooks/useSelfieUpload';
import { useJobsState } from '../state';

export function SelfieScreen({ params }: ScreenProps<{ mode?: 'in' | 'out' }>) {
  const t = useT();
  const nav = useNav();
  const [, set] = useJobsState();
  const mode = params.mode ?? 'in';
  const { phase, pct, take, retake, use } = useSelfieUpload(() => {
    if (mode === 'in') {
      set({ selfieIn: true, checkedInAt: '11:08 am', jobEndsAt: Date.now() + 60 * 60 * 1000 });
      nav.reset('onJob');
      nav.toast(t('Checked in at 11:08 am. The clock has started.', '11:08 am पर चेक-इन। समय शुरू।'));
    } else {
      set({ selfieOut: true });
      nav.back();
      nav.toast(t('Check-out selfie added', 'चेक-आउट सेल्फ़ी जुड़ गई'));
    }
  });
  const dim = jobColors.onDarkDim;
  return (
    <Page bg={palette.ink}>
      <Screen bg={palette.ink} gap={12}>
        <Row>
          <H2 color={palette.white}>{mode === 'in' ? t('Check-in selfie', 'चेक-इन सेल्फ़ी') : t('Check-out selfie', 'चेक-आउट सेल्फ़ी')}</H2>
          <Pressable onPress={nav.back} hitSlop={8} accessibilityRole="button"><T s color={palette.white} style={styles.dim}>{t('Close', 'बंद')}</T></Pressable>
        </Row>
        <Pressable onPress={take} accessibilityLabel={t('Take photo', 'फ़ोटो लें')} style={styles.camera}>
          <View style={[styles.oval, { borderStyle: phase === 'camera' ? 'dashed' : 'solid' }]}>
            {phase === 'camera'
              ? <T s center color={dim}>{t('Camera', 'कैमरा')}{'\n'}{t('preview', 'प्रीव्यू')}</T>
              : <Avatar face="sd" size={190} bg={jobColors.cameraBg} />}
          </View>
        </Pressable>
        <T s center color={dim}>{t('Keep your face in the oval. Uniform and ID card should be visible.', 'चेहरा अंडाकार में रखें। वर्दी और आईडी कार्ड दिखने चाहिए।')}</T>
        <Spacer />
        <View style={styles.controls}>
          <Pressable onPress={retake} disabled={phase === 'camera'} style={styles.side} accessibilityRole="button">
            <T s center color={palette.white} style={{ opacity: phase === 'camera' ? 0.4 : 1 }}>{t('Retake', 'फिर लें')}</T>
          </Pressable>
          <Pressable onPress={take} accessibilityRole="button" accessibilityLabel={t('Take photo', 'फ़ोटो लें')}
            style={[styles.shutter, { opacity: phase === 'camera' ? 1 : 0.5 }]} />
          <Pressable onPress={use} disabled={phase !== 'taken'} style={styles.side} accessibilityRole="button">
            <T s center b color={palette.yellow} style={{ opacity: phase === 'taken' ? 1 : 0.4 }}>{t('Use photo', 'यही रखें')}</T>
          </Pressable>
        </View>
        <View style={{ opacity: phase === 'upload' ? 1 : 0.35 }}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${phase === 'upload' ? pct : 0}%` }]} />
          </View>
          <T s center color={dim} style={{ marginTop: 5 }}>
            {phase === 'upload' ? t(`Uploading ${pct}% · works on slow internet`, `अपलोड ${pct}% · धीमे इंटरनेट पर भी`) : phase === 'taken' ? t('Looks good? Tap “Use photo”', 'ठीक है? “यही रखें” दबाएँ') : t('Tap the white button to take the photo', 'फ़ोटो के लिए सफ़ेद बटन दबाएँ')}
          </T>
        </View>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.8 },
  camera: { height: 300, borderRadius: 18, backgroundColor: jobColors.cameraBg, alignItems: 'center', justifyContent: 'center' },
  oval: { width: 150, height: 200, borderRadius: 100, borderWidth: 3, borderColor: palette.yellow, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 26 },
  side: { width: 60 },
  shutter: { width: 66, height: 66, borderRadius: 33, backgroundColor: palette.white, borderWidth: 5, borderColor: palette.yellow },
  track: { height: 6, borderRadius: 4, backgroundColor: jobColors.cameraBg },
  fill: { height: '100%', borderRadius: 4, backgroundColor: palette.yellow },
});

export default SelfieScreen;
