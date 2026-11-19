import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, T, useTheme } from '@/native/ui';
import { radius } from '@/tokens';

/** "Prescription checked by Dr …": a mint chip with a shield that wraps on a small phone (Tag stays on one line). */
export function RxTag({ children }: { children: string }) {
  const { c } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: c.mint, borderRadius: radius.tag, paddingVertical: 3, paddingHorizontal: 9 }]}>
      <Icon name="shield" size={12} color={c.accent} />
      <T s b color={c.accent} style={styles.fill}>{children}</T>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', maxWidth: '100%' },
  fill: { flexShrink: 1 },
});

export default RxTag;
