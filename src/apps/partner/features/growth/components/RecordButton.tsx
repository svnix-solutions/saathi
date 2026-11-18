import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Circle, Icon, palette, useT, useTheme } from '@/native/ui';

/** Big round mic button: green when idle, red on yellow while recording. */
export function RecordButton({ recording, onPress }: { recording: boolean; onPress: () => void }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={recording ? t('Stop recording', 'रिकॉर्डिंग रोकें', 'ਰਿਕਾਰਡਿੰਗ ਰੋਕੋ') : t('Record', 'रिकॉर्ड करें', 'ਰਿਕਾਰਡ ਕਰੋ')}>
      <Circle size={96} bg={recording ? palette.yellow : c.mint}>
        <View style={[styles.mic, { backgroundColor: recording ? palette.red : palette.green }]}>
          <Icon name="mic" size={28} color={palette.white} />
        </View>
      </Circle>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mic: { width: 66, height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
});

export default RecordButton;
