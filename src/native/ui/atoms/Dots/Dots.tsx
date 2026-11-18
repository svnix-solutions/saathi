import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type DotsProps = {
  count: number;
  /** index of the current item (drawn as a 16px pill) */
  active: number;
  /** tap a dot to jump to it */
  onPress?: (i: number) => void;
};

/** Carousel position dots: the current one is a short green pill. */
export function Dots({ count, active, onPress }: DotsProps) {
  const { c } = useTheme();
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <Pressable key={i} onPress={() => onPress?.(i)} hitSlop={6} accessibilityLabel={`Show ${i + 1}`}
          style={[styles.dot, { width: i === active ? 16 : 6, backgroundColor: i === active ? palette.green : c.line }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 5 },
  dot: { height: 6, borderRadius: 3 },
});
