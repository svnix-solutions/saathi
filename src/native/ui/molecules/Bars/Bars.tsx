import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { T } from '../../atoms/T';

export type BarsProps = {
  /** bar heights, 0–1 */
  values: number[];
  /** index drawn in green */
  highlight?: number;
  /** labels under the bars */
  labels?: string[];
  /** chart height in px (default 96) */
  height?: number;
};

/** Simple bar chart (partner earnings by day). Bars under 0.1 are drawn in the line colour. */
export function Bars({ values, highlight, labels, height = 96 }: BarsProps) {
  const { c } = useTheme();
  return (
    <View>
      <View style={[styles.chart, { height }]}>
        {values.map((v, i) => <View key={i} style={[styles.bar, { height: `${Math.max(v, 0.04) * 100}%`, backgroundColor: i === highlight ? palette.green : v < 0.1 ? c.line : c.mint }]} />)}
      </View>
      {labels && <View style={styles.labels}>{labels.map((l, i) => <T key={i} s m center style={styles.label}>{l}</T>)}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 9 },
  bar: { flex: 1, borderRadius: radius.bar },
  labels: { flexDirection: 'row', gap: 9, marginTop: 6 },
  label: { flex: 1 },
});
