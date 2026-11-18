import React from 'react';
import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { font, text } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type HProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /** font size in px (default 19). `variant` sets it by name. */
  size?: number;
  /** `title` 19px (default), `headline` 22px (sign-in), `display` 28px (big numbers) */
  variant?: 'title' | 'headline' | 'display';
  color?: string;
  center?: boolean;
};

/** Screen headline (the design's `.h`): 19px bold, line height 1.2. Pass `size={22}` or `variant="headline"` for sign-in titles. */
export function H({ children, style, size, variant, color, center }: HProps) {
  const { c, fs } = useTheme();
  const px = size ?? (variant ? text[variant].size : font.size.h);
  return <Text style={[styles.base, { fontSize: fs(px), lineHeight: fs(px * 1.2), color: color ?? c.ink, textAlign: center ? 'center' : undefined }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({ base: { fontFamily: font.family, fontWeight: '700', letterSpacing: -0.2 } });
