import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { font, palette, radius } from '@/tokens';

/** Transient message at the top of the phone (`nav.toast(msg)` shows one through the Phone frame). */
export function Toast({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { position: 'absolute', top: 12, left: 12, right: 12, zIndex: 60, backgroundColor: palette.ink, borderRadius: radius.input, paddingVertical: 10, paddingHorizontal: 12 },
  text: { color: '#fff', fontFamily: font.family, fontSize: 12, fontWeight: '600' },
});
