import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { font, palette } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type BadgeProps = {
  /** number to show; omit for a plain dot */
  count?: number;
  /** above this shows "9+" (default 9) */
  max?: number;
  tone?: 'red' | 'yellow' | 'green';
  style?: StyleProp<ViewStyle>;
};

/**
 * Small count bubble or dot for an icon or tab ("3 new alerts").
 * Not the 64px round icon of the error screens: that is `StatusIcon` (partner/v1 kit called it `Badge`).
 */
export function Badge({ count, max = 9, tone = 'red', style }: BadgeProps) {
  const { fs } = useTheme();
  const bg = { red: palette.red, yellow: palette.yellow, green: palette.green }[tone];
  const fg = tone === 'yellow' ? palette.ink : palette.white;
  if (count === undefined) return <View style={[styles.dot, { backgroundColor: bg }, style]} accessibilityLabel="New" />;
  return (
    <View style={[styles.box, { backgroundColor: bg }, style]} accessibilityLabel={`${count} new`}>
      <Text style={[styles.label, { color: fg, fontSize: fs(10) }]}>{count > max ? `${max}+` : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: { width: 8, height: 8, borderRadius: 4 },
  box: { minWidth: 16, height: 16, borderRadius: 8, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  label: { fontFamily: font.family, fontWeight: '700' },
});
