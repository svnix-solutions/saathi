import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/native/ui';

/** Two buttons side by side, stacked on a small phone or with large text. */
export function ButtonRow({ children }: { children: React.ReactNode }) {
  const { device, textScale } = useTheme();
  const stack = device === 'small' || textScale > 1.1;
  return <View style={stack ? styles.col : styles.row}>{React.Children.map(children, (ch) => <View style={stack ? undefined : styles.fill}>{ch}</View>)}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  col: { gap: 8 },
  fill: { flex: 1 },
});

export default ButtonRow;
