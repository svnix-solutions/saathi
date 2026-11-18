import React from 'react';
import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { font, text } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type TTone = 'ink' | 'muted' | 'accent' | 'red' | 'white';

export type TProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /** `small` = 11px (same as the `s` flag), `body` = 12px. */
  variant?: 'body' | 'small';
  /** Text colour from the theme. `color` wins over `tone`. */
  tone?: TTone;
  /** small text (the design's `.s`, 11px) */
  s?: boolean;
  /** muted colour (the design's `.m`) */
  m?: boolean;
  /** bold (700) */
  b?: boolean;
  center?: boolean;
  /** any colour; wins over `tone` and `m` */
  color?: string;
  /** font size in px before the text scale; wins over `variant` / `s` */
  size?: number;
  numberOfLines?: number;
  /** line-through */
  strike?: boolean;
};

/**
 * Body text (the design's body, `.s` and `.m` classes). 12px, line height 1.4, ink colour.
 * Reads colours and the text scale from the theme, so it follows dark mode and large text.
 */
export function T({ children, style, variant, tone, s, m, b, center, color, size, numberOfLines, strike }: TProps) {
  const { c, fs } = useTheme();
  const small = s || variant === 'small';
  const px = size ?? (small ? text.small.size : text.body.size);
  const toneColor = tone && { ink: c.ink, muted: c.mut, accent: c.accent, red: c.red, white: '#fff' }[tone];
  return (
    <Text numberOfLines={numberOfLines} style={[styles.base, {
      color: color ?? toneColor ?? (m ? c.mut : c.ink), fontSize: fs(px),
      lineHeight: fs(px * 1.4), fontWeight: b ? '700' : '400',
      textAlign: center ? 'center' : undefined, textDecorationLine: strike ? 'line-through' : undefined,
    }, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({ base: { fontFamily: font.family } });
