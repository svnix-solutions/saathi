import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, T, palette, useT } from '@/native/ui';

export type LessonVideoProps = {
  playing: boolean;
  /** watched to the end: shows a tick and stops responding */
  finished: boolean;
  onToggle: () => void;
};

/** Dark-green video placeholder with a yellow play / pause / done button. */
export function LessonVideo({ playing, finished, onToggle }: LessonVideoProps) {
  const t = useT();
  return (
    <Pressable onPress={() => !finished && onToggle()} accessibilityRole="button" accessibilityLabel={playing ? t('Pause', 'रोकें', 'ਰੋਕੋ') : t('Play', 'चलाएँ', 'ਚਲਾਓ')} style={styles.frame}>
      <View style={styles.button}>
        {finished ? <Icon name="check" color={palette.ink} /> : playing ? <T b color={palette.ink}>II</T> : <T b color={palette.ink} size={16}>▶</T>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: { height: 120, borderRadius: 14, backgroundColor: palette.greenD, alignItems: 'center', justifyContent: 'center' },
  button: { width: 48, height: 48, borderRadius: 24, backgroundColor: palette.yellow, alignItems: 'center', justifyContent: 'center' },
});

export default LessonVideo;
