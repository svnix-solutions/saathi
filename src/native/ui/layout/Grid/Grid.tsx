import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export type GridProps = {
  /** columns (default 2) */
  cols?: number;
  /** gap in px (default 9 for 2 columns, 7 for 3) */
  gap?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Equal-column grid (the design's `.g2` / `.g3`). A short last row is padded with empty cells. */
export function Grid({ cols = 2, gap, children, style }: GridProps) {
  const g = gap ?? (cols === 3 ? 7 : 9);
  const items = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];
  items.forEach((it, i) => { if (i % cols === 0) rows.push([]); rows[rows.length - 1].push(it); });
  return (
    <View style={[{ gap: g }, style]}>
      {rows.map((r, i) => (
        <View key={i} style={[styles.row, { gap: g }]}>
          {r.map((it, j) => <View key={j} style={styles.cell}>{it}</View>)}
          {r.length < cols && Array.from({ length: cols - r.length }).map((_, j) => <View key={'e' + j} style={styles.empty} />)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  cell: { flex: 1, minWidth: 0 },
  empty: { flex: 1 },
});
