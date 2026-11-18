import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { font, palette, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type BubbleProps = {
  children: React.ReactNode;
  /** my message: green, right aligned */
  me?: boolean;
};

/** Chat bubble (the design's `.bub`, `.bub.me`). */
export function Bubble({ children, me }: BubbleProps) {
  const { c, fs } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: me ? palette.green : c.mint, alignSelf: me ? 'flex-end' : 'flex-start' }]}>
      <Text style={[styles.text, { fontSize: fs(12), color: me ? '#fff' : c.ink }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { maxWidth: '82%', paddingVertical: 9, paddingHorizontal: 12, borderRadius: radius.bubble },
  text: { fontFamily: font.family },
});
