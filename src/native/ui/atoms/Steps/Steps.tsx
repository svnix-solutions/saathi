import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { T } from '../T';

export type StepsProps = {
  /** how many segments are filled */
  step: number;
  total: number;
  /** optional caption under the bar ("Sign-up · step 2 of 6") */
  label?: string;
};

/** Segmented step progress used in sign-up: `step` of `total` segments filled green. */
export function Steps({ step, total, label }: StepsProps) {
  const { c } = useTheme();
  const bar = (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => <View key={i} style={[styles.seg, { backgroundColor: i < step ? palette.green : c.line }]} />)}
    </View>
  );
  if (label === undefined) return bar;
  return <View style={styles.wrap}>{bar}<T s m>{label}</T></View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 5 },
  seg: { flex: 1, height: 5, borderRadius: 3 },
  wrap: { gap: 11 },
});
