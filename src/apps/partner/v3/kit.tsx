/** Small helpers used only by the partner v3 screens. */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { palette, T, useTheme } from '@/native/ui';

/** Thin progress bar. `pct` 0–1. `track` defaults to the header's dark green. */
export function Progress({ pct, track = '#2d6a5b', fill = palette.yellow, height = 8, extra, style }: {
  pct: number; track?: string; fill?: string; height?: number; extra?: number; style?: ViewStyle;
}) {
  const p = Math.max(0, Math.min(1, pct));
  const e = Math.max(0, Math.min(1 - p, extra ?? 0));
  return (
    <View style={[{ height, borderRadius: height / 2, backgroundColor: track, flexDirection: 'row', overflow: 'hidden' }, style]}>
      <View style={{ width: `${p * 100}%`, height: '100%', borderRadius: height / 2, backgroundColor: fill }} />
      {e > 0 && <View style={{ width: `${e * 100}%`, height: '100%', backgroundColor: fill, opacity: 0.4 }} />}
    </View>
  );
}

/** White text on the green `.top` header. */
export const TopS = ({ children, style }: { children: React.ReactNode; style?: object }) => (
  <T s color="#fff" style={[{ opacity: 0.8 }, style]}>{children}</T>
);
export const TopH = ({ children, size = 26 }: { children: React.ReactNode; size?: number }) => {
  const { fs } = useTheme();
  return <T b color="#fff" style={{ fontSize: fs(size), lineHeight: fs(size * 1.2), letterSpacing: -0.2 }}>{children}</T>;
};

/** Square photo / label tile used on the photo-check screen. */
export function PhotoTile({ label, dark, children }: { label?: string; dark?: boolean; children?: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={{ width: 58, height: 58, borderRadius: 11, backgroundColor: dark ? '#2a2f2d' : c.mint, alignItems: 'center', justifyContent: 'center' }}>
      {children ?? <T s color={dark ? '#fff' : c.accent}>{label}</T>}
    </View>
  );
}

export const weekAhead = (weeks: number, from = new Date(2026, 10, 17)) => {
  const d = new Date(from.getTime() + Math.ceil(weeks) * 7 * 864e5);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};
