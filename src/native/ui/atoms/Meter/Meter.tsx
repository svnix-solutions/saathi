import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type MeterProps = {
  /** filled share, 0–1 */
  value: number;
  /** threshold tick position, 0–1 (e.g. the 4.2 minimum rating) */
  mark?: number;
  /** the meter grows to fill its row (flex 1); pass `style={{ flex: 0 }}` to stop that */
  style?: StyleProp<ViewStyle>;
};

/** Green-on-mint meter (ratings breakdown, quality) with an optional ink threshold tick. */
export function Meter({ value, mark, style }: MeterProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.track, { backgroundColor: c.mint }, style]}>
      {value > 0 && <View style={[styles.fill, { width: `${Math.min(1, value) * 100}%` }]} />}
      {mark !== undefined && (
        <View style={[styles.mark, { left: `${mark * 100}%`, backgroundColor: c.ink }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flex: 1, height: 7, borderRadius: 4, position: 'relative' },
  fill: { height: '100%', borderRadius: 4, backgroundColor: palette.green },
  mark: { position: 'absolute', top: -3, width: 2, height: 13, borderRadius: 1 },
});
