import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { palette, tint } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../Icon';

export type StatusIconProps = {
  name: IconName;
  /**
   * `neutral` mint + accent (default).
   * `danger` pale red that follows dark mode + theme red (was customer/v1 `BigIcon danger`).
   * `red` fixed pale red + brand red in both schemes (was partner/v1 `Badge tone="red"`).
   */
  tone?: 'neutral' | 'danger' | 'red';
  /** diameter in px (default 64; the icon is 30 at 64) */
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** The big round icon at the top of error and quiet screens (the design's 64px round `.ic`). */
export function StatusIcon({ name, tone = 'neutral', size = 64, style }: StatusIconProps) {
  const { c, dark } = useTheme();
  const bg = tone === 'danger' ? (dark ? tint.redBgDark : tint.redBg) : tone === 'red' ? tint.redBg : c.mint;
  const fg = tone === 'danger' ? c.red : tone === 'red' ? palette.red : c.accent;
  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }, style]}>
      <Icon name={name} size={Math.round((size * 30) / 64)} color={fg} />
    </View>
  );
}

const styles = StyleSheet.create({ base: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center' } });
