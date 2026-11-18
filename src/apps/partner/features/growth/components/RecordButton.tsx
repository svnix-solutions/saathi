import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Circle, Icon, palette, useTheme } from '@/native/ui';

/** Big round mic button: green when idle, red on yellow while recording. */
export function RecordButton({ recording, onPress }: { recording: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={recording ? 'Stop recording' : 'Record'}>
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
