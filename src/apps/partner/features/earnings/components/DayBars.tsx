import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { T, palette, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { radius } from '@/tokens';
import { dayLetters } from '../data';

export type DayBarsProps = {
  /** each day's earnings in rupees, Monday first */
  values: number[];
  /** index of the selected day */
  selected: number;
  onSelect: (i: number) => void;
};

/** Daily earnings bars (M–S) you can tap; the selected day is green, an empty day grey. */
export function DayBars({ values, selected, onSelect }: DayBarsProps) {
  const { c } = useTheme();
  const max = Math.max(...values, 1);
  return (
    <View>
      <View style={styles.bars}>
        {values.map((v, i) => (
          <Pressable key={i} onPress={() => onSelect(i)} accessibilityLabel={`Day ${i + 1}: ${rupees(v)}`}
            style={[styles.bar, { height: `${Math.max(v / max, 0.08) * 100}%`, backgroundColor: i === selected ? palette.green : v === 0 ? c.line : c.mint }]} />
        ))}
      </View>
      <View style={styles.labels}>{dayLetters.map((l, i) => <T key={i} s m center style={styles.label}>{l}</T>)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 9, height: 96 },
  bar: { flex: 1, borderRadius: radius.bar },
  labels: { flexDirection: 'row', gap: 9, marginTop: 6 },
  label: { flex: 1 },
});

export default DayBars;
