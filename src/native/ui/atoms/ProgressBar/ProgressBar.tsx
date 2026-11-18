import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { palette, tint } from '@/tokens';

export type ProgressBarProps = {
  /** filled share, 0–1 (clamped) */
  value: number;
  /** track colour (default the header's dark green, for use inside a green TopBar) */
  track?: string;
  /** fill colour (default Quick Yellow) */
  fill?: string;
  /** bar height in px (default 8) */
  height?: number;
  /** a second, faded segment after the fill (0–1), e.g. "after this week" */
  extra?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Thin progress bar, yellow on dark green by default (training, bonus, goals inside the green header).
 * For green-on-mint meters with a threshold tick use `Meter`.
 */
export function ProgressBar({ value, track = tint.greenTrack, fill = palette.yellow, height = 8, extra, style }: ProgressBarProps) {
  const p = Math.max(0, Math.min(1, value));
  const e = Math.max(0, Math.min(1 - p, extra ?? 0));
  return (
    <View style={[styles.track, { height, borderRadius: height / 2, backgroundColor: track }, style]}>
      <View style={[styles.fill, { width: `${p * 100}%`, borderRadius: height / 2, backgroundColor: fill }]} />
      {e > 0 && <View style={[styles.extra, { width: `${e * 100}%`, backgroundColor: fill }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', overflow: 'hidden' },
  fill: { height: '100%' },
  extra: { height: '100%', opacity: 0.4 },
});
