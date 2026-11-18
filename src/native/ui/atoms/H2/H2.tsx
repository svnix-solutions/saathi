import React from 'react';
import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { font, text } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type H2Props = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  /** muted colour */
  m?: boolean;
  center?: boolean;
};

/** Section label (the design's `.h2`): 13px bold, line height 17. */
export function H2({ children, style, color, m, center }: H2Props) {
  const { c, fs } = useTheme();
  return <Text style={[styles.base, { fontSize: fs(text.label.size), lineHeight: fs(text.label.lineHeight), color: color ?? (m ? c.mut : c.ink), textAlign: center ? 'center' : undefined }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({ base: { fontFamily: font.family, fontWeight: '700' } });
